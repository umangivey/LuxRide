import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, ShieldAlert } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API login
    setTimeout(() => {
      if (formData.email === 'error@example.com') {
        setError('Invalid credentials or unauthorized access.');
        setIsLoading(false);
      } else {
        // Success
        setIsLoading(false);
        navigate('/admin/dashboard');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-lux-dark flex items-center justify-center mx-auto mb-4 text-white border border-lux-darkSec shadow-xl">
             <ShieldAlert size={32} />
          </div>
          <h1 className="text-4xl font-serif font-bold text-lux-dark mb-2">Admin Access</h1>
          <p className="text-lux-darkSec">Restricted area. Authorized personnel only.</p>
        </div>

        <GlassCard className="p-8 md:p-10 border-t-4 border-t-lux-dark">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-3 text-red-600 text-sm">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-lux-dark ml-1">Admin Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-lux-darkSec">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-dark focus:ring-1 focus:ring-lux-dark outline-none transition-all"
                  placeholder="admin@luxride.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-lux-dark">Password</label>
                <Link to="/forgot-password" className="text-xs text-lux-darkSec font-bold hover:text-lux-dark hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-lux-darkSec">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-11 pr-12 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-dark focus:ring-1 focus:ring-lux-dark outline-none transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-lux-darkSec hover:text-lux-dark transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <GradientButton fullWidth className="group from-lux-dark via-gray-800 to-lux-dark border-lux-darkSec/30" onClick={() => {}} disabled={isLoading}>
              <span className="flex items-center gap-2">
                {isLoading ? 'Authenticating...' : 'Admin Sign In'}
                {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
              </span>
            </GradientButton>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default AdminLoginPage;