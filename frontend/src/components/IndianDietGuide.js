import React, { useState } from 'react';
import { Utensils, Sparkles } from 'lucide-react';

export const IndianDietGuide = ({ userDiet = 'veg' }) => {
  const [activeTab, setActiveTab] = useState(userDiet === 'non-veg' ? 'non-veg' : 'veg');

  const proteinSources = {
    veg: [
      { name: 'Soya Chunks', protein: '52g / 100g', cost: '₹5 - ₹7', badge: 'Budget King 👑', note: 'Boil & squeeze water out twice.', macros: '52g Protein | 33g Carbs' },
      { name: 'Sattu (Roasted Chana)', protein: '22g / 100g', cost: '₹8 - ₹10', badge: 'Fiber Rich 🌾', note: 'Mix in water with lemon & Kala Namak.', macros: '22g Protein | 60g Carbs' },
      { name: 'Paneer', protein: '18g / 100g', cost: '₹18 - ₹22', badge: 'Healthy Fats 🧀', note: 'Great for bulking & evening calories.', macros: '18g Protein | 20g Fats' },
      { name: 'Moong Sprouts', protein: '24g / 100g', cost: '₹10 - ₹12', badge: 'Easy Digest 🍃', note: 'Sprout overnight with lemon & chaat masala.', macros: '24g Protein | 63g Carbs' },
      { name: 'Hung Curd', protein: '11g / 100g', cost: '₹12 - ₹15', badge: 'Probiotic 🥛', note: 'Strain whey through cloth for thick curd.', macros: '11g Protein | 4g Carbs' }
    ],
    'non-veg': [
      { name: 'Eggs (Whole/Whites)', protein: '13g / 100g', cost: '₹10 - ₹12', badge: 'Best Bioavailability 🥚', note: 'Boil 4-6 eggs. 2 whole + 4 whites.', macros: '6g Protein per egg' },
      { name: 'Chicken Breast', protein: '31g / 100g', cost: '₹14 - ₹18', badge: 'Lean Protein 🍗', note: 'Pan-sear with ginger-garlic & minimal oil.', macros: '31g Protein | 3.6g Fat' },
      { name: 'Fish (Rohu/Katla)', protein: '20g / 100g', cost: '₹16 - ₹20', badge: 'Omega-3 Rich 🐟', note: 'Shallow fry or steam with mustard.', macros: '20g Protein | 2.5g Fat' }
    ]
  };

  const hostelHacks = [
    { title: '⚡ Kettle Egg Boil', text: 'Boil eggs in electric kettle in 10 mins.' },
    { title: '🥤 2-Min Sattu Shake', text: '4 tbsp Sattu + water = 20g protein for ₹15.' },
    { title: '🥜 Peanut Butter Toast', text: '2 tbsp peanut butter on bread = 12g protein + 300 kcal.' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 my-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-xl text-emerald-700">
            <Utensils className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Desi Student Diet & Protein Guide</h2>
            <p className="text-xs text-gray-500">Budget-friendly Indian sources with cost per 10g protein</p>
          </div>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('veg')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold ${
              activeTab === 'veg' ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🌱 Veg
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('non-veg')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold ${
              activeTab === 'non-veg' ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🍗 Non-Veg
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
        {proteinSources[activeTab].map((item, idx) => (
          <div key={idx} className="border border-emerald-100 bg-emerald-50/30 rounded-xl p-3.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">{item.badge}</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{item.note}</p>
              <div className="text-[11px] text-emerald-800 font-medium bg-white/80 rounded p-1 mb-2 border border-emerald-100">{item.macros}</div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-emerald-100/60 text-xs">
              <span className="text-gray-500">Protein: <strong className="text-gray-800">{item.protein}</strong></span>
              <div className="bg-white px-2 py-0.5 rounded border border-emerald-200 text-right">
                <span className="text-[9px] text-gray-400 uppercase font-bold block">Cost / 10g</span>
                <span className="text-xs font-bold text-emerald-700">{item.cost}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5">
        <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 mb-2">
          <Sparkles className="h-4 w-4 text-amber-600" /> Student & Hostel Hacks
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {hostelHacks.map((hack, index) => (
            <div key={index} className="bg-white p-2.5 rounded-lg border border-amber-100 text-xs">
              <p className="font-semibold text-amber-900">{hack.title}</p>
              <p className="text-amber-800 text-[11px]">{hack.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndianDietGuide;