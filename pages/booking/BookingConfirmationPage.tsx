import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { CheckCircle2, Calendar, MapPin, Share2, CalendarPlus, Car, ArrowRight, LayoutDashboard } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

const BookingConfirmationPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const location = useLocation();
  // Fallback data if accessed directly
  const { pickup, dropoff, date, time, vehicle, price } = location.state || {
      pickup: '123 Peachtree St NE',
      dropoff: 'ATL Airport - Terminal N',
      date: '2023-11-20',
      time: '14:00',
      vehicle: { name: 'Mercedes-Benz S-Class', image: '' },
      price: 145
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        
        {/* Success Header */}
        <div className="text-center mb-10 animate-in slide-in-from-bottom-4 duration-700">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-lux-dark mb-4">
            Booking Confirmed
          </h1>
          <p className="text-xl text-lux-darkSec">
            Your chauffeur has been notified.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/50 border border-lux-gold/30">
              <span className="text-sm font-bold text-lux-darkSec uppercase tracking-wider">Confirmation #</span>
              <span className="text-xl font-bold text-lux-dark font-mono">{bookingId}</span>
          </div>
        </div>

        <GlassCard className="p-0 overflow-hidden mb-8 border-lux-gold/20 shadow-lux-gold/5">
            {/* Map Placeholder Header */}
            <div className="h-40 bg-lux-dark/10 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'radial-gradient(#6B5E55 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-4">
                        <MapPin className="text-lux-gold animate-bounce" />
                        <div className="h-0.5 w-20 bg-lux-gold/50 rounded-full"></div>
                        <MapPin className="text-lux-dark" />
                    </div>
                </div>
            </div>

            <div className="p-8 md:p-10">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-6">
                        <div>
                             <p className="text-xs font-bold text-lux-darkSec uppercase mb-1">Pickup</p>
                             <p className="font-bold text-lux-dark text-lg">{pickup}</p>
                             <p className="text-sm text-lux-darkSec flex items-center gap-2 mt-1">
                                 <Calendar size={14} /> {date} at {time}
                             </p>
                        </div>
                        <div>
                             <p className="text-xs font-bold text-lux-darkSec uppercase mb-1">Dropoff</p>
                             <p className="font-bold text-lux-dark text-lg">{dropoff}</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                         <div>
                             <p className="text-xs font-bold text-lux-darkSec uppercase mb-1">Vehicle</p>
                             <div className="flex items-center gap-3">
                                 <Car size={20} className="text-lux-gold" />
                                 <p className="font-bold text-lux-dark text-lg">{vehicle.name}</p>
                             </div>
                        </div>
                        <div>
                             <p className="text-xs font-bold text-lux-darkSec uppercase mb-1">Chauffeur</p>
                             <div className="flex items-center gap-3 p-3 rounded-xl bg-lux-primary/5 border border-lux-primary/10">
                                 <div className="w-10 h-10 rounded-full bg-lux-dark/10 flex items-center justify-center">
                                     <span className="font-serif font-bold text-lux-dark">?</span>
                                 </div>
                                 <div>
                                     <p className="text-sm font-bold text-lux-dark">Assigning...</p>
                                     <p className="text-xs text-lux-darkSec">Details sent 30m before pickup</p>
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-lux-darkSec/10">
                    <GradientButton to="/member/dashboard" className="flex-1">
                        Track Live Status
                    </GradientButton>
                    <div className="flex gap-2">
                        <button className="flex-1 px-4 py-3 rounded-full border border-lux-darkSec/20 hover:bg-white/50 transition-colors flex items-center justify-center gap-2 text-lux-dark font-bold text-sm">
                            <CalendarPlus size={18} />
                            Add to Calendar
                        </button>
                        <button className="px-4 py-3 rounded-full border border-lux-darkSec/20 hover:bg-white/50 transition-colors text-lux-dark">
                            <Share2 size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </GlassCard>

        <div className="text-center">
            <Link to="/member/dashboard" className="text-lux-darkSec hover:text-lux-gold font-bold text-sm flex items-center justify-center gap-2">
                <LayoutDashboard size={16} />
                Return to Dashboard
            </Link>
        </div>

      </div>
    </div>
  );
};

export default BookingConfirmationPage;