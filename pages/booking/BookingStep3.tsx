import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Navigation, Building2, Plane, ArrowRight, ArrowLeft, MoreHorizontal } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

const BookingStep3: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { journeyType, pickup } = location.state || { journeyType: 'point-to-point', pickup: 'Unknown' };

  const [dropoffLocation, setDropoffLocation] = useState('');
  const [terminal, setTerminal] = useState('');

  const handleContinue = () => {
    if (dropoffLocation || terminal) {
      navigate('/book/step-4', { 
        state: { 
          journeyType, 
          pickup,
          dropoff: journeyType === 'departure' ? `ATL Airport - Terminal ${terminal}` : dropoffLocation 
        } 
      });
    }
  };

  const isAirportDropoff = journeyType === 'departure';

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
           <h1 className="text-3xl md:text-4xl font-serif font-bold text-lux-dark">
            Select Dropoff Location
          </h1>
          <span className="text-sm font-bold text-lux-gold uppercase tracking-widest">Step 3 of 5</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div className="bg-lux-gold h-1.5 rounded-full transition-all duration-500" style={{ width: '60%' }}></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
            
            {/* Route Summary */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-lux-primary/5 border border-lux-primary/10">
                <div className="flex flex-col items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-lux-gold"></div>
                    <div className="w-0.5 h-8 bg-lux-gold/30"></div>
                    <div className="w-2 h-2 rounded-full border-2 border-lux-gold bg-white"></div>
                </div>
                <div className="flex-1 space-y-4">
                    <div>
                        <p className="text-xs font-bold text-lux-darkSec uppercase">Pickup</p>
                        <p className="font-bold text-lux-dark truncate">{pickup}</p>
                    </div>
                    <div>
                         <p className="text-xs font-bold text-lux-darkSec uppercase">Dropoff</p>
                         <p className="font-bold text-lux-dark/60 italic">{dropoffLocation || (terminal ? `ATL Terminal ${terminal}` : 'Select destination...')}</p>
                    </div>
                </div>
            </div>

            <p className="text-xl text-lux-darkSec">
                Where are we heading?
            </p>

            {isAirportDropoff ? (
                <GlassCard className="p-8">
                    <h3 className="text-lg font-bold text-lux-dark mb-4 flex items-center gap-2">
                        <Plane className="text-lux-gold" />
                        Select Departure Terminal
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
                                    value={dropoffLocation}
                                    onChange={(e) => setDropoffLocation(e.target.value)}
                                    placeholder="e.g. 123 Peachtree St NE"
                                    className="w-full pl-11 pr-4 py-4 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all shadow-sm"
                                    autoFocus
                                />
                            </div>
                        </div>

                         {/* Quick Select Suggestions */}
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-lux-darkSec uppercase tracking-wide ml-1">Popular Destinations</p>
                            <div className="flex flex-wrap gap-2">
                                {['Hartsfield-Jackson', 'Midtown', 'Buckhead', 'Downtown', 'Alpharetta'].map((loc) => (
                                    <button 
                                        key={loc}
                                        onClick={() => setDropoffLocation(loc)}
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
                        ${(!dropoffLocation && !terminal) ? 'opacity-50 cursor-not-allowed grayscale' : 'opacity-100'}
                    `}
                >
                    <span className="flex items-center gap-2">
                        Next Step
                        <ArrowRight size={18} />
                    </span>
                </GradientButton>
            </div>
        </div>

        {/* Distance/Time Estimation Mock */}
        <div className="hidden lg:block h-full min-h-[400px]">
            <GlassCard className="h-full p-2 relative overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-0 bg-lux-dark/5">
                    {/* Abstract Map Pattern */}
                    <div className="w-full h-full opacity-30" style={{
                        backgroundImage: 'radial-gradient(#6B5E55 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}></div>
                 </div>
                 
                 <div className="relative z-10 w-full max-w-sm">
                    {dropoffLocation || terminal ? (
                        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white animate-in zoom-in-95">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <p className="text-xs font-bold text-lux-darkSec uppercase">Est. Distance</p>
                                    <p className="text-2xl font-bold text-lux-dark">12.4 mi</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-lux-darkSec uppercase">Est. Time</p>
                                    <p className="text-2xl font-bold text-lux-dark">28 min</p>
                                </div>
                            </div>
                            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-lux-gold w-2/3"></div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center opacity-50">
                            <Navigation size={48} className="mx-auto mb-2" />
                            <p>Select a destination to calculate route</p>
                        </div>
                    )}
                 </div>
            </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default BookingStep3;