'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary-dark pt-20 pb-10 border-t border-gold/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
               <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center border border-gold/30 font-bold text-gold text-xs">KAPEE</div>
               <span className="text-2xl font-serif font-bold text-gold">Kapi Travels</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              <span className="text-white/60 font-bold">Kapee Tours Seeduwa</span> provides premium travel experiences across Sri Lanka. Known as <span className="text-white/60 font-bold">Kapila Tours</span>, we ensure every mile is memorable from arrival to departure.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-gold hover:bg-gold/10 transition-all border border-white/10"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-gold hover:bg-gold/10 transition-all border border-white/10"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-gold hover:bg-gold/10 transition-all border border-white/10"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'Destinations', 'Gallery', 'Terms & Conditions'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-white/40 hover:text-gold transition-colors text-sm">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-widest text-sm">Our Services</h4>
            <ul className="space-y-4">
              {['Airport Transfers', 'Island Wide Tours', 'Corporate Travel', 'Day Excursions', 'Hotel Bookings'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-white/40 hover:text-gold transition-colors text-sm">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-widest text-sm">Get in Touch</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="text-gold shrink-0" />
                <div className="text-sm">
                   <p className="font-bold text-white">N Kapila Silva</p>
                   <p className="text-white/40">Seeduwa, Sri Lanka</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={20} className="text-gold shrink-0" />
                <a href="tel:+94768743357" className="text-sm text-white/60 hover:text-white transition-colors">+94 76 874 3357</a>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={20} className="text-gold shrink-0" />
                <a href="mailto:info@kapitravels.lk" className="text-sm text-white/60 hover:text-white transition-colors">info@kapitravels.lk</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs text-center md:text-left">
            © {new Date().getFullYear()} Kapi Travels and Tours. All rights reserved. 
            <span className="ml-2">Designed by Antigravity.</span>
          </p>
          <div className="flex gap-8 text-white/20 text-[10px] uppercase tracking-widest font-bold">
            <Link href="#" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-gold transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
