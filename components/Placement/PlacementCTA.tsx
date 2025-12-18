import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EnquiryModal } from '../layout/EnquiryModal'; // Make sure this path is correct

export const PlacementCTA: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSuccess = () => {
    setIsModalOpen(false);
    // Optional: you can also navigate to /courses after success if needed
    // navigate('/courses');
  };

  return (
    <>
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="glass-panel p-12 rounded-[2.5rem] border border-primary-500/30 text-center relative overflow-hidden">
            {/* Radial Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-900/20 via-slate-950 to-slate-950 -z-10"></div>

            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Ready to Build Your Career?</h2>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Join the batch that gets hired. Don't just learn skills, launch your future with KGPath.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary-600 hover:bg-primary-500 text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-[0_0_25px_rgba(8,145,178,0.4)]"
              >
                Apply Now
              </button>

              <Link
                to="/courses"
                className="glass-panel border border-white/20 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
              >
                View Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
};

export default PlacementCTA;
