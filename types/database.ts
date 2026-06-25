export interface ConsultationRequest {
  id: string;
  created_at: string;
  full_name: string;
  company: string | null;
  email: string;
  phone: string | null;
  service_interest: string;
  project_description: string;
  budget: string | null;
  timeline: string | null;
  status: string;
}

export interface Candidate {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  linkedin: string | null;
  resume_url: string;
  skills: string | null;
  experience: string | null;
  availability: string | null;
  location: string | null;
  status: 'Available' | 'Reviewing' | 'Interviewing' | 'Placed' | 'Inactive';
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  featured_image: string | null;
  author: any;
  reading_time: string | null;
  published_date: string;
  language: 'en' | 'es';
  is_published: boolean;
  created_at: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  industry: string;
  client_type: string | null;
  challenge: string;
  solution: string;
  results: string;
  technologies: string | null;
  featured_image: string | null;
  language: 'en' | 'es';
  published_date: string;
  is_published: boolean;
  created_at: string;
}
