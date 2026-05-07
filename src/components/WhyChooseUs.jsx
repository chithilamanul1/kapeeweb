'use client';

import { motion } from 'framer-motion';
import { Award, ShieldCheck, Clock, ThumbsUp } from 'lucide-react';

const stats = [
  { icon: <ShieldCheck size={32} />, value: '100%', label: 'Safety Record', desc: 'Secure & insured travel' },
  { icon: <ThumbsUp size={32} />, value: '1500+', label: 'Happy Clients', desc: 'Verified 5-star reviews' },
  { icon: <Clock size={32} />, value: '24/7', label: 'Availability', desc: 'Round-the-clock support' },
  { icon: <Award size={32} />, value: '15+', label: 'Years Experience', desc: 'Expert local knowledge' },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-primary-light relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center hover:border-gold/30 transition-all duration-300"
            >
              <div className="text-gold mb-6 flex justify-center">{stat.icon}</div>
              <h3 className="text-4xl font-serif font-bold text-white mb-2">{stat.value}</h3>
              <p className="font-bold text-gold text-sm uppercase tracking-widest mb-2">{stat.label}</p>
              <p className="text-white/40 text-xs">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
