import React from 'react';
import { motion } from 'framer-motion';

export const OurValues: React.FC = () => {
    const values = [
        { title: "Student First", desc: "Every decision we make starts with 'How does this help the student?'" },
        { title: "Innovation", desc: "We embrace new tools (AI) before the world catches up." },
        { title: "Integrity", desc: "We are honest about what we teach and what we promise." },
        { title: "Excellence", desc: "Good enough is not enough. We strive for world-class quality." }
    ];

    return (
        <section id="values" className="py-20 bg-slate-900/50">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left Text */}
                    <div className="sticky top-24">
                        <div className="w-16 h-1 bg-primary-500 mb-6"></div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                            The Values That <br /> Drive Us Forward
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            We are building a culture where passion meets purpose. Our values aren't just posters on a wall; they are the filter through which we hire, teach, and grow.
                        </p>
                        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                             <p className="text-white italic">"We hire for attitude and train for skill. If you have the passion to teach, we will give you the tools."</p>
                             <p className="text-primary-400 font-bold mt-4 text-sm">- Founder, KGPath</p>
                        </div>
                    </div>

                    {/* Right Cards */}
                    <div className="space-y-6">
                        {values.map((v, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-panel p-8 rounded-2xl border border-slate-800 hover:border-primary-500/30 transition-colors"
                            >
                                <h3 className="text-xl font-bold text-white mb-2">{v.title}</h3>
                                <p className="text-slate-400">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};