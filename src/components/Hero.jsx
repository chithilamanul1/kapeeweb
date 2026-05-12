'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Star, ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
  const images = [
    { src: '/sigiriya-1.png', alt: 'Sigiriya Rock', height: 'h-[400px] md:h-[600px]', delay: 0.2 },
    { src: '/hero-bg.png', alt: 'Sri Lanka Elephant', height: 'h-[350px] md:h-[500px]', delay: 0.4 },
    { src: '/sigiriya-2.png', alt: 'Sri Lanka Nature', height: 'h-[450px] md:h-[650px]', delay: 0.6 },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FCFCFC] pt-20 md:pt-0">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-50/30 -skew-x-12 translate-x-1/4 z-0" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-600/5 blur-[100px] rounded-full z-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-8">
                <Star size={14} className="text-emerald-600 fill-emerald-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">
                  #1 Rated Travel Agency in Sri Lanka
                </span>
              </div>
              
              <h1 className="text-5xl md:text-8xl font-serif font-black mb-8 leading-[1.1] tracking-tighter text-emerald-950">
                Elegance in <br />
                <span className="text-emerald-600 italic relative">
                  Every Journey
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-emerald-200/60 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="8" />
                  </svg>
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 mb-12 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                Experience the soul of Sri Lanka with <span className="text-emerald-900 font-bold">Kapee Travels</span>. From elite airport transfers to bespoke island-wide expeditions.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <button 
                  className="group relative px-10 py-6 bg-emerald-950 text-white rounded-full text-[11px] uppercase tracking-[0.3em] font-black overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-emerald-950/20"
                  onClick={() => window.dispatchEvent(new CustomEvent('openBooking'))}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Start Your Adventure <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-emerald-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
                
                <button className="flex items-center gap-4 text-emerald-950 font-black text-[11px] uppercase tracking-[0.2em] hover:text-emerald-600 transition-colors">
                  <div className="w-12 h-12 rounded-full border border-emerald-900/10 flex items-center justify-center bg-white shadow-sm">
                    <Play size={16} fill="currentColor" className="ml-1" />
                  </div>
                  Watch Experience
                </button>
              </div>

              {/* Stats/Trust Badge */}
              <div className="mt-16 flex items-center justify-center lg:justify-start gap-8 border-t border-slate-100 pt-8">
                <div>
                  <p className="text-2xl font-black text-emerald-950">12k+</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Happy Travelers</p>
                </div>
                <div className="w-[1px] h-10 bg-slate-100" />
                <div>
                  <p className="text-2xl font-black text-emerald-950">4.9/5</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Average Rating</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Staggered Pill Gallery */}
          <div className="flex-1 w-full lg:w-auto mt-12 lg:mt-0">
            <div className="flex items-center justify-center gap-4 md:gap-6 px-4">
              {images.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: img.delay, ease: [0.22, 1, 0.36, 1] }}
                  className={`${img.height} w-full max-w-[120px] md:max-w-[180px] rounded-[5rem] overflow-hidden relative shadow-2xl transition-all duration-700 hover:scale-[1.02] hover:z-10`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent z-10" />
                  <Image 
                    src={img.src} 
                    alt={img.alt}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Decorative Floating Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="hidden md:block absolute bottom-20 right-20 bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/20 z-20 max-w-[240px]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                  <Star size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="text-xs font-black text-emerald-950">Elite Service</p>
                  <div className="flex gap-0.5 mt-0.5">
                    {[1,2,3,4,5].map(s => <Star key={s} size={8} className="text-yellow-400 fill-yellow-400" />)}
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                "The most professional transfer service I've experienced in Sri Lanka. Truly premium."
              </p>
              <p className="text-[10px] font-black text-emerald-600 mt-3 uppercase tracking-widest">— James W.</p>
            </motion.div>
          </div>
          
        </div>
      </div>

      {/* Side Decorative Text */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 -rotate-90 origin-left hidden xl:block">
        <span className="text-[10px] font-black uppercase tracking-[1em] text-slate-200">
          Discover The Paradise Isle
        </span>
      </div>
    </section>
  );
};

export default Hero;
