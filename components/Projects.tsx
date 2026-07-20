import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { 
  Mail, 
  BarChart3, 
  Phone, 
  Users, 
  Map, 
  Cpu, 
  ExternalLink, 
  Home, 
  Calendar, 
  Workflow, 
  LayoutTemplate, 
  UtensilsCrossed, 
  FileCheck, 
  BookOpen,
  Sparkles,
  Database,
  RefreshCw,
  Code,
  Layers
} from 'lucide-react';

const projects: Project[] = [
  // Voice AI
  {
    title: "Multilingual Real Estate Voice Agent",
    description: "An automated outbound voice agent that qualifies real estate leads in English, Arabic, and Hindi, automatically syncing viewings with Cal.com.",
    tags: ["Retell AI", "n8n", "Supabase", "Twilio", "Deepgram Nova-2", "Elevenlabs", "Cal.com"],
    icon: "phone",
    link: "#",
    category: "Voice AI"
  },
  {
    title: "AI Booking Voice Receptionist for Restaurants",
    description: "Automates 24/7 dining reservations and guests queries in Danish and English with real-time restaurant table booking integrations.",
    tags: ["Retell AI", "ElevenLabs", "n8n", "Supabase", "Cal.com", "Google Calendar", "Gmail", "Airtable"],
    icon: "food",
    link: "#",
    category: "Voice AI"
  },
  // AI Agents & Automation
  {
    title: "Multi-Platform Content Automation Agent",
    description: "An automated weekly pipeline that researches niche trending topics and distributes tailored content across social channels and newsletters.",
    tags: ["n8n", "OpenAI", "Tavily", "Beehiiv", "Buffer", "Supabase"],
    icon: "workflow",
    link: "#",
    category: "AI Agents & Automation"
  },
  // SaaS Products
  {
    title: "Propel AI",
    description: "A comprehensive AI CRM and sales copilot for Dubai real estate agents, featuring lead management and conversation intelligence.",
    tags: ["Supabase", "Twilio Voice SDK", "Deepgram Nova-2", "Lovable AI Gateway", "Firecrawl"],
    icon: "home",
    link: "https://propel-ai-platform.lovable.app/",
    category: "SaaS Products"
  },
  {
    title: "Narrato",
    description: "An automated weekly publishing and scheduling SaaS pipeline for founders and modern content creators.",
    tags: ["n8n", "Gemini API", "Supabase", "Beehiiv", "Buffer", "Lovable"],
    icon: "workflow",
    link: "https://narrato-ai.lovable.app/",
    category: "SaaS Products"
  },
  {
    title: "PathVerse AR",
    description: "An indoor navigation web app using AI visual recognition to guide students inside campus buildings.",
    tags: ["React", "TypeScript", "Gemini API", "Three.js", "Vercel"],
    icon: "map",
    link: "https://path-verse-ar.vercel.app/",
    category: "SaaS Products"
  },
  {
    title: "Study Zap",
    description: "Turns complex study PDFs into structured notes, summarized guides, and interactive practice quizzes instantly.",
    tags: ["React", "Gemini API", "TypeScript", "Vercel"],
    icon: "book",
    link: "https://studyzapai.vercel.app/",
    category: "SaaS Products"
  },
  {
    title: "Launch Copy",
    description: "SaaS landing page copy generator that creates high-converting headlines and copy with dynamic live design previews.",
    tags: ["React", "TypeScript", "Gemini API", "Vercel"],
    icon: "layout",
    link: "https://landing-page-generator-nu.vercel.app/",
    category: "SaaS Products"
  },
  {
    title: "Food Punch Karachi",
    description: "E-commerce ordering platform for homemade Memon dishes, featuring WhatsApp checkout and AI recipe suggestions.",
    tags: ["React", "Gemini API", "WhatsApp API", "Vercel"],
    icon: "food",
    link: "https://food-punch-karachi.vercel.app/",
    category: "SaaS Products"
  },

  // AI Agents & Automation
  {
    title: "Recipe RAG Agent",
    description: "RAG-powered cooking assistant utilizing vector databases to retrieve precise ingredient pairings and preparation steps.",
    tags: ["n8n", "Pinecone", "OpenAI Embeddings", "Vector Store Retrieval"],
    icon: "food",
    link: "#",
    category: "AI Agents & Automation"
  },
  {
    title: "Employee Onboarding Agent",
    description: "Automates end-to-end employee onboarding by drafting offer letters, saving documents to Google Drive, and alerting Slack.",
    tags: ["n8n", "Google Forms", "JavaScript", "Gmail", "Google Drive"],
    icon: "users",
    link: "#",
    category: "AI Agents & Automation"
  },
  {
    title: "Email Classifier Agent",
    description: "Classifies incoming emails with AI, draft-replies important queries, and triggers instant mobile alerts for critical leads.",
    tags: ["n8n", "OpenAI", "Gmail API", "Slack API"],
    icon: "mail",
    link: "#",
    category: "AI Agents & Automation"
  },
  {
    title: "Data Analytics Agent",
    description: "A natural language business intelligence assistant that queries database spreadsheets and displays real-time analytics dashboards.",
    tags: ["Lovable", "Google Sheets", "NLP", "Dashboard"],
    icon: "chart",
    link: "#",
    category: "AI Agents & Automation"
  },
  {
    title: "HubSpot Contacts AI Agent",
    description: "Captures user contact details from forms, schedules follow-ups in HubSpot, and coordinates team alerts in Slack.",
    tags: ["n8n", "Bravo", "Gmail", "Slack", "HubSpot"],
    icon: "workflow",
    link: "#",
    category: "AI Agents & Automation"
  },

  // Voice AI
  {
    title: "Lead-Generation Voice Agent",
    description: "Automates outbound phone campaigns to qualify prospects and instantly update pipeline stages within CRM dashboards.",
    tags: ["Vapi", "ElevenLabs", "CRM Integration", "Voice AI"],
    icon: "phone",
    link: "#",
    category: "Voice AI"
  },
  {
    title: "Property Inbound Voice Agent",
    description: "Schedules apartment viewings by identifying buyer search criteria, budgets, and location preferences via voice.",
    tags: ["n8n", "Vapi", "Twilio"],
    icon: "home",
    link: "#",
    category: "Voice AI"
  },
  {
    title: "Healthcare Voice Agent",
    description: "Answers patient questions, screens symptoms, and books doctor appointments directly into core calendar management suites.",
    tags: ["n8n", "Calendly", "ElevenLabs", "Twilio"],
    icon: "calendar",
    link: "#",
    category: "Voice AI"
  },

  // Python & Data
  {
    title: "Automated Testing Suite",
    description: "Playwright automation suite running routine end-to-end user tests across multiple browsers with dynamic video reporting.",
    tags: ["JavaScript", "Node.js", "Playwright", "HTML Reports"],
    icon: "check",
    link: "https://github.com/anas-dev725/Automated-testing-with-playwright",
    category: "Python & Data"
  },
  {
    title: "Customer E-commerce Segmentation",
    description: "An e-commerce customer segmentation engine using Python's Scikit-Learn and K-Means clustering algorithm.",
    tags: ["Python", "Scikit-learn", "K-Means", "Data Science"],
    icon: "users",
    link: "#",
    category: "Python & Data"
  }
];

// Stateful Preview Mockups for each Project Card
const ProjectPreview: React.FC<{ project: Project }> = ({ project }) => {
  const [tick, setTick] = useState(0);
  const [lastActive, setLastActive] = useState("2s");

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => (prev + 1) % 3);
      setLastActive(`${Math.floor(Math.random() * 8) + 1}s`);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const title = project.title;
  const category = project.category;

  // Render highly-tailored visual mockups for each primary project
  if (title === "Multilingual Real Estate Voice Agent") {
    return (
      <div className="w-full h-60 bg-[#0B0F19] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
        {/* Top Header */}
        <div className="flex justify-between items-center text-[9px] text-cyan-400/80">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-emerald-400">🟢 LIVE</span>
            <span className="text-slate-600">•</span>
            <span className="text-[8px] text-slate-400">Interaction: {lastActive} ago</span>
          </span>
          <span className="text-[8px] bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/30 text-cyan-400 font-semibold">VAPI ACTIVE</span>
        </div>
        
        {/* Waveform Visualizer */}
        <div className="flex items-center justify-center gap-1 h-18">
          {[0.6, 0.4, 0.9, 0.5, 0.7, 0.3, 0.8, 0.5, 0.6, 0.4, 0.7, 0.5, 0.8, 0.3].map((h, i) => (
            <div 
              key={i} 
              className="w-1 bg-cyan-400 rounded-full transition-all duration-300"
              style={{ 
                height: `${Math.max(8, h * 100 * (tick === 0 ? 0.3 : tick === 1 ? 0.9 : 0.6))}%`,
                opacity: tick === i % 3 ? 1 : 0.6
              }}
            />
          ))}
        </div>

        {/* Dynamic Transcript Dialog Box */}
        <div className="bg-slate-900/80 border border-slate-800 rounded p-2.5 text-[10px] text-slate-300 min-h-[52px] flex flex-col justify-center">
          {tick === 0 && (
            <p className="animate-fade-in"><span className="text-cyan-400 font-bold">AI:</span> Looking for a villa in Dubai Marina?</p>
          )}
          {tick === 1 && (
            <p className="animate-fade-in"><span className="text-amber-400 font-bold">Client:</span> जी, ३ BHK का क्या प्राइस होगा?</p>
          )}
          {tick === 2 && (
            <p className="animate-fade-in"><span className="text-cyan-400 font-bold">AI:</span> Dubai Marina pricing starts around 3M AED.</p>
          )}
        </div>

        {/* Bottom Status bar */}
        <div className="text-[9px] text-slate-500 flex justify-between items-center border-t border-slate-800/60 pt-1.5">
          <span>LANG: EN / AR / HI</span>
          <span className="text-emerald-400 flex items-center gap-1 font-semibold">📅 Cal.com Synced</span>
        </div>
      </div>
    );
  }

  if (title === "AI Booking Voice Receptionist for Restaurants") {
    return (
      <div className="w-full h-60 bg-[#150F0B] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
        {/* Top Header */}
        <div className="flex justify-between items-center text-[9px] text-amber-500/80">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-emerald-400">🟢 LIVE</span>
            <span className="text-amber-900/50">•</span>
            <span className="text-[8px] text-amber-400/80">Last Booking: 19:30</span>
          </span>
          <span className="text-[8px] bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-900/30 text-amber-500 font-semibold">RESERVEBOT</span>
        </div>

        {/* Spinning Platter and wave */}
        <div className="flex justify-center items-center h-16">
          <div className="relative w-12 h-12 rounded-full border border-dashed border-amber-500/40 flex items-center justify-center animate-[spin_20s_linear_infinite]">
            <UtensilsCrossed size={16} className="text-amber-400" />
            <div className="absolute inset-0 rounded-full border-t border-amber-400 animate-pulse"></div>
          </div>
        </div>

        {/* Transcript Dialogue */}
        <div className="bg-amber-950/40 border border-amber-900/30 rounded p-2.5 text-[10px] text-amber-200/90 min-h-[52px] flex flex-col justify-center">
          {tick === 0 && (
            <p className="animate-fade-in"><span className="text-amber-400 font-bold">Guest:</span> Hej, har I ledige borde i aften?</p>
          )}
          {tick === 1 && (
            <p className="animate-fade-in"><span className="text-emerald-400 font-bold">AI:</span> Ja, vi har plads kl. 19:30 og 21:00.</p>
          )}
          {tick === 2 && (
            <p className="animate-fade-in"><span className="text-amber-400 font-bold">Guest:</span> Perfekt, et bord til 4 kl. 19:30 tak!</p>
          )}
        </div>

        {/* Bottom Stats */}
        <div className="text-[9px] text-amber-600/60 flex justify-between items-center border-t border-amber-900/20 pt-1.5">
          <span>LANG: DANISH / EN</span>
          <span className="text-emerald-400 flex items-center gap-1 font-semibold">🍽️ Table booked</span>
        </div>
      </div>
    );
  }

  if (title === "Multi-Platform Content Automation Agent") {
    return (
      <div className="w-full h-60 bg-[#0B132B] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
        <div className="flex justify-between items-center text-[9px] text-indigo-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-emerald-400">🟢 Pipeline: Running</span>
          </span>
          <span className="text-[8px] bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-900/30 text-indigo-400 font-semibold">n8n FLOW</span>
        </div>

        {/* Flow Diagram */}
        <div className="flex justify-between items-center px-4 h-24 relative">
          <div className="flex flex-col items-center z-10">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-indigo-400 shadow">
              <Mail size={14} />
            </div>
            <span className="text-[7px] text-slate-400 mt-1">Trends</span>
          </div>

          <div className="absolute top-10 left-12 right-12 h-0.5 border-t border-dashed border-indigo-500/40 -z-0">
            <div className="w-2 h-2 rounded-full bg-indigo-400 absolute top-[-3px] animate-[flowLine_2s_linear_infinite]"></div>
          </div>

          <div className="flex flex-col items-center z-10">
            <div className="w-11 h-11 rounded-full bg-indigo-950 border-2 border-indigo-500 flex items-center justify-center text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.5)] animate-pulse">
              <Cpu size={18} />
            </div>
            <span className="text-[8px] text-indigo-300 mt-1 font-bold">n8n Core</span>
          </div>

          <div className="flex flex-col items-center z-10">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-purple-400 shadow">
              <ExternalLink size={14} />
            </div>
            <span className="text-[7px] text-slate-400 mt-1">Socials</span>
          </div>
        </div>

        <div className="bg-slate-900/60 rounded p-1.5 text-[8px] text-slate-400 flex justify-around border border-slate-800/40">
          <span className={tick === 0 ? "text-indigo-400 font-bold" : ""}>● Beehiiv</span>
          <span className={tick === 1 ? "text-purple-400 font-bold" : ""}>● LinkedIn</span>
          <span className={tick === 2 ? "text-cyan-400 font-bold" : ""}>● Twitter/X</span>
        </div>
      </div>
    );
  }

  if (title === "Propel AI") {
    return (
      <div className="w-full h-60 bg-[#0D1B1E] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
        {/* Header */}
        <div className="flex justify-between items-center text-[9px] text-teal-400/80">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-emerald-400">🟢 Copilot: Ready</span>
            <span className="text-slate-700">•</span>
            <span className="text-[8px] text-slate-400">Real-time sync</span>
          </span>
          <span className="px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20 text-[8px] font-semibold">CRM PORTAL</span>
        </div>

        {/* Dashboard View */}
        <div className="grid grid-cols-2 gap-3 my-2">
          <div className="bg-slate-900/80 border border-slate-800 rounded p-2.5 flex flex-col justify-between">
            <span className="text-[8px] text-slate-500">LEAD INSIGHT</span>
            <div className="text-xs font-bold text-teal-300 flex items-center gap-1 my-1">
              Score: 98% <Sparkles size={10} className="text-amber-400 animate-pulse" />
            </div>
            <span className="text-[7px] text-slate-400">High buying intent</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded p-2.5 flex flex-col justify-between">
            <span className="text-[8px] text-slate-500">SALES COPILOT</span>
            <span className="text-[8px] text-slate-300 truncate my-1">▶ Play call audio</span>
            <span className="text-[7px] text-emerald-400 font-bold">Budget: 2.5M AED</span>
          </div>
        </div>

        {/* Bottom Listings Slider */}
        <div className="bg-teal-950/20 border border-teal-900/30 rounded p-1.5 text-[8px] text-teal-200/90 flex justify-between items-center">
          <span>Match: Studio in Dubai Marina</span>
          <span className="text-teal-400 font-bold">1.2M AED</span>
        </div>
      </div>
    );
  }

  if (title === "Narrato") {
    return (
      <div className="w-full h-60 bg-[#0F0E17] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
        <div className="flex justify-between items-center text-[9px] text-pink-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-emerald-400">🟢 Autopilot: Active</span>
          </span>
          <span className="text-pink-400 font-bold bg-pink-950/60 px-1.5 py-0.5 rounded border border-pink-900/30 text-[8px]">NARRATO</span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 my-2">
          {["MON • Beehiiv", "WED • Twitter/X", "FRI • LinkedIn"].map((day, i) => (
            <div 
              key={i} 
              className={`border rounded p-2 flex flex-col justify-between text-center transition-all duration-300 ${
                tick === i 
                  ? "bg-pink-950/30 border-pink-500 text-pink-300 shadow-[0_0_8px_rgba(236,72,153,0.3)] scale-105" 
                  : "bg-slate-900/50 border-slate-800 text-slate-500"
              }`}
            >
              <span className="text-[7px] font-bold">{day.split(" • ")[0]}</span>
              <span className="text-[8px] truncate font-semibold mt-1">{day.split(" • ")[1]}</span>
              <span className="text-[6px] text-emerald-400 mt-1">✔ Sent</span>
            </div>
          ))}
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded p-2 text-[9px] text-slate-300">
          <span className="text-pink-400 font-bold">Draft:</span> "How to scale SaaS via workflow automation..."
        </div>
      </div>
    );
  }

  if (title === "PathVerse AR") {
    return (
      <div className="w-full h-60 bg-[#050D1A] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
        <div className="flex justify-between items-center text-[9px] text-blue-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-emerald-400">🟢 AR Core: Ready</span>
          </span>
          <span className="text-blue-400 font-bold bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-900/30 text-[8px]">AR MAPS</span>
        </div>

        <div className="flex items-center justify-center gap-6 h-24 relative">
          {/* Compass Graphic */}
          <div className="w-18 h-18 rounded-full border border-blue-500/30 flex items-center justify-center relative">
            <div className="absolute inset-2 rounded-full border border-dashed border-blue-500/20"></div>
            <div 
              className="w-1 h-14 bg-gradient-to-t from-transparent via-blue-500 to-cyan-400 rounded-full transition-transform duration-1000"
              style={{ transform: `rotate(${tick * 120}deg)` }}
            />
            <div className="absolute w-2 h-2 rounded-full bg-cyan-400"></div>
          </div>

          <div className="flex flex-col gap-1.5 text-[9px]">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span>CBM Hall • 45m</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
              <span>IT Block • 120m</span>
            </div>
            <div className="text-emerald-400 text-[8px] animate-pulse">▲ Heading North</div>
          </div>
        </div>

        <div className="bg-slate-900/80 rounded p-1 text-center text-[8px] text-blue-300/80 border border-slate-800/40">
          Visual Navigation: No GPS Signal Required
        </div>
      </div>
    );
  }

  if (title === "Study Zap") {
    return (
      <div className="w-full h-60 bg-[#0D1527] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
        <div className="flex justify-between items-center text-[9px] text-cyan-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-emerald-400">🟢 Quiz Bot: Online</span>
          </span>
          <span className="text-cyan-400 font-bold bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-900/30 text-[8px]">STUDY ZAP</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded p-2.5 text-[9px] text-slate-200">
          <p className="text-slate-400 mb-1.5 text-[8px]">Q: What is RAG in AI?</p>
          <div className="space-y-1">
            <div className="border border-slate-800 rounded p-1 text-[8px] text-slate-500">
              A) Fine-tuning model weights
            </div>
            <div className="border border-emerald-500 bg-emerald-950/20 rounded p-1 text-[8px] text-emerald-300 flex items-center justify-between">
              <span>B) Fetching context from Vector DB</span>
              <span className="text-emerald-400 font-bold text-[7px]">CORRECT</span>
            </div>
          </div>
        </div>

        <div className="text-[8px] text-slate-500 text-center border-t border-slate-800/40 pt-1">
          PDF Processed • 10 Practice Questions Generated
        </div>
      </div>
    );
  }

  if (title === "Launch Copy") {
    return (
      <div className="w-full h-60 bg-[#0E1726] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
        <div className="flex justify-between items-center text-[9px] text-purple-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-emerald-400">🟢 Editor: Live Preview</span>
          </span>
          <span className="text-purple-400 font-bold bg-purple-950/60 px-1.5 py-0.5 rounded border border-purple-900/30 text-[8px]">LAUNCH COPY</span>
        </div>

        <div className="grid grid-cols-2 gap-2 my-1 h-24">
          <div className="bg-slate-950 border border-slate-800 rounded p-2 text-[8px] text-slate-300 flex flex-col justify-between">
            <span className="text-slate-500 text-[6px]">GENERATED COPY</span>
            <p className="font-bold text-purple-300 leading-tight mt-1">Scale Your Agency on Autopilot</p>
            <span className="text-[6px] text-slate-500 mt-1">[Click to copy]</span>
          </div>
          <div className="bg-slate-900 border border-purple-500/30 rounded p-2 text-[8px] flex flex-col justify-between items-center text-center">
            <div className="w-5 h-5 rounded bg-purple-500/20 flex items-center justify-center text-purple-400">✔</div>
            <span className="text-[7px] text-slate-300 font-semibold">Active Live View</span>
            <span className="text-[6px] px-1 bg-purple-500/20 text-purple-300 rounded font-bold">Responsive</span>
          </div>
        </div>

        <div className="bg-purple-950/20 border border-purple-900/30 rounded p-1.5 text-center text-[8px] text-purple-300">
          Convert visitors with AI-optimized copy.
        </div>
      </div>
    );
  }

  if (title === "Food Punch Karachi") {
    return (
      <div className="w-full h-60 bg-[#1B0F0F] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
        <div className="flex justify-between items-center text-[9px] text-amber-500">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-emerald-400">🟢 Orders: Online</span>
          </span>
          <span className="text-emerald-400 font-semibold">WhatsApp Checkout</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded p-2 flex justify-between items-center my-2">
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-200 font-bold">Memon Biryani</span>
            <span className="text-[7px] text-slate-500">Authentic Homemade</span>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-950/30 border border-amber-900/50 rounded px-1.5 py-0.5">
            <span className="text-[8px] text-amber-400">-</span>
            <span className="text-[8px] text-slate-200 font-bold">1</span>
            <span className="text-[8px] text-amber-400">+</span>
          </div>
        </div>

        <div className="w-full bg-emerald-600 hover:bg-emerald-700 rounded py-1.5 text-center text-[9px] font-bold text-white shadow">
          💬 Order on WhatsApp API
        </div>
      </div>
    );
  }

  // Special Mockups for all other individual projects
  if (title === "Recipe RAG Agent") {
    return (
      <div className="w-full h-60 bg-[#070D0E] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
        <div className="flex justify-between items-center text-[9px] text-teal-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-emerald-400">🟢 RAG DB: Synced</span>
          </span>
          <span className="text-[8px] bg-teal-950/60 px-1.5 py-0.5 rounded border border-teal-900/30 text-teal-400 font-semibold">PINECONE VECTORS</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded p-2 text-[9px] text-slate-300">
          <p className="text-slate-500 text-[8px] mb-1">🔍 Query: "Pasta seasoning pairings"</p>
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[8px] bg-emerald-950/20 border border-emerald-900/30 rounded p-1 text-emerald-300">
              <span>🌿 Sweet Basil Leaf</span>
              <span className="font-bold">Match: 97.4%</span>
            </div>
            <div className="flex justify-between items-center text-[8px] bg-slate-950/40 border border-slate-800 rounded p-1 text-slate-400">
              <span>🧄 Roasted Garlic</span>
              <span className="font-bold">Match: 88.2%</span>
            </div>
          </div>
        </div>

        <div className="text-[8px] text-slate-500 text-center border-t border-slate-800/40 pt-1">
          Vector Index: 45,210 Recipe Embeddings
        </div>
      </div>
    );
  }

  if (title === "Employee Onboarding Agent") {
    return (
      <div className="w-full h-60 bg-[#0C121C] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
        <div className="flex justify-between items-center text-[9px] text-blue-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-emerald-400">🟢 HR Core: Listening</span>
          </span>
          <span className="text-[8px] bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-900/30 text-blue-400 font-semibold">WORKFLOW</span>
        </div>

        <div className="space-y-1.5 my-1">
          <div className="flex items-center justify-between text-[8px] bg-slate-900/80 border border-slate-800 rounded p-1.5 text-slate-300">
            <span className="flex items-center gap-1">✔ Draft Offer Letter</span>
            <span className="text-emerald-400 font-bold">DONE</span>
          </div>
          <div className="flex items-center justify-between text-[8px] bg-slate-900/80 border border-slate-800 rounded p-1.5 text-slate-300">
            <span className="flex items-center gap-1">✔ Save to Google Drive</span>
            <span className="text-emerald-400 font-bold">DONE</span>
          </div>
          <div className="flex items-center justify-between text-[8px] bg-blue-950/20 border border-blue-900/30 rounded p-1.5 text-blue-300">
            <span className="flex items-center gap-1 animate-pulse">⏳ Dispatching Slack Welcome</span>
            <span className="text-blue-400 font-bold animate-pulse">SENDING</span>
          </div>
        </div>

        <div className="text-[8px] text-slate-500 text-center border-t border-slate-800/40 pt-1">
          Trigger: Form submission detected
        </div>
      </div>
    );
  }

  if (title === "Email Classifier Agent") {
    return (
      <div className="w-full h-60 bg-[#140F0A] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
        <div className="flex justify-between items-center text-[9px] text-orange-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-emerald-400">🟢 Inbox: Auto-sorting</span>
          </span>
          <span className="text-[8px] bg-orange-950/60 px-1.5 py-0.5 rounded border border-orange-900/30 text-orange-400 font-semibold">CLASSIFIER</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded p-2 text-[9px]">
          <div className="text-slate-400 text-[8px] truncate pb-1 border-b border-slate-800/60">
            From: investor@venture.co • "Pitch request..."
          </div>
          <div className="mt-1.5 flex justify-between items-center bg-red-950/20 border border-red-900/40 text-red-400 p-1 rounded text-[8px]">
            <span>Category: CRITICAL LEAD</span>
            <span>Conf: 99.4%</span>
          </div>
          <p className="text-slate-500 text-[7px] mt-1 italic font-sans leading-tight">"Drafting instant custom reply..."</p>
        </div>

        <div className="text-[8px] text-slate-500 text-center border-t border-slate-800/40 pt-1">
          Average Response Dispatch: 1.2s
        </div>
      </div>
    );
  }

  if (title === "Data Analytics Agent") {
    return (
      <div className="w-full h-60 bg-[#0B1516] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
        <div className="flex justify-between items-center text-[9px] text-emerald-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-emerald-400">🟢 Dashboard: Connected</span>
          </span>
          <span className="text-[8px] bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-900/30 text-emerald-400 font-semibold">NLP ANALYTICS</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded p-2 text-[8px]">
          <div className="text-slate-500 mb-1 text-[7.5px]">Prompt: "Sales trajectory this month"</div>
          {/* Dynamic bar charts with tailwind */}
          <div className="flex items-end gap-1.5 h-10 mt-1 pb-1 border-b border-slate-800/50">
            <div className="w-full bg-emerald-600/30 rounded-t h-[40%]"></div>
            <div className="w-full bg-emerald-600/50 rounded-t h-[60%]"></div>
            <div className="w-full bg-emerald-600/70 rounded-t h-[80%]"></div>
            <div className="w-full bg-emerald-500 rounded-t h-[95%] animate-pulse"></div>
          </div>
          <div className="flex justify-between text-[7px] text-slate-400 mt-1 font-bold">
            <span>WK 1-3</span>
            <span className="text-emerald-400">Target: +12.4% Achieved</span>
          </div>
        </div>

        <div className="text-[8px] text-slate-500 text-center border-t border-slate-800/40 pt-1">
          Source: synced live sheets database
        </div>
      </div>
    );
  }

  if (title === "HubSpot Contacts AI Agent") {
    return (
      <div className="w-full h-60 bg-[#1A0D05] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
        <div className="flex justify-between items-center text-[9px] text-amber-500">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-emerald-400">🟢 CRM Webhook: Listening</span>
          </span>
          <span className="text-[8px] bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-900/30 text-amber-500 font-semibold">HUBSPOT</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded p-2 text-[8px] space-y-1">
          <div className="text-slate-500 text-[7px]">INCOMING WEBHOOK FORM SUBMIT:</div>
          <p className="text-slate-300"><span className="text-amber-500">Name:</span> Anas Mobin</p>
          <p className="text-slate-300"><span className="text-amber-500">Role:</span> AI Systems Architect</p>
          <div className="flex justify-between items-center text-[7px] bg-emerald-950/20 border border-emerald-900/30 text-emerald-400 px-1 py-0.5 rounded mt-1">
            <span>✔ Sync to HubSpot successful</span>
            <span>ID: 882103</span>
          </div>
        </div>

        <div className="text-[8px] text-slate-500 text-center border-t border-slate-800/40 pt-1">
          Status: Slack alert team dispatched
        </div>
      </div>
    );
  }

  if (title === "Lead-Generation Voice Agent") {
    return (
      <div className="w-full h-60 bg-[#0B0E14] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
        <div className="flex justify-between items-center text-[9px] text-blue-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-emerald-400">🟢 Campaign: Active</span>
          </span>
          <span className="text-[8px] bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-900/30 text-blue-400 font-semibold">VAPI DIALER</span>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 rounded p-2 text-[8px]">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 animate-pulse">
            <Phone size={14} />
          </div>
          <div className="flex-grow min-w-0">
            <div className="text-slate-400 truncate">Calling prospect: +1 (415) 332-9014</div>
            <div className="text-emerald-400 text-[7px] animate-pulse">Status: Explaining CRM benefits...</div>
          </div>
        </div>

        <div className="bg-slate-950/40 rounded p-1.5 text-[8px] text-slate-500 flex justify-between">
          <span>Total Dials: 142 today</span>
          <span className="text-emerald-400">Stage: Qualified (18)</span>
        </div>

        <div className="text-[8px] text-slate-500 text-center border-t border-slate-800/40 pt-1">
          Pipeline: synced to Salesforce
        </div>
      </div>
    );
  }

  if (title === "Property Inbound Voice Agent") {
    return (
      <div className="w-full h-60 bg-[#0F140F] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
        <div className="flex justify-between items-center text-[9px] text-emerald-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-emerald-400">🟢 Inbound: Listening 24/7</span>
          </span>
          <span className="text-[8px] bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-900/30 text-emerald-400 font-semibold">DUBAI AGENT</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded p-2 text-[8px] space-y-1">
          <div className="text-slate-500 text-[7px]">Active conversation parsing tags:</div>
          <div className="flex flex-wrap gap-1">
            <span className="bg-emerald-950/30 border border-emerald-900/30 text-emerald-300 px-1 py-0.5 rounded text-[7px]">Loc: Downtown Dubai</span>
            <span className="bg-slate-950 text-slate-300 px-1 py-0.5 rounded text-[7px]">Budget: 3M-4M AED</span>
            <span className="bg-slate-950 text-slate-300 px-1 py-0.5 rounded text-[7px]">Beds: 2 BHK</span>
          </div>
          <div className="text-slate-400 text-[7px] italic mt-1 font-sans">"Booking viewing appointment slot..."</div>
        </div>

        <div className="text-[8px] text-slate-500 text-center border-t border-slate-800/40 pt-1">
          Database: Supabase Live Synced
        </div>
      </div>
    );
  }

  if (title === "Healthcare Voice Agent") {
    return (
      <div className="w-full h-60 bg-[#0B151A] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
        <div className="flex justify-between items-center text-[9px] text-cyan-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-emerald-400">🟢 Reception: Online</span>
          </span>
          <span className="text-[8px] bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-900/30 text-cyan-400 font-semibold">CLINIC BOT</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded p-2 text-[8px]">
          <div className="text-slate-500 text-[7px] mb-1">Interactive Call Transcript snippet:</div>
          <div className="space-y-1">
            <p className="text-slate-300"><span className="text-cyan-400">Patient:</span> I need a follow-up with Dr. Miller.</p>
            <p className="text-emerald-400"><span className="text-emerald-500">AI:</span> I've booked you for tomorrow at 10:30 AM.</p>
          </div>
        </div>

        <div className="bg-cyan-950/10 border border-cyan-900/30 text-cyan-300 px-1.5 py-1 rounded text-center text-[8px]">
          📅 Calendar invite dispatched to patient email
        </div>

        <div className="text-[8px] text-slate-500 text-center border-t border-slate-800/40 pt-1">
          Compliance: HIPAA Data Handling
        </div>
      </div>
    );
  }

  if (title === "Automated Testing Suite") {
    return (
      <div className="w-full h-60 bg-[#080E09] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
        <div className="flex justify-between items-center text-[9px] text-emerald-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-emerald-400">🟢 Playwright: Watch Mode</span>
          </span>
          <span className="text-[8px] bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-900/30 text-emerald-400 font-semibold">TEST ENGINE</span>
        </div>

        <div className="bg-slate-950 border border-slate-900 rounded p-2 h-28 text-[8px] text-slate-400 overflow-hidden font-mono flex flex-col justify-between">
          <div>
            <p className="text-slate-500">anas@portfolio:~$ npx playwright test</p>
            <p className="text-emerald-400 mt-1">✔ chromium/landing-page.spec.ts (1.2s)</p>
            <p className="text-emerald-400">✔ firefox/auth-flow.spec.ts (2.1s)</p>
            <p className="text-indigo-400 animate-pulse">● webkit/checkout-session.spec.ts (running...)</p>
          </div>
          <div className="text-emerald-400 font-bold border-t border-slate-900 pt-1 text-center text-[7px] flex justify-between">
            <span>Pass: 18/18</span>
            <span>Video reporting active</span>
          </div>
        </div>
      </div>
    );
  }

  if (title === "Customer E-commerce Segmentation") {
    return (
      <div className="w-full h-60 bg-[#0B050F] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
        <div className="flex justify-between items-center text-[9px] text-purple-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-emerald-400">🟢 SciKit Workspace: Loaded</span>
          </span>
          <span className="text-[8px] bg-purple-950/60 px-1.5 py-0.5 rounded border border-purple-900/30 text-purple-400 font-semibold">K-MEANS CLUSTERING</span>
        </div>

        <div className="grid grid-cols-2 gap-2 my-1">
          {/* Scatter Plot Visual Mockup */}
          <div className="border border-slate-800 rounded bg-slate-900/60 p-2 flex items-center justify-center relative h-20 overflow-hidden">
            <div className="absolute top-2 left-3 w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping"></div>
            <div className="absolute top-4 left-10 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
            <div className="absolute top-12 left-6 w-1.5 h-1.5 rounded-full bg-purple-500"></div>
            
            <div className="absolute top-6 right-5 w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
            <div className="absolute top-10 right-12 w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
            <div className="absolute top-14 right-4 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
          </div>
          <div className="bg-slate-900/95 border border-slate-800 rounded p-1.5 text-[7px] text-slate-400 flex flex-col justify-between h-20">
            <div>Clusters: K=3</div>
            <div>Silhouette Score: 0.72</div>
            <div className="text-[6px] text-purple-400 font-semibold mt-1">✓ Segmented 4,210 Customers</div>
          </div>
        </div>

        <div className="text-[8px] text-slate-500 text-center border-t border-slate-800/40 pt-1">
          Stack: Python / NumPy / Scikit-Learn
        </div>
      </div>
    );
  }

  // Fallback category visual layouts (extremely high fidelity)
  if (category === "Voice AI") {
    return (
      <div className="w-full h-60 bg-[#090D16] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
        <div className="flex justify-between items-center text-[9px] text-indigo-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-emerald-400">🟢 Agent: Connected</span>
          </span>
          <span className="text-indigo-400 font-semibold text-[8px]">VOICE PORTAL</span>
        </div>

        <div className="flex items-center justify-center gap-4 h-24">
          <div className="w-11 h-11 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.2)]">
            <Phone size={18} />
          </div>
          <div className="flex flex-col gap-0.5 text-[9px]">
            <span className="text-slate-300 font-bold">AI Call Agent</span>
            <span className="text-[8px] text-indigo-400 font-bold animate-pulse">🎙 Ready for dispatch</span>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-900 rounded p-2 text-[8px] text-slate-500 italic truncate">
          "{project.description}"
        </div>
      </div>
    );
  }

  if (category === "AI Agents & Automation") {
    return (
      <div className="w-full h-60 bg-[#0D0B14] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
        <div className="flex justify-between items-center text-[9px] text-violet-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-emerald-400">🟢 Autopilot: Running</span>
          </span>
          <span className="text-violet-400 font-semibold text-[8px]">AUTOMATION NODE</span>
        </div>

        <div className="flex justify-around items-center h-24">
          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shadow">
              <Database size={12} />
            </div>
            <span className="text-[7px] text-slate-500 mt-1">DB Event</span>
          </div>

          <div className="w-6 h-0.5 border-t border-dashed border-violet-500/30"></div>

          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-violet-950/50 border border-violet-500 flex items-center justify-center text-violet-300 animate-pulse shadow-[0_0_10px_rgba(139,92,246,0.3)]">
              <RefreshCw size={12} className="animate-spin-slow" />
            </div>
            <span className="text-[7px] text-violet-400 mt-1">Processor</span>
          </div>

          <div className="w-6 h-0.5 border-t border-dashed border-violet-500/30"></div>

          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shadow">
              <Mail size={12} />
            </div>
            <span className="text-[7px] text-slate-500 mt-1">Trigger</span>
          </div>
        </div>

        <div className="text-center text-[8px] text-slate-600 border-t border-slate-900 pt-1">
          Automated Webhook Sync Active
        </div>
      </div>
    );
  }

  if (category === "Python & Data") {
    return (
      <div className="w-full h-60 bg-[#04090A] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
        <div className="flex justify-between items-center text-[9px] text-emerald-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-emerald-400">🟢 Core: Compiled</span>
          </span>
          <span className="text-emerald-400 font-semibold text-[8px]">PYTHON STACK</span>
        </div>

        <div className="bg-slate-950 border border-slate-900 rounded p-2.5 h-28 text-[8px] text-slate-400 overflow-hidden font-mono flex flex-col justify-between">
          <div>
            <p className="text-slate-500">anas@portfolio:~$ python {title.toLowerCase().split(" ")[0]}.py</p>
            <p className="text-emerald-400 mt-1">✔ Scikit-learn workspace load success</p>
            <p className="text-indigo-400">✔ Processing dataset vectors...</p>
          </div>
          <div className="text-emerald-400 font-bold border-t border-slate-900 pt-1 text-center text-[7px]">
            ✔ Run finished successfully (0.38s)
          </div>
        </div>
      </div>
    );
  }

  // General Fallback
  return (
    <div className="w-full h-60 bg-[#111827] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
      <div className="flex justify-between items-center text-[9px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-bold text-emerald-400">🟢 Service: Online</span>
        </span>
        <span className="text-slate-400 font-semibold text-[8px]">CORE APP</span>
      </div>

      <div className="flex items-center justify-center text-slate-400 gap-1.5 h-24">
        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></div>
        <span className="text-[9px] font-bold tracking-wider uppercase truncate max-w-[150px]">{title}</span>
      </div>

      <div className="text-center text-[8px] text-slate-500 uppercase tracking-widest border-t border-slate-800/40 pt-1">
        Deployment Verified
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ["All", "SaaS Products", "AI Agents & Automation", "Voice AI", "Python & Data"];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="relative py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 dark:opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-slate-50 dark:from-slate-950 dark:via-transparent dark:to-slate-950 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Featured <span className="text-indigo-600 dark:text-indigo-400">Projects</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
            A handpicked selection of production-grade SaaS platforms, AI voice solutions, and workflow automations.
          </p>
        </div>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Grid Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={`${project.title}-${index}`} 
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.2)] hover:-translate-y-2 group flex flex-col relative animate-[fadeIn_0.5s_ease-in-out]"
            >
              {/* Top Hero Preview Area */}
              <div className="border-b border-slate-100 dark:border-slate-800/60 overflow-hidden relative">
                <ProjectPreview project={project} />
                
                {/* External Link Floating Anchor */}
                {project.link && project.link !== "#" && (
                  <a 
                    href={project.link} 
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-indigo-600 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-300 shadow-md transform hover:scale-110 z-20"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
              
              {/* Details Content Box */}
              <div className="p-6 flex-grow flex flex-col justify-between relative z-10">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  {/* Expanded 3-line description summary */}
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 min-h-[54px] sm:min-h-[64px] line-clamp-3">
                    {project.description}
                  </p>
                </div>
                
                <div>
                  {/* Tags limited to 3 with +N indicator */}
                  <div className="flex flex-wrap gap-1.5 mb-5 mt-2">
                    {project.tags.slice(0, 3).map(tag => (
                      <span 
                        key={tag} 
                        className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700 group-hover:border-indigo-200 dark:group-hover:border-indigo-900/50 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span 
                        className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/40 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 rounded border border-indigo-100 dark:border-indigo-900/50 group-hover:border-indigo-200 transition-colors"
                        title={project.tags.slice(3).join(', ')}
                      >
                        +{project.tags.length - 3} More
                      </span>
                    )}
                  </div>
                  
                  {/* Custom Styled View Project Case Study */}
                  <a 
                    href={project.link || "#"}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors group/link mt-2"
                  >
                    <span>View Project</span>
                    <span className="transform group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes flowLine {
          from { left: 0%; opacity: 0.1; }
          50% { opacity: 1; }
          to { left: 100%; opacity: 0.1; }
        }
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Projects;
