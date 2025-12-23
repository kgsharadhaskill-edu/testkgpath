import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Send, Bot, User, CheckCircle } from 'lucide-react';

declare global {
  interface ImportMeta {
    readonly env: {
      readonly VITE_API_URL: string;
    };
  }
}

export const ContactForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget; // <-- capture reference
  setLoading(true);
  setResponseMsg('');

  const formData = new FormData(form);
  const data = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  };

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/contact-form/contact-form.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    let result: any = null;
    try {
      result = await res.json();
    } catch {}

    if (res.ok && result?.status === 'success') {
      setIsSuccess(true);
      setResponseMsg(result.message || 'Message sent successfully.');
      form.reset(); // <-- use captured reference
    } else {
      setIsSuccess(false);
      setResponseMsg(result?.message || 'Something went wrong.');
    }
  } catch (err) {
    console.error(err);
    setIsSuccess(false);
    setResponseMsg('Network error. Please try again later.');
  } finally {
    setLoading(false);
  }
};


  const closeSuccessModal = () => setIsSuccess(false);

  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="glass-panel rounded-[3rem] border border-slate-800 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
            {/* Left panel */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 p-12 flex flex-col justify-center items-center relative border-b lg:border-b-0 lg:border-r border-slate-800">
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="relative w-40 h-40 mb-8"
              >
                <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="relative w-full h-full bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-center shadow-2xl">
                  <Bot size={64} className="text-primary-400" />
                </div>
              </motion.div>
              <div className="text-center">
                <div className="inline-block bg-slate-800 px-4 py-2 rounded-xl rounded-tl-none border border-slate-700 mb-4 shadow-lg">
                  <p className="text-primary-400 text-sm font-medium">Hi! I'm KG Bot.</p>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">How can we help?</h3>
                <p className="text-slate-400 text-sm max-w-xs mx-auto">
                  Fill out the form and our human counselors will get back to you within a few hours!
                </p>
              </div>
            </div>

            {/* Right panel - Form */}
            <div className="lg:col-span-7 p-10 lg:p-16 bg-slate-950/50">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Name & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Full Name</label>
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                      <input
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 pl-11 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Phone Number</label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                      <input
                        name="phone"
                        type="tel"
                        placeholder="+91 xxxxx xxxxx"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 pl-11 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                    <input
                      name="email"
                      type="email"
                      placeholder="sample@gmail.com"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 pl-11 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">What are you looking for?</label>
                  <div className="relative">
                    <select
                      name="subject"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all appearance-none cursor-pointer"
                      required
                    >
                      <option>Admission Enquiry</option>
                      <option>Career / Job Application</option>
                      <option>Business Collaboration</option>
                      <option>Student Support</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us more about your requirements..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all resize-none"
                    required
                  ></textarea>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_25px_rgba(8,145,178,0.3)] hover:scale-[1.01] flex items-center justify-center gap-2 group"
                >
                  <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            key="success-modal"
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              onClick={closeSuccessModal}
            ></div>

            <motion.div
              className="relative bg-slate-900 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl border border-slate-700"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
              <p className="text-slate-400 mb-4">{responseMsg || 'Your message has been sent successfully.'}</p>
              <button
                onClick={closeSuccessModal}
                className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-2 px-6 rounded-lg transition-all"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
