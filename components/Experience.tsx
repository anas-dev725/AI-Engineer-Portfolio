import React from 'react';
import { Briefcase } from 'lucide-react';
import { Experience as ExperienceType } from '../types';

const experiences: ExperienceType[] = [
  {
    role: "AI Automation Engineer",
    company: "Impleko AI",
    location: "Florida",
    period: "Feb 2025 - Present",
    achievements: [
      "Built workflow automations in n8n to design no-code solutions integrating APIs and databases.",
      "Developed a LinkedIn Post Generator using n8n that combines user input, OpenAI for content, and DALL·E for auto-generated visuals.",
      "Created an Email Classifier Agent using n8n with Gmail triggers, and AI-based classification to auto-label and route inbound emails.",
      "Built a Research Agent workflow that pulls data from multiple APIs, including Tavily, to generate topic briefs."
    ]
  }
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 dark:opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-slate-50 dark:from-slate-950 dark:via-transparent dark:to-slate-950 pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-12 text-center">
          Professional <span className="text-indigo-600 dark:text-indigo-400">Experience</span>
        </h2>
        
        <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 md:ml-6 space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-8 md:pl-12 group">
              {/* Timeline Dot */}
              <div className="absolute -left-3 top-0 bg-slate-50 dark:bg-slate-950 border-4 border-indigo-500 rounded-full w-6 h-6 transition-all group-hover:scale-125 group-hover:border-purple-500"></div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {exp.role} 
                  </h3>
                  <div className="text-indigo-600 dark:text-indigo-400 font-semibold text-lg">{exp.company}</div>
                </div>
                <div className="text-slate-500 dark:text-slate-500 font-medium text-sm mt-1 sm:mt-0 flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800">
                  <Briefcase size={14} /> {exp.period} | {exp.location}
                </div>
              </div>
              
              <ul className="space-y-3">
                {exp.achievements.map((item, i) => (
                  <li key={i} className="text-slate-600 dark:text-slate-300 leading-relaxed flex items-start">
                    <span className="mr-3 mt-2 w-1.5 h-1.5 bg-indigo-500 rounded-full flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;