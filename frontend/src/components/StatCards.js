import React from 'react';
import { Users, Shield, TrendingUp, Target, Zap } from 'lucide-react';

const StatCard = ({ stat, icon: Icon, title }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-100 rounded-full">
          <Icon className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{stat}</p>
        </div>
      </div>
    </div>
  </div>
);

export const StatCards = ({ stats }) => {
  const statItems = [
    { stat: stats.userCount, icon: Users, title: 'Total Members' },
    { stat: stats.activeSubCount, icon: Shield, title: 'Active Subscriptions' },
    { stat: stats.workoutCount, icon: Target, title: 'Workout Plans' },
    { stat: stats.subscriptionCount, icon: TrendingUp, title: 'Subscription Plans' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <StatCard key={index} stat={item.stat} icon={item.icon} title={item.title} />
      ))}
    </div>
  );
};

export const QuickStats = ({ stats }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
    <div className="space-y-3">
      {stats.recentMembers?.map((member) => (
        <div key={member._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-800">{member.name}</p>
            <p className="text-sm text-gray-500">{member.email}</p>
          </div>
          <span className="text-xs text-gray-400">
            {new Date(member.createdAt).toLocaleDateString()}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default StatCard;