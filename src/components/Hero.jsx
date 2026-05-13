'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Star, ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 md:pt-0">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/60 to-transparent z-10" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 backdrop-blur-md">
              <Star size={14} className="text-emerald-400 fill-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-50">
                #1 Rated Travel Agency in Sri Lanka
              </span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-serif font-black mb-8 leading-[1.1] tracking-tighter text-white">
              Elegance in <br />
              <span className="text-emerald-400 italic relative">
                Every Journey
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-emerald-400/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="8" />
                </svg>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-emerald-50/80 mb-12 font-medium leading-relaxed max-w-xl">
              Experience the soul of Sri Lanka with <span className="text-white font-bold">Kapee Travels</span>. From elite airport transfers to bespoke island-wide expeditions.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button 
                className="group relative px-10 py-6 bg-emerald-500 text-emerald-950 rounded-full text-[11px] uppercase tracking-[0.3em] font-black overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-emerald-500/20"
                onClick={() => window.dispatchEvent(new CustomEvent('openBooking'))}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start Your Adventure <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              
              <button className="flex items-center gap-4 text-white font-black text-[11px] uppercase tracking-[0.2em] hover:text-emerald-400 transition-colors">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-md shadow-sm">
                  <Play size={16} fill="currentColor" className="ml-1" />
                </div>
                Watch Experience
              </button>
            </div>

            {/* Stats/Trust Badge */}
            <div className="mt-16 flex items-center gap-8 border-t border-white/10 pt-8">
              <div>
                <p className="text-2xl font-black text-white">12k+</p>
                <p className="text-[10px] text-emerald-50/50 uppercase font-bold tracking-widest">Happy Travelers</p>
              </div>
              <div className="w-[1px] h-10 bg-white/10" />
              <div>
                <p className="text-2xl font-black text-white">4.9/5</p>
                <p className="text-[10px] text-emerald-50/50 uppercase font-bold tracking-widest">Average Rating</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Side Decorative Text */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 -rotate-90 origin-left hidden xl:block">
        <span className="text-[10px] font-black uppercase tracking-[1em] text-white/20">
          Discover The Paradise Isle
        </span>
      </div>
    </section>
  );
};

export default Hero;
