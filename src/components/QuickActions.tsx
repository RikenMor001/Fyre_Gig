import React from 'react';
import * as LucideIcons from 'lucide-react';
import type { QuickAction } from '../types';

interface QuickActionsProps {
  actions: QuickAction[];
  onActionClick?: (action: QuickAction) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions, onActionClick }) => {
  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent className="w-6 h-6" /> : null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onActionClick?.(action)}
            disabled={action.disabled}
            className="flex flex-col items-center justify-center p-6 border-2 border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <div className="p-3 bg-blue-100 rounded-full mb-3 group-hover:bg-blue-200 transition-colors duration-200">
              <div className="text-blue-600">
                {getIcon(action.icon)}
              </div>
            </div>
            <span className="text-sm font-medium text-gray-700 text-center">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
