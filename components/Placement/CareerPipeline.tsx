import React from 'react';

export const CareerPipeline: React.FC = () => {
    return (
        <section className="py-20 bg-slate-900">
             <div className="container mx-auto px-6 max-w-7xl">
                 <div className="glass-panel p-10 rounded-3xl border border-slate-800 relative overflow-hidden">
                     {/* Background Glow */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-primary-500/10 blur-[60px] pointer-events-none"></div>

                     <div className="text-center mb-12 relative z-10">
                         <h2 className="text-2xl font-bold text-white mb-2">Typical Growth Trajectory</h2>
                         <p className="text-slate-400">Where you start vs. where you can reach in 5 years.</p>
                     </div>

                     <div className="flex flex-col md:flex-row justify-center items-center gap-4 relative z-10">
                         {['Trainee', 'Junior Dev', 'Senior Dev', 'Team Lead', 'Architect'].map((role, i) => (
                             <React.Fragment key={i}>
                                 <div className="bg-slate-950 px-6 py-4 rounded-xl border border-slate-700 text-center min-w-[140px] hover:border-primary-500 transition-colors shadow-lg">
                                     <p className="text-slate-500 text-xs font-bold uppercase mb-1">Year {i < 1 ? '0-1' : i * 2}</p>
                                     <p className="text-white font-bold">{role}</p>
                                 </div>
                                 {i < 4 && (
                                     <div className="hidden md:block w-16 h-0.5 bg-gradient-to-r from-slate-700 to-slate-700">
                                         <div className="h-full bg-primary-500 w-full animate-pulse opacity-50"></div>
                                     </div>
                                 )}
                                 {i < 4 && (
                                     <div className="md:hidden h-8 w-0.5 bg-slate-700"></div>
                                 )}
                             </React.Fragment>
                         ))}
                     </div>
                 </div>
             </div>
        </section>
    );
};