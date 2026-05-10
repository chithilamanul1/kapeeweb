'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Users, Briefcase, MapPin, Calendar, Clock, Send, CheckCircle2, PlaneTakeoff, Loader2, Zap, Map as MapIcon, Plus } from 'lucide-react';
import pricingData from '@/data/pricing.json';

const vehicles = [
  { 
    id: 'sedan', 
    name: 'Sedan', 
    passengers: 3, 
    luggage: 3, 
    ratePerKm: 0, 
    minRate: 40,
    multiplier: 1,
    image: '/vehicles/sedancar.png',
    description: 'Perfect for couples or small families.',
    kmPerLiter: 8
  },
  { 
    id: 'van', 
    name: 'Van', 
    passengers: 8, 
    luggage: 8, 
    ratePerKm: 0, 
    minRate: 56,
    multiplier: 1.4,
    image: '/vehicles/toyota-highroof.png',
    description: 'Comfortable group travel with ample luggage space.',
    kmPerLiter: 6
  }
];

const FIXED_RATES = [];

const BookingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [pricing] = useState(pricingData);
  const [currency, setCurrency] = useState('LKR');
  const [isCalculating, setIsCalculating] = useState(false);
  const [distanceInfo, setDistanceInfo] = useState({ km: 0, text: '' });
  
  const [formData, setFormData] = useState({
    vehicle: null,
    tripType: 'airport',
    pickup: 'Bandaranaike International Airport (BIA)',
    destination: '',
    stops: [], // Up to 4 stops
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
      if (e.detail) {
        if (e.detail.type) {
          setFormData(prev => ({ 
            ...prev, 
            tripType: e.detail.type,
            pickup: e.detail.type === 'airport' ? 'Bandaranaike International Airport (BIA)' : '',
            destination: e.detail.destination || prev.destination
          }));
        } else if (e.detail.destination) {
          setFormData(prev => ({ ...prev, destination: e.detail.destination }));
        }
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

  // Initialize Autocomplete for all fields
  const initAutocomplete = useCallback((node, field, index = null) => {
    if (!googleLoaded || !node || node.dataset.googleAutocomplete) return;

    const options = {
      componentRestrictions: { country: "lk" },
      fields: ["address_components", "geometry", "icon", "name", "formatted_address"],
      strictBounds: false,
    };

    const autocomplete = new window.google.maps.places.Autocomplete(node, options);
    node.dataset.googleAutocomplete = 'true';
    
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.formatted_address) return;

      setFormData(prev => {
        if (field === 'pickup') return { ...prev, pickup: place.formatted_address };
        if (field === 'destination') return { ...prev, destination: place.formatted_address };
        if (field === 'stop' && index !== null) {
          const newStops = [...prev.stops];
          newStops[index] = place.formatted_address;
          return { ...prev, stops: newStops };
        }
        return prev;
      });
    });
  }, [googleLoaded]);

  useEffect(() => {
    if (!googleLoaded || !isOpen) return;
    
    // Re-initialize fixed refs if they exist
    if (pickupRef.current) initAutocomplete(pickupRef.current, 'pickup');
    if (destRef.current) initAutocomplete(destRef.current, 'destination');
  }, [googleLoaded, isOpen, step, initAutocomplete]);

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
      
      const waypoints = formData.stops
        .filter(s => s.trim() !== '')
        .map(s => ({ location: s, stopover: true }));

      directionsService.route(
        {
          origin: formData.pickup,
          destination: formData.destination,
          waypoints: waypoints,
          optimizeWaypoints: true,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            if (directionsRenderer) {
                directionsRenderer.setDirections(result);
            }
            const distance = result.routes[0].legs.reduce((acc, leg) => acc + leg.distance.value, 0) / 1000;
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
  }, [formData.pickup, formData.destination, formData.stops, googleLoaded, directionsRenderer]);

  useEffect(() => {
    if (step === 3) calculateDistance();
  }, [step, calculateDistance]);

  const calculatePrice = (vehicle) => {
    if (!vehicle || !pricing) return { lkr: 0, usd: 0, eur: 0, fuel: 0, total: 0 };
    
    let totalLKR = 0;
    let fuelLKR = 0;
    
    const km = distanceInfo.km || 0;
    fuelLKR = (km / (vehicle.kmPerLiter || 8)) * pricing.fuelConfig.lkrPerLiter;

    if (formData.tripType === 'tour' || formData.days > 1) {
      // Tour logic: Base rate * days * vehicle multiplier
      const totalEUR = pricing.tourDailyRate * formData.days * (vehicle.multiplier || 1);
      totalLKR = totalEUR * pricing.exchangeRates.LKR;
    } else {
      // Airport Transfer logic: Use vehicle-specific distance-based rate sheet
      const rateSheet = vehicle.id === 'van' ? pricing.vanRateSheet : pricing.sedanRateSheet;
      const rateConfig = rateSheet.find(r => km >= r.min && km < r.max) || rateSheet[rateSheet.length - 1];
      
      if (rateConfig.type === 'flat') {
        totalLKR = rateConfig.rate;
      } else {
        totalLKR = km * rateConfig.rate;
      }
      // Airport transfers often include fuel in the flat rate sheet provided, 
      // but if the user wants fuel SEPARATE for everything, I'll subtract it or add it.
      // User said: "calculate the fuel charge that they must pay saparately as well"
      // So I will treat totalLKR as the SERVICE FEE and fuelLKR as the fuel.
    }

    const totalPayableLKR = totalLKR + fuelLKR;
    const eur = totalPayableLKR / pricing.exchangeRates.LKR;
    const usd = eur * pricing.exchangeRates.USD;

    return { 
      service: Math.round(totalLKR),
      fuel: Math.round(fuelLKR),
      lkr: Math.round(totalPayableLKR), 
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
                <div className="flex bg-slate-100 p-1 rounded-2xl mb-8 border border-slate-200">
                  <button 
                    onClick={() => setFormData({...formData, tripType: 'airport', pickup: 'Bandaranaike International Airport (BIA)'})} 
                    className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${formData.tripType === 'airport' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    Airport Transfer
                  </button>
                  <button 
                    onClick={() => setFormData({...formData, tripType: 'tour', pickup: ''})} 
                    className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${formData.tripType === 'tour' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    Custom Tour
                  </button>
                </div>

                <h3 className="text-2xl font-black text-emerald-950 tracking-tighter uppercase">
                   {formData.tripType === 'airport' ? 'Airport Transfer' : 'Custom Tour Route'}
                </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Pickup</label>
                       <div className="relative"><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input ref={pickupRef} type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 outline-none font-bold" value={formData.pickup} onChange={(e) => setFormData({...formData, pickup: e.target.value})} placeholder="Where to pick you up?" /></div>
                    </div>

                    {formData.tripType === 'tour' && formData.stops.map((stop, idx) => (
                      <div key={idx} className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Stop {idx + 1}</label>
                        <div className="relative flex gap-2">
                          <div className="relative flex-1">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                             <input 
                              type="text" 
                              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 outline-none text-sm" 
                              ref={(el) => initAutocomplete(el, 'stop', idx)}
                              value={stop} 
                              onChange={(e) => {
                                const newStops = [...formData.stops];
                                newStops[idx] = e.target.value;
                                setFormData({...formData, stops: newStops});
                              }}
                              placeholder="Add a stop..."
                            />
                          </div>
                          <button 
                            onClick={() => {
                              const newStops = formData.stops.filter((_, i) => i !== idx);
                              setFormData({...formData, stops: newStops});
                            }}
                            className="p-3 bg-red-50 text-red-400 rounded-xl hover:bg-red-100 transition-all"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {formData.tripType === 'tour' && formData.stops.length < 4 && (
                      <button 
                        onClick={() => setFormData({...formData, stops: [...formData.stops, '']})}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700 transition-all"
                      >
                        <Plus size={14} strokeWidth={3} /> Add Another Stop
                      </button>
                    )}

                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Final Destination</label>
                       <div className="relative"><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600" size={18} /><input ref={destRef} type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 outline-none font-bold" value={formData.destination} onChange={(e) => setFormData({...formData, destination: e.target.value})} placeholder="Final drop off location" /></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {!(formData.pickup.toLowerCase().includes('airport') || formData.destination.toLowerCase().includes('airport')) && (
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Trip Duration (Days)</label>
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl p-1">
                            {[1, 2, 3, 4, 5, 7].map(d => <button key={d} onClick={() => setFormData({...formData, days: d})} className={`flex-1 py-2 text-xs font-black rounded-lg ${formData.days === d ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-100'}`}>{d}</button>)}
                        </div>
                        <p className="text-[9px] text-emerald-600 font-black uppercase">{formData.days > 1 ? `Multi-Day: €40 x ${formData.days} Days` : 'Standard Rates Apply'}</p>
                      </div>
                    )}
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Passengers</label>
                       <select className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 outline-none font-bold" value={formData.passengers} onChange={(e) => setFormData({...formData, passengers: parseInt(e.target.value)})}>
                          {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} Pax</option>)}
                       </select>
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
                        <Image src={v.image} alt={v.name} fill className="object-contain" />
                        <div className="absolute top-2 right-2 bg-emerald-600 px-3 py-1.5 rounded-lg text-[10px] font-black text-white shadow-lg">From {currencySymbols[currency]} {calculatePrice(v)[currency.toLowerCase()]}</div>
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
                <div className="bg-emerald-50/50 border border-emerald-100 p-6 md:p-8 rounded-[2rem] space-y-8">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-emerald-100 pb-8">
                    <div className="flex items-center gap-6 w-full md:w-auto">
                       <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center p-3 shadow-sm border border-emerald-100/50">
                          <Image src={formData.vehicle?.image} alt={formData.vehicle?.name} fill className="object-contain" />
                       </div>
                       <div>
                          <p className="text-[10px] text-emerald-600 font-black uppercase tracking-[0.2em] mb-1">Selected Vehicle</p>
                          <p className="text-xl font-black text-emerald-950 uppercase tracking-tight">{formData.vehicle?.name}</p>
                       </div>
                    </div>
                    
                    <div className="text-center md:text-right w-full md:w-auto">
                       <p className="text-[10px] text-emerald-600 font-black uppercase tracking-[0.2em] mb-3">Total Payable</p>
                       <p className="text-4xl md:text-5xl font-black text-emerald-950 tracking-tighter leading-none mb-6">Rs {prices.lkr.toLocaleString()}</p>
                       
                       <div className="flex justify-center md:justify-end gap-3 mb-6">
                          <div className="bg-white border border-slate-100 rounded-2xl px-5 py-3 text-center shadow-sm min-w-[100px]">
                             <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">USD Estimate</p>
                             <p className="text-sm font-black text-emerald-950">$ {prices.usd}</p>
                          </div>
                          <div className="bg-white border border-slate-100 rounded-2xl px-5 py-3 text-center shadow-sm min-w-[100px]">
                             <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">EUR Estimate</p>
                             <p className="text-sm font-black text-emerald-950">€ {prices.eur}</p>
                          </div>
                       </div>

                       <div className="space-y-2 border-t border-emerald-100/50 pt-6">
                          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                             <span className="text-slate-400">Service Fee</span>
                             <span className="text-emerald-950">Rs {prices.service.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                             <span className="text-slate-400">Estimated Fuel</span>
                             <span className="text-emerald-600">Rs {prices.fuel.toLocaleString()}</span>
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
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black px-1">Pickup Date</label>
                    <input 
                      type="date" 
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 font-bold text-slate-900" 
                      min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                      value={formData.date} 
                      onChange={(e) => setFormData({...formData, date: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black px-1">Pickup Time</label>
                    <input 
                      type="time" 
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 font-bold text-slate-900" 
                      value={formData.time} 
                      onChange={(e) => setFormData({...formData, time: e.target.value})} 
                    />
                  </div>
                  {formData.tripType === 'airport' && (
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black px-1">Flight Number</label>
                      <input 
                        type="text" 
                        placeholder="UL 101" 
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 font-bold text-slate-900" 
                        value={formData.flight} 
                        onChange={(e) => setFormData({...formData, flight: e.target.value})} 
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black px-1">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter full name" 
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 font-bold text-slate-900" 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black px-1">WhatsApp Number</label>
                      <input 
                        type="tel" 
                        placeholder="+94 7X XXX XXXX" 
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 font-bold text-slate-900" 
                        value={formData.phone} 
                        onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black px-1">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="email@example.com" 
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 font-bold text-slate-900" 
                        value={formData.email} 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                      />
                    </div>
                  </div>
                  {formData.tripType === 'airport' && (
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black px-1">Nameboard Text</label>
                      <input 
                        type="text" 
                        placeholder="Text for the airport sign" 
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 font-bold text-slate-900" 
                        value={formData.nameboard} 
                        onChange={(e) => setFormData({...formData, nameboard: e.target.value})} 
                      />
                    </div>
                  )}
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
