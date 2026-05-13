import { Suspense } from 'react';
import { Inter, Playfair_Display, Caveat } from 'next/font/google';
import BookingModal from '@/components/BookingModal';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
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
    default: 'Kapee Tours | Best Travel Agency in Seeduwa, Ja-Ela & Negombo',
    template: '%s | Kapee Tours Sri Lanka'
  },
  description: 'Premium travel agency specializing in airport transfers and custom tours near Seeduwa, Ja-Ela, and Negombo. Experience Sri Lanka with Kapee Tours - reliable, professional, and on-time.',
  keywords: [
    'Kapee Tours', 'Kapee Travels', 'Tour near Seeduwa', 'Seeduwa tours', 'Ja-Ela tours', 'Negombo tours',
    'Airport Taxi Seeduwa', 'Airport Transfer Ja-Ela', 'Negombo airport taxi', 'Best travel agency Seeduwa',
    'Airport Taxi', 'Taxi Service', 'Airport Transfer', 'Tourism Support', 'Ride With Us', 
    'Travel Easy', 'Book Now', 'On Time Every Time', 'Explore With Us', 'Safe Travel',
    'Your Ride Is Here', 'Hassle Free Travel', 'Best Taxi Service', 'Trusted By Thousands',
    'Customer First', 'Travel In Comfort', 'Local Tours', 'City Tours', 'Tour With Us',
    'Discover More', 'To The Airport', 'From The Airport', 'Airport Pickup', 'Airport Drop Off',
    'Flight Transfer', 'Ride To Airport', 'Never Miss A Flight', 'Reliable Taxi', 'Travel Made Easy',
    'Taxi Near Me', '24x7 Taxi', 'Kapila Tours Seeduwa', 'Sri Lanka Taxi',
    'kapila tours', 
    'airport taxi sri lanka', 
    'travel agency seeduwa', 
    'custom tours sri lanka', 
    'premium travel sri lanka', 
    'N Kapila Silva tours'
  ],
  authors: [{ name: 'N Kapila Silva' }],
  creator: 'Kapee Tours',
  metadataBase: new URL('https://kapitravels.lk'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Kapee Tours | Premium Sri Lanka Travel & Airport Transfers',
    description: 'Bespoke tours and reliable airport transfers near Seeduwa, Ja-Ela, and Negombo. Explore Sri Lanka in comfort and style.',
    url: 'https://kapitravels.lk',
    siteName: 'Kapee Tours',
    images: [
      {
        url: '/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Kapee Tours - Premium Sri Lanka Travel',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kapee Tours | Premium Sri Lanka Travel',
    description: 'Explore Sri Lanka in comfort and style with bespoke tours and reliable airport transfers near Seeduwa.',
    images: ['/hero.jpg'],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TravelAgency',
              'name': 'Kapee Tours',
              'alternateName': 'Kapee Travels',
              'description': 'Premium travel agency in Sri Lanka specializing in airport transfers and custom tours near Seeduwa, Ja-Ela, and Negombo.',
              'url': 'https://kapitravels.lk',
              'logo': 'https://kapitravels.lk/logo.png',
              'image': 'https://kapitravels.lk/hero.jpg',
              'address': {
                '@type': 'PostalAddress',
                'addressLocality': 'Seeduwa',
                'addressRegion': 'Western Province',
                'addressCountry': 'LK'
              },
              'geo': {
                '@type': 'GeoCoordinates',
                'latitude': '7.1234', // Approximate for Seeduwa
                'longitude': '79.8890'
              },
              'telephone': '+94770000000', // Update with real phone if known
              'priceRange': '$$',
              'areaServed': ['Seeduwa', 'Ja-Ela', 'Negombo', 'Colombo', 'Bandaranaike International Airport'],
              'hasOfferCatalog': {
                '@type': 'OfferCatalog',
                'name': 'Travel Services',
                'itemListElement': [
                  {
                    '@type': 'Offer',
                    'itemOffered': {
                      '@type': 'Service',
                      'name': 'Airport Transfers'
                    }
                  },
                  {
                    '@type': 'Offer',
                    'itemOffered': {
                      '@type': 'Service',
                      'name': 'Custom Island-wide Tours'
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className="font-sans antialiased text-white selection:bg-gold/30" suppressHydrationWarning>
        <Suspense fallback={<div className="h-screen bg-primary flex items-center justify-center text-gold font-serif text-2xl">Loading...</div>}>
          {children}
          <BookingModal />
          <FloatingWhatsApp />
        </Suspense>
      </body>
    </html>
  );
}
