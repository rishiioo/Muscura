import React from 'react';

const services = [
  { title: 'Be Fit', icon: 'fit' },
  { title: 'Join Club', icon: 'gym-1' },
  { title: 'Gym Fitness', icon: 'gym' },
  { title: 'Eat Vegie', icon: 'vegetables' },
  { title: 'Fruit Juices', icon: 'fruit-juice' },
  { title: 'Body Warmup', icon: 'stationary-bike' },
];

const Services = () => {
  return (
    <section id="services-section" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="flex bg-white p-6 shadow rounded">
              <div className="text-4xl text-primary-600 mr-4">⚙️</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur tempora delectus aut, mollitia. Veritatis!</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
