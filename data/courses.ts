// src/data/courses.ts

import type { LucideIcon } from 'lucide-react';
import { BookOpen, Briefcase, Users, Rocket, Code, Award } from 'lucide-react';
import { Course } from '../types';
import DigitalMarketing from '../assets/DigitalMarketing.png';
import FullStackDevelopment from '../assets/FullStack.png';
import DataAnalytics from '../assets/Dataanalytics.jpg';
import zoho from '../assets/zoho.png';
import capgemini from '../assets/capgemini.png';
import infosys from '../assets/infosys.png';
import wipro from '../assets/wipro.svg';
import tcs from '../assets/tcs.svg';
import microsoft from '../assets/microsoft.png';
import cognizant from '../assets/cognizant.svg';
import techmahindra from '../assets/techmahindra.png';
import accenture from '../assets/accenture.png';



// --- TYPE DEFINITIONS ---

export interface ProgramBenefit {
  title: string;
  desc: string;
  icon: LucideIcon;
  highlighted?: boolean;
}

export interface Project {
  title: string;
  description: string;
  skills: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CurriculumModule {
  title: string;
  lessons: string[];
  duration: string;
}

export interface Batch {
  name: string;
  days: string;
  time: string;
  status: string;
}

export interface WhoCanLearnItem {
  title: string;
  desc: string;
  icon: LucideIcon;
}

export interface CertificationBenefit {
  title: string;
  description: string;
}

export interface Certification {
  images: string[];
  benefits: CertificationBenefit[];
}

export const courses: Course[] = [
  {
      // SEO METADATA
      id: 'ai-in-digital-marketing-course-in-coimbatore',
      slug: 'ai-in-digital-marketing',
      metaTitle: 'AI in Digital Marketing Course | KoPath | Learn Predictive AI',
      metaDescription: 'Join our comprehensive AI in Digital Marketing course. Master generative AI, predictive analytics, and automated campaigns with hands-on projects. Apply now!',
      keywords: ['ai marketing', 'digital marketing course', 'generative ai', 'predictive analytics', 'marketing automation'],

      // CORE INFO
      title: 'AI in Digital Marketing Course',
      category: 'Marketing',
      description: 'Master the future of marketing by integrating Generative AI tools, predictive analytics, and automated content creation strategies.',
      longDescription: 'Become a futuristic marketer who uses AI to predict trends and automate growth.',
      duration: '12 Weeks',
      mode: 'Hybrid',
      image: DigitalMarketing,
      videoUrl: "https://youtube.com/shorts/PGEJf-MJ9-Y?si=g-b_hwx48gubxo-7",
      introVideoUrl: "https://youtu.be/r0bKvw0oK4s?si=nlX5d2e7BtRAGPv1",
      brouchureUrl: "",

      // DETAILED CONTENT
      aboutCourse: "The future of marketing is here, and it's powered by Artificial Intelligence. This course is designed for aspiring and current marketing professionals who want to lead the change. We move beyond the hype and dive deep into the practical application of AI in marketing. You'll learn how to use Generative AI tools like ChatGPT and Midjourney for rapid content creation, implement predictive analytics to forecast campaign performance, and build automated workflows that save time and drive results. This program is your launchpad to becoming an invaluable, future-proof marketer in a data-driven world.",
      learningOutcomes: [
          "Strategize and create high-quality marketing content in seconds using Generative AI.",
          "Build and interpret predictive models for customer segmentation and lead scoring.",
          "Automate social media calendars, email sequences, and ad campaign reporting.",
          "Conduct advanced keyword research and SEO analysis using AI-powered tools.",
          "Master prompt engineering to get the best results from tools like ChatGPT.",
          "Analyze campaign data using Google Analytics 4 and AI-driven insights."
      ],
      programBenefits: [
          { title: "Tool Access", desc: "Free premium access to ChatGPT Plus and Midjourney for course duration.", icon: Code },
          { title: "Google Certified", desc: "Preparation for 5+ official Google and HubSpot certifications.", icon: Award, highlighted: true },
          { title: "Agency Portfolio", desc: "Build a portfolio that looks like you have 2 years of agency experience.", icon: Rocket },
      ],
      projects: [
          {
              title: "Project 1: The AI-Powered Content Engine",
              description: "Students will use ChatGPT and Midjourney to create a complete content package for a fictional brand, including blog posts, social media updates for one month, and ad copy variations.",
              skills: ["ChatGPT", "Midjourney", "Content Strategy", "Copywriting"]
          },
          {
              title: "Project 2: Predictive Lead Scoring Model",
              description: "Using a sample dataset, students will build a simple model to predict which leads are most likely to convert, allowing for smarter budget allocation in ad campaigns.",
              skills: ["Data Analysis", "Predictive Analytics", "Google Sheets"]
          },
          {
              title: "Project 3: Automated SEO & Reporting Workflow",
              description: "Build a complete workflow that uses AI tools to perform keyword research, generate SEO-optimized article outlines, and create a monthly performance report automatically.",
              skills: ["SEO", "AI Tools", "Google Analytics 4", "Automation"]
          }
      ],
      skills: ["ChatGPT Prompting", "MidJourney", "SEO", "Google Ads", "Meta Ads", "HubSpot", "Copywriting", "Data Analysis"],
      specificFAQs: [
          { question: "Do I need to know how to code for this AI marketing course?", answer: "No! This course is designed for marketers. We focus on using existing AI tools and platforms, not on building them from scratch. No programming experience is required." },
          { question: "Is this course suitable for beginners in digital marketing?", answer: "Yes, it's perfect for both beginners and experienced marketers. We cover foundational marketing principles before introducing how AI can enhance them, ensuring everyone can keep up and benefit." },
          { question: "What kind of jobs can I get after completing this course?", answer: "Graduates are prepared for roles like AI Marketing Strategist, MarTech Specialist, Digital Marketing Manager, Content Strategist, and SEO Specialist with AI expertise." }
      ],

      // ADDITIONAL DATA
      features: ['SEO Automation', 'Content Generation', 'Ad Optimization'],
      careerPaths: ['Performance Marketer', 'SEO Analyst', 'AI Marketing Specialist', 'Content Strategist', 'Growth Hacker'],
      hiringPartners: [zoho, capgemini, infosys, wipro, tcs, microsoft, cognizant, techmahindra, accenture],
      curriculum: [
          { title: "Module 1: AI Marketing Foundations", lessons: ["What is AI in Marketing?", "AI Tools Overview", "Prompt Engineering Basics", "AI Workflow for Marketers"], duration: "4 Hours" },
          { title: "Module 2: Content Generation with GenAI", lessons: ["AI Content Writing", "Social Media Content Creation", "AI Image & Video Generation", "Long-form Content Automation"], duration: "6 Hours" },
          { title: "Module 3: SEO & Predictive Analytics", lessons: ["Keyword Research with AI", "AI-Driven SEO Content Mapping", "Predictive Analytics for SEO", "AI Optimization Techniques"], duration: "8 Hours" },
          { title: "Module 4: Social Media Automation", lessons: ["AI Scheduling Tools", "AI for Engagement Boost", "Automated Reporting", "Chatbots & Auto-Replies"], duration: "5 Hours" },
          { title: "Module 5: Performance Marketing (Ads)", lessons: ["AI Audience Targeting", "Ad Copy Generation", "Budget Optimization", "A/B Testing with AI"], duration: "6 Hours" },
          { title: "Module 6: Capstone Strategy", lessons: ["Build an AI-Powered Marketing Plan", "Real-Time Campaign Simulation", "Final Assessment"], duration: "3 Hours" },
      ],
      batches: [
          { name: "Weekend Batch", days: "Saturday & Sunday", time: "10:00 AM - 02:00 PM", status: "Filling Fast" },
          { name: "Weekday Evening", days: "Mon - Fri", time: "06:30 PM - 08:30 PM", status: "Available" }
      ],
      careerSectionDescription: "This course is crafted for computer science students, aspiring developers, and career switchers who want to master the complete stack. Whether you are preparing for a job at a top tech company, freelancing, or launching your own startup, this hands-on course will help you become job-ready.",
      whoCanLearn: [
          { title: "Marketing Grads", desc: "Upgrade your degree with practical AI skills.", icon: BookOpen },
          { title: "Freelancers", desc: "Automate your client work and earn 2x more.", icon: Briefcase },
          { title: "Business Owners", desc: "Run your own marketing without an agency.", icon: Rocket },
          { title: "Content Creators", desc: "Scale your content production effortlessly.", icon: Users },
      ],
      certification: {
          images: ["https://picsum.photos/seed/cert_google/400/300", "https://picsum.photos/seed/cert_hubspot/400/300"],
          benefits: [
              { title: "Globally Recognized", description: "Our certifications are aligned with Google and HubSpot standards, accepted worldwide." },
              { title: "Shareable Badge", description: "Get a digital badge to showcase on LinkedIn and your resume immediately." },
              { title: "Portfolio Backed", description: "Your certificate is valid only when accompanied by your live project portfolio." },
              { title: "Lifetime Validity", description: "Unlike other courses, your KoPath certification does not expire." }
          ]
      },
  },
  {
      // SEO METADATA
      id: 'ai-in-full-stack-development-course-in-coimbatore',
      slug: 'ai-in-full-stack-development',
      metaTitle: 'AI Full Stack Developer Course | MERN Stack | KoPath',
      metaDescription: 'Become an AI-powered Full Stack Developer. Master the MERN stack, Next.js, and integrate AI tools like GitHub Copilot in our hands-on course. Build real-world projects.',
      keywords: ['full stack developer course', 'mern stack', 'ai coding assistant', 'react course', 'nodejs course'],

      // CORE INFO
      title: 'AI in Full Stack Development Course',
      category: 'Development',
      description: 'Build robust, scalable web applications using modern stacks while leveraging AI coding assistants and automated testing frameworks.',
      longDescription: 'Stop just coding. Start engineering intelligent systems with AI assistants.',
      duration: '24 Weeks',
      mode: 'Offline',
      image: FullStackDevelopment,
      videoUrl: "https://youtube.com/shorts/zVkz2ErYbMQ?si=ubluTxFrKTREtdJg",
      introVideoUrl: "https://youtu.be/r0bKvw0oK4s?si=nlX5d2e7BtRAGPv1",
      brouchureUrl: "",

      // DETAILED CONTENT
      aboutCourse: "Go beyond traditional coding with our AI-enhanced Full Stack Development program. This course is meticulously crafted for individuals aiming to build sophisticated, end-to-end web applications. You'll gain a deep understanding of the MERN stack (MongoDB, Express.js, React, Node.js) and learn how to supercharge your workflow with AI-powered tools like GitHub Copilot for faster coding, intelligent suggestions, and automated bug detection. We focus on building scalable, secure, and maintainable software, preparing you for the demands of top tech companies.",
      learningOutcomes: [
          "Architect and build complete MERN stack applications from scratch.",
          "Use AI coding assistants like GitHub Copilot to accelerate development by up to 50%.",
          "Develop secure, RESTful APIs with Node.js and Express for complex backend logic.",
          "Create dynamic and responsive user interfaces with React and modern state management.",
          "Design and manage both SQL and NoSQL databases effectively.",
          "Deploy scalable applications to cloud platforms like AWS using Docker and CI/CD pipelines."
      ],
      programBenefits: [
          { title: "Hands-On Labs", desc: "Over 80% of the course is practical, with daily coding exercises and labs.", icon: Code },
          { title: "Industry Certification", desc: "Receive a professional full stack development certification recognized by our hiring partners.", icon: Award, highlighted: true },
          { title: "Live Capstone Project", desc: "Build a fully functional, real-world application as your final project to showcase to employers.", icon: Rocket },
      ],
      projects: [
          {
              title: "Project 1: AI-Powered E-commerce Platform",
              description: "Develop a full-featured online store with product listings, user authentication, a shopping cart, and an admin dashboard. Integrate an AI chatbot for customer support.",
              skills: ["React", "Node.js", "MongoDB", "REST API", "JWT Auth"]
          },
          {
              title: "Project 2: Real-Time Collaborative Code Editor",
              description: "Build a web application similar to Google Docs where multiple users can write and edit code in real-time, using WebSockets for live collaboration.",
              skills: ["WebSockets", "React", "Node.js", "State Management"]
          },
          {
              title: "Project 3: Serverless API Deployment",
              description: "Create and deploy a serverless backend API using AWS Lambda and API Gateway, demonstrating modern, cost-effective cloud architecture skills.",
              skills: ["AWS Lambda", "Serverless", "CI/CD", "DevOps"]
          }
      ],
      skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB", "SQL", "Git", "AWS", "Docker"],
      specificFAQs: [
          { question: "Do I need prior coding knowledge?", answer: "While basic logical thinking is helpful, this course is designed to be beginner-friendly. Our initial 'Foundation Module' covers all programming fundamentals from scratch." },
          { question: "What is the primary tech stack covered?", answer: "We focus on the MERN Stack (MongoDB, Express, React, Node.js), a highly in-demand stack. We also cover Next.js for server-side rendering and AI integration tools." },
          { question: "Are classes live or recorded?", answer: "All our sessions are 100% live and interactive, led by industry expert instructors. You will code along, ask questions, and get real-time feedback." }
      ],

      // ADDITIONAL DATA
      features: ['React & Node.js', 'Copilot Integration', 'Cloud Deployment'],
      careerPaths: ['Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'DevOps Intern', 'Software Engineer'],
      hiringPartners: [zoho, capgemini, infosys, wipro, tcs, microsoft, cognizant, techmahindra, accenture],
      curriculum: [
          { title: "Module 1: Frontend Fundamentals", lessons: ["HTML & Semantic Structure", "CSS Fundamentals", "Responsive Web Design", "JavaScript Basics", "DOM Manipulation", "ES6+ Features", "APIs & Fetch", "Version Control (Git)", "Package Managers (npm/yarn)", "Basic UI Components", "Intro to Web Accessibility", "Mini Frontend Project"], duration: "20 Hours" },
          { title: "Module 2: React Development", lessons: ["React Fundamentals", "Components & Props", "State & Lifecycle", "React Hooks", "Routing with React Router", "Forms & Validation", "Context API", "State Management Basics (Redux/Context)", "API Integration in React", "Performance Optimization", "Reusable UI Architecture", "React Best Practices", "Frontend Build Process", "Real-Time Features (optional)", "React Mini Project"], duration: "25 Hours" },
          { title: "Module 3: Backend Development", lessons: ["Node.js Basics", "Express.js Framework", "Routing & Middleware", "Authentication (JWT)", "Authorization", "REST API Design", "File Uploading", "Error Handling", "API Security Essentials", "Environment Variables", "Async Programming", "Server-Side Logic", "API Testing Tools", "MVC Architecture", "Backend Optimization", "Scalability Basics", "Real-Time Backend (Socket.io)", "Backend Mini Project"], duration: "30 Hours" },
          { title: "Module 4: Database Management", lessons: ["SQL vs NoSQL", "MySQL Basics", "MongoDB Fundamentals", "Schema & Models", "CRUD Operations", "Relationships & Joins", "Indexes & Performance", "Aggregation Pipelines", "Database Security", "Database Backup & Restore"], duration: "18 Hours" },
          { title: "Module 5: Deployment & DevOps", lessons: ["Hosting Fundamentals", "CI/CD Concepts", "Deploying with GitHub", "Docker Basics", "Containerization Workflow", "Reverse Proxy (Nginx)", "Monitoring & Logs", "Deploying Full Stack App"], duration: "15 Hours" },
          { title: "Module 6: Capstone Project", lessons: ["Project Planning", "Frontend Setup", "Backend Setup", "Database Architecture", "API Integration", "Authentication System", "UI/UX Enhancements", "Deployment of Final Project", "Performance Testing", "Documentation", "Presentation & Review", "Final Submission"], duration: "20 Hours" },
      ],
      batches: [
          { name: "Weekday Batch - 1", days: "Monday to Friday", time: "07:00 AM - 09:00 AM", status: "Available" },
          { name: "Weekday Batch - 2", days: "Monday to Friday", time: "09:00 AM - 05:00 PM", status: "Available" },
          { name: "Weekday Batch - 3", days: "Monday to Friday", time: "06:00 PM - 09:00 AM", status: "Available" },
      ],
      careerSectionDescription: "This course is crafted for computer science students, aspiring developers, and career switchers who want to master the complete stack. Whether you are preparing for a job at a top tech company, freelancing, or launching your own startup, this hands-on course will help you become job-ready.",
      whoCanLearn: [
          { title: "Computer Science Students", desc: "Ideal for students pursuing CS or IT degrees.", icon: BookOpen },
          { title: "Career Switchers", desc: "Perfect for professionals from non-tech backgrounds.", icon: Briefcase },
          { title: "Junior Developers", desc: "For early-career developers looking to gain hands-on experience.", icon: Users },
          { title: "Startup Founders", desc: "Great for entrepreneurs who want to build their own platforms.", icon: Rocket },
      ],
      certification: {
          images: ["https://picsum.photos/seed/cert_fsd_1/400/300", "https://picsum.photos/seed/cert_fsd_2/400/300"],
          benefits: [
              { title: "ISO Certified", description: "Our curriculum standards meet ISO 9001:2015 educational quality benchmarks." },
              { title: "Skill Validation", description: "Specific mention of 'AI-Integrated Development' on your certificate sets you apart." },
              { title: "Corporate Accepted", description: "Trusted by 50+ hiring partners in Coimbatore and Bangalore." },
              { title: "Digital Verification", description: "Employers can verify your credential authenticity online instantly." }
          ]
      },
  },
  {
      // SEO METADATA
      id: 'ai-in-data-analytics-course-in-coimbatore',
      slug: 'ai-in-data-analytics',
      metaTitle: 'AI in Data Analytics Course | Python & Machine Learning | KoPath',
      metaDescription: 'Learn Data Analytics with AI. Master Python, SQL, PowerBI, and build machine learning models for predictive insights. Get certified and job-ready.',
      keywords: ['data analytics course', 'python for data science', 'machine learning course', 'powerbi certification'],

      // CORE INFO
      title: 'AI in Data Analytics Course',
      category: 'Data',
      description: 'Transform raw data into actionable insights using Python, Machine Learning models, and AI-driven visualization tools.',
      longDescription: 'Turn data into decisions using the power of Python and Predictive AI.',
      duration: '18 Weeks',
      mode: 'Hybrid',
      image: DataAnalytics,
      videoUrl: "https://youtube.com/shorts/oYkbUdh-RM4?si=Xy63hUbK4D7tP8uM",
      introVideoUrl: "https://youtu.be/r0bKvw0oK4s?si=nlX5d2e7BtRAGPv1",
      brouchureUrl: "",

      // DETAILED CONTENT
      aboutCourse: "Unlock the power of data with our AI in Data Analytics course. This program is your comprehensive guide to transforming raw numbers into strategic business decisions. You will master the essential toolkit of a modern data analyst: Python for data manipulation, SQL for data extraction, and PowerBI/Tableau for creating compelling visualizations. Crucially, we integrate Machine Learning, teaching you how to build and deploy predictive models to forecast trends, identify opportunities, and solve real-world business problems, making you a highly sought-after asset in any industry.",
      learningOutcomes: [
          "Automate data cleaning and preprocessing tasks using Python libraries like Pandas and NumPy.",
          "Write advanced SQL queries to extract and manipulate data from complex relational databases.",
          "Design and build insightful, interactive business intelligence dashboards in PowerBI and Tableau.",
          "Understand and apply core statistical concepts for robust data analysis.",
          "Implement predictive machine learning models for classification and regression tasks.",
          "Present data-driven stories and strategic recommendations to stakeholders."
      ],
      programBenefits: [
          { title: "Live Data Labs", desc: "Work on real-world, messy datasets from the finance, healthcare, and e-commerce sectors.", icon: Code },
          { title: "Global Certification Prep", desc: "Our curriculum is fully aligned with the Microsoft Power BI Data Analyst (PL-300) certification.", icon: Award, highlighted: true },
          { title: "Hackathon Experience", desc: "Compete in exclusive internal hackathons to solve complex problems and win prizes.", icon: Rocket },
      ],
      projects: [
          {
              title: "Project 1: Customer Churn Prediction Model",
              description: "Build a machine learning model that predicts which customers are likely to cancel their subscriptions, allowing a business to take proactive retention measures.",
              skills: ["Python", "Scikit-Learn", "Data Cleaning", "Classification"]
          },
          {
              title: "Project 2: Interactive Sales Dashboard with Forecasting",
              description: "Create a dynamic PowerBI dashboard analyzing historical sales data. Integrate a predictive element to forecast sales for the upcoming quarter.",
              skills: ["PowerBI", "DAX", "Data Visualization", "Forecasting"]
          },
          {
              title: "Project 3: Market Basket Analysis for Retail",
              description: "Analyze transaction data from a retail store to discover which products are frequently bought together, providing insights for store layout and marketing promotions.",
              skills: ["SQL", "Python", "Pandas", "Association Rule Mining"]
          }
      ],
      skills: ["Python", "Pandas", "NumPy", "SQL", "PowerBI", "Tableau", "Scikit-Learn", "Statistics", "Excel"],
      specificFAQs: [
          { question: "Is a strong math or statistics background required?", answer: "A basic understanding of high-school level math is sufficient. We teach all the necessary applied statistics and mathematical concepts from the ground up, focusing on practical application rather than deep theory." },
          { question: "Will I learn real Machine Learning?", answer: "Yes. You will learn the entire lifecycle of a machine learning project, from data preparation to model training and evaluation, using the popular Scikit-learn library in Python." },
          { question: "What are the main tools I will be using?", answer: "You will gain hands-on expertise in Python (with Pandas, NumPy, Scikit-learn), SQL, Microsoft Power BI, Tableau, and advanced Excel." }
      ],

      // ADDITIONAL DATA
      features: ['Python & SQL', 'Predictive Modeling', 'PowerBI & Tableau'],
      careerPaths: ['Data Analyst', 'BI Analyst', 'Data Technician', 'Jr. Data Scientist'],
      hiringPartners: [zoho, capgemini, infosys, wipro, tcs, microsoft, cognizant, techmahindra, accenture],
      curriculum: [
          { title: "Module 1: Python for Data Science", lessons: ["Introduction to Python", "Jupyter Notebook Setup", "Data Types & Variables", "Control Flow & Functions", "Working with Libraries (NumPy, Pandas)", "Data Cleaning & Preprocessing", "Handling Missing Values", "Data Merging & Joining", "Exploratory Data Analysis", "Working with Files", "Basic Data Pipelines", "Mini Python Project"], duration: "22 Hours" },
          { title: "Module 2: SQL & Database Design", lessons: ["SQL Basics (SELECT, WHERE)", "Joins & Relationships", "Aggregation & Grouping", "Subqueries", "Views & Stored Procedures", "Indexes & Optimization", "Normalization Concepts", "Database Modelling", "Import & Export Data", "SQL Hands-on Project"], duration: "18 Hours" },
          { title: "Module 3: Data Visualization (Power BI)", lessons: ["Power BI Interface", "Connecting Data Sources", "Data Transformation (Power Query)", "Data Modelling", "DAX Basics", "Charts & Graphs", "Building Interactive Dashboards", "Filters & Slicers", "Publishing Reports", "Power BI Mini Project"], duration: "20 Hours" },
          { title: "Module 4: Statistics & Math", lessons: ["Descriptive Statistics", "Probability Basics", "Distributions", "Correlation & Covariance", "Hypothesis Testing", "Regression Math", "Sampling Techniques", "Real-World Statistical Analysis"], duration: "15 Hours" },
          { title: "Module 5: Machine Learning Basics", lessons: ["Introduction to ML", "Supervised vs Unsupervised Learning", "Regression Models", "Classification Models", "Decision Trees", "Clustering Techniques", "Model Evaluation Metrics", "Train-Test Split", "Overfitting & Underfitting", "Feature Engineering", "Feature Scaling", "Model Deployment Basics", "ML Pipeline Building", "Model Optimization", "Mini ML Project"], duration: "28 Hours" },
          { title: "Module 6: Capstone Project", lessons: ["Problem Statement Finalization", "Data Collection", "Data Cleaning & Preparation", "EDA & Insights", "Dashboard Design", "ML Model Building", "Model Optimization", "Project Report", "Presentation & Documentation", "Final Submission"], duration: "20 Hours" },
      ],
      batches: [
          { name: "Weekend Intensive", days: "Sat & Sun", time: "09:00 AM - 04:00 PM", status: "Available" },
          { name: "Weekday Morning", days: "Mon - Fri", time: "07:30 AM - 09:30 AM", status: "Fast Filling" }
      ],
      careerSectionDescription: "This course is crafted for Enginnering, aspiring developers, and career switchers who want to master the complete stack. Whether you are preparing for a job at a top tech company, freelancing, or launching your own startup, this hands-on course will help you become job-ready.",
      whoCanLearn: [
          { title: "Analysts", desc: "Traditional analysts looking to upgrade to Data Science.", icon: BookOpen },
          { title: "Managers", desc: "Decision makers who want to understand data better.", icon: Briefcase },
          { title: "Freshers", desc: "Graduates looking for a high-growth career path.", icon: Users },
          { title: "Finance Pros", desc: "Automate your reporting and financial modeling.", icon: Rocket },
      ],
      certification: {
          images: ["https://picsum.photos/seed/cert_da_1/400/300", "https://picsum.photos/seed/cert_da_2/400/300"],
          benefits: [
              { title: "Industry Standard", description: "Based on the official Microsoft PowerBI Data Analyst curriculum." },
              { title: "Project Verified", description: "Earn your certificate only after deploying 3 predictive models." },
              { title: "LinkedIn Ready", description: "One-click add to your LinkedIn profile 'Licenses & Certifications' section." },
              { title: "Global Value", description: "Recognized by analytics firms and MNCs across India and abroad." }
          ]
      },
  }
];