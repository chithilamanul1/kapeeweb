import { Suspense } from 'react';
import { Inter, Playfair_Display } from 'next/font/google';
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

export const metadata = {
  title: 'Kapi Travels and Tours | Explore Sri Lanka in Comfort & Style',
  description: 'Premium travel agency in Sri Lanka. Airport transfers, custom tours, and corporate travel with N Kapila Silva. Experience Sri Lanka like never before.',
  keywords: 'travel agency sri lanka, airport taxi sri lanka, custom tours sri lanka, luxury travel sri lanka, Kapee travels',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased text-white selection:bg-gold/30" suppressHydrationWarning>
        <Suspense fallback={<div className="h-screen bg-primary flex items-center justify-center">Loading...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
