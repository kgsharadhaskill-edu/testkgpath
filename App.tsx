import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { FloatingWidgets } from './components/layout/FloatingWidgets';

import {
  HeroSection,
  AboutSection,
  CourseSection,
  WhyChooseUs,
  Testimonials,
  FAQSection,
  CTASection,
} from './components/Home/HomeSections';

import {
  AboutHero,
  OurStory,
  VisionMission,
  Timeline,
  Achievements,
  AboutFAQ,
} from './components/About/AboutSections';

import {
  CoursesHero,
  CoursesList,
  GeneralFAQ,
} from './components/Courses/CoursesSections';

import { CourseDetails } from './components/Courses/CourseDetails/CourseDetails';

import {
  BlogHero,
  BlogList,
  Newsletter,
  BlogFAQ,
} from './components/Blog/BlogSections';

import { BlogDetails } from './components/Blog/BlogDetails/BlogDetails';
import { PlacementPage } from './components/Placement/PlacementSections';
import { CareersPage } from './components/Careers/CareersSections';
import { ContactPage } from './components/Contact/ContactSections';

import { trackPageView } from './analytics/ga';


// --------------------
// Page Components
// --------------------

const HomePage = () => (
  <main className="bg-slate-950 min-h-screen">
    <HeroSection />
    <AboutSection />
    <CourseSection />
    <WhyChooseUs />
    <Testimonials />
    <FAQSection />
    <CTASection />
  </main>
);

const AboutPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="bg-slate-950 min-h-screen pt-16">
      <AboutHero />
      <OurStory />
      <VisionMission />
      <Timeline />
      <Achievements />
      <AboutFAQ />

      <section className="py-16 bg-slate-950 border-t border-slate-900 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Want to meet the team?
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-primary-400 hover:text-primary-300 font-medium underline underline-offset-4"
          >
            Schedule a Campus Visit
          </button>
        </div>
      </section>
    </main>
  );
};

const CoursesPage = () => (
  <main className="bg-slate-950 min-h-screen">
    <CoursesHero />
    <CoursesList />
    <GeneralFAQ />
  </main>
);

const BlogPage = () => (
  <main className="bg-slate-950 min-h-screen">
    <BlogHero />
    <BlogList />
    <Newsletter />
    <BlogFAQ />
  </main>
);


// --------------------
// Helpers
// --------------------

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


// --------------------
// App Content (Inside Router)
// --------------------

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return (
    <>
      <ScrollToTop />

      <div className="flex flex-col min-h-screen bg-slate-950 font-sans text-slate-50 antialiased selection:bg-primary-500/30 selection:text-primary-100 relative">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/placement" element={<PlacementPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        <FloatingWidgets />
        <Footer />
      </div>
    </>
  );
};


// --------------------
// Root App
// --------------------

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
