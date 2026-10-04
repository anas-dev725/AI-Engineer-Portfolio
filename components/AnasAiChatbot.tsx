import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Send,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ArrowRight,
  Download,
  Calendar,
  RefreshCw,
  ChevronDown,
  Mail,
  User,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Custom Friendly AI Assistant Avatar Component with Eye Tracking, Blinking & Winking
interface AiAvatarProps {
  size?: number;
  className?: string;
  eyeOffset?: { x: number; y: number };
  isBlinking?: boolean;
  isWinking?: boolean;
}

const AiAvatar: React.FC<AiAvatarProps> = ({
  size = 28,
  className = '',
  eyeOffset = { x: 0, y: 0 },
  isBlinking = false,
  isWinking = false,
}) => {
  const ox = Math.max(-2.6, Math.min(2.6, eyeOffset.x));
  const oy = Math.max(-2.0, Math.min(2.0, eyeOffset.y));

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <linearGradient id="aiAvatarHead" x1="6" y1="8" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F46E5" />
          <stop offset="0.6" stopColor="#3730A3" />
          <stop offset="1" stopColor="#1E1B4B" />
        </linearGradient>
        <linearGradient id="aiAvatarVisor" x1="12" y1="16" x2="36" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0B0F19" />
          <stop offset="1" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="aiEyeGlow" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#38BDF8" />
          <stop offset="1" stopColor="#818CF8" />
        </linearGradient>
        <filter id="eyeSoftGlow" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="1.2" result="glow" />
          <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>
      </defs>

      {/* Top Antenna Node */}
      <circle cx="24" cy="5.5" r="2.5" fill="#818CF8" />
      <path d="M24 8V12" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />

      {/* Side Audio Nodes */}
      <rect x="3.5" y="21" width="3.5" height="10" rx="1.75" fill="#6366F1" />
      <rect x="41" y="21" width="3.5" height="10" rx="1.75" fill="#6366F1" />

      {/* Outer Head Body */}
      <rect x="7" y="11" width="34" height="30" rx="13" fill="url(#aiAvatarHead)" stroke="#6366F1" strokeWidth="1" />

      {/* Dark Glass Visor */}
      <rect x="11.5" y="16.5" width="25" height="19" rx="8.5" fill="url(#aiAvatarVisor)" stroke="#312E81" strokeWidth="1" />

      {/* Expressive Friendly Digital Eyes with Tracking & Blinking/Winking */}
      <g filter="url(#eyeSoftGlow)">
        {/* Left Eye */}
        {isBlinking ? (
          <line
            x1={16 + ox}
            y1={25 + oy}
            x2={22 + ox}
            y2={25 + oy}
            stroke="#38BDF8"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        ) : (
          <g style={{ transform: `translate(${ox}px, ${oy}px)`, transition: 'transform 80ms ease-out' }}>
            <ellipse cx="19" cy="25" rx="3.2" ry="3.8" fill="url(#aiEyeGlow)" />
            <circle cx="20.2" cy="23.8" r="1.1" fill="#FFFFFF" />
          </g>
        )}

        {/* Right Eye (supports playful wink ^_~) */}
        {isBlinking ? (
          <line
            x1={26 + ox}
            y1={25 + oy}
            x2={32 + ox}
            y2={25 + oy}
            stroke="#38BDF8"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        ) : isWinking ? (
          /* Playful wink crescent */
          <path
            d={`M${26.5 + ox} ${25.5 + oy} Q${29 + ox} ${22.5 + oy} ${31.5 + ox} ${25.5 + oy}`}
            stroke="#38BDF8"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          <g style={{ transform: `translate(${ox}px, ${oy}px)`, transition: 'transform 80ms ease-out' }}>
            <ellipse cx="29" cy="25" rx="3.2" ry="3.8" fill="url(#aiEyeGlow)" />
            <circle cx="30.2" cy="23.8" r="1.1" fill="#FFFFFF" />
          </g>
        )}
      </g>

      {/* Friendly subtle smile (reacts to wink) */}
      {isWinking ? (
        <path
          d={`M${21.5 + ox * 0.3} ${29.5 + oy * 0.3} Q${24 + ox * 0.3} ${32.5 + oy * 0.3} ${26.5 + ox * 0.3} ${29.5 + oy * 0.3}`}
          stroke="#38BDF8"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
      ) : (
        <path
          d={`M${22 + ox * 0.3} ${30.5 + oy * 0.3} C${23.2 + ox * 0.3} ${31.8 + oy * 0.3} ${24.8 + ox * 0.3} ${31.8 + oy * 0.3} ${26 + ox * 0.3} ${30.5 + oy * 0.3}`}
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      )}
    </svg>
  );
};

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  showChips?: boolean;
  cardType?: 'audio' | 'project' | 'resume' | 'sparring' | 'contact';
  projectData?: {
    title: string;
    description: string;
    tags: string[];
    slug?: string;
    metric?: string;
  };
}

export const AnasAiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const dragDistanceAccumulatorRef = useRef(0);
  const [isNearTop, setIsNearTop] = useState(false);
  const [isNearLeft, setIsNearLeft] = useState(false);

  // Bot Eye Tracking & Expression State
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isWinking, setIsWinking] = useState(false);

  // Lifelike periodic idle blink every ~4.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isWinking) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 160);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isWinking]);

  // Full-viewport drag freedom with zero blockage
  const [dragBounds, setDragBounds] = useState({
    left: -1200,
    right: 20,
    top: -900,
    bottom: 20,
  });

  useEffect(() => {
    const updateBounds = () => {
      if (typeof window === 'undefined') return;
      const widgetSize = 56;
      const margin = 16;
      setDragBounds({
        left: -(window.innerWidth - widgetSize - margin * 2),
        right: margin,
        top: -(window.innerHeight - widgetSize - margin * 2),
        bottom: margin,
      });
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  // Playful, tactile WebAudio sound feedback synthesizer
  const playSound = (type: 'pop' | 'sent' | 'open' | 'close' | 'grab' | 'drag_tick' | 'click') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;

      if (type === 'click') {
        // Crisp tactile micro-click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(820, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.04);
        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.045);
      } else if (type === 'grab') {
        // Soft tactile pickup bubble
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(460, now + 0.055);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === 'drag_tick') {
        // Ultra-subtle haptic tick while dragging
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(620, now);
        osc.frequency.exponentialRampToValueAtTime(480, now + 0.025);
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.025);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.03);
      } else if (type === 'pop') {
        // Cheerful pop bubble on drop or reaction
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.exponentialRampToValueAtTime(980, now + 0.09);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.095);
      } else if (type === 'open') {
        // Warm dual-tone upward welcome chime (C5 -> G5)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(523.25, now); // C5
        osc1.frequency.setValueAtTime(523.25, now + 0.04);
        osc2.frequency.setValueAtTime(783.99, now + 0.04); // G5
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.06);
        osc2.start(now + 0.04);
        osc2.stop(now + 0.16);
      } else if (type === 'close') {
        // Gentle downward dismissal chime
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(580, now);
        osc.frequency.exponentialRampToValueAtTime(340, now + 0.09);
        gain.gain.setValueAtTime(0.025, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.095);
      } else if (type === 'sent') {
        // Message sent swoop
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(460, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.085);
      }
    } catch {
      // Audio fallback
    }
  };

  const initialGreeting: ChatMessage = {
    id: 'msg-init',
    sender: 'bot',
    text: "Hey! 👋 I'm Anas's digital twin. Ask me anything about his projects, voice AI agents, or how he helps teams automate away repetitive work.",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    showChips: true,
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Audio progress tracker
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setAudioProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlayingAudio(false);
      setAudioProgress(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Close or minimize when user clicks outside the chatbot UI or hits Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!isOpen) return;
      if (chatContainerRef.current && !chatContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (isPlayingAudio && audioRef.current) {
          audioRef.current.pause();
          setIsPlayingAudio(false);
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleCloseChat();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isPlayingAudio]);

  const toggleAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio('/audio/restaurant-voice.wav');
      audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
          setAudioProgress((audio.currentTime / audio.duration) * 100);
        }
      });
      audio.addEventListener('ended', () => {
        setIsPlayingAudio(false);
        setAudioProgress(0);
      });
      audioRef.current = audio;
    }
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().catch(e => console.log('Audio playback prevented', e));
      setIsPlayingAudio(true);
    }
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setShowTooltip(false);
    playSound('open');
    setTimeout(() => inputRef.current?.focus(), 150);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
    playSound('close');
    if (isPlayingAudio && audioRef.current) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    }
  };

  const handleDragStart = () => {
    isDraggingRef.current = true;
    dragDistanceAccumulatorRef.current = 0;
    setShowTooltip(false);
    playSound('grab');
  };

  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: { delta: { x: number; y: number } }) => {
    if (info && info.delta) {
      // Look dynamically toward the drag movement direction
      const dx = Math.max(-2.6, Math.min(2.6, info.delta.x * 0.45));
      const dy = Math.max(-2.0, Math.min(2.0, info.delta.y * 0.45));
      setEyeOffset({ x: dx, y: dy });

      // Subtle haptic acoustic tick when dragged across distance
      const distance = Math.sqrt(info.delta.x * info.delta.x + info.delta.y * info.delta.y);
      dragDistanceAccumulatorRef.current += distance;
      if (dragDistanceAccumulatorRef.current > 160) {
        playSound('drag_tick');
        dragDistanceAccumulatorRef.current = 0;
      }
    }
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: { point: { x: number; y: number } }) => {
    if (info && info.point) {
      if (typeof window !== 'undefined') {
        setIsNearTop(info.point.y < window.innerHeight * 0.45);
        setIsNearLeft(info.point.x < window.innerWidth * 0.45);
      }
    }

    // Reset eye direction smoothly
    setEyeOffset({ x: 0, y: 0 });

    // Playful wink (^_~) when dropped!
    setIsWinking(true);
    playSound('pop');
    setTimeout(() => {
      setIsWinking(false);
    }, 850);

    setTimeout(() => {
      isDraggingRef.current = false;
    }, 120);
  };

  const handleLauncherClick = () => {
    if (isDraggingRef.current) return;
    playSound('click');
    handleOpenChat();
  };

  const handleResetChat = () => {
    if (isPlayingAudio && audioRef.current) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    }
    setMessages([
      {
        ...initialGreeting,
        id: `msg-reset-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
    playSound('open');
  };

  // Preset action triggers
  const handlePresetAction = (type: 'coolest_work' | 'voice_ai' | 'idea_sparring' | 'hire') => {
    if (type === 'voice_ai') {
      sendUserMessage("Let's hear your Voice AI in action!");
    } else if (type === 'coolest_work') {
      sendUserMessage("Show me your coolest automation projects!");
    } else if (type === 'idea_sparring') {
      sendUserMessage("I have an automation idea, can you help me brainstorm?");
    } else if (type === 'hire') {
      sendUserMessage("How do I hire Anas or work together?");
    }
  };

  // Smart local handler with rich UI cards + Gemini endpoint
  const processMessage = async (userText: string) => {
    const textLower = userText.toLowerCase().trim();

    // 1. PRIORITY 1: Hire / Contact / Collaborate Intent
    const isHireIntent =
      textLower.includes('hire') ||
      textLower.includes('work together') ||
      textLower.includes('collaborate') ||
      textLower.includes('partnership') ||
      textLower.includes('contract') ||
      textLower.includes('rate') ||
      textLower.includes('pricing') ||
      textLower.includes('cost') ||
      textLower.includes('book a call') ||
      textLower.includes('calendly') ||
      textLower.includes('reach out') ||
      textLower.includes('email anas') ||
      textLower.includes('freelance');

    if (isHireIntent) {
      return {
        reply: "Anas is open for select contracts, partnerships, and high-impact automation builds! 🤝 He works with clients across the US, UK, and Europe from Pakistan (UTC+5). Reach out directly below:",
        cardType: 'contact' as const,
      };
    }

    // 2. Voice AI demo intent
    const isVoiceIntent =
      textLower.includes('voice') ||
      textLower.includes('audio') ||
      textLower.includes('listen') ||
      textLower.includes('hear') ||
      textLower.includes('speech') ||
      textLower.includes('call') ||
      textLower.includes('restaurant') ||
      textLower.includes('telephon');

    if (isVoiceIntent) {
      return {
        reply: "Here is real production Voice AI in action! 🎙️ Anas builds sub-600ms telephony agents with Retell AI, Twilio, and ElevenLabs. Listen to this live restaurant reservation and order desk agent:",
        cardType: 'audio' as const,
      };
    }

    // 3. Projects & cool work intent
    const isProjectIntent =
      textLower.includes('project') ||
      textLower.includes('case study') ||
      textLower.includes('coolest') ||
      textLower.includes('recruitment ad') ||
      textLower.includes('hisaab') ||
      textLower.includes('portfolio') ||
      textLower.includes('show me your work') ||
      textLower.includes('what have you built');

    if (isProjectIntent) {
      return {
        reply: "Check out the Automated Recruitment Ad Engine! ⚡ It eliminates 6+ hours of manual ad creation by turning job briefs into 3 targeted angles with GPT-4o, drafting copy into Airtable, and tracking live Meta ad performance.",
        cardType: 'project' as const,
        projectData: {
          title: "Automated Recruitment Ad Engine",
          description: "Production n8n architecture linking Airtable, OpenAI GPT-4o, and Meta Graph API with automated reporting.",
          tags: ["n8n", "Airtable", "GPT-4o", "Meta API", "Custom Nodes"],
          slug: "automated-recruitment-ad-engine",
          metric: "Saves 84 hrs/month • 99.2% uptime",
        }
      };
    }

    // 4. Resume / CV intent
    if (textLower.includes('resume') || textLower.includes('cv') || textLower.includes('download resume')) {
      return {
        reply: "Here is Muhammad Anas's official resume! 📄 It covers his production n8n workflows, Voice AI architectures, and technical stack:",
        cardType: 'resume' as const,
      };
    }

    // 5. Brainstorming / Idea sparring intent
    if (textLower.includes('brainstorm') || textLower.includes('idea') || textLower.includes('automate my') || textLower.includes('consult')) {
      return {
        reply: "Let's map it out! 💡 What manual bottleneck is costing your team the most time right now?",
        cardType: 'sparring' as const,
      };
    }

    // 6. Natural conversational questions (Greetings, How are you doing, etc.)
    try {
      const historyPayload: Array<{ role: string; content: string }> = [];
      for (const m of messages) {
        if (m.id === 'msg-init') continue;
        historyPayload.push({
          role: m.sender === 'user' ? 'user' : 'model',
          content: m.text,
        });
      }

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historyPayload.slice(-6),
          userMessage: userText,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          return { reply: data.reply };
        }
      }
    } catch (e) {
      console.log('Gemini chat request error:', e);
    }

    // 7. Context-Aware Natural Fallback for Common Questions
    if (textLower.includes('how are you') || textLower.includes('how r u') || textLower.includes('how are you doing') || textLower.includes("how's it going")) {
      return {
        reply: "Doing great, thanks for asking! 🚀 Anas is busy crafting n8n workflows and Voice AI systems right now. How is your day going? What can I help you explore today?",
      };
    }

    if (textLower.includes('hi') || textLower.includes('hello') || textLower.includes('hey') || textLower.includes('whats up')) {
      return {
        reply: "Hey there! 👋 Great to meet you. Looking to automate manual business processes, test a voice agent, or explore Anas's work? I'm all ears!",
      };
    }

    if (textLower.includes('who are you') || textLower.includes('what are you') || textLower.includes('what can you do')) {
      return {
        reply: "I'm Anas's digital twin! 🤖 I know his projects, workflow architectures, and how he automates complex operations with n8n and AI APIs. Ask me anything!",
      };
    }

    return {
      reply: "Anas is an AI Automation Developer and Voice AI Specialist who builds production systems with n8n, Retell AI, and custom APIs. Want to hear a voice demo, see a project, or talk about working together?",
      cardType: 'contact' as const,
    };
  };

  const sendUserMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);
    playSound('sent');

    try {
      // Natural thinking delay
      await new Promise(r => setTimeout(r, 400));
      const res = await processMessage(text.trim());

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cardType: res.cardType,
        projectData: res.projectData,
      };

      setMessages(prev => [...prev, botMsg]);
      playSound('pop');
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: "I'm right here! Feel free to ask about Anas's projects, voice AI demos, or reach out to him at anasmobin0@gmail.com! ✨",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendUserMessage(inputMessage);
  };

  // Helper to format text without hashtags or asterisks
  const renderFormattedText = (rawText: string) => {
    // Strip out any markdown headers (#, ##, ###) and asterisks (*, **)
    const clean = rawText
      .replace(/^#+\s*/gm, '')
      .replace(/#/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '');

    return clean.split('\n').map((line, lineIdx) => (
      <span key={lineIdx} className="block min-h-[1.2rem]">
        {line}
      </span>
    ));
  };

  return (
    <motion.div
      ref={chatContainerRef}
      drag={!isOpen}
      dragConstraints={dragBounds}
      dragElastic={0.15}
      dragMomentum={true}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      className="fixed bottom-5 right-5 z-50 font-sans antialiased touch-none"
    >
      {/* Floating Prompt Tooltip Pill with Smooth Animation */}
      <AnimatePresence>
        {!isOpen && showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: isNearTop ? -10 : 10, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isNearTop ? -6 : 6, scale: 0.94 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={`absolute mb-2 flex items-center gap-2.5 bg-slate-900/95 text-slate-200 border border-slate-700/60 rounded-full px-4 py-2 shadow-2xl backdrop-blur-md cursor-pointer group whitespace-nowrap select-none ${
              isNearTop ? 'top-16 right-0' : 'bottom-16 right-0'
            }`}
          >
            <div onClick={handleLauncherClick} className="flex items-center gap-2 text-xs font-medium whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span>Talk to Anas's Digital Twin</span>
              <span className="text-[10px] text-indigo-400 font-normal">✨ Drag me!</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-slate-400 hover:text-white p-0.5 rounded-full transition-colors ml-1"
              aria-label="Dismiss message"
            >
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clean Transition between Launcher and Chat Panel with mode="wait" to prevent layout shift */}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="bot-launcher"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="relative cursor-grab active:cursor-grabbing"
          >
            {/* Ambient Pulse Glow Aura */}
            <motion.div
              className="absolute -inset-1 rounded-2xl bg-indigo-500/30 blur-md pointer-events-none"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.25, 0.6, 0.25],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Launcher Button */}
            <motion.button
              onClick={handleLauncherClick}
              onMouseEnter={() => {
                if (!isDraggingRef.current) setEyeOffset({ x: 0, y: -1.2 });
              }}
              onMouseLeave={() => {
                if (!isDraggingRef.current) setEyeOffset({ x: 0, y: 0 });
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700/70 hover:border-indigo-500/70 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)] transition-colors focus:outline-none cursor-grab active:cursor-grabbing select-none"
              aria-label="Open Anas's Digital Twin (Drag to move)"
              title="Click to chat • Drag to move anywhere!"
            >
              <AiAvatar
                size={34}
                eyeOffset={eyeOffset}
                isBlinking={isBlinking}
                isWinking={isWinking}
              />

              {/* Emerald Online Status Dot with Pulse */}
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 shadow flex items-center justify-center pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="bot-chat-panel"
            initial={{ opacity: 0, scale: 0.93, y: isNearTop ? -16 : 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: isNearTop ? -16 : 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 360, mass: 0.8 }}
            className={`flex flex-col bg-slate-950/95 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden ${
              isNearTop ? 'origin-top' : 'origin-bottom'
            } ${
              isNearLeft ? 'origin-left' : 'origin-right'
            } ${
              isMinimized
                ? 'w-64 h-12'
                : 'w-[calc(100vw-2rem)] sm:w-[350px] h-[480px] max-h-[82vh]'
            }`}
            style={isNearTop ? { position: 'absolute', top: 0, right: 0 } : {}}
          >
            {/* Header */}
            <div className="px-3.5 py-2.5 bg-slate-900/80 border-b border-slate-800/70 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <AiAvatar
                  size={24}
                  eyeOffset={eyeOffset}
                  isBlinking={isBlinking}
                  isWinking={isWinking}
                />
                <div className="truncate">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-semibold text-white tracking-wide truncate">
                      Anas AI
                    </h3>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  </div>
                  <p className="text-[10px] text-slate-400 truncate">
                    Anas's Digital Twin
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-0.5 text-slate-400">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  title={soundEnabled ? "Mute sounds" : "Enable sounds"}
                  className="p-1 rounded-md hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  {soundEnabled ? <Volume2 size={13} className="text-indigo-400" /> : <VolumeX size={13} />}
                </button>

                <button
                  onClick={() => {
                    setIsMinimized(!isMinimized);
                    playSound('click');
                  }}
                  title={isMinimized ? "Expand" : "Minimize"}
                  className="p-1 rounded-md hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  <ChevronDown size={14} className={`transform transition-transform ${isMinimized ? 'rotate-180' : ''}`} />
                </button>

                <button
                  onClick={handleCloseChat}
                  title="Close chat"
                  className="p-1 rounded-md hover:text-white hover:bg-slate-800/80 hover:text-red-400 transition-colors ml-0.5"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Chat Body (when expanded) */}
            {!isMinimized && (
              <>
                {/* Messages Container */}
                <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs text-slate-200">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className={`flex flex-col ${
                        msg.sender === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div className="flex items-end gap-1.5 max-w-[92%]">
                        {msg.sender === 'bot' && (
                          <div className="shrink-0 mb-0.5">
                            <AiAvatar size={20} />
                          </div>
                        )}

                        <div
                          className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-indigo-600 text-white rounded-br-sm shadow-sm'
                              : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-sm'
                          }`}
                        >
                          {renderFormattedText(msg.text)}

                          {/* Inline Clean Quick Chips */}
                          {msg.showChips && (
                            <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                              <button
                                onClick={() => handlePresetAction('coolest_work')}
                                className="px-2.5 py-1 rounded-full bg-slate-800/70 hover:bg-indigo-600/30 text-slate-300 hover:text-white border border-slate-700/50 hover:border-indigo-500/50 transition-all text-[10px] font-medium"
                              >
                                Coolest Project
                              </button>
                              <button
                                onClick={() => handlePresetAction('voice_ai')}
                                className="px-2.5 py-1 rounded-full bg-slate-800/70 hover:bg-indigo-600/30 text-slate-300 hover:text-white border border-slate-700/50 hover:border-indigo-500/50 transition-all text-[10px] font-medium"
                              >
                                Voice AI Demo
                              </button>
                              <button
                                onClick={() => handlePresetAction('idea_sparring')}
                                className="px-2.5 py-1 rounded-full bg-slate-800/70 hover:bg-indigo-600/30 text-slate-300 hover:text-white border border-slate-700/50 hover:border-indigo-500/50 transition-all text-[10px] font-medium"
                              >
                                Brainstorm System
                              </button>
                              <button
                                onClick={() => handlePresetAction('hire')}
                                className="px-2.5 py-1 rounded-full bg-slate-800/70 hover:bg-emerald-600/30 text-slate-300 hover:text-emerald-200 border border-slate-700/50 hover:border-emerald-500/50 transition-all text-[10px] font-medium"
                              >
                                Hire Anas
                              </button>
                            </div>
                          )}

                          {/* Interactive In-Chat Audio Card */}
                          {msg.cardType === 'audio' && (
                            <div className="mt-2.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] font-medium text-slate-300">
                                  Restaurant Reservation & Orders Agent
                                </span>
                                <span className="text-[9px] text-slate-500 font-mono">Retell AI • Twilio</span>
                              </div>

                              {/* Soundwave Simulation */}
                              <div className="h-4 flex items-center justify-between gap-0.5 mb-2 px-0.5">
                                {[30, 70, 45, 90, 55, 75, 40, 85, 65, 35, 80, 60, 25, 85, 50, 70].map((h, idx) => (
                                  <div
                                    key={idx}
                                    className={`flex-1 rounded-full transition-all duration-200 ${
                                      isPlayingAudio
                                        ? 'bg-indigo-400 animate-pulse'
                                        : 'bg-slate-700'
                                    }`}
                                    style={{
                                      height: isPlayingAudio ? `${Math.max(20, (h * (audioProgress || 15)) % 100)}%` : '25%',
                                      animationDelay: `${idx * 0.05}s`,
                                    }}
                                  />
                                ))}
                              </div>

                              {/* Audio Controls */}
                              <div className="flex items-center justify-between pt-0.5">
                                <button
                                  onClick={toggleAudio}
                                  className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-[11px] flex items-center gap-1 transition-all active:scale-95"
                                >
                                  {isPlayingAudio ? <Pause size={10} /> : <Play size={10} />}
                                  <span>{isPlayingAudio ? "Pause" : "Play Recording"}</span>
                                </button>
                                <span className="text-[9px] font-mono text-slate-500">
                                  {isPlayingAudio ? "Playing..." : "0:36"}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Interactive In-Chat Project Card */}
                          {msg.cardType === 'project' && msg.projectData && (
                            <div className="mt-2.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                              <div className="flex items-start justify-between gap-1 mb-1">
                                <h4 className="text-[11px] font-semibold text-white">
                                  {msg.projectData.title}
                                </h4>
                                {msg.projectData.metric && (
                                  <span className="text-[8px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                                    {msg.projectData.metric}
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-slate-400 mb-1.5 leading-relaxed">
                                {msg.projectData.description}
                              </p>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {msg.projectData.tags.map((t, idx) => (
                                  <span
                                    key={idx}
                                    className="text-[8px] font-mono px-1 py-0.2 rounded bg-slate-800/80 text-slate-300"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                              {msg.projectData.slug && (
                                <Link
                                  to={`/project/${msg.projectData.slug}`}
                                  onClick={() => setIsOpen(false)}
                                  className="inline-flex items-center gap-1 text-[10px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                                >
                                  <span>Open Case Study</span>
                                  <ArrowRight size={10} />
                                </Link>
                              )}
                            </div>
                          )}

                          {/* Interactive In-Chat Resume Card */}
                          {msg.cardType === 'resume' && (
                            <div className="mt-2.5 p-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2">
                              <div className="min-w-0">
                                <h5 className="text-[11px] font-semibold text-white truncate">Muhammad Anas - Resume</h5>
                                <p className="text-[9px] text-slate-400">AI Automation Developer • PDF</p>
                              </div>
                              <a
                                href="/Muhammad Anas AI Automation Developer.pdf"
                                download
                                className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-medium flex items-center gap-1 shrink-0 transition-all active:scale-95"
                              >
                                <Download size={10} />
                                <span>Download</span>
                              </a>
                            </div>
                          )}

                          {/* Interactive In-Chat Sparring Options */}
                          {msg.cardType === 'sparring' && (
                            <div className="mt-2 space-y-1">
                              <button
                                onClick={() => sendUserMessage("I want to automate inbound calls & voice customer service")}
                                className="w-full text-left p-2 rounded-lg bg-slate-950 hover:bg-slate-800/60 border border-slate-800 hover:border-slate-700 text-[10px] text-slate-300 hover:text-white transition-all flex items-center justify-between group"
                              >
                                <span>📞 Inbound Phone Calls & Voice Dispatch</span>
                                <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                              </button>
                              <button
                                onClick={() => sendUserMessage("I want to automate lead qualification & ad creation")}
                                className="w-full text-left p-2 rounded-lg bg-slate-950 hover:bg-slate-800/60 border border-slate-800 hover:border-slate-700 text-[10px] text-slate-300 hover:text-white transition-all flex items-center justify-between group"
                              >
                                <span>⚡ Recruiter & Agency Lead Pipelines</span>
                                <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                              </button>
                              <button
                                onClick={() => sendUserMessage("I want to sync multiple tools & APIs via n8n")}
                                className="w-full text-left p-2 rounded-lg bg-slate-950 hover:bg-slate-800/60 border border-slate-800 hover:border-slate-700 text-[10px] text-slate-300 hover:text-white transition-all flex items-center justify-between group"
                              >
                                <span>🤖 Custom n8n Workflows & Webhooks</span>
                                <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                              </button>
                            </div>
                          )}

                          {/* Interactive In-Chat Contact Action Card */}
                          {msg.cardType === 'contact' && (
                            <div className="mt-2.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                              <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                                <CheckCircle2 size={11} />
                                <span>Direct Channels to Anas</span>
                              </div>
                              <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                                <a
                                  href="mailto:anasmobin0@gmail.com"
                                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-center text-[10px] font-medium text-slate-200 hover:text-white transition-colors flex items-center justify-center gap-1"
                                >
                                  <Mail size={10} />
                                  <span>Email Anas</span>
                                </a>
                                <a
                                  href="https://calendly.com"
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-center text-[10px] font-medium text-white transition-colors flex items-center justify-center gap-1 shadow-sm"
                                >
                                  <Calendar size={10} />
                                  <span>Book 15-Min</span>
                                </a>
                              </div>
                            </div>
                          )}
                        </div>

                        {msg.sender === 'user' && (
                          <div className="w-5 h-5 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mb-0.5">
                            <User size={10} className="text-slate-300" />
                          </div>
                        )}
                      </div>
                      <span className="text-[9px] text-slate-500 mt-0.5 px-1 font-mono">
                        {msg.timestamp}
                      </span>
                    </motion.div>
                  ))}

                  {/* Refined 'Typing' Animation State */}
                  <AnimatePresence>
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-1.5"
                      >
                        <AiAvatar size={18} />
                        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl rounded-bl-sm px-3.5 py-2.5 flex items-center gap-2 shadow-sm">
                          <div className="flex items-center gap-1">
                            {[0, 1, 2].map((i) => (
                              <motion.span
                                key={i}
                                className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                                animate={{
                                  y: [0, -5, 0],
                                  opacity: [0.35, 1, 0.35],
                                }}
                                transition={{
                                  duration: 0.65,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  delay: i * 0.16,
                                }}
                              />
                            ))}
                          </div>
                          <motion.span
                            className="text-[10px] font-medium text-slate-400"
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                          >
                            Anas AI is thinking...
                          </motion.span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Input */}
                <form
                  onSubmit={handleFormSubmit}
                  className="p-2.5 bg-slate-900/90 border-t border-slate-800/70 flex items-center gap-1.5 shrink-0"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask Anas AI..."
                    className="flex-1 bg-slate-950 border border-slate-800 focus:border-slate-700 focus:ring-1 focus:ring-indigo-500/30 rounded-xl px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 outline-none transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isTyping}
                    className="p-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white transition-all shadow-sm active:scale-95 shrink-0"
                    aria-label="Send message"
                  >
                    <Send size={13} />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AnasAiChatbot;
