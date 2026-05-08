'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Users, Briefcase, MapPin, Calendar, Clock, Send, CheckCircle2, PlaneTakeoff, Loader2, Zap, Map as MapIcon } from 'lucide-react';

const vehicles = [
  { 
    id: 'sedan', 
    name: 'Sedan', 
    passengers: 3, 
    luggage: 3, 
    ratePerKm: 0, // Not used with flat daily rate
    minRate: 40,
    multiplier: 1,
    image: '/vehicles/sedancar.png',
    description: 'Perfect for couples or small families.'
  }
];

const FIXED_RATES = [];

const BookingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [pricing, setPricing] = useState(null);
  const [currency, setCurrency] = useState('LKR');
  const [isCalculating, setIsCalculating] = useState(false);
  const [distanceInfo, setDistanceInfo] = useState({ km: 0, text: '' });

  useEffect(() => {
    fetch('/api/pricing')
      .then(res => res.json())
      .then(data => setPricing(data));
  }, []);
  
  const [formData, setFormData] = useState({
    vehicle: null,
    pickup: 'Bandaranaike International Airport (BIA)',
    destination: '',
    date: '',
    time: '',
    flight: '',
    passengers: 1,
    name: '',
    phone: '',
    notes: '',
    highlight: '€40 One Day Deal',
    days: 1,
    nameboard: '',
    email: ''
  });

  const exchangeRates = { LKR: 320, USD: 1.08, EUR: 1 };
  const currencySymbols = { LKR: 'Rs.', USD: '$', EUR: '€' };

  // Google Maps Refs & State
  const pickupRef = useRef(null);
  const destRef = useRef(null);
  const mapRef = useRef(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  // Listen for external open trigger
  useEffect(() => {
    const handleOpen = (e) => {
      setIsOpen(true);
      if (e.detail && e.detail.destination) {
        setFormData(prev => ({ ...prev, destination: e.detail.destination }));
      }
    };
    window.addEventListener('openBooking', handleOpen);
    return () => window.removeEventListener('openBooking', handleOpen);
  }, []);

  // Load Google Maps Script
  useEffect(() => {
    if (window.google) {
      setGoogleLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => setGoogleLoaded(true);
    document.head.appendChild(script);
  }, []);

  // Initialize Autocomplete
  useEffect(() => {
    if (!googleLoaded || !isOpen) return;

    const options = {
      componentRestrictions: { country: "lk" },
      fields: ["address_components", "geometry", "icon", "name", "formatted_address"],
      strictBounds: false,
    };

    if (pickupRef.current) {
        const pickupAutocomplete = new window.google.maps.places.Autocomplete(pickupRef.current, options);
        pickupAutocomplete.addListener("place_changed", () => {
          const place = pickupAutocomplete.getPlace();
          if (place.formatted_address) {
            setFormData(prev => ({ ...prev, pickup: place.formatted_address }));
          }
        });
    }

    if (destRef.current) {
        const destAutocomplete = new window.google.maps.places.Autocomplete(destRef.current, options);
        destAutocomplete.addListener("place_changed", () => {
          const place = destAutocomplete.getPlace();
          if (place.formatted_address) {
            setFormData(prev => ({ ...prev, destination: place.formatted_address }));
          }
        });
    }
  }, [googleLoaded, isOpen, step]);

  // Initialize Map when step 3 is active
  useEffect(() => {
    if (googleLoaded && mapRef.current && !map && step === 3) {
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 7.8731, lng: 80.7718 }, // Sri Lanka center
        zoom: 7,
        disableDefaultUI: true,
        styles: [
            { "featureType": "all", "elementType": "geometry.fill", "stylers": [{ "weight": "2.00" }] },
            { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] },
            { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#c8d7d4" }] }
        ]
      });
      const renderer = new window.google.maps.DirectionsRenderer({
        map: newMap,
        polylineOptions: { strokeColor: "#10b981", strokeWeight: 5, strokeOpacity: 0.8 }
      });
      setMap(newMap);
      setDirectionsRenderer(renderer);
    }
  }, [googleLoaded, mapRef, map, step]);

  const calculateDistance = useCallback(async () => {
    if (!formData.pickup || !formData.destination || !googleLoaded) return;
    
    setIsCalculating(true);
    try {
      const directionsService = new window.google.maps.DirectionsService();
      
      directionsService.route(
        {
          origin: formData.pickup,
          destination: formData.destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            if (directionsRenderer) {
                directionsRenderer.setDirections(result);
            }
            const distance = result.routes[0].legs[0].distance.value / 1000;
            setDistanceInfo({ 
              km: Math.ceil(distance), 
              text: `${Math.ceil(distance)} KM trip` 
            });
          } else {
            // Fallback estimation
            const destLower = formData.destination.toLowerCase();
            const fixedMatch = FIXED_RATES.find(fr => fr.keywords.some(k => destLower.includes(k)));
            const estimatedKm = fixedMatch ? 120 : 100;
            setDistanceInfo({ km: estimatedKm, text: `${estimatedKm} KM (Estimated)` });
          }
          setIsCalculating(false);
        }
      );
    } catch (error) {
      setIsCalculating(false);
    }
  }, [formData.pickup, formData.destination, googleLoaded, directionsRenderer]);

  useEffect(() => {
    if (step === 3) calculateDistance();
  }, [step, calculateDistance]);

  const calculatePrice = (vehicle) => {
    if (!vehicle || !pricing) return { lkr: 0, usd: 0, eur: 0 };
    
    let totalLKR = 0;
    
    if (formData.days > 1) {
      // Tour logic: €40 * days converted to LKR
      const totalEUR = pricing.tourDailyRate * formData.days;
      totalLKR = totalEUR * pricing.exchangeRates.LKR;
    } else {
      // Airport Transfer logic: Use distance-based rate sheet
      const km = distanceInfo.km || 0;
      const rateConfig = pricing.rateSheet.find(r => km >= r.min && km < r.max) || pricing.rateSheet[pricing.rateSheet.length - 1];
      
      if (rateConfig.type === 'flat') {
        totalLKR = rateConfig.rate;
      } else {
        totalLKR = km * rateConfig.rate;
      }

      // Airport city overrides (Optional, if user wants to keep specific flat rates for these cities)
      const destLower = formData.destination.toLowerCase();
      const fixedMatch = pricing.airportFlatRates.find(zone => zone.keywords.some(kw => destLower.includes(kw)));
      if (fixedMatch) {
         // Use the lower of the two or the fixed match? 
         // User said 68 for Galle is wrong, should be 40. 40 EUR = 12,800 LKR.
         // Let's use the fixed rate if found.
         totalLKR = fixedMatch.rate * pricing.exchangeRates.LKR;
      }
    }

    const eur = totalLKR / pricing.exchangeRates.LKR;
    const usd = eur * pricing.exchangeRates.USD;

    return { 
      lkr: Math.round(totalLKR), 
      usd: usd.toFixed(2), 
      eur: eur.toFixed(2) 
    };
  };

  const prices = calculatePrice(formData.vehicle);

  const generateWhatsApp = () => {
    const fuelNote = `%0A%0ANote: Customers must pay for fuel separately.`;
    
    const text = `Att : Kapila ( Amendment)%0A` +
      `Arrival Transfer%0A` +
      `Name.      : ${formData.name}%0A` +
      `Pax.          : ${formData.passengers}%0A` +
      `Date.        : ${formData.date}%0A` +
      `Time.        : ${formData.time}%0A` +
      `Duration.    : ${formData.days} Day(s)%0A` +
      `Nameboard.   : ${formData.nameboard || 'None'}%0A` +
      `Flight.       : ${formData.flight || 'N/A'}%0A` +
      `Vehicle.    : ${formData.vehicle?.name || 'Any'}%0A` +
      `Price.       : Rs. ${prices.lkr} (approx. €${prices.eur})%0A` +
      `Drop off    : ${formData.destination}%0A` +
      `Contact No : ${formData.phone}${fuelNote}%0A%0A` +
      `*Notes:* ${formData.notes || 'None'}`;
    
    fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, distanceInfo, price: calculatePrice(formData.vehicle), currency })
    }).catch(err => console.error("Email trigger failed:", err));

    if (typeof window !== 'undefined') {
      window.open(`https://wa.me/94768743357?text=${text}`, '_blank');
      setStep(4);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setIsOpen(false)} />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white w-full max-w-4xl rounded-[2rem] overflow-hidden relative z-10 border border-slate-100 shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
      >
        <div className="hidden md:flex md:w-1/3 bg-emerald-950 p-8 flex-col justify-between">
          <div>
            <h2 className="text-3xl font-serif font-black text-white mb-2 tracking-tighter">Book Your Ride</h2>
            <div className="mt-10 space-y-6">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-400"><CheckCircle2 size={20} /></div>
                  <p className="text-sm font-black text-white">Smart Pricing</p>
               </div>
            </div>
          </div>
          <div className="p-4 bg-emerald-900 rounded-2xl border border-emerald-800">
             <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-black mb-1">Driver</p>
             <p className="font-black text-white">N Kapila Silva</p>
          </div>
        </div>

        <div className="flex-1 p-6 md:p-10 overflow-y-auto relative text-slate-900">
          <button className="absolute top-6 right-6 text-slate-300 hover:text-slate-900" onClick={() => setIsOpen(false)}><X size={24} /></button>

          <div className="flex gap-2 mb-10">
            {[1, 2, 3, 4].map(i => <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-emerald-600' : 'bg-slate-100'}`} />)}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-8">
                <h3 className="text-2xl font-black text-emerald-950 tracking-tighter">Trip Essentials</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Pickup</label>
                       <div className="relative"><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input ref={pickupRef} type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 outline-none" value={formData.pickup} onChange={(e) => setFormData({...formData, pickup: e.target.value})} /></div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Destination</label>
                       <div className="relative"><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600" size={18} /><input ref={destRef} type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 outline-none font-bold" value={formData.destination} onChange={(e) => setFormData({...formData, destination: e.target.value})} /></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Trip Duration (Days)</label>
                       <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl p-1">
                          {[1, 2, 3, 4, 5, 7].map(d => <button key={d} onClick={() => setFormData({...formData, days: d})} className={`flex-1 py-2 text-xs font-black rounded-lg ${formData.days === d ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-100'}`}>{d}</button>)}
                       </div>
                       <p className="text-[9px] text-emerald-600 font-black uppercase">{formData.days > 1 ? `Multi-Day: €40 x ${formData.days} Days` : 'Standard Rates Apply'}</p>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Passengers</label>
                       <select className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 outline-none" value={formData.passengers} onChange={(e) => setFormData({...formData, passengers: parseInt(e.target.value)})}>
                          {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} Pax</option>)}
                       </select>
                    </div>
                  </div>
                </div>
                <button onClick={() => setStep(2)} disabled={!formData.destination} className="w-full py-4 bg-emerald-950 text-white font-black rounded-full shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 text-xs uppercase tracking-widest">Choose Vehicle <ChevronRight size={18} /></button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                <div className="flex justify-between items-center mb-8">
                   <h3 className="text-2xl font-black text-emerald-950 tracking-tighter">Select Vehicle</h3>
                   <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                     {['LKR', 'USD', 'EUR'].map(curr => <button key={curr} onClick={() => setCurrency(curr)} className={`px-3 py-1.5 text-[10px] font-black rounded-lg tracking-widest ${currency === curr ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400'}`}>{curr}</button>)}
                   </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vehicles.map((v) => (
                    <div key={v.id} onClick={() => { setFormData({ ...formData, vehicle: v }); setStep(3); }} className="p-4 rounded-2xl border-2 transition-all cursor-pointer bg-white border-slate-100 hover:border-emerald-200 flex flex-col h-full">
                      <div className="h-40 w-full rounded-xl overflow-hidden mb-4 relative bg-slate-50 flex items-center justify-center p-4">
                        <img src={v.image} alt={v.name} className="max-h-full max-w-full object-contain" />
                        <div className="absolute top-2 right-2 bg-emerald-600 px-3 py-1.5 rounded-lg text-[10px] font-black text-white shadow-lg">From {currencySymbols[currency]} {calculatePrice(v)}</div>
                      </div>
                      <h4 className="font-black text-emerald-950 text-sm mb-1">{v.name}</h4>
                      <p className="text-[11px] text-slate-400 font-medium">{v.description}</p>
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep(1)} className="mt-8 text-slate-400 text-xs font-black uppercase tracking-widest flex items-center gap-2"><ChevronLeft size={16} /> Back</button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                <h3 className="text-2xl font-black text-emerald-950 tracking-tighter">Complete Details</h3>
                <div className="w-full h-48 rounded-3xl bg-slate-100 overflow-hidden border border-slate-200 relative">
                   <div ref={mapRef} className="w-full h-full" />
                   {isCalculating && <div className="absolute inset-0 flex items-center justify-center bg-white/40"><Loader2 className="animate-spin text-emerald-600" size={24} /></div>}
                </div>

                {/* Trip Summary Preview */}
                <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-3xl space-y-4">
                  <div className="flex justify-between items-start border-b border-emerald-100 pb-4">
                    <div>
                      <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">Selected Vehicle</p>
                      <p className="font-black text-emerald-950">{formData.vehicle?.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-emerald-600 font-black uppercase tracking-[0.2em] mb-2">Total Payable</p>
                      <div className="flex flex-col items-end gap-1">
                        <p className="text-3xl font-black text-emerald-950 leading-none mb-4">Rs {prices.lkr.toLocaleString()}</p>
                        <div className="flex gap-2">
                           <div className="bg-white border border-slate-100 rounded-xl px-4 py-2 text-center shadow-sm">
                              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">USD Estimate</p>
                              <p className="text-sm font-black text-emerald-950">$ {prices.usd}</p>
                           </div>
                           <div className="bg-white border border-slate-100 rounded-xl px-4 py-2 text-center shadow-sm">
                              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">EUR Estimate</p>
                              <p className="text-sm font-black text-emerald-950">€ {prices.eur}</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 text-xs">
                    <div>
                       <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Route</p>
                       <p className="text-emerald-950 font-bold leading-tight">{formData.pickup.split(',')[0]} → {formData.destination.split(',')[0]}</p>
                    </div>
                    <div>
                       <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Duration</p>
                       <p className="text-emerald-950 font-bold">{formData.days} Day(s)</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input type="date" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                  <input type="time" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} />
                  <input type="text" placeholder="Flight No." className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4" value={formData.flight} onChange={(e) => setFormData({...formData, flight: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Your Name" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  <input type="email" placeholder="Email" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  <input type="tel" placeholder="WhatsApp Number" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  <input type="text" placeholder="Nameboard Text" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4" value={formData.nameboard} onChange={(e) => setFormData({...formData, nameboard: e.target.value})} />
                </div>
                <button onClick={generateWhatsApp} disabled={!formData.name || !formData.phone || !formData.email} className="w-full py-4 bg-[#25D366] text-white font-black rounded-full shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 text-xs uppercase tracking-widest"><Send size={18} /> Confirm on WhatsApp</button>
                <button onClick={() => setStep(2)} className="text-slate-400 text-xs font-black uppercase tracking-widest flex items-center gap-2"><ChevronLeft size={16} /> Back</button>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-10">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={40} /></div>
                <h3 className="text-3xl font-black text-emerald-950 tracking-tighter mb-4">Booking Confirmed!</h3>
                <p className="text-slate-500 mb-10 font-medium">Your request has been sent. A confirmation email has also been sent to {formData.email}.</p>
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 max-w-md mx-auto text-left relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-600" />
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Receipt No. KT-{Math.floor(Math.random() * 10000)}</p>
                   <div className="space-y-3">
                      <div className="flex justify-between"><span className="text-slate-400 text-xs font-bold uppercase">Vehicle</span><span className="text-emerald-950 font-black text-xs">{formData.vehicle?.name}</span></div>
                      <div className="flex justify-between border-t pt-3"><span className="text-slate-950 font-black text-sm">Total</span><span className="text-emerald-600 font-black text-lg">Rs. {prices.lkr.toLocaleString()} (USD: ${prices.usd} / EUR: €{prices.eur})</span></div>
                   </div>
                   <div className="mt-4 p-3 bg-orange-50 border border-orange-100 rounded-xl">
                      <p className="text-[10px] text-orange-800 font-bold uppercase tracking-tighter">Note: Fuel must be paid by the customer.</p>
                   </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="mt-10 text-emerald-600 font-black text-xs uppercase tracking-widest">Close</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingModal;
