'use client';

import { motion } from 'framer-motion';
import { ChevronDown, MapPin, Calendar, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-primary z-10" />
        <img 
          src="/hero-bg.png" 
          alt="Sri Lanka Landscape" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-6 backdrop-blur-sm">
            Premium Travel Experiences
          </span>
          <h1 className="text-5xl md:text-8xl font-serif font-bold mb-6 leading-tight">
            Explore Sri Lanka in <br />
            <span className="text-gradient">Comfort & Style</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Discover the enchanging beauty of the island with Kapi Travels. 
            From airport transfers to bespoke island-wide tours, we ensure your journey is as remarkable as the destination.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
        >
          <button 
            className="btn-premium px-10 py-4 text-lg"
            onClick={() => window.dispatchEvent(new CustomEvent('openBooking'))}
          >
            Book Your Ride
          </button>
          <a 
            href="#destinations" 
            className="px-10 py-4 text-lg border border-white/20 rounded-full hover:bg-white/5 transition-all duration-300 backdrop-blur-md"
          >
            Explore Tours
          </a>
        </motion.div>
      </div>

      {/* Floating Indicators / Stats (3D feel) */}
      <div className="absolute bottom-10 left-0 w-full z-20 flex justify-center items-center flex-col">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/40 cursor-pointer hover:text-gold transition-colors"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <p className="text-[10px] uppercase tracking-[0.2em] mb-2">Scroll to discover</p>
          <ChevronDown className="mx-auto" />
        </motion.div>
      </div>

      {/* Side Decoration (Abstract Line) */}
      <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-transparent via-gold/30 to-transparent z-10 hidden xl:block mr-20" />
    </section>
  );
};

export default Hero;
