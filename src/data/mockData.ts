import type { Account, QuickAction, Transactions, User } from "../types";

export const mockUser: User = {
    id: '1',
    name: 'Harvey Specter',
    email: 'harvey.specter@email.com',
    phone: '+1 (555)-123-4567',
    memberSince: '2019-03-15'
}

export const mockAccounts: Account[] = [
  {
    id: '1',
    name: 'Primary Checking',
    type: 'checking',
    balance: 12450.75,
    accountNumber: '****1234',
    currency: 'USD'
  },
  {
    id: '2',
    name: 'High Yield Savings',
    type: 'savings',
    balance: 25890.32,
    accountNumber: '****5678',
    currency: 'USD'
  },
  {
    id: '3',
    name: 'Premium Credit Card',
    type: 'credit',
    balance: -2340.50,
    accountNumber: '****9012',
    currency: 'USD'
  },
  {
    id: '4',
    name: 'Investment Portfolio',
    type: 'investment',
    balance: 45123.88,
    accountNumber: '****3456',
    currency: 'USD'
  }
];


export const mockTransactions: Transactions[] = [
  {
    id: '1',
    date: '2024-01-15T10:30:00Z',
    description: 'Grocery Store Purchase',
    amount: -89.47,
    type: 'debit',
    category: 'Food & Dining',
    accountId: '1',
    status: 'completed'
  },
  {
    id: '2',
    date: '2024-01-14T15:45:00Z',
    description: 'Salary Deposit',
    amount: 3250.00,
    type: 'credit',
    category: 'Income',
    accountId: '1',
    status: 'completed'
  },
  {
    id: '3',
    date: '2024-01-14T09:20:00Z',
    description: 'Electric Bill Payment',
    amount: -156.78,
    type: 'debit',
    category: 'Utilities',
    accountId: '1',
    status: 'completed'
  },
  {
    id: '4',
    date: '2024-01-13T14:15:00Z',
    description: 'Coffee Shop',
    amount: -12.50,
    type: 'debit',
    category: 'Food & Dining',
    accountId: '1',
    status: 'completed'
  },
  {
    id: '5',
    date: '2024-01-13T11:30:00Z',
    description: 'ATM Withdrawal',
    amount: -200.00,
    type: 'debit',
    category: 'Cash Withdrawal',
    accountId: '1',
    status: 'completed'
  },
  {
    id: '6',
    date: '2024-01-12T16:45:00Z',
    description: 'Online Transfer',
    amount: -500.00,
    type: 'debit',
    category: 'Transfer',
    accountId: '1',
    status: 'pending'
  },
  {
    id: '7',
    date: '2024-01-12T08:20:00Z',
    description: 'Investment Dividend',
    amount: 125.75,
    type: 'credit',
    category: 'Investment',
    accountId: '4',
    status: 'completed'
  },
  {
    id: '8',
    date: '2024-01-11T13:10:00Z',
    description: 'Gas Station',
    amount: -65.30,
    type: 'debit',
    category: 'Transportation',
    accountId: '3',
    status: 'completed'
  }
];

export const mockQuickActions: QuickAction[] = [
  {
    id: '1',
    label: 'Transfer Money',
    icon: 'ArrowLeftRight',
    action: 'transfer'
  },
  {
    id: '2',
    label: 'Pay Bills',
    icon: 'Receipt',
    action: 'pay-bills'
  },
  {
    id: '3',
    label: 'Deposit Check',
    icon: 'Camera',
    action: 'deposit'
  },
  {
    id: '4',
    label: 'Find ATM',
    icon: 'MapPin',
    action: 'find-atm'
  }
];
