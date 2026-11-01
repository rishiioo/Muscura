import React from 'react';
import { HelpCircle, Info, Target, Scale, Flame } from 'lucide-react';

export const WhyThisPlan = ({ user }) => {
  const weight = user?.weight || 70;
  const height = user?.height || 170;
  const goal = user?.goal || 'healthy';

  // Calculations
  const heightInMeters = height / 100;
  const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

  let bmiCategory = 'Normal Weight';
  if (bmi < 18.5) bmiCategory = 'Underweight';
  else if (bmi >= 25 && bmi < 29.9) bmiCategory = 'Overweight';
  else if (bmi >= 30) bmiCategory = 'Obese';

  let calorieTarget = 2000;
  let proteinTarget = Math.round(weight * 1.6);
  let rationale = '';

  if (goal === 'cut') {
    calorieTarget = Math.round(weight * 26);
    proteinTarget = Math.round(weight * 2.0);
    rationale = `Because your goal is Cutting (Fat Loss), we calculated a caloric deficit of ~15-20% under maintenance with elevated protein (${proteinTarget}g/day) to preserve lean muscle tissue while shedding body fat.`;
  } else if (goal === 'bulk') {
    calorieTarget = Math.round(weight * 34);
    proteinTarget = Math.round(weight * 1.8);
    rationale = `Because your goal is Bulking (Muscle Gain), we assigned a slight surplus (~300-500 kcal) with high protein (${proteinTarget}g/day) to fuel muscle protein synthesis and progressive overload workouts.`;
  } else {
    calorieTarget = Math.round(weight * 30);
    proteinTarget = Math.round(weight * 1.5);
    rationale = `Because your goal is a Healthy Lifestyle, your plan focuses on balanced energy maintenance (~${calorieTarget} kcal) with foundational full-body functional movements to improve stamina and heart health.`;
  }

  return (
    <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 shadow-md my-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-300">
          <HelpCircle className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-bold">Why This Plan Was Recommended For You</h3>
      </div>

      <p className="text-sm text-blue-100 leading-relaxed mb-4">{rationale}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-blue-700/50">
        <div className="bg-blue-950/60 p-3 rounded-xl border border-blue-700/40">
          <div className="flex items-center gap-2 text-xs text-blue-300 mb-1">
            <Scale className="h-4 w-4" /> BMI Index
          </div>
          <p className="text-xl font-extrabold">{bmi} <span className="text-xs font-normal text-blue-200">({bmiCategory})</span></p>
        </div>

        <div className="bg-blue-950/60 p-3 rounded-xl border border-blue-700/40">
          <div className="flex items-center gap-2 text-xs text-blue-300 mb-1">
            <Flame className="h-4 w-4 text-orange-400" /> Daily Target
          </div>
          <p className="text-xl font-extrabold">{calorieTarget} <span className="text-xs font-normal text-blue-200">kcal/day</span></p>
        </div>

        <div className="bg-blue-950/60 p-3 rounded-xl border border-blue-700/40">
          <div className="flex items-center gap-2 text-xs text-blue-300 mb-1">
            <Target className="h-4 w-4 text-emerald-400" /> Protein Goal
          </div>
          <p className="text-xl font-extrabold">{proteinTarget}g <span className="text-xs font-normal text-blue-200">/day</span></p>
        </div>
      </div>
    </div>
  );
};

export default WhyThisPlan;