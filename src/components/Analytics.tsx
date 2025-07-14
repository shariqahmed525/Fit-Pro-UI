import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Target, Calendar, Filter, Download } from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');

  const metrics = [
    { label: 'User Growth', value: '+23.5%', color: 'text-green-600', trend: 'up' },
    { label: 'Revenue Growth', value: '+18.2%', color: 'text-blue-600', trend: 'up' },
    { label: 'Retention Rate', value: '87.4%', color: 'text-purple-600', trend: 'up' },
    { label: 'Satisfaction Score', value: '4.8/5', color: 'text-orange-600', trend: 'up' }
  ];

  const topPackages = [
    { name: 'Strength Building Bootcamp', sales: 45, revenue: 13455, growth: '+12%' },
    { name: 'HIIT Fat Burn Challenge', sales: 38, revenue: 7562, growth: '+8%' },
    { name: 'Mindful Yoga Journey', sales: 32, revenue: 4768, growth: '+15%' },
    { name: 'CrossFit Fundamentals', sales: 28, revenue: 9772, growth: '+22%' },
    { name: 'Core Strength Workshop', sales: 22, revenue: 3300, growth: '+5%' }
  ];

  const trainerPerformance = [
    { name: 'Sarah Wilson', clients: 28, revenue: 8400, rating: 4.9, packages: 3 },
    { name: 'Mike Johnson', clients: 22, revenue: 6600, rating: 4.7, packages: 2 },
    { name: 'Emily Rodriguez', clients: 35, revenue: 5250, rating: 4.8, packages: 4 },
    { name: 'David Kim', clients: 19, revenue: 5700, rating: 4.6, packages: 2 }
  ];

  const monthlyData = [
    { month: 'Jan', users: 120, revenue: 15000, packages: 8 },
    { month: 'Feb', users: 145, revenue: 18500, packages: 10 },
    { month: 'Mar', users: 132, revenue: 16800, packages: 9 },
    { month: 'Apr', users: 168, revenue: 22400, packages: 12 },
    { month: 'May', users: 189, revenue: 25600, packages: 14 },
    { month: 'Jun', users: 156, revenue: 28450, packages: 11 }
  ];

  const userDemographics = [
    { age: '18-25', percentage: 25, count: 712 },
    { age: '26-35', percentage: 35, count: 996 },
    { age: '36-45', percentage: 28, count: 797 },
    { age: '46-55', percentage: 8, count: 228 },
    { age: '55+', percentage: 4, count: 114 }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600 mt-1">Comprehensive insights into your fitness platform performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">vs last period</span>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-gray-100">
                <TrendingUp className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Packages</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topPackages.map((pkg, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{pkg.name}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <p className="text-sm text-gray-600">{pkg.sales} sales</p>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {pkg.growth}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${pkg.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Trainer Performance</h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {trainerPerformance.map((trainer, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-100">
                <div className="flex items-center flex-1">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-blue-700">
                      {trainer.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{trainer.name}</p>
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <span>{trainer.clients} clients</span>
                      <span>•</span>
                      <span>{trainer.rating}★</span>
                      <span>•</span>
                      <span>{trainer.packages} packages</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${trainer.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Growth Trends</h3>
            <Target className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-center">
                  <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-blue-600 font-medium">{data.users} users</span>
                      <span className="text-green-600 font-medium">${data.revenue.toLocaleString()}</span>
                      <span className="text-purple-600 font-medium">{data.packages} packages</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">User Demographics</h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {userDemographics.map((demo, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <div className="w-16 text-sm font-medium text-gray-900">{demo.age}</div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${demo.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{demo.percentage}%</div>
                    <div className="text-xs text-gray-500">{demo.count} users</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Key Performance Indicators</h3>
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <p className="text-3xl font-bold text-blue-600">156</p>
            <p className="text-sm text-gray-600 mt-1">New Users This Month</p>
            <p className="text-xs text-green-600 mt-1 font-medium">+12.5% from last month</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <p className="text-3xl font-bold text-green-600">$28,450</p>
            <p className="text-sm text-gray-600 mt-1">Monthly Revenue</p>
            <p className="text-xs text-green-600 mt-1 font-medium">+18.2% from last month</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <p className="text-3xl font-bold text-purple-600">94%</p>
            <p className="text-sm text-gray-600 mt-1">Package Completion Rate</p>
            <p className="text-xs text-green-600 mt-1 font-medium">+5.3% from last month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;