'use client';

import { motion } from 'framer-motion';

const SustainabilitySection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Images Section */}
          <div className="lg:w-1/2 grid grid-cols-12 gap-4 h-[500px] md:h-[600px]">
            {/* Left Elephant Image */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="col-span-7 h-full relative rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <img 
                src="/images/elephant.png" 
                alt="Elephant in Sri Lanka" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
              />
            </motion.div>
            
            {/* Right Collage */}
            <div className="col-span-5 flex flex-col gap-4 h-full">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="h-2/3 rounded-[2rem] overflow-hidden shadow-xl"
              >
                <img 
                  src="/images/mountain.png" 
                  alt="Sri Lanka Mountains" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="h-1/3 rounded-[2rem] overflow-hidden shadow-xl"
              >
                <img 
                  src="/images/waterfall.png" 
                  alt="Sri Lanka Waterfall" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                />
              </motion.div>
            </div>
          </div>

          {/* Text Section */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <h2 className="mb-8 flex flex-col items-center lg:items-start">
                <span className="text-5xl md:text-8xl font-caveat text-emerald-600 leading-none">Philosophy</span>
                <span className="text-3xl md:text-7xl font-black text-emerald-950 uppercase tracking-tighter -mt-2 md:-mt-4">OF SUSTAINABILITY</span>
              </h2>
              
              <div className="space-y-6 text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                <p>
                  Our commitment goes beyond travel. We are dedicated to preserving Sri Lanka&apos;s pristine natural beauty and supporting the communities that make our island so special. 
                </p>
                <p>
                  At <span className="text-emerald-950 font-black">Kapee Travels</span>, we believe in responsible tourism that respects wildlife, minimizes environmental impact, and fosters a deep connection between travelers and the local culture.
                </p>
                <p>
                  Every tour we design follows ethical guidelines, ensuring that our presence brings positive change to the destination while providing you with an authentic and meaningful experience.
                </p>
              </div>

              <div className="mt-12 flex items-center justify-center lg:justify-start gap-6">
                <div className="w-16 h-[2px] bg-emerald-600/20 hidden md:block" />
                <button 
                   onClick={() => window.dispatchEvent(new CustomEvent('openBooking'))}
                   className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 hover:tracking-[0.4em] transition-all"
                >
                  Join Our Journey
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;
