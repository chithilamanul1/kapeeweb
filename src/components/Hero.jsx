'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden bg-white">
      {/* Background with subtle overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img 
            src="/hero-bg.png" 
            alt="Sri Lanka Scenery" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10 hidden md:block" />
        <div className="absolute inset-0 bg-white/60 z-10 md:hidden" />
      </div>

      <div className="container mx-auto px-6 relative z-20 pt-32 md:pt-0">
        <div className="max-w-3xl text-center md:text-left mx-auto md:mx-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6 md:mb-8">
              <div className="h-[1px] w-12 bg-emerald-600 hidden md:block" />
              <span className="text-emerald-600 text-[10px] font-black tracking-[0.4em] uppercase">
                Premium Travel Experiences
              </span>
            </div>
            
            <h1 className="text-4xl md:text-8xl font-serif font-black mb-6 md:mb-8 leading-[1.1] md:leading-[0.9] tracking-tighter text-emerald-950">
              Journey Through <br />
              <span className="text-emerald-600 italic">Paradise</span> In Style
            </h1>
            
            <p className="text-base md:text-xl text-slate-700 mb-10 md:mb-12 font-medium leading-relaxed max-w-xl">
              Based in Seeduwa, <span className="text-emerald-950 font-black">Kapee Travels</span> offers elite airport transfers and bespoke island-wide tours tailored to your comfort.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
              <button 
                className="px-10 py-5 bg-emerald-600 text-white rounded-full text-[10px] uppercase tracking-[0.2em] font-black hover:bg-emerald-700 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-3"
                onClick={() => window.dispatchEvent(new CustomEvent('openBooking'))}
              >
                <span>Book Your Ride</span>
              </button>
              <a 
                href="#services" 
                className="px-10 py-5 text-[10px] uppercase tracking-[0.2em] font-black text-emerald-950 border border-emerald-950/10 rounded-full hover:bg-emerald-50 transition-all text-center flex items-center justify-center"
              >
                Explore Services
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements / Accent */}
      <div className="absolute bottom-10 right-10 z-20 hidden lg:block">
        <div className="flex items-center gap-6 text-emerald-950/20 rotate-90 origin-right">
           <span className="text-[10px] font-black uppercase tracking-[0.5em]">Discover Sri Lanka</span>
           <div className="h-[1px] w-24 bg-emerald-950/20" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
