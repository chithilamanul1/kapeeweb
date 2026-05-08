'use client';

export default function DestinationBookingButton({ destinationName }) {
  return (
    <button 
      onClick={() => window.dispatchEvent(new CustomEvent('openBooking', { detail: { destination: destinationName } }))}
      className="w-full py-5 bg-emerald-600 text-white font-black rounded-full text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all transform hover:scale-105"
    >
      Start Booking Now
    </button>
  );
}
