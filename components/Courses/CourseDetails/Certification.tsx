import React from 'react';
import { ShieldCheck } from 'lucide-react';
import CertificateImage from '../../../assets/kgpathcertificate.jpg';

interface CertificationProps {
  data?: {
    images: string[];
    benefits: {
      title: string;
      description: string;
    }[];
  };
}

export const Certification: React.FC<CertificationProps> = ({ data }) => {
  if (!data) return null;

  return (
    <section className="py-20 bg-slate-950 border-t border-slate-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <span className="text-primary-500 font-bold tracking-widest uppercase text-xs">VALIDATION</span>
          <h2 className="text-3xl font-bold text-white mt-2">Get Certified, <span className="text-primary-400">Get Hired</span></h2>
          <p className="text-slate-400 mt-2">Earn industry-recognized credentials that validate your skills.</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Certificate Image */}
          <div className="flex-1 w-full">
            <img 
              src={CertificateImage} 
              alt="Certificate of Course Compilation"
              className="w-full max-w-lg mx-auto lg:mx-0"
            />
          </div>

          {/* Right: Benefits Grid */}
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data.benefits.map((benefit, i) => (
              <div key={i} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-primary-500/30 transition-all hover:bg-slate-900">
                <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400 mb-4">
                  <ShieldCheck size={20} />
                </div>
                <h4 className="text-white font-bold mb-2">{benefit.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};