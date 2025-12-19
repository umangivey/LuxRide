import React from 'react';
import { MapPin, Shield, Clock, Wifi, Coffee, Car, Star, CheckCircle, Navigation } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientButton } from '../components/ui/GradientButton';

const ServicesPage: React.FC = () => {
  const coverageAreas = [
    {
      title: 'Airports & Transit',
      points: ['Hartsfield-Jackson (ATL) - All Terminals', 'Signature Flight Support (Private Aviation)', 'Peachtree Station (Amtrak)', 'Greyhound Station'],
      icon: <Navigation className="text-lux-gold" size={24} />
    },
    {
      title: 'Luxury Hotels',
      points: ['The Ritz-Carlton', 'Four Seasons Hotel Atlanta', 'The St. Regis Atlanta', 'Waldorf Astoria Atlanta Buckhead', 'Nobu Hotel'],
      icon: <Star className="text-lux-gold" size={24} />
    },
    {
      title: 'Business & Venues',
      points: ['Buckhead Financial District', 'Midtown Tech Square', 'Mercedes-Benz Stadium', 'Cobb Energy Centre'],
      icon: <MapPin className="text-lux-gold" size={24} />
    }
  ];

  const inclusions = [
    { icon: <Clock size={24} />, label: 'Zero Wait Time Policy' },
    { icon: <Wifi size={24} />, label: 'High-Speed Wi-Fi' },
    { icon: <Coffee size={24} />, label: 'Premium Refreshments' },
    { icon: <Shield size={24} />, label: 'Enhanced Privacy' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-lux-dark mb-6">
          Precision in Motion
        </h1>
        <p className="text-xl text-lux-darkSec max-w-2xl mx-auto mb-10">
          Experience the pinnacle of urban mobility with our comprehensive suite of transfer services designed for the elite traveler.
        </p>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Coverage Grid */}
        <h2 className="text-2xl font-serif font-bold text-lux-dark mb-6 pl-2 border-l-4 border-lux-gold">Service Coverage</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-20">
            {coverageAreas.map((area, idx) => (
                <GlassCard key={idx} className="p-8 h-full hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-lux-primary/5 border border-lux-primary/10 flex items-center justify-center shadow-inner">
                            {area.icon}
                        </div>
                        <h3 className="text-xl font-serif font-bold text-lux-dark">{area.title}</h3>
                    </div>
                    <ul className="space-y-3">
                        {area.points.map((point, i) => (
                            <li key={i} className="flex items-start gap-3 text-lux-darkSec text-sm font-medium">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-lux-gold flex-shrink-0 shadow-[0_0_5px_rgba(197,160,89,0.5)]" />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                </GlassCard>
            ))}
        </div>

        {/* Fleet & Standards Split Layout */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Fleet Info */}
            <div className="space-y-8">
                <h2 className="text-2xl font-serif font-bold text-lux-dark pl-2 border-l-4 border-lux-gold">The LuxRide Fleet</h2>
                <GlassCard className="p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                       <Car size={150} />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <Car className="text-lux-primary" size={32} />
                        <h3 className="text-xl font-bold text-lux-dark">Executive Class</h3>
                      </div>
                      <p className="text-lux-darkSec mb-6 leading-relaxed">Mercedes-Benz S-Class, BMW 7 Series, and similar flagship sedans designed for ultimate comfort.</p>
                      <ul className="grid grid-cols-2 gap-3 text-sm text-lux-darkSec font-medium">
                          <li className="flex items-center gap-2"><CheckCircle size={14} className="text-lux-gold"/> Heated Massage Seats</li>
                          <li className="flex items-center gap-2"><CheckCircle size={14} className="text-lux-gold"/> Active Noise Cancellation</li>
                      </ul>
                    </div>
                </GlassCard>
                <GlassCard className="p-8 relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-5">
                       <Car size={150} />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <Car className="text-lux-primary" size={32} />
                        <h3 className="text-xl font-bold text-lux-dark">SUV Class</h3>
                      </div>
                      <p className="text-lux-darkSec mb-6 leading-relaxed">Cadillac Escalade ESV, Lincoln Navigator L providing spacious luxury for groups.</p>
                      <ul className="grid grid-cols-2 gap-3 text-sm text-lux-darkSec font-medium">
                          <li className="flex items-center gap-2"><CheckCircle size={14} className="text-lux-gold"/> Spacious Luggage Capacity</li>
                          <li className="flex items-center gap-2"><CheckCircle size={14} className="text-lux-gold"/> Rear Entertainment Systems</li>
                      </ul>
                    </div>
                </GlassCard>
            </div>

            {/* Chauffeur Standards */}
            <div className="space-y-8">
                <h2 className="text-2xl font-serif font-bold text-lux-dark pl-2 border-l-4 border-lux-gold">Chauffeur Standards</h2>
                <GlassCard className="p-8 h-full flex flex-col justify-center gap-8">
                    <div className="flex gap-5 group">
                         <div className="w-14 h-14 rounded-2xl bg-lux-gold/10 flex items-center justify-center shrink-0 group-hover:bg-lux-gold/20 transition-colors">
                            <Shield className="text-lux-gold" size={28} />
                         </div>
                         <div>
                             <h4 className="font-bold text-lux-dark text-lg mb-1">Rigorous Vetting</h4>
                             <p className="text-lux-darkSec text-sm leading-relaxed">We conduct comprehensive federal and state background checks, driving record analysis, and regular drug screening for every chauffeur.</p>
                         </div>
                    </div>
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-lux-primary/20 to-transparent"></div>
                    <div className="flex gap-5 group">
                         <div className="w-14 h-14 rounded-2xl bg-lux-gold/10 flex items-center justify-center shrink-0 group-hover:bg-lux-gold/20 transition-colors">
                            <Star className="text-lux-gold" size={28} />
                         </div>
                         <div>
                             <h4 className="font-bold text-lux-dark text-lg mb-1">White-Glove Training</h4>
                             <p className="text-lux-darkSec text-sm leading-relaxed">All drivers are trained in executive protocol, defensive driving, and absolute privacy protection standards.</p>
                         </div>
                    </div>
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-lux-primary/20 to-transparent"></div>
                    <div className="flex gap-5 group">
                         <div className="w-14 h-14 rounded-2xl bg-lux-gold/10 flex items-center justify-center shrink-0 group-hover:bg-lux-gold/20 transition-colors">
                            <Clock className="text-lux-gold" size={28} />
                         </div>
                         <div>
                             <h4 className="font-bold text-lux-dark text-lg mb-1">24/7 Availability</h4>
                             <p className="text-lux-darkSec text-sm leading-relaxed">Our operations center and chauffeurs are available 24 hours a day, 365 days a year. We operate on your schedule, not ours.</p>
                         </div>
                    </div>
                </GlassCard>
            </div>
        </div>

        {/* Inclusions Banner */}
        <GlassCard className="p-10 text-center border-lux-gold/20 shadow-lg shadow-lux-gold/5">
            <h2 className="text-2xl font-serif font-bold text-lux-dark mb-10">Included in Every Membership</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {inclusions.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-4 p-4 rounded-xl hover:bg-white/40 transition-colors group">
                        <div className="text-lux-gold group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">{item.icon}</div>
                        <span className="font-bold text-lux-darkSec text-sm tracking-wide">{item.label}</span>
                    </div>
                ))}
            </div>
            <div className="mt-12">
                <GradientButton to="/pricing" className="px-10">View Membership Plans</GradientButton>
            </div>
        </GlassCard>

      </section>
    </div>
  );
};

export default ServicesPage;