'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Car, Users, Briefcase, MapPin, Calendar, Clock, Send, CheckCircle2 } from 'lucide-react';

const vehicles = [
  { 
    id: 'sedan', 
    name: 'Luxury Sedan', 
    passengers: 3, 
    luggage: 2, 
    rate: 120, 
    image: '/luxury_sedan_kapee_1778135916724.png',
    description: 'Perfect for couples or small families.'
  },
  { 
    id: 'suv', 
    name: 'Premium SUV', 
    passengers: 4, 
    luggage: 4, 
    rate: 180, 
    image: '/premium_suv_kapee_1778135986240.png',
    description: 'Luxury and power for any terrain.'
  },
  { 
    id: 'van', 
    name: 'Luxury Van', 
    passengers: 7, 
    luggage: 6, 
    rate: 150, 
    image: '/hero-bg.png', // Placeholder
    description: 'Spacious comfort for groups.'
  },
  { 
    id: 'minibus', 
    name: 'Mini Bus', 
    passengers: 12, 
    luggage: 10, 
    rate: 250, 
    image: '/hero-bg.png', // Placeholder
    description: 'For corporate groups and large families.'
  }
];

const BookingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [currency, setCurrency] = useState('LKR');
  const [formData, setFormData] = useState({
    vehicle: null,
    pickup: '',
    destination: '',
    date: '',
    time: '',
    passengers: 1,
    name: '',
    phone: '',
    notes: ''
  });

  const exchangeRates = { LKR: 1, USD: 0.0033, EUR: 0.0031 };

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openBooking', handleOpen);
    return () => window.removeEventListener('openBooking', handleOpen);
  }, []);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const calculatePrice = (baseRate) => {
    // Mock distance for demonstration (normally would use Google Maps API)
    const mockDistance = 50; 
    const priceLKR = baseRate * mockDistance;
    return (priceLKR * exchangeRates[currency]).toLocaleString(undefined, {
      minimumFractionDigits: currency === 'LKR' ? 0 : 2,
      maximumFractionDigits: currency === 'LKR' ? 0 : 2
    });
  };

  const generateWhatsApp = () => {
    const text = `*New Booking Request - Kapi Travels*%0A%0A` +
      `*Vehicle:* ${formData.vehicle.name}%0A` +
      `*Pickup:* ${formData.pickup}%0A` +
      `*Destination:* ${formData.destination}%0A` +
      `*Date:* ${formData.date}%0A` +
      `*Time:* ${formData.time}%0A` +
      `*Passengers:* ${formData.passengers}%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Phone:* ${formData.phone}%0A` +
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
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-primary/90 backdrop-blur-md"
        onClick={() => setIsOpen(false)}
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-primary-light w-full max-w-4xl rounded-3xl overflow-hidden relative z-10 border border-white/10 shadow-2xl flex flex-col md:flex-row h-full max-h-[85vh]"
      >
        {/* Sidebar Info (Desktop) */}
        <div className="hidden md:flex md:w-1/3 bg-gold/5 p-8 flex-col justify-between border-r border-white/5">
          <div>
            <h2 className="text-3xl font-serif font-bold text-gold mb-2">Book Your Ride</h2>
            <p className="text-white/60 text-sm">Experience Sri Lanka with premium comfort and professional service.</p>
            
            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">Safe & Reliable</p>
                  <p className="text-xs text-white/40">Licensed professional drivers</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">Transparent Pricing</p>
                  <p className="text-xs text-white/40">No hidden costs, multi-currency</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
             <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Contact Person</p>
             <p className="font-bold text-gold">N Kapila Silva</p>
             <p className="text-xs text-white/60">Seeduwa, Sri Lanka</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto relative">
          <button 
            className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>

          {/* Progress bar */}
          <div className="flex gap-2 mb-10">
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  step >= i ? 'bg-gold' : 'bg-white/10'
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
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-serif font-bold">Select Your Vehicle</h3>
                  <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                    {['LKR', 'USD', 'EUR'].map(curr => (
                      <button
                        key={curr}
                        onClick={() => setCurrency(curr)}
                        className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                          currency === curr ? 'bg-gold text-primary' : 'text-white/60'
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
                      className={`group p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                        formData.vehicle?.id === v.id ? 'border-gold bg-gold/5' : 'border-white/5 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="h-32 rounded-xl overflow-hidden mb-4 relative">
                        <img src={v.image} alt={v.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute top-2 right-2 bg-primary/80 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-gold">
                           {currency} {calculatePrice(v.rate)}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-bold text-lg">{v.name}</h4>
                        <div className="flex gap-3 text-white/40">
                          <span className="flex items-center gap-1 text-xs"><Users size={12}/>{v.passengers}</span>
                          <span className="flex items-center gap-1 text-xs"><Briefcase size={12}/>{v.luggage}</span>
                        </div>
                      </div>
                      <p className="text-xs text-white/40 leading-relaxed">{v.description}</p>
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
                <h3 className="text-2xl font-serif font-bold mb-8">Trip Details</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Pickup Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={18} />
                        <input 
                          type="text" 
                          placeholder="Colombo Airport, Hotel, etc." 
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-gold outline-none transition-all"
                          value={formData.pickup}
                          onChange={(e) => setFormData({...formData, pickup: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Destination</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                        <input 
                          type="text" 
                          placeholder="Ella, Sigiriya, etc." 
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-gold outline-none transition-all"
                          value={formData.destination}
                          onChange={(e) => setFormData({...formData, destination: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                        <input 
                          type="date" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-gold outline-none transition-all"
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Time</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                        <input 
                          type="time" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-gold outline-none transition-all"
                          value={formData.time}
                          onChange={(e) => setFormData({...formData, time: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Passengers</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                        <select 
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-gold outline-none transition-all appearance-none"
                          value={formData.passengers}
                          onChange={(e) => setFormData({...formData, passengers: e.target.value})}
                        >
                          {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => <option key={n} value={n} className="bg-primary text-white">{n} Persons</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-6">
                    <button onClick={handleBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-all font-bold">
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
                <h3 className="text-2xl font-serif font-bold mb-8">Confirm Booking</h3>
                <div className="space-y-6">
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Selected Vehicle</p>
                        <p className="font-bold text-lg text-gold">{formData.vehicle?.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Estimated Price</p>
                        <p className="font-bold text-xl">{currency} {calculatePrice(formData.vehicle?.rate)}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-white/40 text-[10px] uppercase font-bold">From</p>
                        <p>{formData.pickup}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-[10px] uppercase font-bold">To</p>
                        <p>{formData.destination}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-[10px] uppercase font-bold">Date & Time</p>
                        <p>{formData.date} @ {formData.time}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-[10px] uppercase font-bold">Passengers</p>
                        <p>{formData.passengers} Persons</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="Your Full Name" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-gold outline-none transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                      <input 
                        type="tel" 
                        placeholder="WhatsApp Number" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-gold outline-none transition-all"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <textarea 
                      placeholder="Special Requirements (Optional)" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-gold outline-none transition-all h-24 resize-none"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    ></textarea>
                  </div>

                  <div className="flex justify-between pt-6">
                    <button onClick={handleBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-all font-bold">
                      <ChevronLeft size={20} /> Back
                    </button>
                    <button 
                      onClick={generateWhatsApp}
                      disabled={!formData.name || !formData.phone}
                      className="btn-whatsapp px-10 flex items-center gap-3 disabled:opacity-50"
                    >
                      <Send size={20} /> Confirm on WhatsApp
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
