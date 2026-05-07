'use client';

import { motion } from 'framer-motion';
import { PlaneTakeoff, Map, Building2, ChevronRight } from 'lucide-react';

const services = [
  {
    title: 'Airport Transfers',
    description: 'Punctual and comfortable pickups and drops from Colombo International Airport to any destination in Sri Lanka.',
    icon: <PlaneTakeoff size={40} className="text-gold" />,
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    title: 'Custom Tours',
    description: 'Bespoke island-wide tours tailored to your interests. Explore Sigiriya, Ella, Galle, and more with our expert guides.',
    icon: <Map size={40} className="text-gold" />,
    color: 'from-emerald-500/20 to-teal-500/20'
  },
  {
    title: 'Corporate Travel',
    description: 'Reliable and professional transportation for business meetings, conferences, and executive travel needs.',
    icon: <Building2 size={40} className="text-gold" />,
    color: 'from-purple-500/20 to-pink-500/20'
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 relative overflow-hidden bg-primary">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold uppercase tracking-[0.3em] text-sm font-bold mb-4 block">What We Offer</span>
            <h2 className="section-title">Premium Travel <span className="text-gradient">Solutions</span></h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white/60 max-w-md text-right hidden md:block"
          >
            We provide a range of high-end transportation services designed to make your journey through Sri Lanka seamless and enjoyable.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="card-3d group relative p-8 rounded-3xl glass hover:border-gold/30 transition-all duration-500"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />
              
              <div className="relative z-10">
                <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">{service.title}</h3>
                <p className="text-white/60 mb-8 leading-relaxed">
                  {service.description}
                </p>
                <button 
                   onClick={() => window.dispatchEvent(new CustomEvent('openBooking'))}
                   className="flex items-center gap-2 text-gold font-bold group-hover:gap-4 transition-all"
                >
                  Book Service <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Abstract Background Elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald/5 blur-[150px] rounded-full translate-x-1/4 translate-y-1/4" />
    </section>
  );
};

export default Services;
