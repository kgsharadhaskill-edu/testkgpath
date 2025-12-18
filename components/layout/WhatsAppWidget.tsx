// components/WhatsAppWidget.tsx

import { motion } from 'framer-motion';
import WhatsappIcon from '../../assets/whatsapp.png';

export const WhatsAppWidget = () => {
  return (
    <motion.a
      href="https://wa.me/7397788915"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 left-6 z-[48] w-14 h-14 flex items-center justify-center group hidden md:flex"
    >

      {/* Tooltip */}
      <span
        className="
          absolute 
          left-full 
          top-1/2 
          -translate-y-1/2 
          ml-2
          bg-slate-900
          text-green-400
          text-xs 
          font-bold 
          px-3 
          py-1.5 
          rounded-lg 
          opacity-0 
          group-hover:opacity-100 
          transition-opacity 
          pointer-events-none 
          whitespace-nowrap 
          border 
          border-green-500/30 
          shadow-lg
        "
      >
        Chat on WhatsApp
      </span>

      {/* Hexagon container */}
      <div
        className="relative w-full h-full flex items-center justify-center backdrop-blur-md transition-all duration-300"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          background: 'rgba(13, 207, 113, 0.15)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0DCF71] to-[#09A7D9] opacity-30 group-hover:opacity-60 transition-opacity"></div>

        <img
          src={WhatsappIcon}
          alt="WhatsApp"
          className="relative z-10 w-7 h-7 object-contain group-hover:animate-pulse"
        />
      </div>

      <div className="absolute inset-0 bg-[#0DCF71] blur-xl opacity-20 group-hover:opacity-40 transition-opacity -z-10 rounded-full"></div>
    </motion.a>
  );
};
