import React from 'react';
import { Users, Clock, Award, TrendingUp, Heart } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';

const AboutPage: React.FC = () => {
  const stats = [
    { label: 'Active Members', value: '5,000+', icon: <Users className="text-white" size={24} /> },
    { label: 'Successful Transfers', value: '50k+', icon: <TrendingUp className="text-white" size={24} /> },
    { label: 'On-Time Rate', value: '99.9%', icon: <Clock className="text-white" size={24} /> },
    { label: 'Client Satisfaction', value: '5.0/5', icon: <Heart className="text-white" size={24} /> },
  ];

  const values = [
    { title: 'Precision', description: 'We believe time is the ultimate luxury. Our 99.9% on-time record isn\'t a goal, it\'s our standard.' },
    { title: 'Discretion', description: 'Your privacy is paramount. Our chauffeurs are trained to be invisible when you need them to be.' },
    { title: 'Elegance', description: 'From our attire to our vehicles, every detail is curated to provide a sophisticated experience.' },
  ];

  const team = [
    { name: 'James Sterling', role: 'Founder & CEO', bio: 'Former executive protection specialist with a vision for safe, reliable luxury transport.' },
    { name: 'Elena Vance', role: 'Head of Operations', bio: 'Logistics expert ensuring every transfer is executed with military precision.' },
    { name: 'Marcus Thorne', role: 'Fleet Director', bio: 'Automotive connoisseur responsible for maintaining our showroom-quality standards.' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
       {/* Hero */}
       <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-lux-dark mb-6">
          Our Legacy of Excellence
        </h1>
        <p className="text-xl text-lux-darkSec max-w-2xl mx-auto mb-10">
          Founded in Atlanta, LuxRide was born from a simple belief: that the journey should be as exceptional as the destination.
        </p>
      </section>

      {/* Stats Section - Gradient Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-lux-primary via-lux-gold to-lux-secondary p-6 text-white shadow-lg shadow-lux-gold/20 hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-20 transform translate-x-2 -translate-y-2">
                {stat.icon}
              </div>
              <p className="text-3xl font-serif font-bold mb-1">{stat.value}</p>
              <p className="text-sm font-medium opacity-90 uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Origin Story */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <GlassCard className="p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
                <h2 className="text-3xl font-serif font-bold text-lux-dark">The LuxRide Story</h2>
                <div className="w-16 h-1 bg-lux-gold rounded-full"></div>
                <p className="text-lux-darkSec leading-relaxed">
                    In 2018, we identified a growing frustration among executive travelers in Atlanta. Rideshare services were convenient but inconsistent, while traditional limousine companies were reliable but rigid and outdated.
                </p>
                <p className="text-lux-darkSec leading-relaxed">
                    LuxRide was created to bridge this gap. We combined the ease of modern technology with the white-glove service of a private chauffeur. What started with a single vehicle has grown into Atlanta's premier membership-based transfer service, trusted by Fortune 500 executives, celebrities, and discerning residents alike.
                </p>
            </div>
            <div className="flex-1 w-full">
                <div className="aspect-video rounded-xl bg-lux-primary/10 flex items-center justify-center border border-lux-gold/20 relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-tr from-lux-primary/20 to-transparent mix-blend-overlay"></div>
                   {/* Placeholder for story image */}
                   <span className="font-serif text-lux-primary/40 text-4xl italic group-hover:scale-110 transition-transform duration-700">Since 2018</span>
                </div>
            </div>
        </GlassCard>
      </section>

      {/* Mission & Values */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
         <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-lux-dark mb-4">Our Core Values</h2>
            <p className="text-lux-darkSec">The principles that drive every decision we make.</p>
         </div>
         <div className="grid md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
                <GlassCard key={idx} className="p-8 text-center hover:border-lux-gold/40 transition-colors">
                    <div className="w-12 h-12 mx-auto rounded-full bg-lux-primary/5 flex items-center justify-center text-lux-gold mb-6">
                        <Award size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-lux-dark mb-3">{val.title}</h3>
                    <p className="text-lux-darkSec text-sm leading-relaxed">{val.description}</p>
                </GlassCard>
            ))}
         </div>
      </section>

      {/* Leadership Team */}
       <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
         <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-lux-dark mb-4">Leadership</h2>
            <p className="text-lux-darkSec">The experts behind the experience.</p>
         </div>
         <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
                <GlassCard key={idx} className="p-6 text-center group">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-lux-gold to-lux-primary p-1 mb-4 shadow-lg group-hover:shadow-lux-gold/30 transition-shadow">
                        <div className="w-full h-full rounded-full bg-lux-accent flex items-center justify-center overflow-hidden">
                             {/* Placeholder avatar */}
                             <span className="font-serif text-2xl font-bold text-lux-primary">{member.name.charAt(0)}</span>
                        </div>
                    </div>
                    <h3 className="text-lg font-bold text-lux-dark">{member.name}</h3>
                    <p className="text-xs text-lux-gold font-bold uppercase tracking-widest mb-4">{member.role}</p>
                    <p className="text-lux-darkSec text-sm italic opacity-80">"{member.bio}"</p>
                </GlassCard>
            ))}
         </div>
      </section>

       {/* Trust Signals / Milestones Simple List */}
       <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
            <p className="text-sm font-bold text-lux-darkSec uppercase tracking-widest mb-8">Trusted Partners & Recognition</p>
            <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                 {/* Placeholders for logos */}
                 {['Forbes Travel Guide', 'Atlanta Business Chronicle', 'Inc. 5000', 'BBB Accredited'].map((name, i) => (
                     <div key={i} className="px-6 py-3 border border-lux-darkSec/20 rounded-lg text-lux-dark font-serif font-bold">
                        {name}
                     </div>
                 ))}
            </div>
       </section>

    </div>
  );
};

export default AboutPage;