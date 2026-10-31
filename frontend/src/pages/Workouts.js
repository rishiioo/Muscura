import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getRecommendedWorkouts, getWorkouts } from '../services/api';
import Navbar from '../components/Navbar';
import { WorkoutCard } from '../components/WorkoutCard';
import { Loader2, Filter } from 'lucide-react';

const Workouts = () => {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    goal: '',
    difficulty: '',
    day: '',
  });

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      try {
        let params = {};
        if (user?.goal && user?.goal !== 'healthy') {
          params.goal = user.goal;
        }
        if (filter.difficulty) params.difficulty = filter.difficulty;
        if (filter.day) params.day = filter.day;

        const res = await getWorkouts(params);
        setWorkouts(res.data);
      } catch (err) {
        console.error('Error fetching workouts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkouts();
  }, [user, filter]);

  const clearFilters = () => {
    setFilter({ goal: '', difficulty: '', day: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Workouts</h1>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={filter.difficulty}
              onChange={(e) => setFilter({ ...filter, difficulty: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-1"
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <select
              value={filter.day}
              onChange={(e) => setFilter({ ...filter, day: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-1"
            >
              <option value="">All Days</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
          {filter.difficulty || filter.day ? (
            <button onClick={clearFilters} className="text-blue-600 hover:underline">
              Clear Filters
            </button>
          ) : null}
        </div>

        {/* Workouts Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : workouts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No workouts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <WorkoutCard key={workout._id} workout={workout} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Workouts;