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
  name: string;
  company: string;
  email: string;
  phone: string;
  service_needed: string;
  project_description: string;
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
  async saveMessage(conversationId: string, sender: 'user' | 'assistant', message: string): Promise<Message> {
    if (supabase) {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert([{ conversation_id: conversationId, sender, message }])
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
    name: string,
    company: string,
    email: string,
    phone: string,
    serviceNeeded: string,
    projectDescription: string
  ): Promise<ConsultationRequest> {
    if (supabase) {
      const { data, error } = await supabase
        .from('consultation_requests')
        .insert([{
          name,
          company,
          email,
          phone,
          service_needed: serviceNeeded,
          project_description: projectDescription
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      const consultations = getLocal('hypercode_db_consultations');
      const newReq: ConsultationRequest = {
        id: uuid(),
        name,
        company,
        email,
        phone,
        service_needed: serviceNeeded,
        project_description: projectDescription,
        created_at: new Date().toISOString()
      };
      consultations.push(newReq);
      saveLocal('hypercode_db_consultations', consultations);
      return newReq;
    }
  },

  // 5. Save Staffing Request
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

  // Admin dashboard methods
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
  }
};
