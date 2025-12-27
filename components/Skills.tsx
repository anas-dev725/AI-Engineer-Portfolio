import React from 'react';
import { Bot, Heart, Mic, MousePointer2, Zap, Code2, Globe } from 'lucide-react';

interface Skill {
  name: string;
  category: string;
  icon?: string; // URL for external logos
  fallbackIcon?: React.ReactNode; // Lucide icon fallback
  color: string;
}

const skillsData: Skill[] = [
  // Automation & No-Code
  { 
    name: 'n8n', 
    category: 'Automation', 
    icon: 'https://cdn.simpleicons.org/n8n/FF6584',
    color: 'border-pink-500' 
  },
  { 
    name: 'Playwright', 
    category: 'Automation', 
    fallbackIcon: (
      <svg role="img" viewBox="0 0 24 24" className="w-8 h-8 text-[#2EAD33] fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.355 5.923c.256 2.408 1.488 7.822 5.158 11.772 5 5.395 13.67 6.223 17.014 6.223 3.621 0 9.791-.867 14.682-5.125 3.135-2.727 5.357-7.273 5.357-7.273s2.222 4.546 5.357 7.273c4.891 4.258 11.061 5.125 14.682 5.125 3.344 0 12.014-.828 17.014-6.223 3.67-3.95 4.902-9.364 5.158-11.772v-1.09c-4.9.29-10.316 1.657-14.583 5.808-3.57 3.471-5.823 7.863-5.823 7.863s-2.083-4.97-6.35-8.41C74.025 6.395 68.3 5.22 62.964 4.89c-5.337.33-11.062 1.505-15.454 5.202-4.267 3.44-6.35 8.41-6.35 8.41s-2.253-4.392-5.823-7.863c-4.267-4.15-9.683-5.517-14.583-5.808v1.09z" transform="scale(0.24) translate(4,4)" /> 
        {/* Adjusted scale/translate for 24x24 viewbox or used path directly compatible with 24x24 */}
        <path d="M20.65 11.1c-1.8 1.8-2.93 4.08-2.93 4.08s-1.05-2.58-3.2-4.36c-2.22-1.85-5.1-2.46-7.79-2.63-2.69.17-5.57.78-7.79 2.63-2.15 1.78-3.2 4.36-3.2 4.36s-1.13-2.28-2.93-4.08C-1.47 6.84-4.18 6.16-6.63 6v.55c.13 1.2.74 3.91 2.58 5.89 2.5 2.7 6.84 3.11 8.51 3.11 1.81 0 4.9-.43 7.34-2.56 1.57-1.36 2.68-3.64 2.68-3.64s1.11 2.27 2.68 3.64c2.44 2.13 5.53 2.56 7.34 2.56 1.67 0 6.01-.41 8.51-3.11 1.84-1.98 2.45-4.69 2.58-5.89V6c-2.45.16-5.16.84-7.29 2.92z" transform="translate(12, 12) scale(0.5)" style={{ display: 'none' }} />
        {/* Using the standard Simple Icons path properly scaled for 24x24 */}
        <path d="M1.35 6.2c.26 2.5 1.5 8.12 5.2 12.22 5.04 5.6 13.78 6.46 17.15 6.46 3.65 0 9.87-.9 14.8-5.32 3.16-2.83 5.4-7.55 5.4-7.55s2.24 4.72 5.4 7.55c4.93 4.42 11.15 5.32 14.8 5.32 3.37 0 12.1-.86 17.15-6.46 3.7-4.1 4.94-9.72 5.2-12.22V5.07c-4.94.3-10.4 1.72-14.7 6.03-3.6 3.6-5.87 8.16-5.87 8.16s-2.1-5.16-6.4-8.73c-4.43-3.7-10.2-4.92-15.58-5.26-5.38.34-11.15 1.56-15.58 5.26-4.3 3.57-6.4 8.73-6.4 8.73s-2.26-4.56-5.87-8.16C11.75 6.8 6.3 5.37 1.35 5.07V6.2z" />
      </svg>
    ),
    color: 'border-green-500' 
  },
  { 
    name: 'Lovable', 
    category: 'No-Code', 
    fallbackIcon: <Heart size={28} className="text-rose-500 fill-rose-500" />, 
    color: 'border-rose-500' 
  },
  { 
    name: 'Bolt', 
    category: 'No-Code', 
    fallbackIcon: <Zap size={28} className="text-yellow-400 fill-yellow-400" />,
    color: 'border-yellow-400' 
  },
  
  // GenAI
  { 
    name: 'OpenAI', 
    category: 'GenAI', 
    fallbackIcon: (
      <svg role="img" viewBox="0 0 24 24" className="w-8 h-8 text-slate-900 dark:text-white fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.453l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
      </svg>
    ),
    color: 'border-slate-800 dark:border-white' 
  },
  { 
    name: 'Google AI', 
    category: 'GenAI', 
    icon: 'https://cdn.simpleicons.org/google/4285F4',
    color: 'border-blue-500' 
  },
  { 
    name: 'Claude', 
    category: 'GenAI', 
    icon: 'https://cdn.simpleicons.org/anthropic/D97757',
    color: 'border-orange-500' 
  },
  {
    name: 'Perplexity',
    category: 'GenAI',
    icon: 'https://cdn.simpleicons.org/perplexity/222222?dark=white',
    color: 'border-teal-500'
  },

  // Voice AI
  { 
    name: 'Retell AI', 
    category: 'Voice AI', 
    fallbackIcon: <Mic size={28} className="text-cyan-500" />,
    color: 'border-cyan-500' 
  },
  { 
    name: 'Vapi', 
    category: 'Voice AI', 
    fallbackIcon: <Mic size={28} className="text-purple-500" />,
    color: 'border-purple-500' 
  },
  { 
    name: 'ElevenLabs', 
    category: 'Voice AI', 
    fallbackIcon: <Bot size={28} className="text-slate-500" />,
    color: 'border-slate-500' 
  },

  // Backend / Development
  { 
    name: 'Python', 
    category: 'Development', 
    icon: 'https://cdn.simpleicons.org/python/3776AB',
    color: 'border-blue-400' 
  },
  { 
    name: 'Sanity', 
    category: 'Development', 
    icon: 'https://cdn.simpleicons.org/sanity/F03E2F',
    color: 'border-red-400' 
  },
  { 
    name: 'Replit AI', 
    category: 'Development', 
    icon: 'https://cdn.simpleicons.org/replit/F26207?dark=white', 
    color: 'border-orange-500' 
  },
  { 
    name: 'Supabase', 
    category: 'Development', 
    icon: 'https://cdn.simpleicons.org/supabase/3ECF8E',
    color: 'border-emerald-500' 
  },
  { 
    name: 'Twilio', 
    category: 'Development', 
    icon: 'https://cdn.simpleicons.org/twilio/F22F46',
    color: 'border-red-500' 
  },
  
  // Tools
  { 
    name: 'Cursor', 
    category: 'Tools', 
    fallbackIcon: <MousePointer2 size={28} className="text-slate-900 dark:text-white" />, 
    color: 'border-slate-800' 
  },
  { 
    name: 'HubSpot', 
    category: 'Tools', 
    icon: 'https://cdn.simpleicons.org/hubspot/FF7A59',
    color: 'border-orange-600' 
  },
  { 
    name: 'Slack', 
    category: 'Tools', 
    icon: 'https://cdn.simpleicons.org/slack/4A154B',
    color: 'border-fuchsia-800' 
  },
  { 
    name: 'Notion', 
    category: 'Tools', 
    icon: 'https://cdn.simpleicons.org/notion/000000?dark=white',
    color: 'border-slate-800' 
  },
  { 
    name: 'Airtable', 
    category: 'Tools', 
    icon: 'https://cdn.simpleicons.org/airtable/18BFFF',
    color: 'border-blue-400' 
  }
];

const Skills: React.FC = () => {
  // Split skills into two rows for the marquee effect
  const midPoint = Math.ceil(skillsData.length / 2);
  const firstRow = skillsData.slice(0, midPoint);
  const secondRow = skillsData.slice(midPoint);
  
  const displayRows = [firstRow, secondRow];

  return (
    <section id="skills" className="py-24 bg-white dark:bg-slate-900 overflow-hidden relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-30 dark:opacity-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10 text-center">
        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
          Technical <span className="text-indigo-600 dark:text-indigo-400">Expertise</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          I love working with AI and automation tools to turn ideas into real-world solutions that businesses can rely on.
        </p>
      </div>

      <div className="relative w-full overflow-hidden space-y-6 py-4">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-20 pointer-events-none"></div>
        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-20 pointer-events-none"></div>

        {displayRows.map((rowItems, rowIndex) => (
          <div 
            key={rowIndex} 
            className="flex w-full"
          >
            {/* 
               rowIndex % 2 === 0 ? 'animate-scroll' : 'animate-scroll-reverse'
               This alternates direction.
            */}
            <div 
              className={`flex gap-4 whitespace-nowrap ${
                 rowIndex % 2 === 0 ? 'animate-scroll' : 'animate-scroll-reverse'
              } hover:[animation-play-state:paused] will-change-transform`}
            >
              {/* Render items multiple times to create the seamless infinite loop */}
              {[...rowItems, ...rowItems, ...rowItems, ...rowItems].map((skill, idx) => (
                <div
                  key={`${skill.name}-${idx}`}
                  className={`
                    inline-flex flex-col items-center justify-center
                    w-28 h-28 md:w-36 md:h-36 
                    bg-white dark:bg-slate-800/80 
                    border-2 ${skill.color} border-opacity-20 dark:border-opacity-30
                    rounded-2xl
                    shadow-sm
                    transform transition-transform duration-300
                    hover:scale-105 hover:bg-slate-50 dark:hover:bg-slate-800
                    group cursor-pointer
                    mx-2
                  `}
                >
                  <div className="mb-3 p-2 bg-slate-50 dark:bg-slate-900 rounded-xl group-hover:shadow-inner transition-shadow">
                    {skill.icon ? (
                      <img 
                        src={skill.icon} 
                        alt={skill.name} 
                        className="w-8 h-8 md:w-10 md:h-10 object-contain filter dark:brightness-100" 
                      />
                    ) : (
                      skill.fallbackIcon
                    )}
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base">{skill.name}</h3>
                  <span className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-700/50 px-2 py-0.5 rounded-full mt-2">
                    {skill.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;