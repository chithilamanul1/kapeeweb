'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50">
      {/* Background Image with Parallax Effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white/20 z-10" />
        <img 
          src="/hero-bg.png" 
          alt="Sri Lanka Landscape" 
          className="w-full h-full object-cover opacity-60"
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-20 text-center pt-32 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-6 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black tracking-[0.4em] uppercase mb-8 shadow-sm">
            Premium Travel Experiences
          </span>
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[0.95] tracking-tighter text-emerald-950 uppercase">
            Explore Sri Lanka in <br />
            <span className="text-emerald-600">Comfort & Style</span>
          </h1>
          <p className="text-base md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Discover the enchanting beauty of the island with <span className="text-emerald-600 font-black">Kapee Tours</span>. 
            Based in Seeduwa, we provide elite airport transfers and bespoke island-wide tours, 
            ensuring your journey is as remarkable as the destination.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <button 
            className="btn-premium px-12 py-5 text-xs uppercase tracking-[0.2em] font-black"
            onClick={() => window.dispatchEvent(new CustomEvent('openBooking'))}
          >
            Book Your Ride
          </button>
          <a 
            href="#destinations" 
            className="px-12 py-5 text-xs uppercase tracking-[0.2em] font-black text-emerald-950 border-2 border-emerald-950/10 rounded-full hover:bg-emerald-50 transition-all duration-300"
          >
            Explore Tours
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-emerald-600/40 cursor-pointer hover:text-emerald-600 transition-colors text-center"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-3">Scroll to discover</p>
          <ChevronDown className="mx-auto" size={20} strokeWidth={3} />
        </motion.div>
      </div>

      <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-transparent via-emerald-600/20 to-transparent z-10 hidden xl:block mr-20" />
    </section>
  );
};

export default Hero;
