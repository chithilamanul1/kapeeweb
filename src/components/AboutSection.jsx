'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <span className="text-emerald-600 uppercase tracking-[0.4em] text-[10px] font-black mb-6 block">About Us</span>
            <h2 className="text-4xl md:text-5xl font-black text-emerald-950 tracking-tighter mb-8 leading-tight">
              Reliable Service by <br />
              <span className="text-emerald-600">Kapila Tours Seeduwa</span>
            </h2>
            <div className="space-y-6 text-slate-500 leading-relaxed font-medium">
              <p>
                Founded by <span className="font-black text-emerald-950">N Kapila Silva</span>, <span className="font-black text-emerald-600">Kapee Tours</span> has become synonymous with trust and comfort in the Seeduwa region. With over 15 years of experience in the Sri Lankan travel industry, we specialize in seamless transportation for international travelers.
              </p>
              <p>
                Our deep roots in <span className="text-emerald-600 font-black">Seeduwa</span> allow us to offer unparalleled local knowledge, ensuring our guests discover hidden gems that ordinary tours miss. Whether you search for &ldquo;Seeduwa tours&rdquo; or &ldquo;Kapila tours&rdquo;, you will find a team dedicated to your comfort.
              </p>
              <p>
                We take pride in our diverse fleet of premium vehicles and our commitment to safety, making <span className="text-emerald-600 font-black">Kapi Travels</span> the preferred choice for airport transfers and multi-day island excursions.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative group"
          >
             <div className="absolute -inset-4 bg-emerald-600/10 rounded-[2rem] blur-2xl group-hover:bg-emerald-600/20 transition-all duration-700" />
             <div className="relative rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl">
                <Image 
                  src="/clients/client-8.jpeg" 
                  alt="Kapila Tours Seeduwa Team" 
                  width={800}
                  height={600}
                  className="w-full h-auto hover:scale-105 transition-all duration-1000"
                />
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
