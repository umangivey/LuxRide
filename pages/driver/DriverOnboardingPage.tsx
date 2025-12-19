import React from 'react';
import { PlayCircle, CheckCircle2, Award, BookOpen } from 'lucide-react';
import { DriverLayout } from '../../components/layout/DriverLayout';
import { GlassCard } from '../../components/ui/GlassCard';

const DriverOnboardingPage: React.FC = () => {
    return (
        <DriverLayout>
            <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12">
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-serif font-bold text-lux-dark">Driver Training</h1>
                    <p className="text-lux-darkSec mt-1">Master the art of luxury service.</p>
                </div>

                <GlassCard className="p-8 bg-gradient-to-r from-lux-gold/20 to-lux-primary/10 border-lux-gold/20">
                    <div className="flex items-start gap-6">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-lux-gold shadow-lg shrink-0">
                            <Award size={32} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-lux-dark mb-2">Welcome to LuxRide Academy</h2>
                            <p className="text-lux-darkSec mb-4 max-w-2xl">Complete these training modules to unlock your "Verified Chauffeur" badge and access higher-tier trips.</p>
                            <div className="w-full bg-white/50 h-2 rounded-full overflow-hidden max-w-md">
                                <div className="bg-lux-gold h-full w-1/3"></div>
                            </div>
                            <p className="text-xs font-bold text-lux-darkSec mt-2 uppercase">33% Completed</p>
                        </div>
                    </div>
                </GlassCard>

                <h2 className="text-xl font-bold text-lux-dark mt-8 mb-4">Required Modules</h2>
                <div className="space-y-4">
                    {[
                        { title: 'The LuxRide Standard', duration: '5 min', completed: true },
                        { title: 'App Navigation & Safety', duration: '8 min', completed: false },
                        { title: 'Customer Service Excellence', duration: '12 min', completed: false },
                        { title: 'Emergency Procedures', duration: '6 min', completed: false },
                    ].map((module, i) => (
                        <GlassCard key={i} className={`p-4 flex items-center justify-between ${module.completed ? 'opacity-70' : 'hover:border-lux-gold/40 cursor-pointer'}`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${module.completed ? 'bg-green-100 text-green-600' : 'bg-lux-primary/10 text-lux-primary'}`}>
                                    {module.completed ? <CheckCircle2 size={20} /> : <PlayCircle size={20} />}
                                </div>
                                <div>
                                    <h3 className={`font-bold ${module.completed ? 'text-lux-darkSec line-through' : 'text-lux-dark'}`}>{module.title}</h3>
                                    <p className="text-xs text-lux-darkSec">{module.duration} • Video</p>
                                </div>
                            </div>
                            {!module.completed && <button className="text-xs font-bold text-lux-gold hover:underline">Start</button>}
                        </GlassCard>
                    ))}
                </div>
            </div>
        </DriverLayout>
    );
};

export default DriverOnboardingPage;