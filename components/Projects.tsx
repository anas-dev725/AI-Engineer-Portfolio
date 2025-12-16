import React from 'react';
import { Project } from '../types';
import { Mail, BarChart3, Phone, Users, Map, Cpu, ExternalLink } from 'lucide-react';

const projects: Project[] = [
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
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">Featured Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all hover:shadow-xl hover:-translate-y-1 group flex flex-col"
            >
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {IconMap[project.icon]}
                  </div>
                  {project.link && (
                    <a 
                      href={project.link} 
                      className="text-slate-400 hover:text-indigo-500 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>
              
              <div className="px-6 pb-6 pt-0 mt-auto">
                 <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.link || "#"}
                  className="w-full block text-center py-2 rounded-lg bg-slate-900 dark:bg-slate-800 text-white dark:text-indigo-400 hover:bg-indigo-600 dark:hover:bg-indigo-900/50 font-medium transition-colors border border-transparent dark:border-indigo-500/30"
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