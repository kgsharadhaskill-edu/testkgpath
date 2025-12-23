import { LucideIcon } from 'lucide-react';

export interface Milestone {
  year: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  colorTheme: 'red' | 'green' | 'blue' | 'indigo' | 'orange';
}

export type ThemeColors = {
  bg: string;
  text: string;
  border: string;
  iconBg: string;
  shadow: string;
  gradient: string;
};