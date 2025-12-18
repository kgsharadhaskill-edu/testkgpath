import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Calendar, User, Clock, ChevronRight, Mail, Plus, Minus, Tag } from 'lucide-react';
import { blogPosts } from '../../data/blog';

// --- Animations ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// --- Blog List & Filters ---
export const BlogList: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Digital Marketing', 'Full Stack', 'Data Analytics', 'Careers'];
  
  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <section id="blog-grid" className="py-20 bg-slate-950">
       <div className="container mx-auto px-6">
          
          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
              <div className="flex flex-wrap gap-3">
                  {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                            activeCategory === cat 
                            ? 'bg-primary-500/20 border-primary-500 text-primary-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]' 
                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
                        }`}
                      >
                          {cat}
                      </button>
                  ))}
              </div>
              <div className="relative w-full md:w-64">
                  <input 
                    type="text" 
                    placeholder="Search articles..." 
                    className="w-full bg-slate-900 border border-slate-700 rounded-full px-4 py-2 pl-10 text-sm text-white focus:border-primary-500 focus:outline-none transition-colors placeholder:text-slate-600"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              </div>
          </div>

          {/* Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
             {filteredPosts.map((post) => (
                 <motion.div variants={fadeUp} key={post.id}>
                    <Link to={`/blog/${post.id}`} className="group block h-full">
                        <article className="h-full bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-[1.5rem] overflow-hidden hover:border-primary-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(8,145,178,0.1)] flex flex-col">
                            {/* Image */}
                            <div className="h-56 overflow-hidden relative">
                                <img 
                                    src={post.image} 
                                    alt={post.title} 
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                                />
                                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-white border border-slate-700">
                                    {post.category}
                                </div>
                            </div>
                            
                            {/* Content */}
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                                    <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                                    <span className="flex items-center gap-1"><Clock size={12}/> {post.readTime}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-1">
                                    {post.excerpt}
                                </p>
                                
                                <div className="flex items-center justify-between border-t border-slate-800 pt-4 mt-auto">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                                            <User size={14} />
                                        </div>
                                        <span className="text-xs text-slate-300 font-medium">{post.author}</span>
                                    </div>
                                    <span className="text-primary-400 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Read More <ArrowRight size={16} />
                                    </span>
                                </div>
                            </div>
                        </article>
                    </Link>
                 </motion.div>
             ))}
          </motion.div>

       </div>
    </section>
  );
};
export default BlogList;