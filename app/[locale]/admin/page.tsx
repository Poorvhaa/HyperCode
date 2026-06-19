'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { useLocale } from 'next-intl';
import {
  Download,
  Users,
  MessageSquare,
  Calendar,
  TrendingUp,
  Search,
  Award,
  Activity,
  FileText,
  Clock,
  Plus,
  Trash2,
  Check,
  LogOut,
  Lock,
  Shield,
  Briefcase,
  Globe,
  Edit2,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import {
  db,
  Conversation,
  Message,
  QualifiedLead,
  ConsultationRequest,
  ContactInquiry,
  JobApplication,
  Candidate,
  ChatLead,
  NewsletterSubscriber,
  Article,
  CaseStudy,
  UserProfile,
  supabase
} from '@/lib/db';

export default function AdminPage() {
  const activeLocale = useLocale();

  // Authentication States
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userRole, setUserRole] = useState<'Admin' | 'Recruiter' | 'Consultant'>('Consultant');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Database Data States
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [leads, setLeads] = useState<QualifiedLead[]>([]);
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [chatLeads, setChatLeads] = useState<ChatLead[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);

  // UI Navigation States
  const [activeTab, setActiveTab] = useState<'conversations' | 'leads' | 'consultations' | 'inquiries' | 'applications' | 'candidates' | 'chatLeads' | 'subscribers' | 'cms' | 'analytics'>('conversations');
  const [cmsSubTab, setCmsSubTab] = useState<'articles' | 'case_studies'>('articles');
  const [selectedConversationId, setSelectedConversationId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // CMS Form States (Articles)
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [articleTitle, setArticleTitle] = useState('');
  const [articleSlug, setArticleSlug] = useState('');
  const [articleExcerpt, setArticleExcerpt] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articleCategory, setArticleCategory] = useState('Business Intelligence');
  const [articleLanguage, setArticleLanguage] = useState<'en' | 'es'>('en');
  const [articlePublished, setArticlePublished] = useState(false);

  // CMS Form States (Case Studies)
  const [editingCaseStudy, setEditingCaseStudy] = useState<Partial<CaseStudy> | null>(null);
  const [csTitle, setCsTitle] = useState('');
  const [csSlug, setCsSlug] = useState('');
  const [csIndustry, setCsIndustry] = useState('');
  const [csChallenge, setCsChallenge] = useState('');
  const [csSolution, setCsSolution] = useState('');
  const [csResults, setCsResults] = useState('');
  const [csLanguage, setCsLanguage] = useState<'en' | 'es'>('en');
  const [csPublished, setCsPublished] = useState(false);

  // Candidate Manual Form States
  const [showAddCandidate, setShowAddCandidate] = useState(false);
  const [candName, setCandName] = useState('');
  const [candEmail, setCandEmail] = useState('');
  const [candPhone, setCandPhone] = useState('');
  const [candLinkedin, setCandLinkedin] = useState('');
  const [candResumeUrl, setCandResumeUrl] = useState('');
  const [candSkills, setCandSkills] = useState('');
  const [candExp, setCandExp] = useState('');
  const [candLocation, setCandLocation] = useState('Remote / US');
  const [candStatus, setCandStatus] = useState<Candidate['status']>('Available');

  // Success Notification banner
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const showNotification = (type: 'success' | 'error', msg: string) => {
    setNotification({ type, message: msg });
    setTimeout(() => setNotification(null), 5000);
  };

  const isSupabaseConfigured = !!supabase;

  // 1. Check Authentication on Mount
  useEffect(() => {
    const checkAuth = async () => {
      setAuthLoading(true);
      if (supabase) {
        try {
          const { data: { session: curSess } } = await supabase.auth.getSession();
          setSession(curSess);
          if (curSess) {
            // Fetch User Profile Role from database
            const profile = await db.getUserProfile(curSess.user.id);
            if (profile) {
              setUserRole(profile.role);
            } else {
              // Create default profile if not exists
              const defProfile = await db.saveUserProfile(curSess.user.id, curSess.user.email || '', 'Consultant');
              setUserRole(defProfile.role);
            }
          }
        } catch (err) {
          console.error('Auth verification error:', err);
        }
      } else {
        // Offline / local storage development bypass
        const mockAuth = localStorage.getItem('hypercode_admin_mock_auth');
        if (mockAuth) {
          const parsed = JSON.parse(mockAuth);
          setSession({ user: { email: parsed.email } });
          setUserRole(parsed.role);
        }
      }
      setAuthLoading(false);
    };

    checkAuth();
  }, [isSupabaseConfigured]);

  // 2. Fetch Database Data when Authenticated
  useEffect(() => {
    if (!session && isSupabaseConfigured) return;

    const seedDummyDataIfEmpty = () => {
      // Seeds localstorage default data if in offline mockup mode
      if (typeof window === 'undefined') return;

      const convs = localStorage.getItem('hypercode_db_conversations');
      if (!convs || JSON.parse(convs).length === 0) {
        const dummyConvs = [
          { id: 'c1', session_id: 'sess_enterprise_finance', status: 'active', created_at: new Date(Date.now() - 3600000 * 2).toISOString() },
          { id: 'c2', session_id: 'sess_healthcare_bi', status: 'completed', created_at: new Date(Date.now() - 3600000 * 12).toISOString() },
        ];
        localStorage.setItem('hypercode_db_conversations', JSON.stringify(dummyConvs));

        const dummyMessages = [
          { id: 'm1', conversation_id: 'c1', sender: 'assistant', message: "Hello! I can help you with BI, Analytics, or Staffing. How can I assist you today?", created_at: new Date(Date.now() - 3600000 * 2).toISOString() },
          { id: 'm2', conversation_id: 'c1', sender: 'user', message: "I need BI consultants to optimize database telemetry.", created_at: new Date(Date.now() - 3600000 * 2 + 10000).toISOString() },
        ];
        localStorage.setItem('hypercode_db_messages', JSON.stringify(dummyMessages));

        const dummyLeads = [
          { id: 'l1', conversation_id: 'c1', company_type: 'Enterprise', service_interest: 'Business Intelligence', challenge: 'Optimize database telemetry.', timeline: 'Within 30 days', score: 5, created_at: new Date(Date.now() - 3600000 * 2).toISOString() }
        ];
        localStorage.setItem('hypercode_db_leads', JSON.stringify(dummyLeads));
      }
    };

    if (!isSupabaseConfigured) {
      seedDummyDataIfEmpty();
    }

    const loadDashboardData = async () => {
      try {
        const [
          convs,
          msgs,
          qLeads,
          cons,
          inqs,
          apps,
          cands,
          chLeads,
          subs,
          arts,
          studies
        ] = await Promise.all([
          db.getAllConversations(),
          db.getAllMessages(),
          db.getAllLeads(),
          db.getAllConsultations(),
          db.getAllContactInquiries(),
          db.getAllJobApplications(),
          db.getAllCandidates(),
          db.getAllChatLeads(),
          db.getNewsletterSubscribers(),
          db.getAllArticles(),
          db.getAllCaseStudies()
        ]);

        setConversations(convs);
        setMessages(msgs);
        setLeads(qLeads);
        setConsultations(cons);
        setInquiries(inqs);
        setApplications(apps);
        setCandidates(cands);
        setChatLeads(chLeads);
        setSubscribers(subs);
        setArticles(arts);
        setCaseStudies(studies);

        if (convs.length > 0) {
          setSelectedConversationId(convs[0].id);
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      }
    };

    loadDashboardData();
  }, [session, isSupabaseConfigured]);

  // Adjust active navigation tab based on RBAC roles if tabs are disallowed
  useEffect(() => {
    if (!session) return;
    if (userRole === 'Recruiter') {
      if (!['conversations', 'applications', 'candidates'].includes(activeTab)) {
        setActiveTab('applications');
      }
    } else if (userRole === 'Consultant') {
      if (!['conversations', 'leads', 'consultations', 'inquiries', 'chatLeads'].includes(activeTab)) {
        setActiveTab('conversations');
      }
    }
  }, [userRole, session, activeTab]);

  // Log In handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);

    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailInput,
        password: passwordInput,
      });

      if (error) {
        setLoginError(error.message);
        setLoggingIn(false);
      } else {
        setSession(data.session);
        const profile = await db.getUserProfile(data.session.user.id);
        setUserRole(profile?.role || 'Consultant');
        setLoggingIn(false);
      }
    } else {
      // Mock local bypass login
      const mockUser = { email: emailInput, role: emailInput.includes('recruiter') ? 'Recruiter' : emailInput.includes('consultant') ? 'Consultant' : 'Admin' };
      localStorage.setItem('hypercode_admin_mock_auth', JSON.stringify(mockUser));
      setSession({ user: { email: mockUser.email } });
      setUserRole(mockUser.role as any);
      setLoggingIn(false);
      showNotification('success', `Logged in as offline Mock ${mockUser.role}`);
    }
  };

  // Log Out handler
  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem('hypercode_admin_mock_auth');
    }
    setSession(null);
    setEmailInput('');
    setPasswordInput('');
  };

  // Change user role selector (Developer bypass tool for testing in offline mode)
  const handleRoleChangeBypass = (role: 'Admin' | 'Recruiter' | 'Consultant') => {
    setUserRole(role);
    if (!isSupabaseConfigured) {
      const mockAuth = JSON.parse(localStorage.getItem('hypercode_admin_mock_auth') || '{}');
      mockAuth.role = role;
      localStorage.setItem('hypercode_admin_mock_auth', JSON.stringify(mockAuth));
      showNotification('success', `Bypassed role changed to ${role}`);
    }
  };

  // Promoting Job Application to Candidate Talent Pool
  const promoteToCandidate = async (app: JobApplication) => {
    try {
      await db.saveCandidate({
        name: app.name,
        email: app.email,
        phone: app.phone,
        linkedin: app.linkedin,
        resume_url: app.resume_url,
        skills: app.skills,
        experience: `${app.years_experience} years`,
        availability: 'Available',
        location: 'Remote / US',
        status: 'Available'
      });

      // Update application status to Shortlisted
      await db.updateJobApplicationStatus(app.id, 'Shortlisted');

      // Reload databases
      const [updatedApps, updatedCands] = await Promise.all([
        db.getAllJobApplications(),
        db.getAllCandidates()
      ]);
      setApplications(updatedApps);
      setCandidates(updatedCands);

      showNotification('success', `Promoted ${app.name} to Recruiter Talent Pool.`);
    } catch (err) {
      console.error(err);
      showNotification('error', 'Promotion failed.');
    }
  };

  // Update Application Status
  const handleStatusChange = async (appId: string, status: JobApplication['status']) => {
    try {
      await db.updateJobApplicationStatus(appId, status);
      const updatedApps = await db.getAllJobApplications();
      setApplications(updatedApps);
      showNotification('success', 'Application status updated.');
    } catch (err) {
      console.error(err);
      showNotification('error', 'Status update failed.');
    }
  };

  // Delete Candidate
  const handleDeleteCandidate = async (id: string) => {
    if (!confirm('Are you sure you want to remove this candidate?')) return;
    try {
      await db.deleteCandidate(id);
      const list = await db.getAllCandidates();
      setCandidates(list);
      showNotification('success', 'Candidate removed from talent pool.');
    } catch (err) {
      console.error(err);
      showNotification('error', 'Failed to remove candidate.');
    }
  };

  // Add Candidate Manually
  const handleAddCandidateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await db.saveCandidate({
        name: candName,
        email: candEmail,
        phone: candPhone,
        linkedin: candLinkedin,
        resume_url: candResumeUrl || 'https://mock.hypercode.com/resumes/manual_entry.pdf',
        skills: candSkills,
        experience: candExp,
        location: candLocation,
        availability: 'Available',
        status: candStatus
      });

      const list = await db.getAllCandidates();
      setCandidates(list);

      // Reset Form
      setCandName('');
      setCandEmail('');
      setCandPhone('');
      setCandLinkedin('');
      setCandResumeUrl('');
      setCandSkills('');
      setCandExp('');
      setCandLocation('Remote / US');
      setCandStatus('Available');
      setShowAddCandidate(false);

      showNotification('success', 'Candidate manually registered.');
    } catch (err) {
      console.error(err);
      showNotification('error', 'Failed to save candidate.');
    }
  };

  // Save/Edit Article CMS
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleTitle || !articleSlug) {
      showNotification('error', 'Title and slug are required.');
      return;
    }

    try {
      await db.saveArticle({
        id: editingArticle?.id || undefined,
        slug: articleSlug,
        title: articleTitle,
        excerpt: articleExcerpt,
        content: articleContent,
        category: articleCategory,
        language: articleLanguage,
        published: articlePublished
      });

      const list = await db.getAllArticles();
      setArticles(list);

      // Reset
      setEditingArticle(null);
      setArticleTitle('');
      setArticleSlug('');
      setArticleExcerpt('');
      setArticleContent('');
      setArticleCategory('Business Intelligence');
      setArticleLanguage('en');
      setArticlePublished(false);

      showNotification('success', 'Article saved successfully.');
    } catch (err) {
      console.error(err);
      showNotification('error', 'Failed to save article.');
    }
  };

  // Edit Article trigger
  const handleStartEditArticle = (art: Article) => {
    setEditingArticle(art);
    setArticleTitle(art.title);
    setArticleSlug(art.slug);
    setArticleExcerpt(art.excerpt);
    setArticleContent(art.content);
    setArticleCategory(art.category);
    setArticleLanguage(art.language);
    setArticlePublished(art.published);
  };

  // Delete Article
  const handleDeleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      await db.deleteArticle(id);
      const list = await db.getAllArticles();
      setArticles(list);
      showNotification('success', 'Article deleted.');
    } catch (err) {
      console.error(err);
      showNotification('error', 'Failed to delete article.');
    }
  };

  // Save/Edit Case Study CMS
  const handleSaveCaseStudy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!csTitle || !csSlug) {
      showNotification('error', 'Title and slug are required.');
      return;
    }

    try {
      await db.saveCaseStudy({
        id: editingCaseStudy?.id || undefined,
        slug: csSlug,
        title: csTitle,
        client_industry: csIndustry,
        challenge: csChallenge,
        solution: csSolution,
        results: csResults,
        language: csLanguage,
        published: csPublished
      });

      const list = await db.getAllCaseStudies();
      setCaseStudies(list);

      // Reset
      setEditingCaseStudy(null);
      setCsTitle('');
      setCsSlug('');
      setCsIndustry('');
      setCsChallenge('');
      setCsSolution('');
      setCsResults('');
      setCsLanguage('en');
      setCsPublished(false);

      showNotification('success', 'Case study saved.');
    } catch (err) {
      console.error(err);
      showNotification('error', 'Failed to save case study.');
    }
  };

  // Edit Case Study trigger
  const handleStartEditCaseStudy = (cs: CaseStudy) => {
    setEditingCaseStudy(cs);
    setCsTitle(cs.title);
    setCsSlug(cs.slug);
    setCsIndustry(cs.client_industry);
    setCsChallenge(cs.challenge);
    setCsSolution(cs.solution);
    setCsResults(cs.results);
    setCsLanguage(cs.language);
    setCsPublished(cs.published);
  };

  // Delete Case Study
  const handleDeleteCaseStudy = async (id: string) => {
    if (!confirm('Are you sure you want to delete this case study?')) return;
    try {
      await db.deleteCaseStudy(id);
      const list = await db.getAllCaseStudies();
      setCaseStudies(list);
      showNotification('success', 'Case study deleted.');
    } catch (err) {
      console.error(err);
      showNotification('error', 'Failed to delete case study.');
    }
  };

  // Calculations for Funnel Fun & Charts
  const totalChats = conversations.length;
  const totalQualified = leads.length;
  const totalConsultations = consultations.length;
  const totalApplications = applications.length;
  const totalInquiries = inquiries.length;
  const totalSubscribers = subscribers.length;
  const totalChatLeads = chatLeads.length;

  const totalConversions = totalQualified + totalConsultations + totalApplications + totalInquiries + totalChatLeads;
  const conversionRate = totalChats > 0 ? ((totalConversions / totalChats) * 100).toFixed(1) : '0.0';

  // Filters logic
  const filteredInquiries = inquiries.filter(i => 
    i.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredConsultations = consultations.filter(c => 
    c.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.service_interest.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredApplications = applications.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.skills.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCandidates = candidates.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.skills.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);
  const selectedMessages = messages.filter(m => m.conversation_id === selectedConversationId);

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

  // Auth Loading State Render
  if (authLoading) {
    return (
      <main className="w-full min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-blue-500" size={32} />
          <p className="text-sm font-semibold tracking-wider text-slate-400 uppercase">Verifying Credentials...</p>
        </div>
      </main>
    );
  }

  // 1. If not authenticated, render Login Page
  if (!session) {
    return (
      <main className="w-full min-h-screen bg-slate-950 text-white flex flex-col justify-between">
        <Navigation />
        
        <section className="flex-1 flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 bg-slate-900/40 border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-sm">
            <div className="text-center space-y-2">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <Lock size={20} />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight">HyperCode Admin</h2>
              <p className="text-xs text-slate-400 font-medium">
                {isSupabaseConfigured 
                  ? "Access the consulting, leads, and staffing backend control center." 
                  : "Database is running offline. Enter any username/password to access."}
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl border border-red-500/20 bg-red-500/10 flex gap-2 text-xs text-red-400">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-4 rounded-md shadow-sm">
                <div className="space-y-1 text-left">
                  <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="admin@hypercode.com"
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-950 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                  />
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Password</label>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-950 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loggingIn}
                className="w-full py-3 px-4 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed border-none"
              >
                {loggingIn ? <Loader2 size={16} className="animate-spin mr-2" /> : null}
                <span>Sign In</span>
              </button>
            </form>

            {!isSupabaseConfigured && (
              <div className="text-center pt-2">
                <p className="text-[10px] text-amber-400 font-bold bg-amber-400/10 border border-amber-400/20 p-2.5 rounded-lg">
                  Offline Development Mode active. Enter email starting with 'recruiter' for Recruiter role, 'consultant' for Consultant role, or any other email for Admin role.
                </p>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  // 2. Render Main Admin Panel UI
  return (
    <main className="relative w-full min-h-screen bg-slate-950 text-white">
      <Navigation />

      {/* Header Info Section */}
      <section className="pt-32 pb-8 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Notification banner */}
          {notification && (
            <div className={`fixed top-24 right-6 z-50 p-4 rounded-xl border flex items-center gap-2.5 shadow-2xl ${
              notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}>
              {notification.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              <span className="text-xs font-semibold">{notification.message}</span>
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1.5 text-left">
              <div className="flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full w-fit">
                <Shield size={12} className="text-blue-400" />
                <span className="text-[10px] font-bold text-blue-400 tracking-wider uppercase">{userRole} PANEL</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
                HyperCode Control Center
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                Welcome back, <strong className="text-slate-350">{session?.user?.email}</strong>. Manage leads, review candidate CVs, write editorial CMS, and view metrics.
              </p>
            </div>

            {/* Actions Bar: Logout + Offline Role Bypass Tool */}
            <div className="flex flex-wrap items-center gap-3">
              {!isSupabaseConfigured && (
                <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 text-xs">
                  <span className="px-2 text-[10px] font-bold text-slate-400 uppercase">Test Role:</span>
                  <select
                    value={userRole}
                    onChange={(e) => handleRoleChangeBypass(e.target.value as any)}
                    className="bg-slate-900 border-none text-white text-xs font-bold rounded p-1 focus:outline-none"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Recruiter">Recruiter</option>
                    <option value="Consultant">Consultant</option>
                  </select>
                </div>
              )}
              
              <button
                onClick={handleLogout}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-semibold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Summary Row (Only show to Admins and Consultants) */}
      {['Admin', 'Consultant'].includes(userRole) && (
        <section className="py-6 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Metric 1 */}
              <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4 flex flex-col justify-between text-left">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">Total Chats</span>
                  <MessageSquare size={14} className="text-blue-400" />
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-bold">{totalChats}</span>
                  <p className="text-[9px] text-slate-500 mt-1">Chat bot sessions</p>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4 flex flex-col justify-between text-left">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">Contact Leads</span>
                  <TrendingUp size={14} className="text-emerald-400" />
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-bold">{totalInquiries}</span>
                  <p className="text-[9px] text-slate-500 mt-1">General web forms</p>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4 flex flex-col justify-between text-left">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">Consultations</span>
                  <Calendar size={14} className="text-purple-400" />
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-bold">{totalConsultations}</span>
                  <p className="text-[9px] text-slate-500 mt-1">Booked meetings</p>
                </div>
              </div>

              {/* Metric 4 */}
              <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4 flex flex-col justify-between text-left">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">Applications</span>
                  <Users size={14} className="text-cyan-400" />
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-bold">{totalApplications}</span>
                  <p className="text-[9px] text-slate-500 mt-1">Engineering applicants</p>
                </div>
              </div>

              {/* Metric 5 */}
              <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4 flex flex-col justify-between col-span-2 lg:col-span-1 text-left">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">Conversion Rate</span>
                  <Award size={14} className="text-amber-400" />
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-bold text-emerald-450">{conversionRate}%</span>
                  <p className="text-[9px] text-slate-500 mt-1">Sessions to lead</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Dashboard Panel */}
      <section className="pb-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-slate-900/30 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[600px] backdrop-blur-sm">
            
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-[260px] border-r border-white/10 flex flex-col bg-slate-950/20">
              <div className="p-4 border-b border-white/10 flex flex-col space-y-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-left">Dashboard Modules</span>
                <div className="flex flex-col gap-1 text-left">
                  
                  {/* Tabs accessible by Admin or Consultant */}
                  {['Admin', 'Consultant'].includes(userRole) && (
                    <>
                      <button
                        onClick={() => setActiveTab('conversations')}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold text-left transition-colors cursor-pointer flex items-center justify-between ${
                          activeTab === 'conversations' ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-slate-350'
                        }`}
                      >
                        <span className="flex items-center gap-2"><MessageSquare size={14} /> Chats Explorer</span>
                        <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">{totalChats}</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('leads')}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold text-left transition-colors cursor-pointer flex items-center justify-between ${
                          activeTab === 'leads' ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-slate-350'
                        }`}
                      >
                        <span className="flex items-center gap-2"><TrendingUp size={14} /> Qualified Leads</span>
                        <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">{totalQualified}</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('consultations')}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold text-left transition-colors cursor-pointer flex items-center justify-between ${
                          activeTab === 'consultations' ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-slate-350'
                        }`}
                      >
                        <span className="flex items-center gap-2"><Calendar size={14} /> Consultations</span>
                        <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">{totalConsultations}</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('inquiries')}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold text-left transition-colors cursor-pointer flex items-center justify-between ${
                          activeTab === 'inquiries' ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-slate-350'
                        }`}
                      >
                        <span className="flex items-center gap-2"><FileText size={14} /> Contact Inquiries</span>
                        <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">{totalInquiries}</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('chatLeads')}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold text-left transition-colors cursor-pointer flex items-center justify-between ${
                          activeTab === 'chatLeads' ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-slate-350'
                        }`}
                      >
                        <span className="flex items-center gap-2"><Activity size={14} /> Chatbot Captures</span>
                        <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">{totalChatLeads}</span>
                      </button>
                    </>
                  )}

                  {/* Tabs accessible by Admin or Recruiter */}
                  {['Admin', 'Recruiter'].includes(userRole) && (
                    <>
                      <button
                        onClick={() => setActiveTab('applications')}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold text-left transition-colors cursor-pointer flex items-center justify-between ${
                          activeTab === 'applications' ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-slate-350'
                        }`}
                      >
                        <span className="flex items-center gap-2"><Briefcase size={14} /> Careers Applications</span>
                        <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">{totalApplications}</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('candidates')}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold text-left transition-colors cursor-pointer flex items-center justify-between ${
                          activeTab === 'candidates' ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-slate-350'
                        }`}
                      >
                        <span className="flex items-center gap-2"><Users size={14} /> Candidates Pool</span>
                        <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">{candidates.length}</span>
                      </button>
                    </>
                  )}

                  {/* Admin Only Tabs */}
                  {userRole === 'Admin' && (
                    <>
                      <button
                        onClick={() => setActiveTab('subscribers')}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold text-left transition-colors cursor-pointer flex items-center justify-between ${
                          activeTab === 'subscribers' ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-slate-350'
                        }`}
                      >
                        <span className="flex items-center gap-2"><Globe size={14} /> Subscribers</span>
                        <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">{totalSubscribers}</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('cms')}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold text-left transition-colors cursor-pointer flex items-center justify-between ${
                          activeTab === 'cms' ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-slate-350'
                        }`}
                      >
                        <span className="flex items-center gap-2"><Edit2 size={14} /> Content CMS</span>
                        <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">{articles.length + caseStudies.length}</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Chat Session Picker (Only visible if active tab is conversations) */}
              {activeTab === 'conversations' && (
                <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-[300px] lg:max-h-none border-t lg:border-t-0 border-white/10">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-left block mb-1">Active Chats</span>
                  {conversations.length === 0 ? (
                    <div className="text-xs text-slate-650 text-center py-8">No chats logged.</div>
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
                          <span className="text-xs font-bold text-white truncate max-w-[130px]">{conv.session_id}</span>
                          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                            conv.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'
                          }`}>
                            {conv.status.toUpperCase()}
                          </span>
                        </div>
                        <span className="text-[9px] text-slate-500 mt-1 block">
                          {new Date(conv.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Dashboard Workspace */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col bg-slate-950/10 overflow-hidden">
              
              {/* Tab Header Search Bar */}
              {['leads', 'consultations', 'inquiries', 'applications', 'candidates'].includes(activeTab) && (
                <div className="mb-6 flex items-center bg-slate-900/50 border border-white/10 px-3.5 py-2.5 rounded-xl gap-2 w-full max-w-md">
                  <Search size={16} className="text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search by name, category, or skills...`}
                    className="bg-transparent border-none text-white text-xs placeholder:text-slate-550 w-full focus:outline-none"
                  />
                </div>
              )}

              {/* ----------------- Tab 1: Chat conversations Explorer ----------------- */}
              {activeTab === 'conversations' && (
                <div className="flex-1 flex flex-col space-y-6">
                  {selectedConversation ? (
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch flex-1">
                      {/* Transcript Panel */}
                      <div className="xl:col-span-2 flex flex-col border border-white/10 rounded-xl overflow-hidden bg-slate-950/60 min-h-[350px]">
                        <div className="px-4 py-3 bg-slate-900/60 border-b border-white/10 flex justify-between items-center text-xs">
                          <span className="font-bold text-white">CONVERSATION TRANSCRIPT</span>
                          <span className="text-slate-400">Session ID: {selectedConversation.session_id}</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[380px] text-left">
                          {selectedMessages.length === 0 ? (
                            <div className="text-xs text-slate-500 text-center py-12">No messages logged in this conversation.</div>
                          ) : (
                            selectedMessages.map((msg) => (
                              <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                <span className="text-[9px] text-slate-500 mb-0.5 font-semibold">
                                  {msg.sender === 'user' ? 'User' : 'HyperCode AI'}
                                </span>
                                <div className={`max-w-[80%] rounded-xl px-3.5 py-2 text-xs leading-relaxed whitespace-pre-line ${
                                  msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white/5 border border-white/5 text-slate-350'
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

                      {/* Lead Profiler Side-Panel */}
                      <div className="border border-white/10 rounded-xl p-4 bg-slate-900/40 text-left flex flex-col justify-between">
                        <div className="space-y-4">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block border-b border-white/10 pb-2">
                            Session Intelligence
                          </span>
                          <div className="space-y-3">
                            <div>
                              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Session Status</span>
                              <span className="text-xs font-bold text-white capitalize mt-0.5 block">{selectedConversation.status}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Started At</span>
                              <span className="text-xs font-bold text-white mt-0.5 block">{new Date(selectedConversation.created_at).toLocaleString()}</span>
                            </div>

                            {leads.find(l => l.conversation_id === selectedConversation.id) ? (
                              <div className="pt-4 border-t border-white/5 space-y-3">
                                {(() => {
                                  const lead = leads.find(l => l.conversation_id === selectedConversation.id)!;
                                  return (
                                    <>
                                      <div className="flex items-center justify-between">
                                        <span className="text-[10px] text-slate-400 font-bold uppercase">Lead Score</span>
                                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-xs font-extrabold">
                                          {lead.score}/6
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-[10px] text-slate-400 block font-semibold uppercase">Org Profile</span>
                                        <span className="text-xs font-bold text-white mt-0.5 block">{lead.company_type}</span>
                                      </div>
                                      <div>
                                        <span className="text-[10px] text-slate-400 block font-semibold uppercase">Topic Needed</span>
                                        <span className="text-xs font-bold text-blue-400 mt-0.5 block">{lead.service_interest}</span>
                                      </div>
                                      <div>
                                        <span className="text-[10px] text-slate-400 block font-semibold uppercase">Challenge</span>
                                        <p className="text-xs text-slate-350 mt-0.5 leading-relaxed bg-white/5 border border-white/5 p-2 rounded italic">
                                          "{lead.challenge}"
                                        </p>
                                      </div>
                                    </>
                                  );
                                })()}
                              </div>
                            ) : (
                              <div className="pt-4 border-t border-white/5 text-xs text-slate-500 italic">
                                Conversation active. Lead qualification flow not yet completed.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-slate-500 text-center py-24 flex-1">
                      No conversation selected. Make sure the chatbot is initialized.
                    </div>
                  )}
                </div>
              )}

              {/* ----------------- Tab 2: Qualified Leads database ----------------- */}
              {activeTab === 'leads' && (
                <div className="flex-1 flex flex-col space-y-4">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <h3 className="text-lg font-bold text-white text-left">AI Qualified Leads</h3>
                    <button
                      onClick={() => exportToCSV(leads, 'qualified_leads.csv')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2 px-4 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Download size={14} /> Export CSV
                    </button>
                  </div>
                  <div className="border border-white/10 rounded-xl overflow-hidden bg-slate-950/60 overflow-x-auto text-left">
                    <table className="w-full text-xs text-slate-300 min-w-[600px]">
                      <thead className="bg-slate-900/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/10">
                        <tr>
                          <th className="px-6 py-3">Timestamp</th>
                          <th className="px-6 py-3">Org Type</th>
                          <th className="px-6 py-3">Service Interest</th>
                          <th className="px-6 py-3">Identified Challenge</th>
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
                                  lead.score >= 5 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-550/10 text-slate-400'
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

              {/* ----------------- Tab 3: Consultation Bookings ----------------- */}
              {activeTab === 'consultations' && (
                <div className="flex-1 flex flex-col space-y-4">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <h3 className="text-lg font-bold text-white text-left">Consultation Requests</h3>
                    <button
                      onClick={() => exportToCSV(consultations, 'consultations.csv')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2 px-4 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Download size={14} /> Export CSV
                    </button>
                  </div>
                  <div className="border border-white/10 rounded-xl overflow-hidden bg-slate-950/60 overflow-x-auto text-left">
                    <table className="w-full text-xs text-slate-300 min-w-[700px]">
                      <thead className="bg-slate-900/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/10">
                        <tr>
                          <th className="px-6 py-3">Timestamp</th>
                          <th className="px-6 py-3">Company</th>
                          <th className="px-6 py-3">Name</th>
                          <th className="px-6 py-3">Email</th>
                          <th className="px-6 py-3">Phone</th>
                          <th className="px-6 py-3">Service Interest</th>
                          <th className="px-6 py-3">Budget</th>
                          <th className="px-6 py-3">Timeline</th>
                          <th className="px-6 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredConsultations.length === 0 ? (
                          <tr>
                            <td colSpan={9} className="px-6 py-12 text-center text-slate-500 italic">No consultations found matching your search.</td>
                          </tr>
                        ) : (
                          filteredConsultations.map((req) => (
                            <tr key={req.id} className="hover:bg-white/5 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-slate-500">{new Date(req.created_at).toLocaleString()}</td>
                              <td className="px-6 py-4 font-bold text-white">{req.company}</td>
                              <td className="px-6 py-4">{req.full_name}</td>
                              <td className="px-6 py-4 text-blue-400"><a href={`mailto:${req.email}`}>{req.email}</a></td>
                              <td className="px-6 py-4 whitespace-nowrap">{req.phone}</td>
                              <td className="px-6 py-4 font-semibold text-blue-400">{req.service_interest}</td>
                              <td className="px-6 py-4 text-emerald-400 font-bold">{req.budget || 'N/A'}</td>
                              <td className="px-6 py-4 text-amber-500 font-bold">{req.timeline || 'N/A'}</td>
                              <td className="px-6 py-4">
                                <span className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase ${
                                  req.status === 'scheduled' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'
                                }`}>
                                  {req.status}
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

              {/* ----------------- Tab 4: Contact Inquiries ----------------- */}
              {activeTab === 'inquiries' && (
                <div className="flex-1 flex flex-col space-y-4">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <h3 className="text-lg font-bold text-white text-left">Contact Inquiries</h3>
                    <button
                      onClick={() => exportToCSV(inquiries, 'contact_inquiries.csv')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2 px-4 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Download size={14} /> Export CSV
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
                          <th className="px-6 py-3">Subject</th>
                          <th className="px-6 py-3">Message</th>
                          <th className="px-6 py-3">Source</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredInquiries.length === 0 ? (
                          <tr>
                            <td colSpan={8} className="px-6 py-12 text-center text-slate-500 italic">No inquiries found matching your search.</td>
                          </tr>
                        ) : (
                          filteredInquiries.map((inq) => (
                            <tr key={inq.id} className="hover:bg-white/5 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-slate-500">{new Date(inq.created_at).toLocaleString()}</td>
                              <td className="px-6 py-4 font-bold text-white">{inq.full_name}</td>
                              <td className="px-6 py-4">{inq.company}</td>
                              <td className="px-6 py-4 text-blue-400"><a href={`mailto:${inq.email}`}>{inq.email}</a></td>
                              <td className="px-6 py-4 whitespace-nowrap">{inq.phone}</td>
                              <td className="px-6 py-4 font-semibold">{inq.subject}</td>
                              <td className="px-6 py-4 max-w-[200px] truncate" title={inq.message}>{inq.message}</td>
                              <td className="px-6 py-4">
                                <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px]">
                                  {inq.source}
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

              {/* ----------------- Tab 5: Chatbot Captures (chat_leads) ----------------- */}
              {activeTab === 'chatLeads' && (
                <div className="flex-1 flex flex-col space-y-4">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <h3 className="text-lg font-bold text-white text-left">Chatbot Lead Capture</h3>
                    <button
                      onClick={() => exportToCSV(chatLeads, 'chatbot_leads.csv')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2 px-4 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Download size={14} /> Export CSV
                    </button>
                  </div>
                  <div className="border border-white/10 rounded-xl overflow-hidden bg-slate-950/60 overflow-x-auto text-left">
                    <table className="w-full text-xs text-slate-300 min-w-[700px]">
                      <thead className="bg-slate-900/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/10">
                        <tr>
                          <th className="px-6 py-3">Timestamp</th>
                          <th className="px-6 py-3">Name</th>
                          <th className="px-6 py-3">Email</th>
                          <th className="px-6 py-3">Phone</th>
                          <th className="px-6 py-3">Service Interest</th>
                          <th className="px-6 py-3">Session Log Transcript Summary</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {chatLeads.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-slate-500 italic">No chatbot leads captured yet.</td>
                          </tr>
                        ) : (
                          chatLeads.map((l) => (
                            <tr key={l.id} className="hover:bg-white/5 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-slate-500">{new Date(l.created_at).toLocaleString()}</td>
                              <td className="px-6 py-4 font-bold text-white">{l.name}</td>
                              <td className="px-6 py-4 text-blue-400"><a href={`mailto:${l.email}`}>{l.email}</a></td>
                              <td className="px-6 py-4 whitespace-nowrap">{l.phone || 'N/A'}</td>
                              <td className="px-6 py-4 font-semibold text-cyan-400">{l.interest}</td>
                              <td className="px-6 py-4 max-w-[300px] truncate" title={l.conversation_summary}>{l.conversation_summary}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ----------------- Tab 6: Careers Applications ----------------- */}
              {activeTab === 'applications' && (
                <div className="flex-1 flex flex-col space-y-4">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <h3 className="text-lg font-bold text-white text-left">Careers Applications</h3>
                    <button
                      onClick={() => exportToCSV(applications, 'job_applications.csv')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2 px-4 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Download size={14} /> Export CSV
                    </button>
                  </div>
                  
                  <div className="border border-white/10 rounded-xl overflow-hidden bg-slate-950/60 overflow-x-auto text-left">
                    <table className="w-full text-xs text-slate-300 min-w-[700px]">
                      <thead className="bg-slate-900/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/10">
                        <tr>
                          <th className="px-6 py-3">Timestamp</th>
                          <th className="px-6 py-3">Applicant</th>
                          <th className="px-6 py-3">Position</th>
                          <th className="px-6 py-3">Experience</th>
                          <th className="px-6 py-3">Skills</th>
                          <th className="px-6 py-3">CV Resume</th>
                          <th className="px-6 py-3">Status</th>
                          <th className="px-6 py-3 text-center">Talent Pool</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredApplications.length === 0 ? (
                          <tr>
                            <td colSpan={8} className="px-6 py-12 text-center text-slate-500 italic">No job applications found matching your search.</td>
                          </tr>
                        ) : (
                          filteredApplications.map((app) => (
                            <tr key={app.id} className="hover:bg-white/5 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-slate-500">{new Date(app.created_at).toLocaleString()}</td>
                              <td className="px-6 py-4">
                                <p className="font-bold text-white">{app.name}</p>
                                <p className="text-[10px] text-slate-450 mt-0.5">{app.email}</p>
                                <p className="text-[10px] text-slate-450">{app.phone}</p>
                              </td>
                              <td className="px-6 py-4 font-semibold text-cyan-400">{app.position}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{app.years_experience} years</td>
                              <td className="px-6 py-4 max-w-[150px] truncate" title={app.skills}>{app.skills}</td>
                              <td className="px-6 py-4">
                                <a
                                  href={app.resume_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-450 hover:underline flex items-center gap-1"
                                >
                                  <FileText size={12} /> Download
                                </a>
                              </td>
                              <td className="px-6 py-4">
                                <select
                                  value={app.status}
                                  onChange={(e) => handleStatusChange(app.id, e.target.value as any)}
                                  className="bg-slate-900 border border-white/10 text-white rounded p-1 text-[11px] font-bold focus:outline-none"
                                >
                                  <option value="New">New</option>
                                  <option value="Reviewing">Reviewing</option>
                                  <option value="Shortlisted">Shortlisted</option>
                                  <option value="Interview">Interview</option>
                                  <option value="Offered">Offered</option>
                                  <option value="Hired">Hired</option>
                                  <option value="Rejected">Rejected</option>
                                </select>
                              </td>
                              <td className="px-6 py-4 text-center">
                                {app.status !== 'Shortlisted' && app.status !== 'Hired' ? (
                                  <button
                                    onClick={() => promoteToCandidate(app)}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold py-1 px-2.5 rounded-lg cursor-pointer border-none"
                                  >
                                    Promote
                                  </button>
                                ) : (
                                  <span className="text-[10px] text-emerald-450 font-bold flex items-center justify-center gap-0.5">
                                    <Check size={12} /> Promoted
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ----------------- Tab 7: Candidates Pool ----------------- */}
              {activeTab === 'candidates' && (
                <div className="flex-1 flex flex-col space-y-6">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <h3 className="text-lg font-bold text-white text-left">Recruiter Talent Pool</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowAddCandidate(!showAddCandidate)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2 px-4 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Plus size={14} /> Add Candidate
                      </button>
                      <button
                        onClick={() => exportToCSV(candidates, 'candidates_pool.csv')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2 px-4 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <Download size={14} /> Export CSV
                      </button>
                    </div>
                  </div>

                  {/* Manual Candidate Form Toggle */}
                  {showAddCandidate && (
                    <form onSubmit={handleAddCandidateSubmit} className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                      <h4 className="md:col-span-2 text-sm font-bold text-white border-b border-white/5 pb-2">Manual Candidate Registration</h4>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Full Name</label>
                        <input
                          type="text" required value={candName} onChange={(e) => setCandName(e.target.value)}
                          className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Email Address</label>
                        <input
                          type="email" required value={candEmail} onChange={(e) => setCandEmail(e.target.value)}
                          className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Phone Number</label>
                        <input
                          type="tel" value={candPhone} onChange={(e) => setCandPhone(e.target.value)}
                          className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">LinkedIn Profile Link</label>
                        <input
                          type="url" value={candLinkedin} onChange={(e) => setCandLinkedin(e.target.value)}
                          className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Experience</label>
                        <input
                          type="text" required value={candExp} onChange={(e) => setCandExp(e.target.value)}
                          placeholder="e.g. 5 years" className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Location</label>
                        <input
                          type="text" required value={candLocation} onChange={(e) => setCandLocation(e.target.value)}
                          className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-xs"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Primary Skills</label>
                        <input
                          type="text" required value={candSkills} onChange={(e) => setCandSkills(e.target.value)}
                          placeholder="e.g. SQL, Power BI, Python" className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-xs"
                        />
                      </div>
                      <div className="md:col-span-2 flex justify-end gap-2 pt-2">
                        <button
                          type="button" onClick={() => setShowAddCandidate(false)}
                          className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer text-slate-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer text-white border-none"
                        >
                          Save Candidate
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Candidate List Table */}
                  <div className="border border-white/10 rounded-xl overflow-hidden bg-slate-950/60 overflow-x-auto text-left">
                    <table className="w-full text-xs text-slate-300 min-w-[700px]">
                      <thead className="bg-slate-900/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/10">
                        <tr>
                          <th className="px-6 py-3">Candidate</th>
                          <th className="px-6 py-3">Skills</th>
                          <th className="px-6 py-3">Experience</th>
                          <th className="px-6 py-3">Location</th>
                          <th className="px-6 py-3">Status</th>
                          <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredCandidates.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-slate-500 italic">No candidates registered in pool.</td>
                          </tr>
                        ) : (
                          filteredCandidates.map((cand) => (
                            <tr key={cand.id} className="hover:bg-white/5 transition-colors">
                              <td className="px-6 py-4">
                                <p className="font-bold text-white">{cand.name}</p>
                                <p className="text-[10px] text-slate-450 mt-0.5">{cand.email}</p>
                                <p className="text-[10px] text-slate-450">{cand.phone}</p>
                                {cand.linkedin && <p className="text-[10px] text-blue-450"><a href={cand.linkedin} target="_blank">LinkedIn</a></p>}
                              </td>
                              <td className="px-6 py-4 max-w-[150px] truncate" title={cand.skills}>{cand.skills}</td>
                              <td className="px-6 py-4 font-semibold text-slate-200">{cand.experience}</td>
                              <td className="px-6 py-4">{cand.location}</td>
                              <td className="px-6 py-4">
                                <span className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase ${
                                  cand.status === 'Available' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/10 text-slate-400'
                                }`}>
                                  {cand.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <button
                                  onClick={() => handleDeleteCandidate(cand.id)}
                                  className="text-red-400 hover:text-red-300 p-2 cursor-pointer border-none bg-transparent"
                                  title="Delete Candidate"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ----------------- Tab 8: Subscribers ----------------- */}
              {activeTab === 'subscribers' && (
                <div className="flex-1 flex flex-col space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white text-left">Newsletter Subscribers</h3>
                    <button
                      onClick={() => exportToCSV(subscribers, 'subscribers.csv')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2 px-4 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Download size={14} /> Export CSV
                    </button>
                  </div>
                  <div className="border border-white/10 rounded-xl overflow-hidden bg-slate-950/60 overflow-x-auto text-left max-w-2xl">
                    <table className="w-full text-xs text-slate-300">
                      <thead className="bg-slate-900/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/10">
                        <tr>
                          <th className="px-6 py-3">Timestamp</th>
                          <th className="px-6 py-3">Subscriber Email</th>
                          <th className="px-6 py-3 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {subscribers.length === 0 ? (
                          <tr>
                            <td colSpan={3} className="px-6 py-12 text-center text-slate-500 italic">No subscribers logged.</td>
                          </tr>
                        ) : (
                          subscribers.map((s) => (
                            <tr key={s.id} className="hover:bg-white/5 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-slate-500">{new Date(s.created_at).toLocaleString()}</td>
                              <td className="px-6 py-4 font-semibold text-white">{s.email}</td>
                              <td className="px-6 py-4 text-center">
                                <span className="bg-green-500/10 text-green-400 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                                  {s.status}
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

              {/* ----------------- Tab 9: Content CMS (Articles & Case Studies) ----------------- */}
              {activeTab === 'cms' && (
                <div className="flex-1 flex flex-col space-y-6">
                  {/* CMS Toggles */}
                  <div className="flex border-b border-white/10 pb-2 gap-4">
                    <button
                      onClick={() => { setCmsSubTab('articles'); setEditingArticle(null); setEditingCaseStudy(null); }}
                      className={`pb-2 text-xs font-bold uppercase tracking-wider cursor-pointer ${
                        cmsSubTab === 'articles' ? 'border-b-2 border-blue-500 text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Articles / Insights
                    </button>
                    <button
                      onClick={() => { setCmsSubTab('case_studies'); setEditingArticle(null); setEditingCaseStudy(null); }}
                      className={`pb-2 text-xs font-bold uppercase tracking-wider cursor-pointer ${
                        cmsSubTab === 'case_studies' ? 'border-b-2 border-blue-500 text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Case Studies
                    </button>
                  </div>

                  {/* SUBTAB 1: Articles CMS */}
                  {cmsSubTab === 'articles' && (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start text-left">
                      {/* Editor form */}
                      <form onSubmit={handleSaveArticle} className="bg-slate-900/50 border border-white/10 p-6 rounded-2xl space-y-4">
                        <h4 className="text-sm font-bold text-white border-b border-white/5 pb-2">
                          {editingArticle ? 'Edit Article' : 'Create Article'}
                        </h4>
                        
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Title</label>
                          <input
                            type="text" required value={articleTitle} 
                            onChange={(e) => {
                              setArticleTitle(e.target.value);
                              if (!editingArticle) {
                                setArticleSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                              }
                            }}
                            className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-xs"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Slug</label>
                          <input
                            type="text" required value={articleSlug} onChange={(e) => setArticleSlug(e.target.value)}
                            className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-xs"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Excerpt</label>
                          <textarea
                            required value={articleExcerpt} onChange={(e) => setArticleExcerpt(e.target.value)} rows={2}
                            className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-xs resize-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase font-sans">Content HTML</label>
                          <textarea
                            required value={articleContent} onChange={(e) => setArticleContent(e.target.value)} rows={6}
                            className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-xs font-mono"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Category</label>
                            <select
                              value={articleCategory} onChange={(e) => setArticleCategory(e.target.value)}
                              className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-xs"
                            >
                              <option value="Business Intelligence">Business Intelligence</option>
                              <option value="Data Analytics">Data Analytics</option>
                              <option value="Data Warehousing">Data Warehousing</option>
                              <option value="Cloud Solutions">Cloud Solutions</option>
                              <option value="IT Staffing">IT Staffing</option>
                              <option value="Data Engineering">Data Engineering</option>
                              <option value="Web Development">Web Development</option>
                              <option value="Strategy">Strategy</option>
                            </select>
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Language</label>
                            <select
                              value={articleLanguage} onChange={(e) => setArticleLanguage(e.target.value as any)}
                              className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-xs"
                            >
                              <option value="en">English (en)</option>
                              <option value="es">Spanish (es)</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          <input
                            type="checkbox" id="artPub" checked={articlePublished} onChange={(e) => setArticlePublished(e.target.checked)}
                            className="h-4 w-4 bg-slate-950 border-white/10 rounded focus:ring-blue-500"
                          />
                          <label htmlFor="artPub" className="text-xs font-bold text-slate-350 cursor-pointer">Publish Article</label>
                        </div>

                        <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
                          {editingArticle && (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingArticle(null);
                                setArticleTitle('');
                                setArticleSlug('');
                                setArticleExcerpt('');
                                setArticleContent('');
                                setArticleLanguage('en');
                                setArticlePublished(false);
                              }}
                              className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer text-slate-300"
                            >
                              Cancel
                            </button>
                          )}
                          <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-xs font-bold cursor-pointer text-white border-none"
                          >
                            {editingArticle ? 'Save Changes' : 'Create Article'}
                          </button>
                        </div>
                      </form>

                      {/* Articles list */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Articles Registry</h4>
                        {articles.length === 0 ? (
                          <div className="text-xs text-slate-650 italic py-12 text-center bg-white/5 rounded-xl border border-white/5">No articles found in database.</div>
                        ) : (
                          articles.map((art) => (
                            <div key={art.id} className="p-4 rounded-xl border border-white/10 bg-slate-900/20 flex justify-between items-center gap-4">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                    art.published ? 'bg-green-500/10 text-green-400' : 'bg-slate-500/10 text-slate-400'
                                  }`}>
                                    {art.published ? 'PUBLISHED' : 'DRAFT'}
                                  </span>
                                  <span className="text-[10px] text-slate-500 font-bold uppercase">{art.category}</span>
                                  <span className="text-[9px] font-extrabold uppercase text-blue-400 bg-blue-500/10 px-1 rounded">{art.language}</span>
                                </div>
                                <h5 className="text-xs font-bold text-white truncate max-w-[200px] sm:max-w-xs">{art.title}</h5>
                                <p className="text-[10px] text-slate-500">/{art.slug}</p>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleStartEditArticle(art)}
                                  className="text-slate-400 hover:text-white p-2 cursor-pointer border-none bg-transparent"
                                  title="Edit Article"
                                >
                                  <Edit2 size={12} />
                                </button>
                                <button
                                  onClick={() => handleDeleteArticle(art.id)}
                                  className="text-red-400 hover:text-red-300 p-2 cursor-pointer border-none bg-transparent"
                                  title="Delete Article"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* SUBTAB 2: Case Studies CMS */}
                  {cmsSubTab === 'case_studies' && (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start text-left">
                      {/* Editor form */}
                      <form onSubmit={handleSaveCaseStudy} className="bg-slate-900/50 border border-white/10 p-6 rounded-2xl space-y-4">
                        <h4 className="text-sm font-bold text-white border-b border-white/5 pb-2">
                          {editingCaseStudy ? 'Edit Case Study' : 'Create Case Study'}
                        </h4>
                        
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase font-sans">Title</label>
                          <input
                            type="text" required value={csTitle} 
                            onChange={(e) => {
                              setCsTitle(e.target.value);
                              if (!editingCaseStudy) {
                                setCsSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                              }
                            }}
                            className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-xs"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Slug</label>
                            <input
                              type="text" required value={csSlug} onChange={(e) => setCsSlug(e.target.value)}
                              className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-xs"
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Client Industry</label>
                            <input
                              type="text" required value={csIndustry} onChange={(e) => setCsIndustry(e.target.value)}
                              placeholder="e.g. Healthcare, Finance" className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-xs"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Challenge Statement</label>
                          <textarea
                            required value={csChallenge} onChange={(e) => setCsChallenge(e.target.value)} rows={2}
                            className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-xs"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Solution Architected</label>
                          <textarea
                            required value={csSolution} onChange={(e) => setCsSolution(e.target.value)} rows={2}
                            className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-xs"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Results / Deliverables</label>
                          <textarea
                            required value={csResults} onChange={(e) => setCsResults(e.target.value)} rows={2}
                            className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-xs"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Language</label>
                            <select
                              value={csLanguage} onChange={(e) => setCsLanguage(e.target.value as any)}
                              className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-xs"
                            >
                              <option value="en">English (en)</option>
                              <option value="es">Spanish (es)</option>
                            </select>
                          </div>
                          
                          <div className="space-y-1 flex flex-col justify-end">
                            <div className="flex items-center gap-2 pb-2">
                              <input
                                type="checkbox" id="csPub" checked={csPublished} onChange={(e) => setCsPublished(e.target.checked)}
                                className="h-4 w-4 bg-slate-950 border-white/10 rounded focus:ring-blue-500"
                              />
                              <label htmlFor="csPub" className="text-xs font-bold text-slate-350 cursor-pointer">Publish</label>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
                          {editingCaseStudy && (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingCaseStudy(null);
                                setCsTitle('');
                                setCsSlug('');
                                setCsIndustry('');
                                setCsChallenge('');
                                setCsSolution('');
                                setCsResults('');
                                setCsLanguage('en');
                                setCsPublished(false);
                              }}
                              className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer text-slate-300"
                            >
                              Cancel
                            </button>
                          )}
                          <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-xs font-bold cursor-pointer text-white border-none"
                          >
                            {editingCaseStudy ? 'Save Changes' : 'Create Case Study'}
                          </button>
                        </div>
                      </form>

                      {/* Case Studies list */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Case Studies Registry</h4>
                        {caseStudies.length === 0 ? (
                          <div className="text-xs text-slate-650 italic py-12 text-center bg-white/5 rounded-xl border border-white/5">No case studies found in database.</div>
                        ) : (
                          caseStudies.map((cs) => (
                            <div key={cs.id} className="p-4 rounded-xl border border-white/10 bg-slate-900/20 flex justify-between items-center gap-4">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                    cs.published ? 'bg-green-500/10 text-green-400' : 'bg-slate-500/10 text-slate-400'
                                  }`}>
                                    {cs.published ? 'PUBLISHED' : 'DRAFT'}
                                  </span>
                                  <span className="text-[10px] text-slate-500 font-bold uppercase">{cs.client_industry}</span>
                                  <span className="text-[9px] font-extrabold uppercase text-blue-400 bg-blue-500/10 px-1 rounded">{cs.language}</span>
                                </div>
                                <h5 className="text-xs font-bold text-white truncate max-w-[200px] sm:max-w-xs">{cs.title}</h5>
                                <p className="text-[10px] text-slate-500">/{cs.slug}</p>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleStartEditCaseStudy(cs)}
                                  className="text-slate-400 hover:text-white p-2 cursor-pointer border-none bg-transparent"
                                  title="Edit Case Study"
                                >
                                  <Edit2 size={12} />
                                </button>
                                <button
                                  onClick={() => handleDeleteCaseStudy(cs.id)}
                                  className="text-red-400 hover:text-red-300 p-2 cursor-pointer border-none bg-transparent"
                                  title="Delete Case Study"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ----------------- Tab 10: Analytics ----------------- */}
              {activeTab === 'analytics' && (
                <div className="flex-1 flex flex-col space-y-8 text-left">
                  <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2">Business Lead Analytics</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Funnel chart */}
                    <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6">
                      <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Conversion Funnel</span>
                      <h4 className="text-sm font-semibold mt-1 mb-4 text-white">Incoming Sessions ➔ Captured Leads</h4>

                      <div className="space-y-4 pt-4">
                        {/* Stage 1 */}
                        <div>
                          <div className="flex justify-between items-center text-xs font-medium mb-1.5">
                            <span className="text-slate-350">1. Total Website Sessions (Chats)</span>
                            <span className="text-white font-bold">{totalChats}</span>
                          </div>
                          <div className="w-full h-3.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: '100%' }} />
                          </div>
                        </div>

                        {/* Stage 2 */}
                        <div>
                          <div className="flex justify-between items-center text-xs font-medium mb-1.5">
                            <span className="text-slate-350">2. Qualified Bot Leads</span>
                            <span className="text-emerald-450 font-bold">{totalQualified} ({totalChats > 0 ? ((totalQualified/totalChats)*100).toFixed(0) : 0}%)</span>
                          </div>
                          <div className="w-full h-3.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: totalChats > 0 ? `${(totalQualified/totalChats)*150}%` : '0%' }} />
                          </div>
                        </div>

                        {/* Stage 3 */}
                        <div>
                          <div className="flex justify-between items-center text-xs font-medium mb-1.5">
                            <span className="text-slate-350">3. Scheduled Consultation Inquiries</span>
                            <span className="text-purple-400 font-bold">{totalConsultations} ({totalChats > 0 ? ((totalConsultations/totalChats)*100).toFixed(0) : 0}%)</span>
                          </div>
                          <div className="w-full h-3.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 rounded-full" style={{ width: totalChats > 0 ? `${(totalConsultations/totalChats)*100}%` : '0%' }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Urgency distribution */}
                    <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6">
                      <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Project Urgency Mapping</span>
                      <h4 className="text-sm font-semibold mt-1 mb-4 text-white">Leads distributed by requested startup timeline</h4>

                      <div className="flex items-end justify-around h-36 pt-4 border-b border-white/10">
                        {/* Immediate */}
                        <div className="flex flex-col items-center w-1/4">
                          <span className="text-xs font-bold text-red-400 mb-1">{leads.filter(l => l.timeline === 'Immediately').length}</span>
                          <div className="w-8 bg-red-500 rounded-t-sm" style={{ height: `${(leads.filter(l => l.timeline === 'Immediately').length / Math.max(leads.length, 1)) * 90}px`, minHeight: '3px' }} />
                          <span className="text-[8px] text-slate-400 font-semibold tracking-wide mt-2 uppercase">Immediate</span>
                        </div>
                        {/* 30 Days */}
                        <div className="flex flex-col items-center w-1/4">
                          <span className="text-xs font-bold text-amber-500 mb-1">{leads.filter(l => l.timeline === 'Within 30 days').length}</span>
                          <div className="w-8 bg-amber-550 rounded-t-sm" style={{ height: `${(leads.filter(l => l.timeline === 'Within 30 days').length / Math.max(leads.length, 1)) * 90}px`, minHeight: '3px' }} />
                          <span className="text-[8px] text-slate-400 font-semibold tracking-wide mt-2 uppercase">30 Days</span>
                        </div>
                        {/* 1-3 mos */}
                        <div className="flex flex-col items-center w-1/4">
                          <span className="text-xs font-bold text-purple-400 mb-1">{leads.filter(l => l.timeline === '1–3 months').length}</span>
                          <div className="w-8 bg-purple-500 rounded-t-sm" style={{ height: `${(leads.filter(l => l.timeline === '1–3 months').length / Math.max(leads.length, 1)) * 90}px`, minHeight: '3px' }} />
                          <span className="text-[8px] text-slate-400 font-semibold tracking-wide mt-2 uppercase">1-3 Mos</span>
                        </div>
                        {/* explore */}
                        <div className="flex flex-col items-center w-1/4">
                          <span className="text-xs font-bold text-blue-400 mb-1">{leads.filter(l => l.timeline === 'Just exploring').length}</span>
                          <div className="w-8 bg-blue-500 rounded-t-sm" style={{ height: `${(leads.filter(l => l.timeline === 'Just exploring').length / Math.max(leads.length, 1)) * 90}px`, minHeight: '3px' }} />
                          <span className="text-[8px] text-slate-400 font-semibold tracking-wide mt-2 uppercase">Explore</span>
                        </div>
                      </div>
                    </div>
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
