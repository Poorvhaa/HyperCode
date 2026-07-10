export type ServiceIntent =
  | 'DEFAULT'
  | 'Web Development'
  | 'Mobile Development'
  | 'Software Development'
  | 'AI & Automation'
  | 'Cloud & DevOps'
  | 'Data Analytics'
  | 'Business Intelligence'
  | 'Digital Transformation'
  | 'Enterprise Data Platforms'
  | 'IT Staffing'
  | 'Non-IT Staffing';

export type ConversationStage =
  | 'Greeting'
  | 'Service Introduction'
  | 'Requirement Gathering'
  | 'Project Qualification'
  | 'Lead Qualification'
  | 'Consultation'
  | 'Completion';

export interface LeadData {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  industry?: string;
  preferredContact?: 'Email' | 'Phone' | 'Either';
}

export interface ProjectData {
  projectType?: string;
  projectStatus?: string;
  requiredFeatures?: string;
  timeline?: string;
  budgetRange?: string;
  projectDescription?: string;
  teamSize?: string;
  currentTechnology?: string;
  primaryGoal?: string;
}

export interface ChatbotState {
  detectedIntent: ServiceIntent;
  conversationStage: ConversationStage;
  currentQuestion: string | null;
  leadData: LeadData;
  projectData: ProjectData;
  recommendations: Record<string, unknown> | null;
  leadSubmitted: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  message: string;
  created_at: string;
}

export interface ConsultantResponse {
  detectedIntent: ServiceIntent;
  conversationStage: ConversationStage;
  currentQuestion: string | null;
  responseMessage: string;
  suggestedPrompts: string[];
  navigationActions: string[];
  extractedLeadData: LeadData;
  projectData: ProjectData;
  recommendations: Record<string, unknown> | null;
}