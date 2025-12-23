import React from 'react';
import { motion } from 'framer-motion';
import { Users, MonitorPlay } from 'lucide-react';
import careerhero from '../../assets/careerhero.jpg';

// --- Animations ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const CareersHero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 bg-slate-950 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* UPDATED: Removed padding (p-8 lg:p-12) from this main container */}
        <div className="glass-panel rounded-[2rem] border border-slate-800 shadow-2xl overflow-hidden relative">
           {/* Decorative Glow */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>

           {/* UPDATED: Removed gap-16 */}
           <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
              {/* Left Content */}
              <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={fadeUp} 
                // UPDATED: Added padding here directly, and self-start for the hiring tag to align with padding
                className="space-y-6 flex flex-col justify-center p-8 lg:p-12"
              >
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/30 bg-primary-950/30 text-primary-400 text-xs font-bold tracking-widest uppercase self-start">
                    <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                    We are Hiring
                 </div>
                 <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight">
                    Shape the Future of
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400"> AI Education</span>
                 </h1>
                 <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
                    Join KGPath in Coimbatore and become part of a movement that is redefining how technology is taught. 
                    We are looking for innovators, mentors, and creators to empower the next generation.
                 </p>
                 <div className="flex flex-wrap gap-4 pt-4">
                    <button onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })} className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-3.5 rounded-full font-bold transition-all hover:shadow-[0_0_20px_rgba(8,145,178,0.4)]">
                        View Openings
                    </button>
                    <button onClick={() => document.getElementById('values')?.scrollIntoView({ behavior: 'smooth' })} className="glass-panel border border-slate-700 text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/5 transition-colors">
                        Our Culture
                    </button>
                 </div>
              </motion.div>

              {/* Right Illustration */}
              <motion.div 
                 initial={{ opacity: 0, x: 50 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.8 }}
                 className="relative min-h-[400px]" // min-height for mobile stacking
              >
                 <div className="relative w-full h-full">
                    {/* Abstract Floating Elements */}
                    <motion.div 
                       animate={{ y: [-10, 10, -10] }} 
                       transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                       className="absolute top-10 right-10 z-20"
                    >
                       <div className="glass-panel p-4 rounded-2xl border border-primary-500/30 bg-slate-900/80 backdrop-blur-md shadow-lg">
                          <Users className="text-primary-400 w-8 h-8" />
                       </div>
                    </motion.div>

                    <motion.div 
                       animate={{ y: [10, -10, 10] }} 
                       transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                       className="absolute bottom-20 left-10 z-20"
                    >
                       <div className="glass-panel p-4 rounded-2xl border border-purple-500/30 bg-slate-900/80 backdrop-blur-md shadow-lg">
                          <MonitorPlay className="text-purple-400 w-8 h-8" />
                       </div>
                    </motion.div>

                    {/* Main Visual */}
                    {/* UPDATED: Removed border-radius and border, parent overflow-hidden will clip it */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-slate-800 opacity-80">
                        <img 
                            src={careerhero} 
                            alt="Team Collaboration" 
                            className="w-full h-full object-cover mix-blend-overlay "
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                    </div>
                 </div>
              </motion.div>
           </div>
        </div>
      </div>
    </section>
  );
};