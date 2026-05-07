import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | Kapi Travels and Tours',
  description: 'Terms and conditions for using Kapi Travels and Tours services.',
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-white text-slate-900 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-emerald-600 font-black uppercase text-[10px] tracking-widest mb-12 hover:gap-4 transition-all">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <h1 className="text-4xl md:text-6xl font-serif font-black text-emerald-950 mb-10 tracking-tighter">Terms of Service</h1>
        
        <div className="space-y-8 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-black text-emerald-900 uppercase tracking-widest mb-4">1. Agreement to Terms</h2>
            <p>By accessing our website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you are prohibited from using our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-emerald-900 uppercase tracking-widest mb-4">2. Booking and Payments</h2>
            <p>All bookings made through our platform are subject to availability. Prices quoted on the website are base rates and may be subject to change based on specific requirements.</p>
            <p className="mt-4 font-black text-orange-600 uppercase tracking-tighter">* IMPORTANT: Fuel costs are to be paid by the customer separately unless explicitly stated otherwise in writing.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-emerald-900 uppercase tracking-widest mb-4">3. Cancellations and Refunds</h2>
            <p>Cancellations made 24 hours prior to the scheduled pickup time are eligible for a full refund if any advance payment was made. Cancellations made within 24 hours may be subject to a cancellation fee.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-emerald-900 uppercase tracking-widest mb-4">4. Passenger Responsibility</h2>
            <p>Passengers are responsible for providing accurate flight information for airport transfers. We are not liable for missed transfers due to incorrect flight details provided by the customer.</p>
            <p className="mt-4">Passengers must adhere to local laws and safety regulations during the journey. We reserve the right to refuse service to anyone displaying inappropriate or illegal behavior.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-emerald-900 uppercase tracking-widest mb-4">5. Limitation of Liability</h2>
            <p>Kapi Travels and Tours shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-emerald-900 uppercase tracking-widest mb-4">6. Governing Law</h2>
            <p>These terms shall be governed by and defined following the laws of Sri Lanka. Kapi Travels and Tours and yourself irrevocably consent that the courts of Sri Lanka shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.</p>
          </section>
        </div>
        
        <div className="mt-20 pt-10 border-t border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Last updated: May 7, 2026
        </div>
      </div>
    </main>
  );
}
