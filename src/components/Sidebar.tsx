import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Package, 
  TrendingUp, 
  BarChart3,
  Dumbbell
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'trainers', label: 'Trainers', icon: UserCheck },
  { id: 'packages', label: 'Packages', icon: Package },
  { id: 'sales', label: 'Sales', icon: TrendingUp },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="flex items-center justify-center h-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="flex items-center space-x-2">
          <Dumbbell className="h-8 w-8 text-white" />
          <span className="text-xl font-bold text-white">FitPro</span>
        </div>
      </div>
      
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;