import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle
  
  } from 'lucide-react';

// --- Animations ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const ContactHero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 bg-slate-950 overflow-hidden">
      {/* Background Diagonal Split */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary-900/20 via-slate-950 to-slate-950 pointer-events-none transform skew-y-3 origin-top-right scale-110"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Text */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/30 bg-primary-950/30 text-primary-400 text-xs font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
              Admissions Open
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight">
              Let's Connect & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">Build Your Future</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
              Whether you have questions about our AI courses, need admission support, or want to explore partnerships, our team in Coimbatore is here to help.
            </p>
          </motion.div>

          {/* Right 3D Visuals */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] flex items-center justify-center"
          >
             <div className="relative w-full h-full">
                {/* Abstract Floating Elements */}
                <motion.div 
                   animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }} 
                   transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                   className="absolute top-10 right-20 z-10"
                >
                   <div className="w-32 h-32 bg-gradient-to-br from-primary-500/30 to-purple-500/30 backdrop-blur-md rounded-full border border-white/10 shadow-[0_0_50px_rgba(8,145,178,0.3)]"></div>
                </motion.div>

                <motion.div 
                   animate={{ y: [20, -20, 20], rotate: [0, -10, 0] }} 
                   transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 1 }}
                   className="absolute bottom-20 left-10 z-20"
                >
                   <div className="w-40 h-40 bg-gradient-to-tl from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl border border-primary-500/20 rotate-12 flex items-center justify-center">
                      <MessageCircle size={48} className="text-primary-400 opacity-80" />
                   </div>
                </motion.div>

                {/* Central Mesh Hint */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};