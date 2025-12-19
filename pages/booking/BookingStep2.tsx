import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Navigation, Building2, Plane, ArrowRight, ArrowLeft } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

const BookingStep2: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { journeyType } = location.state || { journeyType: 'point-to-point' };

  const [pickupLocation, setPickupLocation] = useState('');
  const [terminal, setTerminal] = useState('');

  const handleContinue = () => {
    if (pickupLocation || terminal) {
      navigate('/book/step-3', { 
        state: { 
          journeyType, 
          pickup: journeyType === 'arrival' ? `ATL Airport - Terminal ${terminal}` : pickupLocation 
        } 
      });
    }
  };

  const isAirportPickup = journeyType === 'arrival';

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
           <h1 className="text-3xl md:text-4xl font-serif font-bold text-lux-dark">
            Select Pickup Location
          </h1>
          <span className="text-sm font-bold text-lux-gold uppercase tracking-widest">Step 2 of 5</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div className="bg-lux-gold h-1.5 rounded-full transition-all duration-500" style={{ width: '40%' }}></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
            <p className="text-xl text-lux-darkSec">
                Where should we meet you?
            </p>

            {isAirportPickup ? (
                <GlassCard className="p-8">
                    <h3 className="text-lg font-bold text-lux-dark mb-4 flex items-center gap-2">
                        <Plane className="text-lux-gold" />
                        Select Terminal
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {['Domestic N', 'Domestic S', 'Intl', 'Private'].map((t) => (
                            <button
                                key={t}
                                onClick={() => setTerminal(t)}
                                className={`
                                    p-4 rounded-xl border transition-all font-bold text-sm
                                    ${terminal === t 
                                        ? 'bg-lux-gold text-white border-lux-gold shadow-lg shadow-lux-gold/30' 
                                        : 'bg-white/50 border-white/60 text-lux-dark hover:bg-white hover:border-lux-gold/50'}
                                `}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                    {terminal && (
                        <div className="mt-6 p-4 bg-lux-primary/5 rounded-xl border border-lux-primary/10 flex items-start gap-3">
                            <Navigation size={20} className="text-lux-primary shrink-0 mt-0.5" />
                            <div>
                                <p className="font-bold text-lux-dark text-sm">Curbside Pickup</p>
                                <p className="text-xs text-lux-darkSec">Your chauffeur will be waiting at the Limousine/Rideshare zone for {terminal}.</p>
                            </div>
                        </div>
                    )}
                </GlassCard>
            ) : (
                <GlassCard className="p-8">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-lux-dark ml-1">Enter Address or Venue</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-lux-darkSec group-focus-within:text-lux-gold transition-colors">
                                    <MapPin size={20} />
                                </div>
                                <input 
                                    type="text" 
                                    value={pickupLocation}
                                    onChange={(e) => setPickupLocation(e.target.value)}
                                    placeholder="e.g. The Ritz-Carlton, Atlanta"
                                    className="w-full pl-11 pr-4 py-4 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all shadow-sm"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Quick Select Suggestions */}
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-lux-darkSec uppercase tracking-wide ml-1">Popular Locations</p>
                            <div className="flex flex-wrap gap-2">
                                {['The Ritz-Carlton', 'Four Seasons', 'Buckhead Plaza', 'St. Regis'].map((loc) => (
                                    <button 
                                        key={loc}
                                        onClick={() => setPickupLocation(loc)}
                                        className="px-3 py-1.5 rounded-full bg-white/40 border border-white/60 text-xs font-medium text-lux-dark hover:bg-lux-gold/10 hover:border-lux-gold/30 transition-colors"
                                    >
                                        <Building2 size={12} className="inline mr-1 opacity-50"/>
                                        {loc}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </GlassCard>
            )}

            <div className="flex justify-between pt-4">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-6 py-3 rounded-full text-lux-dark font-bold hover:bg-white/40 transition-colors"
                >
                    <ArrowLeft size={18} />
                    Back
                </button>
                <GradientButton 
                    onClick={handleContinue} 
                    className={`
                        px-8 transition-all duration-300
                        ${(!pickupLocation && !terminal) ? 'opacity-50 cursor-not-allowed grayscale' : 'opacity-100'}
                    `}
                >
                    <span className="flex items-center gap-2">
                        Next Step
                        <ArrowRight size={18} />
                    </span>
                </GradientButton>
            </div>
        </div>

        {/* Map Visualization Placeholder */}
        <div className="hidden lg:block h-full min-h-[400px]">
            <GlassCard className="h-full p-2 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-lux-dark/5">
                    {/* Abstract Map Pattern */}
                    <div className="w-full h-full opacity-30" style={{
                        backgroundImage: 'radial-gradient(#6B5E55 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}></div>
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white flex flex-col items-center gap-2">
                        <MapPin size={32} className="text-lux-gold animate-bounce" />
                        <p className="font-bold text-lux-dark">
                            {pickupLocation || (terminal ? `ATL Terminal ${terminal}` : 'Select Location')}
                        </p>
                        <p className="text-xs text-lux-darkSec">Atlanta Metro Area</p>
                    </div>
                 </div>
            </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default BookingStep2;