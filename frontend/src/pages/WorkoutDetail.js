import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getWorkoutById, addProgressLog } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Loader2, CheckCircle, Calendar, Video } from 'lucide-react';

const WorkoutDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const res = await getWorkoutById(id);
        setWorkout(res.data);
      } catch (err) {
        console.error('Error fetching workout:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkout();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex justify-center">
        <p className="text-gray-500">Workout not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/workouts" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Workouts
        </Link>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{workout.name}</h1>
              <p className="text-gray-600">{workout.description}</p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {workout.difficulty}
            </span>
          </div>

          <div className="flex gap-4 text-sm text-gray-500 mb-4">
            {workout.day && (
              <span>🗓️ {workout.day}</span>
            )}
            <span> 🏋️ {workout.exercises?.length} exercises</span>
            <span> ⏱️ {workout.duration} min</span>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">Exercises</h3>
            <div className="space-y-3">
              {workout.exercises?.map((exercise, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{exercise.name}</h4>
                      <p className="text-sm text-gray-500">
                        {exercise.sets} sets × {exercise.reps} reps
                      </p>
                      {exercise.rest && <p className="text-xs text-gray-400">Rest: {exercise.rest}</p>}
                    </div>
                    {exercise.youtubeLink && (
                      <a
                        href={exercise.youtubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-500"
                      >
                        <Video className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowCompleteModal(true)}
          className="w-full md:w-auto bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <CheckCircle className="h-5 w-5" />
          Mark as Complete
        </button>
      </div>
    </div>
  );
};

export default WorkoutDetail;