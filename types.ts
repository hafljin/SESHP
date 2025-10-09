
export interface Job {
  id: number;
  title: string;
  type: 'Leader' | 'Member';
  salary: string;
  skills: string[];
  conditions: string;
  description: string;
  featured: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}
