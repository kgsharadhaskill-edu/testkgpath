import React from 'react';

export const CareersCTA: React.FC = () => {
    return (
        <section className="py-20 bg-slate-950">
             <div className="container mx-auto px-6 max-w-5xl">
                 <div className="glass-panel p-12 rounded-[2.5rem] border border-primary-500/30 text-center relative overflow-hidden">
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-900/20 via-slate-950 to-slate-950 -z-10"></div>
                     <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to shape the future of AI talent?</h2>
                     <div className="flex justify-center gap-4">
                         <button onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })} className="bg-primary-600 hover:bg-primary-500 text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-[0_0_25px_rgba(8,145,178,0.4)]">
                             Apply Now
                         </button>
                         <button onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })} className="glass-panel border border-white/20 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                             View Positions
                         </button>
                     </div>
                 </div>
             </div>
        </section>
    );
};
