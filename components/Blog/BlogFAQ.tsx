import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export const BlogFAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
  
    const faqs = [
        { q: "How often are blogs updated?", a: "We publish detailed articles and case studies every Tuesday and Thursday." },
        { q: "Can students contribute?", a: "Yes! We have a 'Student Voices' section where alumni can share their project experiences." },
        { q: "Is the AI content beginner friendly?", a: "Absolutely. We tag our articles as 'Beginner', 'Intermediate', or 'Advanced' so you know where to start." },
        { q: "Do you publish case studies?", a: "Yes, we regularly break down successful campaigns and software architectures built by our students." }
    ];

    return (
        <section className="py-20 bg-slate-950">
            <div className="container mx-auto px-6 max-w-3xl">
                <h2 className="text-2xl font-bold text-white mb-8 text-center">Common Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className={`glass-panel rounded-xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'border-primary-500/40 bg-slate-900/80' : 'border-slate-800'}`}
                        >
                            <button 
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-5 text-left"
                            >
                                <span className={`font-semibold ${openIndex === index ? 'text-white' : 'text-slate-300'}`}>{faq.q}</span>
                                <div className={`p-1 rounded-full ${openIndex === index ? 'bg-primary-500/20 text-primary-400' : 'bg-slate-800 text-slate-500'}`}>
                                     {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                                </div>
                            </button>
                            <div 
                                className={`px-5 text-slate-400 text-sm leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                {faq.a}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default BlogFAQ;
