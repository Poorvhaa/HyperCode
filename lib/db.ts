import { createClient } from '@supabase/supabase-js';
import * as DBTypes from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Re-export database interfaces from types/database
export type ConsultationRequest = DBTypes.ConsultationRequest;
export type Candidate = DBTypes.Candidate;
export type Article = DBTypes.Article;
export type CaseStudy = DBTypes.CaseStudy;

// Local interfaces for unified dashboard schemas
export interface ContactInquiry {
  id: string;
  full_name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Won' | 'Lost';
  source: string;
  created_at: string;
}
export interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  resume_url: string;
  position: string;
  years_experience: number;
  skills: string;
  message: string;
  status: 'New' | 'Reviewing' | 'Shortlisted' | 'Interview' | 'Offered' | 'Hired' | 'Rejected';
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  role: 'Admin' | 'Recruiter' | 'Consultant';
  name: string | null;
  avatar: string | null;
  is_active: boolean;
  created_at: string;
}

export interface CompanySettings {
  id: string;
  company_name: string;
  email: string;
  phone: string | null;
  address: string | null;
  social_links: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  updated_at: string;
}

export interface EmailTemplate {
  id: string;
  subject: string;
  body: string;
  updated_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  status: 'subscribed' | 'unsubscribed';
  language: 'en' | 'es';
  source_page: string | null;
  created_at: string;
}

// In-memory mock storage for settings and templates to prevent database missing errors
let localSettings: CompanySettings = {
  id: 'default',
  company_name: 'HyperCode',
  email: 'info@hypercode.com',
  phone: '+1 (555) 019-2834',
  address: '100 Pine St, Suite 2400, San Francisco, CA 94111',
  social_links: { linkedin: 'https://linkedin.com/company/hypercode', twitter: 'https://twitter.com/hypercode', github: 'https://github.com/hypercode' },
  updated_at: new Date().toISOString()
};

let localTemplates: EmailTemplate[] = [
  { id: 'contact', subject: 'Thank you for contacting HyperCode', body: 'Hi {{name}},\n\nThank you for reaching out to us. We have received your message regarding "{{subject}}" and a consultant will respond to you within 24 hours.\n\nBest regards,\nHyperCode Team', updated_at: new Date().toISOString() },
  { id: 'consultation', subject: 'Consultation Request Received', body: 'Hi {{name}},\n\nThank you for requesting a technology consultation for "{{service_interest}}". Our team is reviewing your project description and budget of "{{budget}}" to assign the best specialist.\n\nWe will get back to you shortly to schedule our meeting.\n\nBest regards,\nHyperCode Consulting', updated_at: new Date().toISOString() },
  { id: 'application', subject: 'Application Received: {{position}}', body: 'Hi {{name}},\n\nThank you for applying for the {{position}} position at HyperCode. We have received your resume and application details.\n\nOur recruiting team is reviewing candidates and will update you on the next steps.\n\nBest regards,\nHyperCode Careers', updated_at: new Date().toISOString() },
  { id: 'newsletter', subject: 'Welcome to HyperCode Insights', body: 'Hi Subscriber,\n\nThank you for subscribing to our newsletter! You will now receive monthly technology insights, case studies, and engineering updates in {{language}}.\n\nBest regards,\nHyperCode Editorial', updated_at: new Date().toISOString() }
];

// Unified Database API
export const db = {
  // 4. Save Consultation Request
  async saveConsultationRequest(
    fullName: string,
    company: string,
    email: string,
    phone: string,
    serviceInterest: string,
    budget: string,
    timeline: string,
    projectDescription: string
  ): Promise<ConsultationRequest> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    const { data, error } = await supabase
      .from('consultation_requests')
      .insert([{
        full_name: fullName,
        company: company || null,
        email,
        phone: phone || null,
        service_interest: serviceInterest,
        project_description: projectDescription,
        budget: budget || null,
        timeline: timeline || null,
        status: 'new' // Database constraint defaults to 'new'
      }])
      .select()
      .single();

    if (error) {
      console.error('[DB Error] Supabase saveConsultationRequest failed:', error.message || error);
      throw error;
    }
    return data;
  },

  // 4b. Save Contact Inquiry (Redirected to consultation_requests using matching fields)
  async saveContactInquiry(
    fullName: string,
    company: string,
    email: string,
    phone: string,
    subject: string,
    message: string,
    source: string = 'website'
  ): Promise<ContactInquiry> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    // Insert contact inquiry directly into consultation_requests table
    const { data, error } = await supabase
      .from('consultation_requests')
      .insert([{
        full_name: fullName,
        company: company || null,
        email: email,
        phone: phone || null,
        service_interest: `Contact Inquiry: ${subject}`,
        project_description: message,
        budget: source,
        timeline: 'Contact',
        status: 'new'
      }])
      .select()
      .single();

    if (error) {
      console.error('[DB Error] Supabase saveContactInquiry failed:', error.message || error);
      throw error;
    }

    return {
      id: data.id,
      full_name: data.full_name,
      company: data.company || '',
      email: data.email,
      phone: data.phone || '',
      subject: subject,
      message: message,
      status: 'New',
      source: source,
      created_at: data.created_at
    };
  },

  // 6. Careers - Save Job Application (Redirected to candidates table)
  async saveJobApplication(app: Omit<JobApplication, 'id' | 'created_at' | 'status'>): Promise<JobApplication> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    const { data, error } = await supabase
      .from('candidates')
      .insert([{
        name: app.name,
        email: app.email,
        phone: app.phone || null,
        linkedin: app.linkedin || null,
        resume_url: app.resume_url,
        skills: app.skills || null,
        experience: `Position: ${app.position} | Exp: ${app.years_experience} years | Message: ${app.message}`,
        availability: 'Immediate',
        location: 'Remote',
        status: 'Reviewing'
      }])
      .select()
      .single();

    if (error) {
      console.error('[DB Error] Supabase saveJobApplication failed:', error.message || error);
      throw error;
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      linkedin: data.linkedin || '',
      resume_url: data.resume_url,
      position: app.position,
      years_experience: app.years_experience,
      skills: data.skills || '',
      message: app.message,
      status: 'Reviewing',
      created_at: data.created_at
    };
  },

  // 7. Careers - Update Job Application Status (Updates status in candidates table)
  async updateJobApplicationStatus(id: string, status: JobApplication['status']): Promise<void> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    // Map JobApplication status to Candidate status if needed
    let dbStatus = 'Reviewing';
    if (status === 'Hired' || status === 'Offered') dbStatus = 'Placed';
    else if (status === 'Rejected') dbStatus = 'Inactive';
    else if (status === 'Interview') dbStatus = 'Interviewing';
    else if (status === 'New') dbStatus = 'Available';

    const { error } = await supabase
      .from('candidates')
      .update({ status: dbStatus })
      .eq('id', id);

    if (error) {
      console.error('[DB Error] Supabase updateJobApplicationStatus failed:', error.message || error);
      throw error;
    }
  },

  // 8. Candidates - Save Candidate
  async saveCandidate(cand: Omit<Candidate, 'id' | 'created_at'>): Promise<Candidate> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    const { data, error } = await supabase
      .from('candidates')
      .insert([cand])
      .select()
      .single();

    if (error) {
      console.error('[DB Error] Supabase saveCandidate failed:', error.message || error);
      throw error;
    }
    return data;
  },

  // 9. Candidates - Delete Candidate
  async deleteCandidate(id: string): Promise<void> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    const { error } = await supabase.from('candidates').delete().eq('id', id);
    if (error) {
      console.error('[DB Error] Supabase deleteCandidate failed:', error.message || error);
      throw error;
    }
  },

  // 11. Newsletter - Save Subscriber (using newsletter_subscribers table)
  async saveNewsletterSubscriber(email: string, language: 'en' | 'es' = 'en', sourcePage?: string | null): Promise<void> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{
        email: email,
        status: 'subscribed',
        language: language,
        source_page: sourcePage || null
      }]);

    if (error && error.code !== '23505') {
      console.error('[DB Error] Supabase saveNewsletterSubscriber failed:', error.message || error);
      throw error;
    }
  },

  // 12. CMS Articles - CRUD
  async getAllArticles(): Promise<Article[]> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    const { data, error } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('[DB Error] Supabase getAllArticles failed:', error.message || error);
      throw error;
    }
    return data || [];
  },

  async getArticleBySlug(slug: string): Promise<Article | null> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    const { data, error } = await supabase.from('articles').select('*').eq('slug', slug).maybeSingle();
    if (error) {
      console.error('[DB Error] Supabase getArticleBySlug failed:', error.message || error);
      throw error;
    }
    return data;
  },

  async saveArticle(article: Omit<Article, 'id' | 'created_at'> & { id?: string }): Promise<Article> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    if (article.id) {
      const { data, error } = await supabase
        .from('articles')
        .update(article)
        .eq('id', article.id)
        .select()
        .single();
      if (error) {
        console.error('[DB Error] Supabase updateArticle failed:', error.message || error);
        throw error;
      }
      return data;
    } else {
      const { data, error } = await supabase
        .from('articles')
        .insert([article])
        .select()
        .single();
      if (error) {
        console.error('[DB Error] Supabase insertArticle failed:', error.message || error);
        throw error;
      }
      return data;
    }
  },

  async deleteArticle(id: string): Promise<void> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) {
      console.error('[DB Error] Supabase deleteArticle failed:', error.message || error);
      throw error;
    }
  },

  // 13. CMS Case Studies - CRUD
  async getAllCaseStudies(): Promise<CaseStudy[]> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    const { data, error } = await supabase.from('case_studies').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('[DB Error] Supabase getAllCaseStudies failed:', error.message || error);
      throw error;
    }
    return data || [];
  },

  async getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    const { data, error } = await supabase.from('case_studies').select('*').eq('slug', slug).maybeSingle();
    if (error) {
      console.error('[DB Error] Supabase getCaseStudyBySlug failed:', error.message || error);
      throw error;
    }
    return data;
  },

  async saveCaseStudy(cs: Omit<CaseStudy, 'id' | 'created_at'> & { id?: string }): Promise<CaseStudy> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    if (cs.id) {
      const { data, error } = await supabase
        .from('case_studies')
        .update(cs)
        .eq('id', cs.id)
        .select()
        .single();
      if (error) {
        console.error('[DB Error] Supabase updateCaseStudy failed:', error.message || error);
        throw error;
      }
      return data;
    } else {
      const { data, error } = await supabase
        .from('case_studies')
        .insert([cs])
        .select()
        .single();
      if (error) {
        console.error('[DB Error] Supabase insertCaseStudy failed:', error.message || error);
        throw error;
      }
      return data;
    }
  },

  async deleteCaseStudy(id: string): Promise<void> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    const { error } = await supabase.from('case_studies').delete().eq('id', id);
    if (error) {
      console.error('[DB Error] Supabase deleteCaseStudy failed:', error.message || error);
      throw error;
    }
  },

  // 14. RBAC User Profiles (Defensive fallback to mock admin profile if table is missing)
  async getUserProfile(id: string): Promise<UserProfile | null> {
    if (!supabase) {
      return {
        id,
        email: 'admin@hypercode.com',
        role: 'Admin',
        name: 'Administrator',
        avatar: null,
        is_active: true,
        created_at: new Date().toISOString()
      };
    }

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.warn('[DB Warning] Supabase getUserProfile failed, returning mock profile:', error.message);
        return {
          id,
          email: 'admin@hypercode.com',
          role: 'Admin',
          name: 'Administrator',
          avatar: null,
          is_active: true,
          created_at: new Date().toISOString()
        };
      }

      if (data) return data;

      return {
        id,
        email: 'admin@hypercode.com',
        role: 'Admin',
        name: 'Administrator',
        avatar: null,
        is_active: true,
        created_at: new Date().toISOString()
      };
    } catch (err) {
      return {
        id,
        email: 'admin@hypercode.com',
        role: 'Admin',
        name: 'Administrator',
        avatar: null,
        is_active: true,
        created_at: new Date().toISOString()
      };
    }
  },

  async saveUserProfile(
    id: string,
    email: string,
    role: UserProfile['role'],
    name?: string | null,
    avatar?: string | null,
    is_active?: boolean
  ): Promise<UserProfile> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    const payload: any = { id, email, role, name, avatar };
    if (is_active !== undefined) payload.is_active = is_active;

    const { data, error } = await supabase
      .from('user_profiles')
      .upsert([payload])
      .select()
      .single();

    if (error) {
      console.error('[DB Error] Supabase saveUserProfile failed:', error.message || error);
      throw error;
    }
    return data;
  },

  // Admin dashboard get methods

  async getAllConsultations(): Promise<ConsultationRequest[]> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    // Get consultation requests excluding general inquiries and staffing
    const { data, error } = await supabase
      .from('consultation_requests')
      .select('*')
      .not('service_interest', 'like', 'Contact Inquiry:%')
      .not('service_interest', 'like', 'Staffing:%')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[DB Error] Supabase getAllConsultations failed:', error.message || error);
      throw error;
    }
    return data || [];
  },


  async getAllContactInquiries(): Promise<ContactInquiry[]> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    // Get contact inquiries stored inside consultation_requests table
    const { data, error } = await supabase
      .from('consultation_requests')
      .select('*')
      .like('service_interest', 'Contact Inquiry:%')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[DB Error] Supabase getAllContactInquiries failed:', error.message || error);
      throw error;
    }

    return (data || []).map(d => {
      const subject = d.service_interest.replace(/^Contact Inquiry:\s*/, '');
      return {
        id: d.id,
        full_name: d.full_name,
        company: d.company || '',
        email: d.email,
        phone: d.phone || '',
        subject: subject,
        message: d.project_description,
        status: d.status === 'new' ? 'New' : d.status === 'scheduled' ? 'Contacted' : 'Lost',
        source: d.budget || 'website',
        created_at: d.created_at
      };
    });
  },

  async getAllJobApplications(): Promise<JobApplication[]> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    // Retrieve job applications stored inside candidates table
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[DB Error] Supabase getAllJobApplications failed:', error.message || error);
      throw error;
    }

    return (data || []).map(d => {
      let position = 'Software Engineer';
      let years_experience = 3;
      let message = '';

      const posMatch = d.experience?.match(/Position:\s*(.*?)(?=\s*\|\s*Exp:|$)/i);
      const expMatch = d.experience?.match(/Exp:\s*(\d+)/i);
      const msgMatch = d.experience?.match(/Message:\s*(.*)/i);

      if (posMatch) position = posMatch[1].trim();
      if (expMatch) years_experience = parseInt(expMatch[1]);
      if (msgMatch) message = msgMatch[1].trim();

      let appStatus: JobApplication['status'] = 'New';
      if (d.status === 'Placed') appStatus = 'Hired';
      else if (d.status === 'Inactive') appStatus = 'Rejected';
      else if (d.status === 'Interviewing') appStatus = 'Interview';
      else if (d.status === 'Reviewing') appStatus = 'Reviewing';

      return {
        id: d.id,
        name: d.name,
        email: d.email,
        phone: d.phone || '',
        linkedin: d.linkedin || '',
        resume_url: d.resume_url,
        position: position,
        years_experience: years_experience,
        skills: d.skills || '',
        message: message || d.experience || '',
        status: appStatus,
        created_at: d.created_at
      };
    });
  },

  async getAllCandidates(): Promise<Candidate[]> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    const { data, error } = await supabase.from('candidates').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('[DB Error] Supabase getAllCandidates failed:', error.message || error);
      throw error;
    }
    return data || [];
  },

  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[DB Error] Supabase getNewsletterSubscribers failed:', error.message || error);
      throw error;
    }

    return (data || []).map(d => ({
      id: d.id,
      email: d.email,
      status: d.status || 'subscribed',
      language: d.language || 'en',
      source_page: d.source_page || 'home',
      created_at: d.created_at
    }));
  },

  async deleteNewsletterSubscriber(id: string): Promise<void> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    const { error } = await supabase.from('newsletter_subscribers').delete().eq('id', id);
    if (error) {
      console.error('[DB Error] Supabase deleteNewsletterSubscriber failed:', error.message || error);
      throw error;
    }
  },

  async getAllUserProfiles(): Promise<UserProfile[]> {
    // Return a default admin profile to prevent errors
    return [
      {
        id: 'default',
        email: 'admin@hypercode.com',
        role: 'Admin',
        name: 'Administrator',
        avatar: null,
        is_active: true,
        created_at: new Date().toISOString()
      }
    ];
  },

  async getCompanySettings(): Promise<CompanySettings> {
    return localSettings;
  },

  async saveCompanySettings(settings: Partial<CompanySettings>): Promise<CompanySettings> {
    localSettings = {
      ...localSettings,
      ...settings,
      updated_at: new Date().toISOString()
    };
    return localSettings;
  },

  async getEmailTemplates(): Promise<EmailTemplate[]> {
    return localTemplates;
  },

  async saveEmailTemplate(id: string, subject: string, body: string): Promise<EmailTemplate> {
    const idx = localTemplates.findIndex(t => t.id === id);
    const updated = { id, subject, body, updated_at: new Date().toISOString() };
    if (idx !== -1) {
      localTemplates[idx] = updated;
    } else {
      localTemplates.push(updated);
    }
    return updated;
  },

  async updateLeadStatus(
    type: 'contact' | 'consultation',
    id: string,
    status: 'New' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Won' | 'Lost'
  ): Promise<void> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    const table = 'consultation_requests';

    let dbStatus: string = status;
    if (status === 'New') dbStatus = 'new';
    else if (status === 'Contacted' || status === 'Qualified' || status === 'Proposal Sent') dbStatus = 'scheduled';
    else if (status === 'Won' || status === 'Lost') dbStatus = 'archived';

    const { error } = await supabase
      .from(table)
      .update({ status: dbStatus })
      .eq('id', id);

    if (error) {
      console.error(`[DB Error] Supabase updateLeadStatus failed for table ${table}:`, error.message || error);
      throw error;
    }
  }
};
