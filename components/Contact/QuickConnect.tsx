
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle } from 'lucide-react';

export const QuickConnect: React.FC = () => {
    const cards = [
        { icon: Phone, title: "Call Us", desc: "+91 7397788915", sub: "Mon-Sat, 9am - 7pm" },
        { icon: Mail, title: "Email Us", desc: "contact@kgpath.com", sub: "Reply within 2 hours" },
        { icon: MessageCircle, title: "WhatsApp", desc: "+91 7397788915", sub: "Chat with AI Assistant" },
    ];

    return (
        <section className="py-10 bg-slate-950 relative z-20 -mt-20">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cards.map((card, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative bg-slate-900/80 backdrop-blur-md border border-slate-700 p-8 hover:border-primary-500/50 transition-all duration-300 overflow-hidden"
                            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%)', borderRadius: '1rem' }}
                        >
                            <div className="absolute top-0 right-0 w-20 h-20 bg-primary-500/10 rounded-bl-[4rem] transition-colors group-hover:bg-primary-500/20"></div>
                            
                            <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-primary-400 mb-4 group-hover:scale-110 transition-transform shadow-lg border border-slate-700">
                                <card.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">{card.title}</h3>
                            <p className="text-lg text-primary-400 font-semibold mb-1">{card.desc}</p>
                            <p className="text-xs text-slate-500">{card.sub}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

