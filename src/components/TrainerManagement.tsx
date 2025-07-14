import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Star, Users, Award, DollarSign, Phone, Mail } from 'lucide-react';
import Modal from './Modal';
import TrainerForm from './TrainerForm';

interface Trainer {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  experience: number;
  rating: number;
  clients: number;
  status: 'active' | 'inactive';
  certifications: string[];
  bio: string;
  hourlyRate: number;
}

const TrainerManagement: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([
    {
      id: 1,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@fitpro.com',
      phone: '+1 (555) 123-4567',
      specialty: 'Weight Training',
      experience: 5,
      rating: 4.9,
      clients: 28,
      status: 'active',
      certifications: ['ACSM-CPT', 'NASM-PES'],
      bio: 'Experienced strength training specialist with focus on functional movement and injury prevention.',
      hourlyRate: 85
    },
    {
      id: 2,
      name: 'Mike Johnson',
      email: 'mike.johnson@fitpro.com',
      phone: '+1 (555) 987-6543',
      specialty: 'Cardio & HIIT',
      experience: 3,
      rating: 4.7,
      clients: 22,
      status: 'active',
      certifications: ['ACE-CPT', 'HIIT Specialist'],
      bio: 'High-energy trainer specializing in cardiovascular fitness and high-intensity interval training.',
      hourlyRate: 75
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@fitpro.com',
      phone: '+1 (555) 456-7890',
      specialty: 'Yoga & Pilates',
      experience: 7,
      rating: 4.8,
      clients: 35,
      status: 'active',
      certifications: ['RYT-500', 'PMA-CPT'],
      bio: 'Mindful movement instructor focusing on flexibility, balance, and mental wellness.',
      hourlyRate: 70
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david.kim@fitpro.com',
      phone: '+1 (555) 321-0987',
      specialty: 'CrossFit',
      experience: 4,
      rating: 4.6,
      clients: 19,
      status: 'active',
      certifications: ['CF-L2', 'USAW-L1'],
      bio: 'CrossFit coach with expertise in Olympic lifting and functional fitness programming.',
      hourlyRate: 80
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  const filteredTrainers = trainers.filter(trainer => {
    const matchesSearch = trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trainer.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trainer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || trainer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddTrainer = () => {
    setSelectedTrainer(null);
    setIsModalOpen(true);
  };

  const handleEditTrainer = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setIsModalOpen(true);
  };

  const handleDeleteTrainer = (trainerId: number) => {
    setTrainers(trainers.filter(trainer => trainer.id !== trainerId));
  };

  const handleSaveTrainer = (trainerData: Partial<Trainer>) => {
    if (selectedTrainer) {
      setTrainers(trainers.map(trainer => 
        trainer.id === selectedTrainer.id ? { ...trainer, ...trainerData } : trainer
      ));
    } else {
      const newTrainer = {
        ...trainerData,
        id: Math.max(...trainers.map(t => t.id)) + 1,
        rating: 0,
        clients: 0
      } as Trainer;
      setTrainers([...trainers, newTrainer]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Trainer Management</h2>
          <p className="text-gray-600 mt-1">Manage fitness trainers and their profiles</p>
        </div>
        <button
          onClick={handleAddTrainer}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Add Trainer</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search trainers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredTrainers.map((trainer) => (
            <div key={trainer.id} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                    <span className="text-lg font-semibold text-white">
                      {trainer.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">{trainer.name}</h3>
                    <p className="text-sm text-blue-600 font-medium">{trainer.specialty}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleEditTrainer(trainer)}
                    className="text-blue-600 hover:text-blue-800 p-1 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteTrainer(trainer.id)}
                    className="text-red-600 hover:text-red-800 p-1 rounded-lg hover:bg-red-50 transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="truncate">{trainer.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{trainer.phone}</span>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4 line-clamp-2">{trainer.bio}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-center text-blue-600 mb-1">
                    <Star className="h-4 w-4 mr-1" />
                    <span className="font-semibold">{trainer.rating}</span>
                  </div>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-center text-green-600 mb-1">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="font-semibold">{trainer.clients}</span>
                  </div>
                  <p className="text-xs text-gray-500">Clients</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-center text-purple-600 mb-1">
                    <Award className="h-4 w-4 mr-1" />
                    <span className="font-semibold">{trainer.experience}y</span>
                  </div>
                  <p className="text-xs text-gray-500">Experience</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center justify-center text-orange-600 mb-1">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-semibold">{trainer.hourlyRate}</span>
                  </div>
                  <p className="text-xs text-gray-500">Per Hour</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Certifications:</p>
                <div className="flex flex-wrap gap-1">
                  {trainer.certifications.map((cert, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  trainer.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {trainer.status}
                </span>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedTrainer ? 'Edit Trainer' : 'Add New Trainer'}
      >
        <TrainerForm
          trainer={selectedTrainer}
          onSave={handleSaveTrainer}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default TrainerManagement;