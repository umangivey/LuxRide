import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Clock, Zap, ArrowRight, ArrowLeft, Sun, Moon } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

const BookingStep4: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { journeyType, pickup, dropoff } = location.state || { journeyType: 'point-to-point', pickup: 'Unknown', dropoff: 'Unknown' };

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isSurge, setIsSurge] = useState(false);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTime(val);
    // Mock surge logic: 5PM - 8PM
    const hour = parseInt(val.split(':')[0]);
    if (hour >= 17 && hour <= 20) {
        setIsSurge(true);
    } else {
        setIsSurge(false);
    }
  };

  const setASAP = () => {
    const now = new Date();
    // Round to next 30 min
    now.setMinutes(now.getMinutes() + 30);
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().slice(0, 5);
    setDate(dateStr);
    setTime(timeStr);
    handleTimeChange({ target: { value: timeStr } } as any);
  };

  const handleContinue = () => {
    if (date && time) {
      navigate('/book/step-5', { 
        state: { 
          journeyType, 
          pickup,
          dropoff,
          date,
          time,
          isSurge
        } 
      });
    }
  };

  // Get current date string for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
           <h1 className="text-3xl md:text-4xl font-serif font-bold text-lux-dark">
            Schedule Pickup
          </h1>
          <span className="text-sm font-bold text-lux-gold uppercase tracking-widest">Step 4 of 5</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div className="bg-lux-gold h-1.5 rounded-full transition-all duration-500" style={{ width: '80%' }}></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
            
            {/* Quick Options */}
            <div className="flex gap-4">
                <button 
                    onClick={setASAP}
                    className="flex-1 py-4 rounded-xl border border-lux-gold/30 bg-lux-gold/5 hover:bg-lux-gold/10 text-lux-dark font-bold transition-all shadow-sm flex flex-col items-center justify-center gap-1"
                >
                    <Zap size={20} className="text-lux-gold fill-lux-gold" />
                    ASAP (Next 30m)
                </button>
                <button 
                     onClick={() => { setDate(today); setTime('18:00'); setIsSurge(true); }}
                    className="flex-1 py-4 rounded-xl border border-white/60 bg-white/40 hover:bg-white/60 text-lux-dark font-bold transition-all shadow-sm flex flex-col items-center justify-center gap-1"
                >
                    <Moon size={20} className="text-lux-primary" />
                    Tonight
                </button>
                 <button 
                     onClick={() => { 
                         const tmrw = new Date(); tmrw.setDate(tmrw.getDate() + 1); 
                         setDate(tmrw.toISOString().split('T')[0]); 
                         setTime('09:00'); 
                         setIsSurge(false);
                     }}
                    className="flex-1 py-4 rounded-xl border border-white/60 bg-white/40 hover:bg-white/60 text-lux-dark font-bold transition-all shadow-sm flex flex-col items-center justify-center gap-1"
                >
                    <Sun size={20} className="text-lux-primary" />
                    Tomorrow
                </button>
            </div>

            <GlassCard className="p-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-lux-dark ml-1">Select Date</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-lux-darkSec">
                                <Calendar size={20} />
                            </div>
                            <input 
                                type="date" 
                                min={today}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full pl-11 pr-4 py-4 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-lux-dark ml-1">Select Time</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-lux-darkSec">
                                <Clock size={20} />
                            </div>
                            <input 
                                type="time" 
                                value={time}
                                onChange={handleTimeChange}
                                className="w-full pl-11 pr-4 py-4 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </GlassCard>

            {isSurge && (
                <div className="animate-in slide-in-from-top-4 fade-in">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-lux-gold/20 to-lux-primary/20 border border-lux-gold/30 flex items-start gap-4">
                        <Zap size={24} className="text-lux-gold fill-lux-gold shrink-0 mt-0.5" />
                        <div>
                            <p className="font-bold text-lux-dark">Peak Hours Detected</p>
                            <p className="text-sm text-lux-darkSec mt-1">
                                Demand is higher than usual. Standard surge pricing may apply to your booking total.
                            </p>
                        </div>
                    </div>
                </div>
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
                        ${(!date || !time) ? 'opacity-50 cursor-not-allowed grayscale' : 'opacity-100'}
                    `}
                >
                    <span className="flex items-center gap-2">
                        Next Step
                        <ArrowRight size={18} />
                    </span>
                </GradientButton>
            </div>
        </div>

        {/* Info Column */}
        <div className="hidden lg:block">
            <GlassCard className="h-full p-8 flex flex-col justify-center text-center">
                 <div className="mb-6 mx-auto w-20 h-20 rounded-full bg-lux-primary/5 flex items-center justify-center text-lux-primary">
                    <Clock size={40} />
                 </div>
                 <h3 className="text-2xl font-serif font-bold text-lux-dark mb-4">Precision Timing</h3>
                 <p className="text-lux-darkSec mb-8 leading-relaxed">
                    Our chauffeurs arrive 15 minutes prior to your scheduled pickup time. We monitor traffic conditions in real-time to ensure punctuality.
                 </p>
                 <div className="bg-white/50 rounded-xl p-4 text-left border border-white/60">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-lux-darkSec uppercase">Cancellation Policy</span>
                    </div>
                    <p className="text-sm text-lux-darkSec">
                        Free cancellation until 2 hours before pickup.
                    </p>
                 </div>
            </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default BookingStep4;