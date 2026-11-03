import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { getMySchedule, removeDayWorkout } from '../services/api';
import { Link } from 'react-router-dom';
import { Loader2, Calendar, Dumbbell, Trash2 } from 'lucide-react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const recoveryTips = {
  Monday: 'Light stretching helps recovery.',
  Tuesday: 'Hydrate and rest your legs.',
  Wednesday: 'Focus on mobility work.',
  Thursday: 'Foam roll your muscles.',
  Friday: 'Get 8 hours of sleep.',
  Saturday: 'Active recovery walk.',
  Sunday: 'Rest completely.',
};

const Schedule = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removingDay, setRemovingDay] = useState(null);

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getMySchedule();
        setSchedule(res.data);
      } catch (err) {
        console.error('Error fetching schedule:', err);
        setError('Could not load schedule.');
        toast('Could not load schedule', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, [toast]);

  const handleRemoveDay = async (day) => {
    setRemovingDay(day);
    try {
      const res = await removeDayWorkout(day);
      setSchedule(res.data);
      toast('Workout removed', 'success');
    } catch (err) {
      console.error('Error removing workout:', err);
      toast('Failed to remove workout', 'error');
    } finally {
      setRemovingDay(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!schedule) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex flex-col items-center justify-center">
        <p className="text-gray-500 text-lg mb-4">You haven't chosen a plan yet.</p>
        <Link to="/workouts" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Go to Workouts
        </Link>
      </div>
    );
  }

  const itemsByDay = days.reduce((acc, day) => {
    const item = schedule.items.find(i => i.day === day);
    acc[day] = item || { day, workout: null, isRest: true };
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Weekly Schedule</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {days.map((day) => {
            const item = itemsByDay[day];
            const workout = item.workout;
            const isToday = day === today;
            return (
              <div key={day} className={`bg-white rounded-xl shadow-sm p-4 ${isToday ? 'ring-2 ring-blue-500' : ''}`}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-900">{day}</h3>
                  {isToday && <span className="text-xs text-blue-600 font-medium">Today</span>}
                </div>
                {workout ? (
                  <div>
                    <p className="font-medium text-gray-900">{workout.name}</p>
                    <p className="text-xs text-gray-500">{workout.goal}</p>
                    <p className="text-xs text-gray-500">{workout.duration} min · {workout.exercises?.length} exercises</p>
                    <div className="mt-2 flex gap-2">
                      <Link to={`/workouts/${workout._id}`} className="text-blue-600 text-xs hover:underline">
                        View Details
                      </Link>
                      <button
                        onClick={() => handleRemoveDay(day)}
                        disabled={removingDay === day}
                        className="text-red-500 text-xs hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="h-3 w-3" />
                        {removingDay === day ? 'Removing...' : 'Remove'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500 text-sm font-medium">Rest day</p>
                    <p className="text-xs text-gray-400 mt-1">{recoveryTips[day]}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Schedule;