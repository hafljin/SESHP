
import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onFinished: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinished }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const companyName = "Donrichy株式会社";

  useEffect(() => {
    const animationDuration = companyName.length * 100 + 2000; // Character animation + 2s pause
    const fadeOutDuration = 500;

    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(onFinished, fadeOutDuration);
    }, animationDuration);

    return () => {
      clearTimeout(fadeTimer);
    };
  }, [onFinished, companyName.length]);

  return (
    <div
      className={`fixed inset-0 bg-primary z-[9999] flex items-center justify-center ${
        isFadingOut ? 'animate-fade-out' : ''
      }`}
      aria-hidden="true"
    >
      <h1 className="text-neutral-50 text-4xl md:text-6xl font-bold tracking-wider">
        {companyName.split('').map((char, index) => (
          <span
            key={index}
            className="inline-block animate-pop-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default SplashScreen;
