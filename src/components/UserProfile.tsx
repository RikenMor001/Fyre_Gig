
import type React from "react";
import type { User } from "../types";
import { Calendar, Mail, Phone, Settings } from "lucide-react";

interface UserProfileProps {
    user: User;
    onSettingsClick?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({user, onSettingsClick}) => {

    console.log(user, onSettingsClick)

    const formatMemeberSince = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long"
        })
    }

    return <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
        <button
          onClick={onSettingsClick}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-150"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-semibold">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            user.name.split(' ').map(n => n[0]).join('').toUpperCase()
          )}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">{user.name}</h3>
          <p className="text-sm text-gray-500">Premium Member</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Mail className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{user.email}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Phone className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{user.phone}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            Member since {formatMemeberSince(user.memberSince)}
          </span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">4</p>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Accounts</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">A+</p>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Credit Score</p>
          </div>
        </div>
      </div>
    </div>
}

export default UserProfile;