import React, { useState, useEffect } from 'react';

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

interface PackageFormProps {
  package: TrainingPackage | null;
  onSave: (packageData: Partial<TrainingPackage>) => void;
  onCancel: () => void;
}

const PackageForm: React.FC<PackageFormProps> = ({ package: pkg, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    trainer: '',
    price: 0,
    duration: 0,
    sessions: 0,
    description: '',
    category: '',
    status: 'active' as 'active' | 'inactive',
    maxCapacity: 0,
    difficulty: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
    equipment: [] as string[]
  });

  const [newEquipment, setNewEquipment] = useState('');

  const trainers = [
    'Sarah Wilson',
    'Mike Johnson',
    'Emily Rodriguez',
    'David Kim'
  ];

  const categories = [
    'Strength Training',
    'Cardio',
    'Yoga',
    'CrossFit',
    'Personal Training',
    'Nutrition Coaching',
    'Pilates',
    'HIIT'
  ];

  useEffect(() => {
    if (pkg) {
      setFormData({
        name: pkg.name,
        trainer: pkg.trainer,
        price: pkg.price,
        duration: pkg.duration,
        sessions: pkg.sessions,
        description: pkg.description,
        category: pkg.category,
        status: pkg.status,
        maxCapacity: pkg.maxCapacity,
        difficulty: pkg.difficulty,
        equipment: pkg.equipment
      });
    }
  }, [pkg]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: ['price', 'duration', 'sessions', 'maxCapacity'].includes(name) ? Number(value) : value 
    }));
  };

  const addEquipment = () => {
    if (newEquipment.trim()) {
      setFormData(prev => ({
        ...prev,
        equipment: [...prev.equipment, newEquipment.trim()]
      }));
      setNewEquipment('');
    }
  };

  const removeEquipment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Package Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="trainer" className="block text-sm font-medium text-gray-700 mb-1">
            Trainer
          </label>
          <select
            id="trainer"
            name="trainer"
            value={formData.trainer}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Trainer</option>
            {trainers.map(trainer => (
              <option key={trainer} value={trainer}>{trainer}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
            Duration (weeks)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="1"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="sessions" className="block text-sm font-medium text-gray-700 mb-1">
            Sessions
          </label>
          <input
            type="number"
            id="sessions"
            name="sessions"
            value={formData.sessions}
            onChange={handleChange}
            min="1"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="maxCapacity" className="block text-sm font-medium text-gray-700 mb-1">
            Max Capacity
          </label>
          <input
            type="number"
            id="maxCapacity"
            name="maxCapacity"
            value={formData.maxCapacity}
            onChange={handleChange}
            min="1"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty Level
          </label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Describe the training package..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Equipment Required
        </label>
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            value={newEquipment}
            onChange={(e) => setNewEquipment(e.target.value)}
            placeholder="Add equipment"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={addEquipment}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.equipment.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
            >
              {item}
              <button
                type="button"
                onClick={() => removeEquipment(index)}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          {pkg ? 'Update Package' : 'Add Package'}
        </button>
      </div>
    </form>
  );
};

export default PackageForm;