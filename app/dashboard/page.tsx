"use client";

import React, { useState } from 'react';
import { Layout, CreditCard, Key, FileText, Bell } from 'lucide-react';
import TransactionDashboard from '@/components/TransactionDashboard';
import ApiKeysManager from '@/components/ApiKeysManager';
import Documentation from '@/components/Documentation';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user } = useUser();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Layout },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'docs', label: 'Documentation', icon: FileText }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <TransactionDashboard />;
      case 'api':
        return <ApiKeysManager />;
      case 'docs':
        return <Documentation />;
      default:
        return <TransactionDashboard />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Fixed Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64  border-r border-neutral-800 z-30">
        {/* Logo section */}
        <Link href="/">
        <div className="h-16 flex items-center px-6 border-b border-neutral-800">
          <img src="/lightlogo.png" alt="QuikFlip Logo" className="w-8 h-8 mr-2" />
          <h1 className="text-xl font-bold text-neutral-100">QuikFlip</h1>
        </div>
        </Link>

        {/* Navigation section */}
        <div className="flex flex-col h-[calc(100vh-4rem)]">
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-950 text-blue-400 font-medium'
                      : 'text-blue-400 hover:bg-blue-950'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Footer section */}
          <div className="p-4 border-t border-neutral-800">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-blue-950 rounded-lg transition-colors">
              <Bell size={18} />
              <span>Notifications</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64">
        {/* Header */}
        <header className="h-16 bg-gray-950 border-b border-neutral-800 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-medium text-neutral-300">
              Welcome back, <span className="text-blue-400">{user?.firstName} {user?.lastName}</span> 👋
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-neutral-400 hover:text-blue-100">
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-neutral-100">{user?.firstName} {user?.lastName}</span>
                <span className="text-xs text-neutral-500">{user?.emailAddresses[0].emailAddress}</span>
              </div>
              <UserButton />
            </div>
          </div>
        </header>

        {/* Page Content */}
        {renderContent()}
      </main>
    </div>
  );
};

export default DashboardLayout;