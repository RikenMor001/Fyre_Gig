import type React from "react";
import type { Account } from "../types";

interface AccountProps{
    accounts: Account;
    onClick: () => void;
}

const Card: React.FC<AccountProps> = ({accounts, onClick}) => {
    console.log(accounts.id)
    return <div 
    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-1 py-25" 
    onClick={onClick}>
        Savings
    </div>
}

export default Card;
