import type React from "react";
import type { Account, QuickAction, Transactions, User } from "../types"
import { useState } from "react";
import { Bell, Menu, RefreshCcw, X } from "lucide-react";
import Card from "./Cards";
import TransactionLists from "./TransactionList";
import SpendingChart from "./SpendingChart";
import UserProfile from "./UserProfile";

interface DashboardPorps {
    user: User,
    account: Account[],
    transaction: Transactions[],
    quickActions: QuickAction[]
}

const Dashboard: React.FC<DashboardPorps> = ({user, account, transaction, quickActions}) => {

    const [iseSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [refreshPage, setRefreshPage] = useState<boolean>(false);

    const handleRefresh = async () => {
        setRefreshPage(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLastUpdated(new Date());
        setRefreshPage(false);
    }

    const totalBalance = () => {
        return account.reduce((total, account) => {
            if (account.type === "credit"){
                return total;
            } else return total + account.balance;
        }, 0)
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: "currency",
            currency: "USD"
        }).format(amount);
    }

    return <div className="min-h-screen bg-blue-50">
        {/* Navbar */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-lg shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    <div className="space-x-4 flex items-center">
                        <button
                        onClick={() => setIsSideBarOpen(!iseSideBarOpen)}
                        className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                        >
                        {iseSideBarOpen ? <X className="h-6 w-6"/>: <Menu className="h-6 w-6"/>}
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold tracking-wide">
                                Banking Dashboard
                            </h1>
                            <p className="text-gray-950 font-light tracking-wide">
                                Welcome Back, {user.name.split('')[0]}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-1">
                        <div className="text-right">
                            <p className="text-sm text-slate-800 tracking-wide flex items-center">
                                Total Balance
                            </p>
                            <p className="flex items-center font-semibold text-xl">
                                {formatCurrency(totalBalance())}
                            </p>
                        </div>
                        <div >
                            <button 
                            className="hover:cursor-pointer hover:bg-gray-100 p-2" 
                            onClick={handleRefresh}
                            disabled={refreshPage}>
                                <RefreshCcw className={`h-5 w-5 text-gray-400 ${refreshPage ? "animate-spin" : ""}`}/>
                            </button>
                        </div>
                        <div>
                            <button className="hover:cursor-pointer hover:bg-gray-100 p-2">
                                <Bell className="h-5 w-5 text-gray-400"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        
        {/*SIDEBAR MOBILE*/}


        {/* MAIN CONTENT*/}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-4">
                <div className="lg:col-span-3 space-y-8">
                    <h2 className="text-2xl font-bold tracking-wide mb-6">
                        Your Accounts
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {account.map((accounts) => (
                            <Card
                            key={accounts.id}
                            account={accounts}
                            onClick={() => console.log('Account clicked:', accounts.id)}
                  />
                        ))}
                    </div>
                </div>
            </div>

            {/* TRANSACTION LIST */}
            <TransactionLists transaction={transaction}/>

            {/* SPENDING */}
            <div className="mt-4">
                <SpendingChart transaction={transaction}/>            
            </div>

            {/* PROFILE */}
            <UserProfile user={user}/>
        </div>
    </div>
}

export default Dashboard;
