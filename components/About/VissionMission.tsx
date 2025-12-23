import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, ShieldCheck } from 'lucide-react';

// --- Vision & Mission ---
export const VisionMission: React.FC = () => {
  const missions = [
    { icon: Target, title: "Outcome-Based Training", desc: "We provide outcome-based training that enhances employability and improves workforce productivity to meet the needs of industry and employers." },
    { icon: ShieldCheck, title: "Entrepreneurship Development", desc: "We offer necessary guidance and support to help candidates become entrepreneurs and build sustainable career pathways." },
    { icon: Users, title: "Rural Economic Development", desc: "We promote economic development among the rural population through targeted rural initiative programs focused on skills and livelihood." }
  ];

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-900/10 via-transparent to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 text-center">
        
        {/* Vision */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="glass-panel p-10 rounded-3xl border border-primary-500/20 shadow-[0_0_50px_rgba(8,145,178,0.1)] relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-950 px-6 py-2 border border-primary-500/30 rounded-full text-primary-400 font-bold uppercase tracking-widest text-sm">
              Our Vision
            </div>
            <h3 className="text-2xl md:text-3xl font-serif italic text-white leading-relaxed">
              "To provide top-quality training and skills that enable students to become professionals in their respective fields. We aim to act as an accelerator for individuals in the start-up phase of their careers by inspiring more people to pursue skill-development education and sustainable employment."
            </h3>
          </div>
        </motion.div>

        {/* Mission Title */}
        <div className="flex justify-center mb-10">
          <div className="bg-slate-950 px-6 py-2 border border-primary-500/30 rounded-full text-primary-400 font-bold uppercase tracking-widest text-sm">
            Our Mission
          </div>
        </div>
        
        {/* Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {missions.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:bg-slate-900 hover:border-primary-500/30 transition-all group"
            >
              <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-600 transition-colors text-primary-400 group-hover:text-white">
                <m.icon size={28} />
              </div>
              <h5 className="text-xl font-bold text-white mb-3">{m.title}</h5>
              <p className="text-slate-400 text-sm leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
export default VisionMission;