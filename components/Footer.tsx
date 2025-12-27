import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 py-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Muhammad Anas</span>
          <p className="text-slate-500 dark:text-slate-500 text-sm mt-1">AI Automation Engineer | Building the Future</p>
        </div>
        
        <div className="flex space-x-8">
          <a href="https://github.com/anas-dev725" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors transform hover:scale-110">
            <Github size={24} />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/muhammad-anas804/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors transform hover:scale-110">
            <Linkedin size={24} />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="mailto:anasmobin0@gmail.com" className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors transform hover:scale-110">
            <Mail size={24} />
            <span className="sr-only">Email</span>
          </a>
        </div>
        
        <div className="text-slate-400 text-sm">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;