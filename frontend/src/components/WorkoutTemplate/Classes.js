import React from 'react';

const classes = [
  { name: 'Fitness Class #1', trainer: 'Justin Daniel', duration: '30 minutes' },
  { name: 'Fitness Class #2', trainer: 'Justin Daniel', duration: '30 minutes' },
  { name: 'Fitness Class #3', trainer: 'Justin Daniel', duration: '30 minutes' },
  { name: 'Fitness Class #4', trainer: 'Justin Daniel', duration: '30 minutes' },
];

const Classes = () => {
  return (
    <section id="classes-section" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Classes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {classes.map((cls, index) => (
            <div key={index} className="flex items-center bg-white p-4 shadow rounded">
              <div className="w-24 h-24 bg-gray-200 mr-4"></div>
              <div>
                <h3 className="text-xl font-semibold">{cls.name}</h3>
                <p className="text-sm text-gray-600">By {cls.trainer}, {cls.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Classes;
