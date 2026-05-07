'use client';

import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-primary relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
              Reliable Service by <br />
              <span className="text-gold">Kapila Tours Seeduwa</span>
            </h2>
            <div className="space-y-6 text-white/70 leading-relaxed">
              <p>
                Founded by <span className="font-bold text-white">N Kapila Silva</span>, <span className="font-bold text-white">Kapee Tours</span> has become a synonymous name for trust and luxury in the Seeduwa region. With over 15 years of experience in the Sri Lankan travel industry, we specialize in providing seamless transportation solutions for international travelers.
              </p>
              <p>
                Our deep roots in <span className="text-gold italic underline decoration-gold/30 underline-offset-4">Seeduwa</span> allow us to offer unparalleled local knowledge, ensuring that our guests discover hidden gems that ordinary tours miss. Whether you search for "Seeduwa tours" or "Kapila tours", you'll find a team dedicated to your comfort.
              </p>
              <p>
                We take pride in our diverse fleet of luxury vehicles and our commitment to safety, making <span className="text-gold font-bold">Kapi Travels</span> the preferred choice for airport transfers and multi-day island excursions.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative group"
          >
             <div className="absolute -inset-4 bg-gold/10 rounded-3xl blur-2xl group-hover:bg-gold/20 transition-all duration-700" />
             <div className="relative rounded-3xl overflow-hidden border border-white/10 card-3d">
                <img 
                  src="/new_assets/media__1772697550267.png" 
                  alt="Kapila Tours Seeduwa Team" 
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000"
                />
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
