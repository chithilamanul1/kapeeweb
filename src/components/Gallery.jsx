'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const clientImages = [
  { src: '/clients/client-1.jpeg', title: 'Airport Pickup' },
  { src: '/clients/client-2.jpeg', title: 'Happy Family' },
  { src: '/clients/client-3.jpeg', title: 'Tour Group' },
  { src: '/clients/client-4.jpeg', title: 'Scenic Tour' },
  { src: '/clients/client-5.jpeg', title: 'Beach Visit' },
  { src: '/clients/client-6.jpeg', title: 'Cultural Tour' },
  { src: '/clients/client-7.jpeg', title: 'Safari Experience' },
  { src: '/clients/client-8.jpeg', title: 'Temple Visit' },
  { src: '/clients/client-9.jpeg', title: 'Sunset Tour' },
  { src: '/clients/client-10.jpeg', title: 'Mountain Trek' },
  { src: '/clients/client-11.jpeg', title: 'City Exploration' },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-emerald-600 uppercase tracking-[0.4em] text-[10px] font-black mb-4 block"
          >
            Memories in Sri Lanka
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black text-emerald-950 tracking-tighter uppercase leading-none">
            Our Happy <span className="text-emerald-600">Travelers</span>
          </h2>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5">
          {clientImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="relative group rounded-[1.5rem] overflow-hidden cursor-pointer shadow-lg shadow-slate-200/50 break-inside-avoid"
            >
              <Image 
                src={img.src} 
                alt={img.title} 
                width={400}
                height={500}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-emerald-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                 <div className="text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white font-black text-lg uppercase tracking-tight">{img.title}</p>
                    <div className="w-12 h-[3px] bg-emerald-400 mx-auto mt-3 rounded-full" />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
