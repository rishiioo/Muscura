import React from 'react';
import { Dumbbell, BarChart3, Calendar, Users, ShieldCheck, Activity } from 'lucide-react';

const features = [
  {
    icon: Dumbbell,
    title: 'Workout Library',
    desc: 'Access hundreds of exercises with detailed instructions and videos to perfect your form.',
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    desc: 'Visualize your strength gains and body metrics over time with interactive charts.',
  },
  {
    icon: Calendar,
    title: 'Smart Planner',
    desc: 'Plan your workout splits effortlessly and stay consistent with your fitness routine.',
  },
  {
    icon: Users,
    title: 'Community Hub',
    desc: 'Connect with other lifters, share milestones, and stay motivated every single day.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Cloud Sync',
    desc: 'Your workout logs and history are securely synced across all your devices.',
  },
  {
    icon: Activity,
    title: 'Progressive Overload',
    desc: 'Log weights, reps, and sets in real-time with smart analytics and personal records.',
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Everything You Need</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-md transition">
              <feature.icon className="text-4xl text-blue-600 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;