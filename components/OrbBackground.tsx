import React from 'react';

export const OrbBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-lux-accent">
      {/* Large Orb 1 - Top Left - Primary (Darker Taupe) */}
      <div className="absolute -top-20 -left-20 w-[600px] h-[600px] 
        bg-lux-primary rounded-full mix-blend-multiply filter blur-[90px] 
        opacity-25 animate-float-slow"></div>
      
      {/* Large Orb 2 - Top Right - Gold (Rich Accent) */}
      <div className="absolute top-0 -right-20 w-[500px] h-[500px] 
        bg-lux-gold rounded-full mix-blend-multiply filter blur-[100px] 
        opacity-20 animate-float-medium animation-delay-2000"></div>
      
      {/* Medium Orb - Bottom Left - Secondary */}
      <div className="absolute -bottom-40 -left-20 w-[300px] h-[300px] 
        bg-lux-secondary rounded-full mix-blend-multiply filter blur-[60px] 
        opacity-30 animate-float-slow animation-delay-4000"></div>

      {/* Small Orb - Center Left - Champagne */}
      <div className="absolute top-1/2 left-20 w-[200px] h-[200px] 
        bg-lux-champagne rounded-full mix-blend-multiply filter blur-[50px] 
        opacity-40 animate-pulse-glow"></div>

      {/* Extra Orb - Bottom Right - Primary */}
      <div className="absolute -bottom-20 right-0 w-[400px] h-[400px] 
        bg-lux-primary rounded-full mix-blend-multiply filter blur-[80px] 
        opacity-20 animate-float-slow animation-delay-5000"></div>
    </div>
  );
};