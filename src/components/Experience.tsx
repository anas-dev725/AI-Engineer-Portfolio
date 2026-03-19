import React from 'react';
import { Briefcase } from 'lucide-react';

const Experience: React.FC = () => {
  const experiences = [
    {
      title: "AI Automation Engineer",
      company: "Freelance / Projects",
      period: "2023 - Present",
      description: "Developing custom AI agents using n8n and Python. Integrating LLMs for automated customer support and voice AI systems."
    },
    {
      title: "Full Stack Developer",
      company: "Tech Solutions",
      period: "2021 - 2023",
      description: "Built responsive web applications using React and Node.js. Optimized database queries and improved system performance."
    }
  ];

  return (
    <section id="experience" className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Work Experience</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full"></div>
        </div>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.title}</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium">{exp.company}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-500 mb-4">{exp.period}</p>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
