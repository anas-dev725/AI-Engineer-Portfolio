import React from 'react';
import { Briefcase, Users, Calendar } from 'lucide-react';

const stats = [
  { 
    id: 1, 
    name: 'Years Experience', 
    value: '1.5+', 
    icon: Calendar,
    description: 'Specialized in AI & Automation'
  },
  { 
    id: 2, 
    name: 'Projects Delivered', 
    value: '20+', 
    icon: Briefcase,
    description: 'Successful implementations'
  },
  { 
    id: 3, 
    name: 'Clients Served', 
    value: '10+', 
    icon: Users,
    description: 'Across various industries'
  },
];

const Stats: React.FC = () => {
  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-700 shadow-2xl">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-12">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center justify-center text-center group">
                <div className="mb-4 p-3 bg-white/10 rounded-2xl text-white group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                  <stat.icon size={28} strokeWidth={1.5} />
                </div>
                <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-lg font-bold text-indigo-100 mb-1">
                  {stat.name}
                </div>
                <div className="text-xs text-indigo-200/80 font-medium uppercase tracking-wider">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;