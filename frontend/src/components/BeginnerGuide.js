import React, { useState } from 'react';
import { Compass, ShieldCheck, Flame, ChevronRight } from 'lucide-react';

export const BeginnerGuide = () => {
  const [activeTab, setActiveTab] = useState('week1');

  const warmups = [
    { title: 'Arm Circles & Hugs', duration: '60 seconds', detail: 'Warm up shoulders and chest rotators.' },
    { title: 'Bodyweight Squats', duration: '15 reps', detail: 'Activate glutes, quads and hip flexors.' },
    { title: 'Cat-Cow Stretch', duration: '10 reps', detail: 'Mobilize spinal column before lifting.' },
    { title: 'Jumping Jacks / Light Jog', duration: '2 minutes', detail: 'Raise core heart rate & body temperature.' }
  ];

  const safetyTips = [
    { rule: '1. Form Over Weight', desc: 'Always master bodyweight movements before adding heavy iron weights.' },
    { rule: '2. Controlled Tempo', desc: 'Lower weights for 2 seconds, pause 1 second, explode up for 1 second.' },
    { rule: '3. Hydration & Rest', desc: 'Sip 500ml water during workouts and take 60-90s rest between sets.' },
    { rule: '4. Re-rack Weights', desc: 'Always wipe down machines & return dumbbells after your sets.' }
  ];

  const firstWeekPlan = [
    { day: 'Day 1', focus: 'Upper Body Light', detail: 'Machine Chest Press, Lat Pulldowns, Dumbbell Bicep Curls (3x10)' },
    { day: 'Day 2', focus: 'Rest & Mobility', detail: 'Light 20-min brisk walking + full body stretching' },
    { day: 'Day 3', focus: 'Lower Body Light', detail: 'Bodyweight Squats, Leg Press, Romanian Deadlifts with light DB (3x10)' },
    { day: 'Day 4', focus: 'Rest Day', detail: 'Hydration, 8 hours sleep, high protein nutrition' },
    { day: 'Day 5', focus: 'Full Body Circuit', detail: 'Dumbbell Shoulder Press, Incline Machine, Seated Cable Row (3x12)' },
    { day: 'Weekend', focus: 'Recovery', detail: 'Active recovery (cycling, swimming, or light walk)' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 my-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-100 rounded-xl text-blue-700">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Beginner's Gym Starter Guide</h2>
            <p className="text-xs text-gray-500">Your first week roadmap, warm-up routine & form safety rules</p>
          </div>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('week1')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold ${
              activeTab === 'week1' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🗓️ First Week Plan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('warmup')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold ${
              activeTab === 'warmup' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🔥 5-Min Warmup
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('safety')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold ${
              activeTab === 'safety' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🛡️ Form & Safety
          </button>
        </div>
      </div>

      {activeTab === 'week1' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {firstWeekPlan.map((item, idx) => (
            <div key={idx} className="bg-blue-50/40 border border-blue-100 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">{item.day}</span>
                <span className="text-xs font-semibold text-gray-800">{item.focus}</span>
              </div>
              <p className="text-xs text-gray-600 mt-2">{item.detail}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'warmup' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {warmups.map((w, idx) => (
            <div key={idx} className="border border-orange-100 bg-orange-50/40 p-3.5 rounded-xl flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-1.5">
                  <Flame className="h-4 w-4 text-orange-500" /> {w.title}
                </h4>
                <p className="text-xs text-gray-600 mt-1">{w.detail}</p>
              </div>
              <span className="text-[11px] font-bold text-orange-700 bg-white px-2 py-1 rounded-md border border-orange-200">{w.duration}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'safety' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {safetyTips.map((tip, idx) => (
            <div key={idx} className="border border-emerald-100 bg-emerald-50/40 p-3.5 rounded-xl">
              <h4 className="font-bold text-emerald-900 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> {tip.rule}
              </h4>
              <p className="text-xs text-gray-700">{tip.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BeginnerGuide;