'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = () => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed bottom-8 right-8 z-[90]"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-emerald rounded-full blur-lg opacity-50"
      />
      <a
        href="https://wa.me/94768743357"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-16 h-16 bg-emerald text-white rounded-full shadow-2xl hover:bg-emerald-light transition-all transform hover:scale-110 active:scale-95"
      >
        <MessageCircle size={32} />
      </a>
    </motion.div>
  );
};

export default FloatingWhatsApp;
