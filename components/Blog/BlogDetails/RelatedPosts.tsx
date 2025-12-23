import React from 'react';
import { Link } from 'react-router-dom';

interface RelatedPostsProps {
  posts: any[];
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  if (posts.length === 0) return null;

  return (
    <section className="py-20 bg-slate-900 border-t border-slate-800">
       <div className="container mx-auto px-6 max-w-7xl">
           <h2 className="text-3xl font-bold text-white mb-10">Read Next</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {posts.map(rp => (
                   <Link to={`/blog/${rp.id}`} key={rp.id} className="group glass-panel rounded-2xl overflow-hidden border border-slate-800 hover:border-primary-500/50 transition-all flex flex-col h-full">
                       <div className="h-48 overflow-hidden relative">
                           <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                           <div className="absolute top-3 left-3 bg-slate-950/80 px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                               {rp.category}
                           </div>
                       </div>
                       <div className="p-6 flex flex-col flex-1">
                           <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-primary-400 transition-colors">{rp.title}</h3>
                           <p className="text-slate-400 text-sm line-clamp-2 mb-4 flex-1">{rp.excerpt}</p>
                           <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-auto">
                               <span>{rp.date}</span>
                               <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                               <span>{rp.readTime}</span>
                           </div>
                       </div>
                   </Link>
               ))}
           </div>
       </div>
    </section>
  );
};
export default RelatedPosts;