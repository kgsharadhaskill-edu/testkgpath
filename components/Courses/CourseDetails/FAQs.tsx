    import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQsProps {
  data: FAQItem[];
}

export const FAQs: React.FC<FAQsProps> = ({ data }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!data || data.length === 0) return null;

  return (
    <section className="py-20 bg-slate-950 border-t border-slate-800">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {data.map((faq, index) => (
            <div
              key={index}
              className={`glass-panel rounded-xl overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'border-primary-500/40 bg-slate-900/80 shadow-[0_0_20px_rgba(8,145,178,0.1)]' : 'border-slate-800 hover:bg-slate-900/40'}`}
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className={`font-semibold text-lg ${openFaqIndex === index ? 'text-white' : 'text-slate-300'}`}>{faq.question}</span>
                <div className={`p-1 rounded-full ${openFaqIndex === index ? 'bg-primary-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                  {openFaqIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              <div
                className={`px-6 text-slate-400 text-sm leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};