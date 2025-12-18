import React from 'react';
import { Link } from 'react-router-dom';

export const BlogCTA: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900/50 border-t border-slate-800">
       <div className="container mx-auto px-6 max-w-7xl">
           <div className="glass-panel p-10 rounded-3xl border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-10 bg-slate-900/40">
               <div className="max-w-2xl">
                   <h2 className="text-3xl font-bold text-white mb-4">Ready to master these skills?</h2>
                   <p className="text-slate-400 text-lg">Join KGPath's AI-integrated courses and future-proof your career. Get practical experience with the tools mentioned in this article.</p>
               </div>
               <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                   <Link to="/courses" className="bg-white text-slate-950 px-8 py-3.5 rounded-xl font-bold hover:bg-primary-50 transition-colors text-center whitespace-nowrap">
                       Explore Courses
                   </Link>
                   <Link to="/contact" className="border border-slate-700 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-colors text-center whitespace-nowrap">
                       Talk to Counselor
                   </Link>
               </div>
           </div>
       </div>
    </section>
  );
};
export default BlogCTA;