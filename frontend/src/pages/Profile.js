import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateUserPreferences } from '../services/api';
import { Save, User, LogOut } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({
    weight: user?.weight || '',
    height: user?.height || '',
    goal: user?.goal || '',
    gymExperience: user?.gymExperience || '',
    dietPreference: user?.dietPreference || '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateUserPreferences(formData);
      setMessage('Profile updated!');
    } catch (err) {
      setMessage('Error updating profile');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Profile Settings</h1>
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
              <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
              <input type="number" name="height" value={formData.height} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Goal</label>
              <select name="goal" value={formData.goal} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                <option value="cut">Cutting</option>
                <option value="bulk">Bulking</option>
                <option value="healthy">Healthy</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Diet</label>
              <select name="dietPreference" value={formData.dietPreference} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                <option value="veg">Vegetarian</option>
                <option value="non-veg">Non-Veg</option>
              </select>
            </div>
          </div>

          {message && <p className="mt-4 text-sm text-blue-600 font-medium">{message}</p>}

          <div className="mt-8 flex gap-4">
            <button onClick={handleSave} disabled={saving} className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
              <Save className="h-4 w-4" /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button onClick={logout} className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;