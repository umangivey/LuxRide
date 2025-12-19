import React, { useState } from 'react';
import { 
    Search, 
    Filter, 
    Download, 
    MoreVertical, 
    MapPin, 
    Calendar, 
    Clock, 
    User, 
    Car, 
    Star, 
    DollarSign, 
    CheckCircle2, 
    XCircle, 
    AlertTriangle, 
    ChevronLeft, 
    ChevronRight,
    TrendingUp,
    TrendingDown,
    X,
    MessageSquare,
    ShieldAlert,
    RefreshCw
} from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

interface Booking {
    id: string;
    date: string;
    time: string;
    member: string;
    memberId: string;
    driver: string;
    driverId: string;
    pickup: string;
    dropoff: string;
    status: 'Completed' | 'Pending' | 'In Progress' | 'Cancelled';
    revenue: number;
    rating?: number;
    tier: 'Essential' | 'Executive' | 'Royal';
    type: 'One-Way' | 'Hourly' | 'Airport';
}

const AdminBookingsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    // Mock Data
    const bookings: Booking[] = [
        { id: 'LR-8821', date: 'Oct 24, 2023', time: '14:30', member: 'James Sterling', memberId: 'M-101', driver: 'Michael Chen', driverId: 'D-882', pickup: 'The Ritz-Carlton', dropoff: 'ATL Airport', status: 'Completed', revenue: 145.00, rating: 5, tier: 'Executive', type: 'Airport' },
        { id: 'LR-8822', date: 'Oct 24, 2023', time: '15:45', member: 'Sarah Connor', memberId: 'M-205', driver: 'Sarah Jenkins', driverId: 'D-993', pickup: 'Buckhead Plaza', dropoff: 'Midtown Hotel', status: 'In Progress', revenue: 65.00, tier: 'Royal', type: 'One-Way' },
        { id: 'LR-8823', date: 'Oct 24, 2023', time: '16:00', member: 'Elena Gilbert', memberId: 'M-304', driver: 'Pending', driverId: '-', pickup: 'Fox Theatre', dropoff: 'Ansley Park', status: 'Pending', revenue: 85.00, tier: 'Essential', type: 'One-Way' },
        { id: 'LR-8820', date: 'Oct 23, 2023', time: '09:00', member: 'Damon Salvatore', memberId: 'M-440', driver: 'David Miller', driverId: 'D-771', pickup: 'ATL International', dropoff: 'Alpharetta', status: 'Cancelled', revenue: 0.00, tier: 'Royal', type: 'Airport' },
        { id: 'LR-8819', date: 'Oct 23, 2023', time: '11:30', member: 'Caroline Forbes', memberId: 'M-112', driver: 'Michael Chen', driverId: 'D-882', pickup: 'Piedmont Park', dropoff: 'Lenox Square', status: 'Completed', revenue: 45.00, rating: 4, tier: 'Essential', type: 'One-Way' },
    ];

    // Filter Logic
    const filteredBookings = bookings.filter(b => {
        const matchesSearch = 
            b.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
            b.member.toLowerCase().includes(searchTerm.toLowerCase()) || 
            b.driver.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
            case 'Pending': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'In Progress': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto pb-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-lux-dark">Bookings & Trips</h1>
                        <p className="text-lux-darkSec mt-1">Manage reservations, dispatching, and trip records.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-full border border-lux-darkSec/20 bg-white/50 text-lux-dark font-bold text-sm hover:bg-white transition-colors flex items-center gap-2">
                            <RefreshCw size={16} /> Refresh
                        </button>
                        <GradientButton className="px-4 py-2 text-sm">
                            <span className="flex items-center gap-2">
                                <Download size={16} /> Export
                            </span>
                        </GradientButton>
                    </div>
                </div>

                {/* Analytics Section */}
                <div className="grid md:grid-cols-3 gap-6">
                    <GlassCard className="p-6">
                        <h3 className="text-sm font-bold text-lux-darkSec uppercase tracking-wide mb-4">Peak Times (Today)</h3>
                        <div className="flex items-end justify-between h-24 gap-2">
                            {[20, 45, 30, 80, 60, 90, 50, 30].map((h, i) => (
                                <div key={i} className="w-full bg-lux-gold/20 rounded-t-sm relative group">
                                    <div 
                                        className="absolute bottom-0 w-full bg-lux-gold rounded-t-sm transition-all duration-500" 
                                        style={{ height: `${h}%` }}
                                    ></div>
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                        {8 + i * 2}h
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-[10px] text-lux-darkSec font-bold">
                            <span>8 AM</span><span>10 PM</span>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-6">
                        <h3 className="text-sm font-bold text-lux-darkSec uppercase tracking-wide mb-4">Popular Routes</h3>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-xs font-bold text-lux-dark mb-1">
                                    <span>Airport ↔ Buckhead</span>
                                    <span>45%</span>
                                </div>
                                <div className="w-full h-1.5 bg-lux-primary/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-lux-primary w-[45%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold text-lux-dark mb-1">
                                    <span>Airport ↔ Midtown</span>
                                    <span>30%</span>
                                </div>
                                <div className="w-full h-1.5 bg-lux-primary/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-lux-gold w-[30%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold text-lux-dark mb-1">
                                    <span>Downtown ↔ Alpharetta</span>
                                    <span>15%</span>
                                </div>
                                <div className="w-full h-1.5 bg-lux-primary/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-lux-darkSec w-[15%]"></div>
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-6 flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-bold text-lux-darkSec uppercase tracking-wide">Cancellation Rate</h3>
                            <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                                <TrendingDown size={14} /> -2.5%
                            </span>
                        </div>
                        <div className="flex items-end gap-3">
                            <span className="text-4xl font-serif font-bold text-lux-dark">4.2%</span>
                            <span className="text-xs text-lux-darkSec mb-1">this week</span>
                        </div>
                        <p className="text-xs text-lux-darkSec mt-3">
                            Most cancellations occur >24h in advance.
                        </p>
                    </GlassCard>
                </div>

                {/* Filters */}
                <GlassCard className="p-4 flex flex-col lg:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full lg:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-lux-darkSec/50" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search Booking ID, Member, Driver..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 border border-white/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-lux-gold text-sm transition-all"
                        />
                    </div>
                    <div className="flex gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
                        <div className="relative min-w-[140px]">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-lux-darkSec/50" size={16} />
                            <select 
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/50 border border-white/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-lux-gold text-sm appearance-none cursor-pointer"
                            >
                                <option value="All">All Status</option>
                                <option value="Completed">Completed</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Pending">Pending</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </GlassCard>

                {/* Bookings Table */}
                <GlassCard className="p-0 overflow-hidden min-h-[500px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-lux-primary/5 border-b border-lux-darkSec/5 text-xs font-bold text-lux-darkSec uppercase tracking-wider">
                                    <th className="p-4 pl-6">ID / Date</th>
                                    <th className="p-4">Member</th>
                                    <th className="p-4">Driver</th>
                                    <th className="p-4">Route</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Revenue</th>
                                    <th className="p-4 text-right pr-6">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {filteredBookings.map((booking) => (
                                    <tr 
                                        key={booking.id} 
                                        onClick={() => setSelectedBooking(booking)}
                                        className="border-b border-lux-darkSec/5 hover:bg-white/40 transition-colors cursor-pointer"
                                    >
                                        <td className="p-4 pl-6">
                                            <div className="font-mono font-bold text-lux-dark">{booking.id}</div>
                                            <div className="text-xs text-lux-darkSec flex items-center gap-1 mt-1">
                                                <Calendar size={10} /> {booking.date}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold text-lux-dark">{booking.member}</div>
                                            <div className="text-xs text-lux-darkSec">{booking.tier}</div>
                                        </td>
                                        <td className="p-4">
                                            {booking.driver === 'Pending' ? (
                                                <span className="text-amber-600 font-bold text-xs italic">Assigning...</span>
                                            ) : (
                                                <div className="font-medium text-lux-dark">{booking.driver}</div>
                                            )}
                                        </td>
                                        <td className="p-4 max-w-[200px]">
                                            <div className="truncate text-xs font-medium text-lux-darkSec">
                                                <span className="text-lux-dark">From:</span> {booking.pickup}
                                            </div>
                                            <div className="truncate text-xs font-medium text-lux-darkSec">
                                                <span className="text-lux-dark">To:</span> {booking.dropoff}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="p-4 font-bold text-lux-dark">
                                            ${booking.revenue.toFixed(2)}
                                        </td>
                                        <td className="p-4 pr-6 text-right">
                                            <button className="p-2 hover:bg-lux-primary/10 rounded-full text-lux-darkSec hover:text-lux-primary transition-colors">
                                                <MoreVertical size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination Mock */}
                    <div className="p-4 border-t border-lux-darkSec/5 flex items-center justify-between">
                        <span className="text-xs text-lux-darkSec font-medium">
                            Showing 1-{filteredBookings.length} of {filteredBookings.length} bookings
                        </span>
                        <div className="flex gap-2">
                            <button className="p-2 rounded-lg border border-lux-darkSec/20 hover:bg-white disabled:opacity-50 transition-colors" disabled>
                                <ChevronLeft size={16} />
                            </button>
                            <button className="p-2 rounded-lg border border-lux-darkSec/20 hover:bg-white disabled:opacity-50 transition-colors" disabled>
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </GlassCard>

                {/* Detail Modal */}
                {selectedBooking && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                        <GlassCard className="w-full max-w-5xl p-0 overflow-hidden flex flex-col max-h-[90vh]">
                            {/* Modal Header */}
                            <div className="p-6 border-b border-lux-darkSec/10 bg-white/60 flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-2xl font-serif font-bold text-lux-dark">Booking {selectedBooking.id}</h2>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wide ${getStatusColor(selectedBooking.status)}`}>
                                            {selectedBooking.status}
                                        </span>
                                    </div>
                                    <p className="text-lux-darkSec mt-1 flex items-center gap-2 text-sm">
                                        <Calendar size={14} /> {selectedBooking.date} at {selectedBooking.time} • {selectedBooking.type}
                                    </p>
                                </div>
                                <button 
                                    onClick={() => setSelectedBooking(null)}
                                    className="p-2 hover:bg-black/5 rounded-full transition-colors"
                                >
                                    <X size={24} className="text-lux-darkSec" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-white/40">
                                
                                <div className="grid lg:grid-cols-3 gap-8">
                                    
                                    {/* Left Column: Route & People */}
                                    <div className="lg:col-span-2 space-y-6">
                                        
                                        {/* Route Card */}
                                        <div className="p-6 rounded-xl bg-white/60 border border-white shadow-sm relative overflow-hidden">
                                            <div className="absolute right-0 top-0 p-4 opacity-10">
                                                <MapPin size={100} />
                                            </div>
                                            <div className="relative z-10 flex flex-col gap-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex flex-col items-center gap-1 mt-1">
                                                        <div className="w-3 h-3 rounded-full bg-lux-gold shadow-md"></div>
                                                        <div className="w-0.5 h-12 bg-lux-gold/30"></div>
                                                        <div className="w-3 h-3 rounded-full bg-lux-dark shadow-md"></div>
                                                    </div>
                                                    <div className="flex-1 space-y-6">
                                                        <div>
                                                            <p className="text-xs font-bold text-lux-darkSec uppercase mb-1">Pickup</p>
                                                            <p className="text-lg font-bold text-lux-dark">{selectedBooking.pickup}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold text-lux-darkSec uppercase mb-1">Dropoff</p>
                                                            <p className="text-lg font-bold text-lux-dark">{selectedBooking.dropoff}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Users */}
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {/* Member */}
                                            <div className="p-4 rounded-xl bg-white/50 border border-white/60">
                                                <p className="text-xs font-bold text-lux-darkSec uppercase mb-3 flex items-center gap-2">
                                                    <User size={14} /> Member
                                                </p>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-lux-primary/10 flex items-center justify-center text-lux-primary font-bold">
                                                        {selectedBooking.member.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-lux-dark">{selectedBooking.member}</p>
                                                        <p className="text-xs text-lux-darkSec">{selectedBooking.memberId} • {selectedBooking.tier}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Driver */}
                                            <div className="p-4 rounded-xl bg-white/50 border border-white/60">
                                                <p className="text-xs font-bold text-lux-darkSec uppercase mb-3 flex items-center gap-2">
                                                    <Car size={14} /> Chauffeur
                                                </p>
                                                {selectedBooking.driver !== 'Pending' ? (
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-lux-gold/10 flex items-center justify-center text-lux-gold font-bold">
                                                            {selectedBooking.driver.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-lux-dark">{selectedBooking.driver}</p>
                                                            <p className="text-xs text-lux-darkSec">{selectedBooking.driverId}</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p className="text-sm font-bold text-amber-600 italic">Not Assigned</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Rating/Feedback (if any) */}
                                        {selectedBooking.rating && (
                                            <div className="p-4 rounded-xl bg-lux-gold/5 border border-lux-gold/20">
                                                <div className="flex justify-between items-center mb-2">
                                                    <h4 className="font-bold text-lux-dark text-sm">Trip Feedback</h4>
                                                    <div className="flex text-lux-gold">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} size={14} fill={i < selectedBooking.rating! ? "currentColor" : "none"} />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-lux-darkSec italic">"Excellent service, very smooth ride."</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right Column: Timeline & Financials */}
                                    <div className="space-y-6">
                                        
                                        <div className="p-6 rounded-xl bg-white/50 border border-white/60">
                                            <h4 className="font-bold text-lux-dark mb-4 text-sm uppercase">Financial Breakdown</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-lux-darkSec">Base Fare</span>
                                                    <span className="font-bold text-lux-dark">${(selectedBooking.revenue * 0.8).toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-lux-darkSec">Taxes & Fees</span>
                                                    <span className="font-bold text-lux-dark">${(selectedBooking.revenue * 0.1).toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-lux-darkSec">Tip</span>
                                                    <span className="font-bold text-lux-dark">${(selectedBooking.revenue * 0.1).toFixed(2)}</span>
                                                </div>
                                                <div className="h-px bg-lux-darkSec/10 my-2"></div>
                                                <div className="flex justify-between text-lg">
                                                    <span className="font-bold text-lux-dark">Total</span>
                                                    <span className="font-bold text-lux-gold">${selectedBooking.revenue.toFixed(2)}</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 p-2 rounded justify-center">
                                                <CheckCircle2 size={12} /> Payment Captured
                                            </div>
                                        </div>

                                        <div className="p-6 rounded-xl bg-white/50 border border-white/60">
                                            <h4 className="font-bold text-lux-dark mb-4 text-sm uppercase">Timeline</h4>
                                            <div className="space-y-4 relative">
                                                <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-lux-darkSec/10"></div>
                                                {[
                                                    { time: '09:00 AM', event: 'Booking Created' },
                                                    { time: '09:05 AM', event: 'Driver Assigned' },
                                                    { time: '02:15 PM', event: 'Driver On Route' },
                                                    { time: '02:30 PM', event: 'Trip Started' },
                                                    { time: '03:15 PM', event: 'Trip Completed' },
                                                ].map((log, i) => (
                                                    <div key={i} className="flex gap-3 text-xs relative z-10">
                                                        <div className="w-3 h-3 rounded-full bg-white border-2 border-lux-darkSec/30 shrink-0"></div>
                                                        <div className="flex-1">
                                                            <span className="text-lux-darkSec font-mono mr-2">{log.time}</span>
                                                            <span className="font-bold text-lux-dark">{log.event}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>

                            {/* Modal Footer (Actions) */}
                            <div className="p-6 bg-white/80 border-t border-white flex flex-wrap justify-between items-center gap-4">
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 font-bold text-sm flex items-center gap-2 transition-colors">
                                        <DollarSign size={16} /> Refund
                                    </button>
                                    <button className="px-4 py-2 rounded-lg border border-lux-darkSec/20 text-lux-dark hover:bg-white font-bold text-sm flex items-center gap-2 transition-colors">
                                        <ShieldAlert size={16} /> Dispute
                                    </button>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 rounded-lg border border-lux-darkSec/20 text-lux-dark hover:bg-white font-bold text-sm transition-colors flex items-center gap-2">
                                        <MessageSquare size={16} /> Contact Parties
                                    </button>
                                    <GradientButton className="px-6 py-2 text-sm">
                                        Force Complete
                                    </GradientButton>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                )}

            </div>
        </AdminLayout>
    );
};

export default AdminBookingsPage;