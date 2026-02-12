
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'outline' | 'text';
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  showArrow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant, 
  onClick, 
  type = 'button',
  className = "",
  showArrow = false
}) => {
  if (variant === 'text') {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`text-slate-500 font-medium text-[13px] uppercase tracking-[0.1em] hover:text-primary transition-all active:scale-[0.98] ${className}`}
      >
        {children}
      </button>
    );
  }

  const baseStyles = "w-full h-[48px] rounded-[16px] font-semibold text-[15px] tracking-[0.05em] uppercase flex items-center justify-center space-x-2 transition-all duration-200 active:scale-[0.98]";
  
  const variants = {
    primary: "bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] text-white shadow-[0_8px_16px_-4px_rgba(124,58,237,0.2)] hover:brightness-105",
    outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary/5",
    text: ""
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant as 'primary' | 'outline']} ${className}`}
    >
      <span>{children}</span>
      {showArrow && (
        <ArrowRight size={18} strokeWidth={2.5} className="ml-1 opacity-80" />
      )}
    </button>
  );
};
