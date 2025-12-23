// components/ChatbotWidget.tsx

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot } from 'lucide-react';

// --- START: Added Constants for easy management ---
const CONTACT_NUMBERS = "7397788915, 7397788917, or 7397788918";
const ADDRESS_URL = "https://maps.app.goo.gl/hRfa6sM6hoLukPr47";
const COURSES_OFFERED = [
  "AI in Digital Marketing",
  "AI in Data Analytics",
  "AI in Full Stack Development"
];
// --- END: Added Constants ---

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'bot' | 'user', text: string}[]>([
    { role: 'bot', text: 'Hi there! 👋 Welcome to KGPath.' },
    { role: 'bot', text: 'How can I help you accelerate your career today?' }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // --- START: Enhanced handleSend function with new logic ---
  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = { role: 'user' as const, text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    const botResponse = getBotResponse(inputValue);

    // Simulate bot thinking time
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const lowerCaseInput = userInput.toLowerCase();

    // Rule 1: Contact Information
    if (lowerCaseInput.includes("contact") || lowerCaseInput.includes("phone") || lowerCaseInput.includes("number")) {
      return `Of course! You can reach our admissions team at: ${CONTACT_NUMBERS}. Let us know if you have any other questions!`;
    }

    // Rule 2: Address / Location
    if (lowerCaseInput.includes("address") || lowerCaseInput.includes("location") || lowerCaseInput.includes("where are you")) {
      return `You can find us here: ${ADDRESS_URL}. We'd love for you to visit!`;
    }

    // Rule 3: Courses Offered
    if (lowerCaseInput.includes("course") || lowerCaseInput.includes("program") || lowerCaseInput.includes("learn")) {
      return `We offer several cutting-edge courses: \n• ${COURSES_OFFERED.join("\n• ")}. Which one are you most interested in?`;
    }

    // Rule 4: Placement / Career
    if (lowerCaseInput.includes("placement") || lowerCaseInput.includes("career") || lowerCaseInput.includes("job")) {
      return "We have a dedicated placement cell to help you launch your career. You can find more details on our Placement & Career page. In which field are you looking to build your career? We can then suggest the best course for you.";
    }

    // Default Fallback Response
    return "Thanks for reaching out! Our admissions team will be with you shortly. In the meantime, feel free to ask about our courses, contact details, or location.";
  };
  // --- END: Enhanced handleSend function ---

  return (
    <>
      {/* Chatbot Button */}
      <motion.button
        initial={{ y: 0 }}
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className={`fixed z-[49] flex items-center backdrop-blur-xl border border-primary-500/40 shadow-[0_0_30px_rgba(8,145,178,0.2)] transition-all duration-300 group
            ${isOpen ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100 scale-100'}
            right-6 bottom-24 md:bottom-24
        `}
        style={{
          background: 'rgba(7, 14, 28, 0.65)',
          borderRadius: '50px',
          padding: '10px'
        }}
      >
        {/* Bot Icon */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-600 to-indigo-600 flex items-center justify-center text-white shadow-lg relative overflow-hidden">
          <Bot size={20} />
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>

        {/* Hidden text – visible only on hover (desktop) */}
        <div className="hidden md:flex flex-col items-start ml-2 overflow-hidden max-w-0 group-hover:max-w-[160px] transition-all duration-300">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider whitespace-nowrap">
            KG Assistant
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <p className="text-xs text-primary-400 font-bold whitespace-nowrap">
              Online
            </p>
          </div>
        </div>
      </motion.button>

      {/* Expanded Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed z-[50] right-0 bottom-0 md:right-6 md:bottom-24 w-full md:w-[380px] h-[100vh] md:h-[600px] flex flex-col overflow-hidden shadow-2xl origin-bottom-right"
          >
            {/* Backdrop Filter Container */}
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl md:rounded-[28px] border border-primary-500/30"></div>

            {/* Decorative Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[28px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[60px]"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[60px]"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            </div>

            {/* Header */}
            <div className="relative z-10 p-5 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-600 to-indigo-600 flex items-center justify-center text-white border border-white/10">
                    <Bot size={20} />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">KG Assistant</h3>
                  <p className="text-primary-400 text-xs">Always here to help</p>
                </div>
              </div>
              <button onClick={toggleChat} className="text-slate-400 hover:text-white transition-colors bg-slate-800/50 p-2 rounded-full hover:bg-slate-700">
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="relative z-10 flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'bot' ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-primary-600 text-white rounded-br-none shadow-[0_4px_15px_rgba(8,145,178,0.3)]'
                      : 'bg-slate-800/80 border border-slate-700 text-slate-200 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="relative z-10 p-4 bg-slate-900/50 border-t border-slate-800">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-full px-2 py-2 focus-within:border-primary-500/50 transition-colors shadow-inner"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent border-none outline-none text-white text-sm px-3 placeholder:text-slate-600"
                />
                <button
                  type="submit"
                  className="w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-500 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!inputValue.trim()}
                >
                  <Send size={16} />
                </button>
              </form>
              <div className="text-center mt-2">
                <span className="text-[10px] text-slate-600">Powered by KGPath AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};