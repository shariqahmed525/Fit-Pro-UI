import React, { useState } from 'react';
import { TrendingUp, DollarSign, ShoppingCart, Calendar, Filter, Download, Eye } from 'lucide-react';

interface Sale {
  id: number;
  customerName: string;
  customerEmail: string;
  packageName: string;
  trainer: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'refunded';
  paymentMethod: string;
  commission: number;
}

const SalesTracking: React.FC = () => {
  const [sales] = useState<Sale[]>([
    {
      id: 1,
      customerName: 'John Doe',
      customerEmail: 'john.doe@email.com',
      packageName: 'Strength Building Bootcamp',
      trainer: 'Sarah Wilson',
      amount: 299,
      date: '2024-12-20',
      status: 'completed',
      paymentMethod: 'Credit Card',
      commission: 59.80
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      customerEmail: 'jane.smith@email.com',
      packageName: 'HIIT Fat Burn Challenge',
      trainer: 'Mike Johnson',
      amount: 199,
      date: '2024-12-19',
      status: 'completed',
      paymentMethod: 'PayPal',
      commission: 39.80
    },
    {
      id: 3,
      customerName: 'Robert Brown',
      customerEmail: 'robert.brown@email.com',
      packageName: 'Mindful Yoga Journey',
      trainer: 'Emily Rodriguez',
      amount: 149,
      date: '2024-12-18',
      status: 'pending',
      paymentMethod: 'Credit Card',
      commission: 29.80
    },
    {
      id: 4,
      customerName: 'Lisa Wilson',
      customerEmail: 'lisa.wilson@email.com',
      packageName: 'CrossFit Fundamentals',
      trainer: 'David Kim',
      amount: 349,
      date: '2024-12-17',
      status: 'completed',
      paymentMethod: 'Bank Transfer',
      commission: 69.80
    },
    {
      id: 5,
      customerName: 'Michael Chen',
      customerEmail: 'michael.chen@email.com',
      packageName: 'Strength Building Bootcamp',
      trainer: 'Sarah Wilson',
      amount: 299,
      date: '2024-12-16',
      status: 'refunded',
      paymentMethod: 'Credit Card',
      commission: 0
    }
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterTrainer, setFilterTrainer] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('all');

  const filteredSales = sales.filter(sale => {
    const matchesStatus = filterStatus === 'all' || sale.status === filterStatus;
    const matchesTrainer = filterTrainer === 'all' || sale.trainer === filterTrainer;
    return matchesStatus && matchesTrainer;
  });

  const totalRevenue = sales.reduce((sum, sale) => 
    sale.status === 'completed' ? sum + sale.amount : sum, 0
  );

  const totalCommission = sales.reduce((sum, sale) => 
    sale.status === 'completed' ? sum + sale.commission : sum, 0
  );

  const completedSales = sales.filter(sale => sale.status === 'completed').length;
  const pendingSales = sales.filter(sale => sale.status === 'pending').length;
  const refundedSales = sales.filter(sale => sale.status === 'refunded').length;

  const trainers = [...new Set(sales.map(sale => sale.trainer))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'refunded': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Sales Tracking</h2>
          <p className="text-gray-600 mt-1">Monitor revenue and track sales performance</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
          <Download className="h-4 w-4" />
          <span>Export Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+15.3% from last month</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Sales</p>
              <p className="text-3xl font-bold text-gray-900">{completedSales}</p>
              <p className="text-sm text-blue-600 mt-1">{pendingSales} pending</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Commission Earned</p>
              <p className="text-3xl font-bold text-gray-900">${totalCommission.toFixed(2)}</p>
              <p className="text-sm text-purple-600 mt-1">20% avg rate</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Refunded Sales</p>
              <p className="text-3xl font-bold text-gray-900">{refundedSales}</p>
              <p className="text-sm text-red-600 mt-1">{((refundedSales / sales.length) * 100).toFixed(1)}% refund rate</p>
            </div>
            <div className="p-3 rounded-lg bg-red-100">
              <TrendingUp className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-gray-900">Sales History</h3>
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
              </select>
              <select
                value={filterTrainer}
                onChange={(e) => setFilterTrainer(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Trainers</option>
                {trainers.map(trainer => (
                  <option key={trainer} value={trainer}>{trainer}</option>
                ))}
              </select>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trainer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-700">
                          {sale.customerName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{sale.customerName}</div>
                        <div className="text-sm text-gray-500">{sale.customerEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{sale.packageName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {sale.trainer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ${sale.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${sale.commission.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                      {new Date(sale.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {sale.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(sale.status)}`}>
                      {sale.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesTracking;