import React from 'react';
import { ExternalLink, Github, Code2 } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: "Voice AI Receptionist",
      description: "An automated voice assistant built with Retell AI and Vapi for handling customer calls and bookings.",
      tags: ["Retell AI", "Vapi", "n8n", "Python"],
      link: "#"
    },
    {
      title: "AI Workflow Automation",
      description: "Complex n8n workflows integrating Google Sheets, OpenAI, and Slack for streamlined business operations.",
      tags: ["n8n", "OpenAI", "Zapier"],
      link: "#"
    },
    {
      title: "Custom AI Agents",
      description: "Specialized Python-based agents for data extraction and automated content generation.",
      tags: ["Python", "LangChain", "OpenAI"],
      link: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group bg-slate-50 dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 transition-all hover:-translate-y-2">
              <div className="h-48 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                <Code2 size={48} className="text-slate-400 dark:text-slate-600" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <a href={project.link} className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <Github size={20} />
                  </a>
                  <a href={project.link} className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
