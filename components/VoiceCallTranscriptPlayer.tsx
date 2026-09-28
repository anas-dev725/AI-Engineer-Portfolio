import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Mic, 
  Bot, 
  User, 
  Copy, 
  Check, 
  Clock, 
  MessageSquareQuote, 
  Activity, 
  CheckCircle2, 
  PhoneCall, 
  Radio,
  Share2
} from 'lucide-react';
import { Project } from '../types';

interface DialogueLine {
  id: number;
  sender: 'agent' | 'user';
  speakerLabel: string;
  time: string;
  timestampSec: number;
  durationSec: number;
  text: string;
  note?: string;
}

interface ScriptConfig {
  callTitle: string;
  telephonyProvider: string;
  latency: string;
  languages: string[];
  callOutcome: {
    action: string;
    system: string;
    details: string;
  };
  dialogue: DialogueLine[];
}

const VOICE_PROJECT_SCRIPTS: Record<string, ScriptConfig> = {
  "Inbound Dispatch Voice Agent": {
    callTitle: "Inbound Trade Intake & Dispatch Triage (Austin, TX)",
    telephonyProvider: "Retell AI + Make.com + Val.town Engine",
    latency: "390ms Turnaround",
    languages: ["English (Austin, TX Regional)"],
    callOutcome: {
      action: "Trade Diagnosed & Available Windows Offered",
      system: "Make.com + OSRM Transit Engine + GCal API",
      details: "Trade: HVAC • Address geocoded (South Congress) • 11.4 min road transit verified • 1-out-of-2-hour window rule approved"
    },
    dialogue: [
      {
        id: 1,
        sender: 'agent',
        speakerLabel: 'Alex (Ufound Mechanical Dispatch)',
        time: '0:00',
        timestampSec: 0,
        durationSec: 5,
        text: "Thanks for calling Ufound Mechanical. This is Alex in dispatch. How can we help you out today?",
        note: "Natural Diagnostic Intake"
      },
      {
        id: 2,
        sender: 'user',
        speakerLabel: 'Caller (Sarah)',
        time: '0:05',
        timestampSec: 5,
        durationSec: 8,
        text: "Hi Alex, yeah, our central AC completely stopped blowing cold air this morning and the condenser unit outside is making a buzzing sound.",
        note: "Messy Problem Description"
      },
      {
        id: 3,
        sender: 'agent',
        speakerLabel: 'Alex (Ufound Mechanical Dispatch)',
        time: '0:13',
        timestampSec: 13,
        durationSec: 7,
        text: "Got it, that sounds like a capacitor or fan motor issue on your HVAC unit. To check technician availability in your neighborhood, what's the service address?",
        note: "Trade Classified as HVAC"
      },
      {
        id: 4,
        sender: 'user',
        speakerLabel: 'Caller (Sarah)',
        time: '0:20',
        timestampSec: 20,
        durationSec: 6,
        text: "Sure, it's 2410 South Congress Avenue, right here in Austin.",
        note: "Service Address Provided"
      },
      {
        id: 5,
        sender: 'agent',
        speakerLabel: 'Alex (Ufound Mechanical Dispatch)',
        time: '0:26',
        timestampSec: 26,
        durationSec: 8,
        text: "Thanks Sarah. Give me just one moment while I check our HVAC tech schedule and drive times near South Congress...",
        note: "Triggering check_available_slots"
      },
      {
        id: 6,
        sender: 'agent',
        speakerLabel: 'Alex (Ufound Mechanical Dispatch)',
        time: '0:34',
        timestampSec: 34,
        durationSec: 9,
        text: "Thanks for waiting! For our HVAC specialist, I have an open 2-hour arrival window tomorrow between 10:00 AM and 12:00 PM, or Thursday between 1:00 PM and 3:00 PM. Would either of those work for you?",
        note: "OSRM Transit & 1-hr Rule Verified"
      },
      {
        id: 7,
        sender: 'user',
        speakerLabel: 'Caller (Sarah)',
        time: '0:43',
        timestampSec: 43,
        durationSec: 4,
        text: "Tomorrow between 10:00 AM and 12:00 PM would be great.",
        note: "Caller Selects Preferred Window"
      },
      {
        id: 8,
        sender: 'agent',
        speakerLabel: 'Alex (Ufound Mechanical Dispatch)',
        time: '0:47',
        timestampSec: 47,
        durationSec: 8,
        text: "Perfect. I've noted that preference along with your system details. Our dispatch team will review the ticket and follow up shortly with your final confirmation. Thanks for calling Ufound Mechanical!",
        note: "Clean Hand-off to Human Dispatch"
      }
    ]
  },
  "24/7 Emergency Trade Dispatcher Agent": {
    callTitle: "Emergency Water Leak Triage & Dispatch (Toronto, ON)",
    telephonyProvider: "Twilio + Retell AI + Deepgram Nova-2",
    latency: "380ms Turnaround",
    languages: ["English (GTA Regional)"],
    callOutcome: {
      action: "Emergency Technician Dispatched",
      system: "Cal.com API + SMS Dispatched",
      details: "Water shut-off instructions confirmed • $99 CAD diagnostic fee agreed • Slot committed on Cal.com in 1.4s"
    },
    dialogue: [
      {
        id: 1,
        sender: 'agent',
        speakerLabel: 'Jason (Apex Emergency Dispatch)',
        time: '0:00',
        timestampSec: 0,
        durationSec: 14,
        text: "Hi, thanks for calling Apex Home Services emergency dispatch, this is Jason. I handle urgent plumbing, heating, and electrical calls across the GTA. What's going on?",
        note: "Zero-Latency Triage Intake"
      },
      {
        id: 2,
        sender: 'user',
        speakerLabel: 'Caller (David)',
        time: '0:14',
        timestampSec: 14,
        durationSec: 20,
        text: "Hi. Actually, my basement is flooding right now. No. Actually, this one is flooding right now. And actually, one of the basement pipe has, like, burst under my laundry. And water is literally spraying everywhere. Don't know what to...",
        note: "Active Flooding Crisis Reported"
      },
      {
        id: 3,
        sender: 'agent',
        speakerLabel: 'Jason (Apex Emergency Dispatch)',
        time: '0:34',
        timestampSec: 34,
        durationSec: 15,
        text: "First, let's stop the water—please go find your main water shut-off valve and turn it off right now if it's safe to reach. That will stop the flooding while we get a technician out to you. Are you able to do that, or is someone else there who can?",
        note: "Immediate Safety Mitigation Protocol"
      },
      {
        id: 4,
        sender: 'user',
        speakerLabel: 'Caller (David)',
        time: '0:49',
        timestampSec: 49,
        durationSec: 6,
        text: "Okay. Yeah. I can tell him whether he can turn off the valve.",
        note: "Mitigation Action Initiated"
      },
      {
        id: 5,
        sender: 'agent',
        speakerLabel: 'Jason (Apex Emergency Dispatch)',
        time: '0:55',
        timestampSec: 55,
        durationSec: 9,
        text: "Got it. Understood, let's get a technician dispatched to your home. What is the full street address and city where you need service?",
        note: "Address Verification"
      },
      {
        id: 6,
        sender: 'user',
        speakerLabel: 'Caller (David)',
        time: '1:04',
        timestampSec: 64,
        durationSec: 6,
        text: "It is actually one four one four five Kings Street, Toronto.",
        note: "Initial Address Stated"
      },
      {
        id: 7,
        sender: 'agent',
        speakerLabel: 'Jason (Apex Emergency Dispatch)',
        time: '1:10',
        timestampSec: 70,
        durationSec: 6,
        text: "Let me just confirm that—14145 Kings Street in Toronto... is that right?",
        note: "Address Sanity Check"
      },
      {
        id: 8,
        sender: 'user',
        speakerLabel: 'Caller (David)',
        time: '1:16',
        timestampSec: 76,
        durationSec: 4,
        text: "No. Only one four five King Street, Toronto.",
        note: "Correction: 145 King St"
      },
      {
        id: 9,
        sender: 'agent',
        speakerLabel: 'Jason (Apex Emergency Dispatch)',
        time: '1:20',
        timestampSec: 80,
        durationSec: 5,
        text: "Perfect, and then one four five King Street in Toronto. Is that correct?",
        note: "Address Confirmed"
      },
      {
        id: 10,
        sender: 'user',
        speakerLabel: 'Caller (David)',
        time: '1:25',
        timestampSec: 85,
        durationSec: 1,
        text: "Yeah.",
        note: "Affirmative"
      },
      {
        id: 11,
        sender: 'agent',
        speakerLabel: 'Jason (Apex Emergency Dispatch)',
        time: '1:26',
        timestampSec: 86,
        durationSec: 4,
        text: "And what is your full name, please?",
        note: "Caller Identity Intake"
      },
      {
        id: 12,
        sender: 'user',
        speakerLabel: 'Caller (David)',
        time: '1:30',
        timestampSec: 90,
        durationSec: 2,
        text: "My name is actually David.",
        note: "Name: David"
      },
      {
        id: 13,
        sender: 'agent',
        speakerLabel: 'Jason (Apex Emergency Dispatch)',
        time: '1:32',
        timestampSec: 92,
        durationSec: 4,
        text: "Let me just confirm that spelling—D-A-V-I-D... is that right?",
        note: "Spelling Check"
      },
      {
        id: 14,
        sender: 'user',
        speakerLabel: 'Caller (David)',
        time: '1:36',
        timestampSec: 96,
        durationSec: 2,
        text: "Yeah. Yeah.",
        note: "Confirmed"
      },
      {
        id: 15,
        sender: 'agent',
        speakerLabel: 'Jason (Apex Emergency Dispatch)',
        time: '1:38',
        timestampSec: 98,
        durationSec: 4,
        text: "What is the best 10-digit callback number for the technician to reach you?",
        note: "Phone Number Query"
      },
      {
        id: 16,
        sender: 'user',
        speakerLabel: 'Caller (David)',
        time: '1:42',
        timestampSec: 102,
        durationSec: 6,
        text: "It's actually four one triple five zero one four two.",
        note: "9-Digit Incomplete Input"
      },
      {
        id: 17,
        sender: 'agent',
        speakerLabel: 'Jason (Apex Emergency Dispatch)',
        time: '1:48',
        timestampSec: 108,
        durationSec: 14,
        text: "Thanks for that. Let me make sure I have that down: 4-1-5-5-5-0-1-4-2 — that’s only nine digits, could you please provide the full 10-digit number?",
        note: "Entity Normalization: Catches 9 Digits"
      },
      {
        id: 18,
        sender: 'user',
        speakerLabel: 'Caller (David)',
        time: '2:02',
        timestampSec: 122,
        durationSec: 4,
        text: "And the six after four one.",
        note: "Missing Digit Clarified (Area Code 416)"
      },
      {
        id: 19,
        sender: 'agent',
        speakerLabel: 'Jason (Apex Emergency Dispatch)',
        time: '2:06',
        timestampSec: 126,
        durationSec: 7,
        text: "Got it, so the full number is 4-1-6-5-5-5-0-1-4-2. Is that correct?",
        note: "GTA Standard Normalized (416-555-0142)"
      },
      {
        id: 20,
        sender: 'user',
        speakerLabel: 'Caller (David)',
        time: '2:13',
        timestampSec: 133,
        durationSec: 11,
        text: "Yeah. Can you please do it? Urgently, I need a technician. As soon as possible so he can fix it and see the problem.",
        note: "High Urgency Re-Affirmed"
      },
      {
        id: 21,
        sender: 'agent',
        speakerLabel: 'Jason (Apex Emergency Dispatch)',
        time: '2:24',
        timestampSec: 144,
        durationSec: 12,
        text: "Of course. Just to be upfront, our emergency diagnostic dispatch fee is $99 Canadian, and that entire amount gets credited toward any repair work you approve on-site. Does that sound good?",
        note: "Commercial Terms Lock: $99 CAD Fee"
      },
      {
        id: 22,
        sender: 'user',
        speakerLabel: 'Caller (David)',
        time: '2:36',
        timestampSec: 156,
        durationSec: 2,
        text: "Yeah.",
        note: "Dispatch Fee Agreed"
      },
      {
        id: 23,
        sender: 'agent',
        speakerLabel: 'Jason (Apex Emergency Dispatch)',
        time: '2:39',
        timestampSec: 159,
        durationSec: 11,
        text: "[Tool Call: check_availability_cal] Let me check the dispatch board real quick... Great news, I have an on-call emergency technician available who can be at your door between 8:00 PM and 9:00 PM today. Does that window work for you?",
        note: "Cal.com Live Slot Query (2.1s)"
      },
      {
        id: 24,
        sender: 'user',
        speakerLabel: 'Caller (David)',
        time: '2:50',
        timestampSec: 170,
        durationSec: 3,
        text: "Do you actually have for seven PM?",
        note: "Earlier Window Requested"
      },
      {
        id: 25,
        sender: 'agent',
        speakerLabel: 'Jason (Apex Emergency Dispatch)',
        time: '2:53',
        timestampSec: 173,
        durationSec: 6,
        text: "Right now, the earliest I can offer is between 8:00 PM and 9:00 PM today. Would that work for you?",
        note: "Dynamic Schedule Guardrail"
      },
      {
        id: 26,
        sender: 'user',
        speakerLabel: 'Caller (David)',
        time: '2:59',
        timestampSec: 179,
        durationSec: 3,
        text: "Yeah. Okay. You can do it again.",
        note: "8:00-9:00 PM Accepted"
      },
      {
        id: 27,
        sender: 'agent',
        speakerLabel: 'Jason (Apex Emergency Dispatch)',
        time: '3:02',
        timestampSec: 182,
        durationSec: 12,
        text: "Perfect. So just to confirm—an urgent dispatch to 145 King Street, Toronto under David, arriving between 8:00 PM and 9:00 PM. Can I go ahead and lock that in right now?",
        note: "Pre-Booking Commitment Check"
      },
      {
        id: 28,
        sender: 'user',
        speakerLabel: 'Caller (David)',
        time: '3:14',
        timestampSec: 194,
        durationSec: 2,
        text: "Yeah. Sure.",
        note: "Commitment Approved"
      },
      {
        id: 29,
        sender: 'agent',
        speakerLabel: 'Jason (Apex Emergency Dispatch)',
        time: '3:17',
        timestampSec: 197,
        durationSec: 17,
        text: "[Tool Call: book_appointment_cal] Give me just a second while I lock that in for you... You're all set, David. Your dispatch is confirmed, and our technician will give you a call 15 minutes before pulling up to 145 King Street. Is there anything else urgent you need me to note down for the technician?",
        note: "Cal.com Direct Booking Executed"
      },
      {
        id: 30,
        sender: 'user',
        speakerLabel: 'Caller (David)',
        time: '3:34',
        timestampSec: 214,
        durationSec: 4,
        text: "No. Everything is fine. I think that's fine.",
        note: "Wrap-up Confirmed"
      },
      {
        id: 31,
        sender: 'agent',
        speakerLabel: 'Jason (Apex Emergency Dispatch)',
        time: '3:38',
        timestampSec: 218,
        durationSec: 5,
        text: "Stay safe, and our technician will see you shortly. Have a good night, goodbye! [Tool Call: end_call]",
        note: "Call Terminated Successfully"
      }
    ]
  },
  "Multilingual Real Estate Voice Agent": {
    callTitle: "Inbound Buyer Qualification Call (Dubai Marina)",
    telephonyProvider: "Twilio + Retell AI + ElevenLabs",
    latency: "440ms Turnaround",
    languages: ["English", "Arabic", "Hindi"],
    callOutcome: {
      action: "Viewing Confirmed & Scheduled",
      system: "Cal.com + Supabase CRM Sync",
      details: "Booked viewing for Saturday at 2:00 PM • Buyer intent score: 9.4/10 • WhatsApp reminder dispatched"
    },
    dialogue: [
      {
        id: 1,
        sender: 'agent',
        speakerLabel: 'AI Voice Agent (Sophia)',
        time: '0:00',
        timestampSec: 0,
        durationSec: 5,
        text: "Hello! Thank you for reaching out to Nordic Living Luxury Properties. I can assist you in English, Arabic, or Hindi. What kind of property are you searching for today?",
        note: "Language & Intent Detection Active"
      },
      {
        id: 2,
        sender: 'user',
        speakerLabel: 'Inbound Buyer (Omar)',
        time: '0:05',
        timestampSec: 5,
        durationSec: 6,
        text: "Hi! I'm looking for a 3-bedroom apartment with a sea view in Dubai Marina. My budget is around 3.5 million AED.",
        note: "Budget & Location Tagged"
      },
      {
        id: 3,
        sender: 'agent',
        speakerLabel: 'AI Voice Agent (Sophia)',
        time: '0:11',
        timestampSec: 11,
        durationSec: 7,
        text: "Perfect choice! Dubai Marina has prime rental yields. Querying active inventory... I found a high-floor corner unit with unobstructed sea views in Marina Gate at 3.4M AED.",
        note: "Supabase Vector Search Query (320ms)"
      },
      {
        id: 4,
        sender: 'user',
        speakerLabel: 'Inbound Buyer (Omar)',
        time: '0:18',
        timestampSec: 18,
        durationSec: 5,
        text: "That sounds right on target. Can we schedule an in-person viewing for this Saturday afternoon?",
        note: "Appointment Intent Detected"
      },
      {
        id: 5,
        sender: 'agent',
        speakerLabel: 'AI Voice Agent (Sophia)',
        time: '0:23',
        timestampSec: 23,
        durationSec: 8,
        text: "Certainly! I have an open slot with our senior agent at 2:00 PM this Saturday. Locking that in on Cal.com right now... Confirmed! An SMS and calendar invite have just been sent to your phone.",
        note: "Cal.com API Hook Triggered (200 OK)"
      }
    ]
  },
  "AI Booking Voice Receptionist for Restaurants": {
    callTitle: "Inbound Dining Reservation & Table Triage (Sonder Copenhagen)",
    telephonyProvider: "Retell AI + Deepgram Nova-2 + n8n + Airtable",
    latency: "380ms Turnaround",
    languages: ["English", "Danish"],
    callOutcome: {
      action: "Table Reserved & Dynamic Conflict Triage Solved",
      system: "Airtable Floor Plan + Google Calendar + Email Dispatch",
      details: "Table for 3 confirmed for Sept 16 at 4:30 PM • 5:00 PM conflict triaged to 4:30 PM • Confirmation dispatched to caller email & phone"
    },
    dialogue: [
      {
        id: 1,
        sender: 'agent',
        speakerLabel: 'Lucas (AI Receptionist)',
        time: '0:00',
        timestampSec: 0,
        durationSec: 9,
        text: "Hi, thanks for calling Sonder Copenhagen. This is Lucas. I can help you book a table or answer questions about our menu. How can I help?",
        note: "Inbound Call Handshake • Deepgram Nova-2"
      },
      {
        id: 2,
        sender: 'user',
        speakerLabel: 'Alex (Caller)',
        time: '0:09',
        timestampSec: 9,
        durationSec: 6,
        text: "Yeah, hi. Actually, I wanted to book a reservation for my family.",
        note: "Intent: Table Booking"
      },
      {
        id: 3,
        sender: 'agent',
        speakerLabel: 'Lucas (AI Receptionist)',
        time: '0:15',
        timestampSec: 15,
        durationSec: 8,
        text: "Lovely. I'd be happy to get that sorted. What name should I put the reservation under?",
        note: "Caller Identification Phase"
      },
      {
        id: 4,
        sender: 'user',
        speakerLabel: 'Alex (Caller)',
        time: '0:23',
        timestampSec: 23,
        durationSec: 2,
        text: "Uh, Alex.",
        note: "Name: Alex"
      },
      {
        id: 5,
        sender: 'agent',
        speakerLabel: 'Lucas (AI Receptionist)',
        time: '0:25',
        timestampSec: 25,
        durationSec: 5,
        text: "Let me just read that back: A-L-E-X. Is that right?",
        note: "Acoustic Readback Verification"
      },
      {
        id: 6,
        sender: 'user',
        speakerLabel: 'Alex (Caller)',
        time: '0:30',
        timestampSec: 30,
        durationSec: 2,
        text: "Yeah, it's right.",
        note: "Caller Confirmed"
      },
      {
        id: 7,
        sender: 'agent',
        speakerLabel: 'Lucas (AI Receptionist)',
        time: '0:32',
        timestampSec: 32,
        durationSec: 4,
        text: "Perfect, Alex. And how many guests will be joining you?",
        note: "Party Size Extraction"
      },
      {
        id: 8,
        sender: 'user',
        speakerLabel: 'Alex (Caller)',
        time: '0:36',
        timestampSec: 36,
        durationSec: 3,
        text: "I think it will be just three of us.",
        note: "Party Size: 3"
      },
      {
        id: 9,
        sender: 'agent',
        speakerLabel: 'Lucas (AI Receptionist)',
        time: '0:39',
        timestampSec: 39,
        durationSec: 5,
        text: "Lovely, a table for three, nice. And what date were you thinking?",
        note: "Date Query"
      },
      {
        id: 10,
        sender: 'user',
        speakerLabel: 'Alex (Caller)',
        time: '0:44',
        timestampSec: 44,
        durationSec: 3,
        text: "I was thinking maybe tomorrow.",
        note: "Relative Date Expression"
      },
      {
        id: 11,
        sender: 'agent',
        speakerLabel: 'Lucas (AI Receptionist)',
        time: '0:47',
        timestampSec: 47,
        durationSec: 5,
        text: "Oh, tomorrow. Let me make sure we can get you in. And what time works best for you?",
        note: "Time Slot Inquiry"
      },
      {
        id: 12,
        sender: 'user',
        speakerLabel: 'Alex (Caller)',
        time: '0:52',
        timestampSec: 52,
        durationSec: 3,
        text: "Uh, I think 5:00 p.m.",
        note: "Target Slot: 17:00"
      },
      {
        id: 13,
        sender: 'agent',
        speakerLabel: 'Lucas (AI Receptionist)',
        time: '0:55',
        timestampSec: 55,
        durationSec: 12,
        text: "Let me just check availability for tomorrow at 5:00 p.m. Hmm, it looks like 5:00 p.m. tomorrow is fully booked, unfortunately. Would a slightly different time work, maybe a bit earlier or later?",
        note: "Airtable Availability Check • Fully Booked Triage"
      },
      {
        id: 14,
        sender: 'user',
        speakerLabel: 'Alex (Caller)',
        time: '1:07',
        timestampSec: 67,
        durationSec: 3,
        text: "How about 5:30?",
        note: "Alternative Inquired"
      },
      {
        id: 15,
        sender: 'agent',
        speakerLabel: 'Lucas (AI Receptionist)',
        time: '1:10',
        timestampSec: 70,
        durationSec: 13,
        text: "5:30 is just outside the available slots, but we do have availability at 4:30 or from 6:30 onwards tomorrow. Would either of those work for you?",
        note: "Dynamic Slot Negotiation (4:30 PM & 6:30 PM Open)"
      },
      {
        id: 16,
        sender: 'user',
        speakerLabel: 'Alex (Caller)',
        time: '1:23',
        timestampSec: 83,
        durationSec: 4,
        text: "Uh, can we go with 4:30?",
        note: "Slot Selection: 16:30"
      },
      {
        id: 17,
        sender: 'agent',
        speakerLabel: 'Lucas (AI Receptionist)',
        time: '1:27',
        timestampSec: 87,
        durationSec: 7,
        text: "4:30 works perfectly. Let me just confirm that for you. And what date did you want again?",
        note: "Confirmation Loop"
      },
      {
        id: 18,
        sender: 'user',
        speakerLabel: 'Alex (Caller)',
        time: '1:34',
        timestampSec: 94,
        durationSec: 5,
        text: "Yeah, definitely tomorrow. Uh, I think it's 16th September, right?",
        note: "Date Locked: 16th September"
      },
      {
        id: 19,
        sender: 'agent',
        speakerLabel: 'Lucas (AI Receptionist)',
        time: '1:39',
        timestampSec: 99,
        durationSec: 10,
        text: "Right, tomorrow is the 16th of September. Great, and what's the best email address for you to send the confirmation to?",
        note: "Contact Intake: Email"
      },
      {
        id: 20,
        sender: 'user',
        speakerLabel: 'Alex (Caller)',
        time: '1:50',
        timestampSec: 110,
        durationSec: 3,
        text: "Uh, aesthetic.maham@gmail.com",
        note: "Email Captured"
      },
      {
        id: 21,
        sender: 'agent',
        speakerLabel: 'Lucas (AI Receptionist)',
        time: '1:54',
        timestampSec: 114,
        durationSec: 3,
        text: "Got it. aesthetic.maham@gmail.com. Is that right?",
        note: "Email Readback Verification"
      },
      {
        id: 22,
        sender: 'user',
        speakerLabel: 'Alex (Caller)',
        time: '1:59',
        timestampSec: 119,
        durationSec: 2,
        text: "Yeah, perfect.",
        note: "Email Confirmed"
      },
      {
        id: 23,
        sender: 'agent',
        speakerLabel: 'Lucas (AI Receptionist)',
        time: '2:02',
        timestampSec: 122,
        durationSec: 4,
        text: "Great. And a phone number, just in case we need to reach you?",
        note: "Phone Number Query"
      },
      {
        id: 24,
        sender: 'user',
        speakerLabel: 'Alex (Caller)',
        time: '2:08',
        timestampSec: 128,
        durationSec: 5,
        text: "Yeah, it is 452-680-68.",
        note: "Caller Line: 452 680 68"
      },
      {
        id: 25,
        sender: 'agent',
        speakerLabel: 'Lucas (AI Receptionist)',
        time: '2:14',
        timestampSec: 134,
        durationSec: 4,
        text: "So, that's 452-680-68, correct?",
        note: "Phone Number Readback"
      },
      {
        id: 26,
        sender: 'user',
        speakerLabel: 'Alex (Caller)',
        time: '2:20',
        timestampSec: 140,
        durationSec: 1,
        text: "Yeah.",
        note: "Phone Confirmed"
      },
      {
        id: 27,
        sender: 'agent',
        speakerLabel: 'Lucas (AI Receptionist)',
        time: '2:21',
        timestampSec: 141,
        durationSec: 9,
        text: "Perfect. So, just to confirm: a table for three under Alex, this 16th of September at 4:30 p.m. Does that all sound right?",
        note: "Full Booking Summary Review"
      },
      {
        id: 28,
        sender: 'user',
        speakerLabel: 'Alex (Caller)',
        time: '2:32',
        timestampSec: 152,
        durationSec: 1,
        text: "Yeah, that's perfect.",
        note: "Final Caller Consent"
      },
      {
        id: 29,
        sender: 'agent',
        speakerLabel: 'Lucas (AI Receptionist)',
        time: '2:34',
        timestampSec: 154,
        durationSec: 6,
        text: "Brilliant. Give me just one moment while I lock that in for you. Logging the booking details...",
        note: "n8n Webhook: Lock Table in Airtable POS & GCal"
      },
      {
        id: 30,
        sender: 'agent',
        speakerLabel: 'Lucas (AI Receptionist)',
        time: '2:43',
        timestampSec: 163,
        durationSec: 7,
        text: "You're all set, Alex. Your table is booked, and I've just sent a confirmation to your email. Is there anything else I can help you with today?",
        note: "Dispatched Confirmation Email (200 OK)"
      },
      {
        id: 31,
        sender: 'user',
        speakerLabel: 'Alex (Caller)',
        time: '2:54',
        timestampSec: 174,
        durationSec: 1,
        text: "No, that's perfect. Thank you.",
        note: "Caller Satisfied"
      },
      {
        id: 32,
        sender: 'agent',
        speakerLabel: 'Lucas (AI Receptionist)',
        time: '2:56',
        timestampSec: 176,
        durationSec: 5,
        text: "Wonderful. We look forward to seeing you on the 16th. Have a great evening. Goodbye.",
        note: "Call Wrap-Up & Graceful Hangup"
      }
    ]
  },
  "Healthcare Voice Agent": {
    callTitle: "Patient Clinic Intake & Appointment Rescheduling",
    telephonyProvider: "Twilio + Vapi + ElevenLabs",
    latency: "410ms Turnaround",
    languages: ["English"],
    callOutcome: {
      action: "Doctor Consultation Rescheduled",
      system: "EMR Webhook + Calendar Sync",
      details: "Moved checkup to Tuesday 10:30 AM • Verified patient DOB • Automated reminder queued"
    },
    dialogue: [
      {
        id: 1,
        sender: 'agent',
        speakerLabel: 'Clinical AI Assistant (MediVoice)',
        time: '0:00',
        timestampSec: 0,
        durationSec: 5,
        text: "Thank you for calling Northside Family Health. To keep your information secure, could you please verify your name and date of birth?",
        note: "HIPAA Compliant Verification"
      },
      {
        id: 2,
        sender: 'user',
        speakerLabel: 'Patient (David)',
        time: '0:05',
        timestampSec: 5,
        durationSec: 5,
        text: "Hello, yes. It's David Miller, date of birth March 14, 1988. I need to reschedule my consultation.",
        note: "Patient ID Authenticated"
      },
      {
        id: 3,
        sender: 'agent',
        speakerLabel: 'Clinical AI Assistant (MediVoice)',
        time: '0:10',
        timestampSec: 10,
        durationSec: 7,
        text: "Thank you, David. I see your appointment with Dr. Henderson is currently set for tomorrow at 9:00 AM. Would you like to move it to Tuesday morning at 10:30 AM instead?",
        note: "EMR Schedule Checked"
      },
      {
        id: 4,
        sender: 'user',
        speakerLabel: 'Patient (David)',
        time: '0:17',
        timestampSec: 17,
        durationSec: 3,
        text: "Tuesday at 10:30 AM works much better for me, thank you.",
        note: "Slot Confirmed by Patient"
      },
      {
        id: 5,
        sender: 'agent',
        speakerLabel: 'Clinical AI Assistant (MediVoice)',
        time: '0:20',
        timestampSec: 20,
        durationSec: 6,
        text: "You're all set! I have updated your appointment in our clinical system to Tuesday at 10:30 AM. A confirmation text is on its way. Have a wonderful day!",
        note: "EMR Sync Complete"
      }
    ]
  }
};

// Fallback script for other voice agent projects
const DEFAULT_SCRIPT: ScriptConfig = {
  callTitle: "Production Voice Agent Call Sample",
  telephonyProvider: "Retell AI + ElevenLabs + n8n",
  latency: "Sub-500ms Turnaround",
  languages: ["English"],
  callOutcome: {
    action: "Call Handled End-to-End",
    system: "n8n Webhook + Database Sync",
    details: "Lead captured, CRM updated, and follow-up automated with zero human agent intervention."
  },
  dialogue: [
    {
      id: 1,
      sender: 'agent',
      speakerLabel: 'AI Voice Agent',
      time: '0:00',
      timestampSec: 0,
      durationSec: 5,
      text: "Hello! I am an autonomous AI Voice Agent. How can I assist you with your inquiry today?",
      note: "Live Speech Synthesis Active"
    },
    {
      id: 2,
      sender: 'user',
      speakerLabel: 'Inbound Caller',
      time: '0:05',
      timestampSec: 5,
      durationSec: 4,
      text: "Hi, I wanted to learn how quickly this system responds and if it connects to our backend CRM.",
      note: "Intent Recognition"
    },
    {
      id: 3,
      sender: 'agent',
      speakerLabel: 'AI Voice Agent',
      time: '0:09',
      timestampSec: 9,
      durationSec: 6,
      text: "Yes! I operate with sub-450ms voice latency, understand natural interruptions, and trigger n8n webhooks to update CRMs in real time.",
      note: "Function Calling Triggered"
    },
    {
      id: 4,
      sender: 'user',
      speakerLabel: 'Inbound Caller',
      time: '0:15',
      timestampSec: 15,
      durationSec: 3,
      text: "That sounds incredible. Can you log this call and send me a confirmation?",
      note: "Action Request"
    },
    {
      id: 5,
      sender: 'agent',
      speakerLabel: 'AI Voice Agent',
      time: '0:18',
      timestampSec: 18,
      durationSec: 5,
      text: "Done! Your contact information and call summary have been securely logged. It was a pleasure speaking with you!",
      note: "Database & SMS Dispatched"
    }
  ]
};

interface VoiceCallTranscriptPlayerProps {
  project: Project;
}

export const VoiceCallTranscriptPlayer: React.FC<VoiceCallTranscriptPlayerProps> = ({ project }) => {
  const config = VOICE_PROJECT_SCRIPTS[project.title] || DEFAULT_SCRIPT;
  const totalCallSeconds = config.dialogue.reduce((acc, curr) => Math.max(acc, curr.timestampSec + curr.durationSec), 25);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [activeLineId, setActiveLineId] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [copied, setCopied] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const transcriptContainerRef = useRef<HTMLDivElement | null>(null);

  // Determine current active line based on playback time
  useEffect(() => {
    const found = config.dialogue.find(
      (line) => currentSeconds >= line.timestampSec && currentSeconds < (line.timestampSec + line.durationSec)
    );
    if (found) {
      setActiveLineId(found.id);
    } else if (currentSeconds >= totalCallSeconds) {
      setActiveLineId(config.dialogue[config.dialogue.length - 1].id);
    }
  }, [currentSeconds, config.dialogue, totalCallSeconds]);

  // Main playback timer ticker
  useEffect(() => {
    if (isPlaying) {
      const stepMs = 100 / playbackSpeed;
      timerRef.current = setInterval(() => {
        setCurrentSeconds((prev) => {
          const next = prev + 0.1;
          if (next >= totalCallSeconds) {
            setIsPlaying(false);
            if (audioRef.current) {
              audioRef.current.pause();
            }
            if ('speechSynthesis' in window) {
              window.speechSynthesis.cancel();
            }
            return totalCallSeconds;
          }
          return next;
        });
      }, stepMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, totalCallSeconds]);

  // Voice synthesis fallback to speak dialogue lines if no audio file is playing
  const speakLine = (line: DialogueLine) => {
    if (isMuted || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(line.text);
    utterance.rate = 1.05 * playbackSpeed;
    utterance.pitch = line.sender === 'agent' ? 1.1 : 0.95; // different vocal pitch for agent vs caller
    window.speechSynthesis.speak(utterance);
  };

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) audioRef.current.pause();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    } else {
      // If at end, loop to start
      if (currentSeconds >= totalCallSeconds) {
        setCurrentSeconds(0);
      }
      setIsPlaying(true);
      
      // Try playing audio file if available
      if (audioRef.current && project.audioUrl) {
        audioRef.current.play().catch(() => {
          // If native audio file fails, use synthesized dialogue speech
          const currentLine = config.dialogue.find(l => l.id === activeLineId) || config.dialogue[0];
          speakLine(currentLine);
        });
      } else {
        const currentLine = config.dialogue.find(l => l.id === activeLineId) || config.dialogue[0];
        speakLine(currentLine);
      }
    }
  };

  // Jump directly to a specific dialogue bubble
  const handleJumpToLine = (line: DialogueLine) => {
    setCurrentSeconds(line.timestampSec);
    setActiveLineId(line.id);
    setIsPlaying(true);

    if (audioRef.current && project.audioUrl) {
      audioRef.current.currentTime = line.timestampSec % (audioRef.current.duration || totalCallSeconds);
      audioRef.current.play().catch(() => speakLine(line));
    } else {
      speakLine(line);
    }
  };

  // Restart call
  const handleRestart = () => {
    setCurrentSeconds(0);
    setActiveLineId(1);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
    speakLine(config.dialogue[0]);
  };

  // Toggle Mute
  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    if (!isMuted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Timeline scrubber click
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = pct * totalCallSeconds;
    setCurrentSeconds(newTime);
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      audioRef.current.currentTime = (newTime % audioRef.current.duration);
    }
  };

  // Copy Full Transcript
  const handleCopyTranscript = () => {
    const fullText = config.dialogue
      .map((d) => `[${d.time}] ${d.speakerLabel}:\n"${d.text}"`)
      .join('\n\n');
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = (currentSeconds / totalCallSeconds) * 100;
  const currentLine = config.dialogue.find((l) => l.id === activeLineId);

  return (
    <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden relative">
      {/* Hidden audio element for authentic recordings */}
      {project.audioUrl && (
        <audio
          ref={audioRef}
          src={project.audioUrl}
          preload="metadata"
          onEnded={() => {
            // keep dialogue sync running
          }}
        />
      )}

      {/* Background glowing gradient ambiance */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* TOP HEADER: Call Info & Telephony Metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800/80 relative z-10">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold font-mono uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                {isPlaying && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? 'bg-emerald-400' : 'bg-emerald-500/60'}`}></span>
              </span>
              {isPlaying ? 'Call in Progress' : 'Verified Voice Call Recording'}
            </span>

            <span className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 text-[11px] font-mono border border-slate-700/50">
              {config.latency}
            </span>

            {config.languages.map(lang => (
              <span key={lang} className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 text-[11px] font-medium border border-indigo-500/20">
                {lang}
              </span>
            ))}
          </div>

          <h4 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <PhoneCall size={18} className="text-emerald-400 shrink-0" />
            <span>{config.callTitle}</span>
          </h4>
        </div>

        {/* Copy Transcript & Provider Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="hidden md:inline-block text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
            {config.telephonyProvider}
          </span>

          <button
            onClick={handleCopyTranscript}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
            title="Copy entire call transcript"
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            <span>{copied ? 'Copied' : 'Copy Script'}</span>
          </button>
        </div>
      </div>

      {/* AUDIO PLAYER CONSOLE: Controls, Waveform, Timeline */}
      <div className="my-5 p-4 sm:p-5 rounded-2xl bg-[#030712] border border-slate-800/90 shadow-inner relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Main Play / Pause Button */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleTogglePlay}
              className={`relative shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-all duration-200 cursor-pointer ${
                isPlaying
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 scale-105'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-md shadow-emerald-500/20'
              }`}
              title={isPlaying ? "Pause Recording" : "Play Recording"}
              aria-label={isPlaying ? "Pause Recording" : "Play Recording"}
            >
              {isPlaying ? (
                <Pause size={20} className="fill-current" />
              ) : (
                <Play size={20} className="fill-current ml-0.5" />
              )}
            </button>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                  {isPlaying ? 'Listening to Call...' : 'Click to Listen to Agent Call'}
                </span>
                {isPlaying && currentLine && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-medium animate-pulse">
                    Speaking: {currentLine.sender === 'agent' ? 'AI Voice Agent' : 'Customer'}
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-400">
                Sub-second conversational interruption & real-time tool calling
              </span>
            </div>
          </div>

          {/* Timecode & Secondary Control Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-xs font-mono text-slate-300 bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800">
              <span className="text-emerald-400 font-bold">{formatTime(currentSeconds)}</span>
              <span className="text-slate-500 mx-1">/</span>
              <span className="text-slate-400">{formatTime(totalCallSeconds)}</span>
            </div>

            {/* Speed Switcher */}
            <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-xs font-mono">
              {[1.0, 1.25, 1.5].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setPlaybackSpeed(speed)}
                  className={`px-2 py-1 rounded transition-colors ${
                    playbackSpeed === speed
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>

            {/* Restart Button */}
            <button
              onClick={handleRestart}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-colors"
              title="Restart call from beginning"
              aria-label="Restart call"
            >
              <RotateCcw size={15} />
            </button>

            {/* Mute Button */}
            <button
              onClick={handleToggleMute}
              className={`p-2 rounded-lg border transition-colors ${
                isMuted
                  ? 'bg-red-500/20 text-red-400 border-red-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800 border-transparent hover:border-slate-700'
              }`}
              title={isMuted ? "Unmute Audio" : "Mute Audio"}
              aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
          </div>
        </div>

        {/* Interactive Scrubbable Waveform Bar */}
        <div 
          onClick={handleTimelineClick}
          className="mt-4 h-9 bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden cursor-pointer group flex items-center px-2"
          title="Click to jump to any point in the call"
        >
          {/* Progress fill overlay */}
          <div 
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 pointer-events-none transition-all duration-75 border-r border-emerald-400"
            style={{ width: `${progressPercent}%` }}
          />

          {/* 36 Dynamic Equalizer Wave Bars */}
          <div className="w-full flex items-center justify-between gap-1 z-10 pointer-events-none h-6">
            {Array.from({ length: 36 }).map((_, i) => {
              const barPercent = (i / 36) * 100;
              const isPast = barPercent <= progressPercent;
              const baseHeight = [40, 65, 80, 50, 90, 70, 45, 85, 95, 60, 40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 65, 90, 40, 85, 60, 75, 90, 50, 80, 45, 70, 90, 60, 40, 70][i % 36];
              const dynamicHeight = isPlaying
                ? Math.max(20, baseHeight * (0.5 + 0.5 * Math.sin(currentSeconds * 6 + i)))
                : baseHeight * 0.45;

              return (
                <div
                  key={i}
                  className="flex-1 rounded-full transition-all duration-100 min-w-[2px]"
                  style={{
                    height: `${dynamicHeight}%`,
                    backgroundColor: isPast
                      ? '#34d399' // emerald-400
                      : isPlaying
                        ? '#047857' // emerald-700
                        : '#334155'  // slate-700
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="flex justify-between items-center mt-1.5 text-[10px] text-slate-500 font-mono px-1">
          <span>00:00 • Inbound Ring</span>
          <span>Click on waveform or dialogue line to jump</span>
          <span>{formatTime(totalCallSeconds)} • Call Completed</span>
        </div>
      </div>

      {/* SYNCHRONIZED CALL TRANSCRIPT */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <MessageSquareQuote size={14} className="text-emerald-400" />
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              Live Synchronized Call Transcript
            </h5>
          </div>
          <span className="text-[11px] text-slate-500">
            Click any bubble to play from that moment
          </span>
        </div>

        {/* Transcript Dialogue List */}
        <div 
          ref={transcriptContainerRef}
          className="space-y-3 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar"
        >
          {config.dialogue.map((line) => {
            const isActive = line.id === activeLineId;
            const isAgent = line.sender === 'agent';

            return (
              <div
                key={line.id}
                onClick={() => handleJumpToLine(line)}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 cursor-pointer group ${
                  isActive
                    ? 'bg-emerald-950/30 border-emerald-500/80 shadow-md shadow-emerald-950/40 translate-x-1'
                    : isAgent
                      ? 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                      : 'bg-slate-900/40 border-slate-800/50 hover:border-slate-700 hover:bg-slate-900/70'
                }`}
              >
                {/* Speaker Header */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs ${
                      isAgent 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                        : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/40'
                    }`}>
                      {isAgent ? <Bot size={13} /> : <User size={13} />}
                    </div>

                    <span className={`text-xs font-bold ${
                      isAgent ? 'text-emerald-400' : 'text-indigo-300'
                    }`}>
                      {line.speakerLabel}
                    </span>

                    {isActive && isPlaying && (
                      <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 animate-pulse">
                        <Activity size={10} />
                        Speaking now
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {line.note && (
                      <span className="hidden sm:inline-block text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {line.note}
                      </span>
                    )}

                    <span className="text-[11px] font-mono text-slate-500">
                      {line.time}
                    </span>

                    {/* Small Play Button */}
                    <button
                      className={`p-1 rounded-md transition-all ${
                        isActive
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400 group-hover:text-white group-hover:bg-slate-700'
                      }`}
                      title="Play from this line"
                      aria-label="Play from this line"
                    >
                      <Play size={10} className="fill-current ml-0.5" />
                    </button>
                  </div>
                </div>

                {/* Spoken Text */}
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  isActive ? 'text-white font-medium' : 'text-slate-300'
                }`}>
                  "{line.text}"
                </p>
              </div>
            );
          })}
        </div>

        {/* CALL OUTCOME PANEL */}
        <div className="mt-4 p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold block">
                Automated Call Execution Outcome
              </span>
              <p className="text-xs text-slate-200 font-medium">
                {config.callOutcome.action} • <span className="text-slate-400">{config.callOutcome.details}</span>
              </p>
            </div>
          </div>

          <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 self-start sm:self-auto shrink-0">
            {config.callOutcome.system}
          </span>
        </div>
      </div>
    </div>
  );
};
