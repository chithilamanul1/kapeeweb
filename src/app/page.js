import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CampaignBanner from '@/components/CampaignBanner';
import Services from '@/components/Services';
import Destinations from '@/components/Destinations';
import WhyChooseUs from '@/components/WhyChooseUs';
import Gallery from '@/components/Gallery';
import AboutSection from '@/components/AboutSection';
import SustainabilitySection from '@/components/SustainabilitySection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <CampaignBanner />
      <Services />
      <AboutSection />
      <SustainabilitySection />
      <Destinations />
      <WhyChooseUs />
      <Gallery />
      <Footer />
    </main>
  );
}
