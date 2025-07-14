import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Package, Clock, DollarSign, Users, Filter, Star } from 'lucide-react';
import Modal from './Modal';
import PackageForm from './PackageForm';

interface TrainingPackage {
  id: number;
  name: string;
  trainer: string;
  price: number;
  duration: number;
  sessions: number;
  description: string;
  category: string;
  status: 'active' | 'inactive';
  enrolled: number;
  maxCapacity: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  equipment: string[];
}

const PackageManagement: React.FC = () => {
  const [packages, setPackages] = useState<TrainingPackage[]>([
    {
      id: 1,
      name: 'Strength Building Bootcamp',
      trainer: 'Sarah Wilson',
      price: 299,
      duration: 8,
      sessions: 16,
      description: 'Comprehensive strength training program for beginners to intermediate level focusing on compound movements and progressive overload.',
      category: 'Strength Training',
      status: 'active',
      enrolled: 24,
      maxCapacity: 30,
      difficulty: 'Intermediate',
      equipment: ['Barbells', 'Dumbbells', 'Resistance Bands']
    },
    {
      id: 2,
      name: 'HIIT Fat Burn Challenge',
      trainer: 'Mike Johnson',
      price: 199,
      duration: 6,
      sessions: 12,
      description: 'High-intensity interval training for maximum fat burning and cardiovascular improvement in a short time frame.',
      category: 'Cardio',
      status: 'active',
      enrolled: 31,
      maxCapacity: 25,
      difficulty: 'Advanced',
      equipment: ['Kettlebells', 'Jump Ropes', 'Medicine Balls']
    },
    {
      id: 3,
      name: 'Mindful Yoga Journey',
      trainer: 'Emily Rodriguez',
      price: 149,
      duration: 4,
      sessions: 8,
      description: 'Relaxing yoga sessions focusing on mindfulness, flexibility, and stress relief through traditional poses and breathing techniques.',
      category: 'Yoga',
      status: 'active',
      enrolled: 18,
      maxCapacity: 20,
      difficulty: 'Beginner',
      equipment: ['Yoga Mats', 'Blocks', 'Straps']
    },
    {
      id: 4,
      name: 'CrossFit Fundamentals',
      trainer: 'David Kim',
      price: 349,
      duration: 10,
      sessions: 20,
      description: 'Complete introduction to CrossFit methodology including Olympic lifts, gymnastics movements, and metabolic conditioning.',
      category: 'CrossFit',
      status: 'active',
      enrolled: 15,
      maxCapacity: 15,
      difficulty: 'Intermediate',
      equipment: ['Olympic Bars', 'Bumper Plates', 'Pull-up Bars', 'Rings']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<TrainingPackage | null>(null);

  const categories = ['Strength Training', 'Cardio', 'Yoga', 'CrossFit', 'Personal Training', 'Nutrition Coaching'];

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.trainer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || pkg.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || pkg.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddPackage = () => {
    setSelectedPackage(null);
    setIsModalOpen(true);
  };

  const handleEditPackage = (pkg: TrainingPackage) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleDeletePackage = (packageId: number) => {
    setPackages(packages.filter(pkg => pkg.id !== packageId));
  };

  const handleSavePackage = (packageData: Partial<TrainingPackage>) => {
    if (selectedPackage) {
      setPackages(packages.map(pkg => 
        pkg.id === selectedPackage.id ? { ...pkg, ...packageData } : pkg
      ));
    } else {
      const newPackage = {
        ...packageData,
        id: Math.max(...packages.map(p => p.id)) + 1,
        enrolled: 0
      } as TrainingPackage;
      setPackages([...packages, newPackage]);
    }
    setIsModalOpen(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Package Management</h2>
          <p className="text-gray-600 mt-1">Manage training packages and programs</p>
        </div>
        <button
          onClick={handleAddPackage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Add Package</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {filteredPackages.map((pkg) => (
            <div key={pkg.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Package className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">{pkg.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">by {pkg.trainer}</p>
                  <div className="flex items-center space-x-2">
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                      {pkg.category}
                    </span>
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(pkg.difficulty)}`}>
                      {pkg.difficulty}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleEditPackage(pkg)}
                    className="text-blue-600 hover:text-blue-800 p-1 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePackage(pkg.id)}
                    className="text-red-600 hover:text-red-800 p-1 rounded-lg hover:bg-red-50 transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-4 line-clamp-2">{pkg.description}</p>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-center text-green-600 mb-1">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-semibold">{pkg.price}</span>
                  </div>
                  <p className="text-xs text-gray-500">Price</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-center text-blue-600 mb-1">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="font-semibold">{pkg.duration}w</span>
                  </div>
                  <p className="text-xs text-gray-500">Duration</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-center text-purple-600 mb-1">
                    <span className="font-semibold">{pkg.sessions}</span>
                  </div>
                  <p className="text-xs text-gray-500">Sessions</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Equipment Required:</p>
                <div className="flex flex-wrap gap-1">
                  {pkg.equipment.slice(0, 3).map((item, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                      {item}
                    </span>
                  ))}
                  {pkg.equipment.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                      +{pkg.equipment.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600">
                    <Users className="h-4 w-4 inline mr-1" />
                    <span className="font-medium">{pkg.enrolled}</span>/{pkg.maxCapacity}
                  </div>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(pkg.enrolled / pkg.maxCapacity) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  pkg.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {pkg.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPackage ? 'Edit Package' : 'Add New Package'}
      >
        <PackageForm
          package={selectedPackage}
          onSave={handleSavePackage}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default PackageManagement;