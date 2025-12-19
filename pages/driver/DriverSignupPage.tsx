import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Car, Shield, Briefcase, FileText, CheckCircle2, ArrowRight, ArrowLeft, Upload } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

const DriverSignupPage: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (step < 5) {
            setStep(step + 1);
        } else {
            setIsLoading(true);
            setTimeout(() => {
                navigate('/driver/dashboard');
            }, 1500);
        }
    };

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
            <div className="w-full max-w-4xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-serif font-bold text-lux-dark mb-2">Become a Chauffeur</h1>
                    <p className="text-lux-darkSec">Join the elite team of LuxRide drivers.</p>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-between items-center max-w-2xl mx-auto mb-10 relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
                    <div className="absolute top-1/2 left-0 h-1 bg-lux-gold -z-10 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 4) * 100}%` }}></div>
                    
                    {[
                        { num: 1, icon: <User size={16} />, label: 'Personal' },
                        { num: 2, icon: <Car size={16} />, label: 'Vehicle' },
                        { num: 3, icon: <Shield size={16} />, label: 'Insurance' },
                        { num: 4, icon: <Briefcase size={16} />, label: 'Bank' },
                        { num: 5, icon: <FileText size={16} />, label: 'Docs' }
                    ].map((s) => (
                        <div key={s.num} className="flex flex-col items-center gap-2 bg-lux-accent px-2">
                            <div className={`
                                w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2
                                ${step >= s.num ? 'bg-lux-gold border-lux-gold text-white' : 'bg-white border-gray-300 text-gray-400'}
                            `}>
                                {step > s.num ? <CheckCircle2 size={20} /> : s.icon}
                            </div>
                            <span className={`text-xs font-bold ${step >= s.num ? 'text-lux-gold' : 'text-gray-400'}`}>{s.label}</span>
                        </div>
                    ))}
                </div>

                <GlassCard className="p-8 md:p-12">
                    <form onSubmit={handleSubmit}>
                        
                        {/* Step 1: Personal Info */}
                        {step === 1 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                                <h2 className="text-xl font-bold text-lux-dark mb-4">Personal Information</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-lux-dark ml-1">Full Name</label>
                                        <input type="text" required className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-lux-dark ml-1">Email Address</label>
                                        <input type="email" required className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none" placeholder="john@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-lux-dark ml-1">Phone Number</label>
                                        <input type="tel" required className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none" placeholder="(555) 123-4567" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-lux-dark ml-1">SSN (Last 4)</label>
                                        <input type="text" maxLength={4} required className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none" placeholder="1234" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-bold text-lux-dark ml-1">Driver's License Number</label>
                                        <input type="text" required className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none" placeholder="D12345678" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Vehicle Info */}
                        {step === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                                <h2 className="text-xl font-bold text-lux-dark mb-4">Vehicle Information</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-lux-dark ml-1">Make</label>
                                        <input type="text" required className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none" placeholder="Mercedes-Benz" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-lux-dark ml-1">Model</label>
                                        <input type="text" required className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none" placeholder="S-Class" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-lux-dark ml-1">Year</label>
                                        <input type="number" min="2018" required className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none" placeholder="2023" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-lux-dark ml-1">Color</label>
                                        <input type="text" required className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none" placeholder="Black" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-lux-dark ml-1">License Plate</label>
                                        <input type="text" required className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none" placeholder="ABC-1234" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-lux-dark ml-1">VIN</label>
                                        <input type="text" required className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none" placeholder="1234567890ABCDEFG" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Insurance */}
                        {step === 3 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                                <h2 className="text-xl font-bold text-lux-dark mb-4">Insurance Information</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-lux-dark ml-1">Insurance Provider</label>
                                        <input type="text" required className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none" placeholder="Geico" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-lux-dark ml-1">Policy Number</label>
                                        <input type="text" required className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none" placeholder="123-456-789" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-lux-dark ml-1">Expiration Date</label>
                                        <input type="date" required className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Bank Account */}
                        {step === 4 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                                <h2 className="text-xl font-bold text-lux-dark mb-4">Payout Information</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-lux-dark ml-1">Bank Name</label>
                                        <input type="text" required className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none" placeholder="Chase" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-lux-dark ml-1">Account Holder Name</label>
                                        <input type="text" required className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-lux-dark ml-1">Routing Number</label>
                                        <input type="text" required className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none" placeholder="123456789" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-lux-dark ml-1">Account Number</label>
                                        <input type="text" required className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:ring-1 focus:ring-lux-gold outline-none" placeholder="987654321" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 5: Documents */}
                        {step === 5 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                                <h2 className="text-xl font-bold text-lux-dark mb-4">Upload Documents</h2>
                                <div className="space-y-4">
                                    {['Driver\'s License', 'Insurance Card', 'Vehicle Registration'].map((doc) => (
                                        <div key={doc} className="flex items-center justify-between p-4 rounded-xl border border-dashed border-lux-darkSec/30 bg-white/30 hover:bg-white/50 transition-colors cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-lux-primary/5 flex items-center justify-center text-lux-darkSec">
                                                    <FileText size={20} />
                                                </div>
                                                <span className="font-bold text-lux-dark">{doc}</span>
                                            </div>
                                            <button type="button" className="text-sm font-bold text-lux-gold hover:text-lux-primary flex items-center gap-1">
                                                <Upload size={14} /> Upload
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <hr className="border-lux-darkSec/10 my-4" />

                                <div className="space-y-4">
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input type="checkbox" required className="mt-1 w-5 h-5 text-lux-gold rounded focus:ring-lux-gold" />
                                        <span className="text-sm text-lux-darkSec">
                                            I consent to a comprehensive background check including criminal record and driving history.
                                        </span>
                                    </label>
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input type="checkbox" required className="mt-1 w-5 h-5 text-lux-gold rounded focus:ring-lux-gold" />
                                        <span className="text-sm text-lux-darkSec">
                                            I agree to the <a href="#" className="text-lux-gold font-bold hover:underline">Driver Terms & Conditions</a>.
                                        </span>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex justify-between mt-10">
                            {step > 1 ? (
                                <button
                                    type="button"
                                    onClick={() => setStep(step - 1)}
                                    className="flex items-center gap-2 px-6 py-3 rounded-full border border-lux-darkSec/20 text-lux-dark font-bold hover:bg-white/50 transition-colors"
                                >
                                    <ArrowLeft size={18} /> Back
                                </button>
                            ) : (
                                <div></div>
                            )}
                            
                            <GradientButton disabled={isLoading} className="px-8">
                                <span className="flex items-center gap-2">
                                    {isLoading ? 'Submitting...' : step === 5 ? 'Submit Application' : 'Continue'}
                                    {!isLoading && <ArrowRight size={18} />}
                                </span>
                            </GradientButton>
                        </div>
                    </form>
                </GlassCard>
            </div>
        </div>
    );
};

export default DriverSignupPage;