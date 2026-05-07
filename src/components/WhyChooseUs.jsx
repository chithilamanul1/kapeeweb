'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, ThumbsUp, Clock, Award } from 'lucide-react';

const stats = [
  { icon: <ShieldCheck size={32} />, value: '100%', label: 'Safety Record', desc: 'Secure & insured travel' },
  { icon: <ThumbsUp size={32} />, value: '1500+', label: 'Happy Clients', desc: 'Verified 5-star reviews' },
  { icon: <Clock size={32} />, value: '24/7', label: 'Availability', desc: 'Seeduwa based rapid response' },
  { icon: <Award size={32} />, value: '15+', label: 'Kapila Tours', desc: 'Trusted local travel expertise' },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-10 rounded-[2rem] bg-white border border-slate-100 text-center hover:border-emerald-100 shadow-xl shadow-slate-200/50 transition-all duration-500 group"
            >
              <div className="text-emerald-600 mb-8 flex justify-center bg-emerald-50 w-16 h-16 items-center rounded-2xl mx-auto group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-inner">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-black text-emerald-950 mb-3 tracking-tighter">{stat.value}</h3>
              <p className="font-black text-emerald-600 text-[10px] uppercase tracking-[0.2em] mb-3">{stat.label}</p>
              <p className="text-slate-500 text-xs font-bold">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
    </section>
  );
};

export default WhyChooseUs;
