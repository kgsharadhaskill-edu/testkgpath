import React, { useState, useEffect } from 'react';
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { NAV_LINKS } from '../../constants';
import {EnquiryModal} from './EnquiryModal'; // Ensure this component exists and uses `open` prop
import logo from '../../assets/KG PATH.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-[60] transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-lg'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* --- Left: Logo --- */}
          <RouterNavLink to="/" className="group relative z-50">
            <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-md hover:shadow-[0_0_15px_rgba(9,167,217,0.3)] transition-shadow">
              <img
                src={logo}
                alt="KGPath Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
          </RouterNavLink>



          {/* --- Middle: Desktop Navigation --- */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <RouterNavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => `
                  relative px-4 py-2 text-sm font-medium transition-colors duration-300
                  ${isActive ? 'text-[#09A7D9]' : 'text-slate-300 hover:text-[#09A7D9]'}
                  group
                `}
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(9,167,217,0.5)] transition-all">
                      {link.name}
                    </span>
                    {/* Hover Underline Animation */}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#09A7D9] transition-all duration-300 group-hover:w-full shadow-[0_0_10px_#09A7D9]"></span>
                    {/* Active Dot */}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#09A7D9] shadow-[0_0_5px_#09A7D9]"
                      />
                    )}
                  </>
                )}
              </RouterNavLink>
            ))}
          </div>

          {/* --- Right: CTA & Mobile Toggle --- */}
          <div className="flex items-center gap-4 z-50">
            {/* Desktop CTA */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(9, 167, 217, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex bg-[#09A7D9] text-white px-6 py-2.5 rounded-full text-sm font-bold items-center gap-2 shadow-[0_0_15px_rgba(9,167,217,0.3)] transition-all"
              onClick={() => setIsModalOpen(true)}
            >
              Enquire Now <ChevronRight size={16} className="bg-white/20 rounded-full p-0.5" />
            </motion.button>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white bg-slate-900/50 rounded-full border border-slate-700 hover:border-[#09A7D9] transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* --- Mobile Full Screen Menu --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl lg:hidden flex flex-col pt-28 px-6"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <RouterNavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => `
                      block py-4 text-2xl font-bold border-b border-slate-800
                      flex justify-between items-center group
                      ${isActive ? 'text-[#09A7D9]' : 'text-slate-400'}
                    `}
                  >
                    <span className="group-hover:text-white transition-colors">{link.name}</span>
                    <ChevronRight className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[#09A7D9]" />
                  </RouterNavLink>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <button
                onClick={() => { setIsOpen(false); setIsModalOpen(true); }}
                className="w-full bg-[#09A7D9] text-white py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(9,167,217,0.3)] hover:scale-[1.02] transition-transform"
              >
                Enquire Now
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Enquiry Modal --- */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
