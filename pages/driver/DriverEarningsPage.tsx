import React from 'react';
import { DollarSign, Calendar, TrendingUp, Download, CreditCard, ChevronRight } from 'lucide-react';
import { DriverLayout } from '../../components/layout/DriverLayout';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

const DriverEarningsPage: React.FC = () => {
    const stats = [
        { label: 'Today', value: '$480.00', sub: '+12% vs avg', color: 'text-green-600' },
        { label: 'This Week', value: '$2,150.00', sub: '24 trips', color: 'text-lux-dark' },
        { label: 'This Month', value: '$8,920.00', sub: 'On track for goal', color: 'text-lux-dark' },
        { label: 'All Time', value: '$127,450', sub: 'Since 2021', color: 'text-lux-primary' },
    ];

    const recentEarnings = [
        { id: 1, date: 'Oct 24, 2023', type: 'Trip', desc: 'Buckhead to Airport', amount: '$65.00' },
        { id: 2, date: 'Oct 24, 2023', type: 'Trip', desc: 'Midtown to Downtown', amount: '$28.00' },
        { id: 3, date: 'Oct 23, 2023', type: 'Weekly Payout', desc: 'Direct Deposit', amount: '-$1,850.00', isPayout: true },
        { id: 4, date: 'Oct 23, 2023', type: 'Bonus', desc: 'Weekly Quest Complete', amount: '$150.00' },
    ];

    return (
        <DriverLayout>
            <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto pb-12">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-lux-dark">Earnings</h1>
                        <p className="text-lux-darkSec mt-1">Track your revenue and manage payouts.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-full bg-white/50 border border-white/60 text-sm font-bold text-lux-dark hover:bg-white flex items-center gap-2">
                            <Calendar size={16} /> This Week
                        </button>
                        <button className="px-4 py-2 rounded-full bg-white/50 border border-white/60 text-sm font-bold text-lux-dark hover:bg-white flex items-center gap-2">
                            <Download size={16} /> Tax Report
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <GlassCard key={i} className="p-6">
                            <p className="text-xs font-bold text-lux-darkSec uppercase tracking-wider mb-2">{stat.label}</p>
                            <p className={`text-2xl font-bold mb-1 ${stat.color}`}>{stat.value}</p>
                            <p className="text-xs text-lux-darkSec/60 font-medium">{stat.sub}</p>
                        </GlassCard>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Breakdown & History */}
                    <div className="lg:col-span-2 space-y-8">
                        <GlassCard className="p-0 overflow-hidden">
                            <div className="p-6 border-b border-lux-darkSec/5 bg-white/40 flex justify-between items-center">
                                <h3 className="font-bold text-lux-dark text-lg">Recent Activity</h3>
                                <button className="text-xs font-bold text-lux-gold hover:text-lux-primary">View All</button>
                            </div>
                            <div className="divide-y divide-lux-darkSec/5">
                                {recentEarnings.map((item) => (
                                    <div key={item.id} className="p-6 flex items-center justify-between hover:bg-white/40 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.isPayout ? 'bg-lux-dark text-white' : 'bg-green-100 text-green-700'}`}>
                                                {item.isPayout ? <TrendingUp size={18} /> : <DollarSign size={18} />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-lux-dark">{item.type}</p>
                                                <p className="text-xs text-lux-darkSec">{item.date} • {item.desc}</p>
                                            </div>
                                        </div>
                                        <span className={`font-bold ${item.isPayout ? 'text-lux-dark' : 'text-green-600'}`}>{item.amount}</span>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>

                        {/* Chart Placeholder */}
                        <GlassCard className="p-8">
                            <h3 className="font-bold text-lux-dark text-lg mb-6">Weekly Trend</h3>
                            <div className="h-64 flex items-end justify-between gap-2">
                                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                    <div key={i} className="w-full bg-lux-primary/10 rounded-t-lg relative group overflow-hidden">
                                        <div 
                                            className="absolute bottom-0 w-full bg-gradient-to-t from-lux-gold to-lux-primary transition-all duration-500 rounded-t-lg group-hover:opacity-90"
                                            style={{ height: `${h}%` }}
                                        ></div>
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-lux-dark text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            ${h * 10}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 text-xs font-bold text-lux-darkSec uppercase">
                                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Payout Info */}
                    <div className="space-y-6">
                        <GlassCard className="p-8 bg-gradient-to-br from-lux-dark to-gray-900 text-white border-none">
                            <h3 className="font-serif font-bold text-xl mb-6">Next Payout</h3>
                            <div className="mb-8">
                                <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Available Balance</p>
                                <p className="text-4xl font-bold">$1,240.50</p>
                            </div>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                                    <span className="text-gray-400">Scheduled Date</span>
                                    <span className="font-bold">Oct 30, 2023</span>
                                </div>
                                <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                                    <span className="text-gray-400">Bank Account</span>
                                    <span className="font-bold">Chase ...8821</span>
                                </div>
                            </div>
                            <button className="w-full py-3 rounded-xl bg-white text-lux-dark font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                                Cash Out Now <span className="text-xs font-normal bg-lux-primary/20 px-2 py-0.5 rounded text-lux-primary">$0.50 fee</span>
                            </button>
                        </GlassCard>

                        <GlassCard className="p-6">
                            <h3 className="font-bold text-lux-dark mb-4">Payout Settings</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 rounded-xl bg-white/40 border border-white/60">
                                    <div className="flex items-center gap-3">
                                        <CreditCard size={18} className="text-lux-primary" />
                                        <div>
                                            <p className="font-bold text-sm text-lux-dark">Chase Checking</p>
                                            <p className="text-xs text-lux-darkSec">**** 8821</p>
                                        </div>
                                    </div>
                                    <button className="text-xs font-bold text-lux-gold hover:underline">Edit</button>
                                </div>
                                <GradientButton fullWidth className="py-2 text-xs">Update Bank Info</GradientButton>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </DriverLayout>
    );
};

export default DriverEarningsPage;