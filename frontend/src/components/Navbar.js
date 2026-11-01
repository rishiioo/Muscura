import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, Dumbbell, Calendar, BarChart3, User, 
  Settings, LogOut, ShieldCheck, Home, Activity 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Workouts', href: '/workouts', icon: Dumbbell },
    { name: 'Schedule', href: '/schedule', icon: Calendar },
    { name: 'Progress', href: '/progress', icon: Activity },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  // Add Admin/Gym Owner link if user is admin or for project demo
  if (user?.role === 'admin') {
    navLinks.splice(1, 0, { name: 'Gym Owner', href: '/admin', icon: ShieldCheck });
  }

  return (
    <>
      {/* Main Desktop Top Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-gray-900">Muscura</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    isActive(link.href)
                      ? 'text-blue-600 bg-blue-50 shadow-2xs'
                      : 'text-gray-500 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <link.icon className={`h-4 w-4 ${isActive(link.href) ? 'animate-bounce' : ''}`} />
                  <span>{link.name}</span>
                </Link>
              ))}
              
              <button
                onClick={() => { logout(); navigate('/login'); }}
                className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>

            {/* Project Demo Admin Shortcut (Small pill) */}
            <Link 
              to="/admin" 
              className="md:hidden flex items-center gap-1 text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-bold border border-blue-100"
            >
              <ShieldCheck className="h-3 w-3" /> Admin View
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar (Modern App Style) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 pb-safe pt-2 z-50 flex justify-around items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all ${
              isActive(link.href) ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <link.icon className={`h-5 w-5 mb-1 ${isActive(link.href) ? 'scale-110' : ''}`} />
            <span className="text-[10px] font-bold">{link.name}</span>
            {isActive(link.href) && <div className="w-1 h-1 bg-blue-600 rounded-full mt-0.5" />}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Navbar;