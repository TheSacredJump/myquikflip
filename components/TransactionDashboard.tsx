"use client";

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownLeft, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { createClient } from '@supabase/supabase-js';
import { useUser } from '@clerk/nextjs';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const TransactionDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [merchantId, setMerchantId] = useState(null);
  const [stats, setStats] = useState({
    todaySales: 0,
    pendingOrders: 0,
    totalSales: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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
      if (data) setMerchantId(data.merchant_id);
    } catch (err) {
      console.error('Error fetching merchant:', err);
      setError('Could not find merchant information');
    }
  };

  // Fetch transactions for the merchant
  const fetchTransactions = async () => {
    if (!merchantId) return;

    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('merchant_id', merchantId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Could not fetch transactions');
    }
  };

  // Calculate stats from transactions
  const calculateStats = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const todayTransactions = transactions.filter(tx => 
      new Date(tx.created_at) >= today && tx.status === 'confirmed'
    );
  
    const pendingTransactions = transactions.filter(tx => 
      tx.status === 'pending'
    );
  
    const confirmedTransactions = transactions.filter(tx =>
      tx.status === 'confirmed'
    );
  
    setStats({
      todaySales: todayTransactions.reduce((sum, tx) => sum + tx.amount_usd, 0),
      pendingOrders: pendingTransactions.length,
      totalSales: confirmedTransactions.reduce((sum, tx) => sum + tx.amount_usd, 0)
    });
  };

  // Initial load
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Replace this with actual user email from your auth system
        const userEmail = user?.emailAddresses[0]?.emailAddress; // You'll need to get this from your auth context
        await fetchMerchantId(userEmail);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Fetch transactions when merchantId changes
  useEffect(() => {
    if (merchantId) {
      fetchTransactions();
    }
  }, [merchantId]);

  // Update stats when transactions change
  useEffect(() => {
    calculateStats();
  }, [transactions]);

  // Filter transactions based on search term
  const filteredTransactions = transactions.filter(tx =>
    tx.charge_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tx.customer_email && tx.customer_email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return <div className="p-8 text-neutral-400">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-400">{error}</div>;
  }

  if (!merchantId) {
    return <div className="p-8 text-neutral-400">No merchant found for this email.</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-100 mb-2">Your Transactions</h1>
        <p className="text-neutral-400">Monitor your crypto payments and USD payouts</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-neutral-900 border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-neutral-400">Today's Sales</h3>
            <ArrowUpRight className="text-green-400" size={20} />
          </div>
          <p className="text-2xl font-bold text-neutral-100">
            ${stats.todaySales.toLocaleString()}
          </p>
        </Card>

        <Card className="p-6 bg-neutral-900 border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-neutral-400">Pending Orders</h3>
            <ArrowDownLeft className="text-blue-400" size={20} />
          </div>
          <p className="text-2xl font-bold text-neutral-100">{stats.pendingOrders}</p>
          <p className="text-sm text-blue-400 mt-2">Awaiting confirmation</p>
        </Card>

        <Card className="p-6 bg-neutral-900 border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-neutral-400">Total Sales</h3>
            <ArrowUpRight className="text-green-400" size={20} />
          </div>
          <p className="text-2xl font-bold text-neutral-100">
            ${stats.totalSales.toLocaleString()}
          </p>
          <p className="text-sm text-green-400 mt-2">All confirmed transactions</p>
        </Card>
      </div>

      {/* Orders Table */}
      <Card className="bg-neutral-900 border-neutral-800">
        <div className="p-6 border-b border-neutral-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search transactions..."
                  className="pl-10 pr-4 py-2 bg-neutral-800 border border-neutral-700 text-neutral-100 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-800">
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Payment Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Payout Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-neutral-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-neutral-100">{transaction.charge_id}</div>
                    <div className="text-sm text-neutral-400">{transaction.customer_email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-100">
                      {transaction.amount_crypto} {transaction.crypto_currency}
                    </div>
                    <div className="text-sm text-neutral-400">
                      ${transaction.amount_usd.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.status === 'confirmed' 
                        ? 'bg-green-900 text-green-300' 
                        : 'bg-yellow-900 text-yellow-300'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">
                    {new Date(transaction.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.payout_status === 'completed'
                        ? 'bg-blue-900 text-blue-300'
                        : 'bg-neutral-700 text-neutral-300'
                    }`}>
                      {transaction.payout_status}
                    </span>
                    {transaction.payout_completed_at && (
                      <div className="text-xs text-neutral-400 mt-1">
                        {new Date(transaction.payout_completed_at).toLocaleString()}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default TransactionDashboard;