import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Dumbbell, BarChart3, Calendar, Users, ArrowRight, Play, Star,
  ShieldCheck, Flame, Trophy, Zap, Heart, CheckCircle2, Activity,
  Smartphone, Award, ChevronRight, Target
} from 'lucide-react';

const LandingPage = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('strength');

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">Loading...</div>;
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-xs sm:text-sm font-semibold py-2 px-4 text-center flex items-center justify-center gap-2">
        <SparkleBadge /> <span>New: 6-Day Aesthetic Workout Split & Indian Macro Nutrition Guides Live!</span>
        <Link to="/login" className="underline hover:text-white font-bold ml-1 inline-flex items-center">Explore <ChevronRight className="h-3 w-3"/></Link>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Dumbbell className="h-6 w-6 text-white"/>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">Muscura</span>
              <span className="text-[10px] tracking-widest uppercase text-blue-400 font-bold">Elite Fitness & Nutrition</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
            <a href="#splits" className="hover:text-blue-400 transition-colors">Workouts</a>
            <a href="#nutrition" className="hover:text-blue-400 transition-colors">Nutrition</a>
            <a href="#testimonials" className="hover:text-blue-400 transition-colors">Community</a>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-sm font-bold text-slate-300 hover:text-white px-3 py-2">Log In</Link>
            <Link to="/login" className="relative group overflow-hidden rounded-2xl p-[1px]">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 animate-gradient"></span>
              <span className="relative px-5 py-2.5 bg-slate-950 rounded-2xl flex items-center gap-2 text-sm font-bold text-white transition-all group-hover:bg-opacity-0">
                Get Started Free <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform"/>
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 grid lg:grid-cols-12 gap-12 items-center">

          {/* Left Text */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Flame className="h-3.5 w-3.5 text-blue-400 animate-pulse"/> Built for Serious Lifters & Beginners
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
              Transform Your Body with <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Precision Training</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              The ultimate web fitness platform inspired by world-class workout apps. Master custom aesthetic splits, track progressive overload, and fuel with tailored Indian nutrition.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/25 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5">
                <span>Start Training Free</span> <ArrowRight className="h-5 w-5"/>
              </Link>
              <a href="#features" className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-bold rounded-2xl flex items-center justify-center gap-3 transition-all">
                <Play className="h-4 w-4 text-blue-400 fill-blue-400"/> Watch Overview
              </a>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">1,000+</div>
                <div className="text-xs text-slate-400 mt-1">Exercises & Logs</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">6-Day</div>
                <div className="text-xs text-slate-400 mt-1">Aesthetic Split</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
                <div className="text-xs text-slate-400 mt-1">Free & Secure</div>
              </div>
            </div>

          </div>

          {/* Right Interactive Mockup */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glow Frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[32px] blur-xl opacity-30 animate-pulse"></div>

              <div className="relative bg-slate-900 border border-slate-800 rounded-[28px] p-6 shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <span className="text-xs font-mono text-slate-400">muscura.app/workout</span>
                  <Activity className="h-4 w-4 text-blue-400"/>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <span className="text-xs text-blue-400 font-bold uppercase tracking-wider">Active Session</span>
                      <h4 className="font-bold text-lg text-white mt-0.5">Push Day (Chest & Triceps)</h4>
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-3 py-1 rounded-full font-bold">In Progress</span>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-600/20 text-blue-400 p-2 rounded-lg font-bold text-xs">01</div>
                        <div>
                          <div className="font-bold text-sm text-slate-200">Barbell Bench Press</div>
                          <div className="text-xs text-slate-400">Set 3 of 4 • 80 kg × 8 reps</div>
                        </div>
                      </div>
                      <CheckCircle2 className="h-5 w-5 text-emerald-400"/>
                    </div>

                    <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 flex items-center justify-between opacity-80">
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-800 text-slate-400 p-2 rounded-lg font-bold text-xs">02</div>
                        <div>
                          <div className="font-bold text-sm text-slate-200">Incline Dumbbell Press</div>
                          <div className="text-xs text-slate-400">Set 1 of 4 • 32 kg × 10 reps</div>
                        </div>
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 border-slate-700"></div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-700/30 p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Trophy className="h-6 w-6 text-yellow-400"/>
                      <div>
                        <div className="text-xs text-blue-300 font-semibold">Personal Record!</div>
                        <div className="text-sm font-bold text-white">+5kg volume increase today</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono bg-blue-500 text-white px-2.5 py-1 rounded-lg font-bold">PR 🏆</span>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Brand Logos / Social Proof */}
      <section className="py-12 border-y border-slate-800/60 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">Designed with standards from top fitness ecosystems</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all">
            <span className="text-lg font-black tracking-wider text-slate-300 flex items-center gap-2"><Dumbbell className="h-5 w-5 text-blue-500"/> JEFIT-INSPIRED</span>
            <span className="text-lg font-black tracking-wider text-slate-300 flex items-center gap-2"><Target className="h-5 w-5 text-indigo-500"/> HYPERROPHY FOCUSED</span>
            <span className="text-lg font-black tracking-wider text-slate-300 flex items-center gap-2"><Award className="h-5 w-5 text-purple-500"/> PROGRESSIVE OVERLOAD</span>
            <span className="text-lg font-black tracking-wider text-slate-300 flex items-center gap-2"><Heart className="h-5 w-5 text-red-500"/> INDIAN NUTRITION READY</span>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">Powerful Capabilities</h2>
            <h3 className="text-3xl sm:text-5xl font-black tracking-tight">Everything You Need to Build Muscle & Burn Fat</h3>
            <p className="mt-4 text-slate-400 text-lg">Engineered to replace scattered notes and complicated spreadsheets with a seamless web experience.</p>
          </div>

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Dumbbell,
                title: 'Extensive Exercise Library',
                desc: 'Detailed instructions, muscle group targeting, and form breakdowns for compound & isolation movements.',
                badge: '1,000+ Exercises'
              },
              {
                icon: Calendar,
                title: 'Advanced Workout Planner',
                desc: 'Build or choose proven splits like Push/Pull/Legs, Upper/Lower, or the signature 6-Day Aesthetic Workout Split.',
                badge: 'Custom Splits'
              },
              {
                icon: BarChart3,
                title: 'Progressive Overload Tracking',
                desc: 'Log weights, reps, and sets in real-time. Visualize volume graphs and personal records effortlessly.',
                badge: 'Analytics'
              },
              {
                icon: Star,
                title: 'Indian Nutrition & Diet Guide',
                desc: 'Tailored macro breakdowns for Indian vegetarian and non-vegetarian muscle-building meals.',
                badge: 'Diet Hub'
              },
              {
                icon: Users,
                title: 'Community & Motivation Hub',
                desc: 'Connect with other lifters, share transformation milestones, and stay inspired every single day.',
                badge: 'Social'
              },
              {
                icon: ShieldCheck,
                title: 'Cloud Sync & Secure Auth',
                desc: 'Your workout logs and history are securely synced across all your devices with instant cloud backup.',
                badge: 'Secure'
              }
            ].map((feature, idx) => (
              <div key={idx} className="group relative bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-blue-500/50 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1">
                <div className="absolute top-6 right-6 text-xs font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {feature.badge}
                </div>
                <div className="bg-blue-600/10 group-hover:bg-blue-600 text-blue-400 group-hover:text-white w-14 h-14 rounded-2xl flex items-center justify-center transition-colors mb-6">
                  <feature.icon className="h-7 w-7"/>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workout Splits Showcase */}
      <section id="splits" className="py-28 bg-slate-900/30 border-y border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">PROVEN ROUTINES</span>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight mt-2">The 6-Day Aesthetic Workout Split</h3>
              <p className="mt-4 text-slate-400 text-lg leading-relaxed">
                Designed for maximum hypertrophy and balanced muscle proportion. Alternating push, pull, and leg days with dedicated recovery intervals.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {day: 'Day 1 & 4', title: 'Push (Chest, Shoulders, Triceps)', desc: 'Bench press, overhead press, lateral raises, pushdowns.'},
                  {day: 'Day 2 & 5', title: 'Pull (Back, Biceps, Rear Delts)', desc: 'Pull-ups, barbell rows, lat pulldowns, barbell curls.'},
                  {day: 'Day 3 & 6', title: 'Legs (Quads, Hamstrings, Calves)', desc: 'Squats, Romanian deadlifts, leg press, calf raises.'}
                ].map((split, i) => (
                  <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-start gap-4">
                    <div className="bg-blue-600/20 text-blue-400 px-3 py-1.5 rounded-xl font-mono text-xs font-bold whitespace-nowrap">
                      {split.day}
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-base">{split.title}</h5>
                      <p className="text-sm text-slate-400 mt-1">{split.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/login" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold text-base">
                  Explore full workout planner <ArrowRight className="h-4 w-4"/>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-gradient-to-br from-blue-900/20 via-indigo-900/20 to-purple-900/20 border border-blue-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Dumbbell className="w-48 h-48 text-white"/>
                </div>

                <h4 className="text-2xl font-black text-white mb-2">Built for Results</h4>
                <p className="text-slate-300 text-sm mb-6">Track your sets effortlessly with our intuitive logging interface.</p>

                <div className="space-y-4 relative z-10">
                  <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-xs text-emerald-400 font-bold">Recommended Rest Timer</span>
                      <div className="text-lg font-black text-white mt-0.5">90 Seconds</div>
                    </div>
                    <Zap className="h-6 w-6 text-yellow-400"/>
                  </div>

                  <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-xs text-blue-400 font-bold">Target Muscle Group</span>
                      <div className="text-lg font-black text-white mt-0.5">Pectorals & Anterior Delts</div>
                    </div>
                    <Target className="h-6 w-6 text-blue-400"/>
                  </div>

                  <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-xs text-purple-400 font-bold">Estimated Calorie Burn</span>
                      <div className="text-lg font-black text-white mt-0.5">450 - 600 kcal</div>
                    </div>
                    <Flame className="h-6 w-6 text-orange-400"/>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Link to="/login" className="w-full block bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-600/30">
                    Access This Workout Now
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-28 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/30 to-slate-950 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-[36px] p-12 sm:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Ready to Crush Your Fitness Goals?</h2>
            <p className="mt-4 text-blue-100 text-lg max-w-xl mx-auto">Join thousands of athletes building strength, muscle, and confidence with Muscura.</p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 hover:bg-slate-100 font-bold rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all">
                Get Started Free <ArrowRight className="h-4 w-4"/>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-400 text-sm">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white"><Dumbbell className="h-5 w-5"/></div>
            <span className="text-white font-black text-lg">Muscura</span>
          </div>
          <p>© {new Date().getFullYear()} Muscura Fitness Platform. Inspired by world-class training ecosystems.</p>
          <div className="flex space-x-6 text-xs">
            <Link to="/login" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/login" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/login" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};

// Helper Sparkle Badge
const SparkleBadge = () => (
  <svg className="w-4 h-4 text-white inline-block animate-spin" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v4m0 12v4M2 12h4m12 0h4m-3.172-6.828l-2.828 2.828m-8 8l-2.828 2.828m0-13.656l2.828 2.828m8 8l2.828 2.828"/>
  </svg>
);

export default LandingPage;
