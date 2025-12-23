import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  MapPin
  } from 'lucide-react';


export const OpenPositions: React.FC = () => {
    const jobs = [
        { title: "Senior Full Stack Trainer", type: "Full-time", exp: "3+ Years", role: "Trainer" },
        { title: "Digital Marketing Mentor", type: "Full-time", exp: "2+ Years", role: "Trainer" },
        { title: "Academic Counsellor", type: "Full-time", exp: "1-3 Years", role: "Sales" },
        { title: "Placement Officer", type: "Full-time", exp: "4+ Years", role: "Corporate Relations" },
        { title: "Video Content Creator", type: "Part-time / Full-time", exp: "1+ Years", role: "Marketing" },
        { title: "Course Coordinator", type: "Full-time", exp: "Fresher / 1 Yr", role: "Operations" },
    ];

    return (
        <section id="open-positions" className="py-20 bg-slate-900">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <span className="text-primary-500 font-bold tracking-widest uppercase text-xs">WE ARE HIRING</span>
                        <h2 className="text-3xl font-bold text-white mt-2">Current Openings</h2>
                    </div>
                    <div className="bg-slate-950 px-4 py-2 rounded-lg border border-slate-800 text-slate-400 text-sm flex items-center gap-2">
                        <MapPin size={16} className="text-primary-400" /> Location: Coimbatore Campus
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {jobs.map((job, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-primary-500/50 transition-all group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                        >
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary-400 transition-colors">{job.title}</h3>
                                <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                                    <span className="bg-slate-900 px-2 py-1 rounded border border-slate-700">{job.type}</span>
                                    <span>•</span>
                                    <span>{job.exp}</span>
                                    <span>•</span>
                                    <span>{job.role}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                                className="shrink-0 bg-slate-800 hover:bg-primary-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
                            >
                                Apply Now <ArrowRight size={16} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};