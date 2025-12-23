import React from 'react';
import { motion, Variants } from 'framer-motion';

// --- Shared Animation Variants ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

// --- About Hero ---
export const AboutHero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-950 py-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
         <img 
           src="https://picsum.photos/seed/campus_tech/1920/1080" 
           alt="Campus Background" 
           className="w-full h-full object-cover opacity-30"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40"></div>
         <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto space-y-8"
        >
          <motion.div variants={fadeUp} className="inline-block">
             <span className="px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-950/40 text-primary-400 text-sm font-medium tracking-wider uppercase backdrop-blur-md">
                About KGPath
             </span>
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight">
             Redefining Education for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">AI Era</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-light">
            We are more than just an institute; we are a movement rooted in the heart of Coimbatore. 
            Fusing academic rigor with the explosive potential of Artificial Intelligence to craft the adaptive workforce of tomorrow.
          </motion.p>

          <motion.div variants={fadeUp} className="flex justify-center pt-8">
             <div className="h-16 w-0.5 bg-gradient-to-b from-primary-500 to-transparent"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
export default AboutHero;