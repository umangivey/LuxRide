import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, RefreshCw, Loader2 } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientButton } from '../components/ui/GradientButton';

const EmailVerificationPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    // Simulate verification API call
    const verifyToken = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock validation: "error" token triggers error state
        if (token === 'error') {
          setStatus('error');
        } else {
          setStatus('success');
          // Auto redirect after success to membership selection (or pricing as proxy)
          setTimeout(() => {
            navigate('/choose-membership');
          }, 2000);
        }
      } catch (err) {
        setStatus('error');
      }
    };

    verifyToken();
  }, [token, navigate]);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
      <div className="w-full max-w-lg text-center">
        <GlassCard className="p-10">
          
          {status === 'loading' && (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-lux-primary/10 flex items-center justify-center mb-6">
                <Loader2 size={32} className="text-lux-primary animate-spin" />
              </div>
              <h1 className="text-2xl font-serif font-bold text-lux-dark mb-2">Verifying Email</h1>
              <p className="text-lux-darkSec">Please wait while we secure your account...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <CheckCircle2 size={32} className="text-green-600" />
              </div>
              <h1 className="text-2xl font-serif font-bold text-lux-dark mb-2">Email Verified!</h1>
              <p className="text-lux-darkSec mb-6">Your account has been successfully activated.</p>
              <p className="text-sm text-lux-darkSec/60">Redirecting to membership selection...</p>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6">
                <XCircle size={32} className="text-red-600" />
              </div>
              <h1 className="text-2xl font-serif font-bold text-lux-dark mb-2">Verification Failed</h1>
              <p className="text-lux-darkSec mb-6">
                The verification link is invalid or has expired.
              </p>
              <GradientButton onClick={() => window.location.reload()}>
                <span className="flex items-center gap-2">
                  <RefreshCw size={18} />
                  Resend Verification Email
                </span>
              </GradientButton>
            </div>
          )}

        </GlassCard>
      </div>
    </div>
  );
};

export default EmailVerificationPage;