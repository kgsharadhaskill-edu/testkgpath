import React from 'react';
import { motion } from 'framer-motion';
import about from '../../assets/about-us-section.png';
import aboutsection from '../../assets/about-us-section-img.jpeg';

// --- Our Story ---
export const OurStory: React.FC = () => {
  const highlights = [
    "Curriculum designed by active CTOs",
    "100% Practical, AI-integrated labs",
    "Deep roots in Coimbatore's tech ecosystem"
  ];

  return (
    <section className="py-24 bg-slate-900/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-20">
          
          {/* Right Content */}
          <div className="flex-1 space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Born in <span className="text-primary-400">Coimbatore</span>, <br/>Built for the World
            </h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              KGPath began in 2021 with a simple yet urgent observation: the gap between academic theory and industry reality was widening. Traditional degrees were teaching history, while companies needed future-ready skills.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Our founders, veterans of the Silicon Valley startup scene, returned to their roots in Coimbatore to build an institution that treats AI not as a subject, but as the very fabric of learning.
            </p>
            
            <div className="space-y-4 pt-4">
              {highlights.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-center gap-4 p-4 rounded-lg bg-slate-900 border border-slate-800 hover:border-primary-500/30 transition-colors"
                >
                  <div className="h-2 w-2 rounded-full bg-primary-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                  <span className="text-slate-200 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Left Images */}
          <div className="flex-1 w-full relative min-h-[500px]">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="absolute top-0 left-8 w-3/4 h-3/4 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl z-10"
            >
              <img src={about} alt="Founders Meeting" className="w-full h-full object-cover opacity-80" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute bottom-0 right-8 w-2/3 h-2/3 rounded-2xl overflow-hidden border border-slate-600 shadow-2xl z-20 grayscale hover:grayscale-0 transition-all duration-700"
            >
              <img src={aboutsection} alt="Tech Hub" className="w-full h-full object-cover" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
export default OurStory;