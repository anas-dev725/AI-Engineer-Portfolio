import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../types';

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .trim()
    .replace(/\s+/g, '-');
};

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

export const projects: Project[] = [
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

// Interface for dynamic project stage data
interface FlowStage {
  phase: string;
  log: string;
  visualType: string;
  visualData?: any;
}

// Master flow structures for every single project
const STAGE_FLOWS: Record<string, FlowStage[]> = {
  "Multilingual Real Estate Voice Agent": [
    { phase: "Trigger Call", log: "SYSTEM: Triggering outbound Twilio SIP voice trunk...", visualType: "voice-dial", visualData: { phone: "+971 50 123 4567", lang: "EN / AR / HI" } },
    { phase: "STT Listening", log: "DEEPGRAM: Transcribing client speech stream in real-time...", visualType: "voice-wave", visualData: { text: "Client (Hindi): जी, ३ BHK का क्या प्राइस होगा?", side: "client" } },
    { phase: "TTS Speaking", log: "ELEVENLABS: Synthesizing customized conversational voice reply...", visualType: "voice-wave", visualData: { text: "AI: Marina villas start around 3M AED. Let me search available viewing slots.", side: "ai" } },
    { phase: "Cal.com Sync", log: "CAL.COM: Scanning schedule slots & locking Tuesday 11:00 AM...", visualType: "calendar", visualData: { status: "checking", slot: "Tuesday 11:00 AM" } },
    { phase: "Booking Locked", log: "SYSTEM: Slot confirmed! Google Calendar synced and Twilio SMS dispatched.", visualType: "success", visualData: { title: "Viewing Scheduled", details: "Dubai Marina Villa • Tue 11:00 AM" } }
  ],
  "AI Booking Voice Receptionist for Restaurants": [
    { phase: "Inbound Call", log: "VAPI: Receiving inbound call on Copenhagen dining trunk...", visualType: "voice-dial", visualData: { phone: "+45 29 18 12 04", lang: "DA / EN" } },
    { phase: "Dialogue Parse", log: "ELEVENLABS: Speaking Danish restaurant receptionist greeting...", visualType: "voice-wave", visualData: { text: "Guest: Hej, har I ledige borde til 4 i aften kl 19:30?", side: "client" } },
    { phase: "Floorplan Check", log: "AIRTABLE: Checking restaurant layout & active floor grids...", visualType: "table-map", visualData: { table: "Table 4", size: 4, status: "checking" } },
    { phase: "Calendar Lock", log: "GOOGLE_CAL: Locking Table 4 reservation slot on GCal...", visualType: "calendar", visualData: { status: "locked", slot: "Tonight 19:30" } },
    { phase: "SMS Dispatched", log: "TWILIO: Booking receipt dispatched to guest smartphone.", visualType: "success", visualData: { title: "Table Reserved!", details: "Copenhagen Kitchen • Table 4 @ 19:30" } }
  ],
  "Multi-Platform Content Automation Agent": [
    { phase: "Trend Crawl", log: "TAVILY: Scraping trending dev logs and tech articles...", visualType: "crawler", visualData: { source: "GitHub / ProductHunt", query: "AI Agents 2026" } },
    { phase: "GPT Drafting", log: "OPENAI: Generating blog post markdown & social carousels...", visualType: "editor", visualData: { text: "# Scaling n8n Automations on Serverless Nodes..." } },
    { phase: "Buffer Queue", log: "BUFFER: Pre-filling cross-platform social media calendars...", visualType: "buffer", visualData: { queues: ["Mon 9AM", "Wed 3PM", "Fri 12PM"] } },
    { phase: "Beehiiv Sync", log: "BEEHIIV: Syncing draft content to main subscribers newsletter...", visualType: "newsletter", visualData: { template: "Weekly Automation Digest" } },
    { phase: "Autopilot Done", log: "SYSTEM: Automation complete. All networks synced successfully.", visualType: "success", visualData: { title: "Newsletter Published", details: "Beehiiv Draft & Buffer Queue updated" } }
  ],
  "Propel AI": [
    { phase: "Audio Sync", log: "TWILIO: Streaming phone conversation transcription...", visualType: "voice-wave", visualData: { text: "Prospect: Looking for a luxury villa in Marina...", side: "client" } },
    { phase: "Firecrawl Scrape", log: "FIRECRAWL: Scraping LinkedIn profile & business size...", visualType: "scraper", visualData: { target: "LinkedIn", profile: "Tech Founder / 10+ employees" } },
    { phase: "Copilot Score", log: "COPILOT_AI: Computing lead scoring interest level...", visualType: "score-wheel", visualData: { score: 98, budget: "2.5M AED" } },
    { phase: "Listing Match", log: "MATCH: Querying Supabase properties DB for Dubai Marina listings...", visualType: "property-match", visualData: { title: "3 BHK Marina Heights", price: "2.8M AED" } },
    { phase: "Supabase Synced", log: "SUPABASE: CRM profile updated. Lead synchronized.", visualType: "success", visualData: { title: "Lead Synced", details: "Anas Mobin (Score: 98% / 2.8M)" } }
  ],
  "Narrato": [
    { phase: "Audio Rec", log: "NARRATO: Uploading user voice memo transcription...", visualType: "audio-record", visualData: { duration: "0:45", topic: "SaaS pipeline scaling" } },
    { phase: "Gemini Rewrite", log: "GEMINI: Synthesizing raw notes into polished blog post copy...", visualType: "editor", visualData: { text: "## The n8n Revolution: Building Hands-Off Pipelines..." } },
    { phase: "SEO Optimize", log: "SEO: Refining SEO keywords and tagging indicators...", visualType: "seo-score", visualData: { score: 96, tags: ["AI", "SaaS", "n8n"] } },
    { phase: "Queue Prep", log: "WORKFLOW: Mapping content package payload to n8n nodes...", visualType: "pipeline", visualData: { targets: ["Beehiiv", "Buffer"] } },
    { phase: "Autopilot Live", log: "SYSTEM: Newsletter drafted and social queues updated successfully.", visualType: "success", visualData: { title: "Narrato Queue Updated", details: "Newsletter & Buffer scheduled" } }
  ],
  "PathVerse AR": [
    { phase: "Scan Geometry", log: "AR_CORE: Reconstructing indoor floorplan nodes grid...", visualType: "grid-scan", visualData: { nodes: 45 } },
    { phase: "Path Plot", log: "ROUTE_ENG: Mapping structural navigation waypoints...", visualType: "pipeline", visualData: { route: "Entry -> IT Block -> CBM Hall" } },
    { phase: "Align Compass", log: "COMPASS: Calibrating device magnetic north alignment...", visualType: "compass", visualData: { azimuth: "12deg" } },
    { phase: "HUD Navigate", log: "HUD: Displaying route directions vector on device HUD...", visualType: "hud-navigate", visualData: { distance: "45m", direction: "Ahead" } },
    { phase: "Destination", log: "SYSTEM: Final waypoint reached. Navigated 120m flawlessly.", visualType: "success", visualData: { title: "Arrived at CBM Hall", details: "Target destination unlocked" } }
  ],
  "Study Zap": [
    { phase: "Upload PDF", log: "QUIZBOT: Extracting textbook document text stream...", visualType: "document-upload", visualData: { file: "deep_learning.pdf", size: "4.2MB" } },
    { phase: "Layout Parse", log: "PARSE: Chunking text sections and technical vocab tags...", visualType: "scraper", visualData: { chapters: 3, terms: 24 } },
    { phase: "Vector Embed", log: "PINECONE: Syncing embeddings index coordinates to Pinecone database...", visualType: "score-wheel", visualData: { score: 100, label: "Embeddings Synced" } },
    { phase: "Quiz Gen", log: "GEMINI: Compiling contextual multi-choice quiz questions...", visualType: "quiz-items", visualData: { question: "What is RAG in AI?", optA: "Fine-tuning weights", optB: "Fetching Vector DB context" } },
    { phase: "Quiz Complete", log: "SYSTEM: Practice quiz complete. Performance synchronized to Supabase.", visualType: "success", visualData: { title: "Quiz Created", details: "10 practice questions ready" } }
  ],
  "Launch Copy": [
    { phase: "Input URL", log: "LAUNCH: Received target landing page URL index...", visualType: "crawler", visualData: { source: "agency-boost.com" } },
    { phase: "Page Scrape", log: "FIRECRAWL: Scraping headings, call-to-actions, and positioning text...", visualType: "scraper", visualData: { target: "agency-boost.com", profile: "Marketing Agency" } },
    { phase: "Copywriting", log: "OPENAI: Rewriting marketing copy for 3.5x user conversions...", visualType: "editor", visualData: { text: "Scale Your Agency on Autopilot • Book 15+ meetings/mo guaranteed." } },
    { phase: "Split Selection", log: "LAUNCH: Generating optimized A/B testing variants...", visualType: "buffer", visualData: { queues: ["Variant A", "Variant B"] } },
    { phase: "Editor Ready", log: "SYSTEM: High-converting copies loaded into live editor previews.", visualType: "success", visualData: { title: "Launch Copy Ready", details: "Copy variants compiled successfully" } }
  ],
  "Food Punch Karachi": [
    { phase: "Menu Browse", log: "MENU: Rendering digital menu and active prices index...", visualType: "crawler", visualData: { query: "Memon Biryani" } },
    { phase: "Add to Cart", log: "CART: Appending item Memon Biryani (Qty: 1) to checkout...", visualType: "cart-add", visualData: { item: "Memon Biryani", qty: 1 } },
    { phase: "Address Form", log: "GEO: Validating delivery area coordinates for Karachi suburbs...", visualType: "scraper", visualData: { target: "Gulshan-e-Iqbal", profile: "Karachi Address" } },
    { phase: "WhatsApp API", log: "API: Preparing secure checkout message string...", visualType: "editor", visualData: { text: "Assalam o Alaikum, I want to order 1x Memon Biryani..." } },
    { phase: "Cart Dispatched", log: "SYSTEM: Redirecting user to secure WhatsApp API window.", visualType: "success", visualData: { title: "Order Dispatched!", details: "Biryani checkout payload sent to kitchen" } }
  ],
  "Recipe RAG Agent": [
    { phase: "Query Input", log: "RAG: Sourcing cooking natural language query context...", visualType: "crawler", visualData: { query: "Pasta seasoning pairings" } },
    { phase: "Vector Query", log: "PINECONE: Sourcing top embeddings matches from vector storage...", visualType: "scraper", visualData: { target: "45,210 embeddings", profile: "Pasta Query" } },
    { phase: "Fetch Context", log: "RAG: Sourcing sweet basil and garlic index data...", visualType: "quiz-items", visualData: { question: "Top Match Result", optA: "Roasted Garlic (88%)", optB: "Sweet Basil Leaf (97.4%)" } },
    { phase: "Gemini Recipe", log: "GEMINI: Formulating complete culinary recipe instructions...", visualType: "editor", visualData: { text: "Combine fresh basil, garlic oil, and sea salt..." } },
    { phase: "Recipe Ready", log: "SYSTEM: Recipe generated with verified context matches.", visualType: "success", visualData: { title: "Recipe Compiled", details: "Pasta seasoning instructions synced" } }
  ],
  "Employee Onboarding Agent": [
    { phase: "Onboarding Init", log: "SYSTEM: Webhook triggered on employee form submission...", visualType: "crawler", visualData: { query: "Anas Mobin (AI Engineer)" } },
    { phase: "Generate PDF", log: "PDF_GEN: Drafting custom employment offer PDF files...", visualType: "editor", visualData: { text: "Dear Anas, We are pleased to offer you the position of..." } },
    { phase: "Drive Upload", log: "GDRIVE: Saving offer letter directly to onboarding folder...", visualType: "buffer", visualData: { queues: ["Employee Folder", "Onboarding Checklist"] } },
    { phase: "Slack Welcome", log: "SLACK: Dispatching team announcement greeting text...", visualType: "voice-wave", visualData: { text: "Welcome Anas Mobin to our tech team!", side: "ai" } },
    { phase: "Onboarding Done", log: "SYSTEM: Complete workspace and GSuite flow completed.", visualType: "success", visualData: { title: "Employee Synced", details: "Workspace directories updated" } }
  ],
  "Email Classifier Agent": [
    { phase: "Receive Email", log: "IMAP: Triggering email classification listener...", visualType: "crawler", visualData: { query: "From: investor@venture.co" } },
    { phase: "NLP Analyze", log: "CLASSIFIER: Evaluating subject and message contents...", visualType: "scraper", visualData: { target: "Gmail Stream", profile: "Pitch request / Funding" } },
    { phase: "Apply Label", log: "SYSTEM: Label applied: CRITICAL LEAD (Confidence: 99.4%)", visualType: "score-wheel", visualData: { score: 99, label: "Critical Lead" } },
    { phase: "Draft Reply", log: "GEMINI: Writing custom reply with scheduling link...", visualType: "editor", visualData: { text: "Dear Venture, Thanks for reaching out. Let's meet..." } },
    { phase: "Reply Sent", log: "SYSTEM: Email labeled and automated reply dispatched in 1.2s.", visualType: "success", visualData: { title: "Email Sorted", details: "Label applied and reply sent" } }
  ],
  "Data Analytics Agent": [
    { phase: "Ask Question", log: "NLP: Interpreting conversational database query...", visualType: "crawler", visualData: { query: "Sales trajectory this month" } },
    { phase: "Sheets Fetch", log: "SHEETS: Fetching latest table transaction sheets rows...", visualType: "scraper", visualData: { target: "Google Sheets", profile: "1,245 order records" } },
    { phase: "Render Chart", log: "D3: Mapping transaction columns to svg bar metrics...", visualType: "bar-charts", visualData: { vals: [30, 45, 65, 85] } },
    { phase: "Trend Analysis", log: "ANALYTICS: Calculating positive sales variance...", visualType: "score-wheel", visualData: { score: 12, label: "Variance: +12.4%" } },
    { phase: "Dashboard Sync", log: "SYSTEM: Recharts web analytical components successfully updated.", visualType: "success", visualData: { title: "Analytics Rendered", details: "+12.4% Trajectory Met" } }
  ],
  "HubSpot Contacts AI Agent": [
    { phase: "Web Capture", log: "SYSTEM: Sourcing submit data from lead capture hooks...", visualType: "crawler", visualData: { query: "Form Capture: Anas Mobin" } },
    { phase: "Parse Profile", log: "PARSER: Aligning role fields: Anas Mobin (AI systems)...", visualType: "scraper", visualData: { target: "Webhook JSON", profile: "Form Submissions" } },
    { phase: "HubSpot API", log: "HUBSPOT: Dispatching payload to Contacts API endpoint...", visualType: "buffer", visualData: { queues: ["Create Contact", "HubSpot ID: 882103"] } },
    { phase: "Slack Alert", log: "SLACK: Pushing notification to sales channels...", visualType: "voice-wave", visualData: { text: "New HubSpot Lead: Anas Mobin", side: "ai" } },
    { phase: "CRM Synced", log: "SYSTEM: HubSpot CRM and Slack synchronized successfully.", visualType: "success", visualData: { title: "Contact Synced", details: "Anas Mobin (ID: 882103) updated" } }
  ],
  "Lead-Generation Voice Agent": [
    { phase: "Trigger Dialer", log: "TWILIO: Pulling target leads from outreach queue...", visualType: "voice-dial", visualData: { phone: "+1 (415) 332-9014", lang: "EN Outbound" } },
    { phase: "Voice Connected", log: "RET_AI: Outbound trunk channel active...", visualType: "voice-wave", visualData: { text: "[System Dialing...]", side: "client" } },
    { phase: "CRM Pitch", log: "ELEVENLABS: Chatting live with prospect on active line...", visualType: "voice-wave", visualData: { text: "AI: I wanted to explain how our custom CRM saves 15h...", side: "ai" } },
    { phase: "Salesforce Sync", log: "SALESFORCE: Client confirmed high interest. Logging data...", visualType: "scraper", visualData: { target: "Salesforce API", profile: "High Interest Lead" } },
    { phase: "Lead Saved", log: "SYSTEM: Lead qualified. Synced campaign statistics.", visualType: "success", visualData: { title: "Qualified Lead Saved", details: "+1 (415) 332-9014 logged" } }
  ],
  "Property Inbound Voice Agent": [
    { phase: "Answer Call", log: "TWILIO: Accepting incoming caller voice stream...", visualType: "voice-dial", visualData: { phone: "+971 4 231 0123", lang: "EN Inbound" } },
    { phase: "Extract Prefs", log: "RET_AI: Compiling buyer tags: Loc: Downtown / Budget: 3M", visualType: "scraper", visualData: { target: "Voice Preference", profile: "Downtown / 3M-4M" } },
    { phase: "Property Match", log: "SUPABASE: Scanning real estate database listings...", visualType: "property-match", visualData: { title: "2 BHK Boulevard Plaza", price: "3.5M AED" } },
    { phase: "Book Viewing", log: "CAL.COM: Querying slots & locking viewing tour tomorrow...", visualType: "calendar", visualData: { status: "checking", slot: "Thursday 10:00 AM" } },
    { phase: "Supabase Saved", log: "SYSTEM: Viewing booked. Lead profile saved to Supabase.", visualType: "success", visualData: { title: "Dubai Property Booked", details: "Viewing synced for Boulevard Plaza" } }
  ],
  "Healthcare Voice Agent": [
    { phase: "Clinic Call", log: "TWILIO: HIPAA encrypted phone line established...", visualType: "voice-dial", visualData: { phone: "+1 (800) 555-0199", lang: "Medical Inbound" } },
    { phase: "Patient Symptoms", log: "STT: Transcribing appointment and doctor requests...", visualType: "voice-wave", visualData: { text: "Patient: I need a follow-up appointment with Dr. Miller.", side: "client" } },
    { phase: "Doctor Schedule", log: "GOOGLE_CAL: Querying Dr. Miller's calendar calendar...", visualType: "calendar", visualData: { status: "checking", slot: "Tomorrow 10:30 AM" } },
    { phase: "Appt Locked", log: "GOOGLE_CAL: Locking tomorrow 10:30 AM slot...", visualType: "calendar", visualData: { status: "locked", slot: "Dr. Miller (10:30)" } },
    { phase: "HIPAA Logged", log: "SYSTEM: Confirmed. Calendar invite and email dispatched.", visualType: "success", visualData: { title: "Clinic Appt Synced", details: "Dr. Miller follow-up booked" } }
  ],
  "Automated Testing Suite": [
    { phase: "Git Workflow", log: "GITHUB_ACTIONS: Executing production CI/CD test suite...", visualType: "crawler", visualData: { query: "Playwright Watch" } },
    { phase: "Chromium Run", log: "PLAYWRIGHT: Launching chromium headless instances...", visualType: "scraper", visualData: { target: "Chromium Tests", profile: "landing-page.spec.ts (1.2s)" } },
    { phase: "Firefox Run", log: "PLAYWRIGHT: Launching firefox headless instances...", visualType: "scraper", visualData: { target: "Firefox Tests", profile: "auth-flow.spec.ts (2.1s)" } },
    { phase: "Webkit Run", log: "PLAYWRIGHT: Launching webkit headless instances...", visualType: "scraper", visualData: { target: "Webkit Tests", profile: "checkout-session.spec.ts" } },
    { phase: "Suite Passed", log: "SYSTEM: All chromium, firefox & webkit tests passed 100% green.", visualType: "success", visualData: { title: "18/18 Passed", details: "All tests ran green successfully" } }
  ],
  "Customer E-commerce Segmentation": [
    { phase: "CSV Sourced", log: "PANDAS: Parsing transaction CSV datasets...", visualType: "crawler", visualData: { query: "4,210 Customers CSV" } },
    { phase: "Vector Scaling", log: "NUMPY: Scaling features: Recency, Frequency, Monetary...", visualType: "scraper", visualData: { target: "NumPy Workspace", profile: "Matrix shape: (4210, 3)" } },
    { phase: "K-Means Cluster", log: "SCIKIT: Running customer grouping cluster calculations...", visualType: "grid-scan", visualData: { nodes: 15 } },
    { phase: "Variance Score", log: "ANALYTICS: Projecting Silhouette cluster scoring metric...", visualType: "score-wheel", visualData: { score: 72, label: "Silhouette Score: 0.72" } },
    { phase: "Model Compiled", log: "SYSTEM: Python run complete. 4,210 customers successfully segmented.", visualType: "success", visualData: { title: "Model Compiled", details: "K-Means customer clusters updated" } }
  ]
};

// Stateful Preview Simulator Component
export const ProjectPreview: React.FC<{ project: Project }> = ({ project }) => {
  const [stage, setStage] = useState(0);

  // Automated phase transition timer (4000ms per stage)
  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev + 1) % 5);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const title = project.title;
  const category = project.category;

  // Retrieve current flow sequence (or fetch dynamic fallback based on category)
  const getProjectFlow = (): FlowStage[] => {
    if (STAGE_FLOWS[title]) {
      return STAGE_FLOWS[title];
    }
    
    // Fallback flows based on categories
    if (category === "Voice AI") {
      return [
        { phase: "Trunk Call", log: `SYSTEM: Routing outbound voice trunk for ${title}...`, visualType: "voice-dial", visualData: { phone: "+971 Outbound", lang: "EN / AR" } },
        { phase: "Vocal Dialog", log: "VAPI: Conversational speech stream processing...", visualType: "voice-wave", visualData: { text: "AI checking dynamic client details...", side: "ai" } },
        { phase: "Properties DB", log: "SUPABASE: Scanning properties & listings dataset...", visualType: "property-match", visualData: { title: "Listing Match Search", price: "2.5M AED" } },
        { phase: "Calendar Lock", log: "CAL.COM: Locking prospective viewing date slot...", visualType: "calendar", visualData: { status: "checking", slot: "Thursday 2:00 PM" } },
        { phase: "Booking Success", log: "SYSTEM: Database synced. Confirmation invite scheduled.", visualType: "success", visualData: { title: "Booking Confirmed", details: `${title} sync completed` } }
      ];
    }
    
    if (category === "AI Agents & Automation") {
      return [
        { phase: "Web Capture", log: "SYSTEM: Sourcing target active webhooks payload...", visualType: "crawler", visualData: { query: "Incoming Webhook Data" } },
        { phase: "Form Parsing", log: "PARSER: Structuring text metrics and client JSON schemas...", visualType: "scraper", visualData: { target: "Webhook Payload", profile: "Active workflow stream" } },
        { phase: "OpenAI Draft", log: "OPENAI: Generating personalized content newsletter draft...", visualType: "editor", visualData: { text: "Dear Subscriber, Here is your custom daily intelligence draft..." } },
        { phase: "n8n Router", log: "WORKFLOW: Distributing JSON packets across integrated nodes...", visualType: "pipeline", visualData: { target: "Multi-Platform Sync" } },
        { phase: "Sync Complete", log: "SYSTEM: Automation workflow run executed successfully.", visualType: "success", visualData: { title: "Pipeline Finished", details: `${title} run complete` } }
      ];
    }
    
    if (category === "Python & Data") {
      return [
        { phase: "CSV Sourced", log: "PANDAS: Parsing custom CSV data tables...", visualType: "document-upload", visualData: { file: "dataset.csv", size: "1.8MB" } },
        { phase: "Scaling matrix", log: "NUMPY: Normalizing metrics vectors geometry...", visualType: "scraper", visualData: { target: "NumPy Workspace", profile: "Data matrix scaling" } },
        { phase: "K-Means Run", log: "SCIKIT: Running numerical cluster grouping calculations...", visualType: "grid-scan", visualData: { nodes: 15 } },
        { phase: "D3 Projection", log: "ANALYTICS: Projecting segmented records clusters...", visualType: "bar-charts", visualData: { vals: [35, 55, 75, 90] } },
        { phase: "Model Compiled", log: "SYSTEM: Model run complete. Output compiled successfully.", visualType: "success", visualData: { title: "Data Model Ready", details: `${title} ran in 0.45s` } }
      ];
    }
    
    // SaaS Products default
    return [
      { phase: "Init Session", log: "SYSTEM: Initializing web application browser session...", visualType: "crawler", visualData: { query: "User Login" } },
      { phase: "Load State", log: "FIRECRAWL: Loading backend state configuration...", visualType: "scraper", visualData: { target: "Browser Session", profile: "Dashboard render request" } },
      { phase: "OpenAI Draft", log: "OPENAI: Compiling optimized copywriting options...", visualType: "editor", visualData: { text: "Scale your workflow productivity using autonomic systems..." } },
      { phase: "Split Render", log: "LAUNCH: Displaying dynamic split-test modules...", visualType: "buffer", visualData: { queues: ["Option 1", "Option 2"] } },
      { phase: "Dashboard Live", log: "SYSTEM: Premium features rendered in editor interface.", visualType: "success", visualData: { title: "Dashboard Live", details: `${title} session authenticated` } }
    ];
  };

  const flow = getProjectFlow();
  const currentStage = flow[stage] || flow[0];

  // Visual Renderer router based on visualType
  const renderVisual = (type: string, data: any) => {
    switch (type) {
      case "voice-dial":
        return (
          <div className="flex flex-col items-center justify-center h-28 relative">
            <div className="absolute w-20 h-20 rounded-full border border-emerald-500/20 animate-ping opacity-60"></div>
            <div className="absolute w-16 h-16 rounded-full border border-emerald-500/30 animate-[ping_1.5s_ease-in-out_infinite] opacity-40"></div>
            <div className="w-11 h-11 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)] z-10">
              <Phone size={16} className="animate-bounce" />
            </div>
            <div className="text-[9.5px] text-slate-300 font-bold mt-2.5 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800/40 z-10">
              {data?.phone || "Calling..."}
            </div>
            <span className="text-[7.5px] text-slate-500 uppercase tracking-widest mt-1 font-bold z-10">LANG: {data?.lang}</span>
          </div>
        );
      case "voice-wave":
        return (
          <div className="flex flex-col justify-between h-28">
            <div className="flex items-center justify-center gap-1 h-9">
              {[0.5, 0.3, 0.8, 0.4, 0.7, 0.2, 0.6, 0.4, 0.8, 0.3, 0.5, 0.7, 0.2, 0.4].map((h, i) => (
                <div 
                  key={i} 
                  className={`w-0.5 rounded-full transition-all duration-300 ${
                    data?.side === "ai" ? "bg-indigo-400" : "bg-emerald-400"
                  }`}
                  style={{ 
                    height: `${Math.max(10, h * 100 * (1.1 - (i % 3) * 0.15))}%`,
                    animation: "pulse 1.2s ease-in-out infinite"
                  }}
                />
              ))}
            </div>
            <div className="bg-slate-950/90 border border-slate-900 rounded p-2 min-h-[56px] flex flex-col justify-center">
              <div className="flex justify-between text-[6.5px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">
                <span>{data?.side === "ai" ? "AI RESPONDING" : "CLIENT SPEAKING"}</span>
                <span className={data?.side === "ai" ? "text-indigo-400" : "text-emerald-400"}>● Active</span>
              </div>
              <p className="text-[9px] text-slate-300 leading-tight">
                {data?.text}
              </p>
            </div>
          </div>
        );
      case "calendar":
        return (
          <div className="flex flex-col justify-between h-28">
            <div className="grid grid-cols-7 gap-1 bg-slate-950/40 p-1.5 border border-slate-900 rounded-lg">
              {Array.from({ length: 14 }).map((_, i) => {
                const isChecking = i === 9 && data?.status === "checking";
                const isLocked = i === 9 && data?.status === "locked";
                return (
                  <div 
                    key={i} 
                    className={`aspect-square rounded border flex items-center justify-center text-[7px] font-bold ${
                      isLocked 
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.2)]" 
                        : isChecking 
                        ? "bg-indigo-500/20 border-indigo-500 text-indigo-400 animate-pulse" 
                        : i % 3 === 0 
                        ? "bg-slate-900/30 border-slate-900/50 text-slate-600" 
                        : "bg-slate-950 border-slate-900 text-slate-400"
                    }`}
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between text-[8.5px] bg-slate-950 p-1 rounded border border-slate-900">
              <span className="text-slate-400 font-medium">Slot Sync:</span>
              <span className={`font-bold flex items-center gap-1 ${data?.status === "locked" ? "text-emerald-400" : "text-indigo-400 animate-pulse"}`}>
                {data?.status === "locked" ? "✓ Sync Completed" : "Querying Slots..."} ({data?.slot})
              </span>
            </div>
          </div>
        );
      case "table-map":
        return (
          <div className="flex flex-col justify-between h-28">
            <div className="grid grid-cols-5 gap-1 p-1.5 bg-slate-950/40 border border-slate-900 rounded-lg">
              {["T1 (2x)", "T2 (2x)", "T3 (4x)", "T4 (4x)", "T5 (6x)"].map((t, i) => {
                const isT4 = t.startsWith("T4");
                return (
                  <div 
                    key={i} 
                    className={`rounded p-1 border flex flex-col justify-between text-center ${
                      isT4 && data?.status === "checking"
                        ? "bg-amber-500/10 border-amber-500 text-amber-400 animate-pulse"
                        : i === 1 
                        ? "bg-slate-950 border-slate-900/60 text-slate-600 line-through" 
                        : isT4 
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.2)]"
                        : "bg-slate-900 border-slate-900/60 text-slate-400"
                    }`}
                  >
                    <span className="text-[7.5px] font-bold">{t.split(" ")[0]}</span>
                    <span className="text-[5.5px] opacity-60">{t.split(" ")[1]}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between text-[8.5px] bg-slate-950 p-1 rounded border border-slate-900">
              <span className="text-slate-400">Layout Scan:</span>
              <span className="text-emerald-400 font-bold">Table 4 reserved tonight @ 19:30</span>
            </div>
          </div>
        );
      case "crawler":
        return (
          <div className="flex flex-col justify-between h-28">
            <div className="bg-slate-950 border border-slate-900 rounded p-2 flex items-center gap-2.5 relative overflow-hidden">
              <div className="w-7 h-7 rounded bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                <RefreshCw size={12} className="animate-spin" />
              </div>
              <div className="min-w-0 flex-grow">
                <span className="text-[7px] font-mono text-slate-500 uppercase tracking-widest font-bold">CRAWLER EVENT INbound</span>
                <div className="text-[9px] text-indigo-300 font-bold truncate mt-0.5">
                  {data?.source || data?.query}
                </div>
                <p className="text-[7.5px] text-slate-400 truncate mt-0.5">Scraping tech index nodes...</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-[8px] text-slate-500 px-1 font-semibold uppercase tracking-wider">
              <span>Target: {data?.query || "Web Data"}</span>
              <span className="text-emerald-400 animate-pulse">Scanning live</span>
            </div>
          </div>
        );
      case "editor":
        return (
          <div className="flex flex-col h-28 bg-slate-950 border border-slate-900 rounded p-2.5 font-mono text-[9px] justify-between relative overflow-hidden">
            <div className="text-slate-500 text-[6.5px] border-b border-slate-900 pb-1 mb-1.5 flex justify-between">
              <span>GENERATOR WRITER</span>
              <span>UTF-8</span>
            </div>
            <div className="flex-grow text-slate-300 select-none">
              <p className="text-emerald-400 font-semibold mb-0.5">// Markdown Auto-Refined</p>
              <div className="line-clamp-2 leading-relaxed text-indigo-200">
                {data?.text}
              </div>
            </div>
            <div className="text-[7px] text-slate-500 flex justify-between mt-1 pt-1 border-t border-slate-900/40">
              <span>n8n Core Pipeline</span>
              <span className="animate-pulse">✍ Compiling...</span>
            </div>
          </div>
        );
      case "buffer":
        return (
          <div className="flex flex-col justify-between h-28">
            <div className="grid grid-cols-3 gap-1">
              {data?.queues?.map((q: string, idx: number) => (
                <div key={idx} className="bg-slate-950 border border-slate-900/80 p-1.5 rounded text-center flex flex-col justify-between">
                  <span className="text-[6.5px] font-bold text-slate-500">BUFFER SLOT</span>
                  <span className="text-[8.5px] font-bold text-indigo-300 mt-0.5">{q}</span>
                  <span className="text-[6.5px] text-emerald-400 font-bold mt-0.5">✔ Synced</span>
                </div>
              ))}
            </div>
            <div className="text-[7.5px] text-slate-500 text-center font-semibold uppercase tracking-wider">
              Autopilot buffer queue synced
            </div>
          </div>
        );
      case "newsletter":
        return (
          <div className="flex flex-col justify-between h-28">
            <div className="bg-slate-950 border border-slate-900 p-2 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-1.5 min-w-0">
                <div className="w-7 h-7 rounded bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                  <Mail size={12} />
                </div>
                <div className="min-w-0">
                  <h5 className="text-[8.5px] font-bold text-slate-200 truncate">{data?.template || "Weekly Newsletter"}</h5>
                  <p className="text-[7px] text-slate-500">Beehiiv subscriber base</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[8.5px] font-bold text-emerald-400 font-mono">1,420</span>
                <p className="text-[5.5px] text-slate-500 uppercase font-bold">Subscribers</p>
              </div>
            </div>
            <div className="text-[7.5px] text-slate-500 text-center font-bold uppercase tracking-wider">
              Weekly newsletter draft synced on Beehiiv
            </div>
          </div>
        );
      case "scraper":
        return (
          <div className="flex flex-col justify-between h-28 bg-slate-950 border border-slate-900 p-2 rounded-lg font-mono text-[9px]">
            <div className="flex justify-between items-center text-[6.5px] text-slate-500 border-b border-slate-900 pb-1">
              <span>FIRECRAWL EXTRACTOR</span>
              <span className="text-emerald-400 font-bold">SCRAPED</span>
            </div>
            <div className="text-slate-300 space-y-0.5 mt-1.5">
              <div className="truncate"><span className="text-slate-500">Source:</span> {data?.target || "User Profile"}</div>
              <div className="truncate"><span className="text-slate-500">Identity:</span> {data?.profile}</div>
            </div>
            <div className="text-[7.5px] text-slate-500 flex justify-between items-center pt-1 border-t border-slate-900 mt-1">
              <span>JSON attributes synced</span>
              <span className="text-indigo-400">✔ Sync OK</span>
            </div>
          </div>
        );
      case "score-wheel":
        return (
          <div className="flex flex-col justify-between h-28 items-center">
            <div className="relative w-14 h-14 flex items-center justify-center mt-1">
              <svg className="absolute w-14 h-14 transform -rotate-90">
                <circle cx="28" cy="28" r="24" stroke="#1e293b" strokeWidth="3" fill="transparent" />
                <circle 
                  cx="28" 
                  cy="28" 
                  r="24" 
                  stroke="#0d9488" 
                  strokeWidth="3" 
                  fill="transparent" 
                  strokeDasharray="150" 
                  strokeDashoffset={150 - (150 * (data?.score || 98)) / 100}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="flex flex-col items-center justify-center">
                <span className="text-[10px] font-mono font-bold text-teal-400">{data?.score || 98}%</span>
                <span className="text-[5px] text-slate-500 font-bold uppercase">Intent</span>
              </div>
            </div>
            <div className="text-[8.5px] text-teal-300 font-bold bg-teal-950/40 px-2 py-0.5 rounded border border-teal-900/30">
              {data?.label || `Interest Score / Budget: ${data?.budget}`}
            </div>
          </div>
        );
      case "property-match":
        return (
          <div className="flex flex-col justify-between h-28">
            <div className="bg-slate-950 border border-slate-900 rounded p-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5 min-w-0">
                <div className="w-7 h-7 rounded bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                  <Home size={12} />
                </div>
                <div className="min-w-0">
                  <h5 className="text-[9px] font-bold text-slate-200 truncate">{data?.title}</h5>
                  <p className="text-[7px] text-slate-500">Sourcing CRM listings database</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[8.5px] font-mono font-bold text-teal-400">{data?.price}</span>
              </div>
            </div>
            <div className="text-[7.5px] text-slate-500 text-center font-bold uppercase tracking-wider">
              Dubai Real Estate CRM match located
            </div>
          </div>
        );
      case "audio-record":
        return (
          <div className="flex flex-col items-center justify-center h-28">
            <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 animate-pulse">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
            </div>
            <span className="text-[9px] text-slate-300 font-mono font-semibold mt-2">Voice Input Track: {data?.duration}</span>
            <span className="text-[7px] text-slate-500 uppercase tracking-widest mt-0.5">Topic: {data?.topic}</span>
          </div>
        );
      case "seo-score":
        return (
          <div className="flex flex-col justify-between h-28 items-center">
            <div className="relative w-12 h-12 flex items-center justify-center mt-1">
              <svg className="absolute w-12 h-12 transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="#1e293b" strokeWidth="3" fill="transparent" />
                <circle 
                  cx="24" 
                  cy="24" 
                  r="20" 
                  stroke="#db2777" 
                  strokeWidth="3" 
                  fill="transparent" 
                  strokeDasharray="125" 
                  strokeDashoffset={125 - (125 * (data?.score || 96)) / 100}
                  className="transition-all duration-1000"
                />
              </svg>
              <span className="text-[9px] font-mono font-bold text-pink-400">{data?.score}%</span>
            </div>
            <div className="flex gap-1">
              {data?.tags?.map((tag: string, i: number) => (
                <span key={i} className="text-[6.5px] bg-pink-950/40 text-pink-400 border border-pink-900/30 px-1.5 py-0.5 rounded font-bold">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        );
      case "grid-scan":
        return (
          <div className="flex flex-col justify-between h-28 relative overflow-hidden bg-slate-950 rounded-lg border border-slate-900">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.04)_1px,transparent_1px)] bg-[size:10px_10px]"></div>
            <div className="absolute left-0 right-0 h-0.5 bg-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.3)] animate-[scanLine_2s_linear_infinite]"></div>
            <div className="absolute top-8 left-12 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></div>
            <div className="absolute top-14 left-24 w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <div className="absolute top-6 left-32 w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
            
            <div className="relative z-10 m-2 flex items-end justify-between h-full">
              <span className="text-[7px] font-mono text-emerald-400 bg-emerald-950/60 px-1 py-0.5 rounded border border-emerald-900/30 font-bold uppercase tracking-widest">
                K-Means Scanner Active
              </span>
              <span className="text-[7px] text-slate-500 font-mono font-bold">Workspace Nodes: {data?.nodes}</span>
            </div>
          </div>
        );
      case "compass":
        return (
          <div className="flex flex-col items-center justify-center h-28 relative">
            <div className="w-16 h-16 rounded-full border border-blue-500/30 flex items-center justify-center relative">
              <div className="absolute inset-1 rounded-full border border-dashed border-blue-500/20"></div>
              <div 
                className="w-0.5 h-12 bg-gradient-to-t from-transparent via-blue-500 to-cyan-400 rounded-full transition-transform duration-1000"
                style={{ transform: `rotate(${stage * 90}deg)` }}
              />
              <div className="absolute w-2 h-2 rounded-full bg-cyan-400 border border-slate-950"></div>
              <span className="absolute top-0 text-[5.5px] font-bold text-slate-500">N</span>
            </div>
            <span className="text-[7.5px] text-blue-400 font-bold uppercase tracking-wider mt-2.5">Compass Calibrate: {data?.azimuth}</span>
          </div>
        );
      case "hud-navigate":
        return (
          <div className="flex flex-col items-center justify-center h-28 text-center bg-slate-950 border border-slate-900 rounded p-2.5">
            <div className="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-1 animate-bounce">
              ▲
            </div>
            <h4 className="text-[11px] font-extrabold text-blue-300 font-mono tracking-tight">WALK {data?.distance}</h4>
            <span className="text-[7.5px] text-slate-500 uppercase tracking-widest mt-0.5">Direction: {data?.direction}</span>
          </div>
        );
      case "document-upload":
        return (
          <div className="flex flex-col justify-center h-28">
            <div className="bg-slate-950 border border-slate-900 p-2 rounded-lg">
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className="w-6 h-6 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <FileCheck size={12} />
                </div>
                <div className="min-w-0 flex-grow">
                  <h5 className="text-[8.5px] font-bold text-slate-200 truncate">{data?.file || "document.pdf"}</h5>
                  <p className="text-[7px] text-slate-500">Filesize: {data?.size}</p>
                </div>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1 overflow-hidden">
                <div 
                  className="bg-cyan-400 h-full transition-all duration-1000"
                  style={{ width: stage === 0 ? "25%" : stage === 1 ? "60%" : "100%" }}
                ></div>
              </div>
              <div className="flex justify-between items-center text-[7px] text-slate-500 mt-1">
                <span>Parsing PDF layout buffers...</span>
                <span className="text-cyan-400 font-bold">{stage === 0 ? "25%" : stage === 1 ? "60%" : "100%"}</span>
              </div>
            </div>
          </div>
        );
      case "quiz-items":
        return (
          <div className="flex flex-col justify-between h-28 bg-slate-950 border border-slate-900 p-2 rounded-lg font-mono text-[8px]">
            <div className="text-slate-500 text-[6.5px] pb-0.5 border-b border-slate-900">QUIZ PRE-GEN ENGINE</div>
            <p className="text-slate-200 font-bold leading-tight truncate mt-1">Q: {data?.question}</p>
            <div className="space-y-1 mt-1">
              <div className="border border-slate-900 bg-slate-950 rounded p-1 text-slate-500 truncate">
                A) {data?.optA}
              </div>
              <div className="border border-emerald-500/50 bg-emerald-950/20 rounded p-1 text-emerald-300 flex items-center justify-between truncate">
                <span>B) {data?.optB}</span>
                <span className="text-emerald-400 text-[5.5px] font-bold tracking-widest uppercase">CORRECT</span>
              </div>
            </div>
          </div>
        );
      case "cart-add":
        return (
          <div className="flex flex-col justify-between h-28">
            <div className="bg-slate-950 border border-slate-900 rounded p-2 flex items-center justify-between">
              <div>
                <span className="text-[9.5px] font-bold text-slate-200">{data?.item}</span>
                <p className="text-[7px] text-slate-500">Karachi Homemade Kitchen</p>
              </div>
              <div className="bg-amber-950/40 border border-amber-900/40 text-amber-400 px-1.5 py-0.5 rounded font-bold text-[8.5px]">
                Qty: {data?.qty}
              </div>
            </div>
            <div className="bg-emerald-600 rounded py-1 text-center text-[8.5px] font-bold text-white shadow shadow-emerald-500/20">
              💬 Sync checkout payload to WhatsApp
            </div>
          </div>
        );
      case "bar-charts":
        return (
          <div className="flex flex-col justify-between h-28">
            <div className="flex items-end gap-1.5 h-14 mt-1 border-b border-slate-900 pb-0.5 px-4">
              {data?.vals?.map((val: number, idx: number) => (
                <div 
                  key={idx} 
                  className="w-full bg-emerald-500/20 rounded-t border-t border-emerald-500/40 flex items-end justify-center transition-all duration-1000"
                  style={{ height: `${val}%` }}
                >
                  <span className="text-[6px] text-emerald-400 font-bold mb-0.5">{val}%</span>
                </div>
              ))}
            </div>
            <div className="text-[7px] text-slate-500 text-center font-bold uppercase tracking-wider mt-1">
              Live Recharts analytical metrics update
            </div>
          </div>
        );
      case "pipeline":
        return (
          <div className="flex justify-around items-center h-28 relative">
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded bg-slate-950 border border-slate-900 flex items-center justify-center text-slate-500 shadow">
                <Database size={12} />
              </div>
              <span className="text-[6.5px] text-slate-500 mt-1">DB Event</span>
            </div>

            <div className="absolute top-10 left-8 right-8 h-0.5 border-t border-dashed border-indigo-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 absolute top-[-3.5px] animate-[flowLine_2s_linear_infinite]"></div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-indigo-950/60 border border-indigo-500 flex items-center justify-center text-indigo-300 animate-pulse shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                <RefreshCw size={12} className="animate-spin" />
              </div>
              <span className="text-[6.5px] text-indigo-400 font-bold mt-1">n8n core</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded bg-slate-950 border border-slate-900 flex items-center justify-center text-slate-500 shadow">
                <Mail size={12} />
              </div>
              <span className="text-[6.5px] text-slate-500 mt-1">GSuite Sync</span>
            </div>
          </div>
        );
      case "success":
        return (
          <div className="flex flex-col items-center justify-center h-28 text-center animate-[scaleIn_0.3s_ease-out]">
            <div className="w-9 h-9 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mb-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              ✓
            </div>
            <h4 className="text-[10.5px] font-bold text-white tracking-tight">{data?.title || "Workflow Synced"}</h4>
            <span className="text-[8px] text-slate-400 mt-0.5">{data?.details || "Workflow executed successfully."}</span>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-28">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping"></div>
            <span className="text-[8px] font-bold text-slate-400 uppercase mt-2.5">Simulating State...</span>
          </div>
        );
    }
  };

  // Set custom visual configuration options dynamically based on Category to make every project preview look completely distinct
  let containerBg = "bg-[#090D16] border-slate-900/40 hover:bg-[#070B12]";
  let termBg = "bg-slate-950 border-slate-900";
  let promptColor = "text-indigo-400";
  let bottomBarColor = "text-slate-600 border-slate-900/50";
  let progressActiveColor = "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]";
  let progressCompleteColor = "bg-emerald-500";
  let progressLabelColorActive = "text-indigo-400 font-bold";
  let progressLabelColorComplete = "text-emerald-500/80";
  let badgeColor = "bg-indigo-950/60 text-indigo-400 border border-indigo-900/30";
  
  if (category === "Voice AI") {
    containerBg = "bg-[#02050B] border-emerald-950/60 hover:bg-[#010307]";
    termBg = "bg-[#010408] border-emerald-950";
    promptColor = "text-emerald-400";
    bottomBarColor = "text-emerald-800/60 border-emerald-950/30";
    progressActiveColor = "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]";
    progressCompleteColor = "bg-teal-500";
    progressLabelColorActive = "text-emerald-400 font-bold";
    progressLabelColorComplete = "text-teal-400/80";
    badgeColor = "bg-emerald-950/60 text-emerald-400 border border-emerald-900/30";
  } else if (category === "AI Agents & Automation") {
    containerBg = "bg-[#050A1A] border-indigo-950/60 hover:bg-[#030614]";
    termBg = "bg-[#020510] border-indigo-950";
    promptColor = "text-indigo-400";
    bottomBarColor = "text-indigo-800/60 border-indigo-950/30";
    progressActiveColor = "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]";
    progressCompleteColor = "bg-indigo-400";
    progressLabelColorActive = "text-indigo-400 font-bold";
    progressLabelColorComplete = "text-indigo-300";
    badgeColor = "bg-indigo-950/60 text-indigo-400 border border-indigo-900/30";
  } else if (category === "Python & Data") {
    containerBg = "bg-[#030E0D] border-cyan-950/60 hover:bg-[#010908]";
    termBg = "bg-[#000505] border-cyan-950";
    promptColor = "text-cyan-400";
    bottomBarColor = "text-cyan-800/60 border-cyan-950/30";
    progressActiveColor = "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]";
    progressCompleteColor = "bg-teal-400";
    progressLabelColorActive = "text-cyan-400 font-bold";
    progressLabelColorComplete = "text-teal-400";
    badgeColor = "bg-cyan-950/60 text-cyan-400 border border-cyan-900/30";
  } else { // SaaS Products
    containerBg = "bg-[#0F081C] border-pink-950/60 hover:bg-[#0B0415]";
    termBg = "bg-[#06020E] border-pink-950";
    promptColor = "text-pink-400";
    bottomBarColor = "text-pink-800/60 border-pink-950/30";
    progressActiveColor = "bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.6)]";
    progressCompleteColor = "bg-rose-500";
    progressLabelColorActive = "text-pink-400 font-bold";
    progressLabelColorComplete = "text-rose-400";
    badgeColor = "bg-pink-950/60 text-pink-400 border border-pink-900/30";
  }

  return (
    <div 
      className={`w-full h-[280px] ${containerBg} relative overflow-hidden flex flex-col justify-between p-3.5 font-mono select-none border rounded-t-xl cursor-pointer group/preview transition-all duration-300`}
      onClick={(e) => {
        e.stopPropagation();
        setStage((prev) => (prev + 1) % 5);
      }}
      title="Click inside to advance simulator instantly"
    >
      {/* Top Header Badge Row */}
      <div className="flex justify-between items-center text-[9px] shrink-0">
        {category === "Voice AI" ? (
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-emerald-400 uppercase tracking-wider text-[8px]">🎙️ VOICE FEED LIVE</span>
          </span>
        ) : category === "Python & Data" ? (
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
            <span className="font-bold text-cyan-400 uppercase tracking-wider text-[8px]">📊 DATA STREAM ACTIVE</span>
          </span>
        ) : category === "AI Agents & Automation" ? (
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="font-bold text-indigo-400 uppercase tracking-wider text-[8px]">⚙️ PIPELINE RUNNING</span>
          </span>
        ) : (
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse"></span>
            <span className="font-bold text-pink-400 uppercase tracking-wider text-[8px]">✨ CLIENT RUNTIME READY</span>
          </span>
        )}
        <span className={`text-[7.5px] ${badgeColor} px-1.5 py-0.5 rounded font-semibold uppercase`}>
          Phase {stage + 1}/5: {currentStage.phase}
        </span>
      </div>

      {/* macOS control dots & Title layout (Only for SaaS Products & Automation & Data) */}
      {category !== "Voice AI" ? (
        <div className="flex items-center gap-1.5 mt-1.5 pb-1 border-b border-slate-900/10 shrink-0">
          <div className={`w-1.5 h-1.5 rounded-full ${category === 'Python & Data' ? 'bg-cyan-500/60' : category === 'AI Agents & Automation' ? 'bg-indigo-500/60' : 'bg-pink-500/60'}`}></div>
          <div className={`w-1.5 h-1.5 rounded-full ${category === 'Python & Data' ? 'bg-cyan-600/40' : category === 'AI Agents & Automation' ? 'bg-indigo-600/40' : 'bg-pink-600/40'}`}></div>
          <div className={`w-1.5 h-1.5 rounded-full ${category === 'Python & Data' ? 'bg-cyan-700/20' : category === 'AI Agents & Automation' ? 'bg-indigo-700/20' : 'bg-pink-700/20'}`}></div>
          <span className="text-[6.5px] text-slate-500 font-bold ml-1.5 truncate uppercase tracking-widest font-mono">
            {title.replace(" Agent", "").replace(" Voice", "")}.app
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-between mt-1.5 pb-1 border-b border-emerald-950/10 shrink-0">
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[6px] text-emerald-600 font-bold uppercase tracking-widest font-mono">TELEMETRY LINK</span>
          </div>
          <span className="text-[6px] text-slate-500 font-bold font-mono">RX/TX DUPLEX</span>
        </div>
      )}

      {/* Progress Block Segment Tracker */}
      <div className="flex gap-1 w-full mt-2 shrink-0">
        {flow.map((f, idx) => {
          const isActive = idx === stage;
          const isCompleted = idx < stage;
          return (
            <div key={idx} className="flex-1 flex flex-col gap-0.5">
              <div 
                className={`h-0.5 rounded-full transition-all duration-500 ${
                  isActive 
                    ? progressActiveColor 
                    : isCompleted 
                    ? progressCompleteColor 
                    : "bg-slate-800/40"
                }`}
              />
              <span 
                className={`text-[6px] font-mono tracking-tight truncate text-center transition-colors duration-300 ${
                  isActive 
                    ? progressLabelColorActive 
                    : isCompleted 
                    ? progressLabelColorComplete 
                    : "text-slate-600"
                }`}
              >
                {f.phase}
              </span>
            </div>
          );
        })}
      </div>

      {/* Primary Visual Stage Render */}
      <div className="flex-grow flex flex-col justify-center my-2 max-h-[110px]">
        {renderVisual(currentStage.visualType, currentStage.visualData)}
      </div>

      {/* Progressive Real-time Diagnostic Terminal Log */}
      <div className={`${termBg} border rounded p-2 text-[8px] text-slate-400 font-mono flex items-center gap-2 min-h-[34px] transition-all duration-300 hover:border-slate-800/80 shrink-0`}>
        <span className={`${promptColor} font-bold shrink-0`}>❯</span>
        <p className="animate-fade-in line-clamp-1 leading-normal text-slate-300">
          {currentStage.log}
        </p>
      </div>

      {/* Bottom Status bar */}
      <div className={`text-[7.5px] ${bottomBarColor} flex justify-between items-center border-t pt-2 shrink-0`}>
        <span>🖱 Click inside to advance phase</span>
        <span className="font-bold uppercase tracking-widest">{category}</span>
      </div>

      {/* Custom Styles for scanner line and card animations */}
      <style>{`
        @keyframes scanLine {
          0% { top: 0%; opacity: 0.1; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0.1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const Projects: React.FC = () => {
  const navigate = useNavigate();
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
              onClick={() => navigate(`/project/${slugify(project.title)}`)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.2)] hover:-translate-y-2 group flex flex-col relative animate-[fadeIn_0.5s_ease-in-out] cursor-pointer"
            >
              {/* Top Hero Preview Area */}
              <div className="border-b border-slate-100 dark:border-slate-800/60 overflow-hidden relative">
                <ProjectPreview project={project} />
                
                {/* External Link Floating Anchor */}
                {project.link && project.link !== "#" && (
                  <a 
                    href={project.link} 
                    onClick={(e) => e.stopPropagation()}
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
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate(`/project/${slugify(project.title)}`);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors group/link mt-2 text-left"
                  >
                    <span>View Project Case Study</span>
                    <span className="transform group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                  </button>
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
