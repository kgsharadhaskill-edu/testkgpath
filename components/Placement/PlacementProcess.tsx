import React from "react";
import { BsChatDots, BsGraphUpArrow } from "react-icons/bs";
import { FaBrain, FaChessRook, FaRegLightbulb, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

interface Step {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}

const steps: Step[] = [
  {
    title: "Enroll & Orientation",
    desc: "Goal setting & roadmap planning.",
    icon: <BsChatDots />,
    color: "#22c55e", // Green
  },
  {
    title: "Skill Mastery",
    desc: "Project-based intensive learning.",
    icon: <FaBrain />,
    color: "#14b8a6", // Teal
  },
  {
    title: "Portfolio Building",
    desc: "Creating live projects.",
    icon: <FaChessRook />,
    color: "#06b6d4", // Cyan
  },
  {
    title: "Pre-Placement",
    desc: "Mocks, Resume, Aptitude.",
    icon: <FaRegLightbulb />,
    color: "#0ea5e9", // Sky
  },
  {
    title: "Interview Drives",
    desc: "Attending exclusive interviews.",
    icon: <BsGraphUpArrow />,
    color: "#6366f1", // Indigo
  },
  {
    title: "Offer Letter",
    desc: "Negotiation & onboarding.",
    icon: <FaCheckCircle />,
    color: "#9333ea", // Purple
  },
];

// Animation Variants for Framer Motion
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

const desktopItemVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      damping: 12,
      stiffness: 100,
    },
  },
};


export const PlacementProcess: React.FC = () => {
  // --- Geometry Configuration for Radial Layout ---
  const size = 800; // SVG ViewBox size
  const center = size / 2;
  const innerRadius = 130;
  const arcWidth = 60;
  const outerRadius = innerRadius + arcWidth;
  const triangleRadius = outerRadius + 12; // Radius where the triangle tip sits
  const iconRadius = triangleRadius + 35; // Radius where the icon circle sits (near the triangle)
  
  // Helper to convert polar to cartesian
  const polarToCartesian = (cx: number, cy: number, r: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(angleInRadians),
      y: cy + r * Math.sin(angleInRadians),
    };
  };

  // Helper to create an SVG arc path
  const describeArc = (x: number, y: number, r: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, r, endAngle);
    const end = polarToCartesian(x, y, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M", start.x, start.y,
      "A", r, r, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  };

  return (
    <section className="py-16 lg:py-24 bg-slate-950 overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 lg:mb-20">
          <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Your Roadmap to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Success</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            A structured path from day one to offer day, ensuring you're prepared
            for every opportunity.
          </p>
        </div>

        {/* --- Mobile/Tablet View (Vertical Timeline) --- */}
        <div className="lg:hidden max-w-md mx-auto relative">
           {/* Vertical Line */}
          <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-800" />
          
          <motion.div 
            className="space-y-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {steps.map((step, i) => (
              <motion.div 
                key={i} 
                className="relative flex items-start gap-6 group"
                variants={mobileItemVariants}
              >
                {/* Icon Circle */}
                <div 
                  className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg ring-4 ring-slate-950 transition-transform group-hover:scale-110 duration-300"
                  style={{ backgroundColor: step.color }}
                >
                  <div className="text-xl">{step.icon}</div>
                </div>
                
                {/* Content */}
                <div className="pt-1.5">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Desktop View (Radial SVG) --- */}
        <div className="hidden lg:block relative w-full max-w-[900px] mx-auto aspect-square">
          <motion.svg 
            viewBox={`0 0 ${size} ${size}`} 
            className="w-full h-full drop-shadow-2xl"
            style={{ overflow: 'visible' }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Definitions for gradients/effects */}
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Dashed background circle */}
            <circle
              cx={center}
              cy={center}
              r={outerRadius + 20}
              fill="none"
              stroke="#1e293b"
              strokeWidth="1"
              strokeDasharray="4 6"
            />

            {/* Central Hub */}
            <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <circle cx={center} cy={center} r={innerRadius - 20} fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
              <circle cx={center} cy={center} r={innerRadius - 25} fill="#ffffff" />
              <text
                x={center}
                y={center - 10}
                fontSize="48"
                fontWeight="800"
                fill="#0f172a"
                textAnchor="middle"
                className="uppercase tracking-tighter"
              >
                6 Steps
              </text>
              <text
                x={center}
                y={center + 25}
                fontSize="20"
                fontWeight="700"
                fill="#3b82f6"
                textAnchor="middle"
                className="uppercase tracking-widest"
              >
                To Get Hired
              </text>
            </motion.g>

            {/* Segments */}
            {steps.map((step, i) => {
              const angle = i * 60 + 30;
              const startAngle = angle - 30 + 1;
              const endAngle = angle + 30 - 1;

              const arcPath = describeArc(center, center, (innerRadius + outerRadius)/2, startAngle, endAngle);
              const trianglePos = polarToCartesian(center, center, outerRadius + 4, angle);
              const contentPos = polarToCartesian(center, center, iconRadius, angle);

              let layoutClass = "";
              let textAlignment = "";
              let containerStyle = {};

              const normAngle = angle % 360;

              if (normAngle === 270) { // Top
                layoutClass = "flex-col-reverse";
                textAlignment = "text-center";
                containerStyle = { transform: 'translate(-50%, -100%)', paddingBottom: '16px' };
              } else if (normAngle === 90) { // Bottom
                layoutClass = "flex-col";
                textAlignment = "text-center";
                containerStyle = { transform: 'translate(-50%, 0)', paddingTop: '16px' };
              } else if (normAngle > 90 && normAngle < 270) { // Left Side
                layoutClass = "flex-row-reverse";
                textAlignment = "text-right";
                containerStyle = { transform: 'translate(-100%, -50%)', paddingRight: '16px' };
              } else { // Right Side
                layoutClass = "flex-row";
                textAlignment = "text-left";
                containerStyle = { transform: 'translate(0, -50%)', paddingLeft: '16px' };
              }

              return (
                <motion.g key={i} className="group cursor-default" variants={desktopItemVariants}>
                  {/* Colored Arc Segment */}
                  <path
                    d={arcPath}
                    fill="none"
                    stroke={step.color}
                    strokeWidth={arcWidth}
                    className="opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  
                  {/* Triangle Pointer */}
                  <polygon
                    points="-6,0 6,0 0,10"
                    fill={step.color}
                    transform={`translate(${trianglePos.x}, ${trianglePos.y}) rotate(${angle - 90})`} 
                  />

                  {/* Icon & Text Wrapper placed via foreignObject */}
                  <foreignObject 
                    x={contentPos.x} 
                    y={contentPos.y} 
                    width="1" 
                    height="1" 
                    style={{ overflow: 'visible' }}
                  >
                     <div 
                        className={`flex items-center gap-4 w-max ${layoutClass} absolute`}
                        style={{ ...containerStyle, left: 0, top: 0 }}
                      >
                        {/* Icon Circle */}
                        <div 
                          className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl shadow-xl ring-4 ring-slate-950 z-20 transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundColor: step.color }}
                        >
                          {step.icon}
                        </div>
                        
                        {/* Text Block */}
                        <div className={`flex flex-col ${textAlignment} max-w-[180px]`}>
                          <h4 className="text-white font-bold text-lg leading-tight mb-1 group-hover:text-blue-300 transition-colors">
                            {step.title}
                          </h4>
                          <p className="text-slate-400 text-xs font-medium leading-snug">
                            {step.desc}
                          </p>
                        </div>
                     </div>
                  </foreignObject>
                </motion.g>
              );
            })}
          </motion.svg>
        </div>
      </div>
    </section>
  );
};