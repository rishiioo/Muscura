import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Calendar, Target, CheckCircle, Plus } from 'lucide-react';
import { setDayWorkout } from '../services/api';
import { useToast } from './Toast';

const WorkoutCard = ({ workout, onClick }) => {
  const toast = useToast();
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [adding, setAdding] = useState(false);

  const handleAddToSchedule = async (e) => {
    e.stopPropagation();
    if (!selectedDay) return;
    setAdding(true);
    try {
      await setDayWorkout(selectedDay, { workoutId: workout._id });
      toast('Added to schedule', 'success');
      setShowPicker(false);
      setSelectedDay('');
    } catch (err) {
      console.error('Error adding to schedule:', err);
      toast('Failed to add to schedule', 'error');
    } finally {
      setAdding(false);
    }
  };
  const goalColors = {
    cut: 'bg-red-100 text-red-700',
    bulk: 'bg-green-100 text-green-700',
    healthy: 'bg-blue-100 text-blue-700',
    'upper body': 'bg-orange-100 text-orange-700',
    'lower body': 'bg-purple-100 text-purple-700',
  };

  const difficultyLabels = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 text-lg">{workout.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${goalColors[workout.goal] || 'bg-gray-100 text-gray-700'}`}>
            {workout.goal || 'General'}
          </span>
        </div>

        <p className="text-gray-500 text-sm mb-3">{workout.description}</p>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            {workout.day || 'Any Day'}
          </span>
          <span className="text-xs text-gray-500">
            🏋️ {workout.exercises?.length || 0} exercises
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Level: {difficultyLabels[workout.difficulty] || 'Beginner'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); setShowPicker(!showPicker); }}
              className="text-blue-600 hover:text-blue-500 text-sm font-medium flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Add to schedule
            </button>
            <Link
              to={`/workouts/${workout._id}`}
              className="text-blue-600 hover:text-blue-500 text-sm font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              View Details
            </Link>
          </div>
        </div>
        {showPicker && (
          <div className="mt-3 flex gap-2">
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm flex-1"
            >
              <option value="">Pick a day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            <button
              onClick={handleAddToSchedule}
              disabled={!selectedDay || adding}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {adding ? 'Adding...' : 'Add'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Export with named export
export { WorkoutCard };

// Default export for the main component
export default WorkoutCard;