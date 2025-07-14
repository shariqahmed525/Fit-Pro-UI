import React, { useState, useEffect } from 'react';

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

interface TrainerFormProps {
  trainer: Trainer | null;
  onSave: (trainerData: Partial<Trainer>) => void;
  onCancel: () => void;
}

const TrainerForm: React.FC<TrainerFormProps> = ({ trainer, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    experience: 0,
    status: 'active' as 'active' | 'inactive',
    certifications: [] as string[],
    bio: '',
    hourlyRate: 0
  });

  const [newCertification, setNewCertification] = useState('');

  useEffect(() => {
    if (trainer) {
      setFormData({
        name: trainer.name,
        email: trainer.email,
        phone: trainer.phone,
        specialty: trainer.specialty,
        experience: trainer.experience,
        status: trainer.status,
        certifications: trainer.certifications,
        bio: trainer.bio,
        hourlyRate: trainer.hourlyRate
      });
    }
  }, [trainer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'experience' || name === 'hourlyRate' ? Number(value) : value 
    }));
  };

  const addCertification = () => {
    if (newCertification.trim()) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()]
      }));
      setNewCertification('');
    }
  };

  const removeCertification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
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

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
            Specialty
          </label>
          <select
            id="specialty"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Specialty</option>
            <option value="Weight Training">Weight Training</option>
            <option value="Cardio & HIIT">Cardio & HIIT</option>
            <option value="Yoga & Pilates">Yoga & Pilates</option>
            <option value="CrossFit">CrossFit</option>
            <option value="Personal Training">Personal Training</option>
            <option value="Nutrition Coaching">Nutrition Coaching</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
            Experience (Years)
          </label>
          <input
            type="number"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            min="0"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-1">
            Hourly Rate ($)
          </label>
          <input
            type="number"
            id="hourlyRate"
            name="hourlyRate"
            value={formData.hourlyRate}
            onChange={handleChange}
            min="0"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
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
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Brief description about the trainer..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Certifications
        </label>
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            value={newCertification}
            onChange={(e) => setNewCertification(e.target.value)}
            placeholder="Add certification"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={addCertification}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.certifications.map((cert, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
            >
              {cert}
              <button
                type="button"
                onClick={() => removeCertification(index)}
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
          {trainer ? 'Update Trainer' : 'Add Trainer'}
        </button>
      </div>
    </form>
  );
};

export default TrainerForm;