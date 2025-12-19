import React, { useState } from 'react';
import { 
    Search, 
    Filter, 
    Download, 
    MoreVertical, 
    User, 
    Car, 
    Star, 
    DollarSign, 
    Shield, 
    AlertTriangle, 
    CheckCircle2, 
    XCircle,
    ChevronLeft,
    ChevronRight,
    Edit,
    MessageSquare,
    Ban,
    FileText,
    TrendingUp,
    MapPin,
    AlertCircle
} from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

interface Driver {
    id: string;
    name: string;
    email: string;
    phone: string;
    vehicle: string;
    plate: string;
    status: 'Active' | 'Pending' | 'Suspended';
    rating: number;
    trips: number;
    monthEarnings: number;
    compliance: 'Compliant' | 'Docs Expiring' | 'Non-Compliant';
    joinDate: string;
    image: string;
}

const AdminDriversPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [complianceFilter, setComplianceFilter] = useState('All');
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
    
    // Mock Data
    const drivers: Driver[] = [
        { 
            id: 'DR-101', 
            name: 'Michael Chen', 
            email: 'michael.c@example.com', 
            phone: '+1 (404) 555-0199', 
            vehicle: 'Mercedes-Benz S-Class', 
            plate: 'LUX-8821', 
            status: 'Active', 
            rating: 4.9, 
            trips: 1240, 
            monthEarnings: 8920, 
            compliance: 'Compliant', 
            joinDate: '2021-05-12',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        { 
            id: 'DR-102', 
            name: 'Sarah Jenkins', 
            email: 'sarah.j@example.com', 
            phone: '+1 (404) 555-0200', 
            vehicle: 'Cadillac Escalade', 
            plate: 'LUX-9932', 
            status: 'Active', 
            rating: 5.0, 
            trips: 850, 
            monthEarnings: 7450, 
            compliance: 'Docs Expiring', 
            joinDate: '2022-01-20',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        { 
            id: 'DR-103', 
            name: 'David Miller', 
            email: 'david.m@example.com', 
            phone: '+1 (404) 555-0201', 
            vehicle: 'BMW 7 Series', 
            plate: 'LUX-7710', 
            status: 'Suspended', 
            rating: 3.8, 
            trips: 120, 
            monthEarnings: 1200, 
            compliance: 'Non-Compliant', 
            joinDate: '2023-03-15',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        { 
            id: 'DR-104', 
            name: 'James Wilson', 
            email: 'james.w@example.com', 
            phone: '+1 (404) 555-0202', 
            vehicle: 'Lincoln Navigator', 
            plate: 'LUX-7688', 
            status: 'Pending', 
            rating: 0, 
            trips: 0, 
            monthEarnings: 0, 
            compliance: 'Compliant', 
            joinDate: '2023-10-20',
            image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
    ];

    // Filter Logic
    const filteredDrivers = drivers.filter(d => {
        const matchesSearch = 
            d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            d.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.plate.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
        const matchesCompliance = complianceFilter === 'All' || d.compliance === complianceFilter;
        return matchesSearch && matchesStatus && matchesCompliance;
    });

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Active': return 'bg-green-100 text-green-700 border-green-200';
            case 'Pending': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Suspended': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getComplianceColor = (status: string) => {
        switch(status) {
            case 'Compliant': return 'text-green-600';
            case 'Docs Expiring': return 'text-amber-600 font-bold';
            case 'Non-Compliant': return 'text-red-600 font-bold';
            default: return 'text-gray-600';
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto pb-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-lux-dark">Drivers Management</h1>
                        <p className="text-lux-darkSec mt-1">Monitor fleet performance, compliance, and earnings.</p>
                    </div>
                    <GradientButton className="px-4 py-2 text-sm">
                        <span className="flex items-center gap-2">
                            <Download size={16} /> Export Data
                        </span>
                    </GradientButton>
                </div>

                {/* Filters */}
                <GlassCard className="p-4 flex flex-col lg:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full lg:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-lux-darkSec/50" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search name, vehicle, license plate..." 
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
                                <option value="Active">Active</option>
                                <option value="Pending">Pending</option>
                                <option value="Suspended">Suspended</option>
                            </select>
                        </div>
                        <div className="relative min-w-[140px]">
                            <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-lux-darkSec/50" size={16} />
                            <select 
                                value={complianceFilter}
                                onChange={(e) => setComplianceFilter(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/50 border border-white/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-lux-gold text-sm appearance-none cursor-pointer"
                            >
                                <option value="All">All Compliance</option>
                                <option value="Compliant">Compliant</option>
                                <option value="Docs Expiring">Docs Expiring</option>
                                <option value="Non-Compliant">Non-Compliant</option>
                            </select>
                        </div>
                    </div>
                </GlassCard>

                {/* Compliance Alerts Section (if any issues) */}
                {drivers.some(d => d.compliance !== 'Compliant') && (
                    <div className="grid md:grid-cols-2 gap-4">
                        {drivers.filter(d => d.compliance === 'Docs Expiring').length > 0 && (
                            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                                <div className="flex items-center gap-3 text-amber-800">
                                    <AlertTriangle size={20} />
                                    <span className="font-bold text-sm">
                                        {drivers.filter(d => d.compliance === 'Docs Expiring').length} Drivers have documents expiring soon
                                    </span>
                                </div>
                                <button className="text-xs font-bold text-amber-900 underline hover:no-underline">Review</button>
                            </div>
                        )}
                        {drivers.filter(d => d.compliance === 'Non-Compliant').length > 0 && (
                            <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between">
                                <div className="flex items-center gap-3 text-red-800">
                                    <AlertCircle size={20} />
                                    <span className="font-bold text-sm">
                                        {drivers.filter(d => d.compliance === 'Non-Compliant').length} Drivers non-compliant
                                    </span>
                                </div>
                                <button className="text-xs font-bold text-red-900 underline hover:no-underline">Action Required</button>
                            </div>
                        )}
                    </div>
                )}

                {/* Drivers Table */}
                <GlassCard className="p-0 overflow-hidden min-h-[500px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-lux-primary/5 border-b border-lux-darkSec/5 text-xs font-bold text-lux-darkSec uppercase tracking-wider">
                                    <th className="p-4 pl-6">Driver</th>
                                    <th className="p-4">Vehicle</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Performance</th>
                                    <th className="p-4">Compliance</th>
                                    <th className="p-4 text-right pr-6">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {filteredDrivers.map((driver) => (
                                    <tr 
                                        key={driver.id} 
                                        onClick={() => setSelectedDriver(driver)}
                                        className="border-b border-lux-darkSec/5 hover:bg-white/40 transition-colors cursor-pointer"
                                    >
                                        <td className="p-4 pl-6">
                                            <div className="flex items-center gap-3">
                                                <img src={driver.image} alt={driver.name} className="w-10 h-10 rounded-full object-cover border border-white shadow-sm" />
                                                <div>
                                                    <p className="font-bold text-lux-dark">{driver.name}</p>
                                                    <p className="text-xs text-lux-darkSec">{driver.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div>
                                                <p className="font-medium text-lux-dark">{driver.vehicle}</p>
                                                <p className="text-xs text-lux-darkSec font-mono">{driver.plate}</p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(driver.status)}`}>
                                                {driver.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-4 text-xs font-medium text-lux-darkSec">
                                                <div className="flex items-center gap-1">
                                                    <Star size={12} className="text-lux-gold fill-lux-gold" />
                                                    <span className="font-bold text-lux-dark">{driver.rating > 0 ? driver.rating : '-'}</span>
                                                </div>
                                                <div>{driver.trips} Trips</div>
                                                <div className="font-bold text-green-600">${driver.monthEarnings.toLocaleString()}</div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className={`flex items-center gap-1.5 text-xs ${getComplianceColor(driver.compliance)}`}>
                                                {driver.compliance === 'Compliant' ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
                                                {driver.compliance}
                                            </div>
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
                            Showing 1-{filteredDrivers.length} of {filteredDrivers.length} drivers
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

                {/* Driver Detail Modal */}
                {selectedDriver && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                        <GlassCard className="w-full max-w-4xl p-0 overflow-hidden flex flex-col max-h-[90vh]">
                            {/* Modal Header */}
                            <div className="p-6 border-b border-lux-darkSec/10 bg-white/60 flex justify-between items-start">
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <img src={selectedDriver.image} alt={selectedDriver.name} className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg" />
                                        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${selectedDriver.status === 'Active' ? 'bg-green-500' : selectedDriver.status === 'Pending' ? 'bg-blue-500' : 'bg-red-500'}`}>
                                            {selectedDriver.status === 'Active' && <CheckCircle2 size={12} className="text-white" />}
                                            {selectedDriver.status === 'Pending' && <User size={12} className="text-white" />}
                                            {selectedDriver.status === 'Suspended' && <Ban size={12} className="text-white" />}
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-lux-dark flex items-center gap-3">
                                            {selectedDriver.name}
                                            <span className="flex items-center gap-1 text-sm font-normal bg-lux-gold/10 text-lux-gold px-2 py-0.5 rounded border border-lux-gold/20">
                                                <Star size={12} fill="currentColor" /> {selectedDriver.rating}
                                            </span>
                                        </h2>
                                        <p className="text-lux-darkSec mt-1 flex items-center gap-2 text-sm">
                                            Joined {selectedDriver.joinDate} • ID: {selectedDriver.id}
                                        </p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setSelectedDriver(null)}
                                    className="p-2 hover:bg-black/5 rounded-full transition-colors"
                                >
                                    <XCircle size={24} className="text-lux-darkSec" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-white/40">
                                
                                <div className="grid md:grid-cols-3 gap-6">
                                    {/* Vehicle Info */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-lux-dark uppercase tracking-wide border-b border-lux-darkSec/10 pb-2">Vehicle Details</h3>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex items-center gap-3">
                                                <Car size={16} className="text-lux-gold" />
                                                <span className="font-bold text-lux-dark">{selectedDriver.vehicle}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs font-bold text-gray-600 border">
                                                    {selectedDriver.plate}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-lux-dark uppercase tracking-wide border-b border-lux-darkSec/10 pb-2">Performance</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-lux-darkSec">Total Trips</span>
                                                <span className="font-bold text-lux-dark">{selectedDriver.trips}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-lux-darkSec">Month Earnings</span>
                                                <span className="font-bold text-green-600">${selectedDriver.monthEarnings.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-lux-darkSec">Compliance</span>
                                                <span className={`font-bold ${getComplianceColor(selectedDriver.compliance)}`}>{selectedDriver.compliance}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Document Status */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-lux-dark uppercase tracking-wide border-b border-lux-darkSec/10 pb-2">Documents</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between items-center">
                                                <span className="text-lux-darkSec">License</span>
                                                <span className="text-green-600 font-bold text-xs flex items-center gap-1"><CheckCircle2 size={12} /> Valid</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-lux-darkSec">Insurance</span>
                                                <span className="text-green-600 font-bold text-xs flex items-center gap-1"><CheckCircle2 size={12} /> Valid</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-lux-darkSec">Background</span>
                                                <span className="text-green-600 font-bold text-xs flex items-center gap-1"><CheckCircle2 size={12} /> Clear</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Feedback */}
                                <div>
                                    <h3 className="text-sm font-bold text-lux-dark uppercase tracking-wide border-b border-lux-darkSec/10 pb-2 mb-4">Recent Feedback</h3>
                                    <div className="space-y-3">
                                        <div className="p-3 bg-white/50 rounded-xl border border-white/60">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-xs font-bold text-lux-gold flex items-center gap-1">
                                                    <Star size={10} fill="currentColor" /> 5.0
                                                </span>
                                                <span className="text-xs text-lux-darkSec">2 days ago</span>
                                            </div>
                                            <p className="text-sm text-lux-dark italic">"Michael was extremely professional and arrived early. Pristine vehicle."</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Modal Footer (Actions) */}
                            <div className="p-6 bg-white/80 border-t border-white flex flex-wrap justify-between items-center gap-4">
                                <div className="flex gap-2">
                                    {selectedDriver.status === 'Pending' ? (
                                        <>
                                            <button className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 font-bold text-sm flex items-center gap-2 transition-colors">
                                                <CheckCircle2 size={16} /> Approve
                                            </button>
                                            <button className="px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 font-bold text-sm flex items-center gap-2 transition-colors">
                                                <XCircle size={16} /> Reject
                                            </button>
                                        </>
                                    ) : (
                                        <button className="px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 font-bold text-sm flex items-center gap-2 transition-colors">
                                            <Ban size={16} /> Suspend
                                        </button>
                                    )}
                                    <button className="px-4 py-2 rounded-lg border border-lux-darkSec/20 text-lux-dark hover:bg-white font-bold text-sm flex items-center gap-2 transition-colors">
                                        <MessageSquare size={16} /> Message
                                    </button>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 rounded-lg border border-lux-darkSec/20 text-lux-dark hover:bg-white font-bold text-sm transition-colors flex items-center gap-2">
                                        <FileText size={16} /> Docs
                                    </button>
                                    <button className="px-4 py-2 rounded-lg border border-lux-darkSec/20 text-lux-dark hover:bg-white font-bold text-sm transition-colors flex items-center gap-2">
                                        <DollarSign size={16} /> Payout
                                    </button>
                                    <GradientButton className="px-6 py-2 text-sm">
                                        Save Changes
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

export default AdminDriversPage;