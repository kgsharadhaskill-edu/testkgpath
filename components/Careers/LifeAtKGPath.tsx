import React from 'react';
import { motion } from 'framer-motion';
import careerone from '../../assets/careerone.png';
import careertwo from '../../assets/careertwo.png';
import careerthree from '../../assets/careerthree.png';
import careerfour from '../../assets/careerfour.jpg';
import careerfive from '../../assets/careerfive.jpg';
import careersix from '../../assets/careersix.jpg';

export const LifeAtKGPath: React.FC = () => {
    const images = [
        { src: careerone, label: "Team Outings" },
        { src: careertwo, label: "Workshops" },
        { src: careerthree, label: "Hackathons" },
        { src: careerfour, label: "Celebrations" },
        { src: careerfive, label: "Teaching Moments" },
        { src: careersix, label: "Campus Life" },
    ];

    return (
        <section className="py-20 bg-slate-950">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">Life at KGPath</h2>
                    <p className="text-slate-400">Work hard, play harder, and learn everyday.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((img, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative rounded-2xl overflow-hidden border border-slate-800 aspect-[4/3] cursor-pointer"
                        >
                            <img src={img.src} alt={img.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <span className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{img.label}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};