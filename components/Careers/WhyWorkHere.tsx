import React from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, Heart, Zap, Users, MonitorPlay, Coffee
  } from 'lucide-react';

export const WhyWorkHere: React.FC = () => {
  const benefits = [
    { icon: Zap, title: "Impact-Driven Work", desc: "Don't just code. Teach. Mentor. Change lives. Your work directly impacts the career trajectory of students." },
    { icon: Users, title: "Growth Environment", desc: "We are growing fast. Join early, take ownership, and lead teams as we expand across Tamil Nadu." },
    { icon: MonitorPlay, title: "AI-First Culture", desc: "Access to premium AI tools (GPT-4, Copilot, MidJourney) for every employee. We practice what we preach." },
    { icon: Coffee, title: "Flexible Culture", desc: "Hybrid work options, casual dress code, and a stunning campus in Saravanampatti with coffee on tap." },
    { icon: Heart, title: "Mentorship", desc: "Work alongside industry veterans from Silicon Valley and top Indian ed-tech firms." },
    { icon: Briefcase, title: "Competitive Pay", desc: "Salaries matched with Bangalore standards, living in the cost-effective comfort of Coimbatore." }
  ];

  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Join the <span className="text-primary-400">Tribe?</span></h2>
            <p className="text-slate-400 max-w-2xl">More than a job, it's a calling. Here is what you get when you join us.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {benefits.map((b, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="glass-panel p-8 rounded-2xl border border-slate-800 hover:border-primary-500/40 hover:bg-slate-900 transition-all group"
               >
                   <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-primary-400 mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors shadow-lg">
                       <b.icon size={24} />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-3">{b.title}</h3>
                   <p className="text-slate-400 text-sm leading-relaxed">{b.desc}</p>
               </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};
