'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-emerald-950 pt-20 pb-10 border-t border-emerald-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
               <div className="relative w-16 h-16 rounded-full overflow-hidden flex items-center justify-center border border-emerald-900/50">
                  <Image src="/logo.png" alt="Kapee Logo" fill className="object-cover" />
               </div>
               <div className="flex flex-col">
                 <span className="text-2xl font-serif font-black text-white tracking-tighter">KAPEE</span>
                 <span className="text-[8px] uppercase tracking-[0.3em] text-emerald-400 font-bold">Travels & Tours</span>
               </div>
            </div>
            <p className="text-emerald-100/60 text-sm leading-relaxed font-medium">
              <span className="text-white font-black">KAPEE Tours Seeduwa</span> provides premium travel experiences across Sri Lanka. Known as <span className="text-white font-black">KAPEE Tours</span>, we ensure every mile is memorable from arrival to departure.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-2xl bg-emerald-900 flex items-center justify-center text-emerald-400 hover:text-white hover:bg-emerald-800 transition-all border border-emerald-800"><Facebook size={20} /></a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-emerald-900 flex items-center justify-center text-emerald-400 hover:text-white hover:bg-emerald-800 transition-all border border-emerald-800"><Instagram size={20} /></a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-emerald-900 flex items-center justify-center text-emerald-400 hover:text-white hover:bg-emerald-800 transition-all border border-emerald-800"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white uppercase tracking-[0.2em] text-xs font-black mb-8 border-l-4 border-emerald-600 pl-4">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'Destinations', 'Gallery', 'Terms & Conditions'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-emerald-100/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white uppercase tracking-[0.2em] text-xs font-black mb-8 border-l-4 border-emerald-600 pl-4">Our Services</h4>
            <ul className="space-y-4">
              {['Airport Transfers', 'Island Wide Tours', 'Corporate Travel', 'Day Excursions', 'Hotel Bookings'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-emerald-100/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white uppercase tracking-[0.2em] text-xs font-black mb-8 border-l-4 border-emerald-600 pl-4">Get in Touch</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="text-emerald-600 shrink-0" />
                <div className="text-sm">
                   <p className="font-black text-white uppercase tracking-tight">N Kapila Silva</p>
                   <p className="text-emerald-100/40 font-bold text-xs">Seeduwa, Sri Lanka</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={20} className="text-emerald-600 shrink-0" />
                <a href="tel:+94768743357" className="text-xs font-black text-emerald-100/60 hover:text-white transition-colors tracking-widest">+94 76 874 3357</a>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={20} className="text-emerald-600 shrink-0" />
                <a href="mailto:info@kapitravels.lk" className="text-xs font-black text-emerald-100/60 hover:text-white transition-colors tracking-widest uppercase">info@kapitravels.lk</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-x-6 gap-y-2 opacity-10 text-[9px] font-bold text-emerald-100 uppercase tracking-[0.2em]">
          <span>#AirportTaxi</span> <span>#TaxiService</span> <span>#AirportTransfer</span> <span>#TourismSupport</span>
          <span>#RideWithUs</span> <span>#TravelEasy</span> <span>#BookNow</span> <span>#OnTimeEveryTime</span>
          <span>#ExploreWithUs</span> <span>#SafeTravel</span> <span>#HassleFreeTravel</span> <span>#BestTaxiService</span>
          <span>#DiscoverMore</span> <span>#AirportPickup</span> <span>#SriLankaTours</span>
        </div>

        <div className="pt-10 border-t border-emerald-900 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-emerald-100/50 text-[10px] font-black uppercase tracking-widest text-center md:text-left">
            © {new Date().getFullYear()} Kapee Travels and Tours. All rights reserved. 
            <span className="ml-4 text-emerald-100/60">Made with ❤️ by <a href="https://seranex.org" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Seranex</a></span>
          </p>
          <div className="flex gap-10 text-emerald-100/40 text-[10px] uppercase tracking-widest font-black">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
