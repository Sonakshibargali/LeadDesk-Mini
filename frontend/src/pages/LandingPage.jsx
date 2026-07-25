import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Features from '../components/Features.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';
import CTA from '../components/CTA.jsx';
import LeadForm from '../components/LeadForm.jsx';
import Footer from '../components/Footer.jsx';

function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen relative bg-dark-950 text-white selection:bg-brand-indigo selection:text-white">
      {/* Structural Glowing Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute top-[40%] left-0 w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <WhyChooseUs />
        <CTA />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
