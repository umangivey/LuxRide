import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Calendar, 
    MapPin, 
    Clock, 
    ArrowRight, 
    TrendingUp, 
    CreditCard, 
    Star, 
    Zap,
    ChevronRight,
    Car
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

const MemberDashboard: React.FC = () => {
  // Mock Data
  const stats = [
    { 
        label: 'Transfers Remaining', 
        value: '18', 
        total: '/ 30', 
        icon: <Car className="text-white" size={20} />,
        color: 'from-lux-primary to-lux-secondary'
    },
    { 
        label: 'Completed Trips', 
        value: '47', 
        icon: <TrendingUp className="text-white" size={20} />,
        color: 'from-lux-gold to-lux-secondary'
    },
    { 
        label: 'Total Spent', 
        value: '$5,200', 
        icon: <CreditCard className="text-white" size={20} />,
        color: 'from-lux-dark to-lux-primary'
    },
    { 
        label: 'My Rating', 
        value: '4.9', 
        icon: <Star className="text-white" size={20} />,
        color: 'from-lux-secondary to-gray-600'
    },
  ];

  const upcomingBookings = [
    {
        id: 'LR-8821',
        date: 'Oct 26, 2023',
        time: '09:00 AM',
        pickup: 'The Ritz-Carlton, Atlanta',
        dropoff: 'Hartsfield-Jackson Intl (ATL)',
        status: 'Confirmed'
    },
    {
        id: 'LR-9932',
        date: 'Nov 02, 2023',
        time: '02:30 PM',
        pickup: 'Buckhead Plaza',
        dropoff: 'Porsche Experience Center',
        status: 'Pending Driver'
    }
  ];

  const recentTrips = [
    {
        id: 'LR-7743',
        date: 'Oct 20, 2023',
        pickup: 'ATL Airport',
        dropoff: 'Midtown Residence',
        price: '$145.00',
        rating: 5
    },
    {
        id: 'LR-7710',
        date: 'Oct 15, 2023',
        pickup: 'Downtown Office',
        dropoff: 'Signature Flight Support',
        price: '$185.00',
        rating: 5
    },
    {
        id: 'LR-7688',
        date: 'Oct 12, 2023',
        pickup: 'St. Regis Atlanta',
        dropoff: 'Mercedes-Benz Stadium',
        price: '$125.00',
        rating: 4
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-lux-dark">
                    Welcome back, James!
                </h1>
                <p className="text-lux-darkSec mt-2">
                    Here's what's happening with your account today.
                </p>
            </div>
            <div className="px-4 py-2 rounded-full bg-lux-gold/10 border border-lux-gold/20 flex items-center gap-2 self-start md:self-auto">
                <Star size={16} className="text-lux-gold fill-lux-gold" />
                <span className="text-sm font-bold text-lux-dark uppercase tracking-wide">Executive Member</span>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
                <GlassCard key={idx} className="p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform">
                    <div className={`absolute top-0 right-0 p-3 opacity-10 bg-gradient-to-br ${stat.color} rounded-bl-3xl`}>
                        {stat.icon}
                    </div>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg mb-4`}>
                        {stat.icon}
                    </div>
                    <div>
                        <p className="text-xs font-bold text-lux-darkSec uppercase tracking-wider mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-lux-dark">
                            {stat.value}
                            {stat.total && <span className="text-sm text-lux-darkSec/50 font-medium ml-1">{stat.total}</span>}
                        </p>
                    </div>
                </GlassCard>
            ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Upcoming Bookings (2/3 width) */}
            <div className="lg:col-span-2 space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-serif font-bold text-lux-dark">Upcoming Trips</h2>
                    <Link to="/book" className="text-sm font-bold text-lux-gold hover:text-lux-primary flex items-center gap-1">
                        Book New <ArrowRight size={14} />
                    </Link>
                </div>
                
                {upcomingBookings.length > 0 ? (
                    <div className="space-y-4">
                        {upcomingBookings.map((booking) => (
                            <GlassCard key={booking.id} className="p-0 overflow-hidden hover:border-lux-gold/30 transition-colors">
                                <div className="p-6 flex flex-col md:flex-row gap-6 items-center">
                                    {/* Date Box */}
                                    <div className="flex flex-col items-center justify-center w-full md:w-20 bg-lux-primary/5 rounded-xl py-3 border border-lux-primary/10 shrink-0">
                                        <span className="text-xs font-bold text-lux-darkSec uppercase">{booking.date.split(' ')[0]}</span>
                                        <span className="text-2xl font-bold text-lux-dark">{booking.date.split(' ')[1].replace(',','')}</span>
                                    </div>
                                    
                                    {/* Trip Details */}
                                    <div className="flex-1 w-full space-y-3">
                                        <div className="flex justify-between items-start">
                                            <span className="text-xs font-bold text-lux-darkSec bg-white/50 px-2 py-1 rounded border border-lux-darkSec/10">
                                                {booking.id}
                                            </span>
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                                booking.status === 'Confirmed' 
                                                ? 'bg-green-100 text-green-700' 
                                                : 'bg-amber-100 text-amber-700'
                                            }`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="flex items-start gap-3">
                                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-lux-gold shrink-0 shadow-[0_0_5px_rgba(197,160,89,0.5)]"></div>
                                                <div>
                                                    <p className="text-xs text-lux-darkSec uppercase font-bold">Pickup • {booking.time}</p>
                                                    <p className="text-sm font-bold text-lux-dark truncate">{booking.pickup}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                 <div className="mt-1 w-1.5 h-1.5 rounded-full bg-lux-dark shrink-0"></div>
                                                <div>
                                                    <p className="text-xs text-lux-darkSec uppercase font-bold">Dropoff</p>
                                                    <p className="text-sm font-bold text-lux-dark truncate">{booking.dropoff}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <div className="w-full md:w-auto">
                                        <Link 
                                            to={`/booking/${booking.id}/tracking`}
                                            className="block w-full text-center px-6 py-3 rounded-full bg-lux-dark text-white text-sm font-bold hover:bg-lux-primary transition-colors shadow-lg"
                                        >
                                            Track
                                        </Link>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                ) : (
                    <GlassCard className="p-10 text-center">
                        <p className="text-lux-darkSec">No upcoming trips.</p>
                        <Link to="/book" className="text-lux-gold font-bold text-sm mt-2 inline-block">Book your next transfer</Link>
                    </GlassCard>
                )}
            </div>

            {/* Recent Activity (1/3 width) */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-serif font-bold text-lux-dark">Recent History</h2>
                    <Link to="/member/bookings" className="text-sm font-bold text-lux-darkSec hover:text-lux-gold">View All</Link>
                </div>

                <div className="space-y-4">
                    {recentTrips.map((trip) => (
                        <GlassCard key={trip.id} className="p-4 hover:bg-white/60 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold text-lux-darkSec">{trip.date}</span>
                                <span className="text-sm font-bold text-lux-dark">{trip.price}</span>
                            </div>
                            <div className="space-y-2 mb-3">
                                <p className="text-sm text-lux-dark truncate flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-lux-gold"></span>
                                    {trip.pickup}
                                </p>
                                <p className="text-sm text-lux-dark truncate flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-lux-darkSec/30"></span>
                                    {trip.dropoff}
                                </p>
                            </div>
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        size={12} 
                                        className={i < trip.rating ? "fill-lux-gold text-lux-gold" : "text-gray-300"} 
                                    />
                                ))}
                            </div>
                        </GlassCard>
                    ))}
                </div>

                {/* Quick Actions Card */}
                <GlassCard className="p-6 bg-gradient-to-br from-lux-primary/5 to-transparent">
                    <h3 className="font-bold text-lux-dark mb-4 flex items-center gap-2">
                        <Zap size={18} className="text-lux-gold" />
                        Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <GradientButton to="/book" className="px-2 py-3 text-xs" fullWidth>
                            Book Transfer
                        </GradientButton>
                        <button className="px-2 py-3 rounded-full border border-lux-darkSec/20 text-lux-dark font-bold text-xs hover:bg-white transition-colors">
                            Contact Support
                        </button>
                    </div>
                </GlassCard>
            </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default MemberDashboard;