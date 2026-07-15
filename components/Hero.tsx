import React, { useState } from 'react';
import { Bot, Database, Sparkles, ArrowUpRight, Phone, Mic } from 'lucide-react';

const Hero: React.FC = () => {
  const [imgSrc, setImgSrc] = useState("/assets/hero asset 16.png");
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    if (imgSrc === "/assets/hero asset 16.png") {
      setImgSrc("assets/hero asset 16.png");
    } else {
      setImageError(true);
    }
  };

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-16 bg-slate-50 dark:bg-[#030303] text-slate-900 dark:text-white transition-colors duration-300"
    >
      {/* Sleek cybernetic grid system */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      {/* Atmospheric deep violet/purple radial glowing backdrops behind the robot */}
      <div className="absolute right-[-10%] top-[20%] w-[600px] h-[600px] bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[130px] pointer-events-none select-none"></div>
      <div className="absolute right-[15%] top-[40%] w-[400px] h-[400px] bg-indigo-600/5 dark:bg-indigo-600/15 rounded-full blur-[110px] pointer-events-none select-none"></div>
      <div className="absolute left-[-5%] top-[10%] w-[300px] h-[300px] bg-indigo-500/5 dark:bg-indigo-500/5 rounded-full blur-[90px] pointer-events-none select-none"></div>

      {/* Blueprint grid coordinates (+) */}
      <div className="absolute top-[18%] left-[5%] text-slate-300/40 dark:text-slate-700/40 font-mono text-xs select-none pointer-events-none">+</div>
      <div className="absolute top-[25%] right-[10%] text-slate-300/40 dark:text-slate-700/40 font-mono text-xs select-none pointer-events-none">+</div>
      <div className="absolute bottom-[20%] left-[15%] text-slate-300/40 dark:text-slate-700/40 font-mono text-xs select-none pointer-events-none">+</div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: Concise statement, paragraph & primary actions */}
          <div className="lg:col-span-6 flex flex-col text-left z-20 lg:pr-6">
            
            {/* Top outline pill badge with purple dot */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/10 dark:border-indigo-500/20 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-4 tracking-wider uppercase self-start">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              <span className="text-slate-600 dark:text-slate-300">AI Engineer • Product Builder</span>
            </div>

            {/* Premium, clean headline precisely as requested */}
            <h1 className="text-4xl sm:text-6xl lg:text-[4.2rem] xl:text-[4.8rem] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-4 font-sans">
              Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-500 font-extrabold animate-gradient-xy">AI</span> <br />
              that works <br />
              like your <span className="text-slate-900 dark:text-white font-extrabold">best</span> <br />
              <span className="text-slate-900 dark:text-white font-extrabold">employee.</span>
            </h1>

            {/* Sub-headline aligning to client copy */}
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 max-w-2xl">
              I'm Muhammad Anas, an AI engineer specializing in AI agents, Voice AI, and SaaS products that automate operations and solve real business problems.
            </p>

            {/* Custom Interactive CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleScrollToProjects}
                className="inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/45 text-sm group cursor-pointer"
              >
                <span>Explore Projects</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>

              <a
                href="https://calendly.com/anasmobin0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 bg-transparent border border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl font-bold transition-all duration-300 text-sm"
              >
                <Phone size={14} className="text-indigo-500 dark:text-purple-400" />
                <span>Book a Call</span>
              </a>
            </div>

            {/* Subtle Credibility Strip */}
            <div className="mt-8 lg:mt-10 flex flex-col items-start gap-2 w-full overflow-hidden group">
              <span className="text-[12px] tracking-[0.2em] text-slate-500 dark:text-slate-400 font-semibold uppercase opacity-70 dark:opacity-60 group-hover:opacity-95 dark:group-hover:opacity-85 transition-opacity duration-300">BUILDING WITH</span>
              <div className="flex flex-nowrap items-center gap-x-2.5 sm:gap-x-3.5 text-[13px] sm:text-sm text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap opacity-90 dark:opacity-80 group-hover:opacity-100 dark:group-hover:opacity-100 transition-opacity duration-300">
                <span>Claude</span>
                <span className="text-slate-300 dark:text-slate-700 select-none">•</span>
                <span>n8n</span>
                <span className="text-slate-300 dark:text-slate-700 select-none">•</span>
                <span>Vapi</span>
                <span className="text-slate-300 dark:text-slate-700 select-none">•</span>
                <span>Retell AI</span>
                <span className="text-slate-300 dark:text-slate-700 select-none">•</span>
                <span>Supabase</span>
                <span className="text-slate-300 dark:text-slate-700 select-none">•</span>
                <span>Antigravity</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Large showcase robot with customized orbital graphic, subtle depth and left translation */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-center h-full min-h-[420px] lg:min-h-[560px] xl:min-h-[600px] lg:-translate-x-[20px] xl:-translate-x-[40px] z-10 select-none">
            
            {/* Blurred ambient depth blurs & light specifically layered behind the robot */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
              <div className="absolute w-[85%] h-[85%] bg-gradient-to-tr from-purple-600/15 via-indigo-600/15 to-transparent rounded-full blur-[100px]"></div>
              <div className="absolute w-[60%] h-[60%] bg-violet-500/20 rounded-full blur-[70px]"></div>
            </div>

            {/* Drifting Sparkles / Particles for premium subtle animation */}
            <style>{`
              @keyframes drift-slow {
                0%, 100% { transform: translateY(0) translateX(0); }
                50% { transform: translateY(-20px) translateX(15px); }
              }
              @keyframes drift-medium {
                0%, 100% { transform: translateY(0) translateX(0); }
                50% { transform: translateY(-35px) translateX(-20px); }
              }
              @keyframes drift-fast {
                0%, 100% { transform: translateY(0) translateX(0); }
                50% { transform: translateY(-45px) translateX(25px); }
              }
              .animate-drift-slow {
                animation: drift-slow 14s ease-in-out infinite;
              }
              .animate-drift-medium {
                animation: drift-medium 18s ease-in-out infinite;
              }
              .animate-drift-fast {
                animation: drift-fast 11s ease-in-out infinite;
              }
            `}</style>

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Particle 1 */}
              <div className="absolute top-[30%] right-[35%] animate-drift-slow">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 opacity-70 shadow-[0_0_8px_rgba(168,85,247,0.5)] animate-pulse"></div>
              </div>
              
              {/* Particle 2 */}
              <div className="absolute bottom-[25%] right-[10%] animate-drift-medium">
                <div className="w-2 h-2 rounded-full bg-indigo-400 opacity-60 shadow-[0_0_10px_rgba(99,102,241,0.5)] animate-[pulse_3s_ease-in-out_infinite_1.5s]"></div>
              </div>

              {/* Particle 3 */}
              <div className="absolute top-[15%] right-[15%] animate-drift-fast">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-400 opacity-75 shadow-[0_0_8px_rgba(236,72,153,0.5)] animate-[pulse_4s_ease-in-out_infinite_0.5s]"></div>
              </div>

              {/* Particle 4 */}
              <div className="absolute bottom-[40%] right-[45%] animate-drift-slow">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-white opacity-50 shadow-[0_0_6px_rgba(148,163,184,0.4)] dark:shadow-[0_0_6px_rgba(255,255,255,0.4)] animate-[pulse_5s_ease-in-out_infinite]"></div>
              </div>

              {/* Particle 5 */}
              <div className="absolute top-[45%] right-[8%] animate-drift-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-300 opacity-60 shadow-[0_0_4px_rgba(165,180,252,0.4)] animate-pulse"></div>
              </div>

              {/* Particle 6 */}
              <div className="absolute bottom-[15%] right-[28%] animate-drift-fast">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-300 opacity-55 shadow-[0_0_4px_rgba(216,180,254,0.4)] animate-pulse"></div>
              </div>

              {/* Particle 7 (New - Soft Cyan Glow) */}
              <div className="absolute top-[5%] right-[40%] animate-drift-slow [animation-delay:2s]">
                <div className="w-1 h-1 rounded-full bg-cyan-400 opacity-65 shadow-[0_0_8px_rgba(34,211,238,0.6)] animate-[pulse_3.5s_ease-in-out_infinite_1s]"></div>
              </div>

              {/* Particle 8 (New - Warm Gold Sparkle) */}
              <div className="absolute bottom-[45%] right-[18%] animate-drift-medium [animation-delay:4s]">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-300 opacity-70 shadow-[0_0_10px_rgba(252,211,77,0.5)] animate-[pulse_4s_ease-in-out_infinite_2s]"></div>
              </div>

              {/* Particle 9 (New - Vibrant Magenta) */}
              <div className="absolute top-[25%] right-[5%] animate-drift-fast [animation-delay:1.5s]">
                <div className="w-2 h-2 rounded-full bg-fuchsia-400 opacity-60 shadow-[0_0_8px_rgba(232,121,249,0.5)] animate-pulse"></div>
              </div>

              {/* Particle 10 (New - Indigo Speck) */}
              <div className="absolute bottom-[10%] right-[42%] animate-drift-slow [animation-delay:3s]">
                <div className="w-1 h-1 rounded-full bg-indigo-400 opacity-50 shadow-[0_0_6px_rgba(129,140,248,0.4)] animate-[pulse_4.5s_ease-in-out_infinite]"></div>
              </div>

              {/* Particle 11 (New - Pure White Sparkle) */}
              <div className="absolute top-[38%] right-[25%] animate-drift-medium [animation-delay:0.5s]">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-white opacity-65 shadow-[0_0_8px_rgba(148,163,184,0.6)] dark:shadow-[0_0_8px_rgba(255,255,255,0.6)] animate-[pulse_3s_ease-in-out_infinite_0.7s]"></div>
              </div>

              {/* Particle 12 (New - Soft Purple Spec) */}
              <div className="absolute bottom-[35%] right-[2%] animate-drift-fast [animation-delay:5s]">
                <div className="w-1 h-1 rounded-full bg-purple-300 opacity-60 shadow-[0_0_5px_rgba(216,180,254,0.5)] animate-pulse"></div>
              </div>
            </div>

            {/* The Main Majestic Cyber Subject */}
            <div className="relative w-full max-w-[760px] lg:max-w-[920px] xl:max-w-[1050px] flex items-center justify-center lg:justify-end z-10">
              
              {!imageError ? (
                <img
                  src={imgSrc}
                  onError={handleImageError}
                  alt="Muhammad Anas - AI Hero Asset"
                  className="w-full h-auto max-h-[75vh] lg:max-h-[80vh] object-contain select-none pointer-events-none drop-shadow-[0_0_80px_rgba(139,92,246,0.25)] scale-115 lg:scale-120 xl:scale-125 transition-transform duration-500"
                  style={{
                    maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 70%)',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat'
                  }}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="p-8 bg-white dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-900 rounded-3xl text-center flex flex-col items-center">
                  <Bot size={54} className="text-indigo-500 mb-3 animate-pulse" />
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">AI Agent Core Online</h4>
                  <p className="text-xs text-slate-500 mt-2">Custom workflows running at peak efficiency.</p>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
