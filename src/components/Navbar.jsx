'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Globe } from 'lucide-react';

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
        isScrolled ? 'glass-dark py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Placeholder */}
        <Link href="/" className="relative group">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 relative overflow-hidden">
               {/* Replace with <Image /> when logo is uploaded */}
               <div className="w-full h-full bg-gold/20 rounded-lg flex items-center justify-center border border-gold/30">
                  <span className="text-gold font-bold text-xs">LOGO</span>
               </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold tracking-wider text-gold">KAPEE</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">Travels & Tours</span>
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="nav-link text-sm uppercase tracking-widest font-medium">
              {link.name}
            </Link>
          ))}
          <button 
            className="btn-premium flex items-center gap-2"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('openBooking'));
              }
            }}
          >
            <Phone size={16} />
            <span>Book Now</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
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
            className="md:hidden glass-dark overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium tracking-wide border-b border-white/5 pb-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button 
                className="btn-premium w-full justify-center"
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

      {/* Top Gold Border Accent */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
    </nav>
  );
};

export default Navbar;
