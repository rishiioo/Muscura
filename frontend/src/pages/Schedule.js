import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getRecommendedWorkouts } from '../services/api';
import { Loader2, Calendar } from 'lucide-react';

const Schedule = () => {
  const { user } = useAuth();
  const [weeklySchedule, setWeeklySchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      try {
        const goal = user?.goal !== 'healthy' ? user?.goal : null;
        const res = await getRecommendedWorkouts({ goal, difficulty: 'beginner' });
        
        // Organize workouts by day
        const schedule = days.reduce((acc, day) => {
          acc[day] = res.data.filter(w => w.day === day);
          return acc;
        }, {});
        
        setWeeklySchedule(schedule);
      } catch (err) {
        console.error('Error fetching workouts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkouts();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Weekly Schedule</h1>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-7">
            {days.map((day) => (
              <div key={day} className="border-r border-gray-100 last:border-r-0">
                <div className="bg-gray-50 p-3">
                  <h3 className="font-semibold text-gray-900 text-center">{day}</h3>
                </div>
                <div className="p-2">
                  {weeklySchedule[day]?.length > 0 ? (
                    weeklySchedule[day].map((workout) => (
                      <div key={workout._id} className="p-2 mb-2 bg-blue-50 rounded-lg">
                        <p className="font-medium text-sm text-blue-900">{workout.name}</p>
                        <p className="text-xs text-blue-700">{workout.exercises?.length} exercises</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 text-center py-2">Rest day</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">YouTube Workout Tutorials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <iframe
                width="100%"
                height="150"
                src="https://www.youtube.com/embed/CyM6mPQ2flA"
                title="Upper Body Workout"
                style={{ borderRadius: '8px' }}
                allowFullScreen
              />
              <p className="mt-2 text-sm font-medium text-gray-700">Upper Body Workout</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <iframe
                width="100%"
                height="150"
                src="https://www.youtube.com/embed/iK3eERQQ7tA"
                title="Lower Body Workout"
                style={{ borderRadius: '8px' }}
                allowFullScreen
              />
              <p className="mt-2 text-sm font-medium text-gray-700">Lower Body Workout</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <iframe
                width="100%"
                height="150"
                src="https://www.youtube.com/embed/V8f8uTJQ8bQ"
                title="Full Body HIIT"
                style={{ borderRadius: '8px' }}
                allowFullScreen
              />
              <p className="mt-2 text-sm font-medium text-gray-700">Full Body HIIT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;