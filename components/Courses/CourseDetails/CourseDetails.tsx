import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async'; // <-- ADDED: Import Helmet

import { courses } from '../../../data/courses'; 
import { EnquiryModal } from '../../layout/EnquiryModal'; 
import { CourseDetailsHero } from './CourseDetailsHero';
import { CourseOverview } from './CourseOverview';
import { CourseCurriculum } from './CourseCurriculum';
import { CourseSchedule } from './CourseSchedule';
import { CourseCareer } from './CourseCareer';
import { Certification } from './Certification';
import { HiringPartners } from './HiringPartners';
import { FAQs } from './FAQs';
import { Other } from './Other';

export const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const course = courses.find(c => c.id === id);
  const otherCourses = courses.filter(c => c.id !== id);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  if (!course) {
    return <Navigate to="/courses" />;
  }

  const canonicalUrl = `https://kgpath.com/courses/${course.slug}`;
  const imageUrl = `https://www.kgath.com${course.image}`;

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.metaDescription,
    provider: {
      '@type': 'Organization',
      name: 'KGPath', // <-- Replace with your company's name
      sameAs: 'https://www.kgpath.com', // <-- Replace with your homepage URL
    },
  };
  // --- END of SEO Variables ---

  const handleFormSuccess = () => {
    setIsFormSubmitted(true); 
    setModalOpen(false);     
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <CourseOverview course={course} />;
      case 'Curriculum':
        return <CourseCurriculum curriculum={course.curriculum || []} courseTitle={course.title} />;
      case 'Schedule':
        return <CourseSchedule batches={course.batches || []} setModalOpen={setModalOpen} />;
      case 'Career':
        return <CourseCareer course={course} />;
      default:
        return null;
    }
  };

  return (
    // <-- ADDED: React Fragment to wrap everything
    <>
      {/* --- ADDED: Helmet component for managing the document head --- */}
      <Helmet>
        {/* Primary SEO Meta Tags */}
        <title>{course.metaTitle}</title>
        <meta name="description" content={course.metaDescription} />
        <meta name="keywords" content={course.keywords.join(', ')} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={course.metaTitle} />
        <meta property="og:description" content={course.metaDescription} />
        <meta property="og:image" content={imageUrl} />

        {/* Twitter Card Meta Tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={course.metaTitle} />
        <meta property="twitter:description" content={course.metaDescription} />
        <meta property="twitter:image" content={imageUrl} />

        {/* JSON-LD Structured Data for Google Rich Results */}
        <script type="application/ld+json">
          {JSON.stringify(courseSchema)}
        </script>
      </Helmet>

      {/* Your original component JSX remains unchanged below */}
      <div className="bg-slate-950 min-h-screen font-sans text-slate-50">
        <EnquiryModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)}
          onSuccess={handleFormSuccess} 
        />

        <CourseDetailsHero 
          course={course} 
          setModalOpen={setModalOpen}
          isFormSubmitted={isFormSubmitted}
        />

        <HiringPartners partners={course.hiringPartners} category={course.category} />

        <div className="sticky top-[72px] z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800">
          <div className="container mx-auto px-6 max-w-7xl overflow-x-auto no-scrollbar">
              <div className="flex gap-10 min-w-max">
                  {['Overview', 'Curriculum', 'Schedule', 'Career'].map((tab) => (
                      <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`py-5 text-sm font-bold border-b-2 transition-all ${
                              activeTab === tab 
                              ? 'border-primary-500 text-primary-400' 
                              : 'border-transparent text-slate-400 hover:text-white hover:border-slate-700'
                          }`}
                          aria-pressed={activeTab === tab}
                      >
                          {tab}
                      </button>
                  ))}
              </div>
          </div>
        </div>

        <main className="container mx-auto px-6 py-12 max-w-7xl min-h-[40vh]">
            <AnimatePresence mode='wait'>
              {renderTabContent()}
            </AnimatePresence>
        </main>

        <Certification data={course.certification} />
        <FAQs data={course.specificFAQs} />
        <Other courses={otherCourses} />
      </div>
    </> // <-- ADDED: Closing tag for the React Fragment
  );
};