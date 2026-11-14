import React from 'react';
import { motion } from 'framer-motion';
import { useAppSelector } from '../hooks';
import { selectUserProgress, selectUserMetrics, selectUserProfile } from '../store';

const StatCards = () => {
  const progress = useAppSelector(selectUserProgress);
  const metrics = useAppSelector(selectUserMetrics);
  const profile = useAppSelector(selectUserProfile);

  const calculateProgress = () => {
    if (!progress || progress.totalChallenges === 0) return 0;
    return Math.round((progress.completedChallenges / progress.totalChallenges) * 100);
  };

  const formatWorkoutTime = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const statCards = [
    {
      key: 'challenges',
      label: 'Challenges Completed',
      value: progress?.completedChallenges || 0,
      icon: 'fas fa-trophy',
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      progress: calculateProgress(),
    },
    {
      key: 'workouts',
      label: 'Workout Sessions',
      value: metrics?.workoutsCompleted || 0,
      icon: 'fas fa-dumbbell',
      color: 'bg-gradient-to-r from-green-500 to-green-600',
    },
    {
      key: 'time',
      label: 'Total Workout Time',
      value: formatWorkoutTime(metrics?.totalWorkoutTime || 0),
      icon: 'fas fa-clock',
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
    },
    {
      key: 'streak',
      label: 'Current Streak',
      value: profile?.currentStreak || 0,
      icon: 'fas fa-fire',
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card, index) => (
        <motion.div
          key={card.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg text-white ${card.color}`}>
              <i className={`${card.icon} text-xl`}></i>
            </div>
            {card.progress && (
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800">{card.progress}%</div>
                <div className="text-xs text-gray-500">Complete</div>
              </div>
            )}
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">{card.label}</h3>
          <p className="text-3xl font-bold text-gray-900">{card.value}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatCards;