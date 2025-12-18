import React from 'react';
import { Share2, Bookmark, List, User, Linkedin, Twitter, Facebook } from 'lucide-react';

interface BlogSidebarProps {
  post: any;
  tableOfContents: string[];
}

export const BlogSidebar: React.FC<BlogSidebarProps> = ({ post, tableOfContents }) => {

  const handleShare = () => {
    const shareData = {
      title: post.title,
      text: `Check out this article: ${post.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log('Shared successfully'))
        .catch((err) => console.error('Error sharing:', err));
    } else {
      // Fallback: Copy URL to clipboard
      navigator.clipboard.writeText(shareData.url)
        .then(() => alert('Link copied to clipboard!'))
        .catch((err) => console.error('Could not copy link:', err));
    }
  };

  return (
    <aside className="lg:col-span-4 space-y-8">
      {/* Sticky Wrapper */}
      <div className="sticky top-24 space-y-8">

        {/* Share & Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleShare}
            className="flex-1 glass-panel py-3 rounded-lg text-slate-300 hover:text-primary-400 hover:border-primary-500/50 transition-all flex justify-center items-center gap-2 font-medium"
          >
            <Share2 size={18} /> Share
          </button>
        </div>

        {/* Table of Contents */}
        <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
          <h4 className="text-white font-bold mb-4 flex items-center gap-2">
            <List size={18} className="text-primary-400" /> In this Article
          </h4>
          <ul className="space-y-3">
            {tableOfContents.map((item, i) => (
              <li key={i}>
                <a href="#" className="text-slate-400 hover:text-primary-400 text-sm transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Author Bio */}
        <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-slate-800 flex items-center justify-center border-2 border-slate-700 mb-4">
            <User size={32} className="text-slate-300" />
          </div>
          <h4 className="text-white font-bold text-lg">{post.author}</h4>
          <p className="text-primary-400 text-sm font-medium uppercase mb-4">{post.authorRole}</p>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            Expert in AI-driven education strategies with 10+ years of experience in EdTech.
          </p>
          <div className="flex justify-center gap-4">
            <a href={post.linkedin || "#"} className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
            <a href={post.twitter || "#"} className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href={post.facebook || "#"} className="text-slate-400 hover:text-white transition-colors"><Facebook size={20} /></a>
          </div>
        </div>

      </div>
    </aside>
  );
};

export default BlogSidebar;
