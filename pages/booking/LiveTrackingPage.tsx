import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, MessageSquare, Share2, X, MapPin, Navigation, Star, ShieldCheck, Car, ArrowLeft, MoreVertical } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

const LiveTrackingPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [eta, setEta] = useState(12);
  const [status, setStatus] = useState('Driver approaching');
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);

  // Mock driver data
  const driver = {
    name: 'Michael C.',
    rating: 4.9,
    trips: 1240,
    vehicle: 'Mercedes-Benz S-Class',
    plate: 'LUX-8821',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    phone: '+14045550199'
  };

  // Mock trip data
  const trip = {
    pickup: '123 Peachtree St NE',
    dropoff: 'Hartsfield-Jackson Intl (ATL)',
    status: 'en_route_pickup' // en_route_pickup, arrived, in_transit, completed
  };

  useEffect(() => {
    // Simulate ETA countdown
    const timer = setInterval(() => {
      setEta((prev) => (prev > 1 ? prev - 1 : 1));
    }, 60000); // Reduce minute every 60s
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-lux-accent/20">
      
      {/* 1. Full Screen Map Mock */}
      <div className="absolute inset-0 z-0">
        {/* Abstract Map Background */}
        <div className="w-full h-full bg-[#E5E0D8] relative overflow-hidden">
             {/* Roads */}
             <div className="absolute top-0 left-1/3 w-8 h-full bg-white/60 transform -skew-x-12"></div>
             <div className="absolute top-1/2 left-0 w-full h-6 bg-white/60 transform -skew-y-6"></div>
             <div className="absolute top-0 right-1/4 w-4 h-full bg-white/60 transform skew-x-6"></div>
             
             {/* Grid Pattern */}
             <div className="absolute inset-0 opacity-10" style={{
                 backgroundImage: 'linear-gradient(#6B5E55 1px, transparent 1px), linear-gradient(90deg, #6B5E55 1px, transparent 1px)',
                 backgroundSize: '40px 40px'
             }}></div>

             {/* Driver Marker (Animated) */}
             <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-[2000ms] ease-linear">
                 <div className="relative">
                     <div className="w-16 h-16 rounded-full bg-lux-gold/20 animate-ping absolute inset-0"></div>
                     <div className="w-16 h-16 rounded-full bg-lux-gold/10 absolute inset-0"></div>
                     <div className="w-12 h-12 rounded-full bg-lux-dark border-4 border-white shadow-xl flex items-center justify-center relative z-10">
                        <Car size={20} className="text-white" />
                     </div>
                     <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white/90 px-2 py-1 rounded shadow text-xs font-bold whitespace-nowrap">
                         {eta} min away
                     </div>
                 </div>
             </div>

             {/* Pickup Marker */}
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                 <div className="flex flex-col items-center">
                     <MapPin size={32} className="text-lux-primary drop-shadow-lg mb-1" fill="currentColor" />
                     <div className="bg-lux-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        Pickup
                     </div>
                 </div>
             </div>
        </div>
      </div>

      {/* 2. Header Overlay */}
      <div className="absolute top-0 left-0 w-full p-4 sm:p-6 z-20 flex justify-between items-start pointer-events-none">
        <Link to="/member/dashboard" className="pointer-events-auto w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center text-lux-dark hover:bg-lux-primary hover:text-white transition-colors">
            <ArrowLeft size={20} />
        </Link>
        <button className="pointer-events-auto px-4 py-2 rounded-full bg-white/80 backdrop-blur-md shadow-lg text-lux-dark font-bold text-sm hover:bg-white transition-colors">
            Help
        </button>
      </div>

      {/* 3. Bottom Sheet / Card Overlay */}
      <div className="absolute bottom-0 left-0 w-full z-30 p-4 sm:p-6 lg:p-8 flex justify-center pointer-events-none">
         <div className="w-full max-w-md pointer-events-auto">
            
            {/* Status Pill */}
            <div className="flex justify-center mb-4">
                <div className="px-6 py-2 rounded-full bg-lux-dark/90 backdrop-blur-md text-white font-bold shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    {status}
                </div>
            </div>

            <GlassCard className="p-0 overflow-hidden shadow-2xl border-white/60 bg-white/60 backdrop-blur-xl">
                {/* Main Content */}
                <div className="p-6">
                    {/* Header: ETA & Status */}
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <p className="text-sm font-bold text-lux-darkSec uppercase tracking-wider mb-1">Estimated Arrival</p>
                            <h2 className="text-4xl font-serif font-bold text-lux-dark">{eta} min</h2>
                        </div>
                        <div className="text-right">
                             <p className="text-sm font-bold text-lux-darkSec">{driver.vehicle}</p>
                             <p className="font-mono font-bold text-lux-dark bg-lux-gold/10 px-2 py-0.5 rounded text-sm inline-block mt-1">{driver.plate}</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-gray-200 rounded-full mb-8 overflow-hidden">
                        <div className="h-full bg-lux-gold w-[65%] rounded-full relative overflow-hidden">
                             <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
                        </div>
                    </div>

                    {/* Driver Profile */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="relative">
                            <img src={driver.image} alt={driver.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md" />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-lux-gold flex items-center justify-center text-white text-[10px] font-bold border-2 border-white shadow-sm">
                                4.9
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-lux-dark text-lg">{driver.name}</h3>
                            <div className="flex items-center gap-2 text-xs text-lux-darkSec font-medium">
                                <ShieldCheck size={12} className="text-lux-gold" />
                                <span>Verified Chauffeur</span>
                                <span className="text-gray-300">•</span>
                                <span>{driver.trips} Trips</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="w-10 h-10 rounded-full bg-lux-primary/10 flex items-center justify-center text-lux-primary hover:bg-lux-primary hover:text-white transition-colors">
                                <MessageSquare size={18} />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-lux-gold/10 flex items-center justify-center text-lux-gold hover:bg-lux-gold hover:text-white transition-colors">
                                <Phone size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Trip Details (Collapsible) */}
                    <div className={`space-y-4 transition-all duration-300 overflow-hidden ${isDetailsOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                         <div className="p-4 rounded-xl bg-white/40 border border-white/60">
                             <div className="flex items-start gap-3 relative">
                                 {/* Connector Line */}
                                 <div className="absolute left-[9px] top-3 bottom-3 w-0.5 bg-lux-darkSec/20"></div>
                                 
                                 <div className="w-full space-y-4">
                                     <div className="flex items-start gap-3">
                                         <div className="w-5 h-5 rounded-full border-2 border-lux-gold bg-white shrink-0 relative z-10 mt-0.5"></div>
                                         <div className="flex-1 min-w-0">
                                             <p className="text-xs font-bold text-lux-darkSec uppercase">Pickup</p>
                                             <p className="text-sm font-bold text-lux-dark truncate">{trip.pickup}</p>
                                         </div>
                                     </div>
                                     <div className="flex items-start gap-3">
                                         <div className="w-5 h-5 rounded-full bg-lux-gold shrink-0 relative z-10 mt-0.5"></div>
                                         <div className="flex-1 min-w-0">
                                             <p className="text-xs font-bold text-lux-darkSec uppercase">Dropoff</p>
                                             <p className="text-sm font-bold text-lux-dark truncate">{trip.dropoff}</p>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3 mt-6">
                        <button 
                            className="px-4 py-3 rounded-full border border-lux-darkSec/10 bg-white/50 text-lux-dark font-bold text-sm hover:bg-white transition-colors flex items-center justify-center gap-2"
                        >
                            <Share2 size={16} />
                            Share Trip
                        </button>
                        <button 
                            className="px-4 py-3 rounded-full border border-red-200 bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                        >
                            <X size={16} />
                            Cancel
                        </button>
                    </div>

                </div>

                {/* Toggle Handle */}
                <button 
                    onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                    className="w-full py-2 flex justify-center items-center hover:bg-black/5 transition-colors border-t border-lux-darkSec/5"
                >
                    <div className="w-10 h-1 rounded-full bg-lux-darkSec/20"></div>
                </button>
            </GlassCard>
         </div>
      </div>

    </div>
  );
};

export default LiveTrackingPage;