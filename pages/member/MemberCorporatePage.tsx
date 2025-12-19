import React, { useState } from 'react';
import {
    Users,
    UserPlus,
    Briefcase,
    DollarSign,
    PieChart,
    Download,
    Settings,
    Shield,
    CheckCircle2,
    XCircle,
    MoreVertical,
    FileText,
    TrendingUp,
    AlertCircle,
    CreditCard,
    Trash2,
    Edit2,
    Map
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Member';
    department: string;
    spend: number;
    status: 'Active' | 'Pending' | 'Suspended';
    lastActive: string;
}

const MemberCorporatePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'team' | 'billing' | 'settings'>('team');
    const [showInviteForm, setShowInviteForm] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');

    // Mock Data
    const [team, setTeam] = useState<TeamMember[]>([
        { id: '1', name: 'James Sterling', email: 'james.sterling@example.com', role: 'Admin', department: 'Executive', spend: 450.00, status: 'Active', lastActive: 'Today, 9:00 AM' },
        { id: '2', name: 'Sarah Connor', email: 'sarah.c@example.com', role: 'Member', department: 'Sales', spend: 1250.00, status: 'Active', lastActive: 'Yesterday' },
        { id: '3', name: 'Michael Ross', email: 'm.ross@example.com', role: 'Member', department: 'Legal', spend: 0.00, status: 'Pending', lastActive: '-' },
        { id: '4', name: 'Jessica Pearson', email: 'j.pearson@example.com', role: 'Member', department: 'Executive', spend: 890.50, status: 'Active', lastActive: 'Oct 22' },
    ]);

    const [rules, setRules] = useState({
        dailyLimit: 500,
        approvalThreshold: 200,
        restrictedRoutes: false,
        requireCostCenter: true
    });

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        const newMember: TeamMember = {
            id: Math.random().toString(),
            name: 'Pending User',
            email: inviteEmail,
            role: 'Member',
            department: 'Unassigned',
            spend: 0,
            status: 'Pending',
            lastActive: '-'
        };
        setTeam([...team, newMember]);
        setInviteEmail('');
        setShowInviteForm(false);
    };

    const handleDelete = (id: string) => {
        if(window.confirm('Remove this user from the corporate account?')) {
            setTeam(team.filter(t => t.id !== id));
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto pb-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-serif font-bold text-lux-dark">Corporate Account</h1>
                            <span className="px-3 py-1 rounded-full bg-lux-gold/10 text-lux-gold text-xs font-bold uppercase tracking-wide border border-lux-gold/20">
                                Executive Tier
                            </span>
                        </div>
                        <p className="text-lux-darkSec mt-1">Manage your team, expenses, and travel policies.</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white/40 p-1 rounded-full border border-white/60">
                        {['team', 'billing', 'settings'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`
                                    px-4 py-2 rounded-full text-sm font-bold transition-all
                                    ${activeTab === tab 
                                        ? 'bg-lux-gold text-white shadow-md' 
                                        : 'text-lux-darkSec hover:text-lux-dark hover:bg-white/50'}
                                `}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Areas */}
                {activeTab === 'team' && (
                    <div className="space-y-8 animate-in slide-in-from-bottom-2">
                        {/* Stats Row */}
                        <div className="grid sm:grid-cols-3 gap-6">
                            <GlassCard className="p-6 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-lux-primary/10 flex items-center justify-center text-lux-primary">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-lux-darkSec uppercase">Total Members</p>
                                    <p className="text-2xl font-bold text-lux-dark">{team.length}</p>
                                </div>
                            </GlassCard>
                            <GlassCard className="p-6 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-lux-darkSec uppercase">Active Now</p>
                                    <p className="text-2xl font-bold text-lux-dark">
                                        {team.filter(t => t.status === 'Active').length}
                                    </p>
                                </div>
                            </GlassCard>
                            <GlassCard className="p-6 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-lux-gold/10 flex items-center justify-center text-lux-gold">
                                    <UserPlus size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-lux-darkSec uppercase">Pending Invites</p>
                                    <p className="text-2xl font-bold text-lux-dark">
                                        {team.filter(t => t.status === 'Pending').length}
                                    </p>
                                </div>
                            </GlassCard>
                        </div>

                        {/* Team List */}
                        <GlassCard className="p-0 overflow-hidden">
                            <div className="p-6 border-b border-lux-darkSec/5 flex justify-between items-center bg-white/40">
                                <h3 className="text-lg font-bold text-lux-dark">Team Members</h3>
                                <GradientButton onClick={() => setShowInviteForm(!showInviteForm)} className="px-4 py-2 text-xs">
                                    <span className="flex items-center gap-2">
                                        <PlusIcon size={16} />
                                        Invite Member
                                    </span>
                                </GradientButton>
                            </div>

                            {showInviteForm && (
                                <div className="p-6 bg-lux-primary/5 border-b border-lux-darkSec/5 animate-in slide-in-from-top-2">
                                    <form onSubmit={handleInvite} className="flex gap-4 items-end">
                                        <div className="flex-1 space-y-2">
                                            <label className="text-sm font-bold text-lux-dark ml-1">Email Address</label>
                                            <input 
                                                type="email" 
                                                required
                                                value={inviteEmail}
                                                onChange={(e) => setInviteEmail(e.target.value)}
                                                placeholder="colleague@company.com"
                                                className="w-full px-4 py-2 rounded-xl bg-white border border-lux-darkSec/10 focus:ring-1 focus:ring-lux-gold outline-none"
                                            />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <label className="text-sm font-bold text-lux-dark ml-1">Department (Optional)</label>
                                            <select className="w-full px-4 py-2 rounded-xl bg-white border border-lux-darkSec/10 focus:ring-1 focus:ring-lux-gold outline-none">
                                                <option>Unassigned</option>
                                                <option>Sales</option>
                                                <option>Executive</option>
                                                <option>Legal</option>
                                                <option>Marketing</option>
                                            </select>
                                        </div>
                                        <button className="px-6 py-2.5 rounded-full bg-lux-gold text-white font-bold hover:bg-lux-primary transition-colors">
                                            Send Invite
                                        </button>
                                    </form>
                                </div>
                            )}

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-lux-primary/5 text-xs font-bold text-lux-darkSec uppercase">
                                        <tr>
                                            <th className="p-4 pl-6">Member</th>
                                            <th className="p-4">Role</th>
                                            <th className="p-4">Department</th>
                                            <th className="p-4">Spend (Mo)</th>
                                            <th className="p-4">Status</th>
                                            <th className="p-4 text-right pr-6">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {team.map((member) => (
                                            <tr key={member.id} className="border-b border-lux-darkSec/5 hover:bg-white/40 transition-colors">
                                                <td className="p-4 pl-6">
                                                    <div>
                                                        <p className="font-bold text-lux-dark">{member.name}</p>
                                                        <p className="text-xs text-lux-darkSec">{member.email}</p>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-0.5 rounded text-xs font-bold border ${
                                                        member.role === 'Admin' 
                                                            ? 'bg-lux-gold/10 text-lux-gold border-lux-gold/20' 
                                                            : 'bg-gray-100 text-gray-600 border-gray-200'
                                                    }`}>
                                                        {member.role}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-lux-darkSec font-medium">
                                                    {member.department}
                                                </td>
                                                <td className="p-4 font-bold text-lux-dark">
                                                    ${member.spend.toFixed(2)}
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-2 h-2 rounded-full ${
                                                            member.status === 'Active' ? 'bg-green-500' : 
                                                            member.status === 'Pending' ? 'bg-amber-400' : 'bg-red-500'
                                                        }`}></div>
                                                        <span className="text-lux-darkSec">{member.status}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 pr-6 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button className="p-2 rounded-full hover:bg-lux-primary/10 text-lux-darkSec hover:text-lux-primary transition-colors">
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(member.id)}
                                                            className="p-2 rounded-full hover:bg-red-50 text-lux-darkSec hover:text-red-600 transition-colors"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </GlassCard>
                    </div>
                )}

                {activeTab === 'billing' && (
                    <div className="space-y-8 animate-in slide-in-from-bottom-2">
                        {/* Summary Cards */}
                         <div className="grid md:grid-cols-2 gap-6">
                            <GlassCard className="p-6">
                                <h3 className="text-lg font-bold text-lux-dark mb-4 flex items-center gap-2">
                                    <DollarSign size={20} className="text-lux-gold" />
                                    Monthly Spend
                                </h3>
                                <div className="flex items-end gap-4 mb-4">
                                    <span className="text-4xl font-serif font-bold text-lux-dark">$2,590.50</span>
                                    <span className="text-sm font-bold text-green-600 mb-2 flex items-center gap-1">
                                        <TrendingUp size={14} /> +12%
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-lux-primary w-[65%]"></div>
                                </div>
                                <p className="text-xs text-lux-darkSec mt-2">65% of monthly budget utilized</p>
                            </GlassCard>

                            <GlassCard className="p-6">
                                <h3 className="text-lg font-bold text-lux-dark mb-4 flex items-center gap-2">
                                    <PieChart size={20} className="text-lux-gold" />
                                    Cost Center Breakdown
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-lux-dark font-medium flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full bg-lux-gold"></span> Sales
                                        </span>
                                        <span className="font-bold text-lux-dark">$1,250.00</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-lux-dark font-medium flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full bg-lux-primary"></span> Executive
                                        </span>
                                        <span className="font-bold text-lux-dark">$1,340.50</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-lux-dark font-medium flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full bg-gray-300"></span> Other
                                        </span>
                                        <span className="font-bold text-lux-dark">$0.00</span>
                                    </div>
                                </div>
                            </GlassCard>
                         </div>

                         {/* Reports Section */}
                         <GlassCard className="p-8">
                             <div className="flex justify-between items-center mb-6">
                                 <div>
                                     <h3 className="text-xl font-bold text-lux-dark">Reports & Invoices</h3>
                                     <p className="text-lux-darkSec text-sm">Download detailed usage reports for accounting.</p>
                                 </div>
                                 <GradientButton className="px-6">
                                     <span className="flex items-center gap-2">
                                         <Download size={18} />
                                         Export CSV
                                     </span>
                                 </GradientButton>
                             </div>
                             
                             <div className="grid gap-4">
                                 {[
                                     { name: 'October 2023 Statement', size: '1.2 MB', date: 'Nov 01, 2023' },
                                     { name: 'September 2023 Statement', size: '1.1 MB', date: 'Oct 01, 2023' },
                                     { name: 'Q3 2023 Executive Summary', size: '4.5 MB', date: 'Oct 05, 2023' },
                                 ].map((file, i) => (
                                     <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/40 border border-white/60 hover:bg-white/60 transition-colors group">
                                         <div className="flex items-center gap-4">
                                             <div className="w-10 h-10 rounded bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs">PDF</div>
                                             <div>
                                                 <p className="font-bold text-lux-dark group-hover:text-lux-gold transition-colors">{file.name}</p>
                                                 <p className="text-xs text-lux-darkSec">{file.date} • {file.size}</p>
                                             </div>
                                         </div>
                                         <button className="p-2 rounded-full hover:bg-lux-primary/10 text-lux-darkSec hover:text-lux-primary">
                                             <Download size={18} />
                                         </button>
                                     </div>
                                 ))}
                             </div>
                         </GlassCard>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="grid md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-2">
                        <GlassCard className="p-8 h-full">
                            <h3 className="text-xl font-bold text-lux-dark mb-6 flex items-center gap-2">
                                <Shield size={22} className="text-lux-gold" />
                                Usage Rules & Limits
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-sm font-bold text-lux-dark mb-2 block">Daily Transfer Limit (per user)</label>
                                    <div className="flex items-center gap-4">
                                        <div className="relative flex-1">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lux-darkSec font-bold">$</span>
                                            <input 
                                                type="number" 
                                                value={rules.dailyLimit}
                                                onChange={(e) => setRules({...rules, dailyLimit: parseInt(e.target.value)})}
                                                className="w-full pl-8 pr-4 py-3 rounded-xl bg-white/50 border border-lux-darkSec/10 focus:ring-1 focus:ring-lux-gold outline-none"
                                            />
                                        </div>
                                        <span className="text-sm text-lux-darkSec">USD</span>
                                    </div>
                                    <p className="text-xs text-lux-darkSec mt-2">Transfers exceeding this amount will be blocked.</p>
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-lux-dark mb-2 block">Manager Approval Threshold</label>
                                    <div className="flex items-center gap-4">
                                        <div className="relative flex-1">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lux-darkSec font-bold">$</span>
                                            <input 
                                                type="number" 
                                                value={rules.approvalThreshold}
                                                onChange={(e) => setRules({...rules, approvalThreshold: parseInt(e.target.value)})}
                                                className="w-full pl-8 pr-4 py-3 rounded-xl bg-white/50 border border-lux-darkSec/10 focus:ring-1 focus:ring-lux-gold outline-none"
                                            />
                                        </div>
                                        <span className="text-sm text-lux-darkSec">USD</span>
                                    </div>
                                    <p className="text-xs text-lux-darkSec mt-2">Bookings over this amount require Admin approval.</p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="p-8 h-full">
                            <h3 className="text-xl font-bold text-lux-dark mb-6 flex items-center gap-2">
                                <Map size={22} className="text-lux-gold" />
                                Route & Cost Policies
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/40 border border-white/60">
                                    <div>
                                        <p className="font-bold text-lux-dark text-sm">Restrict to Service Area</p>
                                        <p className="text-xs text-lux-darkSec">Block long-distance bookings (>50mi)</p>
                                    </div>
                                    <button 
                                        onClick={() => setRules({...rules, restrictedRoutes: !rules.restrictedRoutes})}
                                        className={`relative w-12 h-6 rounded-full transition-colors ${rules.restrictedRoutes ? 'bg-lux-gold' : 'bg-gray-300'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${rules.restrictedRoutes ? 'left-7' : 'left-1'}`}></div>
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/40 border border-white/60">
                                    <div>
                                        <p className="font-bold text-lux-dark text-sm">Mandatory Cost Center</p>
                                        <p className="text-xs text-lux-darkSec">Require cost center code for every booking</p>
                                    </div>
                                    <button 
                                        onClick={() => setRules({...rules, requireCostCenter: !rules.requireCostCenter})}
                                        className={`relative w-12 h-6 rounded-full transition-colors ${rules.requireCostCenter ? 'bg-lux-gold' : 'bg-gray-300'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${rules.requireCostCenter ? 'left-7' : 'left-1'}`}></div>
                                    </button>
                                </div>
                            </div>
                            
                            <div className="mt-8 pt-6 border-t border-lux-darkSec/10">
                                <GradientButton fullWidth>Save Policy Changes</GradientButton>
                            </div>
                        </GlassCard>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

// Helper
const PlusIcon = ({ size }: { size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);

export default MemberCorporatePage;