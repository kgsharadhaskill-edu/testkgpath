import React from 'react';
import { motion } from 'framer-motion';
import { Milestone, ThemeColors } from './types';

interface TimelineItemProps {
  milestone: Milestone;
  index: number;
  isEven: boolean;
}

// NOTE: This colorMap might need to be in a shared file if used elsewhere.
const colorMap: Record<string, ThemeColors> = {
  red: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    border: 'border-red-200',
    iconBg: 'bg-red-500',
    shadow: 'shadow-red-200', // This is no longer used for the ring glow
    gradient: 'from-red-500 to-red-600',
  },
  green: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    border: 'border-emerald-200',
    iconBg: 'bg-emerald-500',
    shadow: 'shadow-emerald-200',
    gradient: 'from-emerald-500 to-emerald-600',
  },
  blue: {
    bg: 'bg-cyan-50',
    text: 'text-cyan-600',
    border: 'border-cyan-200',
    iconBg: 'bg-cyan-500',
    shadow: 'shadow-cyan-200',
    gradient: 'from-cyan-500 to-cyan-600',
  },
  indigo: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-600',
    border: 'border-indigo-200',
    iconBg: 'bg-indigo-500',
    shadow: 'shadow-indigo-200',
    gradient: 'from-indigo-500 to-indigo-600',
  },
  orange: {
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    border: 'border-orange-200',
    iconBg: 'bg-orange-500',
    shadow: 'shadow-orange-200',
    gradient: 'from-orange-500 to-orange-600',
  },
};

export const TimelineItem: React.FC<TimelineItemProps> = ({ milestone, index, isEven }) => {
  const theme = colorMap[milestone.colorTheme];
  const Icon = milestone.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex items-center justify-between mb-24 md:mb-32 w-full ${
        isEven ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Empty space for the other side of the timeline */}
      <div className="hidden md:block w-5/12" />

      {/* Center Marker on the Road */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center">
        {/* Glow removed from the marker */}
        <div className={`w-4 h-4 rounded-full border-2 border-white ${theme.iconBg}`}></div>
      </div>

      {/* Content Card */}
      <div className={`w-[calc(100%-3rem)] md:w-5/12 ml-12 md:ml-0 relative group`}>
         {/* Connector Line (Horizontal) */}
         <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] w-8 bg-gray-200 ${isEven ? '-right-8' : '-left-8'}`} />

        <div className={`
          relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-6 
          shadow-lg hover:shadow-xl 
          transition-all duration-300 transform hover:-translate-y-1
        `}>
          
          {/* Top colored accent line */}
          <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${theme.gradient}`} />

          {/* --- CHANGE HERE: The main content container is updated for centering --- */}
          <div className="flex flex-col items-center text-center gap-4">
            <span className={`text-5xl font-extrabold ${theme.text} opacity-20 select-none absolute right-4 top-4`}>
              {milestone.year}
            </span>
            
            <div className={`
              w-12 h-12 rounded-xl flex items-center justify-center shadow-lg
              bg-gradient-to-br ${theme.gradient} text-white
              group-hover:scale-110 transition-transform duration-300
            `}>
              <Icon size={24} strokeWidth={2} />
            </div>
            
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${theme.bg} ${theme.text} border ${theme.border}`}>
              {milestone.year}
            </span>
            <h3 className="text-xl font-bold text-slate-800 group-hover:text-slate-900">
              {milestone.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              {milestone.desc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};