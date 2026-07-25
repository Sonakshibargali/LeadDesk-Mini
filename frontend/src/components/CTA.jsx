import React from 'react';
import { ArrowRight } from 'lucide-react';

function CTA() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-indigo/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 md:p-16 rounded-3xl border border-dark-800 text-center relative overflow-hidden bg-dark-900/30">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/5 to-brand-purple/5 pointer-events-none"></div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Ready to Streamline Your Sales Pipeline?
          </h2>
          <p className="text-base sm:text-lg text-dark-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            Stop losing potential clients to disorganized spreadsheets. Deploy LeadDesk Mini today and manage everything in one premium dashboard.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple hover:from-brand-blue/90 hover:to-brand-purple/90 text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-brand-blue/20 group"
          >
            Submit a Lead Now
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default CTA;
