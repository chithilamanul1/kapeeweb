'use client';

import { motion } from 'framer-motion';

const clientImages = [
  { src: '/new_assets/media__1772694108658.jpg', title: 'Sunset at Mirissa', size: 'large' },
  { src: '/sigiriya-2.png', title: 'Lion Rock Climb', size: 'small' },
  { src: '/Hero/elephants.jpg', title: 'Udawalawe Safari', size: 'medium' },
  { src: '/new_assets/media__1772694337842.jpg', title: 'Tea Plantations', size: 'small' },
  { src: '/Hero/arugam_beach.png', title: 'Arugam Bay Vibes', size: 'large' },
  { src: '/Hero/monkey.jpg', title: 'Wildlife Encounters', size: 'medium' },
  { src: '/new_assets/media__1772695977560.jpg', title: 'Happy Travelers', size: 'small' },
  { src: '/Hero/ella.jpg', title: 'Nine Arch Bridge', size: 'medium' },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold uppercase tracking-[0.3em] text-sm font-bold mb-4 block"
          >
            Memories in Sri Lanka
          </motion.span>
          <h2 className="section-title">Our Happy <span className="text-gradient">Travelers</span></h2>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {clientImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group rounded-3xl overflow-hidden cursor-pointer shadow-lg"
            >
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                 <div className="text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-gold font-serif text-2xl font-bold">{img.title}</p>
                    <div className="w-12 h-[2px] bg-gold mx-auto mt-2" />
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
