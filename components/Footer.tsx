import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO, SOCIAL_LINKS } from '../constants';
import { XSocialIcon, LinkedInIcon } from './icons/Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold">{COMPANY_INFO.name}</h3>
            <p className="mt-2 text-neutral-300">
              {COMPANY_INFO.address}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Sitemap</h3>
            <ul className="mt-2 space-y-2">
              <li><Link to="/about" className="hover:text-secondary transition-colors">会社概要</Link></li>
              <li><Link to="/jobs" className="hover:text-secondary transition-colors">案件情報</Link></li>
              <li><Link to="/faq" className="hover:text-secondary transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-secondary transition-colors">お問い合わせ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex mt-4 space-x-4">
              <a href={SOCIAL_LINKS.x} target="_blank" rel="noopener noreferrer" aria-label="X" className="text-neutral-300 hover:text-secondary transition-colors">
                <XSocialIcon />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-neutral-300 hover:text-secondary transition-colors">
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-neutral-700 text-center text-neutral-500">
          <p>&copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All Rights Reserved.</p>
          <Link to="/privacy-policy" className="mt-2 inline-block hover:text-secondary transition-colors text-sm">プライバシーポリシー</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;