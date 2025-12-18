import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BarChart3, Settings, Globe2, UserCheck, Rocket } from 'lucide-react';
import { Milestone } from './types';
import { TimelineItem } from './TimelineItem';

export const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // KGPath Data mapped to the requested visual style
  const milestones: Milestone[] = [
    { 
      year: "2021", 
      title: "Foundation", 
      desc: "KGPath established in Vedapatti with 20 students, setting the groundwork for innovative education.", 
      icon: BarChart3,
      colorTheme: 'red' 
    },
    { 
      year: "2022", 
      title: "AI Integration", 
      desc: "Launch of region's first fully AI-integrated marketing course, revolutionizing the local ed-tech landscape.", 
      icon: Settings,
      colorTheme: 'green' 
    },
    { 
      year: "2023", 
      title: "Expansion", 
      desc: "Moved to 10,000 sq.ft campus and partnered with 5 MNCs to provide world-class exposure to students.", 
      icon: Globe2,
      colorTheme: 'blue' 
    },
    { 
      year: "2024", 
      title: "Success", 
      desc: "Crossed 500+ successful placements. Awarded 'Best EdTech in TN' for outstanding contribution.", 
      icon: UserCheck,
      colorTheme: 'indigo' 
    },
    { 
      year: "2025", 
      title: "Future", 
      desc: "Roadmap to launch Data Science Masters and Online Global Platform to reach learners worldwide.", 
      icon: Rocket,
      colorTheme: 'orange' 
    },
  ];

  // Animation for the "Road" drawing itself
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const lastItemIndex = milestones.length - 1;

  return (
    // Changed background to a dark slate color
    <section ref={containerRef} className="py-24 bg-slate-900 relative overflow-hidden min-h-screen">
      
      {/* Header */}
      <div className="container mx-auto px-6 max-w-5xl relative z-10 mb-20 text-center">
        {/* Updated header pill for dark theme */}
        <div className="inline-block p-2 px-4 rounded-full bg-slate-800 text-blue-300 font-semibold text-sm mb-4">
          Establishment to Excellence
        </div>
        {/* Updated heading text color for dark theme */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-50 mb-6 tracking-tight">
          Our Journey
        </h2>
        {/* Updated paragraph text color for dark theme */}
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          A visual timeline of innovation, growth, and the milestones that defined our path to success.
        </p>
      </div>

      <div className="container mx-auto px-4 relative max-w-6xl">
        
        {/* SVG Background "Road" - Desktop Only */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full hidden md:block pointer-events-none -z-0">
           <svg 
             className="w-full h-full" 
             viewBox="0 0 600 1200" 
             preserveAspectRatio="none"
           >
             {/* The Base Grey Road - updated stroke color for dark theme */}
             <path 
               d="M 300 0 
                  C 300 100, 100 100, 100 200 
                  C 100 300, 500 300, 500 400 
                  C 500 500, 100 500, 100 600 
                  C 100 700, 500 700, 500 800 
                  C 500 900, 300 900, 300 1200"
               fill="none" 
               stroke="#334155" // Corresponds to slate-700
               strokeWidth="6" 
               strokeLinecap="round"
             />
             
             {/* The Animated Colored Line (unchanged, bright colors look good on dark) */}
             <motion.path 
               d="M 300 0 
                  C 300 100, 100 100, 100 200 
                  C 100 300, 500 300, 500 400 
                  C 500 500, 100 500, 100 600 
                  C 100 700, 500 700, 500 800 
                  C 500 900, 300 900, 300 1200"
               fill="none" 
               stroke="url(#gradient)" 
               strokeWidth="6" 
               strokeLinecap="round"
               style={{ pathLength }}
             />
             <defs>
               <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                 <stop offset="0%" stopColor="#ef4444" />
                 <stop offset="25%" stopColor="#10b981" />
                 <stop offset="50%" stopColor="#06b6d4" />
                 <stop offset="75%" stopColor="#4f46e5" />
                 <stop offset="100%" stopColor="#f97316" />
               </linearGradient>
             </defs>
           </svg>
        </div>

        {/* Mobile Vertical Line - updated background color */}
        <div className="absolute left-4 top-0 bottom-0 w-1 bg-slate-700 md:hidden rounded-full"></div>
        <motion.div 
          className="absolute left-4 top-0 w-1 bg-gradient-to-b from-red-500 via-blue-500 to-orange-500 md:hidden rounded-full origin-top"
          style={{ scaleY: scrollYProgress }}
        ></motion.div>

        {/* Items Container */}
        <div className="relative z-10 pt-10 pb-32">
          {milestones.map((milestone, index) => {
            const isEven = index % 2 === 0;

            // Handle the last item differently for centering
            if (index === lastItemIndex) {
              return (
                <motion.div key={index} className="hidden md:block" style={{ x: '25%' }}>
                   <TimelineItem 
                      milestone={milestone} 
                      index={index} 
                      isEven={true} // Keep original isEven for connector direction
                   />
                </motion.div>
                // For mobile, we don't need the wrapper
              );
            }

            return (
              <TimelineItem 
                key={index} 
                milestone={milestone} 
                index={index} 
                isEven={isEven}
              />
            );
          })}
           {/* Render last item again just for mobile, without the wrapper */}
           <div className="block md:hidden">
              <TimelineItem 
                  milestone={milestones[lastItemIndex]} 
                  index={lastItemIndex} 
                  isEven={true}
              />
            </div>
        </div>
        
        {/* End of Road Graphic - updated for dark theme */}
        <div className="flex justify-center mt-[-40px] relative z-20">
             <div className="bg-slate-800 px-6 py-2 rounded-full border border-slate-700 shadow-lg text-slate-300 text-xs tracking-widest uppercase font-bold">
                Continue
             </div>
        </div>

      </div>
    </section>
  );
};