import React, { useState } from 'react';
import { 
    Settings, 
    DollarSign, 
    Percent, 
    Map, 
    Bell, 
    Server, 
    Save, 
    CheckCircle2, 
    AlertTriangle, 
    ShieldCheck, 
    Clock, 
    Power,
    ToggleLeft,
    ToggleRight
} from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

const AdminSettingsPage: React.FC = () => {
    const [savedSection, setSavedSection] = useState<string | null>(null);

    // Pricing State
    const [pricing, setPricing] = useState({
        essential: 199,
        executive: 499,
        royal: 1499,
        annualDiscount: 16
    });

    // Commission State
    const [commission, setCommission] = useState({
        platformPercent: 20,
        surgeMin: 1.0,
        surgeMax: 3.0
    });

    // Service State
    const [service, setService] = useState({
        operating247: true,
        radius: 50,
        minRating: 4.8,
        backgroundCheck: true,
        insurance: true
    });

    // Notifications State
    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        smsAlerts: true,
        churnThreshold: 5,
        complaintThreshold: 3
    });

    // System State
    const [system, setSystem] = useState({
        bookingsEnabled: true,
        maintenanceMode: false
    });

    const handleSave = (section: string) => {
        // Simulate API call
        setSavedSection(section);
        setTimeout(() => setSavedSection(null), 3000);
    };

    const Toggle = ({ checked, onChange, label }: { checked: boolean; onChange: () => void; label?: string }) => (
        <button 
            onClick={onChange}
            className={`flex items-center gap-3 transition-colors group ${label ? 'w-full justify-between' : ''}`}
        >
            {label && <span className="text-sm font-bold text-lux-dark">{label}</span>}
            <div className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${checked ? 'bg-lux-gold' : 'bg-gray-300'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${checked ? 'left-7' : 'left-1'}`}></div>
            </div>
        </button>
    );

    return (
        <AdminLayout>
            <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto pb-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-lux-dark">System Configuration</h1>
                        <p className="text-lux-darkSec mt-1">Manage global settings, pricing models, and operational parameters.</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    
                    {/* Membership Pricing */}
                    <GlassCard className="p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-lux-dark flex items-center gap-2">
                                <DollarSign size={20} className="text-lux-gold" />
                                Membership Pricing
                            </h2>
                            {savedSection === 'pricing' && <span className="text-green-600 text-xs font-bold flex items-center gap-1"><CheckCircle2 size={12}/> Saved</span>}
                        </div>
                        
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-lux-darkSec uppercase">Essential / mo</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lux-darkSec font-bold">$</span>
                                        <input 
                                            type="number" 
                                            value={pricing.essential}
                                            onChange={(e) => setPricing({...pricing, essential: parseInt(e.target.value)})}
                                            className="w-full pl-8 pr-4 py-2 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-lux-darkSec uppercase">Executive / mo</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lux-darkSec font-bold">$</span>
                                        <input 
                                            type="number" 
                                            value={pricing.executive}
                                            onChange={(e) => setPricing({...pricing, executive: parseInt(e.target.value)})}
                                            className="w-full pl-8 pr-4 py-2 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-lux-darkSec uppercase">Royal / mo</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lux-darkSec font-bold">$</span>
                                        <input 
                                            type="number" 
                                            value={pricing.royal}
                                            onChange={(e) => setPricing({...pricing, royal: parseInt(e.target.value)})}
                                            className="w-full pl-8 pr-4 py-2 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-lux-darkSec uppercase">Annual Discount</label>
                                    <div className="relative">
                                        <input 
                                            type="number" 
                                            value={pricing.annualDiscount}
                                            onChange={(e) => setPricing({...pricing, annualDiscount: parseInt(e.target.value)})}
                                            className="w-full pl-4 pr-8 py-2 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-lux-darkSec font-bold">%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-2 flex justify-end">
                                <GradientButton onClick={() => handleSave('pricing')} className="px-6 py-2 text-sm">Save Changes</GradientButton>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Commission Structure */}
                    <GlassCard className="p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-lux-dark flex items-center gap-2">
                                <Percent size={20} className="text-lux-gold" />
                                Commission Structure
                            </h2>
                            {savedSection === 'commission' && <span className="text-green-600 text-xs font-bold flex items-center gap-1"><CheckCircle2 size={12}/> Saved</span>}
                        </div>

                        <div className="space-y-6">
                            <div className="p-4 rounded-xl bg-lux-primary/5 border border-lux-primary/10 flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-bold text-lux-dark">Platform Commission</p>
                                    <p className="text-xs text-lux-darkSec">Percentage retained by LuxRide</p>
                                </div>
                                <div className="relative w-24">
                                    <input 
                                        type="number" 
                                        value={commission.platformPercent}
                                        onChange={(e) => setCommission({...commission, platformPercent: parseInt(e.target.value)})}
                                        className="w-full pl-4 pr-8 py-2 rounded-lg bg-white border border-lux-darkSec/10 text-right font-bold focus:ring-1 focus:ring-lux-gold outline-none"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-lux-darkSec">%</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center px-2">
                                <span className="text-sm font-bold text-lux-darkSec">Driver Payout</span>
                                <span className="text-lg font-bold text-green-600">{100 - commission.platformPercent}%</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-lux-darkSec uppercase">Surge Min Multiplier</label>
                                    <input 
                                        type="number" 
                                        step="0.1"
                                        value={commission.surgeMin}
                                        onChange={(e) => setCommission({...commission, surgeMin: parseFloat(e.target.value)})}
                                        className="w-full px-4 py-2 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-lux-darkSec uppercase">Surge Max Multiplier</label>
                                    <input 
                                        type="number" 
                                        step="0.1"
                                        value={commission.surgeMax}
                                        onChange={(e) => setCommission({...commission, surgeMax: parseFloat(e.target.value)})}
                                        className="w-full px-4 py-2 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none"
                                    />
                                </div>
                            </div>

                            <div className="pt-2 flex justify-end">
                                <GradientButton onClick={() => handleSave('commission')} className="px-6 py-2 text-sm">Save Changes</GradientButton>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Service Parameters */}
                    <GlassCard className="p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-lux-dark flex items-center gap-2">
                                <Map size={20} className="text-lux-gold" />
                                Service Parameters
                            </h2>
                            {savedSection === 'service' && <span className="text-green-600 text-xs font-bold flex items-center gap-1"><CheckCircle2 size={12}/> Saved</span>}
                        </div>

                        <div className="space-y-6">
                            <Toggle 
                                checked={service.operating247} 
                                onChange={() => setService({...service, operating247: !service.operating247})} 
                                label="24/7 Operating Hours"
                            />
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-lux-darkSec uppercase">Service Radius (miles)</label>
                                    <input 
                                        type="number" 
                                        value={service.radius}
                                        onChange={(e) => setService({...service, radius: parseInt(e.target.value)})}
                                        className="w-full px-4 py-2 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-lux-darkSec uppercase">Min Driver Rating</label>
                                    <input 
                                        type="number" 
                                        step="0.1"
                                        value={service.minRating}
                                        onChange={(e) => setService({...service, minRating: parseFloat(e.target.value)})}
                                        className="w-full px-4 py-2 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3 pt-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-lux-dark">Background Check Required</span>
                                    <Toggle checked={service.backgroundCheck} onChange={() => setService({...service, backgroundCheck: !service.backgroundCheck})} label="" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-lux-dark">Vehicle Insurance Required</span>
                                    <Toggle checked={service.insurance} onChange={() => setService({...service, insurance: !service.insurance})} label="" />
                                </div>
                            </div>

                            <div className="pt-2 flex justify-end">
                                <GradientButton onClick={() => handleSave('service')} className="px-6 py-2 text-sm">Save Changes</GradientButton>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Notifications & Alerts */}
                    <GlassCard className="p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-lux-dark flex items-center gap-2">
                                <Bell size={20} className="text-lux-gold" />
                                Notifications & Alerts
                            </h2>
                            {savedSection === 'notifications' && <span className="text-green-600 text-xs font-bold flex items-center gap-1"><CheckCircle2 size={12}/> Saved</span>}
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-8">
                                <Toggle 
                                    checked={notifications.emailAlerts} 
                                    onChange={() => setNotifications({...notifications, emailAlerts: !notifications.emailAlerts})} 
                                    label="Email Alerts"
                                />
                                <Toggle 
                                    checked={notifications.smsAlerts} 
                                    onChange={() => setNotifications({...notifications, smsAlerts: !notifications.smsAlerts})} 
                                    label="SMS Alerts"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-lux-darkSec uppercase">Low Membership Churn Threshold (%)</label>
                                    <input 
                                        type="number" 
                                        value={notifications.churnThreshold}
                                        onChange={(e) => setNotifications({...notifications, churnThreshold: parseInt(e.target.value)})}
                                        className="w-full px-4 py-2 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none"
                                    />
                                    <p className="text-[10px] text-lux-darkSec">Alert admin if daily churn exceeds this value.</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-lux-darkSec uppercase">Driver Complaints Threshold</label>
                                    <input 
                                        type="number" 
                                        value={notifications.complaintThreshold}
                                        onChange={(e) => setNotifications({...notifications, complaintThreshold: parseInt(e.target.value)})}
                                        className="w-full px-4 py-2 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none"
                                    />
                                    <p className="text-[10px] text-lux-darkSec">Auto-suspend driver if monthly complaints exceed this value.</p>
                                </div>
                            </div>

                            <div className="pt-2 flex justify-end">
                                <GradientButton onClick={() => handleSave('notifications')} className="px-6 py-2 text-sm">Save Changes</GradientButton>
                            </div>
                        </div>
                    </GlassCard>

                    {/* System Maintenance */}
                    <GlassCard className="p-8 lg:col-span-2 border-lux-gold/20">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-lux-dark flex items-center gap-2">
                                <Server size={20} className="text-lux-gold" />
                                System Maintenance
                            </h2>
                            {savedSection === 'system' && <span className="text-green-600 text-xs font-bold flex items-center gap-1"><CheckCircle2 size={12}/> Saved</span>}
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 items-start">
                            <div className="space-y-6">
                                <div className="p-4 rounded-xl bg-white/40 border border-white/60 flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-lux-dark">Accepting New Bookings</p>
                                        <p className="text-xs text-lux-darkSec">Turn off to stop all new requests</p>
                                    </div>
                                    <Toggle checked={system.bookingsEnabled} onChange={() => setSystem({...system, bookingsEnabled: !system.bookingsEnabled})} label="" />
                                </div>

                                <div className="p-4 rounded-xl bg-white/40 border border-white/60 flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-lux-dark">Maintenance Mode</p>
                                        <p className="text-xs text-lux-darkSec">Only admins can access the platform</p>
                                    </div>
                                    <Toggle checked={system.maintenanceMode} onChange={() => setSystem({...system, maintenanceMode: !system.maintenanceMode})} label="" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-lux-dark uppercase tracking-wide">Health Status</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-lux-darkSec">Database Backup</span>
                                        <span className="text-green-600 font-bold flex items-center gap-1"><CheckCircle2 size={12}/> Synced (2m ago)</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-lux-darkSec">API Health</span>
                                        <span className="text-green-600 font-bold flex items-center gap-1"><CheckCircle2 size={12}/> 99.9% Uptime</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-lux-darkSec">Next Scheduled Maintenance</span>
                                        <span className="text-lux-dark font-bold">Nov 01, 03:00 AM EST</span>
                                    </div>
                                </div>
                                <div className="pt-4 flex justify-end">
                                    <GradientButton onClick={() => handleSave('system')} className="px-6 py-2 text-sm">Save System Settings</GradientButton>
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminSettingsPage;