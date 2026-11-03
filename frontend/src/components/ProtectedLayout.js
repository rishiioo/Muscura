import React from 'react';
import ProtectedRoute from './ProtectedRoute';
import Navbar from './Navbar';

const ProtectedLayout = ({ children }) => {
  return (
    <ProtectedRoute>
      <div className="pt-16 pb-16 md:pb-0">
        <Navbar />
        {children}
      </div>
    </ProtectedRoute>
  );
};

export default ProtectedLayout;