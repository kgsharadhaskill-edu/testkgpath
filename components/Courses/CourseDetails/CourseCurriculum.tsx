import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

// Recommended: Update your Course type in courses.ts
interface Module {
  title: string;
  lessons: string[]; // Use an array of strings for actual lesson titles
  duration: string;
}

interface CurriculumProps {
  courseTitle: string; // Pass the course title for more context
  curriculum: Module[];
}

export const CourseCurriculum: React.FC<CurriculumProps> = ({ courseTitle, curriculum }) => {
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);

  // Animation variants for the content panel
  const panelVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } }
  };

  return (
    // Wrap in a <section> for semantic grouping
    <section aria-labelledby="curriculum-heading" className="space-y-6">
      <h2 id="curriculum-heading" className="text-2xl font-bold text-white mb-8">
        {courseTitle} Curriculum
      </h2>
      
      {/* SEO: This div is the container for the structured data items */}
      <div className="space-y-4">
          {curriculum?.map((module, index) => (
              // itemscope, itemtype, and itemprop are for Schema.org structured data
              <div 
                key={index} 
                className="glass-panel border border-slate-800 rounded-xl overflow-hidden transition-all"
                itemScope 
                itemProp="hasCourseInstance" 
                itemType="https://schema.org/CourseInstance"
              >
                <meta itemProp="name" content={module.title} />

                {/* The heading for the question part of the accordion */}
                <h3 className="text-lg font-bold">
                    <button 
                        onClick={() => setOpenModuleIndex(openModuleIndex === index ? null : index)}
                        className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors text-left"
                        // Accessibility: Controls which panel is expanded
                        aria-expanded={openModuleIndex === index}
                        aria-controls={`module-panel-${index}`}
                    >
                        <div className="flex items-center gap-4">
                           <BookOpen className="text-primary-400 shrink-0" size={24}/>
                           <div>
                                <span className={`font-bold ${openModuleIndex === index ? 'text-primary-400' : 'text-white'}`}>{module.title}</span>
                                <p className="text-slate-500 text-sm mt-1">{module.lessons.length} Lessons · {module.duration}</p>
                           </div>
                        </div>

                        <span className="text-primary-400 text-sm font-bold flex items-center gap-2 shrink-0 ml-4">
                            {openModuleIndex === index ? 'Hide' : 'View'}
                            {openModuleIndex === index ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                        </span>
                    </button>
                </h3>
                  
                {/* The content panel */}
                <AnimatePresence initial={false}>
                  {openModuleIndex === index && (
                      <motion.div
                          id={`module-panel-${index}`}
                          className="px-5 pb-6 border-t border-slate-800/50 bg-slate-900/30 overflow-hidden"
                          // Accessibility: Role for the content panel
                          role="region"
                          aria-labelledby={`module-heading-${index}`}
                          variants={panelVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                      >
                          {/* itemProp connects this content to the parent item */}
                          <ul className="space-y-3 mt-4" itemProp="description">
                              {module.lessons.map((lesson, lessonIndex) => (
                                  <li key={lessonIndex} className="flex items-center gap-3 text-slate-400 text-sm">
                                      <div className="w-1.5 h-1.5 rounded-full bg-slate-600 shrink-0"></div>
                                      <span>{lesson}</span>
                                  </li>
                              ))}
                          </ul>
                      </motion.div>
                  )}
                </AnimatePresence>
              </div>
          ))}
      </div>
    </section>
  );
};
export default CourseCurriculum;