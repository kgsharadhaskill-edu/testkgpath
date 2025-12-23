import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { EnquiryModal } from "../layout/EnquiryModal";

export const ContactCTA: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <section className="py-20 bg-slate-950">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="glass-panel p-12 rounded-[2.5rem] border border-primary-500/30 text-center relative overflow-hidden bg-gradient-to-r from-slate-950 via-primary-950/20 to-slate-950">

                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                            Let's Talk About Your Future
                        </h2>

                        <div className="flex justify-center gap-4">

                            {/* ✔ Open Enquiry Modal */}
                            <button 
                                onClick={() => setModalOpen(true)}
                                className="bg-white text-slate-950 px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-primary-50 shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                            >
                                Book Free Consultation
                            </button>

                            {/* ✔ Goes to Courses Page */}
                            <Link 
                                to="/courses" 
                                className="glass-panel border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
                            >
                                Explore Courses
                            </Link>

                        </div>
                    </div>
                </div>
            </section>

            {/* ✔ Enquiry Modal Connected */}
            <EnquiryModal 
                isOpen={modalOpen} 
                onClose={() => setModalOpen(false)} 
                onSuccess={() => setModalOpen(false)} 
            />
        </>
    );
};
