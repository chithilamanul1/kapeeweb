import { destinations } from '@/data/destinations';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, ArrowLeft, CheckCircle2, Zap } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import DestinationBookingButton from '@/components/DestinationBookingButton';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const destination = destinations[slug];
  
  if (!destination) return { title: 'Destination Not Found' };

  return {
    title: destination.title,
    description: destination.description,
    openGraph: {
      title: destination.title,
      description: destination.description,
      images: [{ url: destination.heroImage }],
    },
  };
}

export default async function DestinationPage({ params }) {
  const { slug } = await params;
  const destination = destinations[slug];

  if (!destination) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={destination.heroImage} 
            alt={destination.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-emerald-950/60 backdrop-blur-[2px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Link href="/#destinations" className="inline-flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-widest mb-8 hover:text-white transition-colors">
            <ArrowLeft size={16} /> Back to Destinations
          </Link>
          <span className="block text-gold uppercase tracking-[0.4em] text-[10px] font-black mb-4">Discover Sri Lanka</span>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6">
            {destination.name}
          </h1>
          <p className="text-emerald-100/80 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            {destination.description}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-black text-emerald-950 uppercase tracking-tighter mb-8">About {destination.name}</h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-12 font-medium">
                {destination.longDescription}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {destination.highlights.map((item, idx) => (
                  <div key={idx} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Zap size={20} fill="currentColor" />
                    </div>
                    <h4 className="text-xl font-black text-emerald-950 uppercase mb-3">{item.title}</h4>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="sticky top-32 p-10 rounded-[2.5rem] bg-emerald-950 text-white shadow-2xl overflow-hidden relative">
                <div className="relative z-10">
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Book a Transfer</h3>
                  <p className="text-emerald-100/60 text-sm mb-8 font-medium">Safe and reliable travel from BIA Airport directly to {destination.name}.</p>
                  
                  <div className="space-y-4 mb-10">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 size={16} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-emerald-100">Professional Driver</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 size={16} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-emerald-100">Luxury Vehicles</span>
                    </div>
                  </div>

                  <DestinationBookingButton destinationName={destination.name} />
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-800/20 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
