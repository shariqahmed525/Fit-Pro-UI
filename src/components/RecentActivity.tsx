import React from 'react';
import { Activity, User, UserPlus, Package, CreditCard } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'user_signup',
      description: 'New user registration',
      user: 'Sarah Johnson',
      time: '2 minutes ago',
      icon: UserPlus,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'package_purchase',
      description: 'Premium package purchased',
      user: 'Mike Chen',
      time: '15 minutes ago',
      icon: Package,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'trainer_session',
      description: 'Training session completed',
      user: 'Emily Davis',
      time: '32 minutes ago',
      icon: Activity,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'payment',
      description: 'Payment processed successfully',
      user: 'Alex Wilson',
      time: '1 hour ago',
      icon: CreditCard,
      color: 'text-orange-600'
    },
    {
      id: 5,
      type: 'trainer_signup',
      description: 'New trainer application',
      user: 'Jessica Brown',
      time: '2 hours ago',
      icon: User,
      color: 'text-indigo-600'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <p className="text-sm text-gray-600">Latest platform activities</p>
        </div>
        <Activity className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150">
              <div className={`p-2 rounded-full bg-gray-100`}>
                <Icon className={`h-4 w-4 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                <p className="text-sm text-gray-600">{activity.user}</p>
              </div>
              <div className="text-xs text-gray-500">{activity.time}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;