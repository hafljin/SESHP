
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseStyles = 'font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 transform active:scale-95 shadow-md';
  
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-[#0A3D4A] focus:ring-blue-300',
    secondary: 'bg-accent text-white hover:bg-[#065f46] focus:ring-green-300',
  };

  const sizeStyles = {
    md: 'py-2 px-5 text-base',
    lg: 'py-3 px-8 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
