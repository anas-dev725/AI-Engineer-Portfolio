import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-10 lg:mb-0 relative group">
             <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <img 
              src="https://raw.githubusercontent.com/anas-dev725/AI-Engineer-Portfolio/main/anas%20profile.jpeg" 
              alt="Muhammad Anas" 
              className="relative rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full object-cover transform transition duration-500 group-hover:scale-[1.02]"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                // Fallback to a placeholder if the specific image fails to load
                target.src = 'https://picsum.photos/600/600?grayscale'; 
              }}
            />
          </div>
          
          <div>
            <div className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-semibold mb-4">
              Who I Am
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">About Me</h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
              <p>
                I’m an <strong className="text-indigo-600 dark:text-indigo-400">AI Automation Engineer</strong> who likes building systems that think before they act. 
                I work on <span className="font-semibold text-slate-800 dark:text-slate-100">AI product development</span>, design automation workflows with <span className="font-semibold text-slate-800 dark:text-slate-100">n8n</span>, and quickly turn ideas into working prototypes using tools like <span className="font-semibold text-slate-800 dark:text-slate-100">Lovable</span>, <span className="font-semibold text-slate-800 dark:text-slate-100">Bolt</span>, and <span className="font-semibold text-slate-800 dark:text-slate-100">Google AI Studio</span>.
              </p>
              <p>
                Lately, I’ve been building <span className="font-semibold text-slate-800 dark:text-slate-100">SaaS products</span>, <span className="font-semibold text-slate-800 dark:text-slate-100">AI agents</span>, automation workflows, websites, and <span className="font-semibold text-slate-800 dark:text-slate-100">voice agents</span>. I love turning ambitious AI ideas into simple solutions, and I’m always curious to try new tools to build something better.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
               <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border-l-4 border-indigo-500 shadow-sm">
                 <span className="block text-2xl font-bold text-slate-900 dark:text-white">No-Code AI</span>
                 <span className="text-sm text-slate-500 dark:text-slate-400">Lovable, n8n, Retell, Vapi</span>
               </div>
               <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border-l-4 border-purple-500 shadow-sm">
                 <span className="block text-2xl font-bold text-slate-900 dark:text-white">Gen AI</span>
                 <span className="text-sm text-slate-500 dark:text-slate-400">Google AI Studio, OpenAI, Claude</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;