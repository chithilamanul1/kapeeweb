'use client';

import { motion } from 'framer-motion';
import { Fuel, Map, Zap, Calendar } from 'lucide-react';

const CampaignBanner = () => {
  return (
    <section className="py-12 bg-emerald-950 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-emerald-900 to-emerald-950 border border-emerald-800 rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden group"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/20 border border-emerald-500/30 rounded-full mb-6">
                <Zap size={14} className="text-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">€40 One Day Deal</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-[1.1] tracking-tighter uppercase">
                One Day Trip <br />
                <span className="text-emerald-500">Only €40 Charge</span>
              </h2>
              
              <p className="text-emerald-100/70 text-base md:text-lg mb-8 font-medium leading-relaxed">
                Enjoy <span className="text-white font-bold italic underline decoration-emerald-500">Unlimited Kilometers</span> on your day trip. We only charge a flat rate of €40. Perfect for exploring the island without worrying about distance costs!
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-400">
                       <Map size={20} />
                    </div>
                    <div>
                       <p className="text-white font-black text-xs uppercase tracking-tighter">Unlimited Kms</p>
                       <p className="text-emerald-100/40 text-[10px] font-bold">Go anywhere</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 text-gold">
                    <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-400">
                       <Calendar size={20} />
                    </div>
                    <div>
                       <p className="text-white font-black text-xs uppercase tracking-tighter">Flat Rate</p>
                       <p className="text-emerald-100/40 text-[10px] font-bold">€40 Flat charge</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 lg:col-span-1 col-span-2">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-emerald-950">
                       <Fuel size={20} />
                    </div>
                    <div>
                       <p className="text-white font-black text-xs uppercase tracking-tighter">Fuel Policy</p>
                       <p className="text-emerald-100/40 text-[10px] font-bold">Customer pays for fuel</p>
                    </div>
                 </div>
              </div>

              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('openBooking'))}
                className="px-10 py-5 bg-white text-emerald-950 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
              >
                Book This Deal Now
              </button>
            </div>

            <div className="relative w-full max-w-sm lg:max-w-md">
               <motion.div
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="relative z-10"
               >
                  <img src="/vehicles/sedancar.png" alt="Tour Car" className="w-full drop-shadow-[0_20px_50px_rgba(16,185,129,0.3)]" />
               </motion.div>
               
               {/* Abstract Glows */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-500/20 blur-[100px] rounded-full -z-10" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CampaignBanner;
