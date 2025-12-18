import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User } from 'lucide-react';

interface BlogHeroProps {
  post: any; // Replace 'any' with your BlogPost interface
}

export const BlogHero: React.FC<BlogHeroProps> = ({ post }) => {
  return (
    <section className="relative pt-32 pb-12 bg-slate-950 border-b border-slate-900">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-900/10 via-slate-950 to-slate-950"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
         <div className="mb-8">
             <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">
                <ArrowLeft size={16} /> Back to Blog
             </Link>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="flex items-center gap-4 mb-6">
                        <span className="inline-block px-3 py-1 rounded-full border border-primary-500/30 bg-primary-950/30 text-primary-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(8,145,178,0.2)]">
                            {post.category}
                        </span>
                        <span className="text-slate-500 text-sm font-medium flex items-center gap-1">
                            <Clock size={14} /> {post.readTime}
                        </span>
                    </div>
                    
                    <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-[1.15] mb-6">
                        {post.title}
                    </h1>
                    
                    <p className="text-xl text-slate-400 font-light leading-relaxed max-w-3xl">
                        {post.excerpt}
                    </p>
                </motion.div>
            </div>
            
            {/* Author Card (Hero) */}
            <div className="lg:col-span-4 lg:mb-2">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
                    <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center border-2 border-slate-700">
                        <User size={24} className="text-slate-300" />
                    </div>
                    <div>
                        <p className="text-white font-bold">{post.author}</p>
                        <p className="text-primary-400 text-xs font-medium uppercase">{post.authorRole}</p>
                        <p className="text-slate-500 text-xs mt-1">{post.date}</p>
                    </div>
                </div>
            </div>
         </div>
      </div>
    </section>
  );
};
export default BlogHero;