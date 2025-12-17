import React from 'react';
import { Project } from '../types';
import { Mail, BarChart3, Phone, Users, Map, Cpu, ExternalLink, Home, Calendar, Workflow } from 'lucide-react';

const projects: Project[] = [
  // ROW 1: Existing (High Impact)
  {
    title: "Email Classifier Agent",
    description: "AI-powered agent using n8n and OpenAI that classifies emails (sponsorships vs clients), generates smart replies, and integrates with Slack/WhatsApp for high-priority alerts.",
    tags: ["n8n", "OpenAI", "Gmail API", "Slack API"],
    icon: "mail",
    link: "#"
  },
  {
    title: "Data Analytics Agent",
    description: "Conversational BI Agent with a Lovable dashboard. Retrieves real-time data from Google Sheets, analyzes budgets/timelines, and supports natural language queries.",
    tags: ["Lovable", "Google Sheets", "NLP", "Dashboard"],
    icon: "chart",
    link: "#"
  },
  {
    title: "Lead-Generation Voice Agent",
    description: "Outbound calling agent using Vapi, ElevenLabs, and OpenAI. Qualifies prospects via voice, logging responses into HubSpot/Zoho CRM automatically.",
    tags: ["Vapi", "ElevenLabs", "CRM Integration", "Voice AI"],
    icon: "phone",
    link: "#"
  },

  // ROW 2: New Projects (Requested)
  {
    title: "Property Inbound Voice Agent",
    description: "Collects user information about required apartment size, location, and budget, then qualifies prospects to schedule a visit directly.",
    tags: ["n8n", "Vapi", "Twilio"],
    icon: "home",
    link: "#"
  },
  {
    title: "Healthcare Voice Agent",
    description: "Asks for patient info and books appointments directly into CRM while checking doctor availability in real-time.",
    tags: ["n8n", "Calendly", "ElevenLabs", "Twilio"],
    icon: "calendar",
    link: "#"
  },
  {
    title: "HubSpot Contacts AI Agent",
    description: "Collects user info from a form, alerts Slack channel, and triggers a separate webhook to email personalized offers directly to the user.",
    tags: ["n8n", "Bravo", "Gmail", "Slack", "HubSpot"],
    icon: "workflow",
    link: "#"
  },

  // ROW 3: Previous Projects (Moved down)
  {
    title: "Customer E-commerce Segmentation",
    description: "Segmentation model using Python Scikit-learn. Utilizes K-Means clustering on RFM (Recency, Frequency, Monetary) data to identify customer groups for marketing.",
    tags: ["Python", "Scikit-learn", "K-Means", "Data Science"],
    icon: "users",
    link: "#"
  },
  {
    title: "Pathfinding Simulation",
    description: "Visual pathfinding tool using Best-First Search with Pygame. Interactive web deployment allows users to visualize algorithms in real-time.",
    tags: ["Python", "Pygame", "Algorithms", "Web"],
    icon: "map",
    link: "#"
  },
  {
    title: "Producer-Consumer Sync",
    description: "Multithreaded Python simulation using semaphores to demonstrate handling limited buffers, concurrency, and resource sharing.",
    tags: ["Python", "Threading", "Concurrency", "Semaphores"],
    icon: "cpu",
    link: "#"
  }
];

const IconMap: Record<string, React.ReactNode> = {
  mail: <Mail size={24} />,
  chart: <BarChart3 size={24} />,
  phone: <Phone size={24} />,
  users: <Users size={24} />,
  map: <Map size={24} />,
  cpu: <Cpu size={24} />,
  home: <Home size={24} />,
  calendar: <Calendar size={24} />,
  workflow: <Workflow size={24} />,
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 dark:opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-slate-50 dark:from-slate-950 dark:via-transparent dark:to-slate-950 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-12 text-center">
          Featured <span className="text-indigo-600 dark:text-indigo-400">Projects</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.2)] hover:-translate-y-2 group flex flex-col relative"
            >
              {/* Subtle background glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="p-6 flex-grow relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-sm group-hover:shadow-indigo-500/30">
                    {IconMap[project.icon]}
                  </div>
                  {project.link && project.link !== "#" && (
                    <a 
                      href={project.link} 
                      className="text-slate-400 hover:text-indigo-500 transition-colors transform hover:rotate-12 hover:scale-110"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>
              
              <div className="px-6 pb-6 pt-0 mt-auto relative z-10">
                 <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700 group-hover:border-indigo-200 dark:group-hover:border-indigo-900/50 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.link || "#"}
                  className="w-full block text-center py-2 rounded-lg bg-slate-900 dark:bg-slate-800 text-white dark:text-indigo-400 hover:bg-indigo-600 dark:hover:bg-indigo-600 dark:hover:text-white font-medium transition-all duration-300 border border-transparent dark:border-indigo-500/30 shadow-md hover:shadow-lg hover:shadow-indigo-500/25"
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;