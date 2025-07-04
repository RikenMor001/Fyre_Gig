import type React from "react";
import type { Account } from "../types";
import { CreditCard, PiggyBank, TrendingUp, Wallet } from "lucide-react";

interface AccountProps{
    accounts: Account;
    onClick: () => void;
}

const Card: React.FC<AccountProps> = ({accounts, onClick}) => {
    console.log(accounts.id)

    const accountIcon = (type: Account['type']) => {
        switch(type){
            case "checking":
                return <Wallet className="h-6 w-6 text-gray-700"/>;
            case "savings":
                return <PiggyBank className="h-6 w-6 text-gray-700"/>;
            case "credit":
                return <CreditCard className="h-6 w-6 text-gray-700"/>;
            case "investment":
                return <TrendingUp className="h-6 w-6 text-gray-700"/>
        }
    }

    return <div 
    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-1 py-25" 
    onClick={onClick}>
        {accountIcon(accounts.type)}
    </div>
}

export default Card;
