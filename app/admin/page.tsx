'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Download,
  Users,
  MessageSquare,
  Calendar,
  TrendingUp,
  BarChart3,
  Search,
  Award,
  Activity,
  FileText,
  Clock,
  MapPin,
  ChevronRight,
  Database,
  ArrowRight
} from 'lucide-react';
import { db, Conversation, Message, QualifiedLead, ConsultationRequest, StaffingRequest } from '@/lib/db';

export default function AdminPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [leads, setLeads] = useState<QualifiedLead[]>([]);
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [staffing, setStaffing] = useState<StaffingRequest[]>([]);
  
  // UI States
  const [activeTab, setActiveTab] = useState<'conversations' | 'leads' | 'consultations' | 'staffing'>('conversations');
  const [selectedConversationId, setSelectedConversationId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Seed data & Load
  useEffect(() => {
    const seedDummyDataIfEmpty = () => {
      const convs = localStorage.getItem('hypercode_db_conversations');
      if (!convs || JSON.parse(convs).length === 0) {
        // Seed Conversations
        const dummyConvs = [
          { id: 'c1', session_id: 'sess_enterprise_finance', status: 'active', created_at: new Date(Date.now() - 3600000 * 2).toISOString() },
          { id: 'c2', session_id: 'sess_healthcare_bi', status: 'completed', created_at: new Date(Date.now() - 3600000 * 12).toISOString() },
          { id: 'c3', session_id: 'sess_retail_analytics', status: 'completed', created_at: new Date(Date.now() - 3600000 * 24).toISOString() },
          { id: 'c4', session_id: 'sess_govt_warehousing', status: 'archived', created_at: new Date(Date.now() - 3600000 * 48).toISOString() },
          { id: 'c5', session_id: 'sess_saas_engineering', status: 'completed', created_at: new Date(Date.now() - 3600000 * 72).toISOString() },
        ];
        localStorage.setItem('hypercode_db_conversations', JSON.stringify(dummyConvs));

        // Seed Messages
        const dummyMessages = [
          { id: 'm1_1', conversation_id: 'c1', sender: 'assistant', message: "Hello 👋\n\nI'm HyperCode AI. I can help you learn about our Business Intelligence, Data Analytics, Data Engineering, and IT Staffing services.\n\nHow can I assist you today?", created_at: new Date(Date.now() - 3600000 * 2).toISOString() },
          { id: 'm1_2', conversation_id: 'c1', sender: 'user', message: "Talk to a Consultant", created_at: new Date(Date.now() - 3600000 * 2 + 10000).toISOString() },
          { id: 'm1_3', conversation_id: 'c1', sender: 'assistant', message: "What type of organization do you represent?", created_at: new Date(Date.now() - 3600000 * 2 + 20000).toISOString() },
          { id: 'm1_4', conversation_id: 'c1', sender: 'user', message: "Enterprise", created_at: new Date(Date.now() - 3600000 * 2 + 30000).toISOString() },
          { id: 'm1_5', conversation_id: 'c1', sender: 'assistant', message: "Which service are you most interested in?", created_at: new Date(Date.now() - 3600000 * 2 + 40000).toISOString() },
          { id: 'm1_6', conversation_id: 'c1', sender: 'user', message: "☁ Data Engineering", created_at: new Date(Date.now() - 3600000 * 2 + 50000).toISOString() },
          { id: 'm1_7', conversation_id: 'c1', sender: 'assistant', message: "What specific data or consulting challenge are you trying to solve?", created_at: new Date(Date.now() - 3600000 * 2 + 60000).toISOString() },
          { id: 'm1_8', conversation_id: 'c1', sender: 'user', message: "Cloud data warehousing and pipeline scalability with dbt and Snowflake.", created_at: new Date(Date.now() - 3600000 * 2 + 70000).toISOString() },
          { id: 'm1_9', conversation_id: 'c1', sender: 'assistant', message: "How soon do you need assistance with this project?", created_at: new Date(Date.now() - 3600000 * 2 + 80000).toISOString() },
          { id: 'm1_10', conversation_id: 'c1', sender: 'user', message: "Immediately", created_at: new Date(Date.now() - 3600000 * 2 + 90000).toISOString() },

          { id: 'm2_1', conversation_id: 'c2', sender: 'assistant', message: "Hello 👋\n\nI'm HyperCode AI...", created_at: new Date(Date.now() - 3600000 * 12).toISOString() },
          { id: 'm2_2', conversation_id: 'c2', sender: 'user', message: "📊 Business Intelligence", created_at: new Date(Date.now() - 3600000 * 12 + 10000).toISOString() },
          { id: 'm2_3', conversation_id: 'c2', sender: 'assistant', message: "Business Intelligence combines reporting, dashboards, analytics, and visualization tools...", created_at: new Date(Date.now() - 3600000 * 12 + 20000).toISOString() },
          { id: 'm2_4', conversation_id: 'c2', sender: 'user', message: "📅 Schedule Consultation", created_at: new Date(Date.now() - 3600000 * 12 + 30000).toISOString() },
          { id: 'm2_5', conversation_id: 'c2', sender: 'assistant', message: "Let's get your consultation scheduled. What is your full name?", created_at: new Date(Date.now() - 3600000 * 12 + 40000).toISOString() },
          { id: 'm2_6', conversation_id: 'c2', sender: 'user', message: "Sarah Jenkins", created_at: new Date(Date.now() - 3600000 * 12 + 50000).toISOString() },
        ];
        localStorage.setItem('hypercode_db_messages', JSON.stringify(dummyMessages));

        // Seed Leads
        const dummyLeads = [
          { id: 'l1', conversation_id: 'c1', company_type: 'Enterprise', service_interest: 'Data Engineering', challenge: 'Cloud data warehousing and pipeline scalability with dbt and Snowflake.', timeline: 'Immediately', score: 6, created_at: new Date(Date.now() - 3600000 * 2).toISOString() },
          { id: 'l2', conversation_id: 'c3', company_type: 'SMB', service_interest: 'Data Analytics', challenge: 'Customer churn prediction modeling', timeline: 'Within 30 days', score: 3, created_at: new Date(Date.now() - 3600000 * 24).toISOString() },
          { id: 'l3', conversation_id: 'c5', company_type: 'Startup', service_interest: 'Business Intelligence', challenge: 'Power BI executive dashboards setting up', timeline: '1–3 months', score: 2, created_at: new Date(Date.now() - 3600000 * 72).toISOString() },
        ];
        localStorage.setItem('hypercode_db_leads', JSON.stringify(dummyLeads));

        // Seed Consultations
        const dummyConsultations = [
          { id: 'r1', name: 'Sarah Jenkins', company: 'Acme HealthCorp', email: 'sjenkins@healthcorp.com', phone: '312-555-0192', service_needed: 'Business Intelligence', project_description: 'Migrating legacy reports to Power BI and cloud Snowflake storage.', created_at: new Date(Date.now() - 3600000 * 12).toISOString() },
          { id: 'r2', name: 'Michael Chen', company: 'Apex Retail', email: 'm.chen@apexretail.com', phone: '847-555-2283', service_needed: 'Data Engineering', project_description: 'Optimize dbt runs and Airflow pipeline scheduling latency.', created_at: new Date(Date.now() - 3600000 * 48).toISOString() },
        ];
        localStorage.setItem('hypercode_db_consultations', JSON.stringify(dummyConsultations));

        // Seed Staffing
        const dummyStaffing = [
          { id: 's1', name: 'David Miller', company: 'Fintech Solutions', email: 'dmiller@fintechsol.com', phone: '630-555-8833', roles: 'Data Engineer, BI Developer', timeline: 'Immediately', team_size: '2-5 positions', location: 'Remote', created_at: new Date(Date.now() - 3600000 * 36).toISOString() },
        ];
        localStorage.setItem('hypercode_db_staffing', JSON.stringify(dummyStaffing));
      }
    };

    seedDummyDataIfEmpty();
    
    // Fetch data
    const loadData = async () => {
      try {
        const convs = await db.getAllConversations();
        const msgs = await db.getAllMessages();
        const qLeads = await db.getAllLeads();
        const cons = await db.getAllConsultations();
        const staffs = await db.getAllStaffing();

        setConversations(convs);
        setMessages(msgs);
        setLeads(qLeads);
        setConsultations(cons);
        setStaffing(staffs);

        if (convs.length > 0) {
          setSelectedConversationId(convs[0].id);
        }
      } catch (err) {
        console.error('Failed to load admin dashboard database values:', err);
      }
    };

    loadData();
  }, []);

  // Metrics Calculations
  const totalChats = conversations.length;
  const totalLeads = leads.length;
  const totalConsultations = consultations.length;
  const totalStaffing = staffing.length;
  const totalConversions = totalLeads + totalConsultations + totalStaffing;
  const conversionRate = totalChats > 0 ? ((totalConversions / totalChats) * 100).toFixed(1) : '0.0';

  // Selected chat transcripts
  const selectedConversation = conversations.find(c => c.id === selectedConversationId);
  const selectedMessages = messages.filter(m => m.conversation_id === selectedConversationId);
  const selectedLead = leads.find(l => l.conversation_id === selectedConversationId);

  // CSV Exporter
  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => 
      Object.values(obj).map(val => {
        const strVal = String(val).replace(/"/g, '""');
        return strVal.includes(',') || strVal.includes('\n') ? `"${strVal}"` : strVal;
      }).join(',')
    );
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="relative w-full min-h-screen bg-slate-950 text-white">
      <Navigation />

      {/* Header Section */}
      <section className="pt-32 pb-8 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1 text-left">
              <div className="flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full w-fit">
                <Activity size={12} className="text-blue-400 animate-pulse" />
                <span className="text-[10px] font-bold text-blue-400 tracking-wider">ADMIN CONTROL CENTER</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
                HyperCode AI Analytics
              </h1>
              <p className="text-sm text-slate-400">
                Track AI consultant performance, review qualified leads, and export enterprise consultation requests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Summary Row */}
      <section className="py-8 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Metric 1 */}
            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4 flex flex-col justify-between text-left">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-semibold tracking-wider uppercase">Conversations</span>
                <MessageSquare size={16} className="text-blue-400" />
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold">{totalChats}</span>
                <p className="text-[10px] text-slate-500 mt-1">Active sessions</p>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4 flex flex-col justify-between text-left">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-semibold tracking-wider uppercase">Qualified Leads</span>
                <TrendingUp size={16} className="text-emerald-400" />
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold">{totalLeads}</span>
                <p className="text-[10px] text-emerald-400 mt-1">Ready for sales route</p>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4 flex flex-col justify-between text-left">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-semibold tracking-wider uppercase">Booked Consultations</span>
                <Calendar size={16} className="text-purple-400" />
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold">{totalConsultations}</span>
                <p className="text-[10px] text-slate-500 mt-1">Outreach scheduled</p>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4 flex flex-col justify-between text-left">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-semibold tracking-wider uppercase">Staffing Requests</span>
                <Users size={16} className="text-cyan-400" />
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold">{totalStaffing}</span>
                <p className="text-[10px] text-slate-500 mt-1">Roles pipeline logged</p>
              </div>
            </div>

            {/* Metric 5 */}
            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4 flex flex-col justify-between col-span-2 lg:col-span-1 text-left">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-semibold tracking-wider uppercase">Conversion Rate</span>
                <Award size={16} className="text-amber-400" />
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold text-emerald-400">{conversionRate}%</span>
                <p className="text-[10px] text-slate-500 mt-1">Inquiries vs sessions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Visualizations Row */}
      <section className="pb-8 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Chart 1: Conversion Pipeline */}
            <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 hover:bg-slate-900/60 transition-all duration-300 text-left">
              <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Conversion Pipeline Funnel</span>
              <h4 className="text-sm font-semibold mt-1 mb-4 text-white">Sessions ➔ Qualified leads ➔ Consultations</h4>
              
              <div className="space-y-4">
                {/* Stage 1 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-medium mb-1">
                    <span className="text-slate-300">Total Website Sessions</span>
                    <span className="text-white font-bold">{totalChats}</span>
                  </div>
                  <div className="w-full h-3.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: '100%' }} />
                  </div>
                </div>

                {/* Stage 2 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-medium mb-1">
                    <span className="text-slate-300">Qualified Lead Conversions</span>
                    <span className="text-emerald-400 font-bold">{totalLeads} ({totalChats > 0 ? ((totalLeads/totalChats)*100).toFixed(0) : 0}%)</span>
                  </div>
                  <div className="w-full h-3.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: totalChats > 0 ? `${(totalLeads/totalChats)*100}%` : '0%' }} />
                  </div>
                </div>

                {/* Stage 3 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-medium mb-1">
                    <span className="text-slate-300">Formally Booked Consultations</span>
                    <span className="text-purple-400 font-bold">{totalConsultations} ({totalChats > 0 ? ((totalConsultations/totalChats)*100).toFixed(0) : 0}%)</span>
                  </div>
                  <div className="w-full h-3.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full transition-all duration-1000" style={{ width: totalChats > 0 ? `${(totalConsultations/totalChats)*100}%` : '0%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Chart 2: Timeline Urgency Distribution */}
            <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 hover:bg-slate-900/60 transition-all duration-300 text-left">
              <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Lead Urgency Distribution</span>
              <h4 className="text-sm font-semibold mt-1 mb-4 text-white">Qualified leads categorized by project timeline</h4>
              
              <div className="flex items-end justify-between h-28 pt-2 px-4 border-b border-white/10 relative">
                {/* Immediately */}
                <div className="flex flex-col items-center w-1/5 group">
                  <div className="text-[10px] font-bold text-red-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {leads.filter(l => l.timeline === 'Immediately').length}
                  </div>
                  <div
                    className="w-8 bg-red-500 rounded-t-sm transition-all duration-1000 hover:bg-red-400"
                    style={{
                      height: `${(leads.filter(l => l.timeline === 'Immediately').length / Math.max(leads.length, 1)) * 80}px`,
                      minHeight: leads.filter(l => l.timeline === 'Immediately').length > 0 ? '6px' : '2px'
                    }}
                  />
                  <span className="text-[8px] text-slate-400 font-bold mt-2 truncate max-w-full tracking-wider uppercase">Immediate</span>
                </div>

                {/* Within 30 days */}
                <div className="flex flex-col items-center w-1/5 group">
                  <div className="text-[10px] font-bold text-amber-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {leads.filter(l => l.timeline === 'Within 30 days').length}
                  </div>
                  <div
                    className="w-8 bg-amber-500 rounded-t-sm transition-all duration-1000 hover:bg-amber-400"
                    style={{
                      height: `${(leads.filter(l => l.timeline === 'Within 30 days').length / Math.max(leads.length, 1)) * 80}px`,
                      minHeight: leads.filter(l => l.timeline === 'Within 30 days').length > 0 ? '6px' : '2px'
                    }}
                  />
                  <span className="text-[8px] text-slate-400 font-bold mt-2 truncate max-w-full tracking-wider uppercase">30 Days</span>
                </div>

                {/* 1-3 months */}
                <div className="flex flex-col items-center w-1/5 group">
                  <div className="text-[10px] font-bold text-purple-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {leads.filter(l => l.timeline === '1–3 months').length}
                  </div>
                  <div
                    className="w-8 bg-purple-500 rounded-t-sm transition-all duration-1000 hover:bg-purple-400"
                    style={{
                      height: `${(leads.filter(l => l.timeline === '1–3 months').length / Math.max(leads.length, 1)) * 80}px`,
                      minHeight: leads.filter(l => l.timeline === '1–3 months').length > 0 ? '6px' : '2px'
                    }}
                  />
                  <span className="text-[8px] text-slate-400 font-bold mt-2 truncate max-w-full tracking-wider uppercase">1-3 Mos</span>
                </div>

                {/* Just exploring */}
                <div className="flex flex-col items-center w-1/5 group">
                  <div className="text-[10px] font-bold text-blue-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {leads.filter(l => l.timeline === 'Just exploring').length}
                  </div>
                  <div
                    className="w-8 bg-blue-500 rounded-t-sm transition-all duration-1000 hover:bg-blue-400"
                    style={{
                      height: `${(leads.filter(l => l.timeline === 'Just exploring').length / Math.max(leads.length, 1)) * 80}px`,
                      minHeight: leads.filter(l => l.timeline === 'Just exploring').length > 0 ? '6px' : '2px'
                    }}
                  />
                  <span className="text-[8px] text-slate-400 font-bold mt-2 truncate max-w-full tracking-wider uppercase">Explore</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Dashboard Area */}
      <section className="pb-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[550px]">
            
            {/* Left Column - Navigation List */}
            <div className="w-full lg:w-[320px] border-r border-white/10 flex flex-col bg-slate-950/40">
              <div className="p-4 border-b border-white/10 flex flex-col space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest text-left">Navigation Tabs</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-1">
                  <button
                    onClick={() => setActiveTab('conversations')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold text-left transition-colors cursor-pointer flex items-center justify-between ${
                      activeTab === 'conversations' ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    <span>Chats Explorer</span>
                    <span className="bg-white/15 px-1.5 py-0.5 rounded text-[10px]">{totalChats}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold text-left transition-colors cursor-pointer flex items-center justify-between ${
                      activeTab === 'leads' ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    <span>Qualified Leads</span>
                    <span className="bg-white/15 px-1.5 py-0.5 rounded text-[10px]">{totalLeads}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('consultations')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold text-left transition-colors cursor-pointer flex items-center justify-between ${
                      activeTab === 'consultations' ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    <span>Consultations</span>
                    <span className="bg-white/15 px-1.5 py-0.5 rounded text-[10px]">{totalConsultations}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('staffing')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold text-left transition-colors cursor-pointer flex items-center justify-between ${
                      activeTab === 'staffing' ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    <span>Staffing Requests</span>
                    <span className="bg-white/15 px-1.5 py-0.5 rounded text-[10px]">{totalStaffing}</span>
                  </button>
                </div>
              </div>

              {/* Chat Session Picker if in conversations tab */}
              {activeTab === 'conversations' && (
                <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-[350px] lg:max-h-none">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-left block mb-1">Active Sessions</span>
                  {conversations.length === 0 ? (
                    <div className="text-xs text-slate-500 text-center py-8">No chats found.</div>
                  ) : (
                    conversations.map((conv) => (
                      <button
                        key={conv.id}
                        onClick={() => setSelectedConversationId(conv.id)}
                        className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer block ${
                          selectedConversationId === conv.id
                            ? 'bg-white/5 border-blue-500/50 shadow-inner'
                            : 'bg-transparent border-transparent hover:bg-white/5'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white truncate max-w-[150px]">{conv.session_id}</span>
                          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                            conv.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'
                          }`}>
                            {conv.status.toUpperCase()}
                          </span>
                        </div>
                        <span className="text-[9px] text-slate-500 mt-1 block">
                          {new Date(conv.created_at).toLocaleString()}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Right Column - Detail Explorer Workspace */}
            <div className="flex-1 p-6 flex flex-col bg-slate-950/20">
              
              {/* Tab Content 1: Chats Explorer */}
              {activeTab === 'conversations' && (
                <div className="flex-1 flex flex-col space-y-6">
                  {selectedConversation ? (
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch flex-1">
                      
                      {/* Transcript Section */}
                      <div className="xl:col-span-2 flex flex-col border border-white/10 rounded-xl overflow-hidden bg-slate-950/60 min-h-[350px]">
                        <div className="px-4 py-3 bg-slate-900/60 border-b border-white/10 flex justify-between items-center">
                          <span className="text-xs font-bold text-white">CONVERSATION TRANSCRIPT</span>
                          <span className="text-[10px] text-slate-400 font-medium">Session ID: {selectedConversation.session_id}</span>
                        </div>
                        
                        {/* Messages Scroller */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[380px] text-left">
                          {selectedMessages.length === 0 ? (
                            <div className="text-xs text-slate-500 text-center py-12">No messages in this chat.</div>
                          ) : (
                            selectedMessages.map((msg) => (
                              <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                <span className="text-[9px] text-slate-500 mb-0.5 font-semibold">
                                  {msg.sender === 'user' ? 'User' : 'HyperCode AI'}
                                </span>
                                <div className={`max-w-[80%] rounded-xl px-3.5 py-2 text-xs leading-relaxed whitespace-pre-line ${
                                  msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white/5 border border-white/5 text-slate-300'
                                }`}>
                                  {msg.message}
                                </div>
                                <span className="text-[8px] text-slate-600 mt-0.5">
                                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Lead Profiler Panel */}
                      <div className="flex flex-col border border-white/10 rounded-xl p-4 bg-slate-900/40 text-left justify-between space-y-6">
                        <div className="space-y-4">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block border-b border-white/10 pb-2">
                            Session Intelligence
                          </span>
                          <div className="space-y-3">
                            <div>
                              <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Session Status</span>
                              <span className="text-xs font-bold text-white mt-0.5 block capitalize">{selectedConversation.status}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Started At</span>
                              <span className="text-xs font-bold text-white mt-0.5 block">{new Date(selectedConversation.created_at).toLocaleString()}</span>
                            </div>
                            
                            {selectedLead ? (
                              <div className="pt-4 border-t border-white/5 space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Lead Score</span>
                                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-xs font-extrabold">
                                    {selectedLead.score}/6
                                  </span>
                                </div>
                                <div>
                                  <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Org Profile</span>
                                  <span className="text-xs font-bold text-white mt-0.5 block">{selectedLead.company_type}</span>
                                </div>
                                <div>
                                  <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Topic Needed</span>
                                  <span className="text-xs font-bold text-white mt-0.5 block">{selectedLead.service_interest}</span>
                                </div>
                                <div>
                                  <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Business Timeline</span>
                                  <span className="text-xs font-bold text-white mt-0.5 block">{selectedLead.timeline}</span>
                                </div>
                                <div>
                                  <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Identified Challenge</span>
                                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed bg-white/5 border border-white/5 rounded p-2 italic">
                                    "{selectedLead.challenge}"
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className="pt-4 border-t border-white/5 text-xs text-slate-500 italic">
                                Conversation is active. Lead qualification flow has not been triggered yet.
                              </div>
                            )}
                          </div>
                        </div>

                        {selectedLead && (
                          <div className="bg-emerald-500/10 border border-emerald-500/25 p-3 rounded-xl flex items-center gap-2">
                            <Award className="text-emerald-400 flex-shrink-0" size={16} />
                            <span className="text-[10px] text-emerald-400 font-bold tracking-wide leading-relaxed uppercase">
                              SALES ACTIONABLE: ROUTE LEAD TO SERVICE ADVISOR
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-slate-500 text-center py-24 flex-1">
                      Start chatting with the AI bot to create logs.
                    </div>
                  )}
                </div>
              )}

              {/* Tab Content 2: Qualified Leads */}
              {activeTab === 'leads' && (
                <div className="flex-1 flex flex-col space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white text-left">Qualified Leads Database</h3>
                    <button
                      onClick={() => exportToCSV(leads, 'qualified_leads.csv')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2 px-4 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors active:scale-95"
                    >
                      <Download size={14} />
                      Export CSV
                    </button>
                  </div>

                  <div className="border border-white/10 rounded-xl overflow-hidden bg-slate-950/60 overflow-x-auto text-left">
                    <table className="w-full text-xs text-slate-300 min-w-[600px]">
                      <thead className="bg-slate-900/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/10">
                        <tr>
                          <th className="px-6 py-3">Timestamp</th>
                          <th className="px-6 py-3">Org Type</th>
                          <th className="px-6 py-3">Service Interest</th>
                          <th className="px-6 py-3">Challenge</th>
                          <th className="px-6 py-3">Timeline</th>
                          <th className="px-6 py-3 text-center">Score</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {leads.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-slate-500 italic">No qualified leads logged yet.</td>
                          </tr>
                        ) : (
                          leads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-slate-500">{new Date(lead.created_at).toLocaleString()}</td>
                              <td className="px-6 py-4 font-bold text-white">{lead.company_type}</td>
                              <td className="px-6 py-4 font-semibold text-blue-400">{lead.service_interest}</td>
                              <td className="px-6 py-4 max-w-[200px] truncate" title={lead.challenge}>{lead.challenge}</td>
                              <td className="px-6 py-4">{lead.timeline}</td>
                              <td className="px-6 py-4 text-center">
                                <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                                  lead.score >= 5 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'
                                }`}>
                                  {lead.score}/6
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab Content 3: Consultations */}
              {activeTab === 'consultations' && (
                <div className="flex-1 flex flex-col space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white text-left">Consultation Bookings</h3>
                    <button
                      onClick={() => exportToCSV(consultations, 'consultation_requests.csv')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2 px-4 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors active:scale-95"
                    >
                      <Download size={14} />
                      Export CSV
                    </button>
                  </div>

                  <div className="border border-white/10 rounded-xl overflow-hidden bg-slate-950/60 overflow-x-auto text-left">
                    <table className="w-full text-xs text-slate-300 min-w-[700px]">
                      <thead className="bg-slate-900/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/10">
                        <tr>
                          <th className="px-6 py-3">Timestamp</th>
                          <th className="px-6 py-3">Name</th>
                          <th className="px-6 py-3">Company</th>
                          <th className="px-6 py-3">Email</th>
                          <th className="px-6 py-3">Phone</th>
                          <th className="px-6 py-3">Service</th>
                          <th className="px-6 py-3">Project Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {consultations.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="px-6 py-12 text-center text-slate-500 italic">No consultation bookings registered yet.</td>
                          </tr>
                        ) : (
                          consultations.map((req) => (
                            <tr key={req.id} className="hover:bg-white/5 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-slate-500">{new Date(req.created_at).toLocaleString()}</td>
                              <td className="px-6 py-4 font-bold text-white">{req.name}</td>
                              <td className="px-6 py-4">{req.company}</td>
                              <td className="px-6 py-4 text-blue-400 font-semibold">{req.email}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{req.phone}</td>
                              <td className="px-6 py-4 font-medium">{req.service_needed}</td>
                              <td className="px-6 py-4 max-w-[200px] truncate" title={req.project_description}>{req.project_description}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab Content 4: Staffing Requests */}
              {activeTab === 'staffing' && (
                <div className="flex-1 flex flex-col space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white text-left">IT Staffing Inquiries</h3>
                    <button
                      onClick={() => exportToCSV(staffing, 'staffing_requests.csv')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2 px-4 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors active:scale-95"
                    >
                      <Download size={14} />
                      Export CSV
                    </button>
                  </div>

                  <div className="border border-white/10 rounded-xl overflow-hidden bg-slate-950/60 overflow-x-auto text-left">
                    <table className="w-full text-xs text-slate-300 min-w-[700px]">
                      <thead className="bg-slate-900/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/10">
                        <tr>
                          <th className="px-6 py-3">Timestamp</th>
                          <th className="px-6 py-3">Name</th>
                          <th className="px-6 py-3">Company</th>
                          <th className="px-6 py-3">Contact</th>
                          <th className="px-6 py-3">Roles Needed</th>
                          <th className="px-6 py-3">Timeline</th>
                          <th className="px-6 py-3">Location</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {staffing.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="px-6 py-12 text-center text-slate-500 italic">No staffing requests logged yet.</td>
                          </tr>
                        ) : (
                          staffing.map((req) => (
                            <tr key={req.id} className="hover:bg-white/5 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-slate-500">{new Date(req.created_at).toLocaleString()}</td>
                              <td className="px-6 py-4 font-bold text-white">{req.name}</td>
                              <td className="px-6 py-4">{req.company}</td>
                              <td className="px-6 py-4">
                                <div className="font-semibold text-blue-400">{req.email}</div>
                                <div className="text-[10px] text-slate-500 mt-0.5">{req.phone}</div>
                              </td>
                              <td className="px-6 py-4 font-medium text-cyan-400">{req.roles}</td>
                              <td className="px-6 py-4">{req.timeline}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{req.location}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
