import React, { useState } from 'react';
import { 
    DollarSign, 
    Star, 
    TrendingUp, 
    MapPin, 
    Navigation, 
    Clock, 
    User,
    CheckCircle2,
    XCircle
} from 'lucide-react';
import { DriverLayout } from '../../components/layout/DriverLayout';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

const DriverDashboard: React.FC = () => {
    const [isOnline, setIsOnline] = useState(false);

    // Mock Data
    const stats = [
        { label: 'Today\'s Earnings', value: '$480.00', icon: <DollarSign className="text-white" size={20} />, color: 'from-green-500 to-emerald-600' },
        { label: 'Trips Today', value: '8', icon: <TrendingUp className="text-white" size={20} />, color: 'from-lux-primary to-lux-secondary' },
        { label: 'Rating', value: '4.9', icon: <Star className="text-white" size={20} />, color: 'from-lux-gold to-yellow-500' },
        { label: 'Month Earnings', value: '$8,920', icon: <DollarSign className="text-white" size={20} />, color: 'from-blue-500 to-indigo-600' },
    ];

    const availableTrips = [
        { id: 1, pickup: 'Buckhead Plaza', dropoff: 'ATL Airport (Intl)', distance: '14.2 mi', time: '25 min', payout: '$65.00', type: 'Executive' },
        { id: 2, pickup: 'Midtown Hotel', dropoff: 'Mercedes-Benz Stadium', distance: '3.5 mi', time: '12 min', payout: '$28.00', type: 'Standard' },
    ];

    return (
        <DriverLayout>
            <div className="space-y-8 animate-in fade-in duration-500">
                
                {/* Header & Status Toggle */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-lux-dark">Driver Dashboard</h1>
                        <p className="text-lux-darkSec mt-1">Welcome back, Michael.</p>
                    </div>
                    
                    <button 
                        onClick={() => setIsOnline(!isOnline)}
                        className={`
                            px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-all transform hover:scale-105
                            ${isOnline 
                                ? 'bg-green-500 text-white hover:bg-green-600' 
                                : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}
                        `}
                    >
                        {isOnline ? 'You are Online' : 'Go Online'}
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                        <GlassCard key={idx} className="p-6 relative overflow-hidden">
                            <div className={`absolute top-0 right-0 p-3 opacity-10 bg-gradient-to-br ${stat.color} rounded-bl-3xl`}>
                                {stat.icon}
                            </div>
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg mb-4`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-lux-darkSec uppercase tracking-wider mb-1">{stat.label}</p>
                                <p className="text-2xl font-bold text-lux-dark">{stat.value}</p>
                            </div>
                        </GlassCard>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* Available Trips (2/3) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-serif font-bold text-lux-dark">Available Trips Nearby</h2>
                            <button className="text-sm font-bold text-lux-gold hover:text-lux-primary">View All</button>
                        </div>

                        {isOnline ? (
                            <div className="space-y-4">
                                {availableTrips.map((trip) => (
                                    <GlassCard key={trip.id} className="p-6 hover:border-lux-gold/40 transition-all border-l-4 border-l-lux-gold">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                            <div className="flex-1 space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <span className="px-2 py-1 rounded bg-lux-primary/5 text-xs font-bold text-lux-dark uppercase tracking-wide border border-lux-primary/10">{trip.type}</span>
                                                    <span className="text-xl font-bold text-green-600 md:hidden">{trip.payout}</span>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <div className="flex flex-col items-center gap-1 mt-1">
                                                        <div className="w-2 h-2 rounded-full bg-lux-gold"></div>
                                                        <div className="w-0.5 h-8 bg-lux-darkSec/20"></div>
                                                        <div className="w-2 h-2 rounded-full bg-lux-dark"></div>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <p className="text-xs text-lux-darkSec font-bold uppercase">Pickup</p>
                                                            <p className="font-bold text-lux-dark">{trip.pickup}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-lux-darkSec font-bold uppercase">Dropoff</p>
                                                            <p className="font-bold text-lux-dark">{trip.dropoff}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-4 text-sm text-lux-darkSec font-medium">
                                                    <span className="flex items-center gap-1"><Navigation size={14} /> {trip.distance}</span>
                                                    <span className="flex items-center gap-1"><Clock size={14} /> {trip.time}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-row md:flex-col items-center gap-4 w-full md:w-auto">
                                                <span className="text-2xl font-bold text-green-600 hidden md:block">{trip.payout}</span>
                                                <div className="flex gap-2 w-full md:w-auto">
                                                    <button className="flex-1 md:flex-none px-4 py-2 rounded-full border border-lux-darkSec/20 text-lux-dark font-bold hover:bg-white transition-colors">Skip</button>
                                                    <GradientButton className="flex-1 md:flex-none px-6">Accept</GradientButton>
                                                </div>
                                            </div>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        ) : (
                            <GlassCard className="p-10 text-center flex flex-col items-center justify-center min-h-[300px]">
                                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-gray-400">
                                    <XCircle size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-lux-dark mb-2">You are Offline</h3>
                                <p className="text-lux-darkSec mb-6">Go online to start receiving trip requests.</p>
                                <button 
                                    onClick={() => setIsOnline(true)}
                                    className="px-8 py-3 rounded-full bg-green-500 text-white font-bold hover:bg-green-600 transition-colors shadow-lg"
                                >
                                    Go Online
                                </button>
                            </GlassCard>
                        )}
                    </div>

                    {/* Right Column: Active Trip / Recent */}
                    <div className="space-y-6">
                        
                        {/* Mock Active Trip - Only show if online and "accepted" (mock logic) */}
                        {isOnline && (
                            <GlassCard className="p-0 overflow-hidden bg-gradient-to-br from-lux-dark to-gray-900 text-white border-none shadow-2xl">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Current Trip</p>
                                            <h3 className="text-xl font-bold">Picking up Sarah</h3>
                                        </div>
                                        <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">On Route</div>
                                    </div>
                                    
                                    <div className="space-y-4 mb-6">
                                        <div className="flex items-center gap-3">
                                            <Navigation className="text-lux-gold" size={20} />
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase">Next Stop</p>
                                                <p className="font-bold">The Ritz-Carlton</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Clock className="text-lux-gold" size={20} />
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase">ETA</p>
                                                <p className="font-bold">4 min</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="flex-1 py-3 rounded-xl bg-white text-lux-dark font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                                            <Navigation size={18} /> Navigate
                                        </button>
                                        <button className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                                            <User size={18} />
                                        </button>
                                    </div>
                                </div>
                            </GlassCard>
                        )}

                        {/* Recent Activity */}
                        <GlassCard className="p-6">
                            <h3 className="font-bold text-lux-dark mb-4">Recent Trips</h3>
                            <div className="space-y-4">
                                {[
                                    { dest: 'ATL Airport', time: '1 hr ago', earn: '$45.00' },
                                    { dest: 'Midtown Office', time: '3 hrs ago', earn: '$28.50' },
                                    { dest: 'Buckhead', time: 'Yesterday', earn: '$52.00' },
                                ].map((t, i) => (
                                    <div key={i} className="flex justify-between items-center py-3 border-b border-lux-darkSec/5 last:border-0 last:pb-0">
                                        <div>
                                            <p className="font-bold text-lux-dark text-sm">{t.dest}</p>
                                            <p className="text-xs text-lux-darkSec">{t.time}</p>
                                        </div>
                                        <p className="font-bold text-green-600 text-sm">{t.earn}</p>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 text-xs font-bold text-lux-darkSec hover:text-lux-gold text-center">View All History</button>
                        </GlassCard>

                    </div>
                </div>
            </div>
        </DriverLayout>
    );
};

export default DriverDashboard;