import React from 'react';
import { GraduationCap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-red-600 to-red-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <GraduationCap className="h-10 w-10 text-white" />
            <div className="ml-3">
              <h1 className="text-2xl font-bold text-white">University Course Catalog</h1>
              <p className="text-red-100">Find your perfect degree program</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-white hover:text-red-200 transition-colors">Undergraduate</a>
            <a href="#" className="text-white hover:text-red-200 transition-colors">Postgraduate</a>
            <a href="#" className="text-white hover:text-red-200 transition-colors">International</a>
            <a href="#" className="text-white hover:text-red-200 transition-colors">About</a>
          </nav>
          <button className="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      <div className="bg-red-800 py-3 px-4 text-center text-white text-sm">
        Apply now for September 2025 intake - Open Day: 15th June 2025
      </div>
    </header>
  );
};

export default Header;