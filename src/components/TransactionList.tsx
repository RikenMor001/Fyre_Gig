
import type React from "react";
import type { Transactions } from "../types";
import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, CheckCircle, Clock, Filter, Search, XCircle } from "lucide-react";

interface TransactionListProps {
    transaction: Transactions[];
    title?: string;
}

const TransactionLists: React.FC<TransactionListProps> = ({transaction, title = "Recent Transactions"}) => {
    const [searchTransaction, setSearchTransaction] = useState('');
    const [searchFilter, setSearchFilter] = useState<"all" | "credit" | "debit">("all");

    const getStatusIcon = (status: Transactions['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  }
  
  const filteredTransaction = transaction.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchFilter.toLocaleLowerCase()) || transaction.category.toLowerCase().includes(searchTransaction.toLowerCase());
    const matchesFilter = searchFilter === "all" || transaction.type === searchFilter;
    return matchesSearch && matchesFilter;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(Math.abs(amount));
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

    return <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          {title}
        </h2>
        <div className="flex items-center space-x-2">
          <div className="relative"> 
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
            <input
            type="text"
            placeholder="Search Transactions"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 foucs:border-transparent"
            value={searchTransaction}
            onChange={(e) => setSearchTransaction(e.target.value)}
            />
          </div>
          <select 
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value as "all" | "credit" | "debit")}
          >
            <option value="all">All Types</option>
            <option value="credit">Income</option>
            <option value="debit">Expenses</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {filteredTransaction.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Filter className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No transactions found matching your criteria.</p>
          </div>
        ) : (
          filteredTransaction.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors duration-150"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'credit' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  {transaction.type === 'credit' ? (
                    <ArrowDownRight className="w-4 h-4" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-900">{transaction.description}
                    </p>
                    {getStatusIcon(transaction.status)}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-sm text-gray-500">{transaction.category}</p>
                    <span className="text-gray-300">•</span>
                    <p className="text-sm text-gray-500">{formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === 'credit' 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'}{formatAmount(transaction.amount)}
                </p>
                <p className="text-xs text-gray-400 capitalize">{transaction.status}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredTransaction.length > 0 && (
        <div className="mt-6 text-center">
          <div className="text-blue-500 hover:text-blue-700 font-medium text-sm transition-colors duration-150">
            View All Transactions
          </div>
        </div>
      )}
    </div>
}

export default TransactionLists;
