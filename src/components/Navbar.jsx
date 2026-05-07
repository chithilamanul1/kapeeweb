'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '#services' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg border-b border-slate-100 shadow-lg py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="relative group">
          <div className="flex items-center gap-3">
            <div className="relative group">
               <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300">
                  <img src="/logo.png" alt="Kapee Logo" className="w-full h-full object-cover" />
               </div>
               <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gold rounded-full border-2 border-white shadow-sm" />
            </div>
            <div className="flex flex-col">
              <span className={`text-2xl font-serif font-black tracking-tighter transition-colors duration-300 ${isScrolled ? 'text-emerald-950' : 'text-emerald-900'}`}>KAPEE</span>
              <span className={`text-[9px] uppercase font-bold tracking-[0.3em] transition-colors duration-300 ${isScrolled ? 'text-emerald-600' : 'text-emerald-700'}`}>Travels & Tours</span>
            </div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className={`text-[11px] uppercase tracking-[0.2em] font-black transition-colors duration-300 ${isScrolled ? 'text-slate-600 hover:text-emerald-600' : 'text-emerald-900/80 hover:text-emerald-900'}`}>
              {link.name}
            </Link>
          ))}
          <button 
            className="btn-premium flex items-center gap-3 px-8 py-3 text-[11px] uppercase tracking-widest font-black"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('openBooking'));
              }
            }}
          >
            <Phone size={14} strokeWidth={3} />
            <span>Book Now</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden p-2 transition-colors duration-300 ${isScrolled ? 'text-emerald-950' : 'text-emerald-900'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/90 backdrop-blur-lg overflow-hidden shadow-2xl border-b border-slate-100"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-xs font-black uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-3 hover:text-emerald-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button 
                className="btn-premium w-full justify-center mt-2"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('openBooking'));
                  }
                }}
              >
                Book Your Ride
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Emerald Border Accent */}
      <div className="absolute top-0 left-0 w-full h-[4px] bg-emerald-600" />
    </nav>
  );
};

export default Navbar;
