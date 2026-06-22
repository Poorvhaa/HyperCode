import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Interfaces
export interface Conversation {
  id: string;
  session_id: string;
  status: 'active' | 'completed' | 'archived';
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender: 'user' | 'assistant';
  message: string;
  session_id?: string | null;
  language?: 'en' | 'es';
  created_at: string;
}

export interface QualifiedLead {
  id: string;
  conversation_id: string;
  company_type: 'Startup' | 'SMB' | 'Enterprise' | 'Government';
  service_interest: string;
  challenge: string;
  timeline: 'Immediately' | 'Within 30 days' | '1–3 months' | 'Just exploring';
  score: number;
  created_at: string;
}

export interface ConsultationRequest {
  id: string;
  full_name: string;
  company: string;
  email: string;
  phone: string;
  service_interest: string;
  project_description: string;
  budget: string;
  timeline: string;
  status: 'new' | 'scheduled' | 'archived';
  created_at: string;
}

export interface ContactInquiry {
  id: string;
  full_name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'archived';
  source: string;
  created_at: string;
}

export interface StaffingRequest {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  roles: string;
  timeline: string;
  team_size: string;
  location: string;
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

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  resume_url: string;
  skills: string;
  experience: string;
  availability: string;
  location: string;
  status: 'Available' | 'Reviewing' | 'Interviewing' | 'Placed' | 'Inactive';
  created_at: string;
}

export interface ChatLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  conversation_summary: string;
  company: string | null;
  source: string | null;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Won' | 'Lost';
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  status: 'subscribed' | 'unsubscribed';
  language: 'en' | 'es';
  source_page: string | null;
  created_at: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  featured_image: string | null;
  author: {
    name: string;
    role: string;
    avatar: string;
  } | null;
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

// LocalStorage helpers for mock DB fallback
const getLocal = (key: string): any[] => {
  if (typeof window === 'undefined') return [];
  const val = localStorage.getItem(key);
  return val ? JSON.parse(val) : [];
};

const saveLocal = (key: string, data: any[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
};

const uuid = () => Math.random().toString(36).substring(2, 9) + '-' + Math.random().toString(36).substring(2, 9);

// Unified Database API
export const db = {
  // 1. Get or Create Conversation
  async getConversation(sessionId: string): Promise<Conversation> {
    if (supabase) {
      const { data, error } = await supabase
        .from('chat_conversations')
        .select('*')
        .eq('session_id', sessionId)
        .maybeSingle();

      if (data) return data;

      const { data: newConv, error: insError } = await supabase
        .from('chat_conversations')
        .insert([{ session_id: sessionId, status: 'active' }])
        .select()
        .single();

      if (insError) throw insError;
      return newConv;
    } else {
      const conversations = getLocal('hypercode_db_conversations');
      let conv = conversations.find(c => c.session_id === sessionId);
      if (!conv) {
        conv = {
          id: uuid(),
          session_id: sessionId,
          status: 'active',
          created_at: new Date().toISOString()
        };
        conversations.push(conv);
        saveLocal('hypercode_db_conversations', conversations);
      }
      return conv;
    }
  },

  // 2. Save Chat Message
  async saveMessage(
    conversationId: string,
    sender: 'user' | 'assistant',
    message: string,
    sessionId?: string | null,
    language?: 'en' | 'es'
  ): Promise<Message> {
    if (supabase) {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert([{
          conversation_id: conversationId,
          sender,
          message,
          session_id: sessionId,
          language: language || 'en'
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      const messages = getLocal('hypercode_db_messages');
      const newMsg: Message = {
        id: uuid(),
        conversation_id: conversationId,
        sender,
        message,
        session_id: sessionId || null,
        language: language || 'en',
        created_at: new Date().toISOString()
      };
      messages.push(newMsg);
      saveLocal('hypercode_db_messages', messages);
      return newMsg;
    }
  },

  // 3. Save Qualified Lead
  async saveQualifiedLead(
    conversationId: string,
    companyType: 'Startup' | 'SMB' | 'Enterprise' | 'Government',
    serviceInterest: string,
    challenge: string,
    timeline: 'Immediately' | 'Within 30 days' | '1–3 months' | 'Just exploring',
    score: number
  ): Promise<QualifiedLead> {
    if (supabase) {
      const { data, error } = await supabase
        .from('qualified_leads')
        .insert([{
          conversation_id: conversationId,
          company_type: companyType,
          service_interest: serviceInterest,
          challenge,
          timeline,
          score
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      const leads = getLocal('hypercode_db_leads');
      const newLead: QualifiedLead = {
        id: uuid(),
        conversation_id: conversationId,
        company_type: companyType,
        service_interest: serviceInterest,
        challenge,
        timeline,
        score,
        created_at: new Date().toISOString()
      };
      leads.push(newLead);
      saveLocal('hypercode_db_leads', leads);
      return newLead;
    }
  },

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
    if (supabase) {
      const { data, error } = await supabase
        .from('consultation_requests')
        .insert([{
          full_name: fullName,
          company,
          email,
          phone,
          service_interest: serviceInterest,
          project_description: projectDescription,
          budget,
          timeline,
          status: 'new'
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      const consultations = getLocal('hypercode_db_consultations');
      const newReq: ConsultationRequest = {
        id: uuid(),
        full_name: fullName,
        company,
        email,
        phone,
        service_interest: serviceInterest,
        project_description: projectDescription,
        budget,
        timeline,
        status: 'new',
        created_at: new Date().toISOString()
      };
      consultations.push(newReq);
      saveLocal('hypercode_db_consultations', consultations);
      return newReq;
    }
  },

  // 4b. Save Contact Inquiry
  async saveContactInquiry(
    fullName: string,
    company: string,
    email: string,
    phone: string,
    subject: string,
    message: string,
    source: string = 'website'
  ): Promise<ContactInquiry> {
    if (supabase) {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .insert([{
          full_name: fullName,
          company,
          email,
          phone,
          subject,
          message,
          status: 'new',
          source
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      const inquiries = getLocal('hypercode_db_contact_inquiries');
      const newInq: ContactInquiry = {
        id: uuid(),
        full_name: fullName,
        company,
        email,
        phone,
        subject,
        message,
        status: 'new',
        source,
        created_at: new Date().toISOString()
      };
      inquiries.push(newInq);
      saveLocal('hypercode_db_contact_inquiries', inquiries);
      return newInq;
    }
  },

  // 5. Save Staffing Request (Legacy/Fallback method, mapped to consultation or kept for compat)
  async saveStaffingRequest(
    name: string,
    company: string,
    email: string,
    phone: string,
    roles: string,
    timeline: string,
    teamSize: string,
    location: string
  ): Promise<StaffingRequest> {
    if (supabase) {
      const { data, error } = await supabase
        .from('staffing_requests')
        .insert([{
          name,
          company,
          email,
          phone,
          roles,
          timeline,
          team_size: teamSize,
          location
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      const staffing = getLocal('hypercode_db_staffing');
      const newReq: StaffingRequest = {
        id: uuid(),
        name,
        company,
        email,
        phone,
        roles,
        timeline,
        team_size: teamSize,
        location,
        created_at: new Date().toISOString()
      };
      staffing.push(newReq);
      saveLocal('hypercode_db_staffing', staffing);
      return newReq;
    }
  },

  // 6. Careers - Save Job Application
  async saveJobApplication(app: Omit<JobApplication, 'id' | 'created_at' | 'status'>): Promise<JobApplication> {
    if (supabase) {
      const { data, error } = await supabase
        .from('job_applications')
        .insert([{ ...app, status: 'New' }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      const applications = getLocal('hypercode_db_job_applications');
      const newApp: JobApplication = {
        ...app,
        id: uuid(),
        status: 'New',
        created_at: new Date().toISOString()
      };
      applications.push(newApp);
      saveLocal('hypercode_db_job_applications', applications);
      return newApp;
    }
  },

  // 7. Careers - Update Job Application Status
  async updateJobApplicationStatus(id: string, status: JobApplication['status']): Promise<void> {
    if (supabase) {
      const { error } = await supabase
        .from('job_applications')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
    } else {
      const applications = getLocal('hypercode_db_job_applications');
      const index = applications.findIndex(a => a.id === id);
      if (index !== -1) {
        applications[index].status = status;
        saveLocal('hypercode_db_job_applications', applications);
      }
    }
  },

  // 8. Candidates - Save Candidate
  async saveCandidate(cand: Omit<Candidate, 'id' | 'created_at'>): Promise<Candidate> {
    if (supabase) {
      const { data, error } = await supabase
        .from('candidates')
        .insert([cand])
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      const candidates = getLocal('hypercode_db_candidates');
      const newCand: Candidate = {
        ...cand,
        id: uuid(),
        created_at: new Date().toISOString()
      };
      candidates.push(newCand);
      saveLocal('hypercode_db_candidates', candidates);
      return newCand;
    }
  },

  // 9. Candidates - Delete Candidate
  async deleteCandidate(id: string): Promise<void> {
    if (supabase) {
      const { error } = await supabase.from('candidates').delete().eq('id', id);
      if (error) throw error;
    } else {
      const candidates = getLocal('hypercode_db_candidates');
      const filtered = candidates.filter(c => c.id !== id);
      saveLocal('hypercode_db_candidates', filtered);
    }
  },

  // 10. Chatbot - Save Chat Lead
  async saveChatLead(lead: Omit<ChatLead, 'id' | 'created_at'>): Promise<ChatLead> {
    if (supabase) {
      const { data, error } = await supabase
        .from('chat_leads')
        .insert([lead])
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      const leads = getLocal('hypercode_db_chat_leads');
      const newLead: ChatLead = {
        ...lead,
        id: uuid(),
        company: lead.company || null,
        source: lead.source || null,
        created_at: new Date().toISOString()
      };
      leads.push(newLead);
      saveLocal('hypercode_db_chat_leads', leads);
      return newLead;
    }
  },

  // 11. Newsletter - Save Subscriber
  async saveNewsletterSubscriber(email: string, language: 'en' | 'es' = 'en', sourcePage?: string | null): Promise<void> {
    if (supabase) {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email, status: 'subscribed', language, source_page: sourcePage }]);
      // Ignore unique violations in case of double subscribe
      if (error && error.code !== '23505') throw error;
    } else {
      const subs = getLocal('hypercode_db_newsletter_subscribers');
      if (!subs.some(s => s.email === email)) {
        subs.push({
          id: uuid(),
          email,
          status: 'subscribed',
          language,
          source_page: sourcePage || null,
          created_at: new Date().toISOString()
        });
        saveLocal('hypercode_db_newsletter_subscribers', subs);
      }
    }
  },

  // 12. CMS Articles - CRUD
  async getAllArticles(): Promise<Article[]> {
    if (supabase) {
      const { data, error } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } else {
      return getLocal('hypercode_db_articles').sort((a, b) => b.created_at.localeCompare(a.created_at));
    }
  },

  async getArticleBySlug(slug: string): Promise<Article | null> {
    if (supabase) {
      const { data, error } = await supabase.from('articles').select('*').eq('slug', slug).maybeSingle();
      if (error) throw error;
      return data;
    } else {
      const list = getLocal('hypercode_db_articles');
      return list.find(a => a.slug === slug) || null;
    }
  },

  async saveArticle(article: Omit<Article, 'id' | 'created_at'> & { id?: string }): Promise<Article> {
    if (supabase) {
      if (article.id) {
        const { data, error } = await supabase
          .from('articles')
          .update(article)
          .eq('id', article.id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from('articles')
          .insert([article])
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    } else {
      const list = getLocal('hypercode_db_articles');
      if (article.id) {
        const index = list.findIndex(a => a.id === article.id);
        if (index !== -1) {
          const updated = { ...list[index], ...article };
          list[index] = updated;
          saveLocal('hypercode_db_articles', list);
          return updated;
        }
        throw new Error('Article not found for update');
      } else {
        const created: Article = {
          ...article,
          id: uuid(),
          created_at: new Date().toISOString()
        };
        list.push(created);
        saveLocal('hypercode_db_articles', list);
        return created;
      }
    }
  },

  async deleteArticle(id: string): Promise<void> {
    if (supabase) {
      const { error } = await supabase.from('articles').delete().eq('id', id);
      if (error) throw error;
    } else {
      const list = getLocal('hypercode_db_articles');
      const filtered = list.filter(a => a.id !== id);
      saveLocal('hypercode_db_articles', filtered);
    }
  },

  // 13. CMS Case Studies - CRUD
  async getAllCaseStudies(): Promise<CaseStudy[]> {
    if (supabase) {
      const { data, error } = await supabase.from('case_studies').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } else {
      return getLocal('hypercode_db_case_studies').sort((a, b) => b.created_at.localeCompare(a.created_at));
    }
  },

  async getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
    if (supabase) {
      const { data, error } = await supabase.from('case_studies').select('*').eq('slug', slug).maybeSingle();
      if (error) throw error;
      return data;
    } else {
      const list = getLocal('hypercode_db_case_studies');
      return list.find(c => c.slug === slug) || null;
    }
  },

  async saveCaseStudy(cs: Omit<CaseStudy, 'id' | 'created_at'> & { id?: string }): Promise<CaseStudy> {
    if (supabase) {
      if (cs.id) {
        const { data, error } = await supabase
          .from('case_studies')
          .update(cs)
          .eq('id', cs.id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from('case_studies')
          .insert([cs])
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    } else {
      const list = getLocal('hypercode_db_case_studies');
      if (cs.id) {
        const index = list.findIndex(c => c.id === cs.id);
        if (index !== -1) {
          const updated = { ...list[index], ...cs };
          list[index] = updated;
          saveLocal('hypercode_db_case_studies', list);
          return updated;
        }
        throw new Error('Case study not found for update');
      } else {
        const created: CaseStudy = {
          ...cs,
          id: uuid(),
          created_at: new Date().toISOString()
        };
        list.push(created);
        saveLocal('hypercode_db_case_studies', list);
        return created;
      }
    }
  },

  async deleteCaseStudy(id: string): Promise<void> {
    if (supabase) {
      const { error } = await supabase.from('case_studies').delete().eq('id', id);
      if (error) throw error;
    } else {
      const list = getLocal('hypercode_db_case_studies');
      const filtered = list.filter(c => c.id !== id);
      saveLocal('hypercode_db_case_studies', filtered);
    }
  },

  // 14. RBAC User Profiles
  async getUserProfile(id: string): Promise<UserProfile | null> {
    if (supabase) {
      const { data, error } = await supabase.from('user_profiles').select('*').eq('id', id).maybeSingle();
      if (error) throw error;
      return data;
    } else {
      const list = getLocal('hypercode_db_user_profiles');
      return list.find(u => u.id === id) || null;
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
    if (supabase) {
      const payload: any = { id, email, role, name, avatar };
      if (is_active !== undefined) payload.is_active = is_active;
      const { data, error } = await supabase
        .from('user_profiles')
        .upsert([payload])
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const list = getLocal('hypercode_db_user_profiles');
      const existingIndex = list.findIndex(u => u.id === id);
      const profile: UserProfile = {
        id,
        email,
        role,
        name: name || null,
        avatar: avatar || null,
        is_active: is_active !== undefined ? is_active : true,
        created_at: new Date().toISOString()
      };
      if (existingIndex !== -1) {
        list[existingIndex] = profile;
      } else {
        list.push(profile);
      }
      saveLocal('hypercode_db_user_profiles', list);
      return profile;
    }
  },

  // Admin dashboard get methods
  async getAllConversations(): Promise<Conversation[]> {
    if (supabase) {
      const { data, error } = await supabase.from('chat_conversations').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } else {
      return getLocal('hypercode_db_conversations').sort((a, b) => b.created_at.localeCompare(a.created_at));
    }
  },

  async getAllMessages(): Promise<Message[]> {
    if (supabase) {
      const { data, error } = await supabase.from('chat_messages').select('*').order('created_at', { ascending: true });
      if (error) throw error;
      return data || [];
    } else {
      return getLocal('hypercode_db_messages').sort((a, b) => a.created_at.localeCompare(b.created_at));
    }
  },

  async getAllLeads(): Promise<QualifiedLead[]> {
    if (supabase) {
      const { data, error } = await supabase.from('qualified_leads').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } else {
      return getLocal('hypercode_db_leads').sort((a, b) => b.created_at.localeCompare(a.created_at));
    }
  },

  async getAllConsultations(): Promise<ConsultationRequest[]> {
    if (supabase) {
      const { data, error } = await supabase.from('consultation_requests').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } else {
      return getLocal('hypercode_db_consultations').sort((a, b) => b.created_at.localeCompare(a.created_at));
    }
  },

  async getAllStaffing(): Promise<StaffingRequest[]> {
    if (supabase) {
      const { data, error } = await supabase.from('staffing_requests').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } else {
      return getLocal('hypercode_db_staffing').sort((a, b) => b.created_at.localeCompare(a.created_at));
    }
  },

  async getAllContactInquiries(): Promise<ContactInquiry[]> {
    if (supabase) {
      const { data, error } = await supabase.from('contact_inquiries').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } else {
      return getLocal('hypercode_db_contact_inquiries').sort((a, b) => b.created_at.localeCompare(a.created_at));
    }
  },

  async getAllJobApplications(): Promise<JobApplication[]> {
    if (supabase) {
      const { data, error } = await supabase.from('job_applications').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } else {
      return getLocal('hypercode_db_job_applications').sort((a, b) => b.created_at.localeCompare(a.created_at));
    }
  },

  async getAllCandidates(): Promise<Candidate[]> {
    if (supabase) {
      const { data, error } = await supabase.from('candidates').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } else {
      return getLocal('hypercode_db_candidates').sort((a, b) => b.created_at.localeCompare(a.created_at));
    }
  },

  async getAllChatLeads(): Promise<ChatLead[]> {
    if (supabase) {
      const { data, error } = await supabase.from('chat_leads').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } else {
      return getLocal('hypercode_db_chat_leads').sort((a, b) => b.created_at.localeCompare(a.created_at));
    }
  },

  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    if (supabase) {
      const { data, error } = await supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } else {
      return getLocal('hypercode_db_newsletter_subscribers').sort((a, b) => b.created_at.localeCompare(a.created_at));
    }
  },

  async deleteNewsletterSubscriber(id: string): Promise<void> {
    if (supabase) {
      const { error } = await supabase.from('newsletter_subscribers').delete().eq('id', id);
      if (error) throw error;
    } else {
      const list = getLocal('hypercode_db_newsletter_subscribers');
      const filtered = list.filter(s => s.id !== id);
      saveLocal('hypercode_db_newsletter_subscribers', filtered);
    }
  },

  async getAllUserProfiles(): Promise<UserProfile[]> {
    if (supabase) {
      const { data, error } = await supabase.from('user_profiles').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } else {
      return getLocal('hypercode_db_user_profiles');
    }
  },

  async getCompanySettings(): Promise<CompanySettings> {
    if (supabase) {
      const { data, error } = await supabase.from('company_settings').select('*').eq('id', 'default').maybeSingle();
      if (error) throw error;
      if (data) return data;
      return {
        id: 'default',
        company_name: 'HyperCode',
        email: 'info@hypercode.com',
        phone: '+1 (555) 019-2834',
        address: '100 Pine St, Suite 2400, San Francisco, CA 94111',
        social_links: { linkedin: 'https://linkedin.com/company/hypercode', twitter: 'https://twitter.com/hypercode', github: 'https://github.com/hypercode' },
        updated_at: new Date().toISOString()
      };
    } else {
      const list = getLocal('hypercode_db_company_settings');
      let settings = list.find(s => s.id === 'default');
      if (!settings) {
        settings = {
          id: 'default',
          company_name: 'HyperCode',
          email: 'info@hypercode.com',
          phone: '+1 (555) 019-2834',
          address: '100 Pine St, Suite 2400, San Francisco, CA 94111',
          social_links: { linkedin: 'https://linkedin.com/company/hypercode', twitter: 'https://twitter.com/hypercode', github: 'https://github.com/hypercode' },
          updated_at: new Date().toISOString()
        };
        list.push(settings);
        saveLocal('hypercode_db_company_settings', list);
      }
      return settings;
    }
  },

  async saveCompanySettings(settings: Partial<CompanySettings>): Promise<CompanySettings> {
    if (supabase) {
      const { data, error } = await supabase
        .from('company_settings')
        .upsert([{ id: 'default', ...settings, updated_at: new Date().toISOString() }])
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const list = getLocal('hypercode_db_company_settings');
      const index = list.findIndex(s => s.id === 'default');
      const updated = {
        id: 'default',
        company_name: settings.company_name || 'HyperCode',
        email: settings.email || 'info@hypercode.com',
        phone: settings.phone || null,
        address: settings.address || null,
        social_links: settings.social_links || {},
        updated_at: new Date().toISOString()
      };
      if (index !== -1) {
        list[index] = updated;
      } else {
        list.push(updated);
      }
      saveLocal('hypercode_db_company_settings', list);
      return updated;
    }
  },

  async getEmailTemplates(): Promise<EmailTemplate[]> {
    if (supabase) {
      const { data, error } = await supabase.from('email_templates').select('*');
      if (error) throw error;
      return data || [];
    } else {
      const list = getLocal('hypercode_db_email_templates');
      if (list.length === 0) {
        const defaults = [
          { id: 'contact', subject: 'Thank you for contacting HyperCode', body: 'Hi {{name}},\n\nThank you for reaching out to us. We have received your message regarding "{{subject}}" and a consultant will respond to you within 24 hours.\n\nBest regards,\nHyperCode Team', updated_at: new Date().toISOString() },
          { id: 'consultation', subject: 'Consultation Request Received', body: 'Hi {{name}},\n\nThank you for requesting a technology consultation for "{{service_interest}}". Our team is reviewing your project description and budget of "{{budget}}" to assign the best specialist.\n\nWe will get back to you shortly to schedule our meeting.\n\nBest regards,\nHyperCode Consulting', updated_at: new Date().toISOString() },
          { id: 'application', subject: 'Application Received: {{position}}', body: 'Hi {{name}},\n\nThank you for applying for the {{position}} position at HyperCode. We have received your resume and application details.\n\nOur recruiting team is reviewing candidates and will update you on the next steps.\n\nBest regards,\nHyperCode Careers', updated_at: new Date().toISOString() },
          { id: 'newsletter', subject: 'Welcome to HyperCode Insights', body: 'Hi Subscriber,\n\nThank you for subscribing to our newsletter! You will now receive monthly technology insights, case studies, and engineering updates in {{language}}.\n\nBest regards,\nHyperCode Editorial', updated_at: new Date().toISOString() }
        ];
        saveLocal('hypercode_db_email_templates', defaults);
        return defaults;
      }
      return list;
    }
  },

  async saveEmailTemplate(id: string, subject: string, body: string): Promise<EmailTemplate> {
    if (supabase) {
      const { data, error } = await supabase
        .from('email_templates')
        .upsert([{ id, subject, body, updated_at: new Date().toISOString() }])
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const list = getLocal('hypercode_db_email_templates');
      const index = list.findIndex(t => t.id === id);
      const updated = { id, subject, body, updated_at: new Date().toISOString() };
      if (index !== -1) {
        list[index] = updated;
      } else {
        list.push(updated);
      }
      saveLocal('hypercode_db_email_templates', list);
      return updated;
    }
  },

  async updateLeadStatus(
    type: 'contact' | 'consultation' | 'chat',
    id: string,
    status: 'New' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Won' | 'Lost'
  ): Promise<void> {
    const tableMap = {
      contact: 'contact_inquiries',
      consultation: 'consultation_requests',
      chat: 'chat_leads'
    };
    const table = tableMap[type];
    if (supabase) {
      const { error } = await supabase.from(table).update({ status }).eq('id', id);
      if (error) throw error;
    } else {
      const localKeyMap = {
        contact: 'hypercode_db_contact_inquiries',
        consultation: 'hypercode_db_consultations',
        chat: 'hypercode_db_chat_leads'
      };
      const key = localKeyMap[type];
      const list = getLocal(key);
      const index = list.findIndex(item => item.id === id);
      if (index !== -1) {
        list[index].status = status;
        saveLocal(key, list);
      }
    }
  }
};
