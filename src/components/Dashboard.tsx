import type React from "react";
import type { Account, QuickAction, Transactions, User } from "../types"
import { useState } from "react";
import { Menu, X } from "lucide-react";

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

    // const totalBalance = () => {

    // }

    // const formatCurrency = () => {

    // }

    console.log({
        user,
        account,
        transaction,
        quickActions
    })
    
    return <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 min-h-screen">
        {/* Navbar */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-lg shadow-md">
            <div className="max-w-7xl mx-auto ">
                <div className="h-16 flex justify-between items-center">

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

                    <div className="flex items-center">
                        <div className="text-right">
                            <p className="text-sm text-slate-700 tracking-wide flex items-center">
                                Total Balance
                            </p>
                            <p className="flex items-center">
                                {/* {formatCurrency(totalBalance())} */}
                            </p>
                        </div>
                    </div>

                </div>
                
            </div>
        </header>
    </div>
}

export default Dashboard;
