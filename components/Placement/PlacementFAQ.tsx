
import React, { useState } from 'react';
import { 
  
  Plus, Minus
  } from 'lucide-react';


export const PlacementFAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
  
    const faqs = [
        { q: "Do you guarantee placement?", a: "We provide 'Placement Assurance'. This means we guarantee unlimited interview opportunities until you get placed, provided you maintain 85% attendance and complete all projects." },
        { q: "What is the average salary package?", a: "For freshers, it ranges between 3.5 LPA to 6 LPA. For experienced professionals, our alumni have secured hikes up to 150%." },
        { q: "Do you help with portfolio building?", a: "Yes, it is mandatory. You will graduate with a GitHub/Behance portfolio containing at least 5 live projects, which is what recruiters actually look for." },
        { q: "What companies visit for campus drives?", a: "We have local partnerships with startups in Tidel Park Coimbatore and global MNCs like Zoho, TCS, and Freshworks for remote/Bangalore roles." }
    ];

    return (
        <section className="py-20 bg-slate-950 border-t border-slate-900">
            <div className="container mx-auto px-6 max-w-3xl">
                <h2 className="text-2xl font-bold text-white mb-8 text-center">Placement FAQs</h2>
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