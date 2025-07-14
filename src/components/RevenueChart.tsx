import React from 'react';
import { BarChart3 } from 'lucide-react';

const RevenueChart: React.FC = () => {
  const data = [
    { month: 'Jan', revenue: 65000 },
    { month: 'Feb', revenue: 72000 },
    { month: 'Mar', revenue: 68000 },
    { month: 'Apr', revenue: 78000 },
    { month: 'May', revenue: 82000 },
    { month: 'Jun', revenue: 84650 }
  ];

  const maxRevenue = Math.max(...data.map(d => d.revenue));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
          <p className="text-sm text-gray-600">Monthly revenue for the past 6 months</p>
        </div>
        <BarChart3 className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-12 text-sm font-medium text-gray-600">{item.month}</div>
            <div className="flex-1 ml-4">
              <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="w-20 text-right text-sm font-semibold text-gray-900">
              ${item.revenue.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;