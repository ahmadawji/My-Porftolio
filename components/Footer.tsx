import React from 'react';
import { PERSONAL_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/10 dark:bg-slate-900/10 backdrop-blur-md border-t border-white/10 dark:border-slate-800/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-text-secondary text-sm">
          &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
        </p>
        <div className="text-text-secondary text-sm">
            Built with React & Tailwind CSS
        </div>
      </div>
    </footer>
  );
};

export default Footer;