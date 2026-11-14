import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 text-center">
      <p>&copy; {new Date().getFullYear()} Muscura. All rights reserved.</p>
    </footer>
  );
};

export default Footer;