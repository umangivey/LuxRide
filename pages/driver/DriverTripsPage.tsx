import React, { useState } from 'react';
import { Filter, ArrowUpDown, MapPin, Navigation, Clock, User, ArrowRight, X } from 'lucide-react';
import { DriverLayout } from '../../components/layout/DriverLayout';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

const DriverTripsPage: React.FC = () => {
    const [selectedTrip, setSelectedTrip] = useState<any | null>(null);

    const trips = [
        { id: 1, passenger: 'Sarah J.', rating: 4.9, pickup: 'The Ritz-Carlton', dropoff: 'ATL Airport (Intl)', distance: '14.2 mi', duration: '25 min', payout: '$65.00', type: 'Executive' },
        { id: 2, passenger: 'David M.', rating: 4.8, pickup: 'Midtown Hotel', dropoff: 'Mercedes-Benz Stadium', distance: '3.5 mi', duration: '12 min', payout: '$28.00', type: 'Standard' },
        { id: 3, passenger: 'Elena V.', rating: 5.0, pickup: 'Buckhead Plaza', dropoff: 'Porsche Experience Center', distance: '22.0 mi', duration: '35 min', payout: '$85.00', type: 'Executive' },
        { id: 4, passenger: 'Marcus T.', rating: 4.7, pickup: 'Downtown Office', dropoff: 'Alpharetta', distance: '25.5 mi', duration: '40 min', payout: '$92.00', type: 'Standard' },
    ];

    return (
        <DriverLayout>
            <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-lux-dark">Available Trips</h1>
                        <p className="text-lux-darkSec mt-1">Browse and accept trip requests in your area.</p>
                    </div>
                    
                    {/* Filters */}
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        <button className="px-4 py-2 rounded-full bg-white/50 border border-white/60 text-sm font-bold text-lux-dark hover:bg-white flex items-center gap-2">
                            <Filter size={16} /> Filters
                        </button>
                        <button className="px-4 py-2 rounded-full bg-white/50 border border-white/60 text-sm font-bold text-lux-dark hover:bg-white flex items-center gap-2">
                            <ArrowUpDown size={16} /> Sort: Nearest
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {trips.map((trip) => (
                        <GlassCard key={trip.id} className="p-0 overflow-hidden hover:border-lux-gold/40 transition-colors group">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-lux-primary/5 flex items-center justify-center text-lux-dark font-bold">
                                            {trip.passenger.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-lux-dark">{trip.passenger}</p>
                                            <p className="text-xs text-lux-darkSec">★ {trip.rating} • {trip.type}</p>
                                        </div>
                                    </div>
                                    <span className="text-2xl font-bold text-green-600">{trip.payout}</span>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 w-2 h-2 rounded-full bg-lux-gold shrink-0"></div>
                                        <div>
                                            <p className="text-xs text-lux-darkSec font-bold uppercase">Pickup</p>
                                            <p className="font-bold text-lux-dark text-sm">{trip.pickup}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 w-2 h-2 rounded-full bg-lux-dark shrink-0"></div>
                                        <div>
                                            <p className="text-xs text-lux-darkSec font-bold uppercase">Destination</p>
                                            <p className="font-bold text-lux-dark text-sm">{trip.dropoff}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-lux-darkSec/10">
                                    <div className="flex gap-4 text-xs font-bold text-lux-darkSec">
                                        <span className="flex items-center gap-1"><Navigation size={14} /> {trip.distance}</span>
                                        <span className="flex items-center gap-1"><Clock size={14} /> {trip.duration}</span>
                                    </div>
                                    <GradientButton onClick={() => setSelectedTrip(trip)} className="px-6 py-2 text-xs">
                                        View & Accept
                                    </GradientButton>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>

                {/* Trip Detail Modal */}
                {selectedTrip && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                        <GlassCard className="w-full max-w-lg p-0 overflow-hidden relative shadow-2xl">
                            <button 
                                onClick={() => setSelectedTrip(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-white/50 hover:bg-white text-lux-dark transition-colors z-10"
                            >
                                <X size={20} />
                            </button>

                            <div className="h-40 bg-lux-dark/10 relative">
                                {/* Abstract Map Header */}
                                <div className="absolute inset-0 flex items-center justify-center text-lux-dark/20">
                                    <MapPin size={48} />
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="text-center -mt-16 mb-6">
                                    <div className="w-20 h-20 rounded-full bg-white shadow-xl mx-auto flex items-center justify-center text-2xl font-bold text-lux-primary mb-2">
                                        {selectedTrip.passenger.charAt(0)}
                                    </div>
                                    <h2 className="text-2xl font-bold text-lux-dark">{selectedTrip.passenger}</h2>
                                    <p className="text-lux-darkSec">★ {selectedTrip.rating} • 124 Trips</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-8 text-center">
                                    <div className="p-3 rounded-xl bg-green-50 border border-green-100">
                                        <p className="text-xs text-green-600 font-bold uppercase">Estimated Payout</p>
                                        <p className="text-xl font-bold text-green-700">{selectedTrip.payout}</p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-lux-primary/5 border border-lux-primary/10">
                                        <p className="text-xs text-lux-darkSec font-bold uppercase">Total Distance</p>
                                        <p className="text-xl font-bold text-lux-dark">{selectedTrip.distance}</p>
                                    </div>
                                </div>

                                <div className="space-y-6 mb-8">
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center pt-1">
                                            <div className="w-3 h-3 rounded-full bg-lux-gold shadow-[0_0_8px_rgba(197,160,89,0.6)]"></div>
                                            <div className="w-0.5 h-12 bg-gray-300 my-1"></div>
                                            <div className="w-3 h-3 rounded-full bg-lux-dark"></div>
                                        </div>
                                        <div className="flex-1 space-y-6">
                                            <div>
                                                <p className="text-xs font-bold text-lux-darkSec uppercase mb-1">Pickup</p>
                                                <p className="font-bold text-lux-dark text-lg">{selectedTrip.pickup}</p>
                                                <p className="text-xs text-lux-darkSec">2 mins away</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-lux-darkSec uppercase mb-1">Destination</p>
                                                <p className="font-bold text-lux-dark text-lg">{selectedTrip.dropoff}</p>
                                                <p className="text-xs text-lux-darkSec">{selectedTrip.duration} trip</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <GradientButton fullWidth onClick={() => { /* Handle Accept */ setSelectedTrip(null); }}>
                                    <span className="flex items-center gap-2 text-lg">
                                        Accept Trip
                                        <ArrowRight size={20} />
                                    </span>
                                </GradientButton>
                            </div>
                        </GlassCard>
                    </div>
                )}

            </div>
        </DriverLayout>
    );
};

export default DriverTripsPage;