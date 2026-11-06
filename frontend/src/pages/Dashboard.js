import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMySubscription } from '../services/api';
import { Link } from 'react-router-dom';
import { Calendar, Award, Zap, Compass, Utensils, Flame } from 'lucide-react';
import WhyThisPlan from '../components/WhyThisPlan';
import IndianDietGuide from '../components/IndianDietGuide';
import BeginnerGuide from '../components/BeginnerGuide';
import MotivationHub from '../components/MotivationHub';

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
      cut: 'Cutting & Fat Loss',
      bulk: 'Bulking & Muscle Gain',
      healthy: 'Healthy Lifestyle',
    };
    return goals[goal] || 'Set Your Goal';
  };

  const getDietDisplay = (diet) => {
    return diet ? `${diet.charAt(0).toUpperCase() + diet.slice(1)} Diet` : 'No preference set';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-6 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Welcome back, {user?.name || 'Athlete'}! 💪
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {getGoalDisplay(user?.goal)} • {getDietDisplay(user?.dietPreference)}
            </p>
          </div>
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-xs font-bold border border-blue-100 hover:bg-blue-100 transition-colors flex items-center gap-2 shadow-2xs"
            >
              🛡️ Gym Owner Dashboard
            </Link>
          )}
        </div>

        {/* Subscription Status */}
        {subscription && subscription.subscription && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6 flex justify-between items-center shadow-2xs">
            <div>
              <h3 className="font-bold text-emerald-900 text-sm">Active Gym Subscription</h3>
              <p className="text-xs text-emerald-700 mt-0.5">
                {subscription.subscription.name} — <strong className="font-bold">{subscription.daysRemaining} days remaining</strong>
              </p>
            </div>
            <span className="bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
              Valid ✓
            </span>
          </div>
        )}

        {/* Motivation Hub & Streaks */}
        <MotivationHub streakCount={6} totalLogsCount={9} />

        {/* "Why This Plan?" Rationale Explainer */}
        <WhyThisPlan user={user} />

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <Link to="/workouts" className="bg-white rounded-2xl p-6 shadow-2xs border border-gray-100 hover:shadow-md transition-all group">
            <div className="flex items-center space-x-4">
              <div className="p-3.5 bg-orange-100 rounded-2xl text-orange-600 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Your Workouts</h3>
                <p className="text-xs text-gray-500 mt-0.5">Custom splits & video guides</p>
              </div>
            </div>
          </Link>

          <Link to="/schedule" className="bg-white rounded-2xl p-6 shadow-2xs border border-gray-100 hover:shadow-md transition-all group">
            <div className="flex items-center space-x-4">
              <div className="p-3.5 bg-emerald-100 rounded-2xl text-emerald-600 group-hover:scale-110 transition-transform">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Weekly Schedule</h3>
                <p className="text-xs text-gray-500 mt-0.5">Day-wise training calendar</p>
              </div>
            </div>
          </Link>

          <Link to="/progress" className="bg-white rounded-2xl p-6 shadow-2xs border border-gray-100 hover:shadow-md transition-all group">
            <div className="flex items-center space-x-4">
              <div className="p-3.5 bg-purple-100 rounded-2xl text-purple-600 group-hover:scale-110 transition-transform">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Progress Tracker</h3>
                <p className="text-xs text-gray-500 mt-0.5">Weight charts & milestone logs</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Indian Budget Diet Guide */}
        <IndianDietGuide userDiet={user?.dietPreference} />

        {/* Beginner First Week Guide */}
        <BeginnerGuide />
      </div>
    </div>
  );
};

export default Dashboard;