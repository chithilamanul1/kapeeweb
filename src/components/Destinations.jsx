'use client';

import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';

const destinations = [
  {
    name: 'Sigiriya',
    tagline: 'Ancient Fortress',
    description: 'The iconic Lion Rock, a UNESCO World Heritage site with stunning 5th-century frescoes and gardens.',
    image: '/tours/sigiriya.jpg'
  },
  {
    name: 'Ella',
    tagline: 'Mountain Paradise',
    description: 'Breathtaking views, tea plantations, and the famous Nine Arch Bridge in the heart of the hill country.',
    image: '/tours/maduriver.jpg'
  },
  {
    name: 'Galle',
    tagline: 'Colonial Charm',
    description: 'A historic Dutch Fort with cobblestone streets, boutique shops, and beautiful coastal views.',
    image: '/tours/galle.jpg'
  }
];

const Destinations = () => {
  return (
    <section id="destinations" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-emerald-600 uppercase tracking-[0.4em] text-[10px] font-black mb-4 block"
          >
            Explore the Island
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-emerald-950 tracking-tighter uppercase leading-none"
          >
            Popular <span className="text-emerald-600">Destinations</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {destinations.map((dest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[500px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl shadow-slate-200/50"
            >
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 w-full p-10 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 text-gold mb-3">
                  <MapPin size={14} strokeWidth={3} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{dest.tagline}</span>
                </div>
                <h3 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase">{dest.name}</h3>
                <p className="text-white/80 text-sm mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed font-medium">
                  {dest.description}
                </p>
                <div className="flex items-center gap-3 text-white font-black text-xs uppercase tracking-widest bg-emerald-600/80 backdrop-blur-md w-fit px-6 py-3 rounded-full hover:bg-emerald-600 transition-all">
                  Explore More <ArrowUpRight size={16} strokeWidth={3} />
                </div>
              </div>

              <div className="absolute inset-0 border-2 border-white/10 group-hover:border-emerald-500/30 transition-colors duration-500 rounded-[2.5rem]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
