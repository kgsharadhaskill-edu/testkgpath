import React from 'react';
import { CheckCircle } from 'lucide-react';
import aboutussectionImage1 from '../../assets/about-us-section.png';
import aboutussectionImage2 from '../../assets/about-us-section-img.jpeg';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute right-0 top-1/2 w-[800px] h-[800px] bg-primary-900/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* Left Images - Overlapping Layout */}
          <div className="flex-1 w-full relative h-[450px] lg:h-[500px]">
             {/* Image 1: Top Left */}
             <div className="absolute top-0 left-0 w-[70%] h-[75%] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl z-10">
                <img 
                  src={aboutussectionImage1}
                  alt="Interactive Classroom" 
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
             </div>
             
             {/* Image 2: Bottom Right */}
             <div className="absolute bottom-0 right-4 w-[65%] h-[60%] rounded-2xl overflow-hidden border border-slate-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20">
                <img 
                  src={aboutussectionImage2} 
                  alt="Coding Lab" 
                  className="w-full h-full object-cover"
                />
             </div>

             {/* Connecting Badge */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 glass-panel px-6 py-3 rounded-full border border-white/10 shadow-lg">
                <span className="text-primary-600 font-bold text-lg">1500+</span> <span className="text-white text-sm">Graduates</span>
             </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 space-y-8">
            <div>
                <h2 className="text-sm font-bold text-primary-500 tracking-widest uppercase mb-2">About KG PATH</h2>
                <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Advancing Careers with <br/> <span className="text-slate-500">Industry-Ready Skills</span>
                </h3>
            </div>
            
            <p className="text-slate-400 leading-relaxed text-lg">
              Located in Vedapatti, Coimbatore, KG PATH is an advanced learning hub run by <strong>Sharadha Skill Academy</strong>. We focus on empowering students and professionals with cutting-edge courses in technology and emerging industries.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Our programs are designed by industry experts, combining hands-on experience, live projects, and mentorship to prepare you for the challenges of modern careers.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                'Advanced AI & Cloud Labs', 
                'Expert Mentorship', 
                'Live Industry Projects', 
                'Career & Placement Support'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-200 font-medium">
                  <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center">
                    <CheckCircle className="text-primary-400" size={12} />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutSection;
