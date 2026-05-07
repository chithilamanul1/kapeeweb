import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Destinations from '@/components/Destinations';
import WhyChooseUs from '@/components/WhyChooseUs';
import Gallery from '@/components/Gallery';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <AboutSection />
      <Destinations />
      <WhyChooseUs />
      <Gallery />
      <Footer />
      
      {/* Interactive Elements */}
      <BookingModal />
      <FloatingWhatsApp />
    </main>
  );
}
