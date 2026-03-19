import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center gap-6 mb-8">
          <a href="#" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            <Github size={24} />
          </a>
          <a href="#" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="#" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            <Mail size={24} />
          </a>
        </div>
        <p className="text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Muhammad Anas. All rights reserved.
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
          Built with React, Tailwind CSS, and AI Studio
        </p>
      </div>
    </footer>
  );
};

export default Footer;
