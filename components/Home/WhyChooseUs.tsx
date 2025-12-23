import React from 'react';
import WhyChooseUsImage from '../../assets/about-us-section-img.jpeg';

export const WhyChooseUs: React.FC = () => {
  const features = [
    { 
      title: "AI-Integrated Curriculum", 
      desc: "Every module is designed with AI tools like ChatGPT, Claude, and Copilot to help students master the future of tech-driven careers."
    },
    { 
      title: "Specialized Programs", 
      desc: "Focused training in AI in Digital Marketing, AI in Full Stack Development, and AI in Data Analytics."
    },
    { 
      title: "Hands-On Project Learning", 
      desc: "Build real-world AI-enhanced projects that strengthen your portfolio and technical confidence."
    },
    { 
      title: "Career & Placement Guidance", 
      desc: "Resume building, interview training, and industry-aligned mentorship to prepare you for your career journey."
    }
  ];

  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-16 text-center">
          Why Students Choose <span className="text-primary-400">KG PATH</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="space-y-4">
              {features.map((f, i) => (
                <div 
                  key={i} 
                  className="group p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-primary-500/30 hover:bg-slate-900 transition-all flex gap-5"
                >
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary-500 group-hover:text-white transition-colors font-bold text-xl shadow-inner">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {f.title}
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 lg:-inset-6 bg-gradient-to-tr from-primary-500/20 to-purple-500/20 rounded-2xl blur-3xl"></div>
            
            <img
              src={WhyChooseUsImage}
              alt="KG PATH AI Training Centre at Vedapatti, Coimbatore"
              className="
                relative z-10 rounded-2xl border border-slate-700 shadow-2xl w-full
                h-[260px]
                sm:h-[280px]
                md:h-[340px]
                lg:h-[420px]
                xl:h-[560px]
                object-cover
              "
            />

            <div className="absolute -bottom-6 -left-6 z-0 w-24 h-24 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
