import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar } from 'lucide-react';

interface ScheduleProps {
  batches: any[];
  setModalOpen: (isOpen: boolean) => void;
}

export const CourseSchedule: React.FC<ScheduleProps> = ({ batches, setModalOpen }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
       <h2 className="text-2xl font-bold text-white mb-8">Upcoming Batches</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {batches?.map((batch, i) => (
               <div key={i} className="glass-panel p-6 rounded-xl border border-slate-800 hover:border-primary-500/30 transition-all group">
                   <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors">{batch.name}</h4>
                      <span className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wide">
                          {batch.status}
                      </span>
                   </div>
                   <div className="space-y-3 text-slate-400 text-sm">
                       <div className="flex items-center gap-3">
                          <Calendar size={18} className="text-slate-500" />
                          {batch.days}
                       </div>
                       <div className="flex items-center gap-3">
                          <Clock size={18} className="text-slate-500" />
                          {batch.time}
                       </div>
                   </div>
                   <button onClick={() => setModalOpen(true)} className="w-full mt-6 py-2 rounded-lg border border-slate-700 text-white text-sm font-semibold hover:bg-primary-600 hover:border-primary-600 transition-all">
                       Enroll Now
                   </button>
               </div>
           ))}
       </div>
    </motion.div>
  );
};