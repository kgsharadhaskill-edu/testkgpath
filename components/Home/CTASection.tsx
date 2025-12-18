import { useState } from 'react';
import { EnquiryModal } from '../layout/EnquiryModal';

export default function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-20 container mx-auto px-6 text-center">
        <div className="glass-panel p-12 rounded-3xl border border-primary-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-[80px]"></div>
          <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Ready to Start Your Journey?</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto relative z-10">
            Don't miss the next intake. Seats are filling fast for our Coimbatore campus batch.
          </p>
          <button
            onClick={() => setIsModalOpen(true)} // ✅ open modal
            className="bg-white text-slate-950 px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform relative z-10"
          >
            Enquire Now
          </button>
        </div>
      </section>

      {/* Modal */}
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> {/* ✅ render modal */}
    </>
  );
}
