import { createClient } from '@supabase/supabase-js';
import * as DBTypes from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

const activeKey = (typeof window === 'undefined' && supabaseServiceKey) ? supabaseServiceKey : supabaseAnonKey;

export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, activeKey) : null;

export function sanitizePayload(val: any, seen = new WeakSet()): any {
  if (val === null || val === undefined) return null;
  if (typeof val === 'function') return undefined;
  if (typeof val === 'symbol') return undefined;
  if (typeof val === 'bigint') return val.toString();
  if (val instanceof Date) return val.toISOString();
  if (typeof val === 'object') {
    if (seen.has(val)) return '[Circular]';
    seen.add(val);
    if (Array.isArray(val)) {
      return val
        .map(item => sanitizePayload(item, seen))
        .filter(item => item !== undefined);
    }
    const cleanObj: any = {};
    for (const key in val) {
      if (Object.prototype.hasOwnProperty.call(val, key)) {
        const cleanVal = sanitizePayload(val[key], seen);
        if (cleanVal !== undefined) {
          cleanObj[key] = cleanVal;
        }
      }
    }
    return cleanObj;
  }
  return val;
}

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
  services?: string[];
  industry?: string;
  company_size?: string;
  budget?: string;
  timeline?: string;
  country?: string;
  preferred_contact_method?: string;
  project_type?: string;
  required_technologies?: string[];
}
export interface ChatConversation {
  id: string;
  session_id: string;
  language: 'en' | 'es';
  visitor_name: string | null;
  visitor_email: string | null;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender: 'user' | 'assistant';
  message: string;
  language: 'en' | 'es';
  created_at: string;
}

export interface ChatLead {
  id: string;
  conversation_id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  service_interest: string;
  budget_range: string;
  timeline: string;
  message: string | null;
  lead_score: number;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Won' | 'Lost';
  language: 'en' | 'es';
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
  role: 'Admin' | 'Recruiter' | 'Consultant' | 'Manager';
  is_active?: boolean;
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
  phone: '+1 (510) 203-9270',
  address: '2095 Hammond Dr Suite C ,Schaumburg, IL 60173,United States',
  social_links: { linkedin: 'https://linkedin.com/company/hypercode', twitter: 'https://twitter.com/hypercode', github: 'https://github.com/hypercode' },
  updated_at: new Date().toISOString()
};

let localTemplates: EmailTemplate[] = [
  { id: 'contact', subject: 'Thank you for contacting HyperCode', body: 'Hi {{name}},\n\nThank you for reaching out to us. We have received your message regarding "{{subject}}" and a consultant will respond to you within 24 hours.\n\nBest regards,\nHyperCode Team', updated_at: new Date().toISOString() },
  { id: 'consultation', subject: 'Consultation Request Received', body: 'Hi {{name}},\n\nThank you for requesting a technology consultation for "{{service_interest}}". Our team is reviewing your project description and budget of "{{budget}}" to assign the best specialist.\n\nWe will get back to you shortly to schedule our meeting.\n\nBest regards,\nHyperCode Consulting', updated_at: new Date().toISOString() },
  { id: 'application', subject: 'Application Received: {{position}}', body: 'Hi {{name}},\n\nThank you for applying for the {{position}} position at HyperCode. We have received your resume and application details.\n\nOur recruiting team is reviewing candidates and will update you on the next steps.\n\nBest regards,\nHyperCode Careers', updated_at: new Date().toISOString() },
  { id: 'newsletter', subject: 'Welcome to HyperCode Insights', body: 'Hi Subscriber,\n\nThank you for subscribing to our newsletter! You will now receive monthly technology insights, case studies, and engineering updates in {{language}}.\n\nBest regards,\nHyperCode Editorial', updated_at: new Date().toISOString() }
];

let userProfilesColumnsCache: string[] | null = null;

export async function getUserProfilesColumns(): Promise<string[]> {
  if (userProfilesColumnsCache) return userProfilesColumnsCache;
  
  const defaultCols = ['id', 'email', 'role', 'created_at'];
  if (!supabaseUrl || !supabaseAnonKey) {
    return defaultCols;
  }
  
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'GET',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`
      }
    });
    if (res.ok) {
      const schema = await res.json();
      const properties = schema?.definitions?.user_profiles?.properties;
      if (properties) {
        userProfilesColumnsCache = Object.keys(properties);
        console.log('[DB] Detected user_profiles columns:', userProfilesColumnsCache);
        return userProfilesColumnsCache;
      }
    }
  } catch (err) {
    console.error('[DB Error] Failed to fetch table columns dynamically:', err);
  }
  
  return defaultCols;
}

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
    projectDescription: string,
    additionalFields?: {
      business_goal?: string;
      current_challenges?: string;
      expected_outcome?: string;
      preferred_services?: string[];
      industry?: string;
      company_size?: string;
      current_tech_stack?: string;
      preferred_meeting_type?: string;
    }
  ): Promise<ConsultationRequest> {
    const payload = {
      full_name: fullName,
      company: company || null,
      email,
      phone: phone || null,
      service_interest: serviceInterest,
      project_description: projectDescription,
      budget: budget || null,
      timeline: timeline || null,
      status: 'New', // Capitalized to pass database CHECK constraint
      business_goal: additionalFields?.business_goal || null,
      current_challenges: additionalFields?.current_challenges || null,
      expected_outcome: additionalFields?.expected_outcome || null,
      preferred_services: additionalFields?.preferred_services || [],
      industry: additionalFields?.industry || null,
      company_size: additionalFields?.company_size || null,
      current_tech_stack: additionalFields?.current_tech_stack || null,
      preferred_meeting_type: additionalFields?.preferred_meeting_type || null
    };

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('consultation_requests')
          .insert([payload])
          .select()
          .single();

        if (!error && data) {
          return data;
        }

        console.error({
          step: 'supabase_save_consultation',
          payload,
          error: error || 'No data returned',
          message: error?.message || 'Supabase save returned no data',
          stack: new Error().stack
        });
      } catch (supabaseErr: any) {
        console.error({
          step: 'supabase_save_consultation_exception',
          payload,
          error: supabaseErr,
          message: supabaseErr?.message || 'Supabase insertion exception',
          stack: supabaseErr?.stack || new Error().stack
        });
      }
    }

    // LocalStorage Fallback (Circular-safe, JSON-safe, Date-safe, undefined-safe)
    try {
      const sanitizedPayload = sanitizePayload({
        id: typeof window !== 'undefined' && window.crypto ? window.crypto.randomUUID() : 'local_' + Math.random().toString(36).substring(2),
        ...payload,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

      if (typeof window !== 'undefined') {
        const key = 'hypercode_db_consultation_requests';
        let currentRequests: any[] = [];
        try {
          const stored = localStorage.getItem(key);
          if (stored) {
            currentRequests = JSON.parse(stored);
            if (!Array.isArray(currentRequests)) {
              currentRequests = [];
            }
          }
        } catch (readErr: any) {
          console.error({
            step: 'localstorage_read_consultation_requests',
            error: readErr,
            message: readErr?.message || 'Failed to read localStorage requests',
            stack: readErr?.stack
          });
        }

        currentRequests.unshift(sanitizedPayload);

        try {
          localStorage.setItem(key, JSON.stringify(currentRequests));
        } catch (writeErr: any) {
          console.error({
            step: 'localstorage_write_consultation_requests',
            payload: sanitizedPayload,
            error: writeErr,
            message: writeErr?.message || 'LocalStorage write quota exceeded or unavailable',
            stack: writeErr?.stack
          });
        }
      }
      return sanitizedPayload as any;
    } catch (fallbackErr: any) {
      console.error({
        step: 'localstorage_fallback_critical_error',
        payload,
        error: fallbackErr,
        message: fallbackErr?.message || 'Failed critical LocalStorage fallback execution',
        stack: fallbackErr?.stack
      });
      return {
        id: 'fallback_id',
        full_name: fullName,
        email,
        service_interest: serviceInterest,
        project_description: projectDescription,
        status: 'New',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      } as any;
    }
  },

  // 4b. Save Contact Inquiry (To contact_inquiries table)
  async saveContactInquiry(
    fullName: string,
    company: string,
    email: string,
    phone: string,
    subject: string,
    message: string,
    source: string = 'website',
    additionalFields?: {
      services?: string[];
      industry?: string;
      company_size?: string;
      budget?: string;
      timeline?: string;
      country?: string;
      preferred_contact_method?: string;
      project_type?: string;
      required_technologies?: string[];
    }
  ): Promise<ContactInquiry> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    const { data, error } = await supabase
      .from('contact_inquiries')
      .insert([{
        full_name: fullName,
        company: company || null,
        email: email,
        phone: phone || null,
        subject: subject,
        message: message,
        status: 'New',
        source: source,
        services: additionalFields?.services || [],
        industry: additionalFields?.industry || null,
        company_size: additionalFields?.company_size || null,
        budget: additionalFields?.budget || null,
        timeline: additionalFields?.timeline || null,
        country: additionalFields?.country || null,
        preferred_contact_method: additionalFields?.preferred_contact_method || null,
        project_type: additionalFields?.project_type || null,
        required_technologies: additionalFields?.required_technologies || []
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
      subject: data.subject,
      message: data.message,
      status: data.status as any,
      source: data.source,
      created_at: data.created_at,
      services: data.services,
      industry: data.industry,
      company_size: data.company_size,
      budget: data.budget,
      timeline: data.timeline,
      country: data.country,
      preferred_contact_method: data.preferred_contact_method,
      project_type: data.project_type,
      required_technologies: data.required_technologies
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
      return [];
    }

    try {
      const { data, error } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
      if (error) {
        console.warn('[DB Warning] Supabase getAllArticles failed:', error.message || error);
        return [];
      }
      return data || [];
    } catch (err: any) {
      console.warn('[DB Warning] Supabase getAllArticles exception caught:', err?.message || err);
      return [];
    }
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
      return [];
    }

    try {
      const { data, error } = await supabase.from('case_studies').select('*').order('created_at', { ascending: false });
      if (error) {
        console.warn('[DB Warning] Supabase getAllCaseStudies failed:', error.message || error);
        return [];
      }
      return data || [];
    } catch (err: any) {
      console.warn('[DB Warning] Supabase getAllCaseStudies exception caught:', err?.message || err);
      return [];
    }
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
        console.warn('[DB Warning] Supabase getUserProfile failed:', error.message);
        return null;
      }

      return data;
    } catch (err) {
      console.error('[DB Error] getUserProfile exception:', err);
      return null;
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

    const availableCols = await getUserProfilesColumns();
    const payload: any = { id, email, role };
    if (availableCols.includes('name') && name !== undefined) payload.name = name;
    if (availableCols.includes('avatar') && avatar !== undefined) payload.avatar = avatar;
    if (availableCols.includes('is_active') && is_active !== undefined) payload.is_active = is_active;
    if (availableCols.includes('created_at')) payload.created_at = new Date().toISOString();

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
    let remoteData: ConsultationRequest[] = [];
    let fetchError: any = null;

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('consultation_requests')
          .select('*')
          .not('service_interest', 'like', 'Contact Inquiry:%')
          .not('service_interest', 'like', 'Staffing:%')
          .order('created_at', { ascending: false });

        if (!error && data) {
          remoteData = data;
        } else if (error) {
          fetchError = error;
        }
      } catch (err: any) {
        fetchError = err;
      }
    }

    if (fetchError) {
      console.error({
        step: 'supabase_getAllConsultations_failed',
        error: fetchError,
        message: fetchError?.message || 'Failed to fetch remote consultations',
        stack: fetchError?.stack
      });
    }

    // Load local storage requests
    let localRequests: any[] = [];
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('hypercode_db_consultation_requests');
        if (stored) {
          localRequests = JSON.parse(stored);
          if (!Array.isArray(localRequests)) {
            localRequests = [];
          }
        }
      } catch (err: any) {
        console.error({
          step: 'localstorage_read_all_consultations_failed',
          error: err,
          message: err?.message || 'Failed to read local consultations',
          stack: err?.stack
        });
      }
    }

    // Merge remote and local requests
    const seenIds = new Set();
    const merged: ConsultationRequest[] = [];

    localRequests.forEach(item => {
      if (item && item.id && !seenIds.has(item.id)) {
        seenIds.add(item.id);
        merged.push(item);
      }
    });

    remoteData.forEach(item => {
      if (item && item.id && !seenIds.has(item.id)) {
        seenIds.add(item.id);
        merged.push(item);
      }
    });

    // Sort by created_at descending
    merged.sort((a, b) => {
      const dateA = new Date(a.created_at || 0).getTime();
      const dateB = new Date(b.created_at || 0).getTime();
      return dateB - dateA;
    });

    return merged;
  },


  async getAllContactInquiries(): Promise<ContactInquiry[]> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    const { data, error } = await supabase
      .from('contact_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[DB Error] Supabase getAllContactInquiries failed:', error.message || error);
      throw error;
    }

    return (data || []).map(d => ({
      id: d.id,
      full_name: d.full_name,
      company: d.company || '',
      email: d.email,
      phone: d.phone || '',
      subject: d.subject,
      message: d.message,
      status: d.status as any,
      source: d.source || 'website',
      created_at: d.created_at,
      services: d.services || [],
      industry: d.industry || '',
      company_size: d.company_size || '',
      budget: d.budget || '',
      timeline: d.timeline || '',
      country: d.country || '',
      preferred_contact_method: d.preferred_contact_method || '',
      project_type: d.project_type || '',
      required_technologies: d.required_technologies || []
    }));
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
    if (!supabase) {
      return [
        {
          id: 'default',
          email: 'admin@hypercode.com',
          role: 'Admin',
          created_at: new Date().toISOString()
        }
      ];
    }
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[DB Error] getAllUserProfiles failed:', error.message);
      return [];
    }

    return data || [];
  },

  async getCompanySettings(): Promise<CompanySettings> {
    if (supabase) {
      const { data, error } = await supabase
        .from('company_settings')
        .select('*')
        .eq('id', 'default')
        .single();
      if (!error && data) {
        return data;
      }
      console.warn('[DB Warning] getCompanySettings failed, using memory fallback:', error?.message);
    }
    return localSettings;
  },

  async saveCompanySettings(settings: Partial<CompanySettings>): Promise<CompanySettings> {
    if (supabase) {
      const { data, error } = await supabase
        .from('company_settings')
        .upsert({
          id: 'default',
          ...settings,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
      if (!error && data) {
        return data;
      }
      console.error('[DB Error] saveCompanySettings failed, using memory fallback:', error?.message);
    }
    localSettings = {
      ...localSettings,
      ...settings,
      updated_at: new Date().toISOString()
    };
    return localSettings;
  },

  async getEmailTemplates(): Promise<EmailTemplate[]> {
    if (supabase) {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*');
      if (!error && data && data.length > 0) {
        return data;
      }
      console.warn('[DB Warning] getEmailTemplates failed, using memory fallback:', error?.message);
    }
    return localTemplates;
  },

  async saveEmailTemplate(id: string, subject: string, body: string): Promise<EmailTemplate> {
    const updated = { id, subject, body, updated_at: new Date().toISOString() };
    if (supabase) {
      const { data, error } = await supabase
        .from('email_templates')
        .upsert(updated)
        .select()
        .single();
      if (!error && data) {
        return data;
      }
      console.error('[DB Error] saveEmailTemplate failed, using memory fallback:', error?.message);
    }
    const idx = localTemplates.findIndex(t => t.id === id);
    if (idx !== -1) {
      localTemplates[idx] = updated;
    } else {
      localTemplates.push(updated);
    }
    return updated;
  },

  async updateLeadStatus(
    type: 'contact' | 'consultation' | 'chat_lead',
    id: string,
    status: 'New' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Won' | 'Lost'
  ): Promise<void> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    if (type === 'chat_lead') {
      const { error } = await supabase
        .from('chat_leads')
        .update({ status })
        .eq('id', id);
      if (error) {
        console.error('[DB Error] Supabase updateLeadStatus failed for chat_leads:', error.message || error);
        throw error;
      }
      return;
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
  },

  async createChatConversation(
    sessionId: string,
    language: 'en' | 'es',
    visitorName?: string,
    visitorEmail?: string
  ): Promise<ChatConversation> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    const { data, error } = await supabase
      .from('chat_conversations')
      .upsert(
        [
          {
            session_id: sessionId,
            language,
            visitor_name: visitorName || null,
            visitor_email: visitorEmail || null,
            updated_at: new Date().toISOString()
          }
        ],
        { onConflict: 'session_id' }
      )
      .select()
      .single();

    if (error) {
      console.error('[DB Error] createChatConversation failed:', error.message || error);
      throw error;
    }
    return data;
  },

  async updateChatConversationLanguage(
  sessionId: string,
  language: 'en' | 'es'
): Promise<void> {
  const { error } = await supabase
    .from('chat_conversations')
    .update({
      language,
      updated_at: new Date().toISOString(),
    })
    .eq('session_id', sessionId);

  if (error) {
    console.error(
      '[DB Error] updateChatConversationLanguage failed:',
      error.message || error
    );
    throw error;
  }
},

  async addChatMessage(
    conversationId: string,
    sender: 'user' | 'assistant',
    message: string,
    language: 'en' | 'es'
  ): Promise<ChatMessage> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    const { data, error } = await supabase
      .from('chat_messages')
      .insert([
        {
          conversation_id: conversationId,
          sender,
          message,
          language
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('[DB Error] addChatMessage failed:', error.message || error);
      throw error;
    }

    await supabase
      .from('chat_conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversationId);

    return data;
  },

  async saveChatLead(lead: Omit<ChatLead, 'id' | 'created_at' | 'status'> & { id?: string }): Promise<ChatLead> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }

    const { data, error } = await supabase
      .from('chat_leads')
      .insert([lead])
      .select()
      .single();

    if (error) {
      console.error('[DB Error] saveChatLead failed:', error.message || error);
      throw error;
    }

    await supabase
      .from('chat_conversations')
      .update({
        visitor_name: lead.name,
        visitor_email: lead.email,
        updated_at: new Date().toISOString()
      })
      .eq('id', lead.conversation_id);

    return data;
  },

  async saveChatConsultation(
    name: string,
    email: string,
    phone: string,
    company: string,
    service: string,
    message: string,
    preferredDate: string,
    language: 'en' | 'es'
  ): Promise<any> {
    const payload = {
      full_name: name,
      company: company || null,
      email,
      phone: phone || null,
      service_interest: service,
      project_description: message,
      budget: 'Chat Consultant',
      timeline: 'Chat',
      status: 'New', // Capitalized to pass database CHECK constraint
      name,
      service,
      message,
      preferred_date: preferredDate || null,
      language
    };

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('consultation_requests')
          .insert([payload])
          .select()
          .single();

        if (!error && data) {
          return data;
        }

        console.error({
          step: 'supabase_save_chat_consultation',
          payload,
          error: error || 'No data returned',
          message: error?.message || 'Supabase save returned no data',
          stack: new Error().stack
        });
      } catch (supabaseErr: any) {
        console.error({
          step: 'supabase_save_chat_consultation_exception',
          payload,
          error: supabaseErr,
          message: supabaseErr?.message || 'Supabase insertion exception',
          stack: supabaseErr?.stack || new Error().stack
        });
      }
    }

    // LocalStorage Fallback (Circular-safe, JSON-safe, Date-safe, undefined-safe)
    try {
      const sanitizedPayload = sanitizePayload({
        id: typeof window !== 'undefined' && window.crypto ? window.crypto.randomUUID() : 'local_' + Math.random().toString(36).substring(2),
        ...payload,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

      if (typeof window !== 'undefined') {
        const key = 'hypercode_db_consultation_requests';
        let currentRequests: any[] = [];
        try {
          const stored = localStorage.getItem(key);
          if (stored) {
            currentRequests = JSON.parse(stored);
            if (!Array.isArray(currentRequests)) {
              currentRequests = [];
            }
          }
        } catch (readErr: any) {
          console.error({
            step: 'localstorage_read_chat_consultations',
            error: readErr,
            message: readErr?.message || 'Failed to read localStorage requests',
            stack: readErr?.stack
          });
        }

        currentRequests.unshift(sanitizedPayload);

        try {
          localStorage.setItem(key, JSON.stringify(currentRequests));
        } catch (writeErr: any) {
          console.error({
            step: 'localstorage_write_chat_consultations',
            payload: sanitizedPayload,
            error: writeErr,
            message: writeErr?.message || 'LocalStorage write quota exceeded or unavailable',
            stack: writeErr?.stack
          });
        }
      }
      return sanitizedPayload;
    } catch (fallbackErr: any) {
      console.error({
        step: 'localstorage_chat_fallback_critical_error',
        payload,
        error: fallbackErr,
        message: fallbackErr?.message || 'Failed critical LocalStorage fallback execution',
        stack: fallbackErr?.stack
      });
      return {
        id: 'fallback_id',
        full_name: name,
        email,
        service_interest: service,
        project_description: message,
        status: 'New',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }
  },

  async getAllChatConversations(): Promise<any[]> {
    if (!supabase) {
      throw new Error('Database service unavailable.');
    }

    const { data, error } = await supabase
      .from('chat_conversations')
      .select('*, chat_messages(count)')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('[DB Error] getAllChatConversations failed:', error.message || error);
      throw error;
    }
    return data || [];
  },

  async getChatMessages(conversationId: string): Promise<ChatMessage[]> {
    if (!supabase) {
      throw new Error('Database service unavailable.');
    }

    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('[DB Error] getChatMessages failed:', error.message || error);
      throw error;
    }
    return data || [];
  },

  async getAllChatLeads(): Promise<ChatLead[]> {
    if (!supabase) {
      throw new Error('Database service unavailable.');
    }

    const { data, error } = await supabase
      .from('chat_leads')
      .select('*')
      .order('lead_score', { ascending: false });

    if (error) {
      console.error('[DB Error] getAllChatLeads failed:', error.message || error);
      throw error;
    }
    return data || [];
  },

  async deleteChatConversation(id: string): Promise<void> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }
    const { error } = await supabase.from('chat_conversations').delete().eq('id', id);
    if (error) {
      console.error('[DB Error] deleteChatConversation failed:', error.message || error);
      throw error;
    }
  },

  async deleteChatLead(id: string): Promise<void> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }
    const { error } = await supabase.from('chat_leads').delete().eq('id', id);
    if (error) {
      console.error('[DB Error] deleteChatLead failed:', error.message || error);
      throw error;
    }
  },

  async deleteConsultationRequest(id: string): Promise<void> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }
    const { error } = await supabase.from('consultation_requests').delete().eq('id', id);
    if (error) {
      console.error('[DB Error] deleteConsultationRequest failed:', error.message || error);
      throw error;
    }
  },

  async getAllChatMessages(): Promise<ChatMessage[]> {
    if (!supabase) {
      throw new Error('Database service unavailable: Supabase client is not configured.');
    }
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('[DB Error] getAllChatMessages failed:', error.message || error);
      throw error;
    }
    return data || [];
  }
};
