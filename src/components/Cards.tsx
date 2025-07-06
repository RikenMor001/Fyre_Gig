import React from 'react';
import { CreditCard, Wallet, TrendingUp, PiggyBank } from 'lucide-react';
import type { Account } from '../types';

interface AccountCardProps {
  account: Account;
  onClick?: () => void;
}

const AccountCard: React.FC<AccountCardProps> = ({ account, onClick }) => {
  const getAccountIcon = (type: Account['type']) => {
    switch (type) {
      case 'checking':
        return <Wallet className="w-6 h-6" />;
      case 'savings':
        return <PiggyBank className="w-6 h-6" />;
      case 'credit':
        return <CreditCard className="w-6 h-6" />;
      case 'investment':
        return <TrendingUp className="w-6 h-6" />;
      default:
        return <Wallet className="w-6 h-6" />;
    }
  };

  const getAccountColor = (type: Account['type']) => {
    switch (type) {
      case 'checking':
        return 'bg-blue-500';
      case 'savings':
        return 'bg-green-500';
      case 'credit':
        return 'bg-orange-500';
      case 'investment':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatBalance = (balance: number) => {
    const isNegative = balance < 0;
    const absBalance = Math.abs(balance);
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: account.currency
    }).format(absBalance);
    return isNegative ? `-${formatted}` : formatted;
  };

  const getBalanceColor = (balance: number, type: Account['type']) => {
    if (type === 'credit') {
      return balance < 0 ? 'text-orange-600' : 'text-green-600';  
    }
    return balance < 0 ? 'text-red-600' : 'text-gray-900';
  };

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${getAccountColor(account.type)} text-white`}>
          {getAccountIcon(account.type)}
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
            {account.type}
          </p>
          <p className="text-xs text-gray-400 mt-1">{account.accountNumber}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 text-lg">{account.name}</h3>
        <p className="text-sm text-gray-500">Available Balance</p>
        <p className={`text-2xl font-bold ${getBalanceColor(account.balance, account.type)}`}>
          {formatBalance(account.balance)}
        </p>
      </div>
    </div>
  );
};

export default AccountCard;
