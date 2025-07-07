
import type React from "react";
import type { QuickAction } from "../types";
import * as LucideIcons from 'lucide-react';

interface QuickActionsProps {
    actons: QuickAction[];
    onActionClick?: (action: QuickAction) => void;
}

const QuickActionButtons: React.FC<QuickActionsProps> = () => {
    const getIcon = (iconName: string) => {
        const IconComponent = (LucideIcons as any)[iconName];
        return <IconComponent className = "w-6 h-6"/>
    }

    return <div>

    </div>
}

export default QuickActionButtons;