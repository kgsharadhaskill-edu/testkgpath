export interface FAQItem {
  question: string;
  answer: string;
}

export interface CertificationDetails {
  images: string[];
  benefits: {
    title: string;
    description: string;
  }[];
}

export interface Course {
  id: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];

  title: string;
  category: 'Marketing' | 'Development' | 'Data';
  description: string;
  longDescription: string;

  duration: string;
  mode: 'Offline' | 'Hybrid' | 'Online';
  image: string;
  videoUrl: string;
  introVideoUrl: string;
  brouchureUrl: string;

  aboutCourse: string;

  learningOutcomes: string[];
  programBenefits: {
    title: string;
    desc: string;
    icon: any;
    highlighted?: boolean;
  }[];

  projects: {
    title: string;
    description: string;
    skills: string[];
  }[];

  features: string[];
  careerPaths: string[];
  hiringPartners: string[];
  specificFAQs: FAQItem[];

  curriculum?: {
    title: string;
    lessons: string[];
    duration: string;
  }[];

  careerSectionDescription: string;

  batches?: {
    name: string;
    days: string;
    time: string;
    status: string;
  }[];

  skills?: string[];

  whoCanLearn?: {
    title: string;
    desc: string;
    icon: any;
  }[];

  certification?: CertificationDetails;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: {
    type: 'h2' | 'h3' | 'p' | 'list' | 'quote';
    text: string | string[];
  }[];
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
  takeaways: string[];
}

export interface Stat {
  label: string;
  value: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  videoThumbnail: string;
  videolink?: string;
  rating: number;
  text: string;
}

export interface NavLink {
  name: string;
  path: string;
}
