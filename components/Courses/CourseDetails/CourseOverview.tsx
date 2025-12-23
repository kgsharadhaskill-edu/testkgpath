import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Course } from '@/types';

interface OverviewProps {
  course: Course; // Use the specific Course type
}

export const CourseOverview: React.FC<OverviewProps> = ({ course }) => {
  return (
    // The parent div is fine, no need for a <section> as it contains multiple sections.
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -10 }}
      className="space-y-12"
    >
      <article aria-labelledby="about-course-heading">
          {/* SEO: Use a consistent heading hierarchy. H1 is on the hero, so this should be H2. */}
          <h2 id="about-course-heading" className="text-2xl font-bold text-white mb-4">About the {course.title}</h2>
          
          {/* SEO: Use the new `aboutCourse` field which contains the detailed, keyword-rich description we wrote. */}
          <div className="text-slate-400 leading-relaxed text-lg space-y-4">
            {/* Split the content into paragraphs for better readability */}
            {course.aboutCourse.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
      </article>

      {/* SECTION 2: What You'll Learn (Learning Outcomes) */}
      <section aria-labelledby="learning-outcomes-heading">
          <h2 id="learning-outcomes-heading" className="text-2xl font-bold text-white mb-6">What You'll Learn</h2>
          
          {/* SEO: Using a <ul> (unordered list) is semantically correct and helps Google understand this is a list of key takeaways. */}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {/* SEO: Map over `learningOutcomes` instead of `whatYouLearn`. */}
              {course.learningOutcomes?.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="text-primary-500 shrink-0 mt-1" size={18} aria-hidden="true" />
                      <span className="text-slate-300 leading-relaxed">{item}</span>
                  </li>
              ))}
          </ul>
      </section>

      {/* SECTION 3: What You Get (Program Benefits) */}
      <section aria-labelledby="program-benefits-heading">
           <div className="mb-8">
               <span className="text-primary-500 font-bold tracking-widest uppercase text-xs">WHAT WE GIVE</span>
               <h2 id="program-benefits-heading" className="text-3xl font-bold text-white mt-2">What You <span className="text-primary-400">Get From Us</span></h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* SEO: Map over `programBenefits` instead of `whatYouGet`. */}
              {course.programBenefits?.map((card, i: number) => (
                  <div key={i} className={`${card.highlighted ? 'bg-primary-600 shadow-xl shadow-primary-900/20 transform md:-translate-y-2 border border-primary-500' : 'glass-panel border border-slate-800'} p-8 rounded-2xl`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${card.highlighted ? 'bg-white/20 text-white' : 'bg-slate-800 text-primary-400 border border-slate-700'}`}>
                          <card.icon size={24} aria-hidden="true" />
                      </div>
                      {/* Use an H3 for the card title, as it's a sub-heading of the H2. */}
                      <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                      <p className={`${card.highlighted ? 'text-white/90' : 'text-slate-400'} text-sm leading-relaxed`}>
                          {card.desc}
                      </p>
                  </div>
              ))}
           </div>
      </section>

      {/* SECTION 4: Skills You'll Gain (Tools & Technologies) */}
      <section aria-labelledby="skills-gained-heading">
          <h2 id="skills-gained-heading" className="text-2xl font-bold text-white mb-6">Tools & Technologies You'll Master</h2>
          {/* SEO: Using a <ul> with <li>s is semantically better than a div of spans. */}
          <ul className="flex flex-wrap gap-3" aria-label="A list of technologies and skills taught in the course">
              {course.skills?.map((skill: string, i: number) => (
                  <li key={i} className="px-4 py-2 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-sm font-medium hover:border-primary-500/50 hover:text-white transition-colors cursor-default">
                      {skill}
                  </li>
              ))}
          </ul>
      </section>
    </motion.div>
  );
};