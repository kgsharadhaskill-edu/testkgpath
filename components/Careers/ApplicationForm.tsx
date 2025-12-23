/// <reference types="vite/client" />
import React, { useState, useRef } from 'react';
import { CheckCircle, Upload, Send, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ApplicationForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [resumeName, setResumeName] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');

  interface ApiResponse {
    status: string;
    message?: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/career/career-form.php`, {
        method: 'POST',
        body: formData,
      });

      const responseText = await res.text();
      let result: ApiResponse;

      try {
        result = JSON.parse(responseText);
      } catch {
        throw new Error(`Server returned an invalid response: ${responseText}`);
      }

      if (!res.ok || result.status !== 'success') {
        setIsSuccess(true);
        setIsError(true);
        setResponseMsg(result.message || 'Could not send your application.');
        return;
      }

      setIsSuccess(true);
      setIsError(false);
      setResponseMsg(result.message || 'Application submitted successfully.');
      formRef.current?.reset();
      setResumeName('');
    } catch (error: any) {
      setIsSuccess(true);
      setIsError(true);
      setResponseMsg(error.message || 'Network error: Could not send.');
    }
  };

  const closeSuccessModal = () => {
    setIsSuccess(false);
    setIsError(false);
  };

  return (
    <section id="application-form" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-4 bg-slate-900/50 p-10 border-r border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Apply Now</h3>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Ready to join the revolution? Fill out the form and our HR team will get back to you within 48 hours.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-primary-400">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold">Resume Format</p>
                      <p className="text-sm">PDF Only (Max 5MB)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-primary-400">
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold">Response Time</p>
                      <p className="text-sm">Within 2 Working Days</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <p className="text-slate-500 text-sm mb-2">Have questions?</p>
                <p className="text-white font-bold">careers@kgpath.edu</p>
              </div>
            </div>

            <div className="lg:col-span-8 p-10">
              <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                    <input name="name" type="text" required
                           className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white"
                           placeholder="Full Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                    <input name="email" type="email" required
                           className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white"
                           placeholder="sample@example.com" />
                  </div>
                </div>

                {/* Phone & Position */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Phone</label>
                    <input name="phone" type="tel" required
                           className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white"
                           placeholder="+91 xxxxx xxxxx" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Applying For</label>
                    <select name="position" required
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white">
                      <option value="">Select Position</option>
                      <option value="Full Stack Trainer">Full Stack Trainer</option>
                      <option value="Digital Marketing Trainer">Digital Marketing Trainer</option>
                      <option value="Academic Counsellor">Academic Counsellor</option>
                      <option value="Placement Officer">Placement Officer</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Experience & Resume */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Experience</label>
                    <select name="experience" required
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white">
                      <option value="Fresher">Fresher</option>
                      <option value="1-3 Years">1 - 3 Years</option>
                      <option value="3-6 Years">3 - 6 Years</option>
                      <option value="6+ Years">6+ Years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Resume (PDF)</label>
                    <input
                      id="resume-input"
                      type="file"
                      name="resume"
                      accept=".pdf"
                      required
                      className="hidden"
                      onChange={(e: any) => setResumeName(e.target.files[0]?.name || '')}
                    />
                    <label htmlFor="resume-input"
                           className="w-full cursor-pointer bg-slate-950 border border-slate-700 border-dashed rounded-lg px-4 py-3 text-slate-400 flex items-center gap-2">
                      <Upload size={18} /> Upload resume
                    </label>
                    {resumeName && (
                      <p className="text-xs text-primary-400 mt-2">Selected: {resumeName}</p>
                    )}
                  </div>
                </div>

                {/* LinkedIn & GitHub */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">LinkedIn Profile</label>
                    <input
                      name="linkedin"
                      type="url"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">GitHub / Portfolio</label>
                    <input
                      name="github"
                      type="url"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white"
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Why join KGPath?</label>
                  <textarea name="message" rows={3} required
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white"
                            placeholder="Tell us briefly about yourself..." />
                </div>

                {/* Submit */}
                <button type="submit"
                        className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2">
                  <Send size={20} /> Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                 onClick={closeSuccessModal} />

            <motion.div
              className="relative bg-slate-900 rounded-2xl p-8 max-w-sm w-full text-center border border-slate-700"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}>

              {isError ? (
                <>
                  <X size={48} className="text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Submission Failed</h3>
                </>
              ) : (
                <>
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Thank You</h3>
                </>
              )}

              <p className="text-slate-400 mb-4">{responseMsg}</p>

              <button onClick={closeSuccessModal}
                      className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-2 px-6 rounded-lg">
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
