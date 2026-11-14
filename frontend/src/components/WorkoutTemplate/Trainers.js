import React from 'react';

const trainers = [
  { name: 'Justin Daniel', pos: 'Trainer' },
  { name: 'Matthew Davidson', pos: 'Trainer' },
  { name: 'Matthew Davidson', pos: 'Trainer' },
  { name: 'Matthew Davidson', pos: 'Trainer' },
];

const Trainers = () => {
  return (
    <section id="trainer-section" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Trainers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer, index) => (
            <div key={index} className="text-center">
              <div className="w-full h-64 bg-gray-300 mb-4 rounded-lg"></div>
              <h3 className="text-xl font-semibold">{trainer.name}</h3>
              <p className="text-gray-600">{trainer.pos}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;
