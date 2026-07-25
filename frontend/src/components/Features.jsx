import React from 'react';
import { Zap, Shield, BarChart3, RefreshCw } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Instant Lead Ingestion',
    description: 'Collect prospective client data seamlessly with instant feedback mechanisms and clean database logging.'
  },
  {
    icon: BarChart3,
    title: 'Budget Range Classification',
    description: 'Automatically segment leads into tiered budget levels (<₹50k to ₹5L+) to filter high-ticket clients instantly.'
  },
  {
    icon: RefreshCw,
    title: 'Real-time State Sync',
    description: 'Update client statuses (NEW, CONTACTED, CLOSED) dynamically inside the admin board without full page refresh cycles.'
  },
  {
    icon: Shield,
    title: 'Dual-Layer Validation',
    description: 'Enforce stringent client-side checks and server-side express-validator schemas to prevent database contamination.'
  }
];

function Features() {
  return (
    <section id="features" className="py-20 md:py-28 relative">
      <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-brand-blue/5 rounded-full blur-[90px] pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="text-xs font-semibold tracking-wider text-brand-blue uppercase mb-3">Enterprise Capabilities</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Everything you need to <span className="text-gradient">grow your sales</span> pipeline
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-2xl border border-dark-800 flex flex-col items-start"
            >
              <div className="p-3 bg-brand-blue/10 rounded-xl border border-brand-blue/20 mb-5">
                <feature.icon className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-dark-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
