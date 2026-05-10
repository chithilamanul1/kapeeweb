'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Save, Plus, Trash2, RefreshCw, Car, Lock, ShieldCheck, Fuel, Globe } from 'lucide-react';
import Image from 'next/image';

export default function AdminPricing() {
  const [pricing, setPricing] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('sedanRateSheet');

  useEffect(() => {
    fetch('/api/pricing')
      .then(res => res.json())
      .then(data => setPricing(data));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'kapee123') {
      setIsAuthorized(true);
      setError('');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  const savePricing = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pricing)
      });
      if (res.ok) {
        setMessage('Pricing updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Failed to save changes.');
    }
    setIsSaving(false);
  };

  const updateRate = (sheet, index, field, value) => {
    const newSheet = [...pricing[sheet]];
    newSheet[index][field] = field === 'type' ? value : parseFloat(value);
    setPricing({ ...pricing, [sheet]: newSheet });
  };

  const addRow = (sheet) => {
    const lastRow = pricing[sheet][pricing[sheet].length - 1];
    const newRow = { 
      min: lastRow ? lastRow.max : 0, 
      max: lastRow ? lastRow.max + 50 : 50, 
      type: 'perKm', 
      rate: 0 
    };
    setPricing({ ...pricing, [sheet]: [...pricing[sheet], newRow] });
  };

  const removeRow = (sheet, index) => {
    const newSheet = pricing[sheet].filter((_, i) => i !== index);
    setPricing({ ...pricing, [sheet]: newSheet });
  };

  if (!isAuthorized) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100">
             <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 mx-auto">
                <Lock className="text-emerald-600" size={32} />
             </div>
             <h1 className="text-2xl font-black text-emerald-950 text-center mb-2 uppercase tracking-tight">Admin Access</h1>
             <p className="text-slate-500 text-center text-sm mb-8 font-medium">Please enter the security password to manage pricing.</p>
             
             <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black ml-4">Password</label>
                   <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 outline-none focus:border-emerald-500 transition-all font-black text-slate-900"
                    placeholder="••••••••"
                   />
                </div>
                {error && <p className="text-red-500 text-[10px] font-black uppercase text-center">{error}</p>}
                <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-3">
                   <ShieldCheck size={18} /> Authenticate
                </button>
             </form>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!pricing) return <div className="h-screen flex items-center justify-center bg-slate-50"><RefreshCw className="animate-spin text-emerald-600" size={40} /></div>;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <div className="container mx-auto px-4 md:px-6 py-24 md:py-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-6">
          <div>
             <h1 className="text-3xl md:text-4xl font-black text-emerald-950 tracking-tighter uppercase">Rate Management</h1>
             <p className="text-slate-500 font-medium text-sm md:text-base">Adjust distance-based LKR rates and global configuration.</p>
          </div>
          <button 
            onClick={savePricing}
            disabled={isSaving}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl disabled:opacity-50 sticky top-24 z-30 md:static"
          >
            {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
            {isSaving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>

        {message && (
          <div className="mb-8 p-4 bg-emerald-100 text-emerald-700 rounded-2xl font-bold text-center border border-emerald-200">
            {message}
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex bg-white p-1 rounded-2xl border border-slate-100 mb-8 max-w-md">
           <button 
             onClick={() => setActiveTab('sedanRateSheet')}
             className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'sedanRateSheet' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
           >
             Sedan Rates
           </button>
           <button 
             onClick={() => setActiveTab('vanRateSheet')}
             className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'vanRateSheet' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
           >
             Van Rates
           </button>
        </div>

        <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden mb-8 md:mb-12">
          <div className="p-6 md:p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between bg-slate-50/50 gap-4">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                   <Car className="text-emerald-600" size={20} />
                </div>
                <div>
                   <h2 className="font-black text-emerald-950 uppercase tracking-tight text-sm md:text-base">
                     {activeTab === 'sedanRateSheet' ? 'Sedan' : 'Van'} Rate Sheet (LKR)
                   </h2>
                   <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest">Distance-based pricing matrix</p>
                </div>
             </div>
             <button 
               onClick={() => addRow(activeTab)}
               className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-50 text-emerald-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-100 transition-all"
             >
               <Plus size={14} /> Add Row
             </button>
          </div>
          
          <div className="overflow-x-auto">
            <div className="min-w-[700px] p-6 md:p-8">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black border-b border-slate-50">
                    <th className="pb-4">Min (KM)</th>
                    <th className="pb-4">Max (KM)</th>
                    <th className="pb-4">Type</th>
                    <th className="pb-4">Rate (LKR)</th>
                    <th className="pb-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {pricing[activeTab].map((range, idx) => (
                    <tr key={idx} className="group hover:bg-slate-50/50 transition-all">
                      <td className="py-4">
                        <input 
                          type="number" 
                          value={range.min} 
                          onChange={(e) => updateRate(activeTab, idx, 'min', e.target.value)}
                          className="w-20 md:w-24 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-xs font-bold outline-none text-slate-900"
                        />
                      </td>
                      <td className="py-4">
                        <input 
                          type="number" 
                          value={range.max} 
                          onChange={(e) => updateRate(activeTab, idx, 'max', e.target.value)}
                          className="w-20 md:w-24 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-xs font-bold outline-none text-slate-900"
                        />
                      </td>
                      <td className="py-4 text-xs font-black">
                        <select 
                          value={range.type} 
                          onChange={(e) => updateRate(activeTab, idx, 'type', e.target.value)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-widest outline-none border-none ${range.type === 'flat' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}
                        >
                          <option value="flat">Flat Rate</option>
                          <option value="perKm">Per KM</option>
                        </select>
                      </td>
                      <td className="py-4">
                         <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-slate-400">LKR</span>
                            <input 
                              type="number" 
                              value={range.rate} 
                              onChange={(e) => updateRate(activeTab, idx, 'rate', e.target.value)}
                              className="w-24 md:w-32 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-xs font-black outline-none text-slate-900"
                            />
                            <span className="text-[10px] font-bold text-slate-400">{range.type === 'perKm' ? '/KM' : ''}</span>
                         </div>
                      </td>
                      <td className="py-4 text-center">
                        <button 
                          onClick={() => removeRow(activeTab, idx)}
                          className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
           <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                 <Globe className="text-emerald-600" size={18} />
                 <h3 className="font-black text-emerald-950 uppercase tracking-tight text-sm md:text-base">Exchange Rates</h3>
              </div>
              <div className="space-y-3 md:space-y-4">
                 {Object.entries(pricing.exchangeRates).map(([curr, rate]) => (
                   <div key={curr} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                      <span className="font-black text-[10px] md:text-xs uppercase tracking-widest text-slate-500">{curr} (vs EUR)</span>
                      <input 
                        type="number" 
                        step="0.01"
                        value={rate} 
                        onChange={(e) => setPricing({...pricing, exchangeRates: {...pricing.exchangeRates, [curr]: parseFloat(e.target.value)}})}
                        className="w-20 md:w-24 bg-white border border-slate-200 rounded-xl px-3 md:px-4 py-2 text-sm font-black outline-none text-right text-slate-900"
                      />
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                 <RefreshCw className="text-emerald-600" size={18} />
                 <h3 className="font-black text-emerald-950 uppercase tracking-tight text-sm md:text-base">Daily Rates</h3>
              </div>
              <div className="space-y-6">
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                   <p className="font-black text-emerald-950 text-xs mb-1 uppercase tracking-tight">Tour Daily Charge (EUR)</p>
                   <div className="flex items-center gap-3">
                      <span className="text-xl font-black text-emerald-950">€</span>
                      <input 
                        type="number" 
                        value={pricing.tourDailyRate} 
                        onChange={(e) => setPricing({...pricing, tourDailyRate: parseFloat(e.target.value)})}
                        className="w-full bg-white border border-emerald-200 rounded-xl px-4 py-2 text-lg font-black outline-none text-right text-slate-900"
                      />
                   </div>
                </div>
                <p className="text-[10px] text-slate-400 font-medium italic">Applied as: EUR Daily Rate × Vehicle Multiplier × Days</p>
              </div>
           </div>

           <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                 <Fuel className="text-emerald-600" size={18} />
                 <h3 className="font-black text-emerald-950 uppercase tracking-tight text-sm md:text-base">Fuel Config</h3>
              </div>
              <div className="space-y-4">
                 <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black px-1">LKR Per Liter</label>
                    <input 
                      type="number" 
                      value={pricing.fuelConfig.lkrPerLiter} 
                      onChange={(e) => setPricing({...pricing, fuelConfig: {...pricing.fuelConfig, lkrPerLiter: parseFloat(e.target.value)}})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 font-black text-slate-900 outline-none"
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black px-1">Base Efficiency (KM/L)</label>
                    <input 
                      type="number" 
                      value={pricing.fuelConfig.kmPerLiter} 
                      onChange={(e) => setPricing({...pricing, fuelConfig: {...pricing.fuelConfig, kmPerLiter: parseFloat(e.target.value)}})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 font-black text-slate-900 outline-none"
                    />
                 </div>
              </div>
           </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
