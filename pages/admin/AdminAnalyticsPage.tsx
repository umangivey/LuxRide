import React, { useState } from 'react';
import { 
    BarChart2, 
    TrendingUp, 
    Users, 
    Car, 
    Map, 
    DollarSign, 
    Calendar, 
    Download, 
    PieChart, 
    Activity, 
    ArrowUpRight, 
    ArrowDownRight,
    FileText,
    CheckSquare,
    Save
} from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

const AdminAnalyticsPage: React.FC = () => {
    const [dateRange, setDateRange] = useState('Last 30 Days');
    const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'drivers' | 'trips' | 'financial'>('overview');

    // Report Builder State
    const [reportConfig, setReportConfig] = useState({
        metrics: {
            revenue: true,
            trips: true,
            members: false,
            drivers: false,
            churn: false
        },
        breakdown: 'day',
        format: 'PDF'
    });

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'members', label: 'Members' },
        { id: 'drivers', label: 'Drivers' },
        { id: 'trips', label: 'Trips' },
        { id: 'financial', label: 'Financial' },
    ];

    // Mock Data Helpers
    const TrendIndicator = ({ value, isPositive }: { value: string, isPositive: boolean }) => (
        <span className={`text-xs font-bold flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {value}
        </span>
    );

    const SimpleBarChart = ({ data, color = 'bg-lux-gold' }: { data: number[], color?: string }) => (
        <div className="h-32 flex items-end justify-between gap-1 mt-4">
            {data.map((h, i) => (
                <div key={i} className="w-full bg-black/5 rounded-t-sm relative group">
                    <div 
                        className={`absolute bottom-0 w-full rounded-t-sm transition-all duration-500 ${color}`}
                        style={{ height: `${h}%` }}
                    ></div>
                    {/* Tooltip */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-lux-dark text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        {h}%
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <AdminLayout>
            <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto pb-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-lux-dark">Reports & Analytics</h1>
                        <p className="text-lux-darkSec mt-1">Deep insights into business performance and operational metrics.</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <select 
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="appearance-none bg-white/50 border border-white/60 px-4 py-2 pr-10 rounded-xl text-lux-dark font-bold text-sm focus:outline-none focus:ring-1 focus:ring-lux-gold cursor-pointer"
                            >
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                                <option>Last Quarter</option>
                                <option>Year to Date</option>
                            </select>
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-lux-darkSec pointer-events-none" size={16} />
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 border-b border-lux-darkSec/10">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`
                                px-6 py-2 rounded-t-lg font-bold text-sm transition-all whitespace-nowrap relative top-[1px] border-b-2
                                ${activeTab === tab.id 
                                    ? 'text-lux-gold border-lux-gold bg-white/40' 
                                    : 'text-lux-darkSec border-transparent hover:text-lux-dark hover:bg-white/20'}
                            `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="space-y-8">
                    
                    {/* Member Analytics */}
                    {(activeTab === 'overview' || activeTab === 'members') && (
                        <section className="space-y-6">
                            <h2 className="text-xl font-bold text-lux-dark flex items-center gap-2">
                                <Users size={20} className="text-lux-gold" /> Member Insights
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <GlassCard className="p-6">
                                    <p className="text-xs font-bold text-lux-darkSec uppercase mb-2">Member Growth</p>
                                    <div className="flex items-end justify-between">
                                        <span className="text-2xl font-bold text-lux-dark">12.5%</span>
                                        <TrendIndicator value="2.1%" isPositive={true} />
                                    </div>
                                    <SimpleBarChart data={[20, 35, 45, 30, 60, 75, 50, 80]} />
                                </GlassCard>
                                <GlassCard className="p-6">
                                    <p className="text-xs font-bold text-lux-darkSec uppercase mb-2">Churn Rate</p>
                                    <div className="flex items-end justify-between">
                                        <span className="text-2xl font-bold text-lux-dark">1.8%</span>
                                        <TrendIndicator value="0.2%" isPositive={false} />
                                    </div>
                                    <SimpleBarChart data={[5, 8, 4, 12, 6, 3, 5, 2]} color="bg-red-400" />
                                </GlassCard>
                                <GlassCard className="p-6">
                                    <p className="text-xs font-bold text-lux-darkSec uppercase mb-2">Avg. LTV</p>
                                    <div className="flex items-end justify-between">
                                        <span className="text-2xl font-bold text-lux-dark">$4,250</span>
                                        <TrendIndicator value="5.4%" isPositive={true} />
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <div className="flex justify-between text-xs text-lux-darkSec"><span>Royal</span><span className="font-bold">$12k</span></div>
                                        <div className="w-full bg-black/5 h-1 rounded-full"><div className="w-[90%] h-full bg-lux-dark rounded-full"></div></div>
                                        <div className="flex justify-between text-xs text-lux-darkSec"><span>Exec</span><span className="font-bold">$5k</span></div>
                                        <div className="w-full bg-black/5 h-1 rounded-full"><div className="w-[60%] h-full bg-lux-gold rounded-full"></div></div>
                                    </div>
                                </GlassCard>
                                <GlassCard className="p-6">
                                    <p className="text-xs font-bold text-lux-darkSec uppercase mb-2">Upgrade Rate</p>
                                    <div className="flex items-end justify-between">
                                        <span className="text-2xl font-bold text-lux-dark">4.5%</span>
                                        <span className="text-xs text-lux-darkSec">monthly</span>
                                    </div>
                                    <SimpleBarChart data={[2, 3, 2, 4, 5, 4, 6, 5]} color="bg-green-500" />
                                </GlassCard>
                            </div>
                        </section>
                    )}

                    {/* Driver Analytics */}
                    {(activeTab === 'overview' || activeTab === 'drivers') && (
                        <section className="space-y-6">
                            <h2 className="text-xl font-bold text-lux-dark flex items-center gap-2">
                                <Car size={20} className="text-lux-gold" /> Driver Performance
                            </h2>
                            <div className="grid lg:grid-cols-3 gap-6">
                                <GlassCard className="p-6">
                                    <h3 className="font-bold text-lux-dark text-sm mb-4">Rating Distribution</h3>
                                    <div className="space-y-3">
                                        {[5, 4, 3, 2, 1].map((star) => (
                                            <div key={star} className="flex items-center gap-3 text-xs">
                                                <span className="font-bold w-4">{star}★</span>
                                                <div className="flex-1 h-2 bg-black/5 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-lux-gold rounded-full" 
                                                        style={{ width: star === 5 ? '75%' : star === 4 ? '15%' : '5%' }}
                                                    ></div>
                                                </div>
                                                <span className="w-8 text-right text-lux-darkSec">{star === 5 ? '75%' : star === 4 ? '15%' : '2%'}</span>
                                            </div>
                                        ))}
                                    </div>
                                </GlassCard>
                                <GlassCard className="p-6">
                                    <h3 className="font-bold text-lux-dark text-sm mb-4">Recruitment & Retention</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 bg-white/40 rounded-xl text-center border border-white/60">
                                            <p className="text-2xl font-bold text-lux-dark">12</p>
                                            <p className="text-[10px] uppercase font-bold text-lux-darkSec">New Drivers</p>
                                        </div>
                                        <div className="p-3 bg-white/40 rounded-xl text-center border border-white/60">
                                            <p className="text-2xl font-bold text-green-600">94%</p>
                                            <p className="text-[10px] uppercase font-bold text-lux-darkSec">Retention</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-lux-darkSec/10">
                                        <p className="text-xs text-lux-darkSec flex justify-between">
                                            <span>Avg Earnings</span>
                                            <span className="font-bold text-lux-dark">$4,250/mo</span>
                                        </p>
                                    </div>
                                </GlassCard>
                                <GlassCard className="p-6">
                                    <h3 className="font-bold text-lux-dark text-sm mb-4">Top Performers</h3>
                                    <div className="space-y-3">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/40">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-lux-gold/10 flex items-center justify-center text-xs font-bold text-lux-gold">{i}</div>
                                                    <div>
                                                        <p className="font-bold text-xs text-lux-dark">Driver Name</p>
                                                        <p className="text-[10px] text-lux-darkSec">142 Trips</p>
                                                    </div>
                                                </div>
                                                <span className="text-xs font-bold text-green-600">$8.2k</span>
                                            </div>
                                        ))}
                                    </div>
                                </GlassCard>
                            </div>
                        </section>
                    )}

                    {/* Trip & Financial (Simplified for Overview, Detailed if Selected) */}
                    {(activeTab === 'trips' || activeTab === 'financial') && (
                        <div className="grid md:grid-cols-2 gap-6">
                            <GlassCard className="p-6">
                                <h3 className="font-bold text-lux-dark mb-4 flex items-center gap-2">
                                    <Map size={18} className="text-lux-gold" /> Trip Analytics
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm p-3 bg-white/40 rounded-xl">
                                        <span className="text-lux-darkSec">Avg Distance</span>
                                        <span className="font-bold text-lux-dark">14.2 miles</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm p-3 bg-white/40 rounded-xl">
                                        <span className="text-lux-darkSec">Avg Duration</span>
                                        <span className="font-bold text-lux-dark">28 mins</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm p-3 bg-white/40 rounded-xl">
                                        <span className="text-lux-darkSec">Completion Rate</span>
                                        <span className="font-bold text-green-600">98.5%</span>
                                    </div>
                                </div>
                            </GlassCard>
                            <GlassCard className="p-6">
                                <h3 className="font-bold text-lux-dark mb-4 flex items-center gap-2">
                                    <DollarSign size={18} className="text-lux-gold" /> Unit Economics
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm border-b border-lux-darkSec/5 pb-2">
                                        <span className="text-lux-darkSec">Avg Revenue / Trip</span>
                                        <span className="font-bold text-lux-dark">$85.00</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm border-b border-lux-darkSec/5 pb-2">
                                        <span className="text-lux-darkSec">Driver Payout (Avg)</span>
                                        <span className="font-bold text-lux-dark">$68.00</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm pt-2">
                                        <span className="font-bold text-lux-dark">Net Margin</span>
                                        <span className="font-bold text-green-600">20%</span>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                    )}

                    {/* Report Builder */}
                    <section>
                        <GlassCard className="p-8 border-lux-gold/20 shadow-lg shadow-lux-gold/5">
                            <h2 className="text-xl font-bold text-lux-dark mb-6 flex items-center gap-2">
                                <FileText size={20} className="text-lux-gold" /> Custom Report Builder
                            </h2>
                            
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-lux-darkSec uppercase tracking-wide">1. Select Metrics</h3>
                                    <div className="space-y-2">
                                        {Object.keys(reportConfig.metrics).map((key) => (
                                            <label key={key} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white/40 transition-colors">
                                                <input 
                                                    type="checkbox"
                                                    checked={(reportConfig.metrics as any)[key]}
                                                    onChange={(e) => setReportConfig({
                                                        ...reportConfig,
                                                        metrics: { ...reportConfig.metrics, [key]: e.target.checked }
                                                    })}
                                                    className="w-5 h-5 rounded border-gray-300 text-lux-gold focus:ring-lux-gold"
                                                />
                                                <span className="capitalize font-medium text-lux-dark">{key}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-lux-darkSec uppercase tracking-wide">2. Configuration</h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-lux-dark">Breakdown By</label>
                                            <select 
                                                value={reportConfig.breakdown}
                                                onChange={(e) => setReportConfig({...reportConfig, breakdown: e.target.value})}
                                                className="w-full px-4 py-2 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none"
                                            >
                                                <option value="day">Day</option>
                                                <option value="week">Week</option>
                                                <option value="month">Month</option>
                                                <option value="tier">Membership Tier</option>
                                                <option value="location">Location</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-lux-dark">Format</label>
                                            <div className="flex gap-2">
                                                {['PDF', 'CSV', 'Excel'].map((fmt) => (
                                                    <button
                                                        key={fmt}
                                                        onClick={() => setReportConfig({...reportConfig, format: fmt})}
                                                        className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${reportConfig.format === fmt ? 'bg-lux-gold text-white border-lux-gold' : 'bg-white/40 text-lux-dark border-lux-darkSec/20 hover:bg-white'}`}
                                                    >
                                                        {fmt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-end space-y-4">
                                    <GradientButton fullWidth>
                                        <span className="flex items-center gap-2 justify-center">
                                            <Activity size={18} /> Generate Report
                                        </span>
                                    </GradientButton>
                                    <button className="w-full py-3 rounded-full border border-lux-darkSec/20 hover:bg-white text-lux-dark font-bold text-sm transition-colors flex items-center justify-center gap-2">
                                        <Save size={16} /> Save Template
                                    </button>
                                </div>
                            </div>
                        </GlassCard>
                    </section>

                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminAnalyticsPage;