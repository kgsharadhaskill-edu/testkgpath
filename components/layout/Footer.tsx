import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, MapPin, Mail, Phone, Youtube,  ArrowRight } from 'lucide-react';
import { courses } from '../../data/courses';
import { EnquiryModal } from '../layout/EnquiryModal'; // ✅ Added
import logo from '../../assets/KG PATH.png';

const Footer: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ Modal state

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
    <footer className="bg-slate-950 pt-24 pb-8 border-t border-slate-900 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#09A7D9]/50 to-transparent blur-sm"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary-900/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6 mb-16"
        >

          {/* --- Column 1: Overview --- */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Link to="/" className="inline-flex items-center gap-2 group ">
                <div className="flex items-center bg-white px-2 py-1 rounded-md hover:shadow-[0_0_15px_rgba(9,167,217,0.3)] transition-shadow">
                  <img
                    src={logo}
                    alt="KG Path Logo"
                    className="h-10 w-auto object-contain"
                  />
                </div>
              </Link>


            <p className="text-slate-400 text-sm leading-relaxed">
              Pioneering AI-first education in Coimbatore. We bridge the gap between academic theory and industry reality with hands-on, project-based learning.
            </p>

            <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-slate-400 text-sm group">
                    <MapPin size={18} className="text-[#09A7D9] shrink-0 mt-0.5 group-hover:animate-bounce" />
                    <span className="group-hover:text-white transition-colors">
                      KG Campus, Vedapatti,<br />Coimbatore, TN 641007
                    </span>
                </div>

                <div className="flex items-center gap-3 text-slate-400 text-sm group">
                    <Mail size={18} className="text-[#09A7D9] shrink-0" />
                    <a href="mailto:contact@kgpath.com" className="group-hover:text-white transition-colors">
                      contact@kgpath.com
                    </a>
                </div>

                <div className="flex items-center gap-3 text-slate-400 text-sm group">
                    <Phone size={18} className="text-[#09A7D9] shrink-0" />
                    <span className="group-hover:text-white transition-colors">
                      +91 73977 889175
                    </span>
                </div>
            </div>
          </motion.div>

          {/* --- Column 2: Quick Links --- */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#09A7D9] rounded-full"></span> Quick Links
            </h3>

            <ul className="space-y-3">
              {['Home', 'About', 'Courses', 'Contact', 'Blog', 'Careers'].map((item) => (
                <li key={item}>
                   <Link 
                     to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                     className="text-slate-400 hover:text-[#09A7D9] text-sm flex items-center gap-2 group transition-all"
                   >
                     <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#09A7D9]" />
                     <span className="relative overflow-hidden">
                        {item}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#09A7D9] transition-all duration-300 group-hover:w-full"></span>
                     </span>
                   </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* --- Column 3: Courses --- */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#09A7D9] rounded-full"></span> Our Courses
            </h3>

            <ul className="space-y-4">
              {courses.slice(0, 3).map((course) => (
                <li key={course.id}>
                   <Link to={`/courses/${course.id}`} className="group block">
                     <span className="text-slate-300 font-medium text-sm group-hover:text-[#09A7D9] transition-colors block mb-1">
                        {course.title}
                     </span>
                     <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                        {course.duration} • {course.mode}
                     </span>
                   </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* --- Column 4: Social & CTA --- */}
          <motion.div variants={itemVariants}>
            
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#09A7D9] rounded-full"></span> Connect
            </h3>

            <div className="flex gap-4 mb-8">
              {[
                { Icon: Facebook,  link: "https://www.facebook.com" },
                { Icon: Instagram, link: "https://www.instagram.com/sharadhaskillacademy/" },
                { Icon: Linkedin,  link: "https://www.linkedin.com/company/sharadha-skill-academy/" },
                { Icon: Youtube,   link: "https://www.youtube.com/@SharadhaSkillAcademy" },
              ].map(({ Icon, link }, idx) => (
                <a 
                  key={idx} 
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#09A7D9] hover:border-[#09A7D9] transition-all duration-300 hover:-translate-y-1 shadow-lg"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            {/* CTA with Modal */}
            <div className="glass-panel p-5 rounded-xl border border-slate-800 bg-slate-900/50">
                <h4 className="text-white font-bold text-sm mb-2">Ready to start?</h4>
                <p className="text-slate-400 text-xs mb-4">Admissions closing soon for the upcoming batch.</p>

                <button
                    onClick={() => setIsModalOpen(true)}   // ✅ Open modal
                    className="w-full bg-[#09A7D9] hover:bg-[#0891b2] text-white py-2.5 rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(9,167,217,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    Apply Now <ArrowRight size={14} />
                </button>
            </div>

          </motion.div>
        </motion.div>

        {/* --- Bottom Bar --- */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4 relative"
        >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#09A7D9]/30 to-transparent"></div>

            <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} KGPath Education. All rights reserved.
            </p>

            <div className="flex gap-6 text-xs text-slate-500 font-medium">
                <a href="#" className="hover:text-[#09A7D9] transition-colors relative group">
                    Privacy Policy
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#09A7D9] transition-all duration-300 group-hover:w-full"></span>
                </a>

                <a href="#" className="hover:text-[#09A7D9] transition-colors relative group">
                    Terms & Conditions
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#09A7D9] transition-all duration-300 group-hover:w-full"></span>
                </a>
            </div>
        </motion.div>

      </div>
    </footer>

    {/* MODAL RENDERED HERE */}
    <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </>
  );
};


// Helper for Chevron
const ChevronRight = ({ className, size }: { className?: string, size?: number }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size || 24} 
        height={size || 24} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="m9 18 6-6-6-6"/>
    </svg>
);

export default Footer;
