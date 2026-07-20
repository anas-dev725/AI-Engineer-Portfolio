import React, { useEffect, useState, useRef } from 'react';
import { Briefcase, Calendar, MapPin, Award, ArrowRight, Code, Sparkles, Layers } from 'lucide-react';
import { Experience as ExperienceType } from '../types';
import { motion, useInView } from 'motion/react';

const experiences: ExperienceType[] = [
  {
    role: "AI Product Developer & Automation Engineer",
    company: "Nordic Solutions AI",
    location: "Copenhagen, Denmark",
    period: "Apr 2026 - Present",
    achievements: [
      "Built AI voice agents for Danish restaurants and clinics that automated reservations and appointment booking through Cal.com.",
      "Developed an AI-powered CRM and sales copilot that unified lead management, call intelligence, and property recommendations.",
      "Built RAG-powered assistants and internal automation tools for knowledge retrieval and employee onboarding."
    ],
    technologies: ["n8n", "Retell AI", "ElevenLabs", "Supabase", "Telnyx"],
    metrics: [
      { label: "AI Systems Delivered", value: "10+" },
      { label: "Calls Automated", value: "1K+" },
      { label: "Leads Processed", value: "5K+" }
    ],
    summary: "Building AI products, voice agents, and automation systems for Danish real estate and hospitality businesses."
  },
  {
    role: "AI Automation Engineer",
    company: "Impleko AI",
    location: "Florida (office based in Karachi)",
    period: "Feb 2025 - Jan 2026",
    achievements: [
      "Built 20+ production n8n automations integrating APIs, databases, and AI services.",
      "Developed AI agents and automation workflows for lead qualification, CRM updates, and customer communication.",
      "Built human like voice agents using Retell AI, VAPI, and ElevenLabs to qualify over 1k customer calls."
    ],
    technologies: ["n8n", "OpenAI SDK", "VAPI", "Twilio", "Deepgram"],
    metrics: [
      { label: "Automations", value: "20+" },
      { label: "API Integrations", value: "15+" },
      { label: "AI Conversations", value: "1k+" }
    ],
    summary: "Developed AI automation solutions that connected business systems and voice assistants into production workflows."
  },
  {
    role: "Content Executive",
    company: "Impleko",
    location: "Florida (office based in Karachi)",
    period: "Aug 2024 - Jan 2026",
    achievements: [
      "Wrote clear and engaging copy for landing pages, tech blogs, and case studies, boosting website views by 65%.",
      "Managed targeted Meta ad campaigns promoting voice and AI automations, bringing in a strong 3.8x return on ad spend.",
      "Streamlined content publishing on WordPress and Sanity CMS, speeding up web updates by 30%.",
      "Analyzed website traffic and user behavior to improve layouts, increasing signups and clicks by 15%."
    ],
    technologies: ["WordPress", "Sanity CMS", "Meta Ads Manager", "Google Analytics", "Copywriting"],
    metrics: [
      { label: "Traffic Growth", value: "65%" },
      { label: "Landing Pages", value: "40+" },
      { label: "Campagns", value: "15+" }
    ],
    summary: "Leading content creation, copywriting, and digital marketing strategies to boost product engagement and traffic."
  }
];

// Custom Hook/Component for Counting Animation (Slower, Triggered by InView)
const AnimatedCounter: React.FC<{ value: string }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 }); // Starts when 10% of element is in viewport

  useEffect(() => {
    if (!isInView) return;

    // Matches standard numbers with decimal options and handles prefix/suffix strings
    const match = value.match(/(-?\d+(?:\.\d+)?)(.*)/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const numericValue = parseFloat(match[1]);
    const suffix = match[2] || '';
    const duration = 2500; // Slower speed (2.5 seconds)
    const startTime = performance.now();

    let animationFrameId: number;

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = numericValue * easeProgress;
      
      // Determine if it needs decimals based on the original string
      const hasDecimal = match[1].includes('.');
      const formattedVal = hasDecimal 
        ? currentVal.toFixed(1) 
        : Math.floor(currentVal).toString();

      setDisplayValue(`${formattedVal}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, isInView]);

  return <span ref={ref} className="font-mono">{displayValue}</span>;
};

const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-28 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      {/* Dynamic abstract background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
      
      {/* Light glow effects */}
      <div className="absolute top-1/4 left-1/10 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/3 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-500/3 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 text-slate-600 dark:text-slate-400 text-xs font-mono uppercase tracking-wider mb-4"
          >
            <Sparkles size={11} className="text-indigo-500" />
            Milestones & Business Impact
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">Experience</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-normal"
          >
            A journey of building AI products, automated systems, and voice agents that solve real business challenges.
          </motion.p>
        </div>

        {/* Perfectly Aligned Connection Flow Timeline Layout */}
        <div className="relative pl-8 sm:pl-16 md:pl-20">
          
          {/* Timeline Connector Line - Centered precisely with the circle nodes */}
          <div className="absolute left-4 sm:left-8 md:left-10 top-4 bottom-4 w-[2px] bg-slate-100 dark:bg-slate-900/60 -translate-x-1/2">
            {/* Animated Gradient flow on the connector line */}
            <motion.div 
              className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.0, ease: "easeOut" }}
            />
          </div>

          <div className="space-y-24 relative">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start group relative"
              >
                
                {/* Timeline node - Centers perfectly directly on the vertical line */}
                <div className="absolute left-[-16px] sm:left-[-32px] md:left-[-40px] top-2 -translate-x-1/2 flex items-center justify-center z-20">
                  <div className="relative">
                    <span className="absolute inline-flex h-8 w-8 rounded-full bg-indigo-400/20 opacity-75 animate-ping" />
                    <div className="relative flex items-center justify-center rounded-full h-8 w-8 bg-white dark:bg-slate-950 border-2 border-indigo-500 dark:border-indigo-400 shadow-sm">
                      <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {`0${index + 1}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* LEFT COLUMN: Role Meta, Animated Stats & Tech Stack (5/12 cols) */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono mb-2">
                      {exp.company}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                      {exp.role}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 text-xs font-mono text-slate-400 dark:text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {exp.period}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {exp.location}
                      </span>
                    </div>

                    {exp.summary && (
                      <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium border-l-2 border-indigo-500/30 pl-3 italic">
                        {exp.summary}
                      </p>
                    )}
                  </div>

                  {/* High Fidelity Performance Metrics with Counter Animation */}
                  {exp.metrics && (
                    <div className="pt-2 grid grid-cols-3 gap-3">
                      {exp.metrics.map((metric, mIdx) => (
                        <div 
                          key={mIdx}
                          className="bg-slate-50/50 dark:bg-slate-900/10 border border-slate-100/50 dark:border-slate-900/40 rounded-xl p-3.5 transition-all duration-300 hover:bg-slate-100/30 dark:hover:bg-slate-900/20"
                        >
                          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                            <AnimatedCounter value={metric.value} />
                          </div>
                          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5 leading-tight">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Badges placed directly below stats */}
                  {exp.technologies && (
                    <div className="pt-2 space-y-3">
                      <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1">
                        <Code size={11} className="text-indigo-500" /> Stack & Tools
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech, tIdx) => (
                          <span 
                            key={tIdx} 
                            className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-mono bg-slate-50 dark:bg-slate-900/30 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-900/50 transition-all duration-200 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 hover:border-transparent cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT COLUMN: Selected Impact / Impact Statements (7/12 cols) */}
                <div className="lg:col-span-7 space-y-6 lg:pl-12 lg:border-l border-slate-100 dark:border-slate-900 lg:pt-14">
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Layers size={12} className="text-indigo-500" /> Selected Impact
                    </h4>
                    <ul className="space-y-5">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-slate-600 dark:text-slate-300 leading-relaxed flex items-start text-sm sm:text-base">
                          <ArrowRight size={14} className="text-indigo-500 dark:text-indigo-400 mt-1.5 mr-3 flex-shrink-0 opacity-70 group-hover:translate-x-1 transition-transform" />
                          <span>
                            {achievement.split(/(\b\d+%\s*(?:\w+)?|\b\d+,\d+\+?|\b\d+(?:\.\d+)?x?\s*\w*|\b\d+\+|\b\d+[kK]\b)/).map((part, pIdx) => {
                              const isHighlight = /(\b\d+%\s*(?:\w+)?|\b\d+,\d+\+?|\b\d+(?:\.\d+)?x?\s*\w*|\b\d+\+|\b\d+[kK]\b)/.test(part);
                              return isHighlight ? (
                                <strong key={pIdx} className="text-indigo-600 dark:text-indigo-400 font-bold">
                                  {part}
                                </strong>
                              ) : (
                                part
                              );
                            })}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
