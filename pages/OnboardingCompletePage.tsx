import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Calendar, CreditCard, Star, ArrowRight, LayoutDashboard } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientButton } from '../components/ui/GradientButton';

const OnboardingCompletePage: React.FC = () => {
  const location = useLocation();
  // Default values for direct access fallback
  const { plan, price, billingCycle } = location.state || { 
    plan: 'Executive', 
    price: 499, 
    billingCycle: 'monthly' 
  };

  // Calculate renewal date
  const renewalDate = new Date();
  if (billingCycle === 'monthly') {
    renewalDate.setMonth(renewalDate.getMonth() + 1);
  } else {
    renewalDate.setFullYear(renewalDate.getFullYear() + 1);
  }
  
  const formattedDate = renewalDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
      <div className="w-full max-w-2xl text-center">
        
        {/* Success Header */}
        <div className="mb-10 animate-in slide-in-from-bottom-4 duration-700">
          <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
            <CheckCircle2 size={48} className="text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-lux-dark mb-4">
            Welcome to LuxRide {plan}!
          </h1>
          <p className="text-xl text-lux-darkSec">
            Your membership is active. Prepare for a new standard of travel.
          </p>
        </div>

        {/* Membership Summary Card */}
        <GlassCard className="p-8 md:p-10 mb-10 text-left border-lux-gold/30 shadow-lux-gold/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-8 border-b border-lux-darkSec/10">
            <div>
              <p className="text-sm font-bold text-lux-darkSec uppercase tracking-wider mb-1">Current Membership</p>
              <h2 className="text-3xl font-serif font-bold text-lux-dark flex items-center gap-3">
                {plan} Tier
                <span className="px-3 py-1 rounded-full bg-lux-gold/10 text-lux-gold text-xs font-bold uppercase tracking-wide border border-lux-gold/20">
                  Active
                </span>
              </h2>
            </div>
            <div className="mt-4 md:mt-0 text-left md:text-right">
              <p className="text-sm font-bold text-lux-darkSec uppercase tracking-wider mb-1">Total Paid</p>
              <p className="text-2xl font-bold text-lux-dark">${price}.00</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/40 border border-white/60">
              <div className="w-10 h-10 rounded-full bg-lux-primary/10 flex items-center justify-center text-lux-primary shrink-0">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-lux-darkSec uppercase">Next Billing Date</p>
                <p className="font-bold text-lux-dark">{formattedDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/40 border border-white/60">
              <div className="w-10 h-10 rounded-full bg-lux-primary/10 flex items-center justify-center text-lux-primary shrink-0">
                <CreditCard size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-lux-darkSec uppercase">Payment Method</p>
                <p className="font-bold text-lux-dark">•••• 4242</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-bold text-lux-dark mb-2 flex items-center gap-2">
              <Star size={14} className="text-lux-gold fill-lux-gold" />
              Included in your plan:
            </p>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm text-lux-darkSec">
               <li className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-lux-gold" />
                 {plan === 'Royal' ? 'Unlimited Transfers' : plan === 'Executive' ? '30 Monthly Transfers' : '10 Monthly Transfers'}
               </li>
               <li className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-lux-gold" />
                 Verified Chauffeurs
               </li>
               <li className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-lux-gold" />
                 24/7 Concierge Support
               </li>
               <li className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-lux-gold" />
                 Priority Booking Access
               </li>
            </ul>
          </div>
        </GlassCard>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <GradientButton to="/book" className="group">
             <span className="flex items-center gap-2">
                Start Booking
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
             </span>
          </GradientButton>
          
          <Link 
            to="/member/dashboard"
            className="px-8 py-3.5 rounded-full bg-white/50 border border-lux-darkSec/20 text-lux-dark font-bold hover:bg-white/80 hover:border-lux-gold/50 transition-all flex items-center justify-center gap-2"
          >
            <LayoutDashboard size={18} />
            View Dashboard
          </Link>
        </div>

        <p className="mt-8 text-sm text-lux-darkSec/70">
          A receipt and welcome guide have been sent to your email.
        </p>

      </div>
    </div>
  );
};

export default OnboardingCompletePage;