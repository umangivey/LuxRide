import React from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientButton } from '../components/ui/GradientButton';

const ContactPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-lux-dark mb-6">
          We're Here for You
        </h1>
        <p className="text-xl text-lux-darkSec max-w-2xl mx-auto mb-10">
          Our dedicated concierge team is available 24/7 to assist with bookings, membership inquiries, or special requests.
        </p>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Contact Info Side */}
            <div className="space-y-6">
                <GlassCard className="p-8 flex items-start gap-6 hover:border-lux-gold/30 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-lux-primary/10 flex items-center justify-center text-lux-primary shrink-0">
                        <Phone size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-lux-dark mb-1">Call Us</h3>
                        <p className="text-lux-darkSec mb-2 text-sm">Direct line to concierge & dispatch.</p>
                        <a href="tel:+14045551234" className="text-xl font-serif font-bold text-lux-gold hover:text-lux-primary transition-colors">
                            +1 (404) 555-1234
                        </a>
                        <div className="mt-2 flex items-center gap-2 text-xs font-bold text-green-600 uppercase tracking-wide">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Available Now
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-8 flex items-start gap-6 hover:border-lux-gold/30 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-lux-primary/10 flex items-center justify-center text-lux-primary shrink-0">
                        <Mail size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-lux-dark mb-1">Email Support</h3>
                        <p className="text-lux-darkSec mb-2 text-sm">For membership, billing, and general inquiries.</p>
                        <a href="mailto:support@luxride.com" className="text-lg font-bold text-lux-dark hover:text-lux-gold transition-colors">
                            support@luxride.com
                        </a>
                        <p className="text-xs text-lux-darkSec mt-1">Typical response time: &lt; 1 hour</p>
                    </div>
                </GlassCard>

                <div className="grid sm:grid-cols-2 gap-6">
                    <GlassCard className="p-6">
                        <div className="flex items-center gap-3 mb-4 text-lux-primary">
                            <MapPin size={20} />
                            <h4 className="font-bold text-lux-dark">Headquarters</h4>
                        </div>
                        <address className="not-italic text-lux-darkSec text-sm leading-relaxed">
                            123 Peachtree St NE<br/>
                            Suite 2500<br/>
                            Atlanta, GA 30303
                        </address>
                    </GlassCard>
                     <GlassCard className="p-6">
                        <div className="flex items-center gap-3 mb-4 text-lux-primary">
                            <Clock size={20} />
                            <h4 className="font-bold text-lux-dark">Hours</h4>
                        </div>
                        <ul className="text-lux-darkSec text-sm space-y-1">
                            <li className="flex justify-between"><span>Support:</span> <span className="font-bold text-lux-dark">24/7/365</span></li>
                            <li className="flex justify-between"><span>Office:</span> <span className="font-bold text-lux-dark">M-F, 9am-6pm</span></li>
                        </ul>
                    </GlassCard>
                </div>
            </div>

            {/* Contact Form Side */}
            <GlassCard className="p-8 md:p-10 border-lux-gold/20 shadow-lg shadow-lux-gold/5">
                <h3 className="text-2xl font-serif font-bold text-lux-dark mb-6">Send a Message</h3>
                <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-lux-darkSec ml-1">Full Name</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                             <label className="text-sm font-bold text-lux-darkSec ml-1">Email Address</label>
                            <input type="email" className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all" placeholder="john@example.com" />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                         <label className="text-sm font-bold text-lux-darkSec ml-1">Subject</label>
                         <select className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all text-lux-dark">
                             <option>Membership Inquiry</option>
                             <option>Booking Assistance</option>
                             <option>Corporate Partnership</option>
                             <option>Feedback / Review</option>
                             <option>Other</option>
                         </select>
                    </div>

                    <div className="space-y-2">
                         <label className="text-sm font-bold text-lux-darkSec ml-1">Message</label>
                         <textarea rows={5} className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all resize-none" placeholder="How can we assist you today?"></textarea>
                    </div>

                    <GradientButton className="w-full group" onClick={() => {}}>
                        <span className="flex items-center gap-2">
                            Send Message
                            <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </GradientButton>
                    <p className="text-xs text-center text-lux-darkSec/60">
                        By submitting this form, you agree to our privacy policy.
                    </p>
                </form>
            </GlassCard>

        </div>
      </section>
    </div>
  );
};

export default ContactPage;