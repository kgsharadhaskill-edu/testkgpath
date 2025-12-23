import { NavLink, Stat, Testimonial, FAQItem } from './types';
import CloudImage from './assets/Cloud.png';
import CloudImage2 from './assets/Cloud2.png';
import CloudImage3 from './assets/Cloud3.png';
import microsoft from './assets/microsoft.png';
import accenture from './assets/accenture.png';
import wipro from './assets/wipro.svg';
import zoho from './assets/zoho.png';
import infosys from './assets/infosys.png';
import tcs from './assets/tcs.svg';
import capgemini from './assets/capgemini.png';
import techmahindra from './assets/techmahindra.png';
import cognizant from './assets/Cognizant.svg';



export const NAV_LINKS: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Courses', path: '/courses' },
  { name: 'Blog', path: '/blog' },
  { name: 'Placement', path: '/placement' },
  { name: 'Careers', path: '/careers' },
  { name: 'Contact', path: '/contact' },
];

export const HERO_STATS: Stat[] = [
  { label: 'Students Placed', value: '1200+' },
  { label: 'Avg. Salary Hike', value: '150%' },
];

export const PARTNER_LOGOS = [
  { src: tcs, name: 'TCS' },
  { src: infosys, name: 'Infosys' },
  { src: wipro, name: 'Wipro' },
  { src: cognizant, name: 'Cognizant' },
  { src: accenture, name: 'Accenture' },
  { src: techmahindra, name: 'Tech Mahindra' },
  { src: capgemini, name: 'Capgemini' },
  { src: zoho, name: 'Zoho' },
  { src: microsoft, name: 'Microsoft' }
];


export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Yuvaneshan',
    role: 'Core Engineer',
    company: '—',
    videoThumbnail: CloudImage,
    videolink: 'https://www.youtube.com/embed/zVkz2ErYbMQ',
    rating: 5,
    text: "Yuvaneshan secured a high-paying job in a core company through our intensive hands-on training."
  },
  {
    id: '2',
    name: 'Chandru',
    role: 'Cloud Architect Trainee',
    company: '—',
    videoThumbnail: CloudImage2,
    videolink: 'https://www.youtube.com/embed/PGEJf-MJ9-Y',
    rating: 5,
    text: "My journey at Sharadha Skill Academy has been incredible. I got hands-on training in Cloud Architecture, learning real-world skills that actually matter!"
  },
  {
    id: '3',
    name: 'Jersha',
    role: 'Tech Support Engineer',
    company: 'Namecheap',
    videoThumbnail: CloudImage3,
    videolink: "https://www.instagram.com/reel/DIlb31TCjDM/",
    rating: 4,
    text: "With the support of the placement team, Jersha landed a great job at Namecheap with an excellent package to kickstart her career!"
  }
];



export const FAQS: FAQItem[] = [
  {
    question: "Do I need prior coding experience?",
    answer: "For the Digital Marketing course, no. For Data Analytics and Full Stack, basic logic is helpful, but we start from scratch."
  },
  {
    question: "Is there placement assistance?",
    answer: "Yes, we have a dedicated placement cell that conducts mock interviews, resume building, and guarantees interview opportunities."
  },
  {
    question: "Are classes online or offline?",
    answer: "We offer both. Our campus in Coimbatore is state-of-the-art, and our online sessions are live and interactive."
  },
  {
    question: "What makes your AI courses different?",
    answer: "We don't just teach theory. We integrate GenAI tools into every workflow, making you productive immediately in the modern workforce."
  }
];