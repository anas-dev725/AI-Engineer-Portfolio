import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { projects, slugify } from './Projects';
import { Project } from '../types';
import { VoiceCallTranscriptPlayer } from './VoiceCallTranscriptPlayer';
import { 
  ArrowLeft,
  ExternalLink, 
  ArrowRight, 
  Check, 
  Headphones, 
  Cpu, 
  Database, 
  Activity, 
  TrendingUp, 
  Play, 
  Code,
  Bot,
  Layers,
  Clock,
  Workflow,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  RefreshCw,
  Phone,
  Mail,
  Home,
  Calendar,
  Eye,
  Info,
  CheckCircle,
  FileCheck,
  Globe,
  Settings,
  Terminal,
  Monitor,
  HeartHandshake,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

// Map icon string names to Lucide icons
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Activity,
  Headphones,
  Database,
  Bot,
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

interface ComparisonItem {
  metric: string;
  before: string;
  after: string;
  impact: string;
}

interface CaseStudyDetails {
  hook: string;
  purposeSummary?: string;
  keyHighlights?: string[];
  problem: string;
  solution: string;
  features: FeatureItem[];
  howItWorksSteps: HowItWorksStep[];
  metrics: MetricItem[];
  comparisons: ComparisonItem[];
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
      { title: "Autopilot Pipelines", desc: "Automates background cron schedules with high durability.", iconName: "Workflow" },
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
    comparisons: [
      {
        metric: "Response Delay",
        before: "15 to 45 mins average delay (manual)",
        after: "Instant (< 1 second) automated trigger",
        impact: "98% faster response"
      },
      {
        metric: "Availability",
        before: "Limited shifts, business hours only",
        after: "Continuous 24/7/365 availability",
        impact: "+168 hrs weekly coverage"
      },
      {
        metric: "Data Accuracy",
        before: "Manual transcription, prone to errors",
        after: "100% accurate API integration",
        impact: "Zero human data friction"
      },
      {
        metric: "Administrative Effort",
        before: "15+ hours weekly on repetitive chores",
        after: "Autonomous autopilot workflows",
        impact: "15 hours fully saved"
      }
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

  if (title === "Inbound Dispatch Voice Agent") {
    return {
      ...defaultDetails,
      hook: "Autonomous inbound intake and scheduling triage voice agent for home services: conversational trade diagnosis, 15-minute OSRM transit geofencing, and dynamic technician calendar availability.",
      purposeSummary: "The primary objective of this project is to automate the inbound customer intake and scheduling triage for a home services company (Ufound Mechanical) based in Austin, TX. The system replaces traditional IVR menus with an AI voice agent capable of handling real-world, messy human speech to diagnose trade problems (Plumbing, Electrical, or HVAC), collect and validate service addresses, and query real-time technician calendar availability. The agent operates under strict operational boundaries (Steps 1–10 of dispatch): accurately classifying trade requirements through conversational probing without reading rigid option menus; dynamically checking a 14-day booking horizon for specific technician calendars based on trade assignment; enforcing geographic constraints (excluding slots requiring greater than 15 minutes of road transit between consecutive jobs); calculating slot availability using a duration-based rule where a 2-hour arrival window remains valid if at least 1 hour is unbooked; and stopping precisely after presenting available slots, leaving event creation and confirmation to human dispatch.",
      keyHighlights: [
        "Conversational Trade Classification: Natural diagnostic probing without reading rigid IVR menus across Plumbing, Electrical, and HVAC.",
        "14-Day Calendar Horizon & Trade Routing: Routes trade requests to specific technician attendee accounts (tech1@, tech2@, tech3@ufound-ai.com).",
        "15-Minute Transit Geofencing: Integrates OpenStreetMap Nominatim & OSRM to reject slots exceeding 15 minutes of road transit between consecutive jobs.",
        "1-out-of-2-Hour Window Rule: TypeScript microservice evaluates totalOverlapMinutes <= 60 within 2-hour arrival windows.",
        "Controlled Dispatch Handoff: Stops precisely after presenting validated slots, ensuring event creation and confirmation remain in human dispatch control."
      ],
      problem: "Inbound dispatch for home services in Austin suffers from rigid IVR menu abandonments, messy customer explanations, schedule conflicts, and technician transit bloat across the Austin metro area. Human dispatchers lose hours manually calculating road drive times between appointments, verifying trade qualifications, and juggling double-booked technician calendars.",
      solution: "Engineered an end-to-end voice intake and scheduling triage pipeline combining Retell AI conversational intelligence, Make.com orchestration, and a dedicated TypeScript microservice on Val.town. The system diagnoses trade requirements from natural conversation, geocodes addresses with OpenStreetMap Nominatim, computes road network drive durations via OSRM, evaluates 2-hour arrival windows against Google Calendar density, and cleanly presents qualified options.",
      features: [
        { title: "Conversational Trade Triage", desc: "Diagnoses plumbing, HVAC, or electrical issues conversationally without rigid 'press 1' phone trees.", iconName: "PhoneCall" },
        { title: "Dynamic Calendar Horizon", desc: "Evaluates a 14-day booking horizon mapped to specific technician attendee accounts (tech1@, tech2@, tech3@).", iconName: "Calendar" },
        { title: "15-Min Transit Geofencing", desc: "OSRM calculates road network drive times against prior appointments, rejecting slots with >15 min transit.", iconName: "Workflow" },
        { title: "1-out-of-2-Hour Window Rule", desc: "Calculates arrival windows where a 2-hour block remains valid if total existing overlap is <= 60 minutes.", iconName: "Clock" },
        { title: "Self-Correcting Geocoding", desc: "Nominatim normalizes Austin street addresses and prior job locations into precise coordinate pairs.", iconName: "Globe" },
        { title: "Controlled Dispatch Handoff", desc: "Stops precisely after presenting valid slots, leaving ticket finalization and booking lock to human dispatch.", iconName: "CheckCircle" }
      ],
      howItWorksSteps: [
        { step: "01", title: "Inbound Intake & Diagnosis", desc: "Retell AI answers in sub-400ms, conversationally probing the caller's symptoms to classify trade requirements (Plumbing, Electrical, or HVAC)." },
        { step: "02", title: "Transit & Schedule Evaluation", desc: "Make.com routes the payload to the TypeScript microservice (Val.town), querying Google Calendar, geocoding via Nominatim, and checking OSRM transit (<15 min)." },
        { step: "03", title: "Slot Presentation & Handoff", desc: "Agent articulates valid 2-hour arrival windows meeting the duration rule, captures caller preference, and queues the ticket for human dispatch confirmation." }
      ],
      metrics: [
        { label: "100%", value: "Conversational", desc: "Zero rigid IVR menus; natural diagnostic probing" },
        { label: "≤ 15 min", value: "Transit Limit", desc: "Strict OSRM road transit constraint between jobs" },
        { label: "14 Days", value: "Booking Horizon", desc: "Dynamic multi-technician calendar availability search" }
      ],
      comparisons: [
        {
          metric: "Inbound Intake Experience",
          before: "Frustrating 'press 1 for plumbing, 2 for HVAC' phone trees causing high caller drop-off",
          after: "Natural conversational AI diagnosing trade requirements and normalizing addresses",
          impact: "Zero IVR abandonment rate"
        },
        {
          metric: "Drive Time & Route Efficiency",
          before: "Dispatchers scheduling jobs across Austin without knowing actual transit times",
          after: "OSRM road network routing enforcing a strict <= 15 minute drive buffer",
          impact: "Eliminates cross-city transit delays"
        },
        {
          metric: "Calendar Density Logic",
          before: "All-or-nothing scheduling leading to underutilized technician arrival slots",
          after: "1-out-of-2-hour rule (totalOverlapMinutes <= 60) maximizing slot utilization",
          impact: "30% higher booking density"
        },
        {
          metric: "Dispatch Control & Risk",
          before: "Bots auto-committing unverified calendar events that technicians had to undo",
          after: "Precision handoff: presents valid slots to caller, leaving event commit to dispatch",
          impact: "100% human-verified final dispatch"
        }
      ],
      logs: [
        "RETELL: [INBOUND] Call received from +1 (512) 555-0188 (Austin, TX). Agent Alex engaged.",
        "DIAGNOSTIC_PROBE: Caller reports AC compressor buzzing and no cold air -> Classified as HVAC (tech3@ufound-ai.com).",
        "NOMINATIM_GEO: Geocoded '2410 S Congress Ave, Austin, TX' -> Lat: 30.2396, Lon: -97.7554.",
        "OSRM_ROUTING: Drive time from prior appointment at 1100 S Lamar -> 11.4 mins road transit (Within 15-min limit).",
        "VAL_TOWN_ENGINE: Evaluating 14-day horizon on GCal 'ufound Dispatch' -> 1-out-of-2-hour window rule approved (totalOverlapMinutes = 30 <= 60).",
        "TOOL_RETURN: check_available_slots -> Offered Wednesday 10:00 AM - 12:00 PM & Thursday 1:00 PM - 3:00 PM.",
        "DISPATCH_QUEUE: Caller chose Wed 10-12 PM. Handoff payload dispatched to human queue. Call ended gracefully."
      ],
      techStackDetailed: [
        { name: "Retell AI", category: "Voice & Conversational Layer", description: "Manages real-time low-latency STT, LLM conversational intelligence, TTS, and function-calling (check_available_slots) with diagnostic probing and address normalization." },
        { name: "Make.com", category: "Orchestration & Workflow Automation", description: "Receives webhook payloads from Retell AI, routes trade requests to technician attendee IDs (tech1@, tech2@, tech3@), and aggregates Google Calendar events." },
        { name: "TypeScript Microservice (Val.town)", category: "Availability & Routing Engine", description: "Custom backend running Node/TypeScript logic to process business constraints, time-math for the 1-out-of-2-hour rule (totalOverlapMinutes <= 60), and operating windows." },
        { name: "OpenStreetMap Nominatim & OSRM", category: "Geocoding & Transit Engine", description: "Nominatim geocodes street addresses into coordinates, and OSRM calculates road network drive durations to enforce the 15-minute travel radius restriction." },
        { name: "Google Calendar API", category: "Data & Calendar Source", description: "Single shared calendar (ufound Dispatch) serving as the authoritative source of truth for technician appointments and schedule density." }
      ]
    };
  }

  if (title === "24/7 Emergency Trade Dispatcher Agent" || title.includes("GTA Emergency Services")) {
    return {
      ...defaultDetails,
      hook: "Autonomous triage operator for urgent trade crises across Toronto: safety-first mitigation, upfront dispatch terms, and instant sub-2s Cal.com technician booking.",
      purposeSummary: "Designed to provide instant, zero-latency emergency intake and dispatch for urgent trade issues (plumbing, heating, electrical) across the Greater Toronto Area (GTA). Unlike standard scheduling bots, this system functions as an autonomous first-response triage operator: detecting critical property and caller safety threats upfront, providing immediate live mitigation steps (e.g., shutting off main water valves), securing commercial dispatch agreements before technician rollout, and locking in Cal.com technician slots in real time.",
      keyHighlights: [
        "First-Response Safety Mitigation: Detects burst pipes or gas leaks immediately and pauses intake to guide life/property containment steps.",
        "Conversational Normalization: Validates GTA phone and address standards on the fly, catching missing digits mid-sentence.",
        "Upfront Commercial Agreement: Secures explicit caller agreement for the $99 CAD emergency diagnostic fee before dispatch.",
        "Direct Cal.com Execution: Queries live contractor availability and commits bookings directly in under 2 seconds."
      ],
      problem: "Emergency trade operators (plumbing, heating, electrical) across the Greater Toronto Area struggle with panicked callers, delayed safety mitigation, malformed callback numbers, and uncollected diagnostic fees.",
      solution: "Engineered a zero-latency conversational triage dispatcher powered by Retell AI that halts intake to issue emergency shut-off steps, validates GTA phone formats in real-time, secures agreement on a $99 CAD diagnostic fee, and commits Cal.com slots dynamically.",
      features: [
        { title: "Safety-First Triage", desc: "Instantly pauses intake questions upon detecting active leaks or gas to deliver live hazard mitigation instructions.", iconName: "AlertTriangle" },
        { title: "Entity Normalization", desc: "Actively corrects GTA phone formats and street names mid-sentence, ensuring valid 10-digit North American records.", iconName: "PhoneCall" },
        { title: "Upfront Terms Lock", desc: "Secures explicit customer agreement for the $99 CAD emergency diagnostic fee before rolling out a technician.", iconName: "Check" },
        { title: "Cal.com Real-Time Booking", desc: "Queries live emergency contractor schedules and completes booking commits in under 2 seconds.", iconName: "Database" }
      ],
      howItWorksSteps: [
        { step: "01", title: "Emergency Ingestion", desc: "Caller rings the emergency line; Retell AI immediately classifies urgency, severity, and trade category (plumbing, HVAC, electrical)." },
        { step: "02", title: "Safety Mitigation", desc: "Agent issues urgent containment steps (e.g., locating the main water shut-off) before gathering address or billing data." },
        { step: "03", title: "Terms & Cal.com Commit", desc: "Secures agreement for the $99 CAD dispatch fee, validates GTA phone/address, and executes direct Cal.com booking in <2s." }
      ],
      metrics: [
        { label: "< 2s", value: "Booking Commit", desc: "Direct Cal.com emergency technician schedule lock" },
        { label: "100%", value: "Fee Lock Rate", desc: "Upfront agreement on $99 CAD emergency diagnostic fee" },
        { label: "0 sec", value: "Safety Wait Time", desc: "Immediate hazard shut-off instructions to prevent flood damage" }
      ],
      comparisons: [
        {
          metric: "Triage Protocol",
          before: "Slow, generic intake forms while property suffers active water damage",
          after: "Instant hazard detection & immediate shut-off containment guidance",
          impact: "Prevents tens of thousands in flood loss"
        },
        {
          metric: "Input Validation",
          before: "Muffled or malformed callback numbers leading to lost technician dispatches",
          after: "Conversational normalization catching missing digits mid-sentence",
          impact: "100% accurate 10-digit GTA callback records"
        },
        {
          metric: "Fee Collection",
          before: "Technicians arriving on-site only to face disputes over diagnostic fees",
          after: "Explicit verbal agreement to $99 CAD fee locked in before booking",
          impact: "Zero uncollectible technician rollouts"
        },
        {
          metric: "Booking Speed",
          before: "15-30 minute manual phone tag between dispatchers and on-call trades",
          after: "Sub-2-second direct API commit to Cal.com emergency slots",
          impact: "Instant peace-of-mind confirmation"
        }
      ],
      logs: [
        "RETELL: [INBOUND] Inbound emergency call connected (Priority: CRITICAL - Plumbing Flooding).",
        "TRIAGE_CORE: [SAFETY] Active laundry burst pipe detected. Immediate water shut-off instructions provided.",
        "ADDRESS_PARSE: Initial input '14145 Kings St' -> Caller corrected and confirmed '145 King Street, Toronto'.",
        "ENTITY_NORM: [VALIDATE] Callback phone input 9 digits '415550142' -> missing digit prompt -> normalized to +1 (416) 555-0142.",
        "TERMS_LOCK: [AGREED] Caller explicitly confirmed $99 CAD emergency diagnostic dispatch fee.",
        "TOOL_CALL: check_availability_cal -> Slot resolved: Today 8:00 PM - 9:00 PM (Latency: 1.1s).",
        "TOOL_CALL: book_appointment_cal -> Booking confirmed for David at 145 King St (Status: 201 Created in 1.4s).",
        "DISPATCH_COMMITTED: SMS tracking dispatched to +1 (416) 555-0142. [TOOL_CALL: end_call]"
      ],
      techStackDetailed: [
        { name: "Retell AI", category: "Conversational Voice Core", description: "Provides ultra-low latency conversational voice stream, speech-to-text, and dialogue state management." },
        { name: "Cal.com API", category: "Scheduling & Booking", description: "Queries dynamic technician availability and completes calendar commits directly in under 2 seconds." },
        { name: "Twilio Voice", category: "Telephony Gateway", description: "Routes inbound emergency carrier lines across Greater Toronto directly to the AI stream." },
        { name: "Deepgram Nova-2", category: "Real-time STT", description: "Performs fast, accurate acoustic parsing even amidst frantic background noises or rushing water." }
      ]
    };
  }

  if (title === "Multilingual Real Estate Voice Agent") {
    return {
      ...defaultDetails,
      hook: "Qualifying premium property leads across Dubai in English, Arabic, and Hindi with sub-second vocal response times.",
      problem: "Real estate agents miss over 45% of outbound/inbound follow-up windows due to time-zone variances, language barriers, and manual calendar booking friction.",
      solution: "Engineered an outbound voice agent featuring state-of-the-art trilingual models, natural dialogue parsing, and instant database and calendar synchrony.",
      features: [
        { title: "Sub-Second Latency", desc: "Under 800ms speech-to-speech feedback loop for ultra-natural conversations.", iconName: "Clock" },
        { title: "Trilingual Parsing", desc: "Detects and shifts between English, Arabic, and Hindi automatically.", iconName: "Globe" },
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
      comparisons: [
        {
          metric: "Response Delay",
          before: "45 mins average follow-up window",
          after: "Instant sub-second (<800ms) voice reply",
          impact: "98% faster qualification"
        },
        {
          metric: "Lead Coverage",
          before: "45% of evening/weekend leads lost",
          after: "100% incoming calls handled 24/7",
          impact: "0 missed booking calls"
        },
        {
          metric: "Booking Friction",
          before: "Manual back-and-forth email scheduling",
          after: "Instant over-the-phone Cal.com locking",
          impact: "4.2x viewings booked"
        },
        {
          metric: "Language Barrier",
          before: "English only, missing Arabic/Hindi buyers",
          after: "Trilingual detection & automatic switching",
          impact: "Full global buyer reach"
        }
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
        { title: "Danish & English", desc: "Local dialect recognition ensures cozy and native caller experiences.", iconName: "Globe" },
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
      comparisons: [
        {
          metric: "Call Answer Rate",
          before: "15% weekend reservation calls missed during busy rushes",
          after: "100% call answering capacity simultaneously",
          impact: "0 booking calls missed"
        },
        {
          metric: "Reservation Sync",
          before: "Manual diary logs, prone to overbooking or human errors",
          after: "Real-time table check in Airtable & GCal databases",
          impact: "100% accurate reservation check"
        },
        {
          metric: "Confirmation Delay",
          before: "No confirmation, guests guessing or calling back to check",
          after: "Immediate dynamic SMS confirmation & map directions",
          impact: "93% customer satisfaction rating"
        },
        {
          metric: "Staff Time Saved",
          before: "14 hours/week spent by kitchen staff on the phone",
          after: "Autonomous virtual receptionist resolving questions 24/7",
          impact: "14 hours/week reclaimed"
        }
      ],
      logs: [
        "RETELL: [INBOUND] Call connected from +45 45 26 80 68 (Sonder Copenhagen).",
        "DEEPGRAM: [TRANS] 'Yeah hi, actually I wanted to book a reservation for my family.'",
        "AIRTABLE: [QUERY] Checking availability for Sept 16 at 17:00 (Party of 3) -> Fully Booked.",
        "RETELL: [TRIAGE] Offered alternative slots: 16:30 and 18:30 -> Guest selected 16:30.",
        "N8N_FLOW: [SYNC] Locking Table 3 at 16:30 into Airtable and Google Calendar.",
        "GMAIL: [DISPATCH] Reservation confirmation receipt sent to guest email (Status: 200 OK)."
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

  if (title === "Automated Recruitment Ad Engine") {
    return {
      ...defaultDetails,
      hook: "An end-to-end recruitment ad engine designed around a simple truth: recruiting senior builders isn't e-commerce. It handles deep candidate research, generates multi-angle hooks across 5 core emotional drivers, produces production-ready feed and video scripts, and automatically learns from Meta ad performance data.",
      purposeSummary: "I built this project to fix a problem most recruiting agencies face: generic, boring job ads that senior developers immediately scroll past. Instead of treating job postings like discount store products, this system approaches candidates as technical peers.\n\nUsing Airtable on the front end and n8n under the hood, the pipeline transforms raw job notes into candidate personas, battle-tested ad angles, and complete scripts ready to publish. It also closes the loop: by pulling simulated Meta ad metrics, the workflow identifies which hooks hit real-world targets and automatically references those winning creative assets when writing ads for future roles.",
      keyHighlights: [
        "One Webhook, Zero Clutter: Rather than maintaining a tangle of endpoints, Airtable checkboxes fire a quick script to a single n8n webhook, which routes each action seamlessly with a Switch node.",
        "Candidate-First Research: Uncovers the real stuff engineers care about—like messy legacy code, broken deployment pipelines, and honest salary bands—complete with a cheat sheet of conversation Do's and Don'ts for recruiters.",
        "5-Pillar Angle Generation: Maps every role across 5 emotional drivers (Security & Stability, Career Growth, Work-Life Balance, High Earning Potential, Purpose & Mission) using a structured 5-part blueprint (Hook → Role → Benefits → Proof → CTA).",
        "Ready-to-Publish Creatives: Outputs both punchy technical Feed Ads and 45–60s Short Video Scripts (VSLs) complete with staging and visual cues.",
        "Self-Improving Feedback Loop: Evaluates active ad performance and automatically tags winners so future job postings can build on proven hooks."
      ],
      problem: "Most recruiting agencies and tech companies run generic, corporate-buzzword job ads that senior engineers immediately scroll past. Without deep technical empathy—addressing real concerns like tech debt, release bottlenecks, and candid salary bands—companies burn ad budgets on unqualified applicants with zero systematic feedback loop to improve future creative assets.",
      solution: "Engineered a closed-loop recruitment ad pipeline integrating Airtable with n8n and OpenAI GPT-4o. The system turns messy job requirements into empathetic developer personas, generates 5 distinct emotional ad angles with battle-tested copy blueprints, produces formatted Feed Ads and 45-60s VSL scripts with staging notes, and automatically processes Meta ad conversion data to continuously reuse winning hooks.",
      features: [
        { title: "One Webhook, Zero Clutter", desc: "A single n8n webhook handles multiple recruiter checkbox actions via an intelligent Switch router.", iconName: "Workflow" },
        { title: "Candidate-First Persona Research", desc: "Uncovers developer pain points (legacy code, broken CI/CD) and compiles a recruiter Do's/Don'ts guide.", iconName: "Bot" },
        { title: "5-Pillar Angle Blueprint", desc: "Maps roles across Security, Growth, Balance, High Earning, and Purpose via Hook → Role → Benefits → Proof → CTA.", iconName: "Layers" },
        { title: "Ready-to-Publish Creatives", desc: "Formats technical Feed Ads and 45-60s Short Video Scripts (VSLs) complete with visual staging cues.", iconName: "Monitor" },
        { title: "Self-Improving Feedback Loop", desc: "Ingests Meta Graph API metrics (omni_complete_registration) and automatically tags winning hooks for future roles.", iconName: "TrendingUp" },
        { title: "JavaScript Code Node Engineering", desc: "Custom code nodes handle array unnesting, custom math formulas, division-by-zero safeguards, and data normalization.", iconName: "Code" }
      ],
      howItWorksSteps: [
        { step: "01", title: "Intake & Single Webhook Trigger", desc: "Recruiter checks a trigger box in Airtable. A concise script calls a single n8n webhook, which routes execution cleanly through a Switch node." },
        { step: "02", title: "Peer-Level Research & Angle Mapping", desc: "GPT-4o extracts technical builder pain points and drafts 5 structured angles across core emotional drivers directly into Airtable." },
        { step: "03", title: "Creative Synthesis & Closed Loop", desc: "Code nodes compile Feed Ads and VSL scripts with cues, while Meta Graph API performance data tags high-converting winners for next-gen roles." }
      ],
      metrics: [
        { label: "5 Core", value: "Emotional Pillars", desc: "Security, Growth, Balance, High Earning, Purpose" },
        { label: "1 Webhook", value: "Zero Clutter", desc: "Centralized n8n switch routing across 4 tables" },
        { label: "Closed Loop", value: "Auto-Feedback", desc: "Tags winning Meta ad hooks to train future copy" }
      ],
      comparisons: [
        {
          metric: "Copy Positioning",
          before: "Generic corporate buzzwords treated like e-commerce discount products",
          after: "Peer-to-peer technical framing addressing real developer friction",
          impact: "Captures passive senior builders"
        },
        {
          metric: "Production Turnaround",
          before: "3 to 5 hours per role manually brainstorming hooks, angles, and video scripts",
          after: "Under 60 seconds to generate 5 angles, feed ads, and staged VSL scripts",
          impact: "90% time saved per role"
        },
        {
          metric: "Creative Optimization",
          before: "Zero feedback loop; past campaign learnings lost across scattered ad accounts",
          after: "Simulated Meta Graph API reporting automatically surfaces top hooks",
          impact: "Compound creative improvement"
        },
        {
          metric: "Architecture Cleanliness",
          before: "Tangle of disparate endpoints prone to broken triggers and sync conflicts",
          after: "Single webhook router connected to 4 relational Airtable tables",
          impact: "100% reliable data flow"
        }
      ],
      logs: [
        "AIRTABLE: [TRIGGER] Recruiter checked 'Generate Research & Angles' on Role ID #8042.",
        "N8N_SWITCH: [ROUTER] Payload routed to Branch 1: Candidate Persona & Pain Point Extraction.",
        "GPT_4O: [RESEARCH] Analyzing role notes -> Identified core dev friction: manual release cycles & lack of autonomy.",
        "5_PILLAR_ENGINE: [GENERATE] Produced 5 angles: Security, Career Growth, Work-Life, Earning, Mission.",
        "CODE_NODE: [JS] Unnested response arrays, sanitized null values & calculated metric ratios.",
        "AIRTABLE: [SYNC] Populated 5 records in 'Job Ad Angles' and drafted 2 VSL video scripts.",
        "META_GRAPH_API: [PULL] Parsed omni_complete_registration metrics -> Tagged Angle #3 as 'Winner' (CPA: $14.20)."
      ],
      techStackDetailed: [
        { name: "n8n Canvas", category: "Workflow Orchestration", description: "Powers the whole automation engine, handling centralized routing, data parsing, and multi-branch execution in one clean canvas." },
        { name: "Airtable", category: "Relational Workspace", description: "Serves as the friendly recruiter workspace across 4 relational tables (Job Roles, Job Ad Angles, Job Ad Scripts, Job Ad Performance)." },
        { name: "OpenAI (GPT-4o)", category: "AI Intelligence & Copy", description: "Drives the research and copy, trained with strict rules to avoid corporate buzzwords and focus on real engineering pain points." },
        { name: "JavaScript (Code Nodes)", category: "Data Engineering", description: "Handles array unnesting, custom math formulas, division-by-zero safeguards, and data normalization." },
        { name: "Meta Graph API Schema", category: "Analytics Feedback", description: "Simulates live Meta ad reporting, cleanly unpacking nested conversion action arrays (omni_complete_registration) and string-based numbers." }
      ],
      screenshots: [
        "/assets/Recruiting Job Ads Automation Engine.png",
        "/assets/ad scripts.png",
        "/assets/ad performance.png"
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
        { title: "Semantic Drafting", desc: "Writes customized blog articles and matching social media threads.", iconName: "FileCheck" },
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
      comparisons: [
        {
          metric: "Topic Selection",
          before: "4 hours weekly reading blogs and scrolling news manually",
          after: "Tavily AI crawling trends and identifying keywords",
          impact: "95% news gathering time saved"
        },
        {
          metric: "Multi-Platform Dispatch",
          before: "10 hours manual formatting and logging into schedulers",
          after: "Omnichannel social queue sync on Buffer & Beehiiv APIs",
          impact: "One-click campaign publish"
        },
        {
          metric: "Publishing Cadence",
          before: "Inconsistent posting leading to engagement flatlines",
          after: "Structured weekly loops running automatically on Autopilot",
          impact: "3.5k+ organic impressions boost/mo"
        },
        {
          metric: "Founder Action Needed",
          before: "15 hours/week manual content creation and prep work",
          after: "Fully autonomous background pipelines requiring zero clicks",
          impact: "15 hours fully saved"
        }
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

  if (title === "Hisaab AI") {
    return {
      ...defaultDetails,
      hook: "AI-powered personal finance ledger and multi-modal financial assistant engineered specifically for the Pakistani economic landscape.",
      purposeSummary: "Hisaab AI is an AI-powered personal finance management application and smart ledger engineered specifically for the Pakistani economic and financial landscape (PKR — Pakistani Rupee). It bridges modern multi-modal AI with everyday Pakistani personal finance challenges—such as fluctuating utility tariffs (K-Electric, LESCO, SSGC), fuel inflation, rashan (grocery) planning, mobile wallet tracking (JazzCash, Easypaisa, SadaPay, NayaPay), and traditional savings structures like Kameti (ROSCA). The application enables users to track daily expenses, digitize paper receipts via OCR, parse incoming Pakistani banking SMS alerts automatically, calculate financial health metrics, and consult an interactive bilingual AI financial coach.",
      problem: "Pakistani households and professionals face severe inflationary pressure, volatile utility tariffs, and fragmented spending across cash, paper receipts, and multiple mobile wallets (Easypaisa, JazzCash, SadaPay, NayaPay). Conventional Western budgeting apps lack PKR currency support, cannot parse Urdu or Pakistani banking SMS formats, fail to track ROSCA/Kameti savings pools, and offer zero localized financial advice.",
      solution: "Engineered a localized, full-stack personal finance platform powered by Google GenAI (Gemini 3.7 Flash). Hisaab AI features a 0-100 real-time Financial Health Score, automated Urdu/English bank SMS and receipt digitizer, Kameti committee tracker, localized rashan and fuel budget calculators, and an empathetic bilingual AI financial coach named 'Aura'.",
      features: [
        { title: "Financial Health Score (0–100)", desc: "Evaluates monthly savings rates, fixed vs. variable obligations, and recurring cash-flow balance.", iconName: "Activity" },
        { title: "Smart Multi-modal Receipt Scanner", desc: "Extracts vendor name, date, line items, and total PKR directly from crumpled paper receipts using Gemini Vision OCR.", iconName: "FileCheck" },
        { title: "Pakistani Bank SMS Auto-Parser", desc: "Pastes and parses SMS alerts from Meezan, HBL, Bank Alfalah, JazzCash, and Easypaisa into structured ledger entries.", iconName: "Layers" },
        { title: "Bilingual AI Advisor 'Aura'", desc: "Empathetic financial assistant delivering advice in fluent Urdu, English, and Roman Urdu with voice playback.", iconName: "Terminal" },
        { title: "Kameti & ROSCA Goal Tracker", desc: "Monitors traditional rotating savings clubs, monthly payouts, drawing schedules, and individual member shares.", iconName: "TrendingUp" },
        { title: "Interactive Analytics & Breakdown", desc: "Recharts cash-flow projections, category distributions, monthly burn rate, and daily spend trends.", iconName: "Database" }
      ],
      howItWorksSteps: [
        { step: "01", title: "Instant Ledger & SMS Input", desc: "Log cash transactions manually or paste raw SMS notifications from Pakistani banks and mobile wallets for instant parsing." },
        { step: "02", title: "Multi-modal OCR & AI Extraction", desc: "Gemini 3.7 Flash analyzes uploaded receipt photos to identify merchants, line items, and taxes with sub-second latency." },
        { step: "03", title: "Localized Financial Health & Coaching", desc: "Algorithms calculate your dynamic 0–100 financial health rating while 'Aura' delivers hyper-localized budgeting strategies in Urdu or English." }
      ],
      metrics: [
        { label: "100%", value: "PKR Native", desc: "Engineered for Pakistani rupee & localized expense categories" },
        { label: "<1.2s", value: "Receipt OCR", desc: "Instant multimodal receipt digitization via Gemini 3.7 Flash" },
        { label: "Bilingual", value: "Urdu & English", desc: "Natural conversational AI coaching in Roman Urdu, Urdu & English" }
      ],
      comparisons: [
        {
          metric: "Receipt & Bill Digitization",
          before: "Manual ledger entry of crumpled Urdu/English grocery receipts",
          after: "One-click Gemini 3.7 Flash Vision OCR parses merchant, date, and items",
          impact: "95% manual data entry eliminated"
        },
        {
          metric: "Bank Notification Tracking",
          before: "Scattered SMS alerts across JazzCash, Easypaisa, SadaPay & Banks",
          after: "Instant SMS clipboard parser auto-categorizes debit/credit entries",
          impact: "100% unified multi-wallet transaction sync"
        },
        {
          metric: "Traditional Savings (Kameti)",
          before: "Handwritten paper diaries tracking committee turns and monthly dues",
          after: "Dedicated digital Kameti tracker with payout dates and member status",
          impact: "Zero missed contribution cycles"
        },
        {
          metric: "Financial Guidance Quality",
          before: "Generic Western budgeting tips that ignore local fuel and utility inflation",
          after: "Localized Pakistani advice factoring K-Electric tariffs and rashan costs",
          impact: "Contextual advice tailored to Pakistan's economy"
        }
      ],
      logs: [
        "HISAAB_CORE: [BOOT] Initializing PKR currency ledger & localized schemas.",
        "GEMINI_VISION: [OCR] Receipt uploaded: 'Metro Cash & Carry' — PKR 8,450 categorized to Grocery/Rashan.",
        "SMS_PARSER: [REGEX] Parsed Meezan Bank SMS: 'Acct **1029 debited PKR 2,500 at Shell Petroleum'.",
        "AURA_AI: [ADVICE] Generated bilingual insight: 'K-Electric bill is 18% above seasonal baseline.'",
        "LEDGER: [SYNC] Financial health score updated to 78/100."
      ],
      techStackDetailed: [
        { name: "React 19 & Vite 6", category: "Frontend Core", description: "Ultra-fast reactive interface built with modern React 19 architecture." },
        { name: "Google GenAI SDK", category: "AI & Multimodal OCR", description: "Gemini 3.7 Flash powers multimodal receipt scanning and Aura's bilingual financial coaching." },
        { name: "Tailwind CSS v4", category: "UI & Styling", description: "Tailwind v4 utility system with custom dark mode and Pakistani cultural color accents." },
        { name: "Recharts", category: "Data Visualization", description: "Interactive cash-flow charts, category breakdowns, and monthly burn-rate analytics." },
        { name: "Express 4", category: "API Backend", description: "Lightweight proxy server securely channeling AI requests and rate limiting." }
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
        { title: "Web Profiling", desc: "Firecrawl gathers LinkedIn and professional footprints in seconds.", iconName: "Monitor" },
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
      comparisons: [
        {
          metric: "Lead Profiling",
          before: "Agents answering client calls blind, guessing buyer profiles",
          after: "Instant Firecrawl background professional lookup",
          impact: "Immediate buyer context"
        },
        {
          metric: "Call Audits",
          before: "Scribbling notes on paper, losing crucial requirements",
          after: "Deepgram Nova-2 sub-second transcription and database sync",
          impact: "12k+ call logs processed"
        },
        {
          metric: "Lead Qualification",
          before: "Unstructured, subjective rating of customer intent",
          after: "AI Gateway semantic profiling and budget interest scoring",
          impact: "98% classification rate"
        },
        {
          metric: "Pitch Preparation",
          before: "10+ mins searching files for matching properties",
          after: "Immediate matched recommendations during active calls",
          impact: "185% agent prep velocity"
        }
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
        { title: "Memo-to-Post", desc: "Renders rough draft thoughts into structured promotional copy.", iconName: "FileCheck" },
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
      comparisons: [
        {
          metric: "Idea Transformation",
          before: "Staring at a blank screen for hours writing outlines",
          after: "Instant voice-memo to high-converting blog post write-up",
          impact: "8x writing acceleration"
        },
        {
          metric: "Social Repurposing",
          before: "Rewriting content manually for 3+ different channels",
          after: "Automated generation of diverse, optimized channel formats",
          impact: "One-click omnichannel presence"
        },
        {
          metric: "Queue Execution",
          before: "Logging into 4 systems weekly to manually schedule dates",
          after: "Autonomous scheduled posting with no designer checks",
          impact: "250+ posts sent seamlessly"
        },
        {
          metric: "Weekly Time Spent",
          before: "10 hours per week spent typing social copy drafts",
          after: "Full automated pipeline triggered from draft notes",
          impact: "Reclaimed 10 hours/week"
        }
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
        { title: "Smart PDF Shredder", desc: "Analyzes uploaded research papers and lecture notes instantly.", iconName: "FileCheck" },
        { title: "Custom Quizzes", desc: "Generates multiple-choice and key terms flashcards on your course topics.", iconName: "Activity" },
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
      ],
      comparisons: [
        {
          metric: "Syllabus Processing",
          before: "Manual reading & highlighting dense chapters for 3-4 hours",
          after: "Instant smart parsing and definition extraction via Gemini",
          impact: "90% faster study prep"
        },
        {
          metric: "Quiz Generation",
          before: "Manually writing flashcards or practicing with static textbooks",
          after: "AI-generated custom dynamic multiple-choice quizzes",
          impact: "15,000+ quizzes created"
        },
        {
          metric: "Study Fatigue",
          before: "Sifting through unorganized PDF files with zero visual aid",
          after: "Structured bite-sized study guides and visual definitions",
          impact: "92% conceptual retention"
        },
        {
          metric: "Preparation Velocity",
          before: "4.5 hours spent summarizing each complex textbook chapter",
          after: "Instant custom study materials ready in under 10 seconds",
          impact: "4.5 hours saved per chapter"
        }
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
        { title: "AI Visual Landmark check", desc: "Analyzes real-time snapshots of room plates to identify precisely where you are.", iconName: "Eye" },
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
      ],
      comparisons: [
        {
          metric: "Position Detection",
          before: "Asking strangers or staring at confusing offline maps",
          after: "Sub-3-second camera plate recognition via Gemini API",
          impact: "Instant location awareness"
        },
        {
          metric: "Routing Instructions",
          before: "Fragmented or outdated paper/static floor plans",
          after: "Smooth 3D browser-based overlays routing to classrooms",
          impact: "10x navigation confidence"
        },
        {
          metric: "User Friction",
          before: "Required heavy app store downloads and device permissions",
          after: "Instant mobile web-app execution directly in Safari or Chrome",
          impact: "0 application installs needed"
        },
        {
          metric: "Late Class Arrival",
          before: "Students missing lectures wandering halls for 10-15 mins",
          after: "Fast elevator-and-stairway routes with real-time updates",
          impact: "1,200+ students guided safely"
        }
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
        { title: "Niche Copy Generation", desc: "Drafts tailored headlines, benefit lists, and call-to-actions based on your product.", iconName: "FileCheck" },
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
      ],
      comparisons: [
        {
          metric: "Copy Brainstorming",
          before: "Struggling to write punchy headers for 4+ hours",
          after: "Gemini-generated high-converting headlines and AIDA copy",
          impact: "4.8x draft speed multiplication"
        },
        {
          metric: "Design Feedback",
          before: "Writing in text editors without seeing visual layout context",
          after: "Interactive live preview wireframes rendered instantly",
          impact: "Zero visual guessing"
        },
        {
          metric: "Export Friction",
          before: "Manually reformatting or copy-pasting structured copy sections",
          after: "One-click copy-to-clipboard blocks formatted for web layout",
          impact: "8,200+ heads compiled safely"
        },
        {
          metric: "Marketing Alignment",
          before: "Generic blocks that fail to connect with target user needs",
          after: "Structured psychological templates matching chosen tone",
          impact: "High-converting copies"
        }
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
        { title: "AI Recipe Suggestions", desc: "Gemini recommends traditional sides and desserts to match your selected order.", iconName: "HeartHandshake" },
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
      ],
      comparisons: [
        {
          metric: "Order Processing",
          before: "Fragmented, messy chat orders over phone calls and screenshots",
          after: "Structured digital catalog compiling details into WhatsApp checkout",
          impact: "Zero manual order loss"
        },
        {
          metric: "Commission Fees",
          before: "Losing 15% to 30% revenue to high third-party food app fees",
          after: "100% direct customer connections over WhatsApp channels",
          impact: "Zero intermediary fee cost"
        },
        {
          metric: "Cart Math",
          before: "Chef manually calculating portion prices and total delivery sums",
          after: "Dynamic in-app catalog automatically tracking portion changes",
          impact: "100% pricing precision"
        },
        {
          metric: "Menu Enrichment",
          before: "Repetitive, static menus with no custom side pairing tips",
          after: "AI-driven local dessert and side dish pairing suggestions",
          impact: "High customer satisfaction rating"
        }
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
      { title: "Intelligent Extraction", desc: "Utilizes advanced data parsing to extract customer insights instantly.", iconName: "Activity" },
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
              <Activity size={11} />
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

  // States for Editing Features
  const [editingFeatureIndex, setEditingFeatureIndex] = useState<number | null>(null);
  const [editFeatureTitle, setEditFeatureTitle] = useState("");
  const [editFeatureDesc, setEditFeatureDesc] = useState("");
  const [editFeatureIcon, setEditFeatureIcon] = useState("Activity");

  // State for Creating a Feature
  const [isCreatingFeature, setIsCreatingFeature] = useState(false);
  const [newFeatureTitle, setNewFeatureTitle] = useState("");
  const [newFeatureDesc, setNewFeatureDesc] = useState("");
  const [newFeatureIcon, setNewFeatureIcon] = useState("Cpu");

  // Screenshots slider / gallery index
  const [activeScreenshotIndex, setActiveScreenshotIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
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
        
        // Ensure screenshots always fall back to defaults if empty or invalid,
        // and merge any new default screenshots so visitors with older cached state see all images
        const defaultScreenshots = (defaults.screenshots && defaults.screenshots.length > 0)
          ? defaults.screenshots
          : (project.previewImage ? [project.previewImage] : []);

        let validScreenshots = (Array.isArray(parsed.screenshots) && parsed.screenshots.length > 0)
          ? parsed.screenshots 
          : defaultScreenshots;

        if (defaultScreenshots.length > 0) {
          const missingDefaults = defaultScreenshots.filter(d => !validScreenshots.includes(d));
          if (missingDefaults.length > 0) {
            validScreenshots = [...validScreenshots, ...missingDefaults];
          }
        }

        const merged: CaseStudyDetails = {
          ...defaults,
          ...parsed,
          screenshots: validScreenshots
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
        <Bot size={48} className="text-indigo-400 mb-4" />
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
          const currentScreenshots = (Array.isArray(details.screenshots) && details.screenshots.length > 0)
            ? details.screenshots
            : (allScreenshots.length > 0 ? allScreenshots : []);
          const updatedScreenshots = [...currentScreenshots, ...uploadedUrls];
          saveField('screenshots', updatedScreenshots);
          setActiveScreenshotIndex(updatedScreenshots.length - 1);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteScreenshot = (indexToDelete: number, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const currentList = Array.isArray(details?.screenshots)
      ? details.screenshots
      : (project.previewImage ? [project.previewImage] : []);
    const updated = currentList.filter((_, idx) => idx !== indexToDelete);
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
    setNewFeatureIcon("Cpu");
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
  const defaultScreenshots = (project ? getCaseStudyDefaults(project).screenshots : []) || [];
  const allScreenshots = (Array.isArray(details.screenshots) && details.screenshots.length > 0)
    ? details.screenshots
    : (defaultScreenshots.length > 0 
        ? defaultScreenshots 
        : (project.previewImage ? [project.previewImage] : []));
  const safeIndex = activeScreenshotIndex < allScreenshots.length ? activeScreenshotIndex : 0;
  const screenshotCount = allScreenshots.length;

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
        </div>
      </header>

      <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-8 sm:py-12">
        
        {/* 3. HERO & METADATA SECTION */}
        <section className="relative p-6 sm:p-12 bg-gradient-to-b from-[#090D16] to-slate-950 border border-slate-900 rounded-3xl overflow-hidden mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-dot-pattern opacity-15 pointer-events-none"></div>
          <div className="max-w-4xl relative z-10">
            {/* Category Tag */}
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${themeColors.bg} ${themeColors.primary} text-xs font-bold uppercase tracking-wider mb-5 border ${themeColors.border} ${themeColors.glow}`}>
              <Layers size={11} />
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
              <p className="text-slate-300 text-base sm:text-xl leading-relaxed mb-6 font-medium">
                {details.hook}
              </p>
            )}

            {/* Comprehensive Purpose of the Project Section */}
            {details.purposeSummary && (
              <div className="mb-8 p-5 sm:p-6 bg-slate-900/70 border border-slate-800/80 rounded-2xl backdrop-blur-sm shadow-inner">
                <div className="flex items-center gap-2 mb-3 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <ShieldAlert size={14} />
                  <span>Purpose of the Project</span>
                </div>
                <div className="space-y-3 text-slate-200 text-sm sm:text-base leading-relaxed">
                  {details.purposeSummary.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
                {details.keyHighlights && details.keyHighlights.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-slate-800/80">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                      Key Highlights & Architecture
                    </p>
                    <ul className="space-y-2">
                      {details.keyHighlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <CheckCircle size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
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

        {/* VOICE CALL RECORDING & SYNCHRONIZED TRANSCRIPT CONSOLE */}
        {project.category === "Voice AI" && (
          <section className="mb-12">
            <div className="mb-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-sans">Production Voice Call Proof</span>
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2 mt-0.5 font-sans">
                <Headphones size={18} className="text-emerald-400" />
                Live Agent Call Audio & Interactive Synchronized Transcript
              </h3>
            </div>
            
            <VoiceCallTranscriptPlayer project={project} />
          </section>
        )}

        {/* 4. SYSTEM ARCHITECTURE & FULL PRODUCTION WORKFLOW CANVAS / DATABASE VIEW */}
        {allScreenshots.length > 0 && (
          <section className="bg-slate-900/10 border border-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden mb-12">
            <div className="absolute inset-0 bg-dot-pattern opacity-5 pointer-events-none"></div>

            {/* Hidden file input for uploading Airtable & workflow screenshots */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              multiple 
              className="hidden" 
            />

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-sans">
                  Production Architecture & Database View
                </span>
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2 mt-0.5 font-sans">
                  <Terminal size={18} className={themeColors.primary} />
                  {project.title === "Automated Recruitment Ad Engine" 
                    ? "Workflow Canvas & Database Architecture" 
                    : project.title === "AI Booking Voice Receptionist for Restaurants"
                      ? "Voice Pipeline & Reservation Workflow Gallery"
                      : "Application Interface & Production Architecture"}
                </h3>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 bg-slate-950/60 border border-slate-900 px-3.5 py-1.5 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">
                    Production Live System
                  </span>
                </div>
              </div>
            </div>

            <div>
              {/* Main Full-Visibility Screenshot Window with Carousel Navigation */}
                <div className="rounded-2xl border border-slate-800/80 bg-[#060913] overflow-hidden shadow-2xl relative group">
                  {/* Window Bar */}
                  <div className="bg-slate-950/90 border-b border-slate-800/80 px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block shrink-0"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block shrink-0"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block shrink-0"></span>
                      <span className="ml-2 text-[11px] font-mono text-slate-400 font-semibold truncate max-w-xs sm:max-w-md">
                        {decodeURIComponent(allScreenshots[safeIndex]?.split('/').pop() || project.title)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* Delete Current Screenshot Button - Only in Edit Mode */}
                      {editMode && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDeleteScreenshot(safeIndex, e);
                          }}
                          className="px-2.5 py-1 rounded bg-red-950/80 hover:bg-red-600 text-red-300 hover:text-white transition-all text-[10px] font-mono flex items-center gap-1.5 border border-red-800/80 hover:border-red-500 shadow-sm cursor-pointer"
                          title="Delete current screenshot"
                        >
                          <Trash2 size={12} />
                          <span>Delete Image</span>
                        </button>
                      )}

                      {/* Carousel Status & Next Button in Header if multiple images */}
                      {allScreenshots.length > 1 && (
                        <div className="flex items-center gap-1.5 mr-2">
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                            {safeIndex + 1} / {allScreenshots.length}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveScreenshotIndex((prev) => (prev + 1) % allScreenshots.length);
                            }}
                            className="px-2.5 py-1 rounded bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white transition-all text-[10px] font-mono flex items-center gap-1 border border-indigo-500/40"
                            title="Transition to next screenshot"
                          >
                            <span>Next Image</span>
                            <ChevronRight size={12} />
                          </button>
                        </div>
                      )}

                      <button
                        onClick={() => setIsLightboxOpen(true)}
                        className="px-2 py-1 rounded bg-slate-900 text-slate-400 hover:text-white transition-colors text-[10px] font-mono flex items-center gap-1 border border-slate-800"
                        title="View Fullscreen"
                      >
                        <Maximize2 size={12} />
                        <span className="hidden sm:inline">Inspect Full Size</span>
                      </button>
                    </div>
                  </div>

                  {/* Complete Full-Visibility Image with Left/Right Nav Arrows */}
                  <div 
                    className="w-full bg-[#04060C] flex items-center justify-center p-2 sm:p-4 relative cursor-zoom-in min-h-[300px]"
                    onClick={() => setIsLightboxOpen(true)}
                    title="Click to view in full resolution"
                  >
                    {/* Previous Image Arrow Button */}
                    {allScreenshots.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveScreenshotIndex((prev) => (prev - 1 + allScreenshots.length) % allScreenshots.length);
                        }}
                        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/85 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-400 text-white flex items-center justify-center shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95"
                        title="Previous screenshot (←)"
                      >
                        <ChevronLeft size={20} />
                      </button>
                    )}

                    {/* Next Image Arrow Button (Moves to the right side screenshot) */}
                    {allScreenshots.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveScreenshotIndex((prev) => (prev + 1) % allScreenshots.length);
                        }}
                        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/85 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-400 text-white flex items-center justify-center shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95"
                        title="Next screenshot (→)"
                      >
                        <ChevronRight size={20} />
                      </button>
                    )}

                    {/* Image with smooth fade-in transition */}
                    <img 
                      key={safeIndex}
                      src={allScreenshots[safeIndex]} 
                      alt={`${project.title} Screenshot ${safeIndex + 1}`} 
                      className="w-full h-auto max-h-[850px] object-contain rounded-lg transition-transform duration-300 hover:scale-[1.005] animate-[fadeIn_0.3s_ease-in-out]"
                    />
                  </div>

                  {/* Dot Indicators for Multi-Screenshot Switching */}
                  {allScreenshots.length > 1 && (
                    <div className="bg-slate-950/90 border-t border-slate-800/80 py-2.5 px-4 flex justify-center items-center gap-2">
                      {allScreenshots.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveScreenshotIndex(idx)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            idx === safeIndex 
                              ? "w-7 bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" 
                              : "w-2 bg-slate-700 hover:bg-slate-500"
                          }`}
                          title={`Jump to view ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Multi-Screenshot Thumbnails & Switcher Row */}
                {allScreenshots.length > 1 && (
                  <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-2">
                    {allScreenshots.map((src, idx) => (
                      <div key={idx} className="relative group/thumb shrink-0">
                        <button
                          onClick={() => setActiveScreenshotIndex(idx)}
                          className={`relative rounded-xl overflow-hidden border-2 transition-all block w-32 h-20 bg-slate-950 text-left ${
                            idx === safeIndex 
                              ? "border-indigo-500 shadow-lg scale-105" 
                              : "border-slate-800 opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img src={src} alt={`Thumbnail ${idx + 1}`} className="w-full h-14 object-cover object-top" />
                          <div className="bg-slate-950/95 text-[9px] text-slate-300 px-2 py-1 truncate font-mono flex items-center justify-between">
                            <span>
                              {src.toLowerCase().includes('performance')
                                ? "Ad Performance"
                                : src.toLowerCase().includes('script')
                                  ? "Ad Scripts"
                                  : src.toLowerCase().includes('recruiting') || src.toLowerCase().includes('canvas') || idx === 0
                                    ? "n8n Canvas"
                                    : src.toLowerCase().includes('airtable')
                                      ? "Airtable Base"
                                      : `View ${idx + 1}`}
                            </span>
                            {idx === safeIndex && (
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                            )}
                          </div>
                        </button>
                        {/* Delete button on thumbnail - Only in Edit Mode */}
                        {editMode && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDeleteScreenshot(idx, e);
                            }}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center opacity-85 hover:opacity-100 group-hover/thumb:opacity-100 transition-opacity shadow-md z-10 border border-slate-900 cursor-pointer"
                            title="Delete this screenshot"
                          >
                            <X size={10} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
          </section>
        )}

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

        {/* 6. BUSINESS IMPACT: BEFORE VS. AFTER ANALYSIS */}
        <section className="bg-[#090D16]/40 border border-slate-900 rounded-3xl p-6 sm:p-8 mb-12 shadow-xl">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-sans">Key Changes & Benefits</span>
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2 mt-0.5 font-sans">
                <TrendingUp size={16} className={themeColors.primary} />
                The Real Difference: Before vs. After
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-900">
                Category: <span className={themeColors.primary}>{project.category}</span>
              </span>
            </div>
          </div>

          {editMode ? (
            <div className="space-y-4">
              <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider font-sans mb-2">
                ✍️ Customize Comparison Rows
              </div>
              <div className="grid grid-cols-1 gap-4">
                {(details.comparisons || getCaseStudyDefaults(project).comparisons || []).map((item, idx) => (
                  <div key={idx} className="bg-slate-950/60 border border-slate-900 rounded-2xl p-5 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[8px] text-slate-500 uppercase font-bold tracking-wider mb-1">What Improved (e.g., Speed, Time Saved, Cost)</label>
                        <input 
                          type="text"
                          value={item.metric}
                          onChange={(e) => {
                            const newComps = [...(details.comparisons || getCaseStudyDefaults(project).comparisons || [])];
                            newComps[idx] = { ...newComps[idx], metric: e.target.value };
                            saveField('comparisons', newComps);
                          }}
                          className="w-full text-xs font-bold text-indigo-300 bg-slate-900 border border-slate-800 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] text-slate-500 uppercase font-bold tracking-wider mb-1">What We Saved or Achieved</label>
                        <input 
                          type="text"
                          value={item.impact}
                          onChange={(e) => {
                            const newComps = [...(details.comparisons || getCaseStudyDefaults(project).comparisons || [])];
                            newComps[idx] = { ...newComps[idx], impact: e.target.value };
                            saveField('comparisons', newComps);
                          }}
                          className="w-full text-xs font-bold text-emerald-300 bg-slate-900 border border-slate-800 rounded-lg p-2.5 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[8px] text-slate-500 uppercase font-bold tracking-wider mb-1">The Old Way (Manual steps or limits)</label>
                        <textarea 
                          value={item.before}
                          onChange={(e) => {
                            const newComps = [...(details.comparisons || getCaseStudyDefaults(project).comparisons || [])];
                            newComps[idx] = { ...newComps[idx], before: e.target.value };
                            saveField('comparisons', newComps);
                          }}
                          className="w-full text-xs text-slate-300 bg-slate-900 border border-slate-800 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500"
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] text-slate-500 uppercase font-bold tracking-wider mb-1">The New Way (Automated with AI)</label>
                        <textarea 
                          value={item.after}
                          onChange={(e) => {
                            const newComps = [...(details.comparisons || getCaseStudyDefaults(project).comparisons || [])];
                            newComps[idx] = { ...newComps[idx], after: e.target.value };
                            saveField('comparisons', newComps);
                          }}
                          className="w-full text-xs text-slate-300 bg-slate-900 border border-slate-800 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500"
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-slate-950/40 border border-slate-900 rounded-xl text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                <div className="col-span-3">Area of Improvement</div>
                <div className="col-span-4 flex items-center gap-1.5 text-red-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  The Old Way (Manual)
                </div>
                <div className="col-span-3 flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  The New Way (Automated)
                </div>
                <div className="col-span-2 text-right">What Improved</div>
              </div>

              {/* Comparison Rows */}
              <div className="space-y-3 sm:space-y-4">
                {(details.comparisons || getCaseStudyDefaults(project).comparisons || []).map((item, idx) => (
                  <div 
                    key={idx} 
                    className="group border border-slate-900 bg-slate-950/20 hover:border-slate-800/80 rounded-2xl p-5 md:p-6 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Glowing highlight row overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                    {/* Desktop Responsive Row */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center relative z-10">
                      {/* Metric Title Column */}
                      <div className="md:col-span-3 flex items-center gap-2.5">
                        <div className={`w-1.5 h-8 rounded-full ${themeColors.bg} shrink-0`} />
                        <div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-sans">Improvement {idx + 1}</span>
                          <span className="text-sm font-bold text-white tracking-tight leading-snug block font-sans">
                            {item.metric}
                          </span>
                        </div>
                      </div>

                      {/* Before Column */}
                      <div className="md:col-span-4 bg-red-950/5 border border-red-950/20 rounded-xl p-3 flex gap-2.5 items-start">
                        <div className="w-4 h-4 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5 text-red-400 text-[10px] font-bold font-mono">
                          ×
                        </div>
                        <div>
                          <span className="text-[9px] font-extrabold text-red-400/80 uppercase tracking-widest block font-sans">Old Way (Manual)</span>
                          <p className="text-slate-300 text-xs leading-relaxed font-sans mt-1 font-light">
                            {item.before}
                          </p>
                        </div>
                      </div>

                      {/* After Column */}
                      <div className="md:col-span-3 bg-emerald-950/5 border border-emerald-950/20 rounded-xl p-3 flex gap-2.5 items-start">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400 text-[10px]">
                          ✓
                        </div>
                        <div>
                          <span className="text-[9px] font-extrabold text-emerald-400/80 uppercase tracking-widest block font-sans">New Way (Automated)</span>
                          <p className="text-slate-300 text-xs leading-relaxed font-sans mt-1 font-light">
                            {item.after}
                          </p>
                        </div>
                      </div>

                      {/* Impact Highlight Column */}
                      <div className="md:col-span-2 text-left md:text-right flex md:flex-col justify-between md:justify-center items-center md:items-end border-t border-slate-900 md:border-t-0 pt-3 md:pt-0 gap-2">
                        <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest md:hidden font-sans font-bold">Result:</span>
                        <div className="text-right">
                          <span className={`text-sm font-extrabold tracking-tight ${themeColors.primary} block font-sans`}>
                            {item.impact}
                          </span>
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mt-0.5 font-sans">Improvement</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
              const StageIcon = icons[idx] || CheckCircle;
              
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
              const IconComp = ICON_MAP[feat.iconName] || Cpu;
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

      {/* Lightbox Modal for Full Resolution Screenshot Inspection */}
      {isLightboxOpen && allScreenshots.length > 0 && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="flex justify-between items-center text-slate-300 max-w-7xl mx-auto w-full">
            <span className="text-xs font-mono font-bold text-slate-400">
              {project.title} • {safeIndex + 1} of {allScreenshots.length}
            </span>
            <div className="flex items-center gap-2">
              {editMode && (
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDeleteScreenshot(safeIndex, e);
                    if (allScreenshots.length <= 1) {
                      setIsLightboxOpen(false);
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-red-950/80 hover:bg-red-600 text-red-200 hover:text-white transition-colors border border-red-800/80 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                  title="Delete this screenshot"
                >
                  <Trash2 size={13} />
                  <span>Delete Image</span>
                </button>
              )}
              <button 
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-800"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="flex-grow flex items-center justify-center p-2 sm:p-4 overflow-auto relative">
            {allScreenshots.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveScreenshotIndex((prev) => (prev - 1 + allScreenshots.length) % allScreenshots.length);
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-slate-900/90 hover:bg-indigo-600 text-white flex items-center justify-center border border-slate-700 transition-all hover:scale-110 active:scale-95"
                title="Previous (←)"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            <img 
              key={safeIndex}
              src={allScreenshots[safeIndex]} 
              alt={project.title} 
              className="max-w-full max-h-[88vh] object-contain rounded-xl shadow-2xl animate-[fadeIn_0.2s_ease-in-out]"
              onClick={(e) => e.stopPropagation()}
            />

            {allScreenshots.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveScreenshotIndex((prev) => (prev + 1) % allScreenshots.length);
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-slate-900/90 hover:bg-indigo-600 text-white flex items-center justify-center border border-slate-700 transition-all hover:scale-110 active:scale-95"
                title="Next (→)"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>
          <div className="text-center text-xs text-slate-500 font-mono">
            Click anywhere or press close to exit full screen view
          </div>
        </div>
      )}
    </div>
  );
};
