import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-white shadow-sm py-4 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="text-2xl font-bold">
          <Link to="/">Muscura<span className="text-blue-600">.</span></Link>
        </div>

        <nav className="hidden lg:flex items-center space-x-6">
          <a href="#home-section" className="text-gray-600 hover:text-blue-600">Home</a>
          <a href="#classes-section" className="text-gray-600 hover:text-blue-600">Workouts</a>
          <a href="#schedule-section" className="text-gray-600 hover:text-blue-600">Schedule</a>
          <a href="#trainer-section" className="text-gray-600 hover:text-blue-600">Trainers</a>
          <a href="#services-section" className="text-gray-600 hover:text-blue-600">Services</a>
          <a href="#contact-section" className="text-gray-600 hover:text-blue-600">Contact</a>
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">Log In</Link>
          <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">Get Started</Link>
        </div>

        <button className="lg:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden bg-white px-4 py-4 flex flex-col space-y-3 shadow-md">
          <a href="#home-section" className="block text-gray-600 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="#classes-section" className="block text-gray-600 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Workouts</a>
          <a href="#schedule-section" className="block text-gray-600 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Schedule</a>
          <a href="#trainer-section" className="block text-gray-600 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Trainers</a>
          <a href="#services-section" className="block text-gray-600 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Services</a>
          <a href="#contact-section" className="block text-gray-600 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Contact</a>
          <div className="pt-2 flex flex-col space-y-2 border-t">
            <Link to="/login" className="text-center py-2 text-gray-700 font-medium">Log In</Link>
            <Link to="/login" className="text-center py-2 bg-blue-600 text-white rounded-lg font-medium">Get Started</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
