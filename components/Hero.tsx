import React from 'react';
import { ArrowRight, Bot, Zap, Database } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm shadow-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Open to new opportunities</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
          Hi, I'm <span className="text-indigo-600 dark:text-indigo-400">Muhammad Anas</span>
          <br />
          <span className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-500 dark:text-slate-400 mt-2 block">
            Specializing in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">AI Product Development</span> & Automation
          </span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
          I bridge the gap between APIs, Databases, and AI Models. 
          Expert in n8n, Lovable, and building autonomous AI agents that transform business processes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold transition-all shadow-[0_10px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_15px_30px_rgba(79,70,229,0.4)] hover:-translate-y-1 flex items-center justify-center"
          >
            View Projects
          </a>
          <a
            href="https://www.linkedin.com/in/muhammad-anas804/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-full font-semibold transition-all border border-slate-200 dark:border-slate-700 flex items-center justify-center group hover:shadow-lg"
          >
            Contact Me <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="flex flex-col items-center group">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl mb-4 border border-slate-200 dark:border-slate-800 shadow-lg group-hover:shadow-indigo-500/20 transition-all">
              <Bot className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">AI Agents</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Autonomous decision making</p>
          </div>
          <div className="flex flex-col items-center group">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl mb-4 border border-slate-200 dark:border-slate-800 shadow-lg group-hover:shadow-indigo-500/20 transition-all">
              <Zap className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Product Dev</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">SaaS & Internal Tools</p>
          </div>
          <div className="flex flex-col items-center group">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl mb-4 border border-slate-200 dark:border-slate-800 shadow-lg group-hover:shadow-indigo-500/20 transition-all">
              <Database className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Data Engineering</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">ETL & Real-time Analytics</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;