import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Building, 
  FileCheck, 
  UserCheck,
  BrainCircuit,
  FolderCheck,
  IndianRupee,
  MessageSquare
} from 'lucide-react';

export const PlacementSupport: React.FC = () => {
  const benefits = [
    { title: "Resume Building", desc: "Expert crafting of ATS-friendly resumes.", icon: FileCheck },
    { title: "LinkedIn Optimization", desc: "Profile makeover to attract recruiters.", icon: UserCheck },
    { title: "Mock Interviews", desc: "Unlimited technical & HR rounds.", icon: Users },
    { title: "Portfolio Review", desc: "Github & Behance project auditing.", icon: FolderCheck },
    { title: "Aptitude Training", desc: "Logical reasoning & quant prep.", icon: BrainCircuit },
    { title: "Soft Skills", desc: "Communication & personality development.", icon: MessageSquare },
    { title: "Placement Drives", desc: "Exclusive campus hiring events.", icon: Building },
    { title: "Salary Negotiation", desc: "Guidance to get the best package.", icon: IndianRupee },
  ];

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-3xl font-bold text-white">
              360° Placement <br/> <span className="text-primary-400">Support</span>
            </h2>
            <p className="text-slate-400 leading-relaxed">
              We don't just hand you a certificate. We prepare you for the corporate battlefield. From your first line of code to your final salary negotiation, we stand by you.
            </p>
            <aside className="p-6 rounded-xl bg-gradient-to-br from-primary-900/50 to-slate-900 border border-primary-500/30">
              <h3 className="text-white font-bold mb-2">Did you know?</h3>
              <p className="text-sm text-slate-300">
                70% of rejections happen due to poor resumes. Our dedicated team ensures yours stands out.
              </p>
            </aside>
          </div>

          <ul className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, i) => (
              <motion.li 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-slate-950 border border-slate-800 p-6 rounded-xl flex flex-col items-center text-center hover:border-primary-500/30 transition-colors h-full"
              >
                <div 
                  className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-primary-400 mb-4 border border-slate-700 flex-shrink-0"
                  aria-hidden="true"
                >
                  <benefit.icon size={20} />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{benefit.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{benefit.desc}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
