import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { Download, X, CheckCircle } from "lucide-react";
import { EnquiryModal } from "../layout/EnquiryModal";
import placementImageone from "@/assets/placementone.jpg";
import placementImagetwo from "@/assets/placementtwo.png";
import placementImagethree from "@/assets/placementthree.png";
import { HiringPartners } from "./HiringPartners";

const heroImages = [
    placementImageone,
    placementImagetwo,
    placementImagethree,
];

const SuccessNotification = ({ show, onClose }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => onClose(), 5000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed bottom-6 right-6 z-[120] flex items-center gap-4 p-4 rounded-xl bg-slate-800 border border-green-500/30 shadow-2xl"
                >
                    <CheckCircle className="text-green-400" size={24} />
                    <div>
                        <h4 className="font-bold text-white">Success!</h4>
                        <p className="text-sm text-slate-400">You can now download the report.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-slate-500 hover:text-white"
                    >
                        <X size={16} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const imageVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 1.5, ease: easeInOut } },
    exit: { opacity: 0, transition: { duration: 1.5, ease: easeInOut } },
};

export const PlacementHero = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const handleDownloadClick = () => {
        if (formSubmitted) {
            const link = document.createElement("a");
            link.href = "/assets/placement-report.pdf";
            link.setAttribute("download", "Placement_Report.pdf");
            document.body.appendChild(link);
            link.click();
            link.remove();
        } else {
            setModalOpen(true);
        }
    };

    const handleFormSuccess = () => {
        setModalOpen(false);
        setShowSuccess(true);
        setFormSubmitted(true);
    };

    return (
        <>
            <section className="bg-slate-950 text-white flex flex-col min-h-screen overflow-hidden px-6 pt-24 lg:pt-32">
                
                {/* Main content container which grows to fill space */}
                <div className="container mx-auto max-w-7xl flex-grow flex items-center">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center w-full">
                        
                        {/* Left Column: Text Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-8 text-center lg:text-left"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-950/30 text-green-400 text-xs font-bold tracking-widest uppercase">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                100% PLACEMENT RECORD
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
                                Launch Your Career <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                                    Sky High.
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                We don't just teach; we launch careers. With our network of 50+ hiring
                                partners, your dream job is within reach.
                            </p>

                            <div className="flex justify-center lg:justify-start">
                                <button
                                    onClick={handleDownloadClick}
                                    className={`text-white px-8 py-4 rounded-lg font-bold transition-all flex items-center gap-2 ${formSubmitted
                                        ? "bg-green-600 hover:bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                                        : "bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 shadow-[0_0_20px_rgba(8,145,178,0.4)]"
                                    }`}
                                >
                                    {formSubmitted ? "Download Now" : "Download Placement Report"}
                                    <Download size={20} />
                                </button>
                            </div>

                            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800 max-w-xl mx-auto lg:mx-0">
                                <div>
                                    <h3 className="text-3xl font-bold text-white">1200+</h3>
                                    <p className="text-xs text-slate-500 font-bold uppercase mt-1">STUDENTS PLACED</p>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-white">150%</h3>
                                    <p className="text-xs text-slate-500 font-bold uppercase mt-1">AVG SALARY HIKE</p>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-white">50+</h3>
                                    <p className="text-xs text-slate-500 font-bold uppercase mt-1">HIRING PARTNERS</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column for Image Slideshow */}
                        <div className="relative w-full max-w-md mx-auto lg:max-w-none h-auto aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={imageIndex}
                                    variants={imageVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="absolute inset-0"
                                >
                                    <img
                                        src={heroImages[imageIndex]}
                                        alt="Placement Success"
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Trusted Partners Marquee - Sits at the bottom of the section */}
               <HiringPartners />
            </section>

            <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSuccess={handleFormSuccess} />
            <SuccessNotification show={showSuccess} onClose={() => setShowSuccess(false)} />
        </>
    );
};