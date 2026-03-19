import React from 'react';
import { Users, Code, Award, Coffee } from 'lucide-react';

const Stats: React.FC = () => {
  const stats = [
    { label: "Projects Completed", value: "50+", icon: Code },
    { label: "Happy Clients", value: "30+", icon: Users },
    { label: "Awards Won", value: "5", icon: Award },
    { label: "Cups of Coffee", value: "1000+", icon: Coffee },
  ];

  return (
    <section className="py-12 bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="flex justify-center mb-4">
                <stat.icon size={32} className="opacity-80" />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm opacity-80 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
