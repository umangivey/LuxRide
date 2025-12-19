import React, { useState } from 'react';
import { 
    Accessibility, 
    Dog, 
    Ear, 
    Eye, 
    Save, 
    CheckCircle2, 
    Info,
    Move
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

const MemberAccessibilityPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Form State
    const [preferences, setPreferences] = useState({
        wheelchairAccess: false,
        serviceAnimal: 'none',
        mobilityAssistance: false,
        hearingVision: '',
        specialNotes: ''
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 800);
    };

    return (
        <DashboardLayout>
            <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto pb-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-lux-dark">Accessibility & Accommodations</h1>
                        <p className="text-lux-darkSec mt-1">
                            We ensure all members can book transfers with confidence and comfort.
                        </p>
                    </div>
                </div>

                {/* Success Message */}
                {showSuccess && (
                    <div className="bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2">
                        <CheckCircle2 size={20} />
                        <span className="font-bold">Accessibility preferences saved for future bookings.</span>
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <GlassCard className="p-8">
                            <form onSubmit={handleSave} className="space-y-8">
                                
                                {/* Mobility Section */}
                                <div>
                                    <h3 className="text-lg font-bold text-lux-dark mb-4 flex items-center gap-2">
                                        <Accessibility size={20} className="text-lux-gold" />
                                        Mobility Needs
                                    </h3>
                                    <div className="space-y-4">
                                        <label className={`
                                            flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer
                                            ${preferences.wheelchairAccess 
                                                ? 'bg-lux-gold/10 border-lux-gold' 
                                                : 'bg-white/40 border-white/60 hover:bg-white/60'}
                                        `}>
                                            <input 
                                                type="checkbox" 
                                                checked={preferences.wheelchairAccess}
                                                onChange={(e) => setPreferences({...preferences, wheelchairAccess: e.target.checked})}
                                                className="mt-1 w-5 h-5 text-lux-gold focus:ring-lux-gold border-gray-300 rounded"
                                            />
                                            <div>
                                                <span className="font-bold text-lux-dark block">Wheelchair Accessible Vehicle (WAV)</span>
                                                <p className="text-sm text-lux-darkSec mt-1">
                                                    I require a vehicle equipped with a ramp or lift.
                                                </p>
                                            </div>
                                        </label>

                                        <label className={`
                                            flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer
                                            ${preferences.mobilityAssistance 
                                                ? 'bg-lux-gold/10 border-lux-gold' 
                                                : 'bg-white/40 border-white/60 hover:bg-white/60'}
                                        `}>
                                            <input 
                                                type="checkbox" 
                                                checked={preferences.mobilityAssistance}
                                                onChange={(e) => setPreferences({...preferences, mobilityAssistance: e.target.checked})}
                                                className="mt-1 w-5 h-5 text-lux-gold focus:ring-lux-gold border-gray-300 rounded"
                                            />
                                            <div>
                                                <span className="font-bold text-lux-dark block">Driver Assistance</span>
                                                <p className="text-sm text-lux-darkSec mt-1">
                                                    I need physical assistance from the door to the vehicle and vice versa.
                                                </p>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <hr className="border-lux-darkSec/10" />

                                {/* Service Animal Section */}
                                <div>
                                    <h3 className="text-lg font-bold text-lux-dark mb-4 flex items-center gap-2">
                                        <Dog size={20} className="text-lux-gold" />
                                        Service Animals
                                    </h3>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-lux-dark ml-1">Do you travel with a service animal?</label>
                                        <select 
                                            value={preferences.serviceAnimal}
                                            onChange={(e) => setPreferences({...preferences, serviceAnimal: e.target.value})}
                                            className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all"
                                        >
                                            <option value="none">No, I do not</option>
                                            <option value="guide_dog">Yes - Guide Dog</option>
                                            <option value="hearing_dog">Yes - Hearing Dog</option>
                                            <option value="mobility_dog">Yes - Mobility Support Dog</option>
                                            <option value="other">Yes - Other Service Animal</option>
                                        </select>
                                        <p className="text-xs text-lux-darkSec ml-1">
                                            Service animals are always welcome in all vehicles at no extra charge.
                                        </p>
                                    </div>
                                </div>

                                <hr className="border-lux-darkSec/10" />

                                {/* Sensory & Notes */}
                                <div>
                                    <h3 className="text-lg font-bold text-lux-dark mb-4 flex items-center gap-2">
                                        <Ear size={20} className="text-lux-gold" />
                                        Sensory & Additional Notes
                                    </h3>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-lux-dark ml-1">Hearing or Vision Accommodations</label>
                                            <input 
                                                type="text" 
                                                value={preferences.hearingVision}
                                                onChange={(e) => setPreferences({...preferences, hearingVision: e.target.value})}
                                                placeholder="e.g. Prefer text communication, need visual alerts..."
                                                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-lux-dark ml-1">Special Instructions for Chauffeur</label>
                                            <textarea 
                                                rows={4}
                                                value={preferences.specialNotes}
                                                onChange={(e) => setPreferences({...preferences, specialNotes: e.target.value})}
                                                placeholder="Any specific details that will help us serve you better (e.g. need front seat, sensitive to temperature, etc.)"
                                                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <GradientButton disabled={isLoading} className="w-full md:w-auto shadow-lux-gold/20">
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

                            </form>
                        </GlassCard>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <GlassCard className="p-6 bg-gradient-to-br from-lux-primary/5 to-transparent">
                            <div className="flex items-start gap-4">
                                <Info size={24} className="text-lux-gold shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-lux-dark mb-2">Our Commitment</h4>
                                    <p className="text-sm text-lux-darkSec leading-relaxed">
                                        LuxRide is dedicated to providing equal access to luxury transportation for everyone. If our digital tools do not meet your specific needs, please contact our dedicated accessibility line.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="p-6">
                            <h4 className="font-bold text-lux-dark mb-4">Saved Profile Status</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-lux-darkSec">Vehicle Type</span>
                                    <span className="font-bold text-lux-dark">{preferences.wheelchairAccess ? 'WAV' : 'Standard'}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-lux-darkSec">Assistance</span>
                                    <span className="font-bold text-lux-dark">{preferences.mobilityAssistance ? 'Required' : 'Standard'}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-lux-darkSec">Service Animal</span>
                                    <span className="font-bold text-lux-dark capitalize">{preferences.serviceAnimal.replace('_', ' ')}</span>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-lux-darkSec/10">
                                <p className="text-xs text-lux-darkSec italic">
                                    These settings will automatically apply to all future bookings.
                                </p>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default MemberAccessibilityPage;