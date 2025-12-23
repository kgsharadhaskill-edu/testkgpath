/// <reference types="vite/client" />
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, CheckCircle } from 'lucide-react';
import { courses } from '../../data/courses';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setIsSubmitting(true);
  setError(null);

  const form = event.currentTarget;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/enquiry/enquiry.php`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      }
    );

    if (response.ok) {
      setIsSuccess(true);
      form.reset();

      if (onSuccess) {
        onSuccess(); // sets cookie + unlocks access
      }

      // ✅ CLOSE MODAL AFTER SUCCESS
      setTimeout(() => {
        onClose();
      }, 800);

    } else {
      const errorData = await response.json();
      setError(errorData.message || 'Something went wrong. Please try again.');
    }
  } catch (err) {
    setError('A network error occurred. Please check your connection.');
  } finally {
    setIsSubmitting(false);
  }
};
  const handleClose = () => {
    setIsSuccess(false);
    setError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <div>
                <h3 id="modal-title" className="text-xl font-bold text-white">
                  {isSuccess ? 'Success!' : 'Start Your Journey'}
                </h3>
                {!isSuccess && <p className="text-xs text-slate-400 mt-1">Fill in the details to download brochure / apply.</p>}
              </div>
              <button
                onClick={handleClose}
                className="text-slate-400 hover:text-white transition-colors bg-slate-800 p-1.5 rounded-full hover:bg-slate-700"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle size={48} className="text-green-500 mb-4" />
                  <h4 className="text-lg font-bold text-white mb-2">Thank you!</h4>
                  <p className="text-slate-400 mb-4">Your enquiry has been submitted successfully. We will contact you shortly.</p>
                  <button
                    onClick={handleClose}
                    className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-2 px-6 rounded-lg transition-all"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-slate-400 mb-1.5">Full Name</label>
                    <input id="fullName" name="fullName" required type="text" placeholder="Enter your full name" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-slate-600"/>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-400 mb-1.5">Phone Number</label>
                    <input id="phone" name="phone" required type="tel" pattern="[0-9]{10}" title="Please enter a valid 10-digit phone number" placeholder="e.g. 9876543210" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-slate-600"/>
                  </div>
                  <div>
                    <label htmlFor="qualification" className="block text-sm font-medium text-slate-400 mb-1.5">Education Qualification</label>
                    <select id="qualification" name="qualification" required defaultValue="" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm appearance-none cursor-pointer">
                      <option value="" disabled>Select Qualification</option>
                      <option value="student">Student (Pursuing)</option>
                      <option value="graduate">Graduate (Bachelor's)</option>
                      <option value="post_graduate">Post Graduate (Master's)</option>
                      <option value="working">Working Professional</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="relative">
                    <label htmlFor="dob" className="block text-sm font-medium text-slate-400 mb-1.5">Date of Birth</label>
                    <input id="dob" name="dob" required type="date" max={new Date().toISOString().split('T')[0]} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-slate-600"/>
                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none mt-3" size={18} />
                  </div>
                  <div>
                    <label htmlFor="course" className="block text-sm font-medium text-slate-400 mb-1.5">Interested Course</label>
                    <select id="course" name="course" required defaultValue="" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm appearance-none cursor-pointer">
                      <option value="" disabled>Select Course</option>
                      {courses.map(course => ( <option key={course.id} value={course.title}>{course.title}</option> ))}
                    </select>
                  </div>
                  
                  {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                  <button type="submit" disabled={isSubmitting} className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 rounded-lg mt-4 transition-all hover:shadow-[0_0_20px_rgba(8,145,178,0.3)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
