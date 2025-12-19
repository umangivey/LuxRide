import React, { useState } from 'react';
import { 
    Download, 
    Calendar, 
    TrendingUp, 
    TrendingDown, 
    DollarSign, 
    CreditCard, 
    AlertTriangle, 
    ArrowUpRight,
    ArrowDownRight,
    Wallet,
    PieChart,
    BarChart3,
    RefreshCw,
    CheckCircle2
} from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

const AdminRevenuePage: React.FC = () => {
    const [dateRange, setDateRange] = useState('This Month');

    // Mock Data
    const financialSummary = {
        totalRevenue: 245850.00,
        platformNet: 86047.50,
        driverPayouts: 159802.50,
        surgeFees: 12450.00
    };

    const tierStats = [
        { name: 'Essential', count: 2450, arr: 585550, color: 'from-lux-secondary to-gray-600', churn: 2.1 },
        { name: 'Executive', count: 1890, arr: 1131920, color: 'from-lux-gold to-yellow-600', churn: 1.5 },
        { name: 'Royal', count: 420, arr: 755580, color: 'from-lux-dark to-gray-800', churn: 0.8 },
    ];

    const recentIssues = [
        { id: 'TXN-9921', user: 'James Sterling', type: 'Failed Payment', amount: '$499.00', date: 'Oct 24, 10:00 AM' },
        { id: 'TXN-9920', user: 'Sarah Connor', type: 'Refund Request', amount: '$145.00', date: 'Oct 23, 2:30 PM' },
    ];

    const payouts = [
        { id: 'PO-8821', driver: 'Michael Chen', amount: '$1,240.50', status: 'Processing', date: 'Oct 25' },
        { id: 'PO-8822', driver: 'Sarah Jenkins', amount: '$980.00', status: 'Scheduled', date: 'Oct 30' },
        { id: 'PO-8823', driver: 'David Miller', amount: '$450.25', status: 'Scheduled', date: 'Oct 30' },
    ];

    return (
        <AdminLayout>
            <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto pb-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-lux-dark">Revenue & Billing</h1>
                        <p className="text-lux-darkSec mt-1">Financial overview, subscription analytics, and payout management.</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <select 
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="appearance-none bg-white/50 border border-white/60 px-4 py-2 pr-10 rounded-xl text-lux-dark font-bold text-sm focus:outline-none focus:ring-1 focus:ring-lux-gold cursor-pointer"
                            >
                                <option>This Month</option>
                                <option>Last Month</option>
                                <option>This Quarter</option>
                                <option>Year to Date</option>
                            </select>
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-lux-darkSec pointer-events-none" size={16} />
                        </div>
                        <GradientButton className="px-4 py-2 text-sm">
                            <span className="flex items-center gap-2">
                                <Download size={16} /> Export Report
                            </span>
                        </GradientButton>
                    </div>
                </div>

                {/* Main KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <GlassCard className="p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 bg-gradient-to-br from-lux-gold to-lux-primary rounded-bl-3xl group-hover:scale-110 transition-transform duration-500">
                            <DollarSign size={32} />
                        </div>
                        <p className="text-xs font-bold text-lux-darkSec uppercase tracking-wider mb-2">Total Revenue</p>
                        <p className="text-3xl font-serif font-bold text-lux-dark mb-1">
                            ${financialSummary.totalRevenue.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-1 text-xs font-bold text-green-600">
                            <TrendingUp size={14} /> +12.5% <span className="text-lux-darkSec font-medium">vs last month</span>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 bg-gradient-to-br from-green-500 to-emerald-700 rounded-bl-3xl group-hover:scale-110 transition-transform duration-500">
                            <Wallet size={32} />
                        </div>
                        <p className="text-xs font-bold text-lux-darkSec uppercase tracking-wider mb-2">Platform Net</p>
                        <p className="text-3xl font-serif font-bold text-lux-dark mb-1">
                            ${financialSummary.platformNet.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-1 text-xs font-bold text-green-600">
                            <TrendingUp size={14} /> +8.2% <span className="text-lux-darkSec font-medium">margin growth</span>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-bl-3xl group-hover:scale-110 transition-transform duration-500">
                            <CreditCard size={32} />
                        </div>
                        <p className="text-xs font-bold text-lux-darkSec uppercase tracking-wider mb-2">Driver Payouts</p>
                        <p className="text-3xl font-serif font-bold text-lux-dark mb-1">
                            ${financialSummary.driverPayouts.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-1 text-xs font-bold text-lux-darkSec">
                            <RefreshCw size={14} /> Next batch: Oct 30
                        </div>
                    </GlassCard>

                    <GlassCard className="p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 bg-gradient-to-br from-lux-primary to-lux-secondary rounded-bl-3xl group-hover:scale-110 transition-transform duration-500">
                            <BarChart3 size={32} />
                        </div>
                        <p className="text-xs font-bold text-lux-darkSec uppercase tracking-wider mb-2">Surge/Upgrade Fees</p>
                        <p className="text-3xl font-serif font-bold text-lux-dark mb-1">
                            ${financialSummary.surgeFees.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-1 text-xs font-bold text-green-600">
                            <TrendingUp size={14} /> +5.4% <span className="text-lux-darkSec font-medium">uptick</span>
                        </div>
                    </GlassCard>
                </div>

                {/* Subscription Tiers */}
                <div className="grid md:grid-cols-3 gap-6">
                    {tierStats.map((tier, i) => (
                        <div key={i} className={`relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${tier.color} text-white shadow-lg shadow-lux-gold/10 hover:-translate-y-1 transition-transform duration-300`}>
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-serif font-bold text-xl">{tier.name}</h3>
                                <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded text-xs font-bold">
                                    {tier.churn}% Churn
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs opacity-70 uppercase tracking-wider">Members</p>
                                    <p className="text-2xl font-bold">{tier.count.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-xs opacity-70 uppercase tracking-wider">Est. ARR</p>
                                    <p className="text-2xl font-bold">${(tier.arr / 1000).toFixed(1)}k</p>
                                </div>
                            </div>
                            {/* Decorative line chart visual */}
                            <div className="absolute bottom-0 left-0 right-0 h-12 opacity-20">
                                <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full">
                                    <path d={`M0 20 L0 ${15 + Math.random()*5} Q 25 ${10 - Math.random()*5} 50 ${15 + Math.random()*5} T 100 ${10 + Math.random()*5} V 20 Z`} fill="white" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* Charts & Trends (2/3) */}
                    <div className="lg:col-span-2 space-y-8">
                        <GlassCard className="p-8 min-h-[400px]">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h3 className="text-xl font-bold text-lux-dark">Revenue Trend</h3>
                                    <p className="text-sm text-lux-darkSec">Monthly Recurring Revenue (MRR) Growth</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 rounded-lg bg-lux-primary/10 text-lux-primary hover:bg-lux-primary/20 transition-colors">
                                        <TrendingUp size={20} />
                                    </button>
                                </div>
                            </div>
                            
                            {/* Line Chart Visualization */}
                            <div className="w-full h-64 relative">
                                {/* Grid Lines */}
                                <div className="absolute inset-0 flex flex-col justify-between text-xs text-lux-darkSec/40">
                                    {[250, 200, 150, 100, 50, 0].map((v, i) => (
                                        <div key={i} className="border-b border-lux-darkSec/5 w-full h-0 flex items-center">
                                            <span className="absolute -left-8">${v}k</span>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* The Line */}
                                <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                                    <path 
                                        d="M0 220 L 80 200 L 160 180 L 240 190 L 320 150 L 400 130 L 480 140 L 560 100 L 640 80 L 720 40 L 800 20" 
                                        fill="none" 
                                        stroke="#C5A059" 
                                        strokeWidth="3" 
                                        vectorEffect="non-scaling-stroke"
                                    />
                                    {/* Area under line */}
                                    <path 
                                        d="M0 220 L 80 200 L 160 180 L 240 190 L 320 150 L 400 130 L 480 140 L 560 100 L 640 80 L 720 40 L 800 20 V 256 H 0 Z" 
                                        fill="url(#gradient)" 
                                        opacity="0.2"
                                    />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#C5A059" />
                                            <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <div className="flex justify-between mt-4 text-xs text-lux-darkSec uppercase font-bold px-2">
                                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                                <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span>
                            </div>
                        </GlassCard>

                        {/* Detailed Billing Table */}
                        <GlassCard className="p-0 overflow-hidden">
                            <div className="p-6 border-b border-lux-darkSec/5 bg-white/40">
                                <h3 className="font-bold text-lux-dark text-lg">Billing Performance by Tier</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-lux-primary/5 text-xs font-bold text-lux-darkSec uppercase">
                                        <tr>
                                            <th className="p-4 pl-6">Tier Name</th>
                                            <th className="p-4">Active Members</th>
                                            <th className="p-4">Monthly Revenue</th>
                                            <th className="p-4">Retention Rate</th>
                                            <th className="p-4 text-right pr-6">Avg. Lifetime Value</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {tierStats.map((tier, i) => (
                                            <tr key={i} className="border-b border-lux-darkSec/5 hover:bg-white/40 transition-colors">
                                                <td className="p-4 pl-6 font-bold text-lux-dark">{tier.name}</td>
                                                <td className="p-4">{tier.count.toLocaleString()}</td>
                                                <td className="p-4 font-mono">${(tier.arr / 12).toLocaleString(undefined, {maximumFractionDigits: 0})}</td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                            <div className="h-full bg-green-500 rounded-full" style={{width: `${100 - tier.churn}%`}}></div>
                                                        </div>
                                                        <span className="text-xs font-bold">{100 - tier.churn}%</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 pr-6 text-right font-bold text-lux-dark">
                                                    ${(tier.arr / tier.count * 2.5).toFixed(0)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Right Column: Operations & Issues */}
                    <div className="space-y-8">
                        
                        {/* Transaction Issues */}
                        <GlassCard className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-lux-dark flex items-center gap-2">
                                    <AlertTriangle size={18} className="text-red-500" />
                                    Transaction Issues
                                </h3>
                                <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">2 New</span>
                            </div>
                            <div className="space-y-3">
                                {recentIssues.map((issue) => (
                                    <div key={issue.id} className="p-3 rounded-xl bg-white/50 border border-white/60">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-bold text-sm text-lux-dark">{issue.type}</span>
                                            <span className="text-xs font-bold text-red-600">{issue.amount}</span>
                                        </div>
                                        <p className="text-xs text-lux-darkSec mb-2">{issue.user} • {issue.date}</p>
                                        <button className="w-full py-1.5 rounded-lg bg-white border border-lux-darkSec/10 text-xs font-bold text-lux-dark hover:bg-lux-primary/10 transition-colors">
                                            Resolve Issue
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>

                        {/* Payout Management */}
                        <GlassCard className="p-6 bg-gradient-to-br from-lux-gold/5 to-transparent border-lux-gold/20">
                            <h3 className="font-bold text-lux-dark mb-4">Driver Payouts</h3>
                            
                            <div className="mb-6 p-4 rounded-xl bg-white/60 border border-white/80">
                                <p className="text-xs font-bold text-lux-darkSec uppercase">Next Batch Total</p>
                                <p className="text-2xl font-bold text-lux-dark my-1">$15,480.00</p>
                                <p className="text-xs text-lux-darkSec">Scheduled for Oct 30, 2023</p>
                            </div>

                            <div className="space-y-3 mb-6">
                                <p className="text-xs font-bold text-lux-darkSec uppercase tracking-wider">Recent Payouts</p>
                                {payouts.map((po) => (
                                    <div key={po.id} className="flex justify-between items-center text-sm">
                                        <span className="text-lux-dark">{po.driver}</span>
                                        <div className="text-right">
                                            <span className="block font-bold text-lux-dark">{po.amount}</span>
                                            <span className={`text-[10px] uppercase font-bold ${po.status === 'Processing' ? 'text-amber-600' : 'text-green-600'}`}>{po.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <GradientButton fullWidth>
                                Process Batch Now
                            </GradientButton>
                            <button className="w-full mt-3 py-2 text-xs font-bold text-lux-darkSec hover:text-lux-gold">
                                View Payout History
                            </button>
                        </GlassCard>

                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminRevenuePage;