import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, BrainCircuit, Cpu, BarChart3, Layers } from 'lucide-react';
import Cookies from 'js-cookie';
import { Helmet } from 'react-helmet-async'; // <-- ADDED: Import Helmet
import { courses } from '../../data/courses';
import { EnquiryModal } from '../layout/EnquiryModal';

export const CoursesList: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const getIcon = (cat: string) => {
    switch(cat) {
      case 'Marketing': return <BarChart3 size={24} />;
      case 'Development': return <Layers size={24} />;
      case 'Data': return <Cpu size={24} />;
      default: return <BrainCircuit size={24} />;
    }
  };

  const handleBrochureClick = () => {
    if (Cookies.get('enquirySubmitted') === 'true') {
      navigate('/courses'); // already submitted
    } else {
      setModalOpen(true); // open modal
    }
  };

  const handleModalSuccess = () => {
    Cookies.set('enquirySubmitted', 'true', { expires: 1 });
    setModalOpen(false);
    navigate('/courses');
  };


  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: courses.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1, // Position in the list
      item: {
        '@type': 'Course', // Each item is a Course
        name: course.title,
        description: course.description,
        // The URL to the individual course detail page.
        // Ensure this URL is absolute and matches your routing structure.
        url: `https://www.kgpath.com/courses/${course.id}`, 
      },
    })),
  };
  // --- END of JSON-LD Structure ---

  return (
    // <-- ADDED: React Fragment to wrap Helmet and the main section
    <>
      {/* --- ADDED: Helmet component for injecting structured data --- */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(itemListSchema)}
        </script>
      </Helmet>

      <section id="all-courses" className="py-24 bg-slate-900 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative bg-slate-950/50 backdrop-blur-sm rounded-[2rem] border border-slate-800 hover:border-primary-500/50 transition-all duration-500 overflow-hidden flex flex-col h-full hover:shadow-[0_0_40px_rgba(8,145,178,0.15)]"
              >
                <div className="p-8 pb-0 flex justify-between items-start relative z-10">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-700 text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300 shadow-lg">
                      {getIcon(course.category)}
                  </div>
                  <div className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-[10px] font-bold tracking-wider uppercase text-slate-300">
                      {course.mode}
                  </div>
                </div>

                <div className="p-8 pt-6 flex-1 relative z-10 flex flex-col">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {course.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                      <span className="text-xs text-slate-400 font-mono">{course.duration} Duration</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 border-l-2 border-slate-800 pl-4 group-hover:border-primary-500/50 transition-colors">
                      {course.description}
                  </p>

                  <div className="mt-auto grid grid-cols-2 gap-3">
                    <Link 
                      to={`/courses/${course.id}`} 
                      className="flex items-center justify-center bg-white text-slate-950 text-sm font-bold py-3 rounded-xl hover:bg-primary-50 hover:text-primary-900 transition-colors"
                    >
                      View Program
                    </Link>
                    <button 
                      onClick={handleBrochureClick} 
                      className="flex items-center justify-center gap-2 border border-slate-700 text-white text-sm font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors"
                    >
                      <Download size={16} /> Brochure
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modal wrapper using AnimatePresence */}
        <AnimatePresence>
          {modalOpen && (
            <EnquiryModal 
              isOpen={modalOpen} 
              onClose={() => setModalOpen(false)} 
              onSuccess={handleModalSuccess} 
            />
          )}
        </AnimatePresence>
      </section>
    </> // <-- ADDED: Closing tag for the React Fragment
  );
};

export default CoursesList;