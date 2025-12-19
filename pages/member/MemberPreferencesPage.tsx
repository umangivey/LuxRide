import React, { useState } from 'react';
import { 
    Moon, 
    Sun, 
    Monitor, 
    Bell, 
    Mail, 
    Smartphone, 
    Shield, 
    Globe, 
    Lock, 
    LogOut, 
    Save, 
    CheckCircle2, 
    Laptop,
    SmartphoneNfc,
    Eye,
    MapPin
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

type ThemeOption = 'light' | 'dark' | 'system';

const MemberPreferencesPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    
    // State
    const [theme, setTheme] = useState<ThemeOption>('light');
    const [language, setLanguage] = useState('en-US');
    const [twoFactor, setTwoFactor] = useState(false);
    
    const [notifications, setNotifications] = useState({
        bookingUpdates: { email: true, sms: true, push: true },
        marketing: { email: false, sms: false, push: false },
        newsletter: true
    });

    const [privacy, setPrivacy] = useState({
        locationHistory: true,
        dataSharing: false,
        profileVisibility: true
    });

    // Mock Sessions
    const [sessions, setSessions] = useState([
        { id: 1, device: 'MacBook Pro', location: 'Atlanta, GA', active: 'Active Now', type: 'desktop' },
        { id: 2, device: 'iPhone 14 Pro', location: 'Atlanta, GA', active: '2 hours ago', type: 'mobile' },
    ]);

    const handleSave = () => {
        setIsLoading(true);
        // Simulate API
        setTimeout(() => {
            setIsLoading(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 800);
    };

    const handleRevokeSession = (id: number) => {
        setSessions(sessions.filter(s => s.id !== id));
    };

    const toggleNotification = (category: 'bookingUpdates' | 'marketing', type: 'email' | 'sms' | 'push') => {
        setNotifications(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [type]: !prev[category][type]
            }
        }));
    };

    return (
        <DashboardLayout>
            <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-lux-dark">Preferences</h1>
                        <p className="text-lux-darkSec mt-1">Customize your app experience and manage security settings.</p>
                    </div>
                </div>

                {/* Success Message */}
                {showSuccess && (
                    <div className="bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2">
                        <CheckCircle2 size={20} />
                        <span className="font-bold">Preferences saved successfully.</span>
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: Settings */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Appearance */}
                        <GlassCard className="p-6 md:p-8">
                            <h2 className="text-xl font-bold text-lux-dark mb-6 flex items-center gap-2">
                                <Monitor size={20} className="text-lux-gold" />
                                Appearance
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[
                                    { id: 'light', label: 'Light', icon: <Sun size={24} /> },
                                    { id: 'dark', label: 'Dark', icon: <Moon size={24} /> },
                                    { id: 'system', label: 'System', icon: <Monitor size={24} /> },
                                ].map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => setTheme(option.id as ThemeOption)}
                                        className={`
                                            p-4 rounded-xl border flex flex-col items-center gap-3 transition-all
                                            ${theme === option.id 
                                                ? 'bg-lux-gold/10 border-lux-gold text-lux-dark ring-1 ring-lux-gold/50' 
                                                : 'bg-white/40 border-white/60 text-lux-darkSec hover:bg-white/60'}
                                        `}
                                    >
                                        <div className={theme === option.id ? 'text-lux-gold' : 'text-lux-darkSec'}>
                                            {option.icon}
                                        </div>
                                        <span className="font-bold text-sm">{option.label}</span>
                                        
                                        {/* Mock UI Preview */}
                                        <div className={`w-full h-16 rounded-lg border opacity-50 relative overflow-hidden ${option.id === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'}`}>
                                            <div className={`absolute top-2 left-2 right-2 h-2 rounded-full ${option.id === 'dark' ? 'bg-gray-600' : 'bg-white'}`}></div>
                                            <div className={`absolute top-6 left-2 w-8 h-2 rounded-full ${option.id === 'dark' ? 'bg-lux-gold/50' : 'bg-lux-gold/50'}`}></div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </GlassCard>

                        {/* Notifications */}
                        <GlassCard className="p-6 md:p-8">
                            <h2 className="text-xl font-bold text-lux-dark mb-6 flex items-center gap-2">
                                <Bell size={20} className="text-lux-gold" />
                                Notifications
                            </h2>
                            
                            <div className="space-y-6">
                                {/* Booking Updates */}
                                <div className="space-y-3">
                                    <h3 className="font-bold text-lux-dark text-sm uppercase tracking-wide">Booking Updates</h3>
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        <label className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${notifications.bookingUpdates.email ? 'bg-lux-gold/5 border-lux-gold/30' : 'bg-white/30 border-white/50'}`}>
                                            <div className="flex items-center gap-2">
                                                <Mail size={16} className="text-lux-darkSec" />
                                                <span className="text-sm font-medium text-lux-dark">Email</span>
                                            </div>
                                            <input 
                                                type="checkbox" 
                                                checked={notifications.bookingUpdates.email} 
                                                onChange={() => toggleNotification('bookingUpdates', 'email')}
                                                className="w-4 h-4 text-lux-gold focus:ring-lux-gold rounded border-gray-300" 
                                            />
                                        </label>
                                        <label className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${notifications.bookingUpdates.sms ? 'bg-lux-gold/5 border-lux-gold/30' : 'bg-white/30 border-white/50'}`}>
                                            <div className="flex items-center gap-2">
                                                <Smartphone size={16} className="text-lux-darkSec" />
                                                <span className="text-sm font-medium text-lux-dark">SMS</span>
                                            </div>
                                            <input 
                                                type="checkbox" 
                                                checked={notifications.bookingUpdates.sms} 
                                                onChange={() => toggleNotification('bookingUpdates', 'sms')}
                                                className="w-4 h-4 text-lux-gold focus:ring-lux-gold rounded border-gray-300" 
                                            />
                                        </label>
                                        <label className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${notifications.bookingUpdates.push ? 'bg-lux-gold/5 border-lux-gold/30' : 'bg-white/30 border-white/50'}`}>
                                            <div className="flex items-center gap-2">
                                                <Bell size={16} className="text-lux-darkSec" />
                                                <span className="text-sm font-medium text-lux-dark">Push</span>
                                            </div>
                                            <input 
                                                type="checkbox" 
                                                checked={notifications.bookingUpdates.push} 
                                                onChange={() => toggleNotification('bookingUpdates', 'push')}
                                                className="w-4 h-4 text-lux-gold focus:ring-lux-gold rounded border-gray-300" 
                                            />
                                        </label>
                                    </div>
                                </div>

                                <hr className="border-lux-darkSec/10" />

                                {/* Marketing */}
                                <div className="space-y-3">
                                    <h3 className="font-bold text-lux-dark text-sm uppercase tracking-wide">Promotions & News</h3>
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        <label className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${notifications.marketing.email ? 'bg-lux-gold/5 border-lux-gold/30' : 'bg-white/30 border-white/50'}`}>
                                            <div className="flex items-center gap-2">
                                                <Mail size={16} className="text-lux-darkSec" />
                                                <span className="text-sm font-medium text-lux-dark">Email</span>
                                            </div>
                                            <input 
                                                type="checkbox" 
                                                checked={notifications.marketing.email} 
                                                onChange={() => toggleNotification('marketing', 'email')}
                                                className="w-4 h-4 text-lux-gold focus:ring-lux-gold rounded border-gray-300" 
                                            />
                                        </label>
                                        <label className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${notifications.marketing.sms ? 'bg-lux-gold/5 border-lux-gold/30' : 'bg-white/30 border-white/50'}`}>
                                            <div className="flex items-center gap-2">
                                                <Smartphone size={16} className="text-lux-darkSec" />
                                                <span className="text-sm font-medium text-lux-dark">SMS</span>
                                            </div>
                                            <input 
                                                type="checkbox" 
                                                checked={notifications.marketing.sms} 
                                                onChange={() => toggleNotification('marketing', 'sms')}
                                                className="w-4 h-4 text-lux-gold focus:ring-lux-gold rounded border-gray-300" 
                                            />
                                        </label>
                                    </div>
                                    <label className="flex items-center gap-3 cursor-pointer mt-2">
                                        <div className="relative">
                                            <input 
                                                type="checkbox" 
                                                checked={notifications.newsletter} 
                                                onChange={() => setNotifications({...notifications, newsletter: !notifications.newsletter})}
                                                className="sr-only peer"
                                            />
                                            <div className="w-10 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lux-gold"></div>
                                        </div>
                                        <span className="text-sm text-lux-darkSec">Subscribe to monthly newsletter</span>
                                    </label>
                                </div>
                            </div>
                        </GlassCard>

                         {/* Regional */}
                         <GlassCard className="p-6 md:p-8">
                            <h2 className="text-xl font-bold text-lux-dark mb-6 flex items-center gap-2">
                                <Globe size={20} className="text-lux-gold" />
                                Regional
                            </h2>
                            <div className="space-y-4 max-w-md">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-lux-dark ml-1">Language</label>
                                    <select 
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all cursor-pointer"
                                    >
                                        <option value="en-US">English (United States)</option>
                                        <option value="en-UK">English (United Kingdom)</option>
                                        <option value="es">Español</option>
                                        <option value="fr">Français</option>
                                    </select>
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Right Column: Security & Privacy */}
                    <div className="space-y-8">
                        
                        {/* Privacy */}
                        <GlassCard className="p-6 md:p-8">
                             <h2 className="text-xl font-bold text-lux-dark mb-6 flex items-center gap-2">
                                <Eye size={20} className="text-lux-gold" />
                                Privacy
                            </h2>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-bold text-lux-dark text-sm">Location History</p>
                                        <p className="text-xs text-lux-darkSec">Save visited places for quicker booking</p>
                                    </div>
                                    <button 
                                        onClick={() => setPrivacy({...privacy, locationHistory: !privacy.locationHistory})}
                                        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${privacy.locationHistory ? 'bg-lux-gold' : 'bg-gray-300'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${privacy.locationHistory ? 'left-7' : 'left-1'}`}></div>
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-bold text-lux-dark text-sm">Data Sharing</p>
                                        <p className="text-xs text-lux-darkSec">Allow analytical data collection</p>
                                    </div>
                                    <button 
                                        onClick={() => setPrivacy({...privacy, dataSharing: !privacy.dataSharing})}
                                        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${privacy.dataSharing ? 'bg-lux-gold' : 'bg-gray-300'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${privacy.dataSharing ? 'left-7' : 'left-1'}`}></div>
                                    </button>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Security */}
                        <GlassCard className="p-6 md:p-8">
                             <h2 className="text-xl font-bold text-lux-dark mb-6 flex items-center gap-2">
                                <Shield size={20} className="text-lux-gold" />
                                Security
                            </h2>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 rounded-xl bg-lux-primary/5 border border-lux-primary/10">
                                    <div>
                                        <p className="font-bold text-lux-dark text-sm flex items-center gap-2">
                                            Two-Factor Auth
                                            {twoFactor && <CheckCircle2 size={14} className="text-green-600" />}
                                        </p>
                                        <p className="text-xs text-lux-darkSec">Secure your account</p>
                                    </div>
                                    <button 
                                        onClick={() => setTwoFactor(!twoFactor)}
                                        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${twoFactor ? 'bg-lux-gold' : 'bg-gray-300'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${twoFactor ? 'left-7' : 'left-1'}`}></div>
                                    </button>
                                </div>

                                <div>
                                    <h3 className="font-bold text-lux-dark text-sm mb-3">Active Sessions</h3>
                                    <div className="space-y-3">
                                        {sessions.map(session => (
                                            <div key={session.id} className="flex items-center justify-between p-3 rounded-xl bg-white/40 border border-white/60">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-lux-darkSec/10 flex items-center justify-center text-lux-darkSec">
                                                        {session.type === 'desktop' ? <Laptop size={14} /> : <SmartphoneNfc size={14} />}
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-lux-dark">{session.device}</p>
                                                        <p className="text-[10px] text-lux-darkSec">{session.location} • {session.active}</p>
                                                    </div>
                                                </div>
                                                {session.active !== 'Active Now' && (
                                                    <button 
                                                        onClick={() => handleRevokeSession(session.id)}
                                                        className="text-xs font-bold text-red-600 hover:text-red-700"
                                                    >
                                                        Revoke
                                                    </button>
                                                )}
                                                {session.active === 'Active Now' && (
                                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                                )}
                                            </div>
                                        ))}
                                        {sessions.length === 0 && <p className="text-sm text-lux-darkSec italic">No active sessions.</p>}
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                    </div>
                </div>

                {/* Footer Action */}
                <div className="sticky bottom-4 z-10 flex justify-end max-w-5xl mx-auto">
                    <GradientButton onClick={handleSave} disabled={isLoading} className="shadow-2xl shadow-lux-gold/20">
                        {isLoading ? (
                            <span className="flex items-center gap-2">Saving...</span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Save size={18} />
                                Save Preferences
                            </span>
                        )}
                    </GradientButton>
                </div>

            </div>
        </DashboardLayout>
    );
};

export default MemberPreferencesPage;