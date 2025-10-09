import React, { useState, useEffect } from 'react';
import { FAQItem } from '../types';

const FAQPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch('./data/faq.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: FAQItem[] = await response.json();
        setFaqs(data);
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">よくあるご質問 (FAQ)</h1>
        <p className="mt-4 text-lg text-neutral-700">皆様から寄せられる質問とその回答をまとめました。</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {loading ? (
          <div className="text-center py-16">
            <p className="text-xl text-neutral-500">読み込んでいます...</p>
          </div>
        ) : (
          faqs.map((faq, index) => (
            <details key={index} className="bg-neutral-50 p-6 rounded-lg shadow-md group" open={index === 0}>
              <summary className="font-bold text-xl cursor-pointer list-none flex justify-between items-center text-neutral-900">
                {faq.question}
                <span className="transform transition-transform duration-300 group-open:rotate-180">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502" stroke="#42526e" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-neutral-700 text-lg leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))
        )}
      </div>
    </div>
  );
};

export default FAQPage;