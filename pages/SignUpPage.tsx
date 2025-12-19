import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Phone, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientButton } from '../components/ui/GradientButton';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    acceptedTerms: false
  });
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    const pwd = formData.password;
    let strength = 0;
    if (pwd.length >= 8) strength += 1;
    if (/[A-Z]/.test(pwd)) strength += 1;
    if (/[0-9]/.test(pwd)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) strength += 1;
    setPasswordStrength(strength);
  }, [formData.password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.acceptedTerms) {
      // Simulate API call
      setTimeout(() => {
        navigate('/verify-email');
      }, 800);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-200';
    if (passwordStrength <= 2) return 'bg-red-400';
    if (passwordStrength === 3) return 'bg-yellow-400';
    return 'bg-green-500';
  };

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength === 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-lux-dark mb-2">Join LuxRide</h1>
          <p className="text-lux-darkSec">Create your account to access premium travel.</p>
        </div>

        <GlassCard className="p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-lux-dark ml-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-lux-darkSec">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all"
                  placeholder="James Sterling"
                />
              </div>
            </div>

            {/* Email & Phone Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-lux-dark ml-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-lux-darkSec">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-lux-dark ml-1">Phone</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-lux-darkSec">
                    <Phone size={18} />
                  </div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all"
                    placeholder="(404) 555-0123"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-lux-dark ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-lux-darkSec">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-11 pr-12 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-lux-darkSec hover:text-lux-gold transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {/* Strength Indicator */}
              {formData.password && (
                <div className="flex items-center justify-between pt-1 px-1">
                   <div className="flex gap-1 h-1.5 flex-1 max-w-[120px]">
                      <div className={`flex-1 rounded-full transition-colors ${passwordStrength >= 1 ? getStrengthColor() : 'bg-gray-200'}`}></div>
                      <div className={`flex-1 rounded-full transition-colors ${passwordStrength >= 2 ? getStrengthColor() : 'bg-gray-200'}`}></div>
                      <div className={`flex-1 rounded-full transition-colors ${passwordStrength >= 3 ? getStrengthColor() : 'bg-gray-200'}`}></div>
                      <div className={`flex-1 rounded-full transition-colors ${passwordStrength >= 4 ? getStrengthColor() : 'bg-gray-200'}`}></div>
                   </div>
                   <span className="text-xs font-bold text-lux-darkSec">{getStrengthLabel()}</span>
                </div>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 pt-2">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  checked={formData.acceptedTerms}
                  onChange={(e) => setFormData({...formData, acceptedTerms: e.target.checked})}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-lux-darkSec/30 bg-white/50 transition-all checked:bg-lux-gold checked:border-lux-gold"
                />
                <CheckCircle2 size={14} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
              <label htmlFor="terms" className="text-sm text-lux-darkSec cursor-pointer select-none">
                I agree to the <Link to="/terms" className="text-lux-gold font-bold hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-lux-gold font-bold hover:underline">Privacy Policy</Link>.
              </label>
            </div>

            <GradientButton fullWidth className="group mt-4">
              <span className="flex items-center gap-2">
                Create Account
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </GradientButton>

            <div className="text-center pt-2">
              <p className="text-sm text-lux-darkSec">
                Already have an account?{' '}
                <Link to="/login" className="text-lux-gold font-bold hover:underline">
                  Sign In
                </Link>
              </p>
            </div>

          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default SignUpPage;