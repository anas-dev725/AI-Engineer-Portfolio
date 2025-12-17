import React from 'react';
import { ArrowRight, Bot, Zap, Database, Mic, Terminal, Workflow, Code, Sparkles, MessageSquareQuote, Heart, MousePointer2, Phone, AudioWaveform } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-slate-50 dark:bg-slate-950">
      
      {/* 1. Dot Pattern Background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 dark:opacity-20 pointer-events-none"></div>
      
      {/* 2. Radial Fade for Depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-slate-50 dark:from-slate-950 dark:via-transparent dark:to-slate-950 pointer-events-none"></div>

      {/* 3. Floating Tech Stack Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        
        {/* n8n */}
        <div className="absolute top-[15%] left-[10%] animate-float opacity-30 dark:opacity-40 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-2 text-rose-500">
            <Workflow size={32} />
            <span className="text-sm font-bold">n8n</span>
          </div>
        </div>

        {/* Python */}
        <div className="absolute top-[20%] right-[12%] animate-float-delayed opacity-30 dark:opacity-40">
          <div className="flex items-center gap-2 text-blue-500">
            <Terminal size={32} />
            <span className="text-sm font-bold">Python</span>
          </div>
        </div>

        {/* Lovable */}
        <div className="absolute top-[35%] left-[5%] animate-pulse-slow opacity-30 dark:opacity-40">
          <div className="flex items-center gap-2 text-pink-500">
            <Heart size={28} />
            <span className="text-sm font-bold">Lovable</span>
          </div>
        </div>

        {/* ElevenLabs */}
        <div className="absolute bottom-[40%] left-[8%] animate-float opacity-30 dark:opacity-40">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <AudioWaveform size={28} />
            <span className="text-sm font-bold">ElevenLabs</span>
          </div>
        </div>

        {/* Vapi */}
        <div className="absolute bottom-[20%] left-[15%] animate-float-delayed opacity-30 dark:opacity-40">
          <div className="flex items-center gap-2 text-purple-600">
            <Mic size={32} />
            <span className="text-sm font-bold">Vapi</span>
          </div>
        </div>

        {/* Retell AI */}
        <div className="absolute bottom-[15%] right-[25%] animate-float opacity-30 dark:opacity-40">
          <div className="flex items-center gap-2 text-indigo-500">
            <Phone size={28} />
            <span className="text-sm font-bold">Retell AI</span>
          </div>
        </div>

        {/* Cursor */}
        <div className="absolute top-[40%] right-[5%] animate-pulse-slow opacity-20 dark:opacity-30">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white">
            <MousePointer2 size={36} />
            <span className="text-sm font-bold">Cursor</span>
          </div>
        </div>

        {/* Supabase */}
        <div className="absolute bottom-[30%] right-[10%] animate-float-delayed opacity-30 dark:opacity-40">
          <div className="flex items-center gap-2 text-emerald-500">
            <Database size={32} />
            <span className="text-sm font-bold">Supabase</span>
          </div>
        </div>

        {/* Claude */}
        <div className="absolute top-[12%] left-[45%] animate-float opacity-30 dark:opacity-40">
           <div className="flex flex-col items-center text-orange-600 dark:text-orange-400">
              <MessageSquareQuote size={28} />
              <span className="text-xs font-mono mt-1">Claude</span>
           </div>
        </div>

         {/* Gemini */}
         <div className="absolute top-[50%] right-[35%] animate-float-delayed opacity-30 dark:opacity-40">
           <div className="flex flex-col items-center text-sky-400">
              <Sparkles size={28} />
              <span className="text-xs font-mono mt-1">Gemini</span>
           </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm shadow-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
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
          I bridge the gap between APIs, databases, and AI models to build AI agents and automation systems. Specializing in n8n, Lovable, Retell AI, and Google AI Studio.
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
            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-white rounded-full font-semibold transition-all border border-slate-200 dark:border-slate-700 flex items-center justify-center group hover:shadow-lg"
          >
            Contact Me <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl w-full mx-auto">
          <div className="flex flex-col items-center group">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl mb-4 border border-slate-200 dark:border-slate-800 shadow-lg group-hover:shadow-indigo-500/20 transition-all">
              <Bot className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">AI Agents & Voice AI</h3>
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
              <Workflow className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Automation Workflows</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Streamlining Operations</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;