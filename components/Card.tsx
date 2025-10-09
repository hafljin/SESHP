import React from 'react';

interface CardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, icon, children, className }) => {
  return (
    <div className={`bg-neutral-50 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${className}`}>
      <div className="p-6 md:p-8">
        {icon && <div className="mb-4">{icon}</div>}
        <h3 className="text-xl md:text-2xl font-bold text-neutral-900">{title}</h3>
        <div className="mt-4 text-neutral-700">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;