'use client';

import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';

const destinations = [
  {
    name: 'Sigiriya',
    tagline: 'The Lion Rock',
    image: '/sigiriya-1.png',
    description: 'Ancient rock fortress and palace ruin in the central Matale District.'
  },
  {
    name: 'Ella',
    tagline: 'The Misty Hills',
    image: '/ella.jpg',
    description: 'Breathtaking mountain views and lush tea plantations.'
  },
  {
    name: 'Galle',
    tagline: 'Colonial Heritage',
    image: '/galle-new.png',
    description: 'Historic fort city with Dutch-colonial architecture and beautiful beaches.'
  },
  {
    name: 'Mirissa',
    tagline: 'Coastal Paradise',
    image: '/mirissa-new-fix.png',
    description: 'Famous for its whale watching and laid-back beach vibe.'
  },
  {
    name: 'Kandy',
    tagline: 'Cultural Capital',
    image: '/kandy-new.png',
    description: 'Home to the Temple of the Sacred Tooth Relic and beautiful botanical gardens.'
  },
  {
    name: 'Nuwara Eliya',
    tagline: 'Little England',
    image: '/nuwara-eliya-new.png',
    description: 'Cool climate, colonial bungalows, and rolling hills of tea.'
  }
];

const Destinations = () => {
  return (
    <section id="destinations" className="py-24 bg-primary-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold uppercase tracking-[0.3em] text-sm font-bold mb-4 block"
          >
            Explore the Island
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Popular <span className="text-gradient">Destinations</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer"
            >
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 text-gold mb-2">
                  <MapPin size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">{dest.tagline}</span>
                </div>
                <h3 className="text-3xl font-serif font-bold mb-3">{dest.name}</h3>
                <p className="text-white/60 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed">
                  {dest.description}
                </p>
                <div className="flex items-center gap-2 text-gold font-bold text-sm">
                  Explore More <ArrowUpRight size={18} />
                </div>
              </div>

              {/* Glassy border on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/20 transition-colors duration-500 rounded-3xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
