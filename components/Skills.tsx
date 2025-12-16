import React, { useState } from 'react';
import { SkillData } from '../types';

// Enhanced skills data mapped to new categories
const skills: SkillData[] = [
  // AI Tools & Platforms
  { name: 'Lovable', level: 90, category: 'AI Tools' },
  { name: 'Bolt', level: 85, category: 'AI Tools' },
  { name: 'n8n Workflow', level: 95, category: 'AI Tools' },
  { name: 'Emergent AI', level: 80, category: 'AI Tools' },
  
  // Generative AI
  { name: 'Google AI Studio', level: 90, category: 'GenAI' },
  { name: 'OpenAI API', level: 95, category: 'GenAI' },
  { name: 'Imagine Art', level: 85, category: 'GenAI' },
  
  // Voice AI
  { name: 'Retell AI', level: 90, category: 'Voice AI' },
  { name: 'Vapi / 11Labs', level: 85, category: 'Voice AI' },
  
  // Backend & Data
  { name: 'Python', level: 92, category: 'Backend' },
  { name: 'SQL/DB', level: 80, category: 'Backend' },
  { name: 'API Integration', level: 95, category: 'Backend' },
  
  // Machine Learning
  { name: 'Scikit-learn', level: 90, category: 'ML' },
  { name: 'TensorFlow', level: 85, category: 'ML' },
];

const categories = ['All', 'AI Tools', 'GenAI', 'Voice AI', 'Backend', 'ML'];

// Updated colors to match the Indigo/Purple theme
const categoryStats = [
  { label: 'Automation', percent: 95, color: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-600 dark:border-indigo-400' },
  { label: 'Generative AI', percent: 90, color: 'text-purple-600 dark:text-purple-400', border: 'border-purple-600 dark:border-purple-400' },
  { label: 'Voice Agents', percent: 88, color: 'text-fuchsia-600 dark:text-fuchsia-400', border: 'border-fuchsia-600 dark:border-fuchsia-400' },
  { label: 'Product Dev', percent: 85, color: 'text-indigo-500 dark:text-indigo-300', border: 'border-indigo-500 dark:border-indigo-300' },
  { label: 'Data Science', percent: 90, color: 'text-blue-600 dark:text-blue-400', border: 'border-blue-600 dark:border-blue-400' },
  { label: 'No-Code', percent: 92, color: 'text-violet-600 dark:text-violet-400', border: 'border-violet-600 dark:border-violet-400' },
];

const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filteredSkills = activeTab === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === activeTab);

  return (
    <section id="skills" className="py-20 bg-white dark:bg-slate-900/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
            My <span className="text-indigo-600 dark:text-indigo-400">Skills</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Expertise in AI Product Development & Automation</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full border text-sm font-medium transition-all duration-300 
                ${activeTab === cat 
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/25 transform scale-105' 
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-400'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-20">
          {filteredSkills.map((skill, index) => (
            <div key={index} className="group">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-slate-800 dark:text-slate-200">{skill.name}</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">{skill.level}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-1000 ease-out group-hover:from-indigo-400 group-hover:to-purple-400"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Circular Stats - Bottom Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {categoryStats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className={`relative w-24 h-24 rounded-full border-4 ${stat.border} flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm mb-3 group transition-transform hover:scale-105`}>
                <span className={`text-xl font-bold ${stat.color}`}>{stat.percent}%</span>
                <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none opacity-20">
                   <circle cx="50%" cy="50%" r="46%" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400 text-center">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;