import React, { useState } from 'react';
import TransactionList from './TransactionList';
import QuickActions from './QuickActions';
import UserProfile from './UserProfile';
import SpendingChart from './SpendingChart';
import { Bell, Menu, X, RefreshCw } from 'lucide-react';
import type { Account, QuickAction, Transactions, User } from '../types';
import AccountCard from './Cards';

interface DashboardProps {
  user: User;
  accounts: Account[];
  transactions: Transactions[];
  quickActions: QuickAction[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, accounts, transactions, quickActions }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  const handleQuickAction = (action: QuickAction) => {
    console.log('Quick action clicked:', action.action);
    // Handle quick action logic here
  };

  const getTotalBalance = () => {
    return accounts.reduce((total, account) => {
      if (account.type === 'credit') {
        return total; // Don't include credit card debt in total balance
      }
      return total + account.balance;
    }, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Banking Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {user.name.split(' ')[0]}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Balance</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(getTotalBalance())}</p>
              </div>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md transition-colors duration-150 disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
              <button className="relative p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsSidebarOpen(false)} />
          <div className="fixed left-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={() => setIsSidebarOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <UserProfile user={user} />
            <div className="mt-6">
              <QuickActions actions={quickActions} onActionClick={handleQuickAction} />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/*Left Column - Accounts and Transactions*/}
          <div className="lg:col-span-3 space-y-8">
            {/* Account Cards */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Accounts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {accounts.map((account) => (
                  <AccountCard
                    key={account.id}
                    account={account}
                    onClick={() => console.log('Account clicked:', account.id)}
                  />
                ))}
              </div>
            </div>

            {/* Transactions */}
            <TransactionList transaction={transactions} />

            {/* Spending Chart */}
            <SpendingChart transaction={transactions} />
          </div>

          {/* Right Column - Profile and Quick Actions */}
          <div className="space-y-8">
            <div className="hidden lg:block">
              <UserProfile
                user={user}
                onSettingsClick={() => console.log('Settings clicked')}
              />
            </div>
            
            <div className="hidden lg:block">
              <QuickActions
                actions={quickActions}
                onActionClick={handleQuickAction}
              />
            </div>

            {/* Mobile Quick Actions */}
            <div className="lg:hidden">
              <QuickActions
                actions={quickActions}
                onActionClick={handleQuickAction}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <p>Last updated: {lastUpdated.toLocaleTimeString()}</p>
            <div className="flex items-center space-x-4">
              <span>Secured by 256-bit SSL encryption</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
