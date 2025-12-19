import React from 'react';
import { User, Car, Globe, Shield, Save } from 'lucide-react';
import { DriverLayout } from '../../components/layout/DriverLayout';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

const DriverProfilePage: React.FC = () => {
    return (
        <DriverLayout>
            <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto pb-12">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-serif font-bold text-lux-dark">Driver Profile</h1>
                    <GradientButton className="px-6 py-2">
                        <span className="flex items-center gap-2">
                            <Save size={18} /> Save Changes
                        </span>
                    </GradientButton>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-1 space-y-6">
                        <GlassCard className="p-6 text-center">
                            <div className="relative inline-block mb-4">
                                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" />
                                <button className="absolute bottom-0 right-0 bg-lux-gold text-white p-2 rounded-full shadow-md hover:bg-lux-primary transition-colors">
                                    <User size={16} />
                                </button>
                            </div>
                            <h2 className="text-xl font-bold text-lux-dark">Michael C.</h2>
                            <p className="text-lux-darkSec text-sm">Joined 2021</p>
                        </GlassCard>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <GlassCard className="p-8">
                            <h3 className="font-bold text-lux-dark text-lg mb-6 flex items-center gap-2">
                                <User size={20} className="text-lux-gold" /> Personal Info
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-lux-dark ml-1">Bio / About Me</label>
                                    <textarea rows={3} className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none resize-none" defaultValue="Professional chauffeur with 10+ years of experience. Friendly and discreet." />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-lux-dark ml-1">Languages Spoken</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none" defaultValue="English, Spanish" />
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="p-8">
                            <h3 className="font-bold text-lux-dark text-lg mb-6 flex items-center gap-2">
                                <Car size={20} className="text-lux-gold" /> Vehicle Information
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-lux-dark ml-1">Make & Model</label>
                                    <input type="text" disabled className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-transparent text-gray-500 cursor-not-allowed" defaultValue="Mercedes-Benz S-Class" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-lux-dark ml-1">License Plate</label>
                                    <input type="text" disabled className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-transparent text-gray-500 cursor-not-allowed" defaultValue="LUX-8821" />
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </DriverLayout>
    );
};

export default DriverProfilePage;