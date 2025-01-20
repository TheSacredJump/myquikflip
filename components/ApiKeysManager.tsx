"use client";

import React, { useState } from 'react';
import { Copy, Eye, EyeOff, CheckCircle, PlusCircle, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';

const ApiKeysManager = () => {
  const [showKey, setShowKey] = useState(false);
  const [apiKeys, setApiKeys] = useState([
    { 
      id: 1, 
      name: 'Production', 
      key: 'pk_live_123456789abcdefghijklmnop', 
      environment: 'production', 
      created: new Date() 
    },
    { 
      id: 2, 
      name: 'Development', 
      key: 'pk_test_123456789abcdefghijklmnop', 
      environment: 'development', 
      created: new Date() 
    }
  ]);
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyEnvironment, setNewKeyEnvironment] = useState('development');
  const [copySuccess, setCopySuccess] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState(null);

  const generateApiKey = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const prefix = newKeyEnvironment === 'production' ? 'pk_live_' : 'pk_test_';
    let result = prefix;
    for (let i = 0; i < 24; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleCreateKey = () => {
    const newKey = {
      id: apiKeys.length + 1,
      name: newKeyName,
      key: generateApiKey(),
      environment: newKeyEnvironment,
      created: new Date()
    };
    setApiKeys([...apiKeys, newKey]);
    setShowNewKeyModal(false);
    setNewKeyName('');
    setNewKeyEnvironment('development');
  };

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key);
    setCopySuccess(key);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  const handleDeleteKey = () => {
    if (keyToDelete !== null) {
      setApiKeys(apiKeys.filter(key => key.id !== keyToDelete));
      setShowDeleteModal(false);
      setKeyToDelete(null);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-100 mb-2">API Keys</h1>
          <p className="text-neutral-400">Manage your API keys for QuikFlip integration</p>
        </div>
        <button 
          onClick={() => setShowNewKeyModal(true)}
          className="bg-blue-600 text-neutral-100 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <PlusCircle size={20} />
          Create new key
        </button>
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
                      Created on {apiKey.created.toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    apiKey.environment === 'production'
                      ? 'bg-green-900 text-green-300'
                      : 'bg-blue-900 text-blue-300'
                  }`}>
                    {apiKey.environment}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-neutral-800 rounded-lg">
                  <code className="font-mono text-sm flex-1 text-neutral-100">
                    {showKey ? apiKey.key : '•'.repeat(32)}
                  </code>
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="text-neutral-400 hover:text-neutral-300"
                  >
                    {showKey ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  <button 
                    className="text-neutral-400 hover:text-neutral-300"
                    onClick={() => handleCopyKey(apiKey.key)}
                  >
                    {copySuccess === apiKey.key ? (
                      <CheckCircle size={20} className="text-green-400" />
                    ) : (
                      <Copy size={20} />
                    )}
                  </button>
                  <button 
                    className="text-red-400 hover:text-red-300"
                    onClick={() => {
                      setKeyToDelete(apiKey.id);
                      setShowDeleteModal(true);
                    }}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800 max-w-md w-full">
            <h2 className="text-xl font-semibold text-neutral-100 mb-4">Delete API Key</h2>
            <p className="text-neutral-400 mb-6">
              Are you sure you want to delete this API key? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setKeyToDelete(null);
                }}
                className="px-4 py-2 text-neutral-400 hover:text-neutral-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteKey}
                className="bg-red-600 text-neutral-100 px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete key
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create New Key Modal */}
      {showNewKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800 max-w-md w-full">
            <h2 className="text-xl font-semibold text-neutral-100 mb-4">Create new API key</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Key name
                </label>
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 text-neutral-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Production API Key"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Environment
                </label>
                <select
                  value={newKeyEnvironment}
                  onChange={(e) => setNewKeyEnvironment(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 text-neutral-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="development">Development</option>
                  <option value="production">Production</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowNewKeyModal(false)}
                  className="px-4 py-2 text-neutral-400 hover:text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateKey}
                  className="bg-blue-600 text-neutral-100 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create key
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiKeysManager;