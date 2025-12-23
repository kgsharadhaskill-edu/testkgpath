// src/components/courses/CourseDetails/CourseDetailsHero.tsx

import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { Download, ChevronRight, Clock, Award, Play, Star, MonitorPlay, CalendarDays, PlayCircle } from 'lucide-react';
import { Course } from '../../../types';
import { VideoModal } from '../../../components/layout/common/VideoModal';
import { VideoPlayer } from '../../../components/layout/common/VideoPlayer';
import Cookies from 'js-cookie';
import { EnquiryModal } from '../../../components/layout/EnquiryModal';
// FIX: Import the new SuccessModal component
import { SuccessModal } from '../../../components/layout/common/SuccessModal';

interface HeroProps {
  course: Course;
  isFormSubmitted: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>; 
}

const getYouTubeEmbedUrl = (url: string): string => {
  if (!url) return '';
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url;
};

export const CourseDetailsHero: React.FC<HeroProps> = ({ course }) => {
  const [isIntroVideoModalOpen, setIsIntroVideoModalOpen] = useState(false);
  const [isCardVideoPlaying, setIsCardVideoPlaying] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  // FIX: Add state to manage the success modal's visibility
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    const submitted = Cookies.get('enquirySubmitted') === 'true';
    setIsFormSubmitted(submitted);
  }, []);

  const ratingValue = "4.9";
  const batchStartDate = "Jan 20, 2025";

  const embeddableCardVideoUrl = getYouTubeEmbedUrl(course.videoUrl);
  const embeddableIntroVideoUrl = getYouTubeEmbedUrl(course.introVideoUrl);

  const handleCardClick = () => {
    if (isFormSubmitted && embeddableCardVideoUrl) {
      setIsCardVideoPlaying(true);
    } else {
      setIsFormModalOpen(true);
    }
  };

  // FIX: This function is now responsible for closing the enquiry form
  // and opening the success modal.
  const handleEnquirySuccess = () => {
    setIsFormModalOpen(false);
    setIsSuccessModalOpen(true);
  };
  
  // FIX: This new handler is called when the user closes the success modal.
  // It finalizes the submission process by setting the cookie and page state.
  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    Cookies.set('enquirySubmitted', 'true', { expires: 1 });
    setIsFormSubmitted(true);
  };

  const handleCardVideoPauseOrEnd = () => {
    setIsCardVideoPlaying(false);
  };

  return (
    <>
      <section 
        className="relative pt-28 pb-16 bg-slate-950 border-b border-slate-900 overflow-hidden"
        aria-labelledby="course-hero-title"
      >
        {/* ... (rest of the section JSX remains the same) ... */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-900/10 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-slate-400 mb-8">
              <li>
                <Link to="/courses" className="hover:text-primary-400 transition-colors">Courses</Link>
              </li>
              <li><ChevronRight size={14} /></li>
              <li>
                <span className="text-white font-medium" aria-current="page">{course.title}</span>
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8">
              <div className="flex items-center gap-4">
                <span className="bg-slate-800 text-slate-200 px-3 py-1 rounded text-xs font-bold border border-slate-700">
                  {course.mode}
                </span>
                <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                  <Star size={14} fill="currentColor" />
                  <span>{ratingValue}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h1 id="course-hero-title" className="text-4xl lg:text-6xl font-extrabold text-white leading-tight">
                  {course.title}
                </h1>
                <p className="text-lg lg:text-xl text-slate-400 font-light max-w-2xl">
                  {course.longDescription}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 backdrop-blur-sm">
                  <Clock className="text-primary-400 mb-2" size={20} />
                  <p className="text-xs text-slate-500 font-bold uppercase">Duration</p>
                  <p className="text-white font-semibold">{course.duration}</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 backdrop-blur-sm">
                  <MonitorPlay className="text-primary-400 mb-2" size={20} />
                  <p className="text-xs text-slate-500 font-bold uppercase">Mode</p>
                  <p className="text-white font-semibold">{course.mode}</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 backdrop-blur-sm">
                  <Award className="text-primary-400 mb-2" size={20} />
                  <p className="text-xs text-slate-500 font-bold uppercase">Rating</p>
                  <p className="text-white font-semibold">{ratingValue}/5.0</p>
                </div>
                <div className="bg-primary-600 p-4 rounded-xl shadow-lg shadow-primary-900/20 border border-primary-500">
                  <CalendarDays className="text-white mb-2" size={20} />
                  <p className="text-xs text-white/80 font-bold uppercase">Batch Start</p>
                  <p className="text-white font-bold">{batchStartDate}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                {isFormSubmitted ? (
                  <>
                    <a
                      href={course.brouchureUrl || '#'}
                      download={`${course.title.replace(/\s+/g, '-')}-Brochure.pdf`}
                      className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(22,163,74,0.3)] hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                      <Download size={20} /> Download Brochure
                    </a>
                    {embeddableIntroVideoUrl && (
                      <button
                        onClick={() => setIsIntroVideoModalOpen(true)}
                        className="glass-panel border border-primary-500/30 text-primary-400 px-8 py-4 rounded-xl font-bold hover:bg-primary-500/10 transition-colors flex items-center gap-2"
                      >
                        <PlayCircle size={20} /> Watch Intro Video
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => setIsFormModalOpen(true)}
                      className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:scale-105 active:scale-95"
                    >
                      Apply Now
                    </button>
                    <button 
                      onClick={() => setIsFormModalOpen(true)}
                      className="glass-panel border border-primary-500/30 text-primary-400 px-8 py-4 rounded-xl font-bold hover:bg-primary-500/10 transition-colors flex items-center gap-2"
                    >
                      <Download size={20} /> Download Brochure
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-black">
                {isCardVideoPlaying ? (
                  <VideoPlayer 
                    videoUrl={embeddableCardVideoUrl} 
                    className="w-full h-full" 
                    onPause={handleCardVideoPauseOrEnd}
                    onEnded={handleCardVideoPauseOrEnd}
                  />
                ) : (
                  <div 
                    className="relative w-full h-full group cursor-pointer" 
                    onClick={handleCardClick}
                  >
                    <img 
                      src={course.image} 
                      alt={`Promotional thumbnail for ${course.title}`} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      loading="eager" width="500" height="375"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-xl group-hover:scale-110 transition-transform">
                        <Play fill="white" className="text-white ml-2" size={32} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      <VideoModal 
        isOpen={isIntroVideoModalOpen}
        onClose={() => setIsIntroVideoModalOpen(false)}
        videoUrl={embeddableIntroVideoUrl}
        title="Welcome - An Introduction"
      />

      <EnquiryModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSuccess={handleEnquirySuccess} // Pass the new handler
      />
      
      {/* FIX: Render the new SuccessModal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
      />
    </>
  );
};