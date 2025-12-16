import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-10 lg:mb-0 relative group">
             <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition duration-500"></div>
            {/* Note: Ensure the image file is named 'anas pfp.png' in your public folder */}
            <img 
              src="anas pfp.png" 
              alt="Muhammad Anas" 
              className="relative rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full object-cover transform transition duration-500 group-hover:scale-[1.02]"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                // Fallback to a placeholder if image is not found
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
                I am <strong className="text-indigo-600 dark:text-indigo-400">Muhammad Anas</strong>, an AI Automation Engineer passionate about building systems that think and act. 
                My expertise lies in AI Product Development, orchestrating complex workflows using <span className="font-semibold text-slate-800 dark:text-slate-100">n8n</span>, and building rapid prototypes with tools like <span className="font-semibold text-slate-800 dark:text-slate-100">Lovable</span> and <span className="font-semibold text-slate-800 dark:text-slate-100">Bolt</span>.
              </p>
              <p>
                Currently creating solutions at <strong className="text-slate-900 dark:text-white">Impleko AI</strong>, I focus on removing manual bottlenecks. 
                Whether it's an intelligent email classifier that routes communications automatically or a lead-generation voice agent 
                using <span className="font-semibold text-slate-800 dark:text-slate-100">Retell AI</span> that qualifies prospects in real-time, I build tools that drive efficiency.
              </p>
              <p>
                Beyond the code, I have a deep understanding of customer data segmentation and computer science fundamentals.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
               <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border-l-4 border-indigo-500 shadow-sm">
                 <span className="block text-2xl font-bold text-slate-900 dark:text-white">No-Code AI</span>
                 <span className="text-sm text-slate-500 dark:text-slate-400">Lovable, n8n, Bolt</span>
               </div>
               <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border-l-4 border-purple-500 shadow-sm">
                 <span className="block text-2xl font-bold text-slate-900 dark:text-white">Gen AI</span>
                 <span className="text-sm text-slate-500 dark:text-slate-400">Google AI Studio, OpenAI</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;