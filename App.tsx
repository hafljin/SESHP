import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import JobsPage from './pages/JobsPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import StickyCTA from './components/StickyCTA';
import SplashScreen from './components/SplashScreen';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    if (!isLoading) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, isLoading]);

  return (
    <div className="bg-neutral-100 text-neutral-900 min-h-screen flex flex-col font-sans">
      {isLoading && <SplashScreen onFinished={() => setIsLoading(false)} />}
      
      <Header />
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </main>
      <StickyCTA />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;