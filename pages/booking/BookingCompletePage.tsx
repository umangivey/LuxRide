import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star, Download, MapPin, Clock, DollarSign, Repeat, LayoutGrid, ArrowRight, Check, Car } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

const BookingCompletePage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [tipAmount, setTipAmount] = useState<number | null>(null);
  const [customTip, setCustomTip] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock Trip Data
  const trip = {
    pickup: 'The Ritz-Carlton, Atlanta',
    dropoff: 'Hartsfield-Jackson Intl (ATL)',
    date: 'Oct 24, 2023',
    time: '2:30 PM',
    distance: '12.4 mi',
    duration: '28 min',
    baseFare: 145.00,
    vehicle: 'Mercedes-Benz S-Class',
    driver: {
      name: 'Michael C.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  };

  const handleTipSelect = (amount: number) => {
    setTipAmount(amount);
    setCustomTip('');
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTip(e.target.value);
    setTipAmount(null);
  };

  const calculateTotal = () => {
    let tip = 0;
    if (tipAmount) tip = tipAmount;
    if (customTip) tip = parseFloat(customTip) || 0;
    return (trip.baseFare + tip).toFixed(2);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Simulate API submission
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        
        {/* Header */}
        <div className="text-center mb-8 animate-in slide-in-from-bottom-4 duration-700">
           <h1 className="text-3xl md:text-5xl font-serif font-bold text-lux-dark mb-2">
            Trip Completed
          </h1>
          <p className="text-xl text-lux-darkSec">
            Thank you for riding with LuxRide.
          </p>
        </div>

        {/* Trip Summary Card */}
        <GlassCard className="p-0 overflow-hidden mb-6">
           <div className="p-6 md:p-8 bg-white/40">
              <div className="flex justify-between items-start mb-6">
                  <div>
                      <p className="text-xs font-bold text-lux-darkSec uppercase tracking-wider mb-1">Total Paid</p>
                      <p className="text-3xl font-serif font-bold text-lux-dark">${calculateTotal()}</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-lux-darkSec/20 text-xs font-bold text-lux-dark hover:bg-white/60 transition-colors">
                      <Download size={14} />
                      Receipt PDF
                  </button>
              </div>

              {/* Route Visual */}
              <div className="relative pl-6 border-l-2 border-lux-gold/30 space-y-6 mb-8">
                  <div>
                      <p className="text-xs font-bold text-lux-darkSec uppercase mb-1">Pickup • {trip.time}</p>
                      <p className="font-bold text-lux-dark text-sm">{trip.pickup}</p>
                  </div>
                  <div>
                      <p className="text-xs font-bold text-lux-darkSec uppercase mb-1">Dropoff</p>
                      <p className="font-bold text-lux-dark text-sm">{trip.dropoff}</p>
                  </div>
                  <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-lux-gold"></div>
                  <div className="absolute left-[-5px] bottom-[34px] w-2 h-2 rounded-full bg-white border-2 border-lux-gold"></div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 py-4 border-t border-lux-darkSec/10">
                  <div className="text-center">
                      <div className="flex justify-center text-lux-gold mb-1"><MapPin size={18} /></div>
                      <p className="text-sm font-bold text-lux-dark">{trip.distance}</p>
                      <p className="text-xs text-lux-darkSec">Distance</p>
                  </div>
                  <div className="text-center">
                      <div className="flex justify-center text-lux-gold mb-1"><Clock size={18} /></div>
                      <p className="text-sm font-bold text-lux-dark">{trip.duration}</p>
                      <p className="text-xs text-lux-darkSec">Duration</p>
                  </div>
                  <div className="text-center">
                      <div className="flex justify-center text-lux-gold mb-1"><Car size={18} /></div>
                      <p className="text-sm font-bold text-lux-dark">{trip.vehicle}</p>
                      <p className="text-xs text-lux-darkSec">Vehicle</p>
                  </div>
              </div>
           </div>
        </GlassCard>

        {/* Rating & Feedback Card */}
        {!isSubmitted ? (
            <GlassCard className="p-6 md:p-8 mb-8 animate-in slide-in-from-bottom-6 duration-700 delay-100">
                <div className="text-center mb-6">
                    <div className="inline-block relative mb-3">
                         <img src={trip.driver.image} alt={trip.driver.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md mx-auto" />
                         <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                             <Check size={12} className="text-white" />
                         </div>
                    </div>
                    <h3 className="text-lg font-bold text-lux-dark">Rate {trip.driver.name}</h3>
                    <p className="text-sm text-lux-darkSec">How was your chauffeur?</p>
                </div>

                {/* Stars */}
                <div className="flex justify-center gap-2 mb-8">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                            className="transition-transform hover:scale-110 focus:outline-none"
                        >
                            <Star 
                                size={32} 
                                className={`${(hoverRating || rating) >= star ? 'fill-lux-gold text-lux-gold' : 'fill-transparent text-lux-darkSec/30'} transition-colors duration-200`}
                            />
                        </button>
                    ))}
                </div>

                {/* Tip Section */}
                <div className="mb-6">
                    <label className="block text-sm font-bold text-lux-darkSec mb-3 text-center uppercase tracking-wide">Add a Tip</label>
                    <div className="grid grid-cols-4 gap-3">
                        {[1, 3, 5].map((amt) => (
                            <button
                                key={amt}
                                onClick={() => handleTipSelect(amt)}
                                className={`py-2 rounded-xl border font-bold text-sm transition-all ${tipAmount === amt ? 'bg-lux-gold text-white border-lux-gold shadow-md' : 'bg-white/50 border-white/60 text-lux-dark hover:bg-white'}`}
                            >
                                ${amt}
                            </button>
                        ))}
                        <div className="relative">
                             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lux-darkSec text-sm">$</span>
                             <input 
                                type="number"
                                placeholder="Custom"
                                value={customTip}
                                onChange={handleCustomTipChange}
                                className={`w-full py-2 pl-6 pr-2 rounded-xl border bg-white/50 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none text-sm font-bold text-lux-dark transition-all ${customTip ? 'border-lux-gold ring-1 ring-lux-gold' : 'border-white/60'}`}
                             />
                        </div>
                    </div>
                </div>

                {/* Comment */}
                <div className="mb-6">
                     <textarea 
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Additional comments (optional)..."
                        className="w-full p-4 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all resize-none text-sm"
                     ></textarea>
                </div>

                <GradientButton fullWidth onClick={handleSubmit} disabled={rating === 0} className={rating === 0 ? 'opacity-50' : ''}>
                    Submit Feedback
                </GradientButton>

            </GlassCard>
        ) : (
            <div className="mb-8 text-center py-8 animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-lux-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-lux-gold">
                    <Check size={32} />
                </div>
                <h3 className="text-xl font-bold text-lux-dark">Feedback Sent</h3>
                <p className="text-lux-darkSec">Thank you for your feedback.</p>
            </div>
        )}

        {/* Action Buttons */}
        <div className="grid sm:grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/50 border border-lux-darkSec/20 text-lux-dark font-bold hover:bg-white transition-all shadow-sm">
                <Repeat size={18} />
                Rebook Same Route
            </button>
            <GradientButton to="/book/step-1" className="flex items-center justify-center gap-2">
                 Book Next Transfer
                 <ArrowRight size={18} />
            </GradientButton>
            <Link to="/member/bookings" className="sm:col-span-2 text-center text-sm font-bold text-lux-darkSec hover:text-lux-gold flex items-center justify-center gap-2 py-2">
                <LayoutGrid size={16} />
                View All Trips
            </Link>
        </div>

      </div>
    </div>
  );
};

export default BookingCompletePage;