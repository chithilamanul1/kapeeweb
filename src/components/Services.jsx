'use client';

import { motion } from 'framer-motion';
import { PlaneTakeoff, Map, Building2, ChevronRight } from 'lucide-react';

const services = [
  {
    title: 'Airport Transfers',
    description: 'Punctual and comfortable pickups and drops from Colombo International Airport to any destination in Sri Lanka.',
    icon: <PlaneTakeoff size={32} strokeWidth={3} className="text-emerald-600" />,
    color: 'bg-blue-50 text-blue-600',
    iconBg: 'bg-blue-100'
  },
  {
    title: 'Custom Tours',
    description: 'Bespoke island-wide tours tailored to your interests. Explore Sigiriya, Ella, Galle, and more with our expert guides.',
    icon: <Map size={32} strokeWidth={3} className="text-emerald-600" />,
    color: 'bg-emerald-50 text-emerald-600',
    iconBg: 'bg-emerald-100'
  },
  {
    title: 'Corporate Travel',
    description: 'Reliable and professional transportation for business meetings, conferences, and executive travel needs.',
    icon: <Building2 size={32} strokeWidth={3} className="text-emerald-600" />,
    color: 'bg-purple-50 text-purple-600',
    iconBg: 'bg-purple-100'
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 relative overflow-hidden bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-emerald-600 uppercase tracking-[0.4em] text-[10px] font-black mb-4 block">What We Offer</span>
            <h2 className="text-4xl md:text-6xl font-black text-emerald-950 tracking-tighter uppercase leading-none">
              Premium Travel <br/>
              <span className="text-emerald-600">Solutions</span>
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-slate-500 max-w-md text-right hidden md:block font-medium"
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
              className="group relative p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-emerald-100 transition-all duration-500 overflow-hidden"
            >
              <div className="relative z-10">
                <div className={`mb-8 p-6 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-500 ${service.iconBg}`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 text-emerald-950 uppercase tracking-tight">{service.title}</h3>
                <p className="text-slate-500 mb-8 leading-relaxed font-medium">
                  {service.description}
                </p>
                <button 
                   onClick={() => window.dispatchEvent(new CustomEvent('openBooking'))}
                   className="flex items-center gap-3 text-emerald-600 font-black text-xs uppercase tracking-widest group-hover:gap-5 transition-all"
                >
                  Book Service <ChevronRight size={16} strokeWidth={3} />
                </button>
              </div>

              {/* Cartoon Vector Decoration (Abstract) */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-600/5 rounded-full blur-2xl group-hover:bg-emerald-600/10 transition-all" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Abstract Background Elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-emerald-600/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 blur-[150px] rounded-full translate-x-1/4 translate-y-1/4" />
    </section>
  );
};

export default Services;
