
import type React from "react";
import type { Transactions } from "../types";
import { useState } from "react";
import { CheckCircle, Clock, XCircle } from "lucide-react";

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
  };

    
    return <div>
        hello there from the transactionsList
    </div>
}

export default TransactionLists;
