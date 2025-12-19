import React, { useState } from 'react';
import { 
    DollarSign, 
    Users, 
    Car, 
    Map, 
    TrendingUp, 
    Star, 
    AlertTriangle, 
    Activity, 
    ChevronDown, 
    ArrowUpRight,
    ArrowDownRight,
    Zap,
    AlertCircle
} from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

const AdminDashboard: React.FC = () => {
    const [dateRange, setDateRange] = useState('Today');

    // Mock Data
    const metrics = [
        { label: 'Total Revenue', value: '$12,450', change: '+15%', trend: 'up', icon: <DollarSign size={24} className="text-white" />, color: 'from-green-500 to-emerald-600' },
        { label: 'Active Members', value: '5,420', change: '+8%', trend: 'up', icon: <Users size={24} className="text-white" />, color: 'from-blue-500 to-indigo-600' },
        { label: 'Active Drivers', value: '324', change: '-2%', trend: 'down', icon: <Car size={24} className="text-white" />, color: 'from-lux-primary to-lux-secondary' },
        { label: 'Total Trips', value: '1,205', change: '+12%', trend: 'up', icon: <Map size={24} className="text-white" />, color: 'from-lux-gold to-yellow-600' },
    ];

    const alerts = [
        { id: 1, type: 'critical', message: 'High server load detected (92%)', time: '10 mins ago' },
        { id: 2, type: 'warning', message: 'Payment gateway latency spike', time: '45 mins ago' },
    ];

    const activity = [
        { id: 1, action: 'New Member Signup', user: 'Elena Gilbert', time: '2 mins ago', icon: <Users size={16} /> },
        { id: 2, action: 'Trip Completed', user: 'Driver #8821', time: '5 mins ago', icon: <Map size={16} /> },
        { id: 3, action: 'Driver Application', user: 'John Smith', time: '12 mins ago', icon: <Car size={16} /> },
        { id: 4, action: 'Support Ticket Created', user: 'Member #4450', time: '25 mins ago', icon: <AlertCircle size={16} /> },
        { id: 5, action: 'Subscription Upgrade', user: 'Corporate Acc #22', time: '1 hour ago', icon: <Zap size={16} /> },
    ];

    return (
        <AdminLayout>
            <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto pb-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-lux-dark">System Overview</h1>
                        <p className="text-lux-darkSec mt-1">Real-time monitoring and analytics.</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <select 
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="appearance-none bg-white/50 border border-white/60 px-4 py-2 pr-10 rounded-xl text-lux-dark font-bold text-sm focus:outline-none focus:ring-1 focus:ring-lux-gold cursor-pointer"
                            >
                                <option>Today</option>
                                <option>This Week</option>
                                <option>This Month</option>
                                <option>Last Month</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-lux-darkSec pointer-events-none" size={16} />
                        </div>
                        <GradientButton className="px-4 py-2 text-sm">
                            Generate Report
                        </GradientButton>
                    </div>
                </div>

                {/* Alerts Section */}
                {alerts.length > 0 && (
                    <div className="grid gap-4">
                        {alerts.map(alert => (
                            <div key={alert.id} className={`p-4 rounded-xl border flex items-center justify-between animate-in slide-in-from-top-2 ${alert.type === 'critical' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                                <div className="flex items-center gap-3">
                                    <AlertTriangle size={20} />
                                    <span className="font-bold">{alert.message}</span>
                                </div>
                                <span className="text-xs font-medium opacity-80">{alert.time}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((metric, idx) => (
                        <GlassCard key={idx} className="p-6 relative overflow-hidden group">
                            <div className={`absolute top-0 right-0 p-3 opacity-10 bg-gradient-to-br ${metric.color} rounded-bl-3xl group-hover:scale-110 transition-transform duration-500`}>
                                {metric.icon}
                            </div>
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-lg mb-4`}>
                                {metric.icon}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-lux-darkSec uppercase tracking-wider mb-1">{metric.label}</p>
                                <div className="flex items-end gap-2">
                                    <p className="text-2xl font-bold text-lux-dark">{metric.value}</p>
                                    <span className={`text-xs font-bold mb-1 flex items-center ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                        {metric.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                        {metric.change}
                                    </span>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>

                {/* Charts & Activity */}
                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* Revenue Trend (2/3) */}
                    <GlassCard className="lg:col-span-2 p-8 min-h-[400px]">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-lux-dark">Revenue Trend</h3>
                                <p className="text-sm text-lux-darkSec">Gross transaction volume over time</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 rounded-lg bg-lux-primary/10 text-lux-primary hover:bg-lux-primary/20 transition-colors">
                                    <TrendingUp size={20} />
                                </button>
                            </div>
                        </div>
                        
                        {/* Mock Line Chart Visualization */}
                        <div className="w-full h-64 flex items-end justify-between gap-2 px-2">
                            {[35, 42, 38, 55, 62, 58, 65, 72, 68, 85, 92, 88].map((h, i) => (
                                <div key={i} className="relative w-full h-full flex items-end group">
                                    <div 
                                        className="w-full bg-gradient-to-t from-lux-gold/20 to-lux-primary/60 rounded-t-sm transition-all duration-500 hover:opacity-80"
                                        style={{ height: `${h}%` }}
                                    ></div>
                                    {/* Tooltip */}
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-lux-dark text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                        ${h * 150}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 text-xs text-lux-darkSec uppercase font-bold px-2">
                            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                        </div>
                    </GlassCard>

                    {/* Activity Feed & Distribution (1/3) */}
                    <div className="space-y-8">
                        <GlassCard className="p-6">
                            <h3 className="text-lg font-bold text-lux-dark mb-4 flex items-center gap-2">
                                <Activity size={20} className="text-lux-gold" />
                                Recent Activity
                            </h3>
                            <div className="space-y-4">
                                {activity.map((item) => (
                                    <div key={item.id} className="flex items-start gap-3 pb-4 border-b border-lux-darkSec/5 last:border-0 last:pb-0">
                                        <div className="w-8 h-8 rounded-full bg-lux-primary/5 flex items-center justify-center text-lux-darkSec shrink-0">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-lux-dark">{item.action}</p>
                                            <p className="text-xs text-lux-darkSec">{item.user}</p>
                                            <p className="text-[10px] text-lux-darkSec/60 mt-0.5">{item.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-2 text-xs font-bold text-lux-gold hover:text-lux-primary transition-colors">
                                View Full Log
                            </button>
                        </GlassCard>

                        <GlassCard className="p-6">
                            <h3 className="text-lg font-bold text-lux-dark mb-4">Membership Tiers</h3>
                            <div className="flex items-center gap-4">
                                {/* Pie Chart Visualization */}
                                <div className="w-32 h-32 rounded-full border-[12px] border-lux-primary border-r-lux-gold border-b-lux-darkSec border-l-lux-primary relative shrink-0">
                                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                                        <span className="text-xl font-bold text-lux-dark">5.4k</span>
                                        <span className="text-[10px] text-lux-darkSec uppercase">Members</span>
                                    </div>
                                </div>
                                <div className="space-y-2 flex-1">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-lux-primary"></span> Essential</span>
                                        <span className="font-bold text-lux-dark">45%</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-lux-gold"></span> Executive</span>
                                        <span className="font-bold text-lux-dark">35%</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-lux-darkSec"></span> Royal</span>
                                        <span className="font-bold text-lux-dark">20%</span>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;