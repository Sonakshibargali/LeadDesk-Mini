import React from 'react';
import { Heart } from 'lucide-react';

function Footer() {
  return (
    <footer className="w-full border-t border-dark-800 bg-dark-950/40 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Logo & Copyright */}
          <div className="text-sm text-dark-400">
            &copy; {new Date().getFullYear()} LeadDesk Mini. All rights reserved.
          </div>
          
          {/* Mandatory training task attribution */}
          <div className="text-sm font-semibold tracking-wide text-dark-300">
            <a 
              href="https://digitalheroesco.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brand-purple hover:text-brand-blue transition-colors duration-200 underline decoration-brand-purple/40 hover:decoration-brand-blue"
            >
              Built for Digital Heroes Training Task
            </a>
          </div>
          
          {/* Tagline */}
          <div className="text-xs text-dark-500 flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for the next generation of sales.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
