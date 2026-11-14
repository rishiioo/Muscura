import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home-section" className="bg-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight">
          Master Your Fitness Journey with <span className="text-blue-600">Muscura</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          The all-in-one platform to track workouts, monitor your progress, and manage your gym activities efficiently.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/login"
            className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition shadow-lg"
          >
            Join Now
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto border border-gray-300 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;