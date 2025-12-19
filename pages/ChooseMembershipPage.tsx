import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Star, ArrowRight } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientButton } from '../components/ui/GradientButton';

type BillingCycle = 'monthly' | 'annual';

const ChooseMembershipPage: React.FC = () => {
  const navigate = useNavigate();
  const [billing, setBilling] = useState<BillingCycle>('monthly');

  const tiers = [
    {
      name: 'Essential',
      description: 'Perfect for occasional business travelers and airport transfers.',
      priceMonthly: 199,
      priceAnnual: 169,
      transfers: '10 Transfers',
      features: [
        'Luxury Sedan Access',
        'Airport & City Zones',
        'Verified Chauffeurs',
        'Standard Booking Support',
        '15 min Complimentary Wait'
      ],
      isPopular: false,
    },
    {
      name: 'Executive',
      description: 'Our most popular plan for regular commuters and executives.',
      priceMonthly: 499,
      priceAnnual: 419,
      transfers: '30 Transfers',
      features: [
        'Premium SUV & Sedan Access',
        'Extended Metro Atlanta Area',
        'Top-Rated Chauffeurs',
        'Priority 24/7 Support',
        '30 min Complimentary Wait',
        'Free Cancellation (2h notice)'
      ],
      isPopular: true,
    },
    {
      name: 'Royal',
      description: 'The ultimate experience with zero compromise and unlimited freedom.',
      priceMonthly: 1499,
      priceAnnual: 1259,
      transfers: 'Unlimited Transfers',
      features: [
        'All Fleet Access (incl. First Class)',
        'Full State Coverage',
        'Executive Protection Drivers',
        'Dedicated Concierge Agent',
        'Unlimited Wait Time',
        'Flexible Cancellation',
        'Champagne Service on Request'
      ],
      isPopular: false,
    },
  ];

  const handleSelect = (tier: typeof tiers[0]) => {
    navigate('/payment', { 
      state: { 
        plan: tier.name, 
        billingCycle: billing, 
        price: billing === 'monthly' ? tier.priceMonthly : tier.priceAnnual 
      } 
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-lux-dark mb-6">
          Select Your Membership
        </h1>
        <p className="text-xl text-lux-darkSec max-w-2xl mx-auto mb-10">
          Your account is verified. Choose a plan to complete your registration.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={`text-sm font-semibold transition-colors ${billing === 'monthly' ? 'text-lux-dark' : 'text-lux-darkSec/60'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBilling(billing === 'monthly' ? 'annual' : 'monthly')}
            className="relative w-16 h-8 rounded-full bg-lux-primary/10 border border-lux-primary/20 shadow-inner transition-all duration-300 focus:outline-none"
          >
            <div
              className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-lux-gold shadow-md transform transition-transform duration-300 ${
                billing === 'annual' ? 'translate-x-8' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-sm font-semibold transition-colors ${billing === 'annual' ? 'text-lux-dark' : 'text-lux-darkSec/60'}`}>
            Annually <span className="text-lux-gold text-xs font-bold ml-1">(Save 16%)</span>
          </span>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {tiers.map((tier) => (
            <div key={tier.name} className={`relative ${tier.isPopular ? 'md:-mt-4' : ''}`}>
              {tier.isPopular && (
                <div className="absolute -top-10 inset-x-0 flex justify-center z-20">
                  <div className="bg-lux-gold text-white text-xs font-bold uppercase tracking-widest py-2 px-4 rounded-full shadow-lg shadow-lux-gold/30 flex items-center gap-2">
                    <Star size={12} fill="currentColor" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <GlassCard 
                className={`
                  h-full p-8 flex flex-col 
                  ${tier.isPopular ? 'border-lux-gold/40 shadow-lux-gold/10' : 'border-white/60'}
                `}
              >
                {/* Card Header */}
                <div className="mb-8">
                  <h3 className="text-2xl font-serif font-bold text-lux-dark mb-2">{tier.name}</h3>
                  <p className="text-sm text-lux-darkSec h-10 leading-relaxed opacity-80">
                    {tier.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl text-lux-darkSec font-medium">$</span>
                    <span className="text-5xl font-bold text-lux-dark tracking-tight">
                      {billing === 'monthly' ? tier.priceMonthly : tier.priceAnnual}
                    </span>
                    <span className="text-lux-darkSec/70 font-medium">/mo</span>
                  </div>
                  <div className="mt-2 text-xs font-medium text-lux-gold uppercase tracking-wide">
                    {billing === 'annual' ? 'Billed Annually' : 'Billed Monthly'}
                  </div>
                </div>

                {/* Transfers Highlight */}
                <div className="mb-8 p-4 rounded-xl bg-lux-primary/5 border border-lux-primary/10 text-center">
                  <span className="block text-lux-dark font-bold text-lg">
                    {tier.transfers}
                  </span>
                  <span className="text-xs text-lux-darkSec uppercase tracking-wider">Per Month</span>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8 flex-grow">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-lux-darkSec">
                      <div className="mt-0.5 min-w-[18px] h-[18px] rounded-full bg-lux-gold/20 flex items-center justify-center">
                        <Check size={10} className="text-lux-gold stroke-[3]" />
                      </div>
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action */}
                <div className="mt-auto">
                  <GradientButton 
                    onClick={() => handleSelect(tier)} 
                    fullWidth 
                    className={tier.isPopular ? 'shadow-lux-gold/40' : ''}
                  >
                    <span className="flex items-center gap-2">
                        Select This Plan
                        <ArrowRight size={18} />
                    </span>
                  </GradientButton>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ChooseMembershipPage;