import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';
import Cookies from 'js-cookie';
import { courses } from '../../data/courses';

// Import modal
import { EnquiryModal } from '../layout/EnquiryModal'; 

export const CourseSection: React.FC = () => {
  const navigate = useNavigate();
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  const handleCourseClick = () => {
    const submitted = Cookies.get('enquirySubmitted') === 'true';

    if (submitted) {
      navigate('/courses');
      return;
    }

    setShowEnquiryModal(true);
  };

  // called when clicking close button only
  const handleCloseModal = () => {
    setShowEnquiryModal(false);
  };

  // called when modal form is actually submitted
  const handleModalSuccess = () => {
    // set cookie for future page visits
    Cookies.set('enquirySubmitted', 'true', { expires: 30 });

    setShowEnquiryModal(false);
    
    // go to courses right away
    navigate('/courses');
  };

  return (
    <>
      <section className="py-24 bg-slate-900/30 relative">
        <div className="container mx-auto px-6">

          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-3xl lg:text-5xl font-bold text-white">Our AI-Integrated Courses</h2>
              <p className="text-slate-400">
                Designed for the modern tech landscape. Learn skills that machines can't replace, but only enhance.
              </p>
            </div>

            <button
              onClick={handleCourseClick}
              className="text-primary-400 hover:text-white font-medium flex items-center gap-2 transition-colors"
            >
              View All Courses <ArrowRight size={16} />
            </button>
          </div>

          {/* --- Course Cards ---- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="glass-panel rounded-2xl overflow-hidden group hover:border-primary-500/30 transition-all duration-300 flex flex-col h-full"
              >
                <div className="h-52 overflow-hidden relative">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors mb-4">
                    {course.title}
                  </h3>
                  <div className="absolute top-4 left-4 bg-primary-600/90 backdrop-blur-md px-3 py-1 rounded-md text-xs font-bold text-white shadow-lg">
                    {course.category}
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                    {course.description}
                  </p>
                  
                  <div className="border-t border-slate-800 pt-6 mt-auto">
                    <div className="flex gap-4">
                      
                      <button
                        onClick={handleCourseClick}
                        className="flex-1 bg-white text-slate-950 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors"
                      >
                        View Program
                      </button>

                      <button
                        onClick={handleCourseClick}
                        className="flex-1 border border-slate-700 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                      >
                        <Download size={16} /> Brochure
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Enquiry Modal */}
      <EnquiryModal 
          isOpen={showEnquiryModal}
          onClose={handleCloseModal}
          onSuccess={handleModalSuccess}
      />
    </>
  );
};

export default CourseSection;
