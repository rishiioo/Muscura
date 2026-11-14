import React, { useState } from 'react';

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const Schedule = () => {
  const [activeDay, setActiveDay] = useState('S');

  return (
    <section id="schedule-section" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Schedule</h2>
        <div className="flex justify-center space-x-2 mb-8">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => setActiveDay(day)}
              className={`px-4 py-2 rounded ${activeDay === day ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
            >
              {day}
            </button>
          ))}
        </div>
        <div className="text-center">
          <p>Schedule for {activeDay} will be shown here.</p>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
