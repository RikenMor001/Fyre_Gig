
import type React from "react";
import type { Transactions } from "../types";
import { useState } from "react";

interface TransactionListProps {
    transaction: Transactions[];
    title?: string;
}

const TransactionLists: React.FC<TransactionListProps> = ({transaction, title = "Recent Transactions"}) => {
    const [searchTransaction, setSearchTransaction] = useState('');
    const [searchFilter, setSearchFilter] = useState<"all" | "credit" | "debit">("all");

    console.log({transaction, title})

    return <div>
        hello there from the transactionsList
    </div>
}

export default TransactionLists;