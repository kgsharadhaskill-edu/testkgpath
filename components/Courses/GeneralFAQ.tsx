import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

// --- General FAQ ---
export const GeneralFAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
  
    const generalFaqs = [
      { question: "Are the classes online or offline?", answer: "We offer both! Our offline campus in Saravanampatti provides a collaborative environment, while our hybrid model allows flexibility with live online sessions." },
      { question: "Do students need prior experience?", answer: "Not necessarily. Our Foundation Module in the first 2 weeks covers all basics needed for beginners." },
      { question: "Is placement support included?", answer: "Yes, 100% placement support is included. We don't stop until you get your first offer letter." },
      { question: "Do you offer EMI options?", answer: "Yes, we have tied up with financial partners to offer 0% interest EMI options for up to 12 months." },
      { question: "How long does each course take?", answer: "Courses range from 12 weeks to 24 weeks depending on the specialization intensity." },
    ];
  
    return (
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none"></div>
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Common Questions</h2>
            <p className="text-slate-400">General information about admission and campus life.</p>
          </div>
          
          <div className="space-y-4">
            {generalFaqs.map((faq, index) => (
                <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`glass-panel rounded-xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'border-primary-500/40 bg-slate-900/80 shadow-lg' : 'border-slate-800 hover:bg-slate-900/40'}`}
                >
                    <button 
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full flex items-center justify-between p-6 text-left"
                    >
                        <span className={`font-semibold ${openIndex === index ? 'text-white' : 'text-slate-300'}`}>{faq.question}</span>
                        <div className={`p-1 rounded-full ${openIndex === index ? 'bg-primary-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                             {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                        </div>
                    </button>
                    <div 
                        className={`px-6 text-slate-400 text-sm leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                        {faq.answer}
                    </div>
                </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
};
export default GeneralFAQ;