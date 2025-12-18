import React from 'react';
import { 
  MapPin, Clock
  
  } from 'lucide-react';

export const LocationSection: React.FC = () => {
    return (
        <section className="py-20 bg-slate-900">
             <div className="container mx-auto px-6 max-w-7xl">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                     {/* Left: Map */}
                     <div className="relative h-[400px] rounded-3xl overflow-hidden border border-slate-700 shadow-2xl group">
                         <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.602400403326!2d76.9076068750515!3d10.993353955154927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85f250592aecb%3A0xeb18b8ce5a4b0711!2sSharadha%20Skill%20Academy!5e0!3m2!1sen!2sin!4v1765015760217!5m2!1sen!2sin" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }} 
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            className="opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                         ></iframe>
                         
                         {/* Overlay Route Line Animation */}
                         <div className="absolute inset-0 pointer-events-none">
                             <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary-500 rounded-full shadow-[0_0_20px_rgba(34,211,238,1)] animate-ping"></div>
                             <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary-500 rounded-full border-2 border-white shadow-lg"></div>
                         </div>
                     </div>

                     {/* Right: Details */}
                     <div className="space-y-8 flex flex-col justify-center">
                         <div>
                             <h2 className="text-3xl font-bold text-white mb-2">Visit Our Campus</h2>
                             <p className="text-slate-400">Experience our AI labs and meet mentors in person.</p>
                         </div>

                         <div className="space-y-6">
                             <div className="flex gap-4">
                                 <div className="shrink-0 w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-primary-400">
                                     <MapPin size={24} />
                                 </div>
                                 <div>
                                     <h4 className="text-white font-bold mb-1">KG Campus</h4>
                                     <p className="text-slate-400 text-sm leading-relaxed">
                                         3rd Floor, KG Garden City, Vedapatti, Nagarajpuram, Coimbatore, Tamil Nadu 641021, India
                                     </p>
                                 </div>
                             </div>

                             <div className="flex gap-4">
                                 <div className="shrink-0 w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-primary-400">
                                     <Clock size={24} />
                                 </div>
                                 <div>
                                     <h4 className="text-white font-bold mb-1">Visiting Hours</h4>
                                     <p className="text-slate-400 text-sm">
                                         Mon - Sat: 9:00 AM - 5:00 PM <br/>
                                         Sun: Closed
                                     </p>
                                 </div>
                             </div>
                         </div>

                         <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                             <h4 className="text-white font-bold mb-2 text-sm flex items-center gap-2">
                                 <div className="w-2 h-2 rounded-full bg-green-500"></div> Public Transport
                             </h4>
                             <p className="text-slate-400 text-xs leading-relaxed">
                                 Bus Number 14A, 14B, 14C, 14D, and 14E.
                             </p>
                         </div>
                     </div>
                 </div>
             </div>
        </section>
    );
};