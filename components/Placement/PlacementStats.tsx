import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, CheckCircle, Target, 
  Award, Building
} from 'lucide-react';

export const PlacementStats: React.FC = () => {
  const stats = [
    { label: "Highest Package", value: "18 LPA", icon: Award, color: "text-yellow-400" },
    { label: "Average Package", value: "6.5 LPA", icon: TrendingUp, color: "text-primary-400" },
    { label: "Hiring Partners", value: "50+", icon: Building, color: "text-purple-400" },
    { label: "Students Placed", value: "1200+", icon: Users, color: "text-green-400" },
    { label: "Internship Conversion", value: "100%", icon: CheckCircle, color: "text-blue-400" },
    { label: "Career Gaps Filled", value: "300+", icon: Target, color: "text-orange-400" },
  ];

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-8 rounded-2xl border border-slate-800 hover:border-primary-500/50 hover:shadow-[0_0_30px_rgba(8,145,178,0.1)] transition-all group text-center"
            >
              <div className="flex justify-center mb-4">
                <stat.icon
                  className={`${stat.color} group-hover:scale-110 transition-transform`}
                  size={40}
                />
              </div>

              <h3 className="text-4xl font-extrabold text-white mb-1">
                {stat.value}
              </h3>

              <p className="text-slate-400 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
