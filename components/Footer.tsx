import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-white/40 backdrop-blur-xl border-t border-white/50 pt-16 pb-8 shadow-[0_-8px_32px_0_rgba(107,94,85,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lux-dark to-lux-primary flex items-center justify-center text-white font-serif font-bold text-xl shadow-md">
                L
              </div>
              <span className="font-serif text-2xl font-bold text-lux-dark">
                LuxRide
              </span>
            </Link>
            <p className="text-lux-darkSec text-sm leading-relaxed font-medium">
              Premium luxury transfer service offering precision, elegance, and unmatched comfort for your journey.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="text-lux-primary hover:text-lux-dark transition-colors transform hover:scale-110">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-bold text-lg text-lux-dark mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', path: '/' },
                { label: 'Services', path: '/services' },
                { label: 'Pricing', path: '/pricing' },
                { label: 'Book Now', path: '/book' },
                { label: 'Member Login', path: '/login' },
                { label: 'Driver Login', path: '/driver/login' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-lux-darkSec hover:text-lux-primary transition-colors text-sm font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

           {/* Legal */}
           <div>
            <h3 className="font-serif font-bold text-lg text-lux-dark mb-6">Legal</h3>
            <ul className="space-y-3">
              {[
                { label: 'Privacy Policy', path: '/privacy' },
                { label: 'Terms of Service', path: '/terms' },
                { label: 'Cookie Policy', path: '/cookies' },
                { label: 'Driver Agreement', path: '/driver-terms' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-lux-darkSec hover:text-lux-primary transition-colors text-sm font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-bold text-lg text-lux-dark mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-lux-darkSec font-medium">
                <MapPin size={18} className="shrink-0 text-lux-primary" />
                <span>123 Peachtree St NE,<br />Atlanta, GA 30303</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-lux-darkSec font-medium">
                <Phone size={18} className="shrink-0 text-lux-primary" />
                <span>+1 (404) 555-0123</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-lux-darkSec font-medium">
                <Mail size={18} className="shrink-0 text-lux-primary" />
                <span>concierge@luxride.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-lux-darkSec/70 font-medium">
            © {new Date().getFullYear()} LuxRide. All rights reserved.
          </p>
          <div className="flex gap-6">
              <Link to="/admin/login" className="text-xs font-bold text-lux-darkSec/50 hover:text-lux-gold transition-colors">
                  Admin Login
              </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};