import React from 'react';
import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full glass-panel bg-dark-950/70 border-b border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-purple rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-dark-950 p-2 rounded-xl border border-dark-700">
                <Layers className="h-5 w-5 text-brand-blue group-hover:text-brand-purple transition-colors duration-300" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              LeadDesk<span className="text-gradient">Mini</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-dark-300 hover:text-white transition-colors duration-200">
              Features
            </a>
            <a href="#why-choose-us" className="text-sm font-medium text-dark-300 hover:text-white transition-colors duration-200">
              Why Us
            </a>
            <a href="#contact" className="text-sm font-medium text-dark-300 hover:text-white transition-colors duration-200">
              Contact
            </a>
          </div>

          {/* Admin Dashboard Trigger */}
          <div className="flex items-center gap-4">
            <Link
              to="/admin"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xs sm:text-sm font-medium rounded-full group bg-gradient-to-br from-brand-blue to-brand-purple group-hover:from-brand-blue group-hover:to-brand-purple text-white focus:ring-2 focus:outline-none focus:ring-brand-blue/30 transition-all duration-300 mt-2"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-dark-950 rounded-full group-hover:bg-opacity-0 font-semibold">
                Admin Area
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
