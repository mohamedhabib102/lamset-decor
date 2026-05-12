import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string; // الـ href مش إجباري
}

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  href,
  ...props 
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-95 cursor-pointer";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 shadow-lg shadow-primary/20",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white active:bg-primary/10",
    ghost: "text-foreground hover:bg-muted active:bg-muted/80"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  // لو فيه href استخدم Link
  if (href) {
    return (
      <Link target='_blank' rel='noopener noreferrer' href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  // لو مفيش href استخدم button عادي
  return (
    <button 
      className={combinedClassName}
      {...props}
    >
      {children}
    </button>
  );
};
