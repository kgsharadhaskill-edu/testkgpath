import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { blogPosts } from '../../../data/blog'; // Adjust path

// Import Sub-modules
import { BlogHero } from './BlogHero';
import { BlogContent } from './BlogContent';
import { BlogSidebar } from './BlogSidebar';
import { RelatedPosts } from './RelatedPosts';
import { BlogCTA } from './BlogCTA';

export const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === id);
  
  if (!post) {
    return <Navigate to="/blog" />;
  }

  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  // Mock Table of Contents
  const tableOfContents = [
    "Introduction",
    "The Shift from Syntax to Logic", 
    "Automated Testing Revolution",
    "Key Takeaways"
  ];

  return (
    <div className="bg-slate-950 min-h-screen font-sans text-slate-50">
       
       {/* 1. Hero Section */}
       <BlogHero post={post} />

       {/* 2. Main Content Grid */}
       <div className="container mx-auto px-6 max-w-7xl py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Left Column: Article */}
                <BlogContent post={post} />

                {/* Right Column: Sidebar */}
                <BlogSidebar post={post} tableOfContents={tableOfContents} />

            </div>
       </div>

       {/* 3. Related Articles */}
       <RelatedPosts posts={relatedPosts} />

       {/* 4. Promo Section */}
       <BlogCTA />

    </div>
  );
};