import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  Mic, 
  Volume2, 
  Radio, 
  Bot, 
  User, 
  Sliders, 
  Check, 
  RefreshCw 
} from 'lucide-react';
import { Project } from '../types';

interface VoiceAssistantVisualizerProps {
  project: Project;
}

type VisualizerStyle = 'radial-ripple' | 'energy-dome';
type AgentState = 'idle' | 'listening' | 'processing' | 'speaking';

// Dialogue scripts for the specific voice projects to make the simulation highly immersive
const PROJECT_SCRIPTS: Record<string, Array<{ sender: 'agent' | 'user'; text: string; delay: number }>> = {
  "Multilingual Real Estate Voice Agent": [
    { sender: 'agent', text: "Hello! Thank you for reaching out about our premium listings. I can help you in English, Arabic, or Hindi. What kind of property are you searching for today?", delay: 3500 },
    { sender: 'user', text: "Hi, I'm looking for a 3-bedroom apartment with a sea view in Dubai Marina. My budget is around 3.5 million AED.", delay: 4000 },
    { sender: 'agent', text: "Perfect choice! Dubai Marina has excellent yields. Let me search our active inventory... I found a stunning 3-bed layout on a high floor with an unobstructed marina view.", delay: 5000 },
    { sender: 'user', text: "That sounds perfect. Can we schedule a viewing for this Saturday afternoon?", delay: 3500 },
    { sender: 'agent', text: "Certainly! I have an open slot at 2:00 PM and 4:30 PM this Saturday. Let me sync with Cal.com... Booking view slot for Saturday at 2:00 PM. A confirmation has been sent to your email!", delay: 5500 }
  ],
  "AI Booking Voice Receptionist for Restaurants": [
    { sender: 'agent', text: "Hej! Velkommen til Restaurant Bistro d'Anas. I can assist you in Danish or English. Would you like to make a dinner reservation for tonight?", delay: 3500 },
    { sender: 'user', text: "Yes, I'd like a table for 4 people tonight around 7:30 PM under the name Sarah.", delay: 4000 },
    { sender: 'agent', text: "Just a moment while I query our live table availability... Yes, we have a lovely table in our garden pavilion available at 7:30 PM. Shall I confirm this booking for 4 guests?", delay: 4500 },
    { sender: 'user', text: "Yes, please! And could we request a high chair for a toddler?", delay: 3000 },
    { sender: 'agent', text: "Of course, Sarah! A high chair is added to your table reservation. Table booked and confirmed for tonight at 7:30 PM. Vi glæder os til at se jer!", delay: 5000 }
  ]
};

export const VoiceAssistantVisualizer: React.FC<VoiceAssistantVisualizerProps> = ({ project }) => {
  const [activeStyle, setActiveStyle] = useState<VisualizerStyle>('radial-ripple');
  const [currentState, setCurrentState] = useState<AgentState>('idle');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(65);
  const [speed, setSpeed] = useState<number>(1);
  const [dialogueIndex, setDialogueIndex] = useState<number>(0);
  const [transcript, setTranscript] = useState<Array<{ sender: 'agent' | 'user'; text: string }>>([]);
  const [micActivity, setMicActivity] = useState<number[]>([15, 20, 15, 30, 25, 40, 20, 15, 30, 15]);

  const script = PROJECT_SCRIPTS[project.title] || [
    { sender: 'agent', text: `Hello! I am your automated Voice Agent assistant for ${project.title}. How can I assist you with this project today?`, delay: 4000 },
    { sender: 'user', text: "That's amazing! Can you show me how your system operates in real-time?", delay: 3000 },
    { sender: 'agent', text: "Absolutely! I interface with Webhook APIs, CRM portals, and database models seamlessly to handle user calls and automate tasks.", delay: 5000 }
  ];

  // Simulate mic activity frequencies
  useEffect(() => {
    if (!isPlaying) {
      setMicActivity(Array(12).fill(5));
      return;
    }

    const interval = setInterval(() => {
      let multiplier = 1;
      if (currentState === 'speaking') multiplier = 4;
      else if (currentState === 'listening') multiplier = 6;
      else if (currentState === 'processing') multiplier = 2;
      else multiplier = 0.5;

      setMicActivity(
        Array.from({ length: 12 }, () => Math.max(4, Math.floor(Math.random() * 12 * multiplier + 4)))
      );
    }, 150);

    return () => clearInterval(interval);
  }, [isPlaying, currentState]);

  // Dialogue sequence player simulation
  useEffect(() => {
    if (!isPlaying) return;

    let timer: NodeJS.Timeout;
    
    const playNextDialogue = () => {
      if (dialogueIndex >= script.length) {
        // Reset dialogue when it finishes
        setDialogueIndex(0);
        setTranscript([]);
        setCurrentState('idle');
        setIsPlaying(false);
        return;
      }

      const currentItem = script[dialogueIndex];
      
      // Map item sender to state
      if (currentItem.sender === 'agent') {
        setCurrentState('speaking');
      } else {
        setCurrentState('listening');
      }

      // Add to transcript list
      setTranscript(prev => [...prev, { sender: currentItem.sender, text: currentItem.text }]);

      // Progress dialogue index after delay
      timer = setTimeout(() => {
        setDialogueIndex(prev => prev + 1);
        setCurrentState('processing');
        
        // Brief thinking pause before next dialog
        timer = setTimeout(() => {
          playNextDialogue();
        }, 1200);

      }, currentItem.delay);
    };

    playNextDialogue();

    return () => {
      clearTimeout(timer);
    };
  }, [isPlaying, dialogueIndex]);

  const togglePlayback = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setCurrentState('idle');
    } else {
      setTranscript([]);
      setDialogueIndex(0);
      setIsPlaying(true);
    }
  };

  const handleResetSimulation = () => {
    setIsPlaying(false);
    setCurrentState('idle');
    setDialogueIndex(0);
    setTranscript([]);
  };

  return (
    <div className="bg-[#070b13] border border-slate-900 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl font-sans text-slate-200">
      <div className="absolute inset-0 bg-dot-pattern opacity-5 pointer-events-none"></div>
      
      {/* Dynamic Background Glow representing the voice assistant aura */}
      <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row gap-8 items-stretch relative z-10">
        
        {/* LEFT COMPONENT: The Glowing Voice Assistant Animation Stage */}
        <div className="flex-1 bg-[#03060c] border border-slate-900/80 rounded-2xl p-6 flex flex-col justify-between items-center relative min-h-[380px] overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.3)_0%,transparent_80%)] pointer-events-none"></div>
          
          {/* Header Bar */}
          <div className="w-full flex justify-between items-center relative z-20">
            <div className="flex items-center gap-2">
              <Radio size={14} className="text-indigo-400 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-sans">
                Voice Assistant Stage
              </span>
            </div>
            
            {/* Visualizer Style Pill Toggles */}
            <div className="flex gap-1.5 bg-slate-950/80 border border-slate-900 p-1 rounded-lg">
              <button 
                onClick={() => setActiveStyle('radial-ripple')}
                className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider transition-all ${
                  activeStyle === 'radial-ripple' 
                    ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-300' 
                    : 'text-slate-500 hover:text-slate-300 border border-transparent'
                }`}
              >
                Ripple Ring
              </button>
              <button 
                onClick={() => setActiveStyle('energy-dome')}
                className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider transition-all ${
                  activeStyle === 'energy-dome' 
                    ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-300' 
                    : 'text-slate-500 hover:text-slate-300 border border-transparent'
                }`}
              >
                Aura Dome
              </button>
            </div>
          </div>

          {/* CENTRAL STAGE: ANIMATED GLOWING ASSISTANT ORB */}
          <div className="flex-grow w-full flex items-center justify-center relative my-4">
            
            {/* --- STYLE A: CONCENTRIC RADIAL RIPPLES --- */}
            {activeStyle === 'radial-ripple' && (
              <div className="relative w-72 h-72 flex items-center justify-center">
                
                {/* 1. Chromatic Edge Refraction Outer Ring */}
                <motion.div 
                  animate={{
                    scale: currentState === 'speaking' ? [1.1, 1.25, 1.1] :
                           currentState === 'listening' ? [1.15, 1.35, 1.15] :
                           currentState === 'processing' ? [1.08, 1.15, 1.08] : [1, 1.05, 1],
                    rotate: 360
                  }}
                  transition={{
                    scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 25, repeat: Infinity, ease: "linear" }
                  }}
                  className="absolute w-48 h-48 rounded-full border border-dashed border-indigo-500/20 bg-gradient-to-tr from-transparent via-indigo-500/5 to-emerald-500/10 pointer-events-none flex items-center justify-center"
                >
                  <div className="absolute top-0 left-1/4 w-3 h-3 rounded-full bg-emerald-400 blur-[2px] opacity-60"></div>
                  <div className="absolute bottom-2 right-1/4 w-2.5 h-2.5 rounded-full bg-indigo-400 blur-[2px] opacity-60"></div>
                </motion.div>

                {/* 2. Concentric Pulsing Ripples */}
                {/* Ring 3 (Outer) */}
                <motion.div 
                  animate={{
                    scale: currentState === 'idle' ? [1, 1.15, 1] :
                           currentState === 'listening' ? [1, 1.8, 1] :
                           currentState === 'speaking' ? [1, 1.6, 1] : [1, 1.3, 1],
                    opacity: currentState === 'idle' ? [0.15, 0.3, 0.15] :
                             currentState === 'listening' ? [0.2, 0.6, 0] :
                             currentState === 'speaking' ? [0.2, 0.5, 0] : [0.15, 0.4, 0.15],
                  }}
                  transition={{
                    duration: currentState === 'processing' ? 1 : 2.5,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                  className="absolute w-44 h-44 rounded-full border-2 border-indigo-500/30 bg-[radial-gradient(circle,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none"
                />

                {/* Ring 2 (Middle) */}
                <motion.div 
                  animate={{
                    scale: currentState === 'idle' ? [1, 1.08, 1] :
                           currentState === 'listening' ? [1, 1.5, 1] :
                           currentState === 'speaking' ? [1, 1.35, 1] : [1, 1.2, 1],
                    opacity: currentState === 'idle' ? [0.25, 0.45, 0.25] :
                             currentState === 'listening' ? [0.3, 0.8, 0] :
                             currentState === 'speaking' ? [0.3, 0.7, 0] : [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: currentState === 'processing' ? 0.8 : 2.0,
                    delay: 0.4,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                  className="absolute w-32 h-32 rounded-full border border-blue-500/40 bg-[radial-gradient(circle,rgba(59,130,246,0.12)_0%,transparent_60%)] pointer-events-none"
                />

                {/* Ring 1 (Inner) */}
                <motion.div 
                  animate={{
                    scale: currentState === 'idle' ? [1, 1.05, 1] :
                           currentState === 'listening' ? [1, 1.25, 1] :
                           currentState === 'speaking' ? [1, 1.18, 1] : [1, 1.1, 1],
                    opacity: currentState === 'idle' ? [0.4, 0.6, 0.4] :
                             currentState === 'listening' ? [0.5, 0.9, 0.1] :
                             currentState === 'speaking' ? [0.4, 0.8, 0.1] : [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: currentState === 'processing' ? 0.6 : 1.6,
                    delay: 0.8,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                  className="absolute w-24 h-24 rounded-full border border-emerald-400/50 bg-[radial-gradient(circle,rgba(16,185,129,0.15)_0%,transparent_50%)] pointer-events-none"
                />

                {/* 3. Central Solid Core Globe with Chromatic Edge Halo */}
                <motion.div 
                  animate={{
                    scale: currentState === 'idle' ? [1, 1.03, 1] :
                           currentState === 'listening' ? [1, 1.12, 1] :
                           currentState === 'speaking' ? [1, 1.08, 1] : [1, 1.05, 1],
                    boxShadow: currentState === 'listening' 
                      ? '0 0 35px rgba(99,102,241,0.5), inset 0 0 15px rgba(59,130,246,0.5)' 
                      : currentState === 'speaking' 
                      ? '0 0 30px rgba(16,185,129,0.45), inset 0 0 15px rgba(99,102,241,0.4)' 
                      : currentState === 'processing'
                      ? '0 0 25px rgba(139,92,246,0.4), inset 0 0 10px rgba(139,92,246,0.3)'
                      : '0 0 20px rgba(99,102,241,0.25), inset 0 0 8px rgba(99,102,241,0.15)'
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute w-18 h-18 rounded-full bg-slate-950 border border-indigo-500/50 flex items-center justify-center pointer-events-none relative overflow-hidden"
                >
                  {/* Internal aura liquid */}
                  <div className="absolute inset-0.5 rounded-full bg-gradient-to-tr from-indigo-950 via-slate-950 to-indigo-900 opacity-90"></div>
                  
                  {/* Small core pulsing light source */}
                  <motion.div 
                    animate={{
                      scale: currentState === 'idle' ? [0.9, 1.1, 0.9] : [0.8, 1.3, 0.8],
                      opacity: [0.5, 0.9, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute w-10 h-10 rounded-full bg-indigo-500/20 blur-[6px] relative z-10"
                  />
                  <Mic size={18} className="text-indigo-400 relative z-20" />
                </motion.div>
                
                {/* Floating Micro Indicator Pill */}
                <div className="absolute bottom-6 bg-slate-950/90 border border-slate-900 rounded-full px-2.5 py-1 flex items-center gap-1.5 shadow-lg">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    currentState === 'speaking' ? 'bg-emerald-400 animate-pulse' :
                    currentState === 'listening' ? 'bg-indigo-400 animate-pulse' :
                    currentState === 'processing' ? 'bg-violet-400 animate-spin' :
                    'bg-slate-600'
                  }`}></span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest font-sans">
                    {currentState}
                  </span>
                </div>
              </div>
            )}

            {/* --- STYLE B: DIMENSIONAL ORBITAL ENERGY DOME --- */}
            {activeStyle === 'energy-dome' && (
              <div className="relative w-72 h-72 flex items-center justify-center">
                
                {/* Outer halo boundary */}
                <div className="absolute w-60 h-40 rounded-full bg-indigo-950/5 border border-indigo-900/10 blur-[1px]"></div>

                {/* Layered Crescent Arcs Overlapping (Siri / Gemini Dome style) */}
                {/* Layer 1 (Indigo Core, horizontal skew) */}
                <motion.div 
                  animate={{
                    scaleX: currentState === 'speaking' ? [1.1, 1.2, 1.1] :
                             currentState === 'listening' ? [1.25, 1.45, 1.25] : [1.15, 1.22, 1.15],
                    scaleY: currentState === 'speaking' ? [0.85, 0.95, 0.85] :
                             currentState === 'listening' ? [1.05, 1.25, 1.05] : [0.9, 0.96, 0.9],
                    rotate: [0, 4, -4, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-44 h-28 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.25)_0%,rgba(99,102,241,0.05)_60%,transparent_100%)] border-t border-indigo-400/40 blur-[4px]"
                />

                {/* Layer 2 (Blue Core, tilted skew) */}
                <motion.div 
                  animate={{
                    scaleX: currentState === 'speaking' ? [1, 1.15, 1] :
                             currentState === 'listening' ? [1.1, 1.35, 1.1] : [1.05, 1.1, 1.05],
                    scaleY: currentState === 'speaking' ? [0.7, 0.85, 0.7] :
                             currentState === 'listening' ? [0.9, 1.1, 0.9] : [0.75, 0.82, 0.75],
                    rotate: [20, 15, 25, 20]
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-40 h-24 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.25)_0%,rgba(59,130,246,0.05)_60%,transparent_100%)] border-t border-blue-400/40 blur-[3px]"
                />

                {/* Layer 3 (Emerald Refraction, opposite tilted skew) */}
                <motion.div 
                  animate={{
                    scaleX: currentState === 'speaking' ? [0.95, 1.1, 0.95] :
                             currentState === 'listening' ? [1.15, 1.3, 1.15] : [1.02, 1.08, 1.02],
                    scaleY: currentState === 'speaking' ? [0.6, 0.75, 0.6] :
                             currentState === 'listening' ? [0.8, 1.0, 0.8] : [0.65, 0.72, 0.65],
                    rotate: [-15, -20, -10, -15]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-36 h-20 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.2)_0%,rgba(16,185,129,0.03)_60%,transparent_100%)] border-t border-emerald-400/40 blur-[2px]"
                />

                {/* Layer 4 (Chromatic Violet, fast breathing core) */}
                <motion.div 
                  animate={{
                    scaleX: currentState === 'speaking' ? [0.85, 1.05, 0.85] :
                             currentState === 'listening' ? [1.0, 1.25, 1.0] : [0.95, 1.0, 0.95],
                    scaleY: currentState === 'speaking' ? [0.45, 0.65, 0.45] :
                             currentState === 'listening' ? [0.7, 0.95, 0.7] : [0.5, 0.58, 0.5],
                    rotate: [5, -5, 5]
                  }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-32 h-16 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.25)_0%,transparent_70%)] border-t border-violet-400/50 blur-[1px]"
                />

                {/* Floating core visualizer sphere */}
                <motion.div 
                  animate={{
                    y: currentState === 'speaking' ? [0, -4, 4, 0] : [0, -2, 2, 0],
                    scale: currentState === 'listening' ? 1.08 : 1
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-12 h-12 bg-slate-950 rounded-full border border-slate-900/60 flex items-center justify-center relative shadow-2xl overflow-hidden"
                >
                  <div className="absolute inset-0.5 rounded-full bg-gradient-to-tr from-indigo-950 via-slate-950 to-indigo-900"></div>
                  <Volume2 size={13} className="text-indigo-400 relative z-10" />
                </motion.div>

                {/* Floating Micro Indicator Pill */}
                <div className="absolute bottom-6 bg-slate-950/90 border border-slate-900 rounded-full px-2.5 py-1 flex items-center gap-1.5 shadow-lg">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    currentState === 'speaking' ? 'bg-emerald-400 animate-pulse' :
                    currentState === 'listening' ? 'bg-indigo-400 animate-pulse' :
                    currentState === 'processing' ? 'bg-violet-400 animate-spin' :
                    'bg-slate-600'
                  }`}></span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest font-sans">
                    {currentState}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Sound Wave Frequency Visualizer Strip (Bottom of left container) */}
          <div className="w-full bg-slate-950/60 border border-slate-900 rounded-xl p-3 flex flex-col gap-2">
            <div className="flex justify-between items-center text-[8.5px] font-mono text-slate-500 font-bold uppercase tracking-wider">
              <span>Frequency Spectrum</span>
              <span className="text-indigo-400">{isPlaying ? 'Active Input' : 'Idle Sync'}</span>
            </div>
            
            {/* Wave Bars */}
            <div className="h-8 flex items-end justify-center gap-1">
              {micActivity.map((height, idx) => (
                <motion.div
                  key={idx}
                  animate={{ height: `${height * 100 / 70}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  style={{ height: '10%' }}
                  className={`w-1.5 rounded-full ${
                    currentState === 'speaking' ? 'bg-emerald-500' :
                    currentState === 'listening' ? 'bg-indigo-500' :
                    currentState === 'processing' ? 'bg-violet-500' :
                    'bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COMPONENT: Interactive Sandbox Simulation Dialogue & Controls */}
        <div className="flex-1 flex flex-col justify-between gap-6">
          
          {/* Dialogue Monitor Card */}
          <div className="bg-[#03060c] border border-slate-900/80 rounded-2xl p-5 sm:p-6 flex-grow flex flex-col justify-between min-h-[240px]">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">
                  Interactive Transcript Monitor
                </span>
                <span className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-widest bg-slate-950 px-2 py-0.5 rounded border border-slate-900">
                  Call Session Live
                </span>
              </div>

              {/* Dialogue History Stream */}
              <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-900">
                {transcript.length === 0 ? (
                  <div className="h-32 flex flex-col items-center justify-center text-center p-4">
                    <Bot size={24} className="text-slate-600 mb-2" />
                    <h5 className="text-xs font-bold text-slate-400">Simulation Is Ready to Run</h5>
                    <p className="text-[10px] text-slate-500 mt-1 max-w-[240px]">
                      Click "Start Voice Call" below to simulate an incoming webhook call flow with Anas's optimized Voice Agent.
                    </p>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {transcript.map((msg, index) => {
                      const isAgent = msg.sender === 'agent';
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 18 }}
                          className={`flex gap-3 items-start ${isAgent ? 'justify-start' : 'justify-end'}`}
                        >
                          {isAgent && (
                            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 shadow-md">
                              <Bot size={13} />
                            </div>
                          )}
                          
                          <div className={`max-w-[80%] rounded-xl p-3 text-xs leading-relaxed font-sans ${
                            isAgent 
                              ? 'bg-slate-900/80 border border-slate-850 text-slate-200' 
                              : 'bg-indigo-950/70 border border-indigo-900/30 text-indigo-100'
                          }`}>
                            <div className="text-[8px] font-bold uppercase tracking-widest text-slate-500 mb-1 flex items-center gap-1 font-sans">
                              {isAgent ? (
                                <>
                                  <Bot size={8} className="text-indigo-400" />
                                  <span>AI Receptionist</span>
                                </>
                              ) : (
                                <>
                                  <User size={8} className="text-indigo-400" />
                                  <span>Lead Prospect</span>
                                </>
                              )}
                            </div>
                            <p>{msg.text}</p>
                          </div>

                          {!isAgent && (
                            <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-900 text-indigo-300 flex items-center justify-center shrink-0 shadow-md">
                              <User size={13} />
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                )}
              </div>
            </div>

            {/* Simulated webhook indicators on bottom */}
            {transcript.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-900 flex justify-between items-center text-[9px] text-slate-500 font-mono">
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  API Handshake OK
                </span>
                <span>Active Dialogue Node: {dialogueIndex} / {script.length}</span>
              </div>
            )}
          </div>

          {/* Assistant Action Control Panel */}
          <div className="bg-[#03060c]/50 border border-slate-900 rounded-2xl p-5 flex flex-col gap-4 font-sans">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-sans block">
              Simulation Console & Controls
            </span>

            {/* Play controls */}
            <div className="flex gap-3 flex-wrap items-center">
              <button
                onClick={togglePlayback}
                className={`flex-grow sm:flex-grow-0 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  isPlaying 
                    ? 'bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-900/40 shadow-lg' 
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/10 transform hover:-translate-y-0.5'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause size={14} fill="currentColor" />
                    <span>Pause Call</span>
                  </>
                ) : (
                  <>
                    <Play size={14} fill="currentColor" />
                    <span>Start Voice Call</span>
                  </>
                )}
              </button>

              <button
                onClick={handleResetSimulation}
                className="px-3.5 py-2.5 bg-slate-950 border border-slate-900 text-slate-400 hover:text-slate-200 hover:border-slate-800 transition-all rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                title="Reset simulation parameters and script"
              >
                <RefreshCw size={13} />
                <span>Reset</span>
              </button>
            </div>

            {/* Sliders and Toggles for Testing States manually (only if NOT playing) */}
            <div className="border-t border-slate-900 pt-3 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sliders size={11} className="text-slate-500" />
                  Manual State Interceptor
                </span>
                {isPlaying && (
                  <span className="text-[8.5px] font-bold font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-900">
                    Auto Active
                  </span>
                )}
              </div>

              {/* State pills */}
              <div className="grid grid-cols-4 gap-1.5">
                {(['idle', 'listening', 'processing', 'speaking'] as AgentState[]).map((state) => {
                  const labelColors: Record<AgentState, string> = {
                    idle: 'hover:border-slate-800 text-slate-400 border-slate-900 bg-slate-950/20',
                    listening: 'hover:border-indigo-500/20 text-indigo-400 border-indigo-950/20 bg-indigo-950/10',
                    processing: 'hover:border-violet-500/20 text-violet-400 border-violet-950/20 bg-violet-950/10',
                    speaking: 'hover:border-emerald-500/20 text-emerald-400 border-emerald-950/20 bg-emerald-950/10'
                  };
                  const activeColors: Record<AgentState, string> = {
                    idle: 'border-slate-600 text-slate-200 bg-slate-900 font-bold',
                    listening: 'border-indigo-500 text-indigo-300 bg-indigo-950/40 shadow-[0_0_10px_rgba(99,102,241,0.15)] font-bold',
                    processing: 'border-violet-500 text-violet-300 bg-violet-950/40 shadow-[0_0_10px_rgba(139,92,246,0.15)] font-bold',
                    speaking: 'border-emerald-500 text-emerald-300 bg-emerald-950/40 shadow-[0_0_10px_rgba(16,185,129,0.15)] font-bold'
                  };

                  return (
                    <button
                      key={state}
                      disabled={isPlaying}
                      onClick={() => setCurrentState(state)}
                      className={`py-1.5 px-1 rounded-lg border text-[9px] uppercase tracking-wider text-center transition-all ${
                        isPlaying ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                      } ${currentState === state ? activeColors[state] : labelColors[state]}`}
                    >
                      {state}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
