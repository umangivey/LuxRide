import React from 'react';
import { HelpCircle, MessageSquare, Phone, Mail, Plus } from 'lucide-react';
import { DriverLayout } from '../../components/layout/DriverLayout';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

const DriverSupportPage: React.FC = () => {
    return (
        <DriverLayout>
            <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-serif font-bold text-lux-dark">Driver Support</h1>
                    <GradientButton className="px-6 py-2">
                        <span className="flex items-center gap-2"><Plus size={18} /> New Ticket</span>
                    </GradientButton>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <GlassCard className="p-6 text-center hover:bg-white/60 transition-colors cursor-pointer">
                        <div className="w-12 h-12 rounded-full bg-lux-primary/5 flex items-center justify-center text-lux-primary mx-auto mb-4">
                            <Phone size={24} />
                        </div>
                        <h3 className="font-bold text-lux-dark">Driver Hotline</h3>
                        <p className="text-sm text-lux-darkSec mt-1">24/7 Emergency Support</p>
                    </GlassCard>
                    <GlassCard className="p-6 text-center hover:bg-white/60 transition-colors cursor-pointer">
                        <div className="w-12 h-12 rounded-full bg-lux-primary/5 flex items-center justify-center text-lux-primary mx-auto mb-4">
                            <MessageSquare size={24} />
                        </div>
                        <h3 className="font-bold text-lux-dark">Live Chat</h3>
                        <p className="text-sm text-lux-darkSec mt-1">Chat with an agent</p>
                    </GlassCard>
                    <GlassCard className="p-6 text-center hover:bg-white/60 transition-colors cursor-pointer">
                        <div className="w-12 h-12 rounded-full bg-lux-primary/5 flex items-center justify-center text-lux-primary mx-auto mb-4">
                            <Mail size={24} />
                        </div>
                        <h3 className="font-bold text-lux-dark">Email Us</h3>
                        <p className="text-sm text-lux-darkSec mt-1">Response within 24h</p>
                    </GlassCard>
                </div>

                <h2 className="text-xl font-bold text-lux-dark mt-8 mb-4">Recent Tickets</h2>
                <div className="space-y-4">
                    <GlassCard className="p-6 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lux-dark">Fare Adjustment Request</h3>
                            <p className="text-sm text-lux-darkSec">Trip #TR-8819 • Oct 23</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">In Progress</span>
                    </GlassCard>
                    <GlassCard className="p-6 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lux-dark">App Issue: GPS Glitch</h3>
                            <p className="text-sm text-lux-darkSec">Oct 15</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">Resolved</span>
                    </GlassCard>
                </div>
            </div>
        </DriverLayout>
    );
};

export default DriverSupportPage;