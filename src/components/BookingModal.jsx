'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Users, Briefcase, MapPin, Calendar, Clock, Send, CheckCircle2, PlaneTakeoff } from 'lucide-react';

const vehicles = [
  { 
    id: 'sedan', 
    name: 'Luxury Sedan', 
    passengers: 3, 
    luggage: 3, 
    rate: 25, // Base rate in EUR for Colombo
    image: '/vehicles/sedancar.png',
    description: 'Perfect for couples or small families.'
  },
  { 
    id: 'van', 
    name: 'Spacious Van', 
    passengers: 8, 
    luggage: 8, 
    rate: 35, // Approx base rate in EUR
    image: '/vehicles/toyota-highroof.png',
    description: 'Comfortable group travel with ample luggage space.'
  }
];

const destinationRates = {
  'colombo': 25,
  'galle': 68,
  'unawatuna': 68,
  'bossa': 68,
  'ahangama': 68,
  'kogala': 68,
  'bentota': 38,
  'beruwala': 38,
  'iduruwa': 38,
  'kandy': 63,
  'sigiriya': 63,
  'habarana': 63
};

const BookingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [currency, setCurrency] = useState('EUR'); // Default to EUR as per rates
  const [formData, setFormData] = useState({
    vehicle: null,
    pickup: '',
    destination: '',
    date: '',
    time: '',
    flight: '',
    passengers: 1,
    name: '',
    phone: '',
    notes: ''
  });

  const exchangeRates = { LKR: 320, USD: 1.08, EUR: 1 };
  const currencySymbols = { LKR: 'Rs.', USD: '$', EUR: '€' };

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openBooking', handleOpen);
    return () => window.removeEventListener('openBooking', handleOpen);
  }, []);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const calculatePrice = (baseRate) => {
    // If destination is recognized, use the destination rate
    const dest = formData.destination.toLowerCase().trim();
    let rateEUR = baseRate;

    // Check for destination match
    for (const [key, value] of Object.entries(destinationRates)) {
      if (dest.includes(key)) {
        rateEUR = value;
        // Adjust for Van (usually +20% or a fixed amount, let's assume +15 EUR for Van if it's a long trip)
        if (formData.vehicle?.id === 'van') {
            rateEUR += 15;
        }
        break;
      }
    }

    // Convert from EUR to target currency
    const priceTarget = rateEUR * (currency === 'EUR' ? 1 : (currency === 'LKR' ? exchangeRates.LKR : exchangeRates.USD));

    return priceTarget.toLocaleString(undefined, {
      minimumFractionDigits: currency === 'LKR' ? 0 : 0,
      maximumFractionDigits: currency === 'LKR' ? 0 : 0
    });
  };

  const generateWhatsApp = () => {
    const text = `Att : Kapila ( Amendment)%0A` +
      `Arrival Transfer%0A` +
      `Name.      : ${formData.name}%0A` +
      `Pax.          : ${formData.passengers}%0A` +
      `Date.        : ${formData.date}%0A` +
      `Time.        : ${formData.time}%0A` +
      `Flight.       : ${formData.flight || 'N/A'}%0A` +
      `Vehicle.    : ${formData.vehicle?.name || 'Any'}%0A` +
      `Drop off    : ${formData.destination}%0A` +
      `Contact No : ${formData.phone}%0A%0A` +
      `*Notes:* ${formData.notes || 'None'}`;
    
    if (typeof window !== 'undefined') {
      window.open(`https://wa.me/94768743357?text=${text}`, '_blank');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={() => setIsOpen(false)}
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white w-full max-w-4xl rounded-[2rem] overflow-hidden relative z-10 border border-slate-100 shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
      >
        {/* Sidebar */}
        <div className="hidden md:flex md:w-1/3 bg-emerald-950 p-8 flex-col justify-between">
          <div>
            <h2 className="text-3xl font-serif font-black text-white mb-2 tracking-tighter">Book Your Ride</h2>
            <p className="text-emerald-100/60 text-sm font-medium">Experience Sri Lanka with premium comfort.</p>
            
            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="text-sm font-black text-white">Safe & Reliable</p>
                  <p className="text-xs text-emerald-100/40 font-bold">Licensed professional drivers</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="text-sm font-black text-white">Multi-Currency</p>
                  <p className="text-xs text-emerald-100/40 font-bold">LKR, USD & EUR pricing</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-emerald-900 rounded-2xl border border-emerald-800">
             <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-black mb-2">Contact Person</p>
             <p className="font-black text-white">N Kapila Silva</p>
             <p className="text-xs text-emerald-100/40 font-bold">Seeduwa, Sri Lanka</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto relative">
          <button 
            className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>

          {/* Progress bar */}
          <div className="flex gap-2 mb-10">
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  step >= i ? 'bg-emerald-600' : 'bg-slate-100'
                }`} 
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-black text-emerald-950 tracking-tighter">Select Vehicle</h3>
                  <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                    {['LKR', 'USD', 'EUR'].map(curr => (
                      <button
                        key={curr}
                        onClick={() => setCurrency(curr)}
                        className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all tracking-widest ${
                          currency === curr ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400'
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vehicles.map((v) => (
                    <div 
                      key={v.id}
                      onClick={() => {
                        setFormData({ ...formData, vehicle: v });
                        handleNext();
                      }}
                      className="group p-4 rounded-2xl border-2 transition-all cursor-pointer bg-white border-slate-100 hover:border-emerald-200 hover:shadow-xl flex flex-col h-full"
                    >
                      <div className="h-40 w-full rounded-xl overflow-hidden mb-4 relative bg-slate-50 flex items-center justify-center p-4">
                        <img src={v.image} alt={v.name} className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute top-2 right-2 bg-emerald-600 px-3 py-1.5 rounded-lg text-[10px] font-black text-white shadow-lg">
                           {currencySymbols[currency]} {calculatePrice(v.rate)}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mb-1 mt-auto">
                        <h4 className="font-black text-emerald-950 text-sm">{v.name}</h4>
                        <div className="flex gap-3 text-slate-400">
                          <span className="flex items-center gap-1 text-[10px] font-bold"><Users size={10}/>{v.passengers}</span>
                          <span className="flex items-center gap-1 text-[10px] font-bold"><Briefcase size={10}/>{v.luggage}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 font-medium">{v.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
              >
                <h3 className="text-2xl font-black text-emerald-950 tracking-tighter mb-8">Trip Details</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Pickup Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600" size={18} />
                        <input 
                          type="text" 
                          placeholder="Airport, Hotel, etc." 
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 focus:border-emerald-600 outline-none transition-all text-slate-900 font-medium"
                          value={formData.pickup}
                          onChange={(e) => setFormData({...formData, pickup: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Destination</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="text" 
                          placeholder="e.g. Galle, Kandy, Colombo" 
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 focus:border-emerald-600 outline-none transition-all text-slate-900 font-medium"
                          value={formData.destination}
                          onChange={(e) => setFormData({...formData, destination: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="date" 
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 focus:border-emerald-600 outline-none transition-all text-slate-900 font-medium"
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Time</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="time" 
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 focus:border-emerald-600 outline-none transition-all text-slate-900 font-medium"
                          value={formData.time}
                          onChange={(e) => setFormData({...formData, time: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Flight</label>
                      <div className="relative">
                        <PlaneTakeoff className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="text" 
                          placeholder="Flight No." 
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 focus:border-emerald-600 outline-none transition-all text-slate-900 font-medium"
                          value={formData.flight}
                          onChange={(e) => setFormData({...formData, flight: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Pax</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <select 
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 focus:border-emerald-600 outline-none transition-all appearance-none text-slate-900 font-medium"
                          value={formData.passengers}
                          onChange={(e) => setFormData({...formData, passengers: e.target.value})}
                        >
                          {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => <option key={n} value={n}>{n} Pax</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-6">
                    <button onClick={handleBack} className="flex items-center gap-2 text-slate-400 hover:text-emerald-600 transition-all font-black text-xs uppercase tracking-widest">
                      <ChevronLeft size={20} /> Back
                    </button>
                    <button 
                      onClick={handleNext}
                      disabled={!formData.pickup || !formData.destination || !formData.date}
                      className="btn-premium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next Step <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
              >
                <h3 className="text-2xl font-black text-emerald-950 tracking-tighter mb-8">Confirm Booking</h3>
                <div className="space-y-6">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Vehicle</p>
                        <p className="font-black text-lg text-emerald-600">{formData.vehicle?.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Estimated</p>
                        <p className="font-black text-xl text-emerald-950">{currencySymbols[currency]} {calculatePrice(formData.vehicle?.rate)}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-400 text-[10px] uppercase font-black">From</p>
                        <p className="text-slate-900 font-bold">{formData.pickup}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-[10px] uppercase font-black">To</p>
                        <p className="text-slate-900 font-bold">{formData.destination}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-[10px] uppercase font-black">Date & Time</p>
                        <p className="text-slate-900 font-bold">{formData.date} @ {formData.time}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-[10px] uppercase font-black">Pax</p>
                        <p className="text-slate-900 font-bold">{formData.passengers} Persons</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="Your Full Name" 
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 focus:border-emerald-600 outline-none transition-all text-slate-900 font-medium"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                      <input 
                        type="tel" 
                        placeholder="WhatsApp Number" 
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 focus:border-emerald-600 outline-none transition-all text-slate-900 font-medium"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <textarea 
                      placeholder="Special Requirements (Optional)" 
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 focus:border-emerald-600 outline-none transition-all h-24 resize-none text-slate-900 font-medium"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    ></textarea>
                  </div>

                  <div className="flex justify-between pt-6">
                    <button onClick={handleBack} className="flex items-center gap-2 text-slate-400 hover:text-emerald-600 transition-all font-black text-xs uppercase tracking-widest">
                      <ChevronLeft size={20} /> Back
                    </button>
                    <button 
                      onClick={generateWhatsApp}
                      disabled={!formData.name || !formData.phone}
                      className="px-10 py-3 bg-[#25D366] text-white font-black rounded-full hover:bg-[#128C7E] transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center gap-3 disabled:opacity-50 text-xs uppercase tracking-widest"
                    >
                      <Send size={18} /> Confirm on WhatsApp
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingModal;
