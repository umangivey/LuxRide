import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`
      relative overflow-hidden group
      backdrop-blur-3xl
      bg-white/40
      border border-white/80
      shadow-[0_8px_32px_0_rgba(197,160,89,0.1)]
      rounded-2xl
      transition-all duration-500
      hover:shadow-[0_16px_48px_0_rgba(197,160,89,0.15)] hover:scale-[1.005] hover:bg-white/60 hover:border-lux-gold/30
      ${className}
    `}>
      {/* Specular Highlight / Sheen effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-transparent opacity-60 pointer-events-none" />
      
      {/* Subtle iridescent shimmering border effect on hover can be added here if desired */}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};