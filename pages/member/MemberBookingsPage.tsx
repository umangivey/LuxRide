import React, { useState } from 'react';
import { 
    Search, 
    Filter, 
    Download, 
    Repeat, 
    Eye, 
    Star, 
    Calendar, 
    MapPin, 
    ChevronLeft, 
    ChevronRight,
    ArrowUpDown,
    MoreVertical
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

type BookingStatus = 'Completed' | 'Upcoming' | 'Cancelled' | 'In Progress';

interface Booking {
    id: string;
    date: string;
    time: string;
    pickup: string;
    dropoff: string;
    driver: string;
    driverImage?: string;
    vehicle: string;
    price: number;
    status: BookingStatus;
    rating?: number;
}

const MemberBookingsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('All');
    const [sortConfig, setSortConfig] = useState<{ key: keyof Booking, direction: 'asc' | 'desc' }>({ key: 'date', direction: 'desc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Mock Data
    const bookings: Booking[] = [
        {
            id: 'LR-8821',
            date: '2023-10-26',
            time: '09:00 AM',
            pickup: 'The Ritz-Carlton, Atlanta',
            dropoff: 'Hartsfield-Jackson Intl (ATL)',
            driver: 'Michael C.',
            driverImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            vehicle: 'Mercedes-Benz S-Class',
            price: 145.00,
            status: 'Upcoming'
        },
        {
            id: 'LR-9932',
            date: '2023-11-02',
            time: '02:30 PM',
            pickup: 'Buckhead Plaza',
            dropoff: 'Porsche Experience Center',
            driver: 'Pending',
            vehicle: 'Cadillac Escalade',
            price: 195.00,
            status: 'Upcoming'
        },
        {
            id: 'LR-7743',
            date: '2023-10-20',
            time: '06:15 PM',
            pickup: 'ATL Airport',
            dropoff: 'Midtown Residence',
            driver: 'Sarah J.',
            driverImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            vehicle: 'Mercedes-Benz S-Class',
            price: 145.00,
            status: 'Completed',
            rating: 5
        },
        {
            id: 'LR-7710',
            date: '2023-10-15',
            time: '08:00 AM',
            pickup: 'Downtown Office',
            dropoff: 'Signature Flight Support',
            driver: 'David M.',
            driverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            vehicle: 'BMW 7 Series',
            price: 185.00,
            status: 'Completed',
            rating: 5
        },
        {
            id: 'LR-7688',
            date: '2023-10-12',
            time: '11:45 AM',
            pickup: 'St. Regis Atlanta',
            dropoff: 'Mercedes-Benz Stadium',
            driver: 'James W.',
            driverImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            vehicle: 'Lincoln Navigator',
            price: 125.00,
            status: 'Completed',
            rating: 4
        },
        {
            id: 'LR-7521',
            date: '2023-09-28',
            time: '04:00 PM',
            pickup: 'Lenox Square',
            dropoff: 'Alpharetta City Center',
            driver: 'Cancelled',
            vehicle: 'Mercedes-Benz S-Class',
            price: 0.00,
            status: 'Cancelled'
        },
        {
            id: 'LR-7499',
            date: '2023-09-25',
            time: '10:00 PM',
            pickup: 'Fox Theatre',
            dropoff: 'Ansley Park',
            driver: 'Michael C.',
            driverImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            vehicle: 'Mercedes-Benz S-Class',
            price: 95.00,
            status: 'Completed',
            rating: 5
        }
    ];

    // Filter Logic
    const filteredBookings = bookings.filter(b => {
        const matchesSearch = 
            b.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.dropoff.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.driver.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Sort Logic
    const sortedBookings = [...filteredBookings].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    // Pagination Logic
    const totalPages = Math.ceil(sortedBookings.length / itemsPerPage);
    const currentBookings = sortedBookings.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSort = (key: keyof Booking) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getStatusStyles = (status: BookingStatus) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
            case 'Upcoming': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Cancelled': return 'bg-red-50 text-red-600 border-red-200';
            case 'In Progress': return 'bg-lux-gold/20 text-lux-gold border-lux-gold/30';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in duration-500">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-lux-dark">Booking History</h1>
                        <p className="text-lux-darkSec mt-1">Manage and review your past and upcoming transfers.</p>
                    </div>
                    <GradientButton to="/book">
                        Book New Transfer
                    </GradientButton>
                </div>

                {/* Filters & Search */}
                <GlassCard className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-lux-darkSec/50" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by location, ID, or driver..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 border border-white/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-lux-gold text-sm transition-all"
                        />
                    </div>
                    
                    <div className="flex w-full md:w-auto gap-4 overflow-x-auto pb-2 md:pb-0">
                        <div className="relative min-w-[140px]">
                             <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-lux-darkSec/50" size={16} />
                             <select 
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/50 border border-white/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-lux-gold text-sm text-lux-dark appearance-none cursor-pointer"
                             >
                                 <option value="All">All Status</option>
                                 <option value="Upcoming">Upcoming</option>
                                 <option value="Completed">Completed</option>
                                 <option value="Cancelled">Cancelled</option>
                             </select>
                        </div>
                        {/* Date Filter could go here */}
                    </div>
                </GlassCard>

                {/* Table / List */}
                <GlassCard className="p-0 overflow-hidden min-h-[400px]">
                    {currentBookings.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-lux-primary/5 border-b border-lux-darkSec/5 text-xs font-bold text-lux-darkSec uppercase tracking-wider">
                                        <th className="p-4 cursor-pointer hover:text-lux-gold transition-colors" onClick={() => handleSort('date')}>
                                            <div className="flex items-center gap-1">Date <ArrowUpDown size={12} /></div>
                                        </th>
                                        <th className="p-4">Route</th>
                                        <th className="p-4">Driver & Vehicle</th>
                                        <th className="p-4 cursor-pointer hover:text-lux-gold transition-colors" onClick={() => handleSort('price')}>
                                            <div className="flex items-center gap-1">Amount <ArrowUpDown size={12} /></div>
                                        </th>
                                        <th className="p-4 cursor-pointer hover:text-lux-gold transition-colors" onClick={() => handleSort('status')}>
                                            <div className="flex items-center gap-1">Status <ArrowUpDown size={12} /></div>
                                        </th>
                                        <th className="p-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {currentBookings.map((booking) => (
                                        <tr key={booking.id} className="border-b border-lux-darkSec/5 hover:bg-white/40 transition-colors">
                                            <td className="p-4 whitespace-nowrap">
                                                <div className="font-bold text-lux-dark">{new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                                                <div className="text-lux-darkSec text-xs">{booking.time}</div>
                                                <div className="text-xs text-lux-darkSec/50 font-mono mt-1">{booking.id}</div>
                                            </td>
                                            <td className="p-4 max-w-xs">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2 truncate">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-lux-gold shrink-0"></div>
                                                        <span className="truncate text-lux-dark font-medium">{booking.pickup}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 truncate">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-lux-darkSec/30 shrink-0"></div>
                                                        <span className="truncate text-lux-dark font-medium">{booking.dropoff}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    {booking.driver !== 'Cancelled' && booking.driver !== 'Pending' ? (
                                                         <img 
                                                            src={booking.driverImage} 
                                                            alt={booking.driver} 
                                                            className="w-8 h-8 rounded-full object-cover border border-white shadow-sm"
                                                         />
                                                    ) : (
                                                        <div className="w-8 h-8 rounded-full bg-lux-darkSec/10 flex items-center justify-center text-xs font-bold text-lux-darkSec">
                                                            {booking.driver.charAt(0)}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="font-bold text-lux-dark">{booking.driver}</div>
                                                        <div className="text-xs text-lux-darkSec">{booking.vehicle}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 font-bold text-lux-dark">
                                                ${booking.price.toFixed(2)}
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusStyles(booking.status)}`}>
                                                    {booking.status}
                                                </span>
                                                {booking.rating && (
                                                    <div className="flex items-center gap-0.5 mt-1 text-lux-gold">
                                                        <Star size={10} fill="currentColor" />
                                                        <span className="text-xs font-bold">{booking.rating}.0</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {booking.status === 'Completed' && (
                                                        <>
                                                            <button title="Rebook" className="p-2 rounded-full hover:bg-lux-gold/10 hover:text-lux-gold text-lux-darkSec transition-colors">
                                                                <Repeat size={16} />
                                                            </button>
                                                            <button title="Receipt" className="p-2 rounded-full hover:bg-lux-gold/10 hover:text-lux-gold text-lux-darkSec transition-colors">
                                                                <Download size={16} />
                                                            </button>
                                                        </>
                                                    )}
                                                    <button title="Details" className="p-2 rounded-full hover:bg-lux-primary/10 hover:text-lux-primary text-lux-darkSec transition-colors">
                                                        <Eye size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-16 h-16 bg-lux-primary/5 rounded-full flex items-center justify-center mb-4 text-lux-darkSec">
                                <Search size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-lux-dark mb-2">No bookings found</h3>
                            <p className="text-lux-darkSec mb-6">Try adjusting your filters or book a new transfer.</p>
                            <GradientButton onClick={() => { setSearchTerm(''); setStatusFilter('All'); }}>
                                Clear Filters
                            </GradientButton>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="p-4 border-t border-lux-darkSec/10 flex items-center justify-between">
                             <span className="text-xs text-lux-darkSec font-medium">
                                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedBookings.length)} of {sortedBookings.length} results
                             </span>
                             <div className="flex gap-2">
                                 <button 
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg border border-lux-darkSec/20 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                 >
                                     <ChevronLeft size={16} />
                                 </button>
                                 <button 
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg border border-lux-darkSec/20 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                 >
                                     <ChevronRight size={16} />
                                 </button>
                             </div>
                        </div>
                    )}
                </GlassCard>

            </div>
        </DashboardLayout>
    );
};

export default MemberBookingsPage;