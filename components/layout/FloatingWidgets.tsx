// components/FloatingWidgets.tsx

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { WhatsAppWidget } from './WhatsAppWidget';
import { ChatbotWidget } from './ChatbotWidget';

// --- Scroll To Top Button ---
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ 
            y: -5, 
            boxShadow: '0 0 20px rgba(9, 167, 217, 0.6)',
            borderColor: 'rgba(9, 167, 217, 0.8)'
          }}
          whileTap={{ scale: 0.9, y: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-[48] w-14 h-14 flex items-center justify-center backdrop-blur-md border border-[#09A7D9]/50 text-[#09A7D9] transition-all duration-300 group hidden md:flex"
          style={{ 
            background: 'rgba(7, 14, 28, 0.45)', 
            borderRadius: '14px',
            boxShadow: '0 0 10px rgba(9, 167, 217, 0.2)'
          }}
        >
          {/* Inner Glow */}
          <div className="absolute inset-0 rounded-[14px] bg-[#09A7D9]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <ArrowUp size={24} className="relative z-10 group-hover:-translate-y-1 transition-transform duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// --- Main Export ---
export const FloatingWidgets = () => {
  return (
    <>
      <ScrollToTop />
      <WhatsAppWidget />
      <ChatbotWidget />
    </>
  );
};