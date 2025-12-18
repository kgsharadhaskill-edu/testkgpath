import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface CourseSummary {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

interface OtherCoursesProps {
  courses: CourseSummary[];
}

export const Other: React.FC<OtherCoursesProps> = ({ courses }) => {
  if (!courses || courses.length === 0) return null;

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-2xl font-bold text-white mb-8">Explore Other Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((other) => (
            <Link to={`/courses/${other.id}`} key={other.id} className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-primary-500/30 transition-all group flex gap-6 items-center">
              <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                <img src={other.image} alt={other.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div>
                <span className="text-xs text-primary-400 font-bold uppercase tracking-wider">{other.category}</span>
                <h3 className="text-lg font-bold text-white mt-1 mb-2 group-hover:text-primary-400 transition-colors">{other.title}</h3>
                <p className="text-slate-400 text-sm line-clamp-2">{other.description}</p>
              </div>
              <div className="ml-auto">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white group-hover:bg-primary-600 transition-colors">
                  <ChevronRight size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};