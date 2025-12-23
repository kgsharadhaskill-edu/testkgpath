import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';


// --- About FAQ ---
export const AboutFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "Who are the founders of KGPath?", a: "KGPath was founded by a duo of ex-Silicon Valley engineers and a veteran academician from Coimbatore, aiming to merge global tech standards with local talent." },
    { q: "How is your teaching methodology different?", a: "We use a 'Reverse-Engineering' approach. We start with a real-world problem, then teach the tools (AI, Code, Data) needed to solve it, rather than just teaching syntax." },
    { q: "What is the classroom environment like?", a: "It's not a classroom; it's a co-working space. We have open discussions, scrum meetings, and hackathons instead of exams." },
    { q: "Are the certifications industry recognized?", a: "Yes, our certifications are co-branded with our hiring partners and are highly valued for the practical portfolio that accompanies them." },
    { q: "What specific tools do students use?", a: "Students get hands-on experience with OpenAI API, GitHub Copilot, MidJourney, TensorFlow, Google Analytics 4, and enterprise-grade cloud platforms." }
  ];

  return (
    <section className="py-24 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Image */}
            <div className="lg:col-span-5 relative">
                 <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl relative z-10 aspect-square">
                    <img 
                        src="https://picsum.photos/seed/faq_illustration/800/800" 
                        alt="FAQ Context" 
                        className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-primary-900/20 mix-blend-overlay"></div>
                 </div>
                 {/* Decorative elements */}
                 <div className="absolute -top-4 -left-4 w-full h-full border border-dashed border-slate-600 rounded-2xl z-0"></div>
            </div>

            {/* Right Accordion */}
            <div className="lg:col-span-7">
                <h2 className="text-3xl font-bold text-white mb-8">Institutional <span className="text-primary-400">FAQs</span></h2>
                
                <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div 
                    key={index} 
                    className={`glass-panel rounded-xl transition-all duration-300 overflow-hidden ${
                      openIndex === index ? 'border-primary-500/50 bg-slate-800/60' : 'border-slate-800'
                    }`}
                    >
                    <button 
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full flex items-center justify-between p-5 text-left"
                    >
                        <span className={`font-semibold text-lg ${openIndex === index ? 'text-white' : 'text-slate-300'}`}>{faq.q}</span>
                        <div className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-primary-400' : 'text-slate-500'}`}>
                             <ChevronDown />
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
        </div>
      </div>
    </section>
  );
};
export default AboutFAQ;