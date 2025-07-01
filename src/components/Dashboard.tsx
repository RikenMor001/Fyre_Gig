import type React from "react";
import type { Account, QuickAction, Transactions, User } from "../types"

interface DashboardPorps {
    user: User,
    account: Account[],
    transaction: Transactions[],
    quickActions: QuickAction[]
}

const Dashboard: React.FC<DashboardPorps> = ({user, account, transaction, quickActions}) => {

    console.log({
        user,
        account,
        transaction,
        quickActions
    })
    
    return <div className="">
        hello there
    </div>
}

export default Dashboard;