import React from 'react';
import { ShieldCheck, Clock, Car, Star, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GradientButton } from '../components/ui/GradientButton';
import { GlassCard } from '../components/ui/GlassCard';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center lg:text-left">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/40 border border-white/60 backdrop-blur-md shadow-sm">
              <Star size={16} className="text-lux-gold fill-lux-gold" />
              <span className="text-sm font-bold text-lux-dark tracking-wide uppercase">
                Atlanta's Premier Service
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-lux-dark leading-tight drop-shadow-sm">
              Luxury <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lux-dark via-lux-primary to-lux-gold">
                Redefined
              </span>
            </h1>
            
            <p className="text-xl text-lux-darkSec max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Where elegance meets precision. Experience the ultimate in comfort and reliability with Atlanta's most exclusive membership-based transfer service.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <GradientButton to="/signup" className="px-10 py-4 text-lg">
                Book Your First Transfer
              </GradientButton>
              <div className="flex gap-2">
                  <Link to="/pricing" className="px-6 py-4 rounded-full border-2 border-lux-primary/20 text-lux-dark font-bold hover:bg-lux-primary/5 hover:border-lux-primary transition-all duration-300">
                    View Pricing
                  </Link>
                  <Link to="/services" className="px-6 py-4 rounded-full border-2 border-lux-primary/20 text-lux-dark font-bold hover:bg-lux-primary/5 hover:border-lux-primary transition-all duration-300">
                    Explore Services
                  </Link>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm font-semibold pt-4">
                <Link to="/login" className="text-lux-primary hover:text-lux-gold flex items-center gap-1 transition-colors">
                    Already a member? Sign in <ArrowRight size={14} />
                </Link>
                <span className="hidden sm:block text-lux-darkSec/30">|</span>
                <Link to="/driver/signup" className="text-lux-primary hover:text-lux-gold flex items-center gap-1 transition-colors">
                    Drive with LuxRide <ArrowUpRight size={14} />
                </Link>
            </div>

            <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-sm text-lux-darkSec font-semibold border-t border-lux-darkSec/10 mt-8">
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-lux-gold" />
                <span>Verified Chauffeurs</span>
              </div>
               <div className="flex items-center gap-2">
                <Clock size={20} className="text-lux-gold" />
                <span>99.9% On-Time</span>
              </div>
            </div>
          </div>

          {/* Hero Visual/Card */}
          <div className="relative z-10 lg:pl-12 hidden md:block">
            <GlassCard className="p-8 transform rotate-2 hover:rotate-0 transition-transform duration-700 hover:shadow-lux-gold/20">
               <div className="aspect-[4/3] rounded-xl overflow-hidden bg-lux-dark/5 relative shadow-inner">
                  {/* Placeholder for a luxury car image */}
                  <img 
                    src="https://picsum.photos/800/600" 
                    alt="Luxury Interior" 
                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                    <div className="text-white">
                      <p className="font-serif text-3xl mb-1 text-lux-champagne">The Royal Experience</p>
                      <p className="text-sm font-medium opacity-90">Mercedes-Benz S-Class & Cadillac Escalade ESV</p>
                    </div>
                  </div>
               </div>
               <div className="mt-8 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-lux-darkSec uppercase tracking-wider font-bold mb-1">Current Availability</p>
                    <p className="text-lux-gold font-bold flex items-center gap-2 text-lg">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                      Available Now
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-lux-darkSec uppercase tracking-wider font-bold mb-1">Service Area</p>
                    <p className="text-lux-dark font-bold text-lg">Greater Atlanta</p>
                  </div>
               </div>
            </GlassCard>
            
            {/* Floating element */}
            <div className="absolute -bottom-10 -left-10 z-20">
              <GlassCard className="p-5 flex items-center gap-5 animate-float-medium border-lux-gold/20">
                <div className="w-14 h-14 rounded-full bg-lux-gold/10 flex items-center justify-center text-lux-gold">
                  <Star className="fill-lux-gold" size={24} />
                </div>
                <div>
                  <p className="text-lux-dark font-bold text-2xl">5.0 / 5.0</p>
                  <p className="text-xs text-lux-darkSec font-bold uppercase tracking-wide">Client Satisfaction</p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-lux-dark mb-6">
              Why Choose LuxRide?
            </h2>
            <p className="text-lux-darkSec text-lg max-w-2xl mx-auto font-medium">
              We don't just provide a ride; we provide an experience tailored to your exact standards.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <GlassCard className="p-10 hover:-translate-y-2 transition-transform duration-500 hover:border-lux-gold/30">
              <div className="w-16 h-16 rounded-2xl bg-lux-primary/5 flex items-center justify-center mb-8 text-lux-gold shadow-sm">
                <ShieldCheck size={36} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-lux-dark mb-4">
                Elite Chauffeurs
              </h3>
              <p className="text-lux-darkSec leading-relaxed font-medium">
                Every driver is vetted, background-checked, and trained in executive protocol to ensure your safety and privacy.
              </p>
            </GlassCard>

            <GlassCard className="p-10 hover:-translate-y-2 transition-transform duration-500 hover:border-lux-gold/30">
              <div className="w-16 h-16 rounded-2xl bg-lux-primary/5 flex items-center justify-center mb-8 text-lux-gold shadow-sm">
                <Clock size={36} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-lux-dark mb-4">
                Precision Timing
              </h3>
              <p className="text-lux-darkSec leading-relaxed font-medium">
                We value your time above all. Our 99.9% on-time guarantee means we are waiting for you, not the other way around.
              </p>
            </GlassCard>

            <GlassCard className="p-10 hover:-translate-y-2 transition-transform duration-500 hover:border-lux-gold/30">
              <div className="w-16 h-16 rounded-2xl bg-lux-primary/5 flex items-center justify-center mb-8 text-lux-gold shadow-sm">
                <Car size={36} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-lux-dark mb-4">
                Immaculate Fleet
              </h3>
              <p className="text-lux-darkSec leading-relaxed font-medium">
                Experience our curated selection of latest-model vehicles, maintained to showroom standards daily.
              </p>
            </GlassCard>
          </div>
          
           <div className="mt-20 text-center">
             <Link to="/services" className="inline-flex items-center gap-3 text-lux-primary text-lg font-bold hover:text-lux-gold transition-colors group">
               Learn more about our services
               <ArrowRight size={24} className="transform group-hover:translate-x-1 transition-transform" />
             </Link>
           </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;