import React from 'react';
import { Target, Trophy, Clock, HeartHandshake } from 'lucide-react';

const stats = [
  { icon: Target, value: '99.9%', label: 'Lead Ingestion Rate' },
  { icon: Trophy, value: '₹4.5Cr+', label: 'Deals Facilitated' },
  { icon: Clock, value: '< 200ms', label: 'Average API Response' },
  { icon: HeartHandshake, value: '250+', label: 'High Growth Agencies' }
];

function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-20 md:py-28 bg-dark-900/40 relative">
      <div className="absolute bottom-12 left-1/3 w-[300px] h-[300px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-xs font-semibold tracking-wider text-brand-purple uppercase">Performance First</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Designed for high-impact teams who demand precision
            </h3>
            <p className="text-base text-dark-300 leading-relaxed">
              We understand that every single second a lead sits untouched is a lost opportunity. LeadDesk Mini provides the foundational speed, validation integrity, and smooth dashboard management needed to streamline agency operations.
            </p>
            <div className="flex flex-col gap-4 text-sm text-dark-400">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 text-emerald-400 font-bold text-xs">✓</div>
                <span>Pre-compiled validation rules ensuring database safety.</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 text-emerald-400 font-bold text-xs">✓</div>
                <span>Instant status updates synchronized with MySQL.</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 text-emerald-400 font-bold text-xs">✓</div>
                <span>Fully responsive UI optimized across desktop and mobile browsers.</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-panel border border-dark-800 flex flex-col items-center text-center group hover:border-brand-purple/30 transition-all duration-300"
              >
                <div className="p-3 bg-brand-purple/10 rounded-xl border border-brand-purple/20 mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="h-6 w-6 text-brand-purple" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-white mb-1">{stat.value}</span>
                <span className="text-xs sm:text-sm text-dark-400 font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
