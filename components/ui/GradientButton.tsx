import React from 'react';
import { Link } from 'react-router-dom';

interface GradientButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

export const GradientButton: React.FC<GradientButtonProps> = ({ 
  children, 
  to, 
  onClick, 
  className = '',
  fullWidth = false
}) => {
  const baseStyles = `
    relative inline-flex items-center justify-center
    px-8 py-3.5
    bg-gradient-to-r from-lux-primary via-lux-gold to-lux-secondary
    bg-[length:200%_auto]
    text-white font-bold tracking-wide
    rounded-full 
    shadow-lg shadow-lux-gold/20
    border border-white/20
    transition-all duration-500 ease-out
    hover:bg-right hover:shadow-xl hover:shadow-lux-gold/30 hover:-translate-y-0.5
    active:scale-95 active:shadow-md
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  if (to) {
    return (
      <Link to={to} className={baseStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseStyles}>
      {children}
    </button>
  );
};