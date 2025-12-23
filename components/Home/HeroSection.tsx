import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import HeroImage from '../../assets/herosection.png';
import { EnquiryModal } from '../layout/EnquiryModal';
import Cookies from 'js-cookie';

// --- Logo Imports ---
import microsoft from '../../assets/microsoft.png'; 
import accenture from '../../assets/accenture.png'; 
import wipro from '../../assets/wipro.svg'; 
import zoho from '../../assets/zoho.png'; 
import infosys from '../../assets/infosys.png'; 
import tcs from '../../assets/tcs.svg';
import capgemini from '../../assets/capgemini.png';
import techmahindra from '../../assets/techmahindra.png';
import cognizant from '../../assets/Cognizant.svg';
// Note: I've assumed the logos are in an `assets` subfolder for organization. Adjust the path if necessary.

const HERO_STATS = [
  { value: '1500+', label: 'Students Trained' },
  { value: '50+', label: 'Hiring Partners' },
  { value: '100%', label: 'Placement Rate' }
];

// --- Updated Partner Logos Array ---
const PARTNER_LOGOS = [
  { src: tcs, name: 'TCS' },
  { src: infosys, name: 'Infosys' },
  { src: wipro, name: 'Wipro' },
  { src: cognizant, name: 'Cognizant' },
  { src: accenture, name: 'Accenture' },
  { src: techmahindra, name: 'Tech Mahindra' },
  { src: capgemini, name: 'Capgemini' },
  { src: zoho, name: 'Zoho' },
  { src: microsoft, name: 'Microsoft' },
];


const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  // Called when modal reports a successful submission
  const handleEnquirySuccess = () => {
    setIsModalOpen(false);
    Cookies.set('enquirySubmitted', 'true', { expires: 1 });
    setShowSuccessMessage(true);

    // Navigate to courses after 1.5s
    setTimeout(() => {
      navigate('/courses');
    }, 1500);
  };

  // Handle Explore Courses click
  const handleExploreClick = () => {
    if (Cookies.get('enquirySubmitted') === 'true') {
      // Already submitted: go directly to courses
      navigate('/courses');
    } else {
      // Not submitted: open modal
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>KGPath - AI-Integrated Training Institute in Coimbatore | Digital Marketing, Full Stack & Data Analytics</title>
        <meta 
          name="description" 
          content="KGPath offers AI-integrated courses in Digital Marketing, Full Stack Development, and Data Analytics in Coimbatore. IBM certified programs with 95% placement rate. Enroll now for hands-on training with real-world projects." 
        />
        <meta 
          name="keywords" 
          content="AI training Coimbatore, digital marketing course Coimbatore, full stack development Coimbatore, data analytics course Coimbatore, IBM certification, AI integrated learning, placement training institute, professional courses Coimbatore" 
        />
      </Helmet>

      <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-slate-950">
        {/* Background Blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" aria-hidden="true" />

        {/* Right Side Image - Full Bleed */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-0 right-0 w-full lg:w-1/2 h-[90%] hidden lg:block"
        >
          <img 
            src={HeroImage}
            alt="Group of students at KGPath" 
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent pointer-events-none"></div>
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex">
            {/* Left Content */}
            <div className="w-full lg:w-1/2">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/30 bg-primary-950/30 backdrop-blur-sm text-primary-400 text-sm font-medium">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                  </span>
                  Admissions Open for 2026 Batch
                </div>

                <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-[1.15]">
                  Master <span className="text-gradient">AI-Driven</span> Skills in the Heart of Coimbatore
                </h1>

                <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
                  KGPath offers the region's first AI-integrated curriculum for <strong>Digital Marketing</strong>, <strong>Full Stack Development</strong>, and <strong>Data Analytics</strong>. Get <strong>IBM certified</strong> with practical, real-world projects designed for students, working professionals, and businesses.
                </p>

                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={handleExploreClick}
                    className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-3.5 rounded-full font-semibold transition-all hover:shadow-[0_0_25px_rgba(8,145,178,0.4)] flex items-center gap-2 group"
                  >
                    Explore Courses <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="glass-panel text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/5 transition-colors border border-white/10"
                  >
                    Book Counseling
                  </button>
                </div>

                {/* Success Message Display */}
                <AnimatePresence>
                  {showSuccessMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3 rounded-lg bg-green-500/10 p-3 text-sm text-green-400 border border-green-500/20"
                      role="alert"
                    >
                      <CheckCircle size={20} />
                      <span>Thank you for your enquiry! Redirecting to courses...</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-10 pt-6 border-t border-slate-800/50">
                  {HERO_STATS.map((stat, idx) => (
                    <div key={idx}>
                      <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* --- UPDATED HIRING PARTNERS MARQUEE --- */}
          <div className="mt-20">
            <p className="text-center text-slate-500 text-xs font-semibold mb-6 uppercase tracking-widest">Trusted Hiring Partners</p>
            <div className="relative w-full overflow-hidden py-4 border-y border-slate-900/50 bg-slate-900/20">
              <div className="flex gap-16 animate-marquee whitespace-nowrap items-center">
                {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((partner, i) => (
                  <img
                    key={i}
                    src={partner.src}
                    alt={`${partner.name} Logo`}
                    className="h-8 w-auto object-contain flex-shrink-0 transition-all duration-300"
                  />
                ))}
              </div>
              <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-slate-950 to-transparent pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-slate-950 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      <EnquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleEnquirySuccess}
      />
    </>
  );
};

export default HeroSection;