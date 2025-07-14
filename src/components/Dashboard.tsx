import React from 'react';
import { Users, UserCheck, Package, TrendingUp, DollarSign, Activity } from 'lucide-react';
import StatCard from './StatCard';
import RecentActivity from './RecentActivity';
import RevenueChart from './RevenueChart';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12.5%',
      changeType: 'increase' as const,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Trainers',
      value: '156',
      change: '+8.2%',
      changeType: 'increase' as const,
      icon: UserCheck,
      color: 'green'
    },
    {
      title: 'Training Packages',
      value: '342',
      change: '+5.1%',
      changeType: 'increase' as const,
      icon: Package,
      color: 'purple'
    },
    {
      title: 'Monthly Revenue',
      value: '$84,650',
      change: '+15.3%',
      changeType: 'increase' as const,
      icon: DollarSign,
      color: 'orange'
    },
    {
      title: 'Active Sessions',
      value: '1,247',
      change: '+22.1%',
      changeType: 'increase' as const,
      icon: Activity,
      color: 'red'
    },
    {
      title: 'Growth Rate',
      value: '18.6%',
      change: '+3.2%',
      changeType: 'increase' as const,
      icon: TrendingUp,
      color: 'indigo'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Welcome back! Here's what's happening with your fitness platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RevenueChart />
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;