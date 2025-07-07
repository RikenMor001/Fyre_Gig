import React from 'react';
import { TrendingDown, TrendingUp, DollarSign } from 'lucide-react';
import type { Transactions } from '../types';

interface SpendingChartProps {
  transaction: Transactions[];
}

const SpendingChart: React.FC<SpendingChartProps> = ({ transaction }) => {
  const calculateCategorySpending = () => {
    const categoryTotals: { [key: string]: number } = {};
    
    transaction
      .filter(t => t.type === 'debit' && t.status === 'completed')
      .forEach(transaction => {
        const category = transaction.category;
        categoryTotals[category] = (categoryTotals[category] || 0) + Math.abs(transaction.amount);
      });

    return Object.entries(categoryTotals)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  };

  const calculateMonthlyTotals = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const thisMonthTransaction = transaction.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear &&
             t.status === 'completed';
    });

    const income = thisMonthTransaction
      .filter(t => t.type === 'credit')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = thisMonthTransaction
      .filter(t => t.type === 'debit')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    return { income, expenses, net: income - expenses };
  };

  const categorySpending = calculateCategorySpending();
  const monthlyTotals = calculateMonthlyTotals();
  const totalSpending = categorySpending.reduce((sum, [, amount]) => sum + amount, 0);

  const getCategoryColor = (index: number) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500'
    ];
    return colors[index % colors.length];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Spending Overview</h2>
      
      {/* Monthly Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Income</p>
          <p className="text-lg font-semibold text-green-600">{formatCurrency(monthlyTotals.income)}</p>
        </div>
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <TrendingDown className="w-6 h-6 text-red-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Expenses</p>
          <p className="text-lg font-semibold text-red-600">{formatCurrency(monthlyTotals.expenses)}</p>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <DollarSign className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Net</p>
          <p className={`text-lg font-semibold ${monthlyTotals.net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(monthlyTotals.net)}
          </p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div>
        <h3 className="font-medium text-gray-900 mb-4">Top Spending Categories</h3>
        <div className="space-y-3">
          {categorySpending.map(([category, amount], index) => {
            const percentage = totalSpending > 0 ? (amount / totalSpending) * 100 : 0;
            
            return (
              <div key={category} className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${getCategoryColor(index)}`} />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{category}</span>
                    <span className="text-sm text-gray-600">{formatCurrency(amount)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getCategoryColor(index)}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-gray-500 w-12 text-right">
                  {percentage.toFixed(1)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {categorySpending.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <DollarSign className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No spending data available for this period.</p>
        </div>
      )}
    </div>
  );
};

export default SpendingChart;