import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileSearch, UserCheck, Code2, Cpu, Trophy } from 'lucide-react';

interface Step {
  title: string;
  icon: React.ElementType;
  description: string;
  color: string;
  glowColor: string;
}

export const HiringProcess: React.FC = () => {
  const stepTitles = ["App Review", "Screening", "Demo / Task", "Tech Eval", "Offer"];
  
  const steps: Step[] = [
    { 
      title: stepTitles[0], 
      icon: FileSearch, 
      description: "CV & Portfolio Assessment",
      color: "from-cyan-400 to-cyan-600",
      glowColor: "rgba(34, 211, 238, 0.5)"
    },
    { 
      title: stepTitles[1], 
      icon: UserCheck, 
      description: "Initial Cultural Fit Chat",
      color: "from-blue-400 to-blue-600",
      glowColor: "rgba(96, 165, 250, 0.5)"
    },
    { 
      title: stepTitles[2], 
      icon: Code2, 
      description: "Take-home Coding Challenge",
      color: "from-indigo-400 to-indigo-600",
      glowColor: "rgba(129, 140, 248, 0.5)"
    },
    { 
      title: stepTitles[3], 
      icon: Cpu, 
      description: "Deep Technical Interview",
      color: "from-purple-400 to-purple-600",
      glowColor: "rgba(192, 132, 252, 0.5)"
    },
    { 
      title: stepTitles[4], 
      icon: Trophy, 
      description: "Final Offer & Onboarding",
      color: "from-fuchsia-400 to-fuchsia-600",
      glowColor: "rgba(232, 121, 249, 0.5)"
    }
  ];

  return (
    <section className="py-20 bg-slate-950 w-full min-h-screen flex flex-col justify-center overflow-hidden relative">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Side: Central Hub */}
          <div className="w-full lg:w-1/3 flex flex-col items-center justify-center relative">
            {/* Connecting Lines SVG (Desktop Only) */}
            <div className="hidden lg:block absolute left-1/2 top-1/2 w-[800px] h-[600px] -translate-y-1/2 z-0 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="none">
                <defs>
                  {steps.map((step, i) => (
                    <linearGradient key={`grad-${i}`} id={`lineGradient-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="transparent" />
                      <stop offset="20%" stopColor={step.glowColor} stopOpacity="0.2" />
                      <stop offset="100%" stopColor={step.glowColor} stopOpacity="0.8" />
                    </linearGradient>
                  ))}
                </defs>
                {steps.map((step, i) => {
                  // Calculate dynamic Y positions for lines to fan out
                  // Hub center is around y=300
                  // Targets spread from y=50 to y=550
                  const yTarget = 60 + (i * (480 / (steps.length - 1)));
                  return (
                    <motion.path
                      key={i}
                      d={`M 150,300 C 250,300 300,${yTarget} 400,${yTarget}`}
                      fill="none"
                      stroke={`url(#lineGradient-${i})`}
                      strokeWidth="2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                    />
                  );
                })}
              </svg>
            </div>

            {/* The Hub Circle */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 w-64 h-64 rounded-full bg-slate-900 border-4 border-slate-800 flex flex-col items-center justify-center text-center p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              {/* Spinning Glow Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-500 border-r-purple-500 opacity-50 animate-spin-slow"></div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 mb-2">
                  How We Hire
                </h2>
                <p className="text-sm text-slate-400 font-light">
                  Our transparent 5-step process
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side: Steps Stack */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6 relative z-10">
            {steps.map((step, i) => (
              <StepItem key={i} step={step} index={i} total={steps.length} />
            ))}
          </div>

        </div>
      </div>
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1/3 h-full bg-cyan-900/10 blur-[100px] -z-10"></div>
    </section>
  );
};

const StepItem: React.FC<{ step: Step; index: number; total: number }> = ({ step, index, total }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="flex items-center group perspective"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. The Hexagon (Number/Icon) */}
      <div className="relative flex-shrink-0 z-20">
        <div 
            className={`
              w-20 h-24 lg:w-24 lg:h-28 
              flex items-center justify-center 
              bg-gradient-to-br ${step.color}
              shadow-[0_0_15px_rgba(0,0,0,0.3)]
              group-hover:shadow-[0_0_25px_${step.glowColor}]
              transition-all duration-300
            `}
            style={{ 
              clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" 
            }}
        >
          <div className="w-[96%] h-[96%] bg-slate-950 flex flex-col items-center justify-center" 
               style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}>
             <span className="text-xs font-bold text-slate-500 mb-1">0{index + 1}</span>
             <step.icon size={24} className={`text-white transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
          </div>
        </div>

        {/* Small "Tail" extension to connect to the card */}
        <div className={`
           absolute right-[-10px] top-1/2 -translate-y-1/2 
           w-6 h-1 bg-gradient-to-r ${step.color}
           z-10 hidden lg:block
        `}></div>
      </div>

      {/* 2. The Content Card */}
      <div className="flex-grow ml-4 lg:ml-8">
        <div className={`
            relative p-5 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm
            group-hover:border-slate-700 transition-colors duration-300
            shadow-lg
        `}>
          {/* Animated left border on hover */}
          <motion.div 
             className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-gradient-to-b ${step.color}`}
             initial={{ height: "0%" }}
             animate={{ height: isHovered ? "100%" : "30%" }}
             transition={{ duration: 0.3 }}
          />

          <div className="pl-4">
             <h3 className="text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                {step.title}
             </h3>
             <p className="text-slate-400 text-sm leading-relaxed">
                {step.description}
             </p>
          </div>
          
          {/* Arrow Icon on far right */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-slate-500">
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
          </div>
        </div>
      </div>

    </motion.div>
  );
};

