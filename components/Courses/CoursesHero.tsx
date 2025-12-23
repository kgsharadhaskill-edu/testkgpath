import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, Cpu } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import courseshero from '../../assets/courseshero.jpg';

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.15 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeInOut" as const } }
};

// --- CoursesHero Component ---
export const CoursesHero: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>
          AI & Future Tech Courses in Coimbatore | 100% Placement Support – Sharadha Skill Academy
        </title>

        <meta
          name="description"
          content="Learn AI, Cloud Computing, Cyber Security, Mechanical CAD and future-ready tech courses in Coimbatore with hands-on training and 100% placement support at Sharadha Skill Academy."
        />

        {/* ItemList Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Technology & Skill Development Courses",
            "description":
              "Industry-ready AI, Full Stack, Data Analaytics, Digital Marketing,  with placement support in Coimbatore.",
            "itemListOrder": "https://schema.org/ItemListOrderAscending",
            "numberOfItems": 7,
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "AI in Digital Marketing Course",
                "url": "https://kgpath.com/ai-in-digital-marketing-course-in-coimbatore-tamil-nadu/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "AI in Full Stack Development Course",
                "url": "http://kgpath.com/full-stack-development-course-in-coimbatore-in-tamil-nadu/"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "AI in Data Analytics Course",
                "url": "https://kgpath.com/ai-in-data-analytics-course-in-coimbatore-tamil-nadu/"
              },
              
              
            ],
            "provider": {
              "@type": "EducationalOrganization",
              "name": "Sharadha Skill Academy",
              "url": "https://kgpath.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Coimbatore",
                "addressRegion": "Tamil Nadu",
                "addressCountry": "IN"
              }
            }
          })}
        </script>
      </Helmet>

      <section className="relative w-full bg-slate-950 text-white overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Column */}
          <div className="flex items-center justify-center relative z-10 px-6 sm:px-12 lg:pl-16 xl:pl-24 py-24 lg:py-32">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-6 max-w-xl text-center lg:text-left"
            >
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/30 bg-primary-950/50 text-primary-400 text-xs font-bold tracking-widest uppercase"
              >
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                FUTURE READY CURRICULUM
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
              >
                Forging the Next Gen of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">
                  AI Specialists
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg text-slate-400 leading-relaxed"
              >
                Join the elite tech community in Coimbatore. Our AI-first curriculum ensures
                100% placement support and hands-on exposure to tomorrow&apos;s tools.
              </motion.p>

              <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
                <button
                  onClick={() =>
                    document.getElementById('all-courses')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="bg-primary-600 hover:bg-primary-500 px-8 py-3.5 rounded-full font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(8,145,178,0.4)] flex items-center gap-2"
                >
                  Explore Courses <ArrowRight size={18} />
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="relative w-full h-80 lg:h-auto order-first lg:order-last">
            <motion.img
              src={courseshero}
              alt="AI and future technology training students in Coimbatore"
              className="absolute inset-0 w-full h-full object-cover"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent lg:bg-gradient-to-r lg:from-slate-950 lg:via-slate-950/30 lg:to-transparent"></div>

            <motion.div
              className="absolute top-1/4 -left-4 p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hidden lg:block"
              initial={{ opacity: 0, x: -50, rotate: -15 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ delay: 0.8, duration: 0.8, type: 'spring' }}
            >
              <BrainCircuit className="text-primary-400" size={32} />
            </motion.div>

            <motion.div
              className="absolute bottom-1/4 -right-4 p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hidden lg:block"
              initial={{ opacity: 0, x: 50, rotate: 15 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ delay: 1, duration: 0.8, type: 'spring' }}
            >
              <Cpu className="text-indigo-400" size={32} />
            </motion.div>
          </div>
        </div>

        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none -z-1"></div>
      </section>
    </>
  );
};

export default CoursesHero;
