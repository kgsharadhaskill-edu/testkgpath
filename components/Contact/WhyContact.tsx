import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Youtube, Instagram, Calendar, Globe, User, Download, Facebook } from 'lucide-react';

import TwitterIcon from '../../assets/twitter.png';   // <-- FIXED (default import)

export const WhyContact: React.FC = () => {
    const reasons = [
        { icon: User, title: "Career Advice", desc: "Speak to expert counsellors" },
        { icon: Download, title: "Brochures", desc: "Request detailed syllabus" },
        { icon: Globe, title: "Partnership", desc: "For colleges & corporates" },
        { icon: Calendar, title: "Events", desc: "Host workshops with us" },
    ];

    return (
        <section className="py-24 bg-slate-950">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Why Reach Out?</h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {reasons.map((r, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-24 h-24 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary-400 group-hover:border-primary-500/50 transition-all shadow-xl mb-6 relative">
                                <r.icon size={32} />
                                <div className="absolute inset-0 rounded-full border border-primary-500 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all"></div>
                            </div>
                            <h4 className="text-white font-bold mb-1">{r.title}</h4>
                            <p className="text-slate-500 text-sm">{r.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Social */}
                <div className="relative py-10 border-t border-slate-900">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-slate-800 -z-10"></div>

                    <div className="flex justify-center gap-8 md:gap-16">

                        {[
                            { icon: Facebook, label: "Facebook", link: "#" },
                            { icon: Instagram, label: "Instagram", link: "#" },
                            { icon: "twitter", label: "Twitter", link: "#" },
                            { icon: Linkedin, label: "LinkedIn", link: "#" },
                            { icon: Youtube, label: "YouTube", link: "#" }, // <-- special case
                        ].map((s, i) => (
                            <a 
                                key={i} 
                                href={s.link} 
                                className="bg-slate-950 px-4 py-2 flex flex-col items-center gap-2 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary-400 group-hover:border-primary-500 transition-all">
                                    
                                    {s.icon === "twitter" ? (
                                        <img src={TwitterIcon} alt="Twitter" className="w-5 h-5" />
                                    ) : (
                                        <s.icon size={20} />
                                    )}

                                </div>

                                <span className="text-xs text-slate-500 font-medium group-hover:text-white transition-colors">
                                    {s.label}
                                </span>

                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};
