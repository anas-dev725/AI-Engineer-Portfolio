import React from 'react';
import { MessageCircle, Calendar } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-[#0B0F19] dark:bg-[#020617] shadow-2xl px-6 py-16 sm:px-16 sm:py-24 text-center border border-slate-800">
          
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
             <div className="absolute top-0 left-1/4 w-full max-w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -translate-y-1/2 transform -translate-x-1/2"></div>
             <div className="absolute bottom-0 right-1/4 w-full max-w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] translate-y-1/2 transform translate-x-1/2"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Ready to Automate Your Workflow?
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Don't settle for manual processes. Experience the power of intelligent automation and scale your business today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <a 
                href="https://wa.me/923202845350?text=Hey%20Anas,%20I%20want%20to%20discuss%20an%20automation%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-900 bg-white rounded-full hover:bg-slate-200 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.15)] min-w-[160px]"
              >
                Let's Chat
                <MessageCircle className="ml-2 w-5 h-5" />
              </a>
              <a 
                href="https://calendly.com/anasmobin0/30min" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white border border-slate-700 bg-white/5 rounded-full hover:bg-white/10 transition-all min-w-[160px]"
              >
                Book a Call
                <Calendar className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;