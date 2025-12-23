import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../../constants';
import FAQs from '../../assets/faqs.png';
import { EnquiryModal } from '../layout/EnquiryModal'; // ✅ import the modal

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ modal state

  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left Column: FAQs */}
            <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">Frequently Asked Questions</h2>
                <p className="text-slate-400 mb-10">Everything you need to know about the course and admission.</p>
                
                <div className="space-y-4">
                {FAQS.map((faq, index) => (
                    <div 
                    key={index} 
                    className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                      openIndex === index 
                        ? 'border-primary-500/40 bg-slate-800/40 scale-[1.02] shadow-lg' 
                        : 'border-slate-800 bg-transparent hover:border-slate-700 scale-100'
                    }`}
                    >
                    <button 
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full flex items-center justify-between p-6 text-left"
                    >
                        <span className={`font-semibold pr-4 ${openIndex === index ? 'text-white' : 'text-slate-300'}`}>{faq.question}</span>
                        <div className={`p-1 rounded-full ${openIndex === index ? 'bg-primary-500/20 text-primary-400' : 'bg-slate-800 text-slate-500'}`}>
                             {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                        </div>
                    </button>
                    <div 
                        className={`px-6 text-slate-400 text-sm leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                        {faq.answer}
                    </div>
                    </div>
                ))}
                </div>
            </div>

            {/* Right Column: Image */}
            <div className="relative hidden lg:block h-full min-h-[500px]">
                 <div className="sticky top-24 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl h-[500px]">
                    <img 
                        src={FAQs}
                        alt="AI FAQ Illustration" 
                        className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent">
                        <div className="absolute bottom-8 left-8 right-8">
                            <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
                            <p className="text-slate-400 text-sm mb-4">Our admission counselors are ready to help you plan your career path.</p>
                            <button
                                onClick={() => setIsModalOpen(true)} // ✅ open modal
                                className="bg-white text-slate-950 px-6 py-2.5 rounded-lg text-sm font-bold w-full hover:bg-slate-200 transition-colors"
                            >
                                Contact Support
                            </button>
                        </div>
                    </div>
                 </div>
            </div>

        </div>
      </div>

      {/* Modal */}
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> {/* ✅ render modal */}
    </section>
  );
};

export default FAQSection;
