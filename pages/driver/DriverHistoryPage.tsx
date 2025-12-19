import React from 'react';
import { Clock, CheckCircle2, XCircle, MapPin, Search, Filter } from 'lucide-react';
import { DriverLayout } from '../../components/layout/DriverLayout';
import { GlassCard } from '../../components/ui/GlassCard';

const DriverHistoryPage: React.FC = () => {
    const history = [
        { id: 'TR-8821', date: 'Oct 24, 2:30 PM', pickup: 'Buckhead Plaza', dropoff: 'ATL Airport', earnings: '$65.00', status: 'Completed', rating: 5 },
        { id: 'TR-8820', date: 'Oct 24, 11:00 AM', pickup: 'Midtown', dropoff: 'Downtown', earnings: '$28.00', status: 'Completed', rating: 5 },
        { id: 'TR-8819', date: 'Oct 23, 6:15 PM', pickup: 'Sandy Springs', dropoff: 'Buckhead', earnings: '$0.00', status: 'Cancelled', rating: null },
        { id: 'TR-8818', date: 'Oct 23, 4:00 PM', pickup: 'ATL Airport', dropoff: 'Alpharetta', earnings: '$92.00', status: 'Completed', rating: 4 },
    ];

    return (
        <DriverLayout>
            <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-lux-dark">Trip History</h1>
                        <p className="text-lux-darkSec mt-1">Review your past trips and performance.</p>
                    </div>
                </div>

                <GlassCard className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-lux-darkSec/50" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by location or date..." 
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 border border-white/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-lux-gold text-sm transition-all"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-lux-darkSec/20 hover:bg-white transition-colors text-sm font-bold text-lux-dark">
                        <Filter size={16} /> Filter
                    </button>
                </GlassCard>

                <div className="space-y-4">
                    {history.map((trip) => (
                        <GlassCard key={trip.id} className="p-6 hover:border-lux-gold/30 transition-colors">
                            <div className="flex flex-col md:flex-row gap-6 justify-between">
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-xs font-bold text-lux-darkSec bg-lux-primary/5 px-2 py-1 rounded">{trip.id}</span>
                                        <span className="text-sm font-bold text-lux-dark">{trip.date}</span>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${trip.status === 'Completed' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                                            {trip.status}
                                        </span>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="flex items-start gap-2">
                                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-lux-gold shrink-0"></div>
                                            <p className="text-sm font-medium text-lux-dark">{trip.pickup}</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-lux-dark shrink-0"></div>
                                            <p className="text-sm font-medium text-lux-dark">{trip.dropoff}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex md:flex-col justify-between items-end gap-2 text-right">
                                    <span className="text-xl font-bold text-lux-dark">{trip.earnings}</span>
                                    {trip.rating && <span className="text-xs font-bold text-lux-gold">★ {trip.rating}.0</span>}
                                    <button className="text-xs font-bold text-lux-primary hover:underline">View Details</button>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </DriverLayout>
    );
};

export default DriverHistoryPage;