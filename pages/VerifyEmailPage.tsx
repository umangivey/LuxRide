import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientButton } from '../components/ui/GradientButton';

const VerifyEmailPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
      <div className="w-full max-w-lg text-center">
        <GlassCard className="p-10">
          <div className="w-20 h-20 bg-lux-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-lux-gold animate-pulse-glow">
            <Mail size={40} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-lux-dark mb-4">Check Your Email</h1>
          <p className="text-lux-darkSec mb-8 leading-relaxed">
            We've sent a verification link to your email address. Please click the link to verify your account and access your dashboard.
          </p>
          
          <div className="flex flex-col gap-4">
            <GradientButton to="/login" fullWidth>
                Back to Sign In
            </GradientButton>
            <button className="text-lux-gold font-bold hover:underline text-sm">
                Resend Verification Email
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default VerifyEmailPage;