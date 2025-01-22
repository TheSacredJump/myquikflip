"use client";

import React, { useState, useEffect } from 'react';
import { Copy, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { createClient } from '@supabase/supabase-js';
import { useUser } from '@clerk/nextjs';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const ApiKeysManager = () => {
  const [showKey, setShowKey] = useState(false);
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(null);
  const { user } = useUser();

  // Fetch merchant ID using email
  const fetchMerchantId = async (email) => {
    try {
      const { data, error } = await supabase
        .from('merchants')
        .select('merchant_id')
        .eq('email', email)
        .single();

      if (error) throw error;
      return data?.merchant_id;
    } catch (err) {
      console.error('Error fetching merchant:', err);
      setError('Could not find merchant information');
      return null;
    }
  };

  // Fetch API keys for merchant
  const fetchApiKeys = async (merchantId) => {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('merchant_id', merchantId)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error fetching API keys:', err);
      setError('Could not fetch API keys');
      return [];
    }
  };

  useEffect(() => {
    const loadApiKeys = async () => {
      setLoading(true);
      try {
        const userEmail = user?.emailAddresses[0]?.emailAddress;
        if (!userEmail) {
          setError('No user email found');
          return;
        }

        const merchantId = await fetchMerchantId(userEmail);
        if (!merchantId) {
          setError('No merchant found for this email');
          return;
        }

        const keys = await fetchApiKeys(merchantId);
        setApiKeys(keys);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadApiKeys();
  }, [user]);

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key);
    setCopySuccess(key);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  if (loading) {
    return <div className="p-8 text-neutral-400">Loading API keys...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-400">{error}</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-100 mb-2">API Keys</h1>
          <p className="text-neutral-400">Manage your API keys for QuikFlip integration</p>
        </div>
      </div>

      <Card className="bg-neutral-900 border-neutral-800">
        <div className="p-6">
          <Alert className="mb-6 bg-blue-950 text-blue-200 border-gray-900">
            <AlertDescription>
              Never share your API keys in public. Keep them secure and rotate them periodically.
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} className="p-4 border border-neutral-800 rounded-lg bg-neutral-900">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-100">{apiKey.name}</h3>
                    <p className="text-sm text-neutral-400">
                      Created on {new Date(apiKey.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-neutral-800 rounded-lg">
                  <code className="font-mono text-sm flex-1 text-neutral-100">
                    {showKey ? apiKey.key_value : '•'.repeat(32)}
                  </code>
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="text-neutral-400 hover:text-neutral-300"
                  >
                    {showKey ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  <button 
                    className="text-neutral-400 hover:text-neutral-300"
                    onClick={() => handleCopyKey(apiKey.key_value)}
                  >
                    {copySuccess === apiKey.key_value ? (
                      <CheckCircle size={20} className="text-green-400" />
                    ) : (
                      <Copy size={20} />
                    )}
                  </button>
                </div>
              </div>
            ))}

            {apiKeys.length === 0 && (
              <div className="text-center text-neutral-400 py-8">
                No API keys found. Create one to get started.
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ApiKeysManager;