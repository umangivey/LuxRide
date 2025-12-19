import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { NavLink } from '../types';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Mock theme state
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    // Actual theme implementation would go here
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/70 backdrop-blur-2xl border-b border-white/60 shadow-sm py-3' 
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lux-primary to-lux-gold flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg group-hover:shadow-lux-gold/30 transition-shadow">
              L
            </div>
            <span className="font-serif text-2xl font-bold text-lux-dark tracking-tight">
              LuxRide
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-all duration-300 hover:text-lux-gold hover:scale-105 ${
                  location.pathname === link.path 
                    ? 'text-lux-gold' 
                    : 'text-lux-darkSec'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle */}
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-lux-darkSec hover:text-lux-gold hover:bg-lux-primary/5 transition-colors"
                title="Toggle Theme"
            >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Role Logins */}
            <div className="flex items-center gap-4 border-l border-lux-darkSec/20 pl-4">
                <Link to="/driver/login" className="text-xs font-bold text-lux-darkSec hover:text-lux-primary transition-colors">
                    Driver Login
                </Link>
                <Link to="/admin/login" className="text-xs font-bold text-lux-darkSec hover:text-lux-primary transition-colors">
                    Admin Login
                </Link>
            </div>

            {/* Passenger Auth */}
            <div className="flex items-center gap-3 pl-2">
                <Link 
                  to="/login" 
                  className="text-sm font-bold text-lux-primary hover:text-lux-gold transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                   to="/signup"
                   className="px-5 py-2.5 rounded-full bg-lux-dark text-white text-sm font-semibold hover:bg-lux-primary transition-all shadow-md hover:shadow-lg border border-transparent hover:border-lux-gold/50"
                >
                  Sign Up
                </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-lux-dark hover:text-lux-gold transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl border-b border-white/50 shadow-xl py-6 px-4 flex flex-col gap-4 animate-in slide-in-from-top-5 max-h-[90vh] overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-lux-dark hover:text-lux-gold"
            >
              {link.label}
            </Link>
          ))}
          
          <hr className="border-lux-secondary/30 my-2" />
          
          <div className="grid grid-cols-2 gap-4">
              <Link 
                  to="/driver/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-bold text-lux-dark hover:bg-gray-100"
              >
                  Driver Login
              </Link>
              <Link 
                  to="/admin/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-bold text-lux-dark hover:bg-gray-100"
              >
                  Admin Login
              </Link>
          </div>

          <div className="flex flex-col gap-3 mt-2">
             <Link 
                to="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-full border border-lux-primary text-lux-primary font-bold hover:bg-lux-primary/5 transition-colors"
              >
                Passenger Sign In
              </Link>
               <Link 
                 to="/signup"
                 onClick={() => setIsMobileMenuOpen(false)}
                 className="w-full text-center py-3 rounded-full bg-lux-primary text-white font-bold hover:bg-lux-darkSec transition-colors shadow-lg"
              >
                Sign Up
              </Link>
          </div>
        </div>
      )}
    </header>
  );
};