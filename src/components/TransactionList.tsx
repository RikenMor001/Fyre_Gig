
import type React from "react";
import type { Transactions } from "../types";
import { useState } from "react";
import { CheckCircle, Clock, Search, XCircle } from "lucide-react";

interface TransactionListProps {
    transaction: Transactions[];
    title?: string;
}

const TransactionLists: React.FC<TransactionListProps> = ({transaction, title = "Recent Transactions"}) => {
    const [searchTransaction, setSearchTransaction] = useState('');
    const [searchFilter, setSearchFilter] = useState<"all" | "credit" | "debit">("all");

    console.log({transaction, title})

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
  
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(Math.abs(amount));
  }

  const formateDate = (dateString: string) => {
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
    </div>
}

export default TransactionLists;
