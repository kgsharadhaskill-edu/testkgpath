// components/Courses/CourseDetails/CourseCareer.tsx

import React from 'react';
import { Course } from '../../../types'; // Ensure path is correct for your types file
import { Briefcase } from 'lucide-react';

interface CareerProps {
  course: Course;
}

// A simple utility to extract the core skill from the course title
const getCoreSkill = (title: string): string => {
  return title.replace('AI in ', '').replace(' Course', '') || 'Industry Expert';
};

export const CourseCareer: React.FC<CareerProps> = ({ course }) => {
  const coreSkill = getCoreSkill(course.title);

  return (
    // Wrap in a <section> for semantic grouping.
    <section 
        className="space-y-16" 
        aria-labelledby="career-opportunities-heading"
    >
      {/* --- Part 1: Who is this course for? --- */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        <div className="flex-1 lg:max-w-md">
            <span className="bg-primary-600 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                WHO CAN LEARN
            </span>
            <h2 id="career-opportunities-heading" className="text-4xl font-extrabold text-white mt-6 leading-tight">
                Designed for Ambitious Learners
            </h2>
            {/* SEO & Maintainability: Content now comes from courses.ts */}
            <p className="text-slate-400 mt-6 text-lg leading-relaxed">
                {course.careerSectionDescription}
            </p>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {course.whoCanLearn?.map((persona, i: number) => (
                <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-primary-500/30 transition-colors group">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-primary-400 mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                        <persona.icon size={24} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{persona.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        {persona.desc}
                    </p>
                </div>
            ))}
        </div>
      </div>

      {/* --- Part 2: What jobs can you get? (SEO CRITICAL) --- */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 lg:p-12 text-center">
          <Briefcase className="text-primary-400 mx-auto mb-4" size={32} aria-hidden="true" />
          <h3 className="text-3xl font-bold text-white">
              Unlock Your Career in <span className="text-primary-400">{coreSkill}</span>
          </h3>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
              Upon graduation, you will be equipped with the skills and portfolio to confidently apply for roles such as:
          </p>
          
          {/* SEO GOLDMINE: Listing specific job titles as keywords */}
          <ul className="flex flex-wrap justify-center gap-3 mt-8" aria-label="Potential career paths after completing the course">
              {course.careerPaths?.map((path, i: number) => (
                  <li key={i} className="px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium">
                      {path}
                  </li>
              ))}
          </ul>
      </div>
    </section>
  );
};