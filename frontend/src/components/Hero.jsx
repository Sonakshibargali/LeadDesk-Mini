import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Users, CheckCircle2 } from 'lucide-react';

function Hero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Decorative Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-brand-purple/20 bg-dark-900/60 mb-6 text-xs sm:text-sm text-brand-purple"
        >
          <Sparkles className="h-4 w-4 animate-spin" style={{ animationDuration: '3s' }} />
          <span className="font-semibold tracking-wide uppercase">Introducing LeadDesk Mini</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto"
        >
          Supercharge Your Agency's <br />
          <span className="text-gradient">Lead Acquisition Pipeline</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-dark-300 max-w-2xl mx-auto mb-10 font-normal leading-relaxed"
        >
          Capture, track, and close high-value prospects with our ultra-fast, premium lead management suite. Specifically built for high-performance sales teams.
        </motion.p>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16"
        >
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple hover:from-brand-blue/90 hover:to-brand-purple/90 text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-brand-blue/25 flex items-center justify-center gap-2 group"
          >
            Get Started Free
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel hover:bg-dark-800/80 text-dark-200 hover:text-white font-semibold transition-all duration-300 flex items-center justify-center"
          >
            Explore Features
          </a>
        </motion.div>

        {/* Floating Mockup Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-4xl mx-auto rounded-2xl glass-panel p-2.5 sm:p-4 border border-dark-800 shadow-2xl overflow-hidden bg-dark-900/40"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/5 via-transparent to-brand-purple/5 pointer-events-none"></div>
          
          {/* Top Mock Window Control Bar */}
          <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-dark-800/60 px-2 sm:px-4">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
            </div>
            <div className="text-xs text-dark-500 font-medium">leaddesk-mini.admin/dashboard</div>
            <div className="w-12"></div>
          </div>

          {/* Interactive Mock Dashboard View */}
          <div className="p-3 sm:p-6 text-left grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Quick Metrics Grid */}
            <div className="md:col-span-3 grid grid-cols-3 gap-3">
              {[
                { title: 'Active Pipelines', val: '₹14.8L', icon: TrendingUp, color: 'text-blue-400' },
                { title: 'Conversion Rate', val: '78.4%', icon: CheckCircle2, color: 'text-emerald-400' },
                { title: 'New Leads Today', val: '24', icon: Users, color: 'text-purple-400' }
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-dark-950/80 border border-dark-800">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-dark-400 font-medium">{item.title}</span>
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-white">{item.val}</span>
                </div>
              ))}
            </div>

            {/* Mock Table/List Item */}
            <div className="md:col-span-3 p-4 rounded-xl bg-dark-950/80 border border-dark-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-purple/20 flex items-center justify-center font-bold text-xs text-brand-purple">
                  JD
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-white">John Doe</div>
                  <div className="text-[10px] sm:text-xs text-dark-400">john@agency.co</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  ₹2L-₹5L
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  CONTACTED
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
