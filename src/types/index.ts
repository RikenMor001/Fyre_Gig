
// Account, User, Transactions, QuickAction

export interface Account{
    id: string;
    name: string;
    type: "checking" | "savings" | "investment" | "credit";
    accountNumber: string;
    balance: number;
    currency: string;
}

export interface User{
    id: string;
    name: string;
    email: string;
    phone: number;
    avatar?: string;
    memberSince: string;
}

export interface Transactions{
    id: string;
    amount: number;
    date: string;
    description: string;
    status: "completed" | "cancelled" | "pending";
    accountId: string;
    category: string;
    type: "debit" | "credit";
}

export interface QuickAction{
    id: string;
    label: string;
    icon: string;
    disabled?: boolean;
    action: string;
}
