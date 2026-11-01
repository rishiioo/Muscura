import React from 'react';
import { Award, Flame, Zap, ShieldCheck, Trophy, Sparkles } from 'lucide-react';

export const MotivationHub = ({ streakCount = 5, totalLogsCount = 8 }) => {
  const badges = [
    { title: 'First Step', icon: '🚀', desc: 'Logged first workout session', unlocked: totalLogsCount >= 1 },
    { title: 'Consistency Champion', icon: '🔥', desc: 'Maintained 3-day workout streak', unlocked: streakCount >= 3 },
    { title: 'Gym Veteran', icon: '⚡', desc: 'Recorded 5+ progress updates', unlocked: totalLogsCount >= 5 },
    { title: 'Protein Master', icon: '🥗', desc: 'Set student diet preferences', unlocked: true },
    { title: 'Iron Scholar', icon: '🏆', desc: 'Explored workout routines', unlocked: true }
  ];

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200/80 p-5 my-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 pb-3 border-b border-amber-200/60">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-500 text-white rounded-xl shadow-xs">
            <Flame className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-gray-900">{streakCount} Day Streak!</h2>
              <span className="bg-orange-100 text-orange-800 text-[11px] font-bold px-2 py-0.5 rounded-full border border-orange-200">
                🔥 ON FIRE
              </span>
            </div>
            <p className="text-xs text-amber-800 mt-0.5">Keep up the momentum to unlock more achievement badges</p>
          </div>
        </div>

        <div className="bg-white px-4 py-2 rounded-xl border border-amber-200 shadow-2xs text-center">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">Total Check-Ins</span>
          <span className="text-lg font-black text-orange-600">{totalLogsCount} Logs</span>
        </div>
      </div>

      {/* Badges Carousel / Grid */}
      <div>
        <h3 className="text-xs font-extrabold text-amber-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Trophy className="h-4 w-4 text-amber-600" /> Unlockable Achievements
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border text-center transition-all ${
                badge.unlocked
                  ? 'bg-white border-amber-200 shadow-2xs hover:scale-105'
                  : 'bg-amber-100/40 border-amber-200/50 opacity-60 grayscale'
              }`}
            >
              <div className="text-2xl mb-1">{badge.icon}</div>
              <p className="font-bold text-xs text-gray-900 truncate">{badge.title}</p>
              <p className="text-[10px] text-gray-500 mt-1 leading-snug">{badge.desc}</p>
              {badge.unlocked && (
                <span className="mt-2 inline-block text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                  Unlocked ✓
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MotivationHub;