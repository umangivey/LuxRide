import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Car, Users, Briefcase, CheckCircle2, ArrowLeft, Star, MessageSquare } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

interface Vehicle {
    id: string;
    name: string;
    type: string;
    capacity: number;
    luggage: number;
    price: number;
    features: string[];
    image: string;
}

const BookingStep5: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { journeyType, pickup, dropoff, date, time, isSurge } = location.state || { 
      journeyType: 'point-to-point', 
      pickup: 'Unknown', 
      dropoff: 'Unknown',
      date: 'Unknown',
      time: 'Unknown',
      isSurge: false
  };

  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [specialRequests, setSpecialRequests] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  // Mock Vehicles
  const vehicles: Vehicle[] = [
    {
        id: 'sedan',
        name: 'Mercedes-Benz S-Class',
        type: 'Executive Sedan',
        capacity: 3,
        luggage: 3,
        price: isSurge ? 185 : 145,
        features: ['Wi-Fi', 'Massage Seats', 'Water'],
        image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 'suv',
        name: 'Cadillac Escalade ESV',
        type: 'Luxury SUV',
        capacity: 6,
        luggage: 6,
        price: isSurge ? 245 : 195,
        features: ['Rear Entertainment', 'Extra Legroom', 'Privacy Glass'],
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 'first',
        name: 'Rolls-Royce Ghost',
        type: 'First Class',
        capacity: 3,
        luggage: 3,
        price: isSurge ? 550 : 450,
        features: ['Starlight Headliner', 'Champagne Service', 'Top Chauffeur'],
        image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&q=80&w=400'
    }
  ];

  const handleBook = () => {
      setIsBooking(true);
      // Simulate API call
      setTimeout(() => {
          const bookingId = 'LR-' + Math.floor(Math.random() * 1000000);
          navigate(`/booking/${bookingId}/confirmation`, {
              state: {
                  bookingId,
                  pickup,
                  dropoff,
                  date,
                  time,
                  vehicle: vehicles.find(v => v.id === selectedVehicle),
                  price: vehicles.find(v => v.id === selectedVehicle)?.price
              }
          });
      }, 2000);
  };

  const selectedVehicleDetails = vehicles.find(v => v.id === selectedVehicle);

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
           <h1 className="text-3xl md:text-4xl font-serif font-bold text-lux-dark">
            Select Vehicle
          </h1>
          <span className="text-sm font-bold text-lux-gold uppercase tracking-widest">Step 5 of 5</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div className="bg-lux-gold h-1.5 rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        
        {/* Vehicles Column */}
        <div className="lg:col-span-2 space-y-6">
            {vehicles.map((v) => (
                <div 
                    key={v.id} 
                    onClick={() => setSelectedVehicle(v.id)}
                    className="cursor-pointer group"
                >
                    <GlassCard 
                        className={`
                            p-0 overflow-hidden transition-all duration-300
                            ${selectedVehicle === v.id ? 'ring-2 ring-lux-gold border-lux-gold/50' : 'hover:border-lux-gold/30'}
                        `}
                    >
                        <div className="flex flex-col sm:flex-row">
                            <div className="w-full sm:w-1/3 h-48 sm:h-auto relative bg-lux-dark">
                                <img src={v.image} alt={v.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <p className="text-xs font-bold uppercase opacity-80">{v.type}</p>
                                </div>
                            </div>
                            <div className="flex-1 p-6 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-serif font-bold text-lux-dark">{v.name}</h3>
                                        <p className="text-xl font-bold text-lux-gold">${v.price}</p>
                                    </div>
                                    <div className="flex gap-4 text-sm text-lux-darkSec mb-4">
                                        <span className="flex items-center gap-1"><Users size={14} /> {v.capacity}</span>
                                        <span className="flex items-center gap-1"><Briefcase size={14} /> {v.luggage}</span>
                                    </div>
                                    <ul className="flex flex-wrap gap-2">
                                        {v.features.map((f, i) => (
                                            <li key={i} className="text-xs px-2 py-1 rounded bg-lux-primary/5 border border-lux-primary/10 text-lux-darkSec">{f}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <div className={`
                                        w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                                        ${selectedVehicle === v.id ? 'border-lux-gold bg-lux-gold' : 'border-lux-darkSec/30'}
                                    `}>
                                        {selectedVehicle === v.id && <CheckCircle2 size={16} className="text-white" />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            ))}

            <div className="pt-4">
                <GlassCard className="p-6">
                     <h3 className="text-lg font-bold text-lux-dark mb-4 flex items-center gap-2">
                         <MessageSquare size={18} className="text-lux-gold" />
                         Special Requests
                     </h3>
                     <textarea 
                        rows={3}
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Driver instructions, beverages preferences, etc..."
                        className="w-full p-4 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all resize-none"
                     ></textarea>
                </GlassCard>
            </div>
        </div>

        {/* Summary Column */}
        <div className="lg:col-span-1">
            <GlassCard className="p-8 sticky top-32">
                 <h2 className="text-xl font-serif font-bold text-lux-dark mb-6">Booking Summary</h2>
                 
                 <div className="space-y-6 mb-8">
                     <div className="relative pl-6 border-l-2 border-lux-gold/30 space-y-6">
                         <div>
                             <p className="text-xs font-bold text-lux-darkSec uppercase mb-1">Pickup</p>
                             <p className="font-bold text-lux-dark text-sm">{pickup}</p>
                             <p className="text-xs text-lux-darkSec mt-1">{date} @ {time}</p>
                         </div>
                         <div>
                             <p className="text-xs font-bold text-lux-darkSec uppercase mb-1">Dropoff</p>
                             <p className="font-bold text-lux-dark text-sm">{dropoff}</p>
                         </div>
                         <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-lux-gold"></div>
                         <div className="absolute left-[-5px] bottom-[48px] w-2 h-2 rounded-full bg-white border-2 border-lux-gold"></div>
                     </div>
                     
                     {selectedVehicleDetails && (
                         <>
                            <hr className="border-lux-darkSec/10" />
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <p className="font-bold text-lux-dark">{selectedVehicleDetails.name}</p>
                                    <p className="font-bold text-lux-dark">${selectedVehicleDetails.price}</p>
                                </div>
                                <p className="text-xs text-lux-darkSec">{selectedVehicleDetails.type}</p>
                            </div>
                            
                            {isSurge && (
                                <div className="flex justify-between items-center text-xs text-lux-gold">
                                    <span>Surge Pricing Applied</span>
                                    <span>Included</span>
                                </div>
                            )}

                             <div className="flex justify-between items-center pt-4 border-t border-lux-darkSec/10">
                                <p className="font-bold text-lux-dark text-lg">Total</p>
                                <p className="font-bold text-lux-dark text-xl">${selectedVehicleDetails.price}.00</p>
                            </div>
                         </>
                     )}
                 </div>

                 <div className="flex flex-col gap-4">
                     <GradientButton 
                        fullWidth 
                        onClick={handleBook}
                        disabled={!selectedVehicle || isBooking}
                        className={!selectedVehicle ? 'opacity-50 grayscale' : ''}
                    >
                         {isBooking ? 'Processing...' : 'Confirm & Book'}
                     </GradientButton>
                     <button 
                        onClick={() => navigate(-1)}
                        className="w-full py-3 rounded-full border border-lux-darkSec/20 text-lux-dark font-bold hover:bg-white/40 transition-colors"
                     >
                        Back
                     </button>
                 </div>
            </GlassCard>
        </div>

      </div>
    </div>
  );
};

export default BookingStep5;