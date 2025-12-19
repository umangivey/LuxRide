import React, { useState } from 'react';
import { 
    Search, 
    Filter, 
    Download, 
    MoreVertical, 
    User, 
    Mail, 
    Phone, 
    Calendar, 
    CreditCard, 
    History, 
    Shield, 
    AlertTriangle, 
    CheckCircle2, 
    XCircle,
    ChevronLeft,
    ChevronRight,
    Edit,
    MessageSquare,
    Ban
} from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

interface Member {
    id: string;
    name: string;
    email: string;
    phone: string;
    tier: 'Essential' | 'Executive' | 'Royal';
    status: 'Active' | 'Suspended' | 'Cancelled';
    joinDate: string;
    tripsUsed: number;
    totalSpent: number;
    lastActive: string;
    notes: string;
}

const AdminMembersPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [tierFilter, setTierFilter] = useState('All');
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Mock Data
    const members: Member[] = [
        { id: '1', name: 'James Sterling', email: 'james.sterling@example.com', phone: '+1 (404) 555-0123', tier: 'Executive', status: 'Active', joinDate: '2023-01-15', tripsUsed: 45, totalSpent: 5200, lastActive: '2 hours ago', notes: 'VIP client, prefers S-Class.' },
        { id: '2', name: 'Sarah Connor', email: 'sarah.c@example.com', phone: '+1 (404) 555-0124', tier: 'Royal', status: 'Active', joinDate: '2022-11-20', tripsUsed: 120, totalSpent: 18500, lastActive: 'Yesterday', notes: '' },
        { id: '3', name: 'Michael Ross', email: 'm.ross@example.com', phone: '+1 (404) 555-0125', tier: 'Essential', status: 'Suspended', joinDate: '2023-05-10', tripsUsed: 8, totalSpent: 1200, lastActive: '3 days ago', notes: 'Payment failed multiple times.' },
        { id: '4', name: 'Elena Gilbert', email: 'elena.g@example.com', phone: '+1 (404) 555-0126', tier: 'Executive', status: 'Active', joinDate: '2023-08-01', tripsUsed: 12, totalSpent: 1450, lastActive: '1 week ago', notes: '' },
        { id: '5', name: 'Damon Salvatore', email: 'damon.s@example.com', phone: '+1 (404) 555-0127', tier: 'Royal', status: 'Cancelled', joinDate: '2021-03-12', tripsUsed: 250, totalSpent: 45000, lastActive: '1 month ago', notes: 'Moved out of state.' },
        { id: '6', name: 'Caroline Forbes', email: 'caroline.f@example.com', phone: '+1 (404) 555-0128', tier: 'Essential', status: 'Active', joinDate: '2023-09-15', tripsUsed: 5, totalSpent: 650, lastActive: 'Today', notes: '' },
    ];

    // Filter Logic
    const filteredMembers = members.filter(m => {
        const matchesSearch = 
            m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.phone.includes(searchTerm);
        const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
        const matchesTier = tierFilter === 'All' || m.tier === tierFilter;
        return matchesSearch && matchesStatus && matchesTier;
    });

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Active': return 'bg-green-100 text-green-700 border-green-200';
            case 'Suspended': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getTierColor = (tier: string) => {
        switch(tier) {
            case 'Royal': return 'bg-lux-dark text-white border-lux-dark';
            case 'Executive': return 'bg-lux-gold text-white border-lux-gold';
            case 'Essential': return 'bg-lux-primary/10 text-lux-primary border-lux-primary/20';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto pb-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-lux-dark">Members Management</h1>
                        <p className="text-lux-darkSec mt-1">View and manage member accounts, tiers, and statuses.</p>
                    </div>
                    <GradientButton className="px-4 py-2 text-sm">
                        <span className="flex items-center gap-2">
                            <Download size={16} /> Export List
                        </span>
                    </GradientButton>
                </div>

                {/* Filters */}
                <GlassCard className="p-4 flex flex-col lg:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full lg:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-lux-darkSec/50" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search name, email, phone..." 
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
                                <option value="Suspended">Suspended</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div className="relative min-w-[140px]">
                            <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-lux-darkSec/50" size={16} />
                            <select 
                                value={tierFilter}
                                onChange={(e) => setTierFilter(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/50 border border-white/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-lux-gold text-sm appearance-none cursor-pointer"
                            >
                                <option value="All">All Tiers</option>
                                <option value="Essential">Essential</option>
                                <option value="Executive">Executive</option>
                                <option value="Royal">Royal</option>
                            </select>
                        </div>
                    </div>
                </GlassCard>

                {/* Members Table */}
                <GlassCard className="p-0 overflow-hidden min-h-[500px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-lux-primary/5 border-b border-lux-darkSec/5 text-xs font-bold text-lux-darkSec uppercase tracking-wider">
                                    <th className="p-4 pl-6">Member</th>
                                    <th className="p-4">Contact</th>
                                    <th className="p-4">Tier</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Stats</th>
                                    <th className="p-4 text-right pr-6">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {filteredMembers.map((member) => (
                                    <tr 
                                        key={member.id} 
                                        onClick={() => setSelectedMember(member)}
                                        className="border-b border-lux-darkSec/5 hover:bg-white/40 transition-colors cursor-pointer"
                                    >
                                        <td className="p-4 pl-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-lux-primary/10 flex items-center justify-center text-lux-primary font-bold">
                                                    {member.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-lux-dark">{member.name}</p>
                                                    <p className="text-xs text-lux-darkSec">Joined {member.joinDate}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col gap-1 text-lux-darkSec">
                                                <span className="flex items-center gap-1.5"><Mail size={12} /> {member.email}</span>
                                                <span className="flex items-center gap-1.5"><Phone size={12} /> {member.phone}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${getTierColor(member.tier)}`}>
                                                {member.tier}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(member.status)}`}>
                                                {member.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-xs font-medium text-lux-darkSec">
                                                <p>Trips: <span className="font-bold text-lux-dark">{member.tripsUsed}</span></p>
                                                <p>Spent: <span className="font-bold text-lux-dark">${member.totalSpent.toLocaleString()}</span></p>
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
                            Showing 1-{filteredMembers.length} of {filteredMembers.length} members
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

                {/* Member Detail Modal */}
                {selectedMember && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                        <GlassCard className="w-full max-w-4xl p-0 overflow-hidden flex flex-col max-h-[90vh]">
                            {/* Modal Header */}
                            <div className="p-6 border-b border-lux-darkSec/10 bg-white/60 flex justify-between items-start">
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-full bg-lux-gold flex items-center justify-center text-3xl font-serif font-bold text-white shadow-lg">
                                        {selectedMember.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-lux-dark flex items-center gap-3">
                                            {selectedMember.name}
                                            <span className={`px-2 py-0.5 rounded text-xs border ${getTierColor(selectedMember.tier)}`}>
                                                {selectedMember.tier}
                                            </span>
                                        </h2>
                                        <p className="text-lux-darkSec mt-1 flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${selectedMember.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                            {selectedMember.status} • Member since {selectedMember.joinDate}
                                        </p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setSelectedMember(null)}
                                    className="p-2 hover:bg-black/5 rounded-full transition-colors"
                                >
                                    <XCircle size={24} className="text-lux-darkSec" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-white/40">
                                
                                <div className="grid md:grid-cols-3 gap-6">
                                    {/* Contact Info */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-lux-dark uppercase tracking-wide border-b border-lux-darkSec/10 pb-2">Contact Details</h3>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex items-center gap-3">
                                                <Mail size={16} className="text-lux-gold" />
                                                <span className="text-lux-dark">{selectedMember.email}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Phone size={16} className="text-lux-gold" />
                                                <span className="text-lux-dark">{selectedMember.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <History size={16} className="text-lux-gold" />
                                                <span className="text-lux-dark">Active {selectedMember.lastActive}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-lux-dark uppercase tracking-wide border-b border-lux-darkSec/10 pb-2">Usage Statistics</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-lux-darkSec">Total Trips</span>
                                                <span className="font-bold text-lux-dark">{selectedMember.tripsUsed}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-lux-darkSec">Lifetime Spend</span>
                                                <span className="font-bold text-lux-dark">${selectedMember.totalSpent.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-lux-darkSec">Avg Rating</span>
                                                <span className="font-bold text-lux-dark flex items-center gap-1">4.9 <span className="text-lux-gold">★</span></span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-lux-dark uppercase tracking-wide border-b border-lux-darkSec/10 pb-2">Billing</h3>
                                        <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-white/60">
                                            <CreditCard size={20} className="text-lux-primary" />
                                            <div>
                                                <p className="text-sm font-bold text-lux-dark">Visa ending in 4242</p>
                                                <p className="text-xs text-lux-darkSec">Expires 12/24</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Admin Notes */}
                                <div>
                                    <h3 className="text-sm font-bold text-lux-dark uppercase tracking-wide border-b border-lux-darkSec/10 pb-2 mb-4">Admin Notes</h3>
                                    <textarea 
                                        rows={3}
                                        className="w-full p-4 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none text-sm resize-none"
                                        placeholder="Add internal notes about this member..."
                                        defaultValue={selectedMember.notes}
                                    ></textarea>
                                </div>

                                {/* Booking History Snippet */}
                                <div>
                                    <h3 className="text-sm font-bold text-lux-dark uppercase tracking-wide border-b border-lux-darkSec/10 pb-2 mb-4">Recent Bookings</h3>
                                    <div className="space-y-2">
                                        {[1, 2].map((i) => (
                                            <div key={i} className="flex justify-between items-center p-3 bg-white/30 rounded-lg text-sm hover:bg-white/50 transition-colors">
                                                <div>
                                                    <span className="font-bold text-lux-dark">Trip #LR-882{i}</span>
                                                    <span className="mx-2 text-lux-darkSec/50">|</span>
                                                    <span className="text-lux-darkSec">Oct {20+i}, 2023</span>
                                                </div>
                                                <span className="font-bold text-green-600">$145.00</span>
                                            </div>
                                        ))}
                                        <button className="text-xs font-bold text-lux-primary hover:underline mt-2">View Full History</button>
                                    </div>
                                </div>

                            </div>

                            {/* Modal Footer (Actions) */}
                            <div className="p-6 bg-white/80 border-t border-white flex justify-between items-center gap-4">
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 font-bold text-sm flex items-center gap-2 transition-colors">
                                        <Ban size={16} /> Suspend
                                    </button>
                                    <button className="px-4 py-2 rounded-lg border border-lux-darkSec/20 text-lux-dark hover:bg-white font-bold text-sm flex items-center gap-2 transition-colors">
                                        <MessageSquare size={16} /> Message
                                    </button>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 rounded-lg border border-lux-darkSec/20 text-lux-dark hover:bg-white font-bold text-sm transition-colors">
                                        Reset Password
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

export default AdminMembersPage;