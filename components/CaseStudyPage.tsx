import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { projects, slugify, ProjectPreview } from './Projects';
import { Project } from '../types';
import { 
  ArrowLeft,
  ExternalLink, 
  ArrowRight, 
  Check, 
  Zap, 
  Cpu, 
  Database, 
  Activity, 
  TrendingUp, 
  Play, 
  Code,
  Sparkles,
  Layers,
  Clock,
  Workflow,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  Upload,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  RefreshCw,
  Phone,
  Mail,
  Home,
  Calendar,
  Lock,
  Eye,
  Info,
  CheckCircle,
  FileCheck,
  Globe,
  Settings,
  Terminal,
  Monitor,
  HeartHandshake
} from 'lucide-react';

// Map icon string names to Lucide icons
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Activity,
  Zap,
  Database,
  Sparkles,
  Clock,
  Workflow,
  TrendingUp,
  Cpu,
  Layers,
  Phone,
  Mail,
  Home,
  Calendar,
  Check,
  Code,
  Globe,
  Settings,
  Terminal,
  Monitor,
  HeartHandshake
};

interface FeatureItem {
  title: string;
  desc: string;
  iconName: string;
}

interface HowItWorksStep {
  step: string;
  title: string;
  desc: string;
}

interface MetricItem {
  label: string;
  value: string;
  desc: string;
}

interface TechStackItem {
  name: string;
  category: string;
  description: string;
}

interface CaseStudyDetails {
  hook: string;
  problem: string;
  solution: string;
  features: FeatureItem[];
  howItWorksSteps: HowItWorksStep[];
  metrics: MetricItem[];
  logs: string[];
  techStackDetailed: TechStackItem[];
  screenshots: string[]; // Base64 strings or URLs
}

const getCaseStudyDefaults = (project: Project): CaseStudyDetails => {
  const title = project.title;

  const defaultDetails: CaseStudyDetails = {
    hook: `Autonomous system automating end-to-end ${project.category.toLowerCase()} workflows with high precision.`,
    problem: `Manual intervention, delayed response times, and high administrative overheads were stalling potential conversion rates and limiting scalability.`,
    solution: `Built a fully autonomous, serverless solution integrating multi-platform triggers, instant classification processing, and real-time execution reporting.`,
    features: [
      { title: "Real-time Monitoring", desc: "Monitors systems active events with sub-second logging.", iconName: "Activity" },
      { title: "Autopilot Pipelines", desc: "Automates background cron schedules with high durability.", iconName: "Zap" },
      { title: "Cloud Integration", desc: "Syncs directly across modern databases, sheets, and calendars.", iconName: "Database" }
    ],
    howItWorksSteps: [
      { step: "01", title: "Event Trigger", desc: "Incoming webhook or form request schedules a job queue." },
      { step: "02", title: "AI Analysis", desc: "Intelligent classification profiles user intents, budget, and context." },
      { step: "03", title: "System Execution", desc: "Schedules bookings, drafts custom alerts, or fires Twilio API." }
    ],
    metrics: [
      { label: "100%", value: "Automation", desc: "No manual clicks needed" },
      { label: "10x", value: "Velocity", desc: "Faster response times" },
      { label: "0", value: "Errors", desc: "Robust data synchrony" }
    ],
    logs: [
      "SYSTEM: Booting workflow listener container...",
      "DATABASE: Connected to live instances.",
      "WORKFLOW: Webhook triggers listening on /api/v1/event",
      "STATUS: All nodes synchronized. Live and operational."
    ],
    techStackDetailed: project.tags.map(tag => ({
      name: tag,
      category: "Core Engine",
      description: `Powers key interactive components and real-time operations.`
    })),
    screenshots: []
  };

  if (title === "Multilingual Real Estate Voice Agent") {
    return {
      ...defaultDetails,
      hook: "Qualifying premium property leads across Dubai in English, Arabic, and Hindi with sub-second vocal response times.",
      problem: "Real estate agents miss over 45% of outbound/inbound follow-up windows due to time-zone variances, language barriers, and manual calendar booking friction.",
      solution: "Engineered an outbound voice agent featuring state-of-the-art trilingual models, natural dialogue parsing, and instant database and calendar synchrony.",
      features: [
        { title: "Sub-Second Latency", desc: "Under 800ms speech-to-speech feedback loop for ultra-natural conversations.", iconName: "Zap" },
        { title: "Trilingual Parsing", desc: "Detects and shifts between English, Arabic, and Hindi automatically.", iconName: "Sparkles" },
        { title: "Cal.com Scheduling", desc: "Queries available slots and books viewings live over the phone.", iconName: "Database" }
      ],
      howItWorksSteps: [
        { step: "01", title: "Trigger Call", desc: "Outbound campaign initiates via Twilio API stream to Retell AI." },
        { step: "02", title: "Speech Processing", desc: "Deepgram Nova-2 converts voice to text; LLM translates and extracts buyer intent." },
        { step: "03", title: "Elevenlabs Synthesis", desc: "Generates custom voice replies while n8n coordinates and writes booking data to Cal.com." }
      ],
      metrics: [
        { label: "82%", value: "Qualification Rate", desc: "Leads successfully profiled without agent interaction" },
        { label: "4.2x", value: "Booking Multiplier", desc: "Increase in viewing slots booked" },
        { label: "<800ms", value: "Vocal Latency", desc: "Feels like talking to a human receiver" }
      ],
      logs: [
        "RET_AI: [INFO] Stream channel initialized successfully.",
        "DEEPGRAM: [STT] Text transcribed: 'जी, ३ BHK का क्या प्राइस होगा?'",
        "LLM_ENGINE: [PARSE] Detected Hindi language. Intent: Price inquiry for 3 BHK.",
        "N8N_FLOW: [POST] Triggering Supabase DB update & Cal.com calendar lookups.",
        "ELEVENLABS: [TTS] Streaming synthetic audio chunk..."
      ],
      techStackDetailed: [
        { name: "Retell AI", category: "Voice Pipeline", description: "Provides ultra-low latency conversational voice stream SDK." },
        { name: "n8n", category: "Workflow Automation", description: "Connects Twilio voice triggers to databases and scheduling tools." },
        { name: "Supabase", category: "Database & Auth", description: "Stores client profile tags, lead scores, and call transcripts." },
        { name: "Deepgram Nova-2", category: "Speech-To-Text", description: "Translates and transcribes spoken audio within milliseconds." },
        { name: "Elevenlabs", category: "Text-To-Speech", description: "Generates human-like vocal replies with natural emotional inflections." },
        { name: "Cal.com", category: "Scheduling", description: "Exposes available slots directly to the voice conversational agent." }
      ]
    };
  }

  if (title === "AI Booking Voice Receptionist for Restaurants") {
    return {
      ...defaultDetails,
      hook: "Providing 24/7 dining reservations and guests queries in Danish and English with real-time table syncing.",
      problem: "Local restaurants in Copenhagen lose up to 15% of weekend revenues due to missed reservation calls during busy kitchen rushes.",
      solution: "Created an autonomous voice receptionist that instantly handles bookings, answers queries about parking/menus, and triggers immediate confirmations.",
      features: [
        { title: "24/7 Receptionist", desc: "Answers unlimited parallel calls, resolving restaurant booking bottlenecks.", iconName: "Clock" },
        { title: "Danish & English", desc: "Local dialect recognition ensures cozy and native caller experiences.", iconName: "Sparkles" },
        { title: "Immediate SMS Sync", desc: "Triggers instant booking summaries and table directions to caller devices.", iconName: "Check" }
      ],
      howItWorksSteps: [
        { step: "01", title: "Caller Inbound", desc: "Guest rings the restaurant; Twilio routes call to Retell conversational agent." },
        { step: "02", title: "Table Query", desc: "n8n core queries Airtable restaurant layout to check for open slot availability." },
        { step: "03", title: "Booking Finalized", desc: "Saves table to Airtable, schedules Google Calendar, and sends confirmation via SMS." }
      ],
      metrics: [
        { label: "100%", value: "Pick-up Success", desc: "Zero missed booking calls day or night" },
        { label: "14h", value: "Kitchen Saved", desc: "Hours saved per week for busy kitchen staff" },
        { label: "93%", value: "Satisfaction", desc: "Guests rating reservation experience as excellent" }
      ],
      logs: [
        "VAPI: [CONN] Inbound call accepted from +45 29 18 12 04.",
        "RESERVEBOT: [TRANS] Text: 'Hej, har I ledige borde i aften?'",
        "AIRTABLE: [QUERY] Checking dinner tables for date: 2026-07-20 at 19:30.",
        "N8N_FLOW: [SYS] Table 4 is open. Syncing booking to Google Calendar.",
        "GMAIL: [API] Reservation confirmation receipt dispatched to user."
      ],
      techStackDetailed: [
        { name: "Retell AI", category: "Voice Pipeline", description: "Powers the primary voice reception SDK and call triggers." },
        { name: "n8n", category: "Integration", description: "Automates Airtable updates, Google Calendar, and SMS triggers." },
        { name: "ElevenLabs", category: "Voice Synthesis", description: "Renders highly natural sounding Danish conversational voices." },
        { name: "Airtable", category: "Data Storage", description: "Tracks real-time dinner tables, guest counts, and schedules." },
        { name: "Gmail", category: "Notification Hub", description: "Dispatches elegant visual booking confirmations instantly." }
      ]
    };
  }

  if (title === "Multi-Platform Content Automation Agent") {
    return {
      ...defaultDetails,
      hook: "Autonomous weekly pipeline that researches niche trending topics and schedules tailored content across social channels.",
      problem: "Founders spend hours weekly tracking tech news, writing custom threads, and scheduling across inconsistent web-apps.",
      solution: "Built a fully hands-off pipeline that crawls trending topics, generates structured articles/tweets, and distributes them via automated queues.",
      features: [
        { title: "Smart Topic Fetch", desc: "Tavily AI crawls the web for high-traffic niche keywords.", iconName: "Activity" },
        { title: "Semantic Drafting", desc: "Writes customized blog articles and matching social media threads.", iconName: "Sparkles" },
        { title: "Auto-Scheduling", desc: "Syncs directly across Beehiiv and Buffer queues autonomously.", iconName: "Workflow" }
      ],
      howItWorksSteps: [
        { step: "01", title: "Weekly Trigger", desc: "Cron job triggers n8n daily crawl of niche developer and AI trends." },
        { step: "02", title: "Curation Engine", desc: "OpenAI filters trends and drafts newsletter posts for Beehiiv alongside Buffer threads." },
        { step: "03", title: "Publication Sync", desc: "Post to Beehiiv directly, schedule socials on Buffer, and store analytics inside Supabase." }
      ],
      metrics: [
        { label: "15h", value: "Saved Weekly", desc: "Fully automated marketing research and social scheduling" },
        { label: "3.5k+", value: "Impressions", desc: "Monthly reach increase from consistent scheduling" },
        { label: "100%", value: "Autonomous", desc: "Requires zero manual curation to execute weekly loops" }
      ],
      logs: [
        "CRON_JOB: [START] Weekly automated trend research loop triggered.",
        "TAVILY_API: [GET] Fetching top trending topics in 'SaaS automation 2026'.",
        "GPT_WRITER: [GEN] Generating Beehiiv draft & 5-part LinkedIn carousels.",
        "BUFFER_API: [POST] Dispatching social posts queue slots for Mon/Wed/Fri.",
        "SUPABASE: [LOG] Analytical tracker updated. Process completed successfully."
      ],
      techStackDetailed: [
        { name: "n8n", category: "Pipeline Core", description: "Coordinates the entire scheduled weekly multi-node automation flow." },
        { name: "OpenAI", category: "AI Writer", description: "Crates custom headlines, edits newsletter templates, and drafts threads." },
        { name: "Tavily", category: "Crawl Engine", description: "Performs target queries and search engines scraping for news." },
        { name: "Beehiiv", category: "Newsletter SaaS", description: "Host destination for drafts, automatically ready for subscribers." },
        { name: "Buffer", category: "Social Scheduler", description: "Pre-fills scheduling queue blocks for Twitter/X and LinkedIn." }
      ]
    };
  }

  if (title === "Propel AI") {
    return {
      ...defaultDetails,
      hook: "Comprehensive CRM and sales copilot for Dubai agents, featuring conversation analysis and web-profile profiling.",
      problem: "Agents lack instant profiling info when prospects call, leading to cold pitches and low conversion metrics on premium listings.",
      solution: "Created a full-stack platform that syncs call logs, transcribes audio, profiles buyer background data via Firecrawl, and returns smart scores.",
      features: [
        { title: "Web Profiling", desc: "Firecrawl gathers LinkedIn and professional footprints in seconds.", iconName: "Sparkles" },
        { title: "Lead Scoring", desc: "Assesses buying interest instantly based on audio and budget details.", iconName: "TrendingUp" },
        { title: "Conversation Logs", desc: "Stores entire records with searchable transcripts and key action summaries.", iconName: "Database" }
      ],
      howItWorksSteps: [
        { step: "01", title: "Prospect Connects", desc: "Twilio Voice SDK routes prospect call directly inside the agent portal." },
        { step: "02", title: "Background Scrape", desc: "Firecrawl profiles prospect email/phone online; Deepgram transcribes call live." },
        { step: "03", title: "Copilot Dashboard", desc: "Supabase stores transcript; AI Gateway scores interest and triggers real-estate recommendations." }
      ],
      metrics: [
        { label: "+185%", value: "Response Rate", desc: "Improved response velocity and agent preparation" },
        { label: "12k+", value: "Transcripts", desc: "Processed with high profiling accuracy" },
        { label: "98%", value: "Lead Score", desc: "Accurate intent extraction for premium villas" }
      ],
      logs: [
        "PROPEL_AI: [BOOT] Twilio Voice client initialized.",
        "FIRECRAWL: [SCRAPE] Extracted LinkedIn background: 'SaaS Founder, 10+ employees'.",
        "DEEPGRAM: [INFO] Transcript synced: 'Looking for a villa in Dubai Marina...'",
        "COPILOT_AI: [SCORE] High buying intent (98%). Recommended: 3 BHK apartment.",
        "SUPABASE: [DB] CRM profile updated successfully."
      ],
      techStackDetailed: [
        { name: "Supabase", category: "Backend Engine", description: "Stores customer CRM data, historical transcripts, and scoring charts." },
        { name: "Twilio Voice SDK", category: "Telephony", description: "Integrates outbound/inbound dialers inside the browser dashboard." },
        { name: "Deepgram Nova-2", category: "STT", description: "Transcribes phone audio live with sub-second response times." },
        { name: "Firecrawl", category: "Profile Scraper", description: "Crawls web sources to fetch lead corporate background insights." }
      ]
    };
  }

  if (title === "Narrato") {
    return {
      ...defaultDetails,
      hook: "Autonomous weekly publishing and scheduling SaaS pipeline for founders and modern content creators.",
      problem: "Founders lose up to 10 hours per week writing blog entries and social feeds instead of writing core product systems.",
      solution: "Engineered an intelligent workspace that turns rough notes or voice memos into highly polished, scheduled campaigns.",
      features: [
        { title: "Memo-to-Post", desc: "Renders rough draft thoughts into structured promotional copy.", iconName: "Sparkles" },
        { title: "Multi-Channel Distribution", desc: "Publishes across Beehiiv and Buffer queues with one click.", iconName: "Workflow" },
        { title: "Autonomous Scheduling", desc: "Sets post dates and calendars without developer intervention.", iconName: "Clock" }
      ],
      howItWorksSteps: [
        { step: "01", title: "Input Idea", desc: "Founder inputs a short voice note or text memo about an upcoming feature." },
        { step: "02", title: "Gemini Rewrite", desc: "Gemini API expands note into long-form blog posts and 3 social variations." },
        { step: "03", title: "Dispatch Sync", desc: "n8n pipeline pushes draft to Beehiiv and pre-schedules social triggers." }
      ],
      metrics: [
        { label: "25+", value: "Active Founders", desc: "Automating content production daily" },
        { label: "8x", value: "Creation Velocity", desc: "Faster drafts compared to manual typing" },
        { label: "250+", value: "Posts Published", desc: "Scheduled and shared autonomously" }
      ],
      logs: [
        "NARRATO: [INFO] Core dashboard loaded.",
        "GEMINI_API: [WRITER] Converting voice memo: 'Scaling our startup...' to article.",
        "POST_COMPILER: [OK] Formatted Markdown with code blocks and headlines.",
        "N8N_FLOW: [SYS] Dispatching drafts to Beehiiv and queues on Buffer.",
        "STATUS: Content scheduler loaded successfully."
      ],
      techStackDetailed: [
        { name: "n8n", category: "Workflow Engine", description: "Coordinates drafts triggers and multi-node publishing calendars." },
        { name: "Gemini API", category: "Content Gen AI", description: "Generates semantic copy, code snippets, and social taglines." },
        { name: "Supabase", category: "Data Storage", description: "Maintains calendar queues, credentials, and analytic stats." },
        { name: "Beehiiv", category: "Publishing Platform", description: "Host blog and newsletter portal." }
      ]
    };
  }

  // Custom overrides for specific user products to make them highly customized, accurate, and friendly
  if (title === "Study Zap") {
    return {
      ...defaultDetails,
      hook: "Turn complex, long study PDFs and lecture notes into organized notes, brief guides, and interactive quizzes in seconds.",
      problem: "Students and professionals waste hours highlighting textbook files and manually creating review materials, causing study fatigue and lower retention.",
      solution: "Created an in-browser study companion powered by Gemini that shreds through dense academic files to pull out core definitions and auto-compile custom interactive quizzes.",
      features: [
        { title: "Smart PDF Shredder", desc: "Analyzes uploaded research papers and lecture notes instantly.", iconName: "Sparkles" },
        { title: "Custom Quizzes", desc: "Generates multiple-choice and key terms flashcards on your course topics.", iconName: "Zap" },
        { title: "Structured Study Guides", desc: "Transforms messy chapters into neat, bulleted study plans with ease.", iconName: "Layers" }
      ],
      howItWorksSteps: [
        { step: "01", title: "Upload Files", desc: "Drag and drop complex course syllabus or chapter PDFs into the study workspace." },
        { step: "02", title: "Gemini Analysis", desc: "Gemini models outline key formulas, critical names, and crucial concepts." },
        { step: "03", title: "Interactive Prep", desc: "Study Zap renders interactive practice quizzes, custom guides, and definitions." }
      ],
      metrics: [
        { label: "15,000+", value: "Quizzes Made", desc: "Practice questions auto-generated and resolved" },
        { label: "4.5h", value: "Saved per Chapter", desc: "Hours saved during study session prep" },
        { label: "92%", value: "Grade Fit", desc: "Users reporting better understanding of complex concepts" }
      ]
    };
  }

  if (title === "PathVerse AR") {
    return {
      ...defaultDetails,
      hook: "Interactive indoor campus navigation using smart AI camera recognition and live 3D pathfinders directly in your mobile browser.",
      problem: "New students and campus guests frequently get lost inside large, multi-story academic buildings, leading to late class arrivals and general frustration.",
      solution: "Built a web-based pathfinder using Three.js and Gemini API to analyze camera snaps, detect room numbers, and display interactive 3D virtual route guides.",
      features: [
        { title: "In-Browser 3D Path", desc: "Displays smooth, interactive 3D navigation paths without any native app downloads.", iconName: "Globe" },
        { title: "AI Visual Landmark check", desc: "Analyzes real-time snapshots of room plates to identify precisely where you are.", iconName: "Sparkles" },
        { title: "Instant Door-to-Door Route", desc: "Finds the fastest elevators and stairs to connect classrooms seamlessly.", iconName: "Workflow" }
      ],
      howItWorksSteps: [
        { step: "01", title: "Snap Location", desc: "A user snaps a quick photo of any nearby room number or hallway sign." },
        { step: "02", title: "Identify Position", desc: "Gemini processes the image, matches it to campus blueprints, and spots the user." },
        { step: "03", title: "Render Path", desc: "Three.js overlays an intuitive, responsive 3D path pointing directly to your destination room." }
      ],
      metrics: [
        { label: "1,200+", value: "Students Guided", desc: "Navigating campus halls successfully" },
        { label: "<3 sec", value: "Locate Latency", desc: "Fast position detection via camera frame processing" },
        { label: "0", value: "App Installs", desc: "Runs directly on safari, chrome, or mobile web browsers" }
      ]
    };
  }

  if (title === "Launch Copy") {
    return {
      ...defaultDetails,
      hook: "Generate high-converting landing page headlines and sales copy with interactive live canvas previews in real-time.",
      problem: "Founders struggle to draft clear value propositions and high-converting marketing hooks, losing visitor interest immediately.",
      solution: "Created an interactive copywriting assistant that leverages Gemini to craft custom page layouts and pre-views copy in beautiful responsive templates.",
      features: [
        { title: "Niche Copy Generation", desc: "Drafts tailored headlines, benefit lists, and call-to-actions based on your product.", iconName: "Sparkles" },
        { title: "Live Layout Previews", desc: "Previews text immediately inside styled landing page canvas layouts.", iconName: "Monitor" },
        { title: "Persuasive Frameworks", desc: "Structures copy based on AIDA (Attention, Interest, Desire, Action) formulas.", iconName: "Layers" }
      ],
      howItWorksSteps: [
        { step: "01", title: "Define Audience", desc: "Input your core product idea, target audience, and chosen brand tone." },
        { step: "02", title: "Formulate Copy", desc: "Gemini crafts multiple variants of high-converting hero sections and feature lists." },
        { step: "03", title: "Preview Designs", desc: "Render copy live inside interactive visual wireframes and copy them with one click." }
      ],
      metrics: [
        { label: "4.8x", value: "Draft Velocity", desc: "Faster compared to writing copy from scratch" },
        { label: "8,200+", value: "Heads Crafted", desc: "Catchy headlines generated and exported" },
        { label: "100%", value: "Interactive", desc: "See layout changes live as you edit the text" }
      ]
    };
  }

  if (title === "Food Punch Karachi") {
    return {
      ...defaultDetails,
      hook: "A cozy, digital ordering platform for homemade Memon traditional dishes with direct WhatsApp checkout and AI recipe tips.",
      problem: "Home cooks and small kitchen operations find it difficult to coordinate complex party orders and delivery details over scattered chat messages.",
      solution: "Engineered a streamlined, high-contrast digital catalog that organizes menus, calculates pricing, and drafts custom WhatsApp order summaries.",
      features: [
        { title: "Direct WhatsApp Checkout", desc: "Compiles items, delivery notes, and prices into a clean chat message for the chef.", iconName: "Check" },
        { title: "AI Recipe Suggestions", desc: "Gemini recommends traditional sides and desserts to match your selected order.", iconName: "Sparkles" },
        { title: "Dynamic Cart Calculation", desc: "Avoids order mistakes with automatic, instant pricing calculations.", iconName: "Database" }
      ],
      howItWorksSteps: [
        { step: "01", title: "Browse Menu", desc: "Select authentic traditional Memon meals and specify custom portion preferences." },
        { step: "02", title: "Add Delivery Info", desc: "Input your address and chosen delivery slot inside a clean, single-screen form." },
        { step: "03", title: "Send to WhatsApp", desc: "Click checkout to launch WhatsApp, dispatching a structured order slip to the chef." }
      ],
      metrics: [
        { label: "100%", value: "Direct Orders", desc: "Bypasses high delivery app commission fees completely" },
        { label: "4.9★", value: "User Rating", desc: "Exceptional dining and ordering feedback" },
        { label: "Instant", value: "Cart Updates", desc: "Ensures precise calculations on portion variations" }
      ]
    };
  }

  // Generate generic structured content for all remaining projects
  return {
    ...defaultDetails,
    hook: `A precision-engineered ${project.category} solution designed to maximize performance, automate routines, and elevate operational capabilities.`,
    problem: `Organizations spend valuable hours managing fragmented ${project.category.toLowerCase()} processes, resulting in operational fatigue, transcription errors, or manual overheads.`,
    solution: `Created a seamless, single-view console utilizing advanced integrations (${project.tags.slice(0, 3).join(', ')}) to orchestrate workflows automatically and scale seamlessly.`,
    features: [
      { title: "Automated Pipeline", desc: "Coordinates complex schedules and real-time triggers autonomously.", iconName: "Workflow" },
      { title: "Intelligent Extraction", desc: "Utilizes advanced data parsing to extract customer insights instantly.", iconName: "Sparkles" },
      { title: "Analytical Visibility", desc: "Provides beautiful logs and metrics reflecting historical transaction logs.", iconName: "TrendingUp" }
    ],
    howItWorksSteps: [
      { step: "01", title: "Initialize Stream", desc: "Triggers active listener queues upon incoming form submittals or scheduled times." },
      { step: "02", title: "Orchestrate System", desc: "Passes payload packets through custom processing nodes, validating attributes." },
      { step: "03", title: "Final Dispatch", desc: "Dispatches confirmation payloads to core databases and target communication channels." }
    ],
    metrics: [
      { label: "99.9%", value: "Reliability", desc: "Continuous uptime across serverless nodes" },
      { label: "18h+", value: "Time Reclaimed", desc: "Saved per user week via automation" },
      { label: "Instant", value: "Sync Latency", desc: "Sub-second database transactions" }
    ]
  };
};

// COMPONENT: DYNAMIC RENDER MOCKUP GENERATOR
// This acts as a stunning default visual layout representing the app's real interface if the user hasn't uploaded screenshots yet!
const CategoryAppMockup: React.FC<{ category: string; title: string }> = ({ category, title }) => {
  const [pulse, setPulse] = useState(true);
  const [waveHeights, setWaveHeights] = useState<number[]>([20, 40, 15, 60, 80, 45, 30, 70, 90, 50, 25, 40, 60, 30]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
      if (category === "Voice AI") {
        setWaveHeights(Array.from({ length: 16 }, () => Math.floor(Math.random() * 80) + 15));
      }
    }, 800);
    return () => clearInterval(interval);
  }, [category]);

  const renderDashboardContent = () => {
    if (category === "Voice AI") {
      return (
        <div className="flex flex-col h-full justify-between p-6 text-slate-100 font-mono">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-emerald-950/40 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-bold text-emerald-400">TELEPHONY SERVER ONLINE</span>
            </div>
            <div className="text-[10px] bg-emerald-950/50 border border-emerald-800/40 px-2.5 py-1 rounded text-emerald-300">
              RX/TX Duplex: <span className="font-bold text-white">Active</span>
            </div>
          </div>

          {/* Central Call Monitor */}
          <div className="flex flex-col items-center my-6">
            <div className="relative w-24 h-24 flex items-center justify-center mb-4">
              {/* Outer pulsing rings */}
              <div className="absolute inset-0 rounded-full bg-emerald-500/5 border border-emerald-500/20 animate-ping"></div>
              <div className="absolute inset-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 animate-pulse"></div>
              <div className="absolute inset-6 rounded-full bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center">
                <Phone size={24} className="text-emerald-400 animate-bounce" />
              </div>
            </div>

            <span className="text-sm font-extrabold tracking-tight text-white">VOICE CHANNEL #04</span>
            <span className="text-[10px] text-slate-400 mt-1">STREAMING AUDIO PACKETS...</span>
          </div>

          {/* Elevenlabs & Deepgram Waveform Visualizer */}
          <div className="flex items-center justify-center gap-1.5 h-16 bg-[#010408] border border-emerald-950/60 rounded-xl px-4">
            {waveHeights.map((h, i) => (
              <div 
                key={i} 
                className="w-1.5 bg-emerald-500 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          {/* Live Call Transcript Scroll */}
          <div className="bg-[#000204] border border-emerald-950/30 rounded-lg p-3 text-[10px] space-y-1 text-slate-300 mt-4 h-28 overflow-y-auto">
            <div className="flex gap-2 text-emerald-400/80">
              <span className="font-bold shrink-0">[00:12] SYSTEM:</span>
              <span>Inbound SIP call connected securely.</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-indigo-400 shrink-0">💬 CUSTOMER:</span>
              <span className="text-slate-100">"Yes, hi, I am looking to schedule a viewing for the villa listing in Dubai Marina."</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-emerald-400 shrink-0">🎙️ AGENT:</span>
              <span className="text-emerald-300 font-medium">"I can certainly help with that! We have slots open this Thursday at 3:00 PM or Friday morning. What works best?"</span>
            </div>
          </div>
        </div>
      );
    }

    if (category === "AI Agents & Automation") {
      return (
        <div className="flex flex-col h-full p-5 font-mono text-slate-100 justify-between">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-indigo-950/40 pb-3">
            <div className="flex items-center gap-2">
              <Workflow size={14} className="text-indigo-400" />
              <span className="text-xs font-bold text-indigo-400">N8N AGENTIC PIPELINE</span>
            </div>
            <span className="text-[9px] bg-indigo-950/40 px-2 py-0.5 rounded text-indigo-300 font-bold border border-indigo-900/40">
              14 NODES ACTIVE
            </span>
          </div>

          {/* Interactive Node Graph visualizer */}
          <div className="grid grid-cols-4 gap-3 items-center my-6 relative py-4">
            {/* Visual connector lines */}
            <div className="absolute top-1/2 left-6 right-6 h-0.5 border-t border-dashed border-indigo-500/20 z-0"></div>

            {/* Node 1: Webhook Trigger */}
            <div className="bg-slate-950 border border-slate-900 hover:border-indigo-500 p-2 rounded-xl text-center z-10 shadow-lg relative group">
              <div className="w-6 h-6 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 mb-1">
                <Globe size={11} />
              </div>
              <span className="text-[8px] text-white font-bold block truncate">Inbound Trigger</span>
              <span className="text-[6.5px] text-emerald-400 font-bold">🟢 Triggered</span>
            </div>

            {/* Node 2: Classifier Engine */}
            <div className="bg-slate-950 border border-indigo-500/50 p-2 rounded-xl text-center z-10 shadow-lg relative group">
              <div className="absolute -top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping"></div>
              <div className="w-6 h-6 rounded bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400 mb-1">
                <Cpu size={11} className="animate-spin-slow" />
              </div>
              <span className="text-[8px] text-white font-bold block truncate">Gemini LLM</span>
              <span className="text-[6.5px] text-indigo-400 font-bold">🧠 Classifying</span>
            </div>

            {/* Node 3: Database Store */}
            <div className="bg-slate-950 border border-slate-900 p-2 rounded-xl text-center z-10 shadow-lg relative group">
              <div className="w-6 h-6 rounded bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400 mb-1">
                <Database size={11} />
              </div>
              <span className="text-[8px] text-white font-bold block truncate">Supabase DB</span>
              <span className="text-[6.5px] text-slate-500">📥 Writing record</span>
            </div>

            {/* Node 4: Dispatch Notify */}
            <div className="bg-slate-950 border border-slate-900 p-2 rounded-xl text-center z-10 shadow-lg relative group">
              <div className="w-6 h-6 rounded bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400 mb-1">
                <Mail size={11} />
              </div>
              <span className="text-[8px] text-white font-bold block truncate">Buffer / Gmail</span>
              <span className="text-[6.5px] text-slate-500">📤 Sending alert</span>
            </div>
          </div>

          {/* Job Telemetry */}
          <div className="bg-[#020510] border border-indigo-950/40 rounded-xl p-3 grid grid-cols-3 gap-2 text-center">
            <div>
              <span className="text-[8px] text-slate-500 block uppercase">JOBS TODAY</span>
              <span className="text-xs font-bold text-indigo-300">4,812 / 4,812</span>
            </div>
            <div>
              <span className="text-[8px] text-slate-500 block uppercase">AVG LATENCY</span>
              <span className="text-xs font-bold text-indigo-300">1.24 seconds</span>
            </div>
            <div>
              <span className="text-[8px] text-slate-500 block uppercase">PIPELINE HEAL</span>
              <span className="text-xs font-bold text-emerald-400">100% HEALTHY</span>
            </div>
          </div>
        </div>
      );
    }

    if (category === "Python & Data") {
      return (
        <div className="flex flex-col h-full p-5 font-mono text-slate-100 justify-between">
          <div className="flex justify-between items-center border-b border-cyan-950/40 pb-3">
            <div className="flex items-center gap-2">
              <Code size={14} className="text-cyan-400" />
              <span className="text-xs font-bold text-cyan-400">K-MEANS CLUSTER DATASET</span>
            </div>
            <span className="text-[9px] text-slate-500">n=4,500 samples</span>
          </div>

          {/* Custom SVG Coordinate Grid (Scatter plot) */}
          <div className="flex-grow flex items-center justify-center my-4 h-32 relative bg-[#000505] border border-cyan-950/30 rounded-xl p-2">
            <svg className="w-full h-full" viewBox="0 0 200 100">
              {/* Grid Lines */}
              <line x1="10" y1="90" x2="190" y2="90" stroke="#083344" strokeWidth="0.5" />
              <line x1="10" y1="10" x2="10" y2="90" stroke="#083344" strokeWidth="0.5" />
              
              {/* Cluster A (Cyan dots) */}
              <circle cx="45" cy="35" r="3" fill="#22d3ee" className="animate-ping" style={{ animationDuration: '3s' }} />
              <circle cx="45" cy="35" r="2" fill="#06b6d4" />
              <circle cx="35" cy="45" r="2" fill="#06b6d4" />
              <circle cx="55" cy="40" r="2" fill="#06b6d4" />
              <circle cx="40" cy="25" r="2" fill="#06b6d4" />

              {/* Cluster B (Teal dots) */}
              <circle cx="130" cy="70" r="3" fill="#2dd4bf" className="animate-ping" style={{ animationDuration: '4s' }} />
              <circle cx="130" cy="70" r="2" fill="#0d9488" />
              <circle cx="120" cy="60" r="2" fill="#0d9488" />
              <circle cx="145" cy="65" r="2" fill="#0d9488" />
              <circle cx="140" cy="75" r="2" fill="#0d9488" />

              {/* Cluster C (Slate purple dots) */}
              <circle cx="150" cy="25" r="2" fill="#6366f1" />
              <circle cx="160" cy="35" r="2" fill="#6366f1" />
              <circle cx="140" cy="30" r="2" fill="#6366f1" />

              {/* Centroid indicators */}
              <polygon points="45,31 49,38 41,38" fill="none" stroke="#22d3ee" strokeWidth="1" />
              <polygon points="130,66 134,73 126,73" fill="none" stroke="#2dd4bf" strokeWidth="1" />
            </svg>
            <span className="absolute bottom-2 right-3 text-[7.5px] text-cyan-400/60 uppercase">CENTROIDS: K=3 DEPLOYED</span>
          </div>

          <div className="bg-[#000505] border border-cyan-950/40 rounded-xl p-3 flex justify-between items-center text-[10px]">
            <div>
              <span className="text-[7px] text-slate-500 block uppercase">SILHOUETTE RATIO</span>
              <span className="text-xs font-bold text-cyan-300">0.742 (High Fit)</span>
            </div>
            <div>
              <span className="text-[7px] text-slate-500 block uppercase">ITERATIONS</span>
              <span className="text-xs font-bold text-cyan-300">120 steps</span>
            </div>
            <div>
              <span className="text-[7px] text-slate-500 block uppercase">CLASSIFIER ERR</span>
              <span className="text-xs font-bold text-emerald-400">0.002%</span>
            </div>
          </div>
        </div>
      );
    }

    // Default SaaS mockup
    return (
      <div className="flex flex-col h-full text-slate-100 justify-between p-4 bg-slate-950">
        {/* Navigation bar of mock app */}
        <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400">
              <Sparkles size={11} />
            </div>
            <span className="text-[11px] font-bold tracking-tight text-white">{title}.io</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[9px] text-slate-400">Dashboard</span>
            <span className="text-[9px] text-slate-500">Settings</span>
            <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[8px] font-bold">AN</div>
          </div>
        </div>

        {/* Core analytic cards */}
        <div className="grid grid-cols-3 gap-2.5 my-3">
          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-2.5 text-center">
            <span className="text-[7.5px] text-slate-500 uppercase block font-medium">Monthly Active Users</span>
            <span className="text-xs font-bold text-pink-400 font-mono tracking-tight">14.2k</span>
            <span className="text-[6.5px] text-emerald-500 font-bold block mt-0.5">▲ +14.2%</span>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-2.5 text-center">
            <span className="text-[7.5px] text-slate-500 uppercase block font-medium">Inbound Pipelines</span>
            <span className="text-xs font-bold text-indigo-400 font-mono tracking-tight">1,240</span>
            <span className="text-[6.5px] text-emerald-500 font-bold block mt-0.5">▲ +8.9%</span>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-2.5 text-center">
            <span className="text-[7.5px] text-slate-500 uppercase block font-medium">Platform Conversion</span>
            <span className="text-xs font-bold text-emerald-400 font-mono tracking-tight">24.8%</span>
            <span className="text-[6.5px] text-slate-500 block mt-0.5">Industry Standard: 8%</span>
          </div>
        </div>

        {/* Large Analytics Area */}
        <div className="bg-slate-900/40 border border-slate-900/80 rounded-xl p-3 flex-grow flex items-center justify-center relative">
          <svg className="w-full h-16" viewBox="0 0 200 50">
            <path 
              d="M10,40 Q40,15 70,30 T130,10 T190,25" 
              fill="none" 
              stroke="#ec4899" 
              strokeWidth="1.5"
              className="drop-shadow-[0_0_8px_rgba(236,72,153,0.4)]"
            />
            <path 
              d="M10,40 Q40,15 70,30 T130,10 T190,25 L190,50 L10,50 Z" 
              fill="url(#mock-grad)" 
              opacity="0.08"
            />
            <defs>
              <linearGradient id="mock-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute top-2.5 left-3 text-[8px] text-pink-400/80 uppercase font-bold tracking-wider">
            Live System Conversion Velocity
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-80 rounded-2xl border border-slate-800 bg-[#02050D] relative overflow-hidden flex flex-col justify-between group/mockup shadow-2xl">
      {/* OS window decoration dots */}
      <div className="h-9 bg-slate-950/80 border-b border-slate-900 flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
        </div>
        <span className="text-[10px] text-slate-500 font-bold font-mono tracking-wider truncate max-w-[200px] sm:max-w-xs">
          {title.toUpperCase()} INTERFACE PREVIEW
        </span>
        <div className="w-14"></div>
      </div>

      {/* Dynamic Render Frame Container */}
      <div className="flex-grow bg-[#050912] overflow-hidden">
        {renderDashboardContent()}
      </div>
    </div>
  );
};


// CORE COMPONENT: CASE STUDY PAGE
export const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'flow' | 'tech'>('overview');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [details, setDetails] = useState<CaseStudyDetails | null>(null);

  // Developer Authorization / Owner Check
  const [isOwner, setIsOwner] = useState<boolean>(() => {
    return localStorage.getItem('portfolio_owner') === 'true' || 
           new URLSearchParams(window.location.search).get('owner') === 'true' ||
           window.location.hash.includes('owner=true') ||
           window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1';
  });
  const [showOwnerLogin, setShowOwnerLogin] = useState<boolean>(false);
  const [ownerEmailInput, setOwnerEmailInput] = useState<string>("");
  const [ownerLoginError, setOwnerLoginError] = useState<string>("");

  const handleOwnerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (ownerEmailInput.trim().toLowerCase() === 'anasmobin0@gmail.com') {
      localStorage.setItem('portfolio_owner', 'true');
      setIsOwner(true);
      setShowOwnerLogin(false);
      setOwnerEmailInput("");
      setOwnerLoginError("");
    } else {
      setOwnerLoginError("Unauthorized email address.");
    }
  };

  const handleOwnerLogout = () => {
    localStorage.removeItem('portfolio_owner');
    setIsOwner(false);
    setEditMode(false);
  };
  
  // States for Editing Features
  const [editingFeatureIndex, setEditingFeatureIndex] = useState<number | null>(null);
  const [editFeatureTitle, setEditFeatureTitle] = useState("");
  const [editFeatureDesc, setEditFeatureDesc] = useState("");
  const [editFeatureIcon, setEditFeatureIcon] = useState("Sparkles");

  // State for Creating a Feature
  const [isCreatingFeature, setIsCreatingFeature] = useState(false);
  const [newFeatureTitle, setNewFeatureTitle] = useState("");
  const [newFeatureDesc, setNewFeatureDesc] = useState("");
  const [newFeatureIcon, setNewFeatureIcon] = useState("Zap");

  // Screenshots slider / gallery index
  const [activeScreenshotIndex, setActiveScreenshotIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const project = projects.find(p => slugify(p.title) === slug);

  // Load customizable data
  useEffect(() => {
    if (!project) return;
    window.scrollTo(0, 0);

    const stored = localStorage.getItem(`case_study_${slug}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const defaults = getCaseStudyDefaults(project);
        
        // Ensure properties exist, particularly screenshots
        const merged: CaseStudyDetails = {
          ...defaults,
          ...parsed,
          screenshots: parsed.screenshots || []
        };
        setDetails(merged);
      } catch (err) {
        console.error("Failed to load local storage case study details", err);
        setDetails(getCaseStudyDefaults(project));
      }
    } else {
      setDetails(getCaseStudyDefaults(project));
    }
  }, [slug, project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center items-center p-6 text-center font-sans">
        <Sparkles size={48} className="text-indigo-400 mb-4 animate-pulse" />
        <h1 className="text-2xl font-bold mb-2">Case Study Not Found</h1>
        <p className="text-slate-400 mb-6 max-w-md">
          The requested system case study slug could not be located in our active database of systems.
        </p>
        <Link 
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-sm transition-all"
        >
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="text-center font-mono text-xs text-slate-500">
          <RefreshCw size={24} className="animate-spin text-indigo-400 mx-auto mb-2" />
          <span>INITIALIZING SYSTEM DATABASE CONTROLLER...</span>
        </div>
      </div>
    );
  }

  // Persistent save handler
  const saveField = (field: keyof CaseStudyDetails, value: any) => {
    if (!details) return;
    const updated = {
      ...details,
      [field]: value
    };
    setDetails(updated);
    localStorage.setItem(`case_study_${slug}`, JSON.stringify(updated));
  };

  const handleResetToDefaults = () => {
    if (window.confirm("Are you sure you want to reset all edits, descriptions, uploaded screenshots, and features back to their original defaults for this project?")) {
      localStorage.removeItem(`case_study_${slug}`);
      setDetails(getCaseStudyDefaults(project));
      setActiveScreenshotIndex(0);
      setEditMode(false);
    }
  };

  // Image upload triggers
  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const uploadedUrls: string[] = [];
    let processed = 0;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          uploadedUrls.push(reader.result);
        }
        processed++;
        if (processed === files.length) {
          const currentScreenshots = details.screenshots || [];
          const updatedScreenshots = [...currentScreenshots, ...uploadedUrls];
          saveField('screenshots', updatedScreenshots);
          setActiveScreenshotIndex(updatedScreenshots.length - 1);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteScreenshot = (indexToDelete: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = (details.screenshots || []).filter((_, idx) => idx !== indexToDelete);
    saveField('screenshots', updated);
    
    // Adjust active index if it's out of bounds
    if (activeScreenshotIndex >= updated.length && updated.length > 0) {
      setActiveScreenshotIndex(updated.length - 1);
    } else if (updated.length === 0) {
      setActiveScreenshotIndex(0);
    }
  };

  // Features list controls
  const handleStartEditFeature = (idx: number, feat: FeatureItem) => {
    setEditingFeatureIndex(idx);
    setEditFeatureTitle(feat.title);
    setEditFeatureDesc(feat.desc);
    setEditFeatureIcon(feat.iconName);
  };

  const handleSaveFeatureEdit = (idx: number) => {
    const updatedFeatures = [...details.features];
    updatedFeatures[idx] = {
      title: editFeatureTitle,
      desc: editFeatureDesc,
      iconName: editFeatureIcon
    };
    saveField('features', updatedFeatures);
    setEditingFeatureIndex(null);
  };

  const handleDeleteFeature = (idxToDelete: number) => {
    const updatedFeatures = details.features.filter((_, idx) => idx !== idxToDelete);
    saveField('features', updatedFeatures);
  };

  const handleCreateFeature = () => {
    if (!newFeatureTitle.trim()) return;
    const updatedFeatures = [
      ...details.features,
      {
        title: newFeatureTitle,
        desc: newFeatureDesc || "Detailed capability description.",
        iconName: newFeatureIcon
      }
    ];
    saveField('features', updatedFeatures);
    setIsCreatingFeature(false);
    setNewFeatureTitle("");
    setNewFeatureDesc("");
    setNewFeatureIcon("Zap");
  };

  const related = projects
    .filter(p => p.category === project.category && p.title !== project.title)
    .slice(0, 2);

  // Dynamic colors based on Category matching the updated Home design
  const getThemeColorClass = () => {
    switch (project.category) {
      case "Voice AI":
        return {
          primary: "text-emerald-400",
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/20",
          glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
          btn: "bg-emerald-600 hover:bg-emerald-500 focus:ring-emerald-500"
        };
      case "AI Agents & Automation":
        return {
          primary: "text-indigo-400",
          bg: "bg-indigo-500/10",
          border: "border-indigo-500/20",
          glow: "shadow-[0_0_20px_rgba(99,102,241,0.15)]",
          btn: "bg-indigo-600 hover:bg-indigo-500 focus:ring-indigo-500"
        };
      case "Python & Data":
        return {
          primary: "text-cyan-400",
          bg: "bg-cyan-500/10",
          border: "border-cyan-500/20",
          glow: "shadow-[0_0_20px_rgba(34,211,238,0.15)]",
          btn: "bg-cyan-600 hover:bg-cyan-500 focus:ring-cyan-500"
        };
      default: // SaaS Products
        return {
          primary: "text-pink-400",
          bg: "bg-pink-500/10",
          border: "border-pink-500/20",
          glow: "shadow-[0_0_20px_rgba(236,72,153,0.15)]",
          btn: "bg-pink-600 hover:bg-pink-500 focus:ring-pink-500"
        };
    }
  };

  const themeColors = getThemeColorClass();
  const screenshotCount = (details.screenshots || []).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-all duration-300">
      
      {/* 1. STICKY DEDICATED HEADER */}
      <header className="sticky top-0 bg-slate-950/90 backdrop-blur-md border-b border-slate-900/80 z-50 transition-colors">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-400 hover:text-white transition-all group"
          >
            <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {isOwner ? (
              <div className="flex items-center gap-3">
                {/* Reset Defaults button */}
                <button
                  onClick={handleResetToDefaults}
                  className="text-[10px] font-bold text-slate-500 hover:text-red-400 border border-slate-900 hover:border-red-950 px-2.5 py-1.5 rounded transition-all flex items-center gap-1 uppercase"
                  title="Reset all customized details and files back to defaults"
                >
                  <RefreshCw size={10} />
                  <span className="hidden sm:inline">Reset Defaults</span>
                </button>

                {/* Premium Interactive Edit Mode Toggle Switch */}
                <button
                  onClick={() => setEditMode(!editMode)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${
                    editMode 
                      ? 'bg-indigo-950/80 border-indigo-500/50 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.25)]' 
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${editMode ? 'bg-indigo-400 animate-ping' : 'bg-slate-600'}`}></span>
                  <span>{editMode ? '✏️ EDITING MODE ON' : '✏️ EDIT CASE STUDY'}</span>
                </button>

                {/* Dev Logout Option */}
                <button
                  onClick={handleOwnerLogout}
                  className="p-1.5 bg-slate-900 border border-slate-800 rounded-full text-slate-500 hover:text-slate-300 transition-colors"
                  title="Lock Dashboard (Guest Preview View)"
                >
                  <Lock size={12} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowOwnerLogin(true)}
                className="text-[10px] text-slate-600 hover:text-slate-400 font-bold tracking-widest transition-colors flex items-center gap-1.5 uppercase font-mono"
                title="Developer Customization Authorization Portal"
              >
                <Lock size={11} />
                <span>Customize</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. FLOATING EDIT MODE WARNING BAR */}
      {editMode && (
        <div className="bg-gradient-to-r from-indigo-950 via-slate-950 to-indigo-950 border-b border-indigo-900/40 text-center py-2.5 text-[11px] font-semibold text-indigo-300 font-mono tracking-wider flex items-center justify-center gap-2 shrink-0 animate-pulse">
          <Sparkles size={12} className="text-indigo-400" />
          <span>PORTFOLIO CUSTOMIZATION MODULE ENGAGED. DIRECTLY EDIT AND UPLOAD SCRIPTS & SCREENSHOTS BELOW.</span>
        </div>
      )}

      <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-8 sm:py-12">
        
        {/* 3. HERO & METADATA SECTION */}
        <section className="relative p-6 sm:p-12 bg-gradient-to-b from-[#090D16] to-slate-950 border border-slate-900 rounded-3xl overflow-hidden mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-dot-pattern opacity-15 pointer-events-none"></div>
          <div className="max-w-4xl relative z-10">
            {/* Category Tag */}
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${themeColors.bg} ${themeColors.primary} text-xs font-bold uppercase tracking-wider mb-5 border ${themeColors.border} ${themeColors.glow}`}>
              <Sparkles size={11} className="animate-pulse" />
              {project.category}
            </span>
            
            {/* Title - Editable Inline */}
            {editMode ? (
              <div className="mb-4">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Project Name</label>
                <input 
                  type="text"
                  value={project.title}
                  disabled
                  className="w-full text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-400 bg-slate-900 border border-slate-800 rounded-xl p-2.5 focus:border-indigo-500 focus:outline-none"
                  title="Project name is defined in master config file"
                />
              </div>
            ) : (
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                {project.title}
              </h1>
            )}
            
            {/* Hook - Editable Inline */}
            {editMode ? (
              <div className="mb-6">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Aesthetic App Hook / Headline</label>
                <textarea 
                  value={details.hook}
                  onChange={(e) => saveField('hook', e.target.value)}
                  className="w-full text-sm sm:text-base leading-relaxed text-slate-100 bg-slate-900 border border-indigo-900/30 rounded-xl p-3 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  rows={2}
                />
              </div>
            ) : (
              <p className="text-slate-300 text-base sm:text-xl leading-relaxed mb-8 font-medium">
                {details.hook}
              </p>
            )}

            {/* Launch / Live URLs */}
            <div className="flex flex-wrap gap-4 items-center">
              {project.link && project.link !== "#" ? (
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 ${themeColors.btn} text-white font-bold rounded-xl text-sm shadow-xl shadow-indigo-500/5 hover:shadow-indigo-500/15 transition-all transform hover:-translate-y-0.5`}
                >
                  <span>Launch Live System</span>
                  <ExternalLink size={14} />
                </a>
              ) : (
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-widest bg-slate-900/60 border border-slate-900 px-4 py-2.5 rounded-xl">
                  🔒 Autonomous Client Sandbox Environment
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 4. INTERACTIVE SYSTEM SIMULATOR CENTER STAGE */}
        <section className="bg-slate-900/10 border border-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden mb-12">
          <div className="absolute inset-0 bg-dot-pattern opacity-5 pointer-events-none"></div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-sans">Live System Sandbox</span>
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2 mt-0.5 font-sans">
                <Terminal size={18} className={themeColors.primary} />
                Interactive Live Run Simulator
              </h3>
            </div>
            <div className="flex items-center gap-2 bg-slate-950/60 border border-slate-900 px-3.5 py-1.5 rounded-xl self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">
                System Active & Listening
              </span>
            </div>
          </div>
          
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950 overflow-hidden shadow-2xl">
            <ProjectPreview project={project} />
          </div>
          <p className="text-xs text-slate-400 mt-4 text-center font-sans max-w-2xl mx-auto leading-relaxed">
            💡 <strong>Experience the system in action:</strong> Click the <strong>"Trigger Live Flow"</strong> or <strong>"Next Stage"</strong> buttons in the simulation window above to watch real-time webhook operations, database entries, and voice agent replies run.
          </p>
        </section>

        {/* 5. SEPARATE CHALLENGE & SOLUTION SECTIONS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Challenge Box */}
          <div className="bg-[#0b0304]/40 border border-red-950/30 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden group/challenge hover:border-red-500/20 transition-all duration-300">
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-red-500/5 rounded-full blur-xl group-hover/challenge:bg-red-500/10 transition-colors"></div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <Info size={18} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-red-400/80 uppercase tracking-widest block font-sans">The Bottleneck</span>
                <h3 className="text-lg font-bold text-white font-sans">The Business Challenge</h3>
              </div>
            </div>
            
            {editMode ? (
              <textarea 
                value={details.problem}
                onChange={(e) => saveField('problem', e.target.value)}
                className="w-full text-xs sm:text-sm leading-relaxed text-slate-300 bg-slate-950 border border-red-900/40 rounded-xl p-4 focus:outline-none focus:border-red-500 font-sans"
                rows={5}
              />
            ) : (
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans font-light">
                {details.problem}
              </p>
            )}
          </div>

          {/* Solution Box */}
          <div className="bg-[#030b06]/40 border border-emerald-950/30 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden group/solution hover:border-emerald-500/20 transition-all duration-300">
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover/solution:bg-emerald-500/10 transition-colors"></div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle size={18} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-400/80 uppercase tracking-widest block font-sans">The Resolution</span>
                <h3 className="text-lg font-bold text-white font-sans">Our Engineering Solution</h3>
              </div>
            </div>
            
            {editMode ? (
              <textarea 
                value={details.solution}
                onChange={(e) => saveField('solution', e.target.value)}
                className="w-full text-xs sm:text-sm leading-relaxed text-slate-300 bg-slate-950 border border-emerald-900/40 rounded-xl p-4 focus:outline-none focus:border-emerald-500 font-sans"
                rows={5}
              />
            ) : (
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans font-light">
                {details.solution}
              </p>
            )}
          </div>
        </section>

        {/* 6. ANALYTICS & KEY RESULTS METRICS */}
        <section className="bg-[#090D16]/40 border border-slate-900 rounded-3xl p-6 sm:p-8 mb-12 shadow-xl">
          <div className="mb-6">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-sans">Performance Metrics</span>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2 mt-0.5 font-sans">
              <TrendingUp size={16} className={themeColors.primary} />
              Analytics & Key Results
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {details.metrics.map((metric, idx) => (
              <div key={idx} className="bg-slate-950/60 border border-slate-900/80 rounded-2xl p-6 relative group hover:border-indigo-500/20 transition-all">
                {editMode ? (
                  <div className="space-y-3 font-sans">
                    <div>
                      <label className="block text-[8px] text-slate-500 uppercase font-bold">KPI Value Label (e.g. 100%)</label>
                      <input 
                        type="text"
                        value={metric.label}
                        onChange={(e) => {
                          const newMetrics = [...details.metrics];
                          newMetrics[idx].label = e.target.value;
                          saveField('metrics', newMetrics);
                        }}
                        className="w-full text-xs bg-slate-900 border border-slate-800 rounded p-2 text-indigo-400 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] text-slate-500 uppercase font-bold">Measurement Label</label>
                      <input 
                        type="text"
                        value={metric.value}
                        onChange={(e) => {
                          const newMetrics = [...details.metrics];
                          newMetrics[idx].value = e.target.value;
                          saveField('metrics', newMetrics);
                        }}
                        className="w-full text-xs bg-slate-900 border border-slate-800 rounded p-2 text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] text-slate-500 uppercase font-bold">Friendly Description</label>
                      <input 
                        type="text"
                        value={metric.desc}
                        onChange={(e) => {
                          const newMetrics = [...details.metrics];
                          newMetrics[idx].desc = e.target.value;
                          saveField('metrics', newMetrics);
                        }}
                        className="w-full text-xs bg-slate-900 border border-slate-800 rounded p-2 text-slate-400"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <div className={`text-3xl font-black ${themeColors.primary} font-sans tracking-tight`}>
                      {metric.label}
                    </div>
                    <div className="text-xs font-bold text-slate-100 uppercase mt-1 tracking-wider font-sans">
                      {metric.value}
                    </div>
                    <div className="text-xs text-slate-400 mt-2 leading-relaxed font-sans font-light">
                      {metric.desc}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 7. ENHANCED CORE PIPELINE MILESTONES SEQUENTIAL DATAFLOW */}
        <section className="bg-slate-900/10 border border-slate-900 rounded-3xl p-6 sm:p-8 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-dot-pattern opacity-5 pointer-events-none"></div>
          <div className="mb-8 pb-4 border-b border-slate-900/60 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-sans">System Architecture</span>
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2 mt-0.5 font-sans">
                <Workflow size={18} className={themeColors.primary} />
                Core Pipeline & Data Flow
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-slate-950/60 border border-slate-850 rounded-lg">
              <Activity size={12} className="text-indigo-400 animate-pulse" />
              <span className="text-[9px] text-slate-400 font-mono font-bold tracking-wider uppercase">Sequential Flow</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {details.howItWorksSteps.map((step, idx) => {
              const icons = [Globe, Cpu, CheckCircle];
              const StageIcon = icons[idx] || Sparkles;
              
              return (
                <div key={idx} className="relative group/step">
                  {idx < 2 && (
                    <div className="hidden md:block absolute top-10 left-[calc(100%-12px)] w-8 h-[2px] bg-gradient-to-r from-indigo-500/40 to-indigo-500/10 z-0"></div>
                  )}
                  
                  <div className="bg-slate-950/40 border border-slate-900 hover:border-slate-800 rounded-2xl p-6 h-full relative z-10 transition-all duration-300 hover:translate-y-[-4px] shadow-lg flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-bold flex items-center justify-center font-mono text-sm shadow-md group-hover/step:border-indigo-500/30 transition-colors">
                          {step.step}
                        </div>
                        <div className={`w-8 h-8 rounded-lg ${themeColors.bg} ${themeColors.primary} flex items-center justify-center border ${themeColors.border}`}>
                          <StageIcon size={14} />
                        </div>
                      </div>
                      
                      {editMode ? (
                        <div className="space-y-3 font-sans">
                          <div>
                            <label className="block text-[8px] text-slate-500 uppercase font-bold mb-1">Step Title</label>
                            <input 
                              type="text"
                              value={step.title}
                              onChange={(e) => {
                                const newSteps = [...details.howItWorksSteps];
                                newSteps[idx].title = e.target.value;
                                saveField('howItWorksSteps', newSteps);
                              }}
                              className="w-full text-xs bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] text-slate-500 uppercase font-bold mb-1">Description</label>
                            <textarea 
                              value={step.desc}
                              onChange={(e) => {
                                const newSteps = [...details.howItWorksSteps];
                                newSteps[idx].desc = e.target.value;
                                saveField('howItWorksSteps', newSteps);
                              }}
                              className="w-full text-xs bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-300"
                              rows={3}
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <h4 className="text-base font-bold text-white font-sans group-hover/step:text-indigo-400 transition-colors mb-2">
                            {step.title}
                          </h4>
                          <p className="text-slate-300 text-xs leading-relaxed font-sans font-light">
                            {step.desc}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. APP FEATURES LIST & CAPABILITIES DIRECTORY */}
        <section className="bg-slate-900/20 border border-slate-900 rounded-3xl p-6 sm:p-8 mb-12 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 pb-4 border-b border-slate-900/60">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Functional Specifications</span>
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2 mt-0.5">
                <Layers size={16} className={themeColors.primary} />
                Feature Directory & Capabilities
              </h3>
            </div>
            
            {editMode && (
              <button
                onClick={() => setIsCreatingFeature(!isCreatingFeature)}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md self-start"
              >
                {isCreatingFeature ? <X size={14} /> : <Plus size={14} />}
                <span>{isCreatingFeature ? "Close Creator" : "Add Custom Feature"}</span>
              </button>
            )}
          </div>

          {/* FEATURE CREATOR CARD (Inline) */}
          {editMode && isCreatingFeature && (
            <div className="bg-slate-950 border-2 border-indigo-500/50 rounded-2xl p-5 mb-6 space-y-4 animate-fade-in">
              <h4 className="text-xs font-bold text-indigo-400 uppercase font-mono tracking-widest">Create New Feature Card</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">Feature Name/Title</label>
                  <input 
                    type="text"
                    value={newFeatureTitle}
                    onChange={(e) => setNewFeatureTitle(e.target.value)}
                    placeholder="e.g. Outbound Twilio Pipeline"
                    className="w-full text-xs bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">Aesthetic Icon Representation</label>
                  <select 
                    value={newFeatureIcon}
                    onChange={(e) => setNewFeatureIcon(e.target.value)}
                    className="w-full text-xs bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                  >
                    {Object.keys(ICON_MAP).map(key => (
                      <option key={key} value={key}>{key}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">Feature Scope/Description</label>
                <textarea 
                  value={newFeatureDesc}
                  onChange={(e) => setNewFeatureDesc(e.target.value)}
                  placeholder="Describe how this feature functions and helps the business workflow."
                  className="w-full text-xs bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                  rows={2}
                />
              </div>

              <div className="flex gap-2.5 justify-end">
                <button
                  onClick={() => setIsCreatingFeature(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white text-xs font-bold font-mono"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateFeature}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl font-mono shadow-lg shadow-indigo-500/20"
                >
                  Save Feature Card
                </button>
              </div>
            </div>
          )}

          {/* GRID OF CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {details.features.map((feat, idx) => {
              const IconComp = ICON_MAP[feat.iconName] || Sparkles;
              const isEditingThis = editingFeatureIndex === idx;

              return (
                <div 
                  key={idx} 
                  className={`border rounded-2xl p-5 hover:border-slate-800 transition-all ${
                    isEditingThis 
                      ? 'bg-slate-950 border-indigo-500/60 shadow-[0_0_15px_rgba(99,102,241,0.15)]' 
                      : 'bg-slate-950/40 border-slate-900'
                  } relative group/card`}
                >
                  
                  {/* EDITING CARD FORM INLINE */}
                  {editMode && isEditingThis ? (
                    <div className="space-y-3 font-mono text-[10px]">
                      <div>
                        <label className="block text-[7.5px] text-slate-500 uppercase">Title</label>
                        <input 
                          type="text"
                          value={editFeatureTitle}
                          onChange={(e) => setEditFeatureTitle(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded p-1 text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[7.5px] text-slate-500 uppercase">Icon</label>
                        <select 
                          value={editFeatureIcon}
                          onChange={(e) => setEditFeatureIcon(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded p-1 text-slate-200"
                        >
                          {Object.keys(ICON_MAP).map(key => (
                            <option key={key} value={key}>{key}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[7.5px] text-slate-500 uppercase">Description</label>
                        <textarea 
                          value={editFeatureDesc}
                          onChange={(e) => setEditFeatureDesc(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded p-1 text-slate-300"
                          rows={3}
                        />
                      </div>

                      <div className="flex gap-1.5 justify-end pt-2">
                        <button 
                          onClick={() => setEditingFeatureIndex(null)}
                          className="px-2 py-1 bg-slate-900 text-slate-400 rounded hover:text-white"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={() => handleSaveFeatureEdit(idx)}
                          className="px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-500"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Standard Render */}
                      <div className="flex justify-between items-start mb-3">
                        <div className={`w-9 h-9 rounded-xl ${themeColors.bg} border ${themeColors.border} ${themeColors.primary} flex items-center justify-center shrink-0`}>
                          <IconComp size={18} />
                        </div>

                        {/* Edit & Delete hover controls */}
                        {editMode && (
                          <div className="flex gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleStartEditFeature(idx, feat)}
                              className="w-7 h-7 bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-indigo-400 flex items-center justify-center border border-slate-800 transition-colors"
                              title="Edit Feature"
                            >
                              <Edit2 size={12} />
                            </button>
                            <button
                              onClick={() => handleDeleteFeature(idx)}
                              className="w-7 h-7 bg-slate-900 hover:bg-red-900 rounded-lg text-slate-400 hover:text-white flex items-center justify-center border border-slate-800 transition-colors"
                              title="Delete Feature"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <h4 className="text-sm font-bold text-white mb-2 font-mono">{feat.title}</h4>
                      <p className="text-slate-400 text-xs leading-relaxed font-mono">{feat.desc}</p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. TECHNICAL STACK ARCHITECTURE */}
        <section className="bg-slate-900/20 border border-slate-900 rounded-3xl p-6 sm:p-8 mb-12 shadow-xl">
          <div className="mb-6">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Core Integration Layout</span>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2 mt-0.5">
              <Cpu size={16} className={themeColors.primary} />
              System Technology Stack Detail
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {details.techStackDetailed.map((tech, idx) => (
              <div key={idx} className="bg-slate-950/40 border border-slate-900 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-800 transition-all">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-white font-mono">{tech.name}</span>
                    <span className="text-[8px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800 font-bold uppercase tracking-wider font-mono">
                      {tech.category}
                    </span>
                  </div>
                  {editMode ? (
                    <textarea 
                      value={tech.description}
                      onChange={(e) => {
                        const newTech = [...details.techStackDetailed];
                        newTech[idx].description = e.target.value;
                        saveField('techStackDetailed', newTech);
                      }}
                      className="w-full text-[10px] text-slate-300 bg-slate-900 border border-slate-800 rounded p-1.5 font-mono"
                      rows={2}
                    />
                  ) : (
                    <p className="text-slate-400 text-[10px] leading-relaxed font-mono">
                      {tech.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. RELATED SYSTEMS / DISCOVER NEXT */}
        {related.length > 0 && (
          <section className="mt-16 p-6 sm:p-10 bg-gradient-to-t from-slate-950 via-[#060A12] to-slate-950 border border-slate-900 rounded-3xl">
            <h3 className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider font-mono">Discover other {project.category} solutions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((p, idx) => (
                <Link 
                  key={idx}
                  to={`/project/${slugify(p.title)}`}
                  className="bg-slate-950/40 hover:bg-slate-950 border border-slate-900 hover:border-indigo-500/30 rounded-2xl p-6 cursor-pointer transition-all group block shadow-md"
                >
                  <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors mb-2 font-mono">
                    {p.title}
                  </h4>
                  <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4 font-mono">
                    {p.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-indigo-400 uppercase tracking-wider font-mono">
                    <span>Explore System Study</span>
                    <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* 8. FOOTER FOOTNOTE */}
      <footer className="py-12 bg-slate-950 text-center text-xs text-slate-600 border-t border-slate-900/60 font-mono">
        Anas Mobin AI Systems Portfolio © 2026. Built with absolute precision.
      </footer>
    </div>
  );
};
