import React from 'react';
import { motion, easeOut } from 'framer-motion';
import heroImage from '../../assets/bloghero.png';

const AiChartImage = heroImage;

export const BlogPage = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: easeOut } },
  };

  return (
    <div className="bg-[#0e101c] font-sans">

      <main className="pt-28 pb-2 px-8 lg:pb-20">
        <motion.div
          className="max-w-[90rem] mx-auto bg-[#1a1d2e] rounded-3xl overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="flex flex-col lg:flex-row">

            {/* Left Content */}
            <div className="flex-1 p-12 lg:p-20 flex flex-col justify-center text-center lg:text-left">
              <motion.div variants={itemVariants} className="inline-block mb-5 mx-auto lg:mx-0">
                <span className="border border-teal-500/30 bg-[#0e272a] text-[#2dd4bf] text-sm font-medium px-4 py-2 rounded-full">
                  THOUGHT LEADERSHIP
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white !leading-tight mb-6"
              >
                Insights, Trends & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                  AI-Powered Learning
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg text-slate-400 max-w-lg mx-auto lg:mx-0 mb-8"
              >
                Stay ahead of the curve. Discover how AI is reshaping education and careers in Coimbatore and beyond.
              </motion.p>

              <motion.div variants={itemVariants}>
                <button
                  onClick={() => {
                    const section = document.getElementById("blog-grid");
                    section?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-[#00c2a9] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#00a994] transition-colors duration-300"
                >
                  Explore Articles
                </button>
              </motion.div>

            </div>

            {/* Right Image */}
            <motion.div
              className="flex-1 w-full lg:w-1/2 min-h-[300px] lg:min-h-0"
              variants={imageVariants}
            >
              <img
                src={AiChartImage}
                alt="AI powered learning chart"
                className="w-full h-full object-cover"
              />
            </motion.div>

          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default BlogPage;
