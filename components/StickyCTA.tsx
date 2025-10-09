
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const StickyCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-neutral-50/80 backdrop-blur-sm p-3 md:p-4 border-t border-neutral-300 z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto flex justify-center items-center gap-4">
        <Button size="lg" variant="primary" onClick={() => navigate('/jobs')}>
          案件に応募する
        </Button>
        <Button size="lg" variant="secondary" onClick={() => navigate('/contact')}>
          お問い合わせ
        </Button>
      </div>
    </div>
  );
};

export default StickyCTA;
