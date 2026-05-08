import { Suspense } from 'react';
import { Inter, Playfair_Display, Caveat } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Kapi Travels and Tours | Explore Sri Lanka in Comfort & Style',
    template: '%s | Kapi Travels'
  },
  description: 'Premium travel agency in Sri Lanka. Airport transfers, custom tours, and corporate travel with N Kapila Silva. Experience Sri Lanka like never before.',
  keywords: [
    'Airport Taxi', 'Taxi Service', 'Airport Transfer', 'Tourism Support', 'Ride With Us', 
    'Travel Easy', 'Book Now', 'On Time Every Time', 'Explore With Us', 'Safe Travel',
    'Your Ride Is Here', 'Hassle Free Travel', 'Best Taxi Service', 'Trusted By Thousands',
    'Customer First', 'Travel In Comfort', 'Local Tours', 'City Tours', 'Tour With Us',
    'Discover More', 'To The Airport', 'From The Airport', 'Airport Pickup', 'Airport Drop Off',
    'Flight Transfer', 'Ride To Airport', 'Never Miss A Flight', 'Reliable Taxi', 'Travel Made Easy',
    'Taxi Near Me', '24x7 Taxi', 'Kapee Tours', 'Kapila Tours Seeduwa', 'Sri Lanka Taxi',
    'kapee tours', 
    'kapila tours', 
    'tours seeduwa', 
    'seeduwa tours', 
    'airport taxi sri lanka', 
    'travel agency seeduwa', 
    'custom tours sri lanka', 
    'luxury travel sri lanka', 
    'Kapee travels', 
    'N Kapila Silva tours'
  ],
  authors: [{ name: 'N Kapila Silva' }],
  creator: 'Kapi Travels',
  metadataBase: new URL('https://kapeeweb.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Kapi Travels and Tours | Premium Sri Lanka Travel',
    description: 'Explore Sri Lanka in comfort and style with bespoke tours and reliable airport transfers.',
    url: 'https://kapitravels.lk',
    siteName: 'Kapi Travels and Tours',
    images: [
      {
        url: '/hero-bg.png',
        width: 1200,
        height: 630,
        alt: 'Sri Lanka Landscape - Kapi Travels',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kapi Travels and Tours | Premium Sri Lanka Travel',
    description: 'Explore Sri Lanka in comfort and style with bespoke tours and reliable airport transfers.',
    images: ['/hero-bg.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  themeColor: '#0A192F',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${caveat.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased text-white selection:bg-gold/30" suppressHydrationWarning>
        <Suspense fallback={<div className="h-screen bg-primary flex items-center justify-center text-gold font-serif text-2xl">Loading...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
