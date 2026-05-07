import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Kapi Travels and Tours',
  description: 'Learn how Kapi Travels and Tours handles your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white text-slate-900 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-emerald-600 font-black uppercase text-[10px] tracking-widest mb-12 hover:gap-4 transition-all">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <h1 className="text-4xl md:text-6xl font-serif font-black text-emerald-950 mb-10 tracking-tighter">Privacy Policy</h1>
        
        <div className="space-y-8 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-black text-emerald-900 uppercase tracking-widest mb-4">1. Introduction</h2>
            <p>Welcome to Kapi Travels and Tours. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy or our practices with regards to your personal information, please contact us.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-emerald-900 uppercase tracking-widest mb-4">2. Information We Collect</h2>
            <p>We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.</p>
            <p className="mt-4">The personal information that we collect depends on the context of your interactions with us and the website, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Name and Contact Data (Phone number, Email address)</li>
              <li>Trip Details (Pickup location, Destination, Date and Time)</li>
              <li>Flight Information (for Airport Transfers)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-emerald-900 uppercase tracking-widest mb-4">3. How We Use Your Information</h2>
            <p>We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>To facilitate account creation and logon process.</li>
              <li>To send administrative information to you.</li>
              <li>To fulfill and manage your bookings.</li>
              <li>To communicate with you via WhatsApp or Phone regarding your travel.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-emerald-900 uppercase tracking-widest mb-4">4. Will Your Information Be Shared With Anyone?</h2>
            <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-emerald-900 uppercase tracking-widest mb-4">5. Contact Us</h2>
            <p>If you have questions or comments about this policy, you may contact us by email at info@kapitravels.lk or by phone at +94 76 874 3357.</p>
          </section>
        </div>
        
        <div className="mt-20 pt-10 border-t border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Last updated: May 7, 2026
        </div>
      </div>
    </main>
  );
}
