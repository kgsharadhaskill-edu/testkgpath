import React from 'react';
import { motion } from 'framer-motion';
import { Tag, CheckCircle, Send } from 'lucide-react';

interface BlogContentProps {
  post: any;
}

export const BlogContent: React.FC<BlogContentProps> = ({ post }) => {
  return (
    <main className="lg:col-span-8">
        {/* Featured Image */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative aspect-video mb-12"
        >
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </motion.div>

        {/* Article Body */}
        <article className="prose prose-xl prose-invert max-w-none text-slate-300">
           <div className="space-y-8">
               {post.content.map((block: any, index: number) => {
                   switch(block.type) {
                       case 'h2':
                           return <h2 key={index} className="text-3xl font-bold text-white mt-12 mb-6 scroll-mt-24" id={`section-${index}`}>{block.text}</h2>;
                       case 'h3':
                           return <h3 key={index} className="text-2xl font-semibold text-white mt-8 mb-4">{block.text}</h3>;
                       case 'p':
                           return <p key={index} className="leading-8 text-lg text-slate-300">{block.text}</p>;
                       case 'quote':
                           return (
                               <blockquote key={index} className="glass-panel p-8 my-8 rounded-xl border-l-4 border-primary-400 italic text-white text-xl not-italic bg-slate-900/30">
                                   <span className="text-4xl text-primary-500 font-serif block mb-2">"</span>
                                   {block.text}
                               </blockquote>
                           );
                       case 'list':
                           return (
                               <ul key={index} className="space-y-4 my-8 pl-0 list-none">
                                   {(block.text as string[]).map((item, i) => (
                                       <li key={i} className="flex items-start gap-4">
                                           <div className="mt-2 w-2 h-2 rounded-full bg-primary-400 shrink-0 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                                           <span className="text-lg">{item}</span>
                                       </li>
                                   ))}
                               </ul>
                           );
                       default:
                           return null;
                   }
               })}
           </div>
        </article>

        {/* Key Takeaways Box */}
        <div className="mt-16 glass-panel border border-primary-500/30 rounded-2xl p-8 bg-gradient-to-br from-slate-900/80 to-slate-900/40">
           <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
               <div className="p-2 bg-primary-500/20 rounded-lg text-primary-400"><Tag size={20} /></div>
               Key Takeaways
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {post.takeaways.map((item: string, i: number) => (
                   <motion.div 
                     initial={{ opacity: 0, x: -10 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.1 }}
                     key={i} 
                     className="flex gap-4"
                    >
                       <div className="shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mt-1">
                           <CheckCircle size={14} />
                       </div>
                       <p className="text-slate-300 font-medium leading-relaxed">{item}</p>
                   </motion.div>
               ))}
           </div>
        </div>
    </main>
  );
};
export default BlogContent;