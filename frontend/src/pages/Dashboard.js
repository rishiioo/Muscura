import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMySubscription } from '../services/api';
import { Link } from 'react-router-dom';
import { Calendar, Award, Zap } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const res = await getMySubscription();
        setSubscription(res.data);
      } catch (err) {
        console.error('Error fetching subscription:', err);
      }
    };
    fetchSubscription();
  }, []);

  const getGoalDisplay = (goal) => {
    const goals = {
      cut: 'Cutting',
      bulk: 'Bulking',
      healthy: 'Healthy Lifestyle',
    };
    return goals[goal] || 'Set Your Goal';
  };

  const getDietDisplay = (diet) => {
    return diet ? `${diet.charAt(0).toUpperCase() + diet.slice(1)}` : 'No preference set';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name || 'Athlete'}!
          </h1>
          <p className="text-gray-600 mt-1">
            {getGoalDisplay(user?.goal)} • {getDietDisplay(user?.dietPreference)}
          </p>
        </div>

        {/* Subscription Status */}
        {subscription && subscription.subscription && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-blue-800">Your Subscription</h3>
            <p className="text-sm text-blue-600">
              {subscription.subscription.name} - {subscription.daysRemaining} days remaining
            </p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/workouts" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Your Workouts</h3>
                <p className="text-gray-500">Track and plan your training sessions</p>
              </div>
            </div>
          </Link>

          <Link to="/schedule" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Weekly Schedule</h3>
                <p className="text-gray-500">View your planned workout routine</p>
              </div>
            </div>
          </Link>

          <Link to="/progress" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Progress Tracker</h3>
                <p className="text-gray-500">Monitor your transformation journey</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;