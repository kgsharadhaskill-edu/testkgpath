import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Briefcase, Globe, TrendingUp, Cpu } from 'lucide-react';


// --- Achievements ---
export const Achievements: React.FC = () => {
  const items = [
    { icon: Award, title: "Best AI Curriculum", desc: "Awarded by EdTech Summit 2023" },
    { icon: Users, title: "1200+ Alumni", desc: "Working in top tier tech firms" },
    { icon: Briefcase, title: "50+ Hiring Partners", desc: "From startups to Fortune 500" },
    { icon: TrendingUp, title: "150% Avg Hike", desc: "Salary growth for our graduates" },
    { icon: Globe, title: "Global Mentors", desc: "Experts from USA, UK & India" },
    { icon: Cpu, title: "20+ Live Projects", desc: "Completed by student teams annually" },
  ];

  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Milestones & Recognition</h2>
          <p className="text-slate-400">Our results speak louder than words.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, borderColor: 'rgba(34, 211, 238, 0.3)', boxShadow: '0 10px 30px -10px rgba(34, 211, 238, 0.2)' }}
              className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl flex items-center gap-5 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-primary-400 shrink-0">
                <item.icon size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">{item.title}</h4>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Achievements;