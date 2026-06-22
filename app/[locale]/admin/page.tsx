'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import {
  Download,
  Users,
  MessageSquare,
  Search,
  Award,
  FileText,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  AlertCircle,
  Eye,
  Copy,
  ChevronRight,
  X,
  UserPlus,
  Mail,
  Briefcase,
  User,
  Shield,
  Globe
} from 'lucide-react';
import {
  db,
  Conversation,
  Message,
  ContactInquiry,
  ConsultationRequest,
  JobApplication,
  Candidate,
  ChatLead,
  NewsletterSubscriber,
  Article,
  CaseStudy,
  UserProfile,
  CompanySettings,
  EmailTemplate,
  supabase
} from '@/lib/db';
import AdminSidebar from '@/components/admin/Sidebar';

export default function AdminDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const activeLocale = (params?.locale as string) || 'en';

  // Authentication States
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userRole, setUserRole] = useState<'Admin' | 'Recruiter' | 'Consultant'>('Consultant');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Database Data States
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [chatLeads, setChatLeads] = useState<ChatLead[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);

  // Settings Data States
  const [companySettings, setCompanySettings] = useState<CompanySettings | null>(null);
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);

  // UI Navigation States
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'applications' | 'candidates' | 'cms' | 'subscribers' | 'settings'>('dashboard');
  const [leadsSubTab, setLeadsSubTab] = useState<'inquiries' | 'consultations' | 'chatLeads'>('inquiries');
  const [careersSubTab, setCareersSubTab] = useState<'applications' | 'pipeline' | 'candidates'>('applications');
  const [cmsSubTab, setCmsSubTab] = useState<'articles' | 'case_studies'>('articles');
  const [settingsSubTab, setSettingsSubTab] = useState<'profile' | 'templates' | 'users'>('profile');

  // Selected Lead Drawer State
  const [selectedLead, setSelectedLead] = useState<{ type: 'contact' | 'consultation' | 'chat'; data: any } | null>(null);

  // Selected Chat Log State (Chatbot Conversation Viewer)
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [languageFilter, setLanguageFilter] = useState('All');
  const [experienceFilter, setExperienceFilter] = useState('All');
  const [skillsFilter, setSkillsFilter] = useState('');

  // CMS Editor Modal/Form States (Articles)
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [articleTitle, setArticleTitle] = useState('');
  const [articleSlug, setArticleSlug] = useState('');
  const [articleExcerpt, setArticleExcerpt] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articleCategory, setArticleCategory] = useState('Business Intelligence');
  const [articleLanguage, setArticleLanguage] = useState<'en' | 'es'>('en');
  const [articlePublished, setArticlePublished] = useState(false);
  const [articleFeaturedImage, setFeaturedImage] = useState('');
  const [articleAuthorName, setAuthorName] = useState('');
  const [articleAuthorRole, setAuthorRole] = useState('');
  const [articleAuthorAvatar, setAuthorAvatar] = useState('');
  const [articleReadingTime, setReadingTime] = useState('');
  const [articlePreviewMode, setArticlePreviewMode] = useState(false);

  // CMS Editor Modal/Form States (Case Studies)
  const [editingCaseStudy, setEditingCaseStudy] = useState<Partial<CaseStudy> | null>(null);
  const [csTitle, setCsTitle] = useState('');
  const [csSlug, setCsSlug] = useState('');
  const [csIndustry, setCsIndustry] = useState('');
  const [csChallenge, setCsChallenge] = useState('');
  const [csSolution, setCsSolution] = useState('');
  const [csResults, setCsResults] = useState('');
  const [csLanguage, setCsLanguage] = useState<'en' | 'es'>('en');
  const [csPublished, setCsPublished] = useState(false);
  const [csTechnologies, setCsTechnologies] = useState('');
  const [csFeaturedImage, setCsFeaturedImage] = useState('');

  // Candidate manual entry form
  const [showAddCandidate, setShowAddCandidate] = useState(false);
  const [candName, setCandName] = useState('');
  const [candEmail, setCandEmail] = useState('');
  const [candPhone, setCandPhone] = useState('');
  const [candLinkedin, setCandLinkedin] = useState('');
  const [candResumeUrl, setCandResumeUrl] = useState('');
  const [candSkills, setCandSkills] = useState('');
  const [candExp, setCandExp] = useState('');
  const [candLocation, setCandLocation] = useState('Remote / US');
  const [candStatus, setCandStatus] = useState<'Available' | 'Reviewing' | 'Interviewing' | 'Placed' | 'Inactive'>('Available');

  // Settings Form States
  const [settingsName, setSettingsName] = useState('');
  const [settingsEmail, setSettingsEmail] = useState('');
  const [settingsPhone, setSettingsPhone] = useState('');
  const [settingsAddress, setSettingsAddress] = useState('');
  const [settingsLinkedin, setSettingsLinkedin] = useState('');
  const [settingsGithub, setSettingsGithub] = useState('');

  // User accounts manager states
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState<'Admin' | 'Recruiter' | 'Consultant'>('Consultant');

  // Success/Error Alerts
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const showNotification = (type: 'success' | 'error', msg: string) => {
    setNotification({ type, message: msg });
    setTimeout(() => setNotification(null), 5000);
  };

  const isSupabaseConfigured = !!supabase;

  // 1. Check Authentication & Load Profile on Mount
  useEffect(() => {
    const checkAuth = async () => {
      setAuthLoading(true);
      if (supabase) {
        try {
          const { data: { session: curSess } } = await supabase.auth.getSession();
          setSession(curSess);
          if (curSess) {
            const profile = await db.getUserProfile(curSess.user.id);
            if (profile) {
              if (!profile.is_active) {
                showNotification('error', 'Account is deactivated.');
                await supabase.auth.signOut();
                router.push(`/${activeLocale}/admin/login`);
                return;
              }
              setUserRole(profile.role);
              setUserProfile(profile);
            } else {
              // Create default profile for dev bypass
              const defProfile = await db.saveUserProfile(curSess.user.id, curSess.user.email || '', 'Consultant');
              setUserRole(defProfile.role);
              setUserProfile(defProfile);
            }
          } else {
            router.push(`/${activeLocale}/admin/login`);
          }
        } catch (err) {
          console.error('Auth verification error:', err);
        }
      } else {
        // Fallback Mock local bypass auth
        const mockAuth = localStorage.getItem('hypercode_admin_mock_auth');
        if (mockAuth) {
          const parsed = JSON.parse(mockAuth);
          setSession({ user: { email: parsed.email } });
          setUserRole(parsed.role);
          setUserProfile(parsed);
        } else {
          router.push(`/${activeLocale}/admin/login`);
        }
      }
      setAuthLoading(false);
    };

    checkAuth();
  }, [activeLocale]);

  // 2. Fetch Data based on Auth & User Role permissions
  useEffect(() => {
    if (!session) return;

    const loadDashboardData = async () => {
      try {
        const [
          convs,
          msgs,
          inqs,
          cons,
          apps,
          cands,
          chLeads,
          subs,
          arts,
          studies
        ] = await Promise.all([
          db.getAllConversations(),
          db.getAllMessages(),
          db.getAllContactInquiries(),
          db.getAllConsultations(),
          db.getAllJobApplications(),
          db.getAllCandidates(),
          db.getAllChatLeads(),
          db.getNewsletterSubscribers(),
          db.getAllArticles(),
          db.getAllCaseStudies()
        ]);

        setConversations(convs);
        setMessages(msgs);
        setInquiries(inqs);
        setConsultations(cons);
        setApplications(apps);
        setCandidates(cands);
        setChatLeads(chLeads);
        setSubscribers(subs);
        setArticles(arts);
        setCaseStudies(studies);

        // Fetch company profile settings
        const settings = await db.getCompanySettings();
        setCompanySettings(settings);
        setSettingsName(settings.company_name);
        setSettingsEmail(settings.email);
        setSettingsPhone(settings.phone || '');
        setSettingsAddress(settings.address || '');
        setSettingsLinkedin(settings.social_links?.linkedin || '');
        setSettingsGithub(settings.social_links?.github || '');

        // Fetch email templates
        const templates = await db.getEmailTemplates();
        setEmailTemplates(templates);

        // Fetch user profiles (Admin only)
        if (userRole === 'Admin') {
          const profiles = await db.getAllUserProfiles();
          setUserProfiles(profiles);
        }

        // Set default active tab based on role
        if (userRole === 'Recruiter') {
          setActiveTab('applications');
        } else if (userRole === 'Consultant') {
          setActiveTab('leads');
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      }
    };

    loadDashboardData();
  }, [session, userRole]);

  // 3. Tab Gating (RBAC Protection)
  useEffect(() => {
    if (!session) return;
    if (userRole === 'Recruiter') {
      if (!['applications', 'candidates'].includes(activeTab)) {
        setActiveTab('applications');
      }
    } else if (userRole === 'Consultant') {
      if (!['leads'].includes(activeTab)) {
        setActiveTab('leads');
      }
    }
  }, [activeTab, userRole, session]);

  if (authLoading || (session && !userProfile)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0F4C81]"></div>
      </div>
    );
  }

  // --- ACTIONS & MUTATIONS ---

  // Unified Lead Status Changer
  const handleLeadStatusChange = async (type: 'contact' | 'consultation' | 'chat', id: string, status: any) => {
    try {
      await db.updateLeadStatus(type, id, status);
      showNotification('success', 'Lead status updated.');

      // Refresh state
      if (type === 'contact') {
        const inqs = await db.getAllContactInquiries();
        setInquiries(inqs);
        if (selectedLead && selectedLead.data.id === id) {
          setSelectedLead({ type, data: inqs.find(x => x.id === id) });
        }
      } else if (type === 'consultation') {
        const cons = await db.getAllConsultations();
        setConsultations(cons);
        if (selectedLead && selectedLead.data.id === id) {
          setSelectedLead({ type, data: cons.find(x => x.id === id) });
        }
      } else if (type === 'chat') {
        const chat = await db.getAllChatLeads();
        setChatLeads(chat);
        if (selectedLead && selectedLead.data.id === id) {
          setSelectedLead({ type, data: chat.find(x => x.id === id) });
        }
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Status update failed.');
    }
  };

  // Job application promotion to candidate pool
  const promoteToCandidate = async (app: JobApplication) => {
    try {
      await db.saveCandidate({
        name: app.name,
        email: app.email,
        phone: app.phone,
        linkedin: app.linkedin,
        resume_url: app.resume_url,
        skills: app.skills || '',
        experience: `${app.years_experience || 0} years`,
        availability: 'Available',
        location: 'Remote / US',
        status: 'Available'
      });

      // Update application status to Shortlisted
      await db.updateJobApplicationStatus(app.id, 'Shortlisted');

      const [updatedApps, updatedCands] = await Promise.all([
        db.getAllJobApplications(),
        db.getAllCandidates()
      ]);
      setApplications(updatedApps);
      setCandidates(updatedCands);

      showNotification('success', `Promoted ${app.name} to candidate talent pool.`);
    } catch (err) {
      console.error(err);
      showNotification('error', 'Promotion failed.');
    }
  };

  const handleApplicationStatusChange = async (id: string, status: any) => {
    try {
      await db.updateJobApplicationStatus(id, status);
      const updatedApps = await db.getAllJobApplications();
      setApplications(updatedApps);
      showNotification('success', 'Application status updated.');
    } catch (err) {
      console.error(err);
      showNotification('error', 'Failed to update status.');
    }
  };

  // HTML5 Drag & Drop pipeline update
  const handleDragStart = (e: React.DragEvent, appId: string) => {
    e.dataTransfer.setData('text/plain', appId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, status: any) => {
    e.preventDefault();
    const appId = e.dataTransfer.getData('text/plain');
    if (appId) {
      await handleApplicationStatusChange(appId, status);
    }
  };

  // Candidate delete
  const handleDeleteCandidate = async (id: string) => {
    if (!confirm('Are you sure you want to delete this candidate?')) return;
    try {
      await db.deleteCandidate(id);
      setCandidates(await db.getAllCandidates());
      showNotification('success', 'Candidate profile deleted.');
    } catch (err) {
      console.error(err);
      showNotification('error', 'Failed to delete candidate.');
    }
  };

  // Add Candidate manual entry
  const handleAddCandidate = async (e: React.FormEvent) => {
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

      setCandidates(await db.getAllCandidates());
      setShowAddCandidate(false);
      // Reset
      setCandName('');
      setCandEmail('');
      setCandPhone('');
      setCandLinkedin('');
      setCandResumeUrl('');
      setCandSkills('');
      setCandExp('');
      showNotification('success', 'Candidate registered successfully.');
    } catch (err) {
      console.error(err);
      showNotification('error', 'Registration failed.');
    }
  };

  // Newsletter CSV Exporter
  const exportSubscribersCSV = () => {
    const headers = ['Email', 'Language', 'Status', 'Source Page', 'Date Joined'];
    const rows = subscribers.map(s => [
      s.email,
      s.language || 'en',
      s.status,
      s.source_page || '',
      new Date(s.created_at).toLocaleDateString()
    ]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('success', 'CSV export triggered.');
  };

  // Newsletter Delete Subscriber
  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm('Are you sure you want to unsubscribe/remove this email?')) return;
    try {
      await db.deleteNewsletterSubscriber(id);
      setSubscribers(await db.getNewsletterSubscribers());
      showNotification('success', 'Subscriber removed.');
    } catch (err) {
      console.error(err);
      showNotification('error', 'Failed to remove subscriber.');
    }
  };

  // CMS Article save/create/edit
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
        is_published: articlePublished,
        featured_image: articleFeaturedImage || null,
        reading_time: articleReadingTime || null,
        author: articleAuthorName ? {
          name: articleAuthorName,
          role: articleAuthorRole,
          avatar: articleAuthorAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80'
        } : null
      });

      setArticles(await db.getAllArticles());
      setEditingArticle(null);
      showNotification('success', 'Article saved successfully.');
    } catch (err) {
      console.error(err);
      showNotification('error', 'Failed to save article.');
    }
  };

  // CMS Article delete
  const handleDeleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      await db.deleteArticle(id);
      setArticles(await db.getAllArticles());
      showNotification('success', 'Article deleted.');
    } catch (err) {
      console.error(err);
      showNotification('error', 'Failed to delete article.');
    }
  };

  // CMS Article duplicate
  const handleDuplicateArticle = async (art: Article) => {
    try {
      await db.saveArticle({
        title: `${art.title} (Copy)`,
        slug: `${art.slug}-copy-${Math.floor(Math.random() * 1000)}`,
        excerpt: art.excerpt,
        content: art.content,
        category: art.category,
        language: art.language,
        is_published: false,
        featured_image: art.featured_image,
        author: art.author,
        reading_time: art.reading_time
      });

      setArticles(await db.getAllArticles());
      showNotification('success', 'Article duplicated as Draft.');
    } catch (err) {
      console.error(err);
      showNotification('error', 'Failed to duplicate article.');
    }
  };

  // CMS Case Study save/create/edit
  const handleSaveCaseStudy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!csTitle || !csSlug) {
      showNotification('error', 'Title and slug are required.');
      return;
    }

    try {
      await db.saveCaseStudy({
        id: editingCaseStudy?.id || undefined,
        title: csTitle,
        slug: csSlug,
        industry: csIndustry,
        challenge: csChallenge,
        solution: csSolution,
        results: csResults,
        technologies: csTechnologies || null,
        featured_image: csFeaturedImage || null,
        language: csLanguage,
        is_published: csPublished,
        client_type: 'Enterprise',
        published_date: new Date().toISOString()
      });

      setCaseStudies(await db.getAllCaseStudies());
      setEditingCaseStudy(null);
      showNotification('success', 'Case study saved successfully.');
    } catch (err) {
      console.error(err);
      showNotification('error', 'Failed to save case study.');
    }
  };

  // CMS Case Study delete
  const handleDeleteCaseStudy = async (id: string) => {
    if (!confirm('Are you sure you want to delete this case study?')) return;
    try {
      await db.deleteCaseStudy(id);
      setCaseStudies(await db.getAllCaseStudies());
      showNotification('success', 'Case study deleted.');
    } catch (err) {
      console.error(err);
      showNotification('error', 'Failed to delete case study.');
    }
  };

  // Settings Save Company Profile
  const handleSaveCompanyProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = session?.access_token;
    try {
      if (isSupabaseConfigured) {
        const res = await fetch('/api/admin/settings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            type: 'company',
            company_name: settingsName,
            email: settingsEmail,
            phone: settingsPhone,
            address: settingsAddress,
            social_links: { linkedin: settingsLinkedin, github: settingsGithub }
          })
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setCompanySettings(data.settings);
      } else {
        const updated = await db.saveCompanySettings({
          company_name: settingsName,
          email: settingsEmail,
          phone: settingsPhone,
          address: settingsAddress,
          social_links: { linkedin: settingsLinkedin, github: settingsGithub }
        });
        setCompanySettings(updated);
      }
      showNotification('success', 'Company profile settings updated.');
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to update company settings.');
    }
  };

  // Settings Save Email Template
  const handleSaveEmailTemplate = async (templateId: string, subject: string, body: string) => {
    const token = session?.access_token;
    try {
      if (isSupabaseConfigured) {
        const res = await fetch('/api/admin/settings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ type: 'template', id: templateId, subject, body })
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
      } else {
        await db.saveEmailTemplate(templateId, subject, body);
      }
      setEmailTemplates(await db.getEmailTemplates());
      showNotification('success', `Email template "${templateId}" updated.`);
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to update email template.');
    }
  };

  // Settings Add Admin/User account
  const handleAddUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = session?.access_token;
    try {
      if (isSupabaseConfigured) {
        const res = await fetch('/api/admin/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            action: 'create',
            email: newUserEmail,
            password: newUserPassword,
            role: newUserRole,
            name: newUserName
          })
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setUserProfiles(await db.getAllUserProfiles());
      } else {
        await db.saveUserProfile(
          Math.random().toString(),
          newUserEmail,
          newUserRole,
          newUserName,
          `https://images.unsplash.com/photo-${1535713875002-d1d0cf377fde}?auto=format&fit=crop&w=100&h=100&q=80`
        );
      }
      setShowAddUser(false);
      setNewUserEmail('');
      setNewUserPassword('');
      setNewUserName('');
      showNotification('success', 'User profile added successfully.');
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to create user account.');
    }
  };

  const handleUserStatusToggle = async (userId: string, currentStatus: boolean) => {
    const token = session?.access_token;
    try {
      if (isSupabaseConfigured) {
        const res = await fetch('/api/admin/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            action: 'toggle_active',
            userId,
            is_active: !currentStatus
          })
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setUserProfiles(await db.getAllUserProfiles());
      } else {
        const list = await db.getAllUserProfiles();
        const user = list.find(u => u.id === userId);
        if (user) {
          await db.saveUserProfile(userId, user.email, user.role, user.name, user.avatar, !currentStatus);
        }
      }
      showNotification('success', 'User status changed.');
    } catch (err: any) {
      showNotification('error', err.message || 'Status update failed.');
    }
  };

  // Helper text-area formatter for Articles markdown editing
  const formatTextArea = (type: 'bold' | 'italic' | 'h2' | 'link' | 'quote' | 'code' | 'list') => {
    const textarea = document.getElementById('article-content-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    let formatted = '';

    switch (type) {
      case 'bold':
        formatted = `**${selected || 'bold text'}**`;
        break;
      case 'italic':
        formatted = `*${selected || 'italic text'}*`;
        break;
      case 'h2':
        formatted = `\n## ${selected || 'Heading'}\n`;
        break;
      case 'link':
        formatted = `[${selected || 'Link Text'}](https://example.com)`;
        break;
      case 'quote':
        formatted = `\n> ${selected || 'Blockquote'}\n`;
        break;
      case 'code':
        formatted = `\`\`\`\n${selected || 'code block'}\n\`\`\``;
        break;
      case 'list':
        formatted = `\n* ${selected || 'list item'}`;
        break;
    }

    const newValue = text.substring(0, start) + formatted + text.substring(end);
    setArticleContent(newValue);
    textarea.focus();
    setTimeout(() => {
      textarea.setSelectionRange(start + 2, start + 2 + (selected ? selected.length : 9));
    }, 50);
  };

  // --- FILTERS & SEARCH PROCESSORS ---
  const processSearch = (items: any[], fields: string[]) => {
    return items.filter(item => {
      const query = searchQuery.toLowerCase();
      // Match query in any of the specified fields
      const matchesQuery = query === '' || fields.some(field => {
        const val = item[field];
        if (typeof val === 'string') return val.toLowerCase().includes(query);
        return false;
      });

      // Match status if checked
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

      // Match language if checked
      const matchesLanguage = languageFilter === 'All' || item.language === languageFilter;

      return matchesQuery && matchesStatus && matchesLanguage;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <AdminSidebar userProfile={userProfile} activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 p-8 overflow-y-auto max-w-7xl mx-auto w-full relative">
        {/* Global Notifications Banner */}
        {notification && (
          <div className={`fixed top-6 right-6 z-50 p-4 rounded-xl border shadow-xl flex items-center gap-3 animate-slideIn ${
            notification.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="text-sm font-semibold">{notification.message}</span>
            <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* =========================================================================
            OVERVIEW DASHBOARD TAB
            ========================================================================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="text-left">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {activeLocale === 'es' ? 'Panel de Administración' : 'Admin Overview'}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {activeLocale === 'es' ? 'Resumen general de operaciones de HyperCode' : 'HyperCode central operational dashboard'}
              </p>
            </div>

            {/* KPI Counts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div onClick={() => { setActiveTab('leads'); setLeadsSubTab('inquiries'); }} className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all text-left flex flex-col justify-between h-28 cursor-pointer group">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Leads</span>
                  <div className="p-1.5 rounded-lg bg-blue-50 text-[#0F4C81]">
                    <FileText className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold text-slate-900">{inquiries.length + consultations.length + chatLeads.length}</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-[#0F4C81] flex items-center font-semibold">
                    {activeLocale === 'es' ? 'Ver todos' : 'View all'} <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
              </div>

              <div onClick={() => { setActiveTab('applications'); setCareersSubTab('applications'); }} className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all text-left flex flex-col justify-between h-28 cursor-pointer group">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Job Applications</span>
                  <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                    <Briefcase className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold text-slate-900">{applications.length}</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-indigo-600 flex items-center font-semibold">
                    {activeLocale === 'es' ? 'Ver todas' : 'View all'} <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
              </div>

              <div onClick={() => { setActiveTab('candidates'); setCareersSubTab('candidates'); }} className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all text-left flex flex-col justify-between h-28 cursor-pointer group">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Candidate Pool</span>
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold text-slate-900">{candidates.length}</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-emerald-600 flex items-center font-semibold">
                    {activeLocale === 'es' ? 'Ver candidatos' : 'View candidates'} <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
              </div>

              <div onClick={() => { if (userRole === 'Admin') setActiveTab('subscribers'); }} className={`bg-white p-5 border border-slate-200 rounded-2xl shadow-sm text-left flex flex-col justify-between h-28 ${userRole === 'Admin' ? 'hover:shadow-md hover:border-slate-300 cursor-pointer group' : ''}`}>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subscribers</span>
                  <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                    <Mail className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold text-slate-900">{subscribers.filter(s => s.status === 'subscribed').length}</span>
                  {userRole === 'Admin' && (
                    <span className="text-[10px] text-slate-400 group-hover:text-purple-600 flex items-center font-semibold">
                      {activeLocale === 'es' ? 'Ver suscriptores' : 'View list'} <ChevronRight className="w-3 h-3 ml-0.5" />
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Sub-KPI CMS count */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm text-left flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{activeLocale === 'es' ? 'Artículos Publicados' : 'Articles Published'}</h4>
                  <span className="text-3xl font-bold text-slate-800 mt-2 block">{articles.filter(a => a.is_published).length}</span>
                </div>
                <div className="p-3 bg-blue-50 text-[#0F4C81] rounded-2xl">
                  <Globe className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm text-left flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{activeLocale === 'es' ? 'Casos de Estudio Publicados' : 'Case Studies Published'}</h4>
                  <span className="text-3xl font-bold text-slate-800 mt-2 block">{caseStudies.filter(c => c.is_published).length}</span>
                </div>
                <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl">
                  <Award className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Quick Activity lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
              {/* Recent leads table */}
              <div className="bg-white p-6 border border-slate-200 rounded-2xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-slate-800 tracking-tight">{activeLocale === 'es' ? 'Prospectos Recientes' : 'Recent Inquiries'}</h3>
                  <button onClick={() => setActiveTab('leads')} className="text-xs font-bold text-[#0F4C81] hover:underline flex items-center gap-1 cursor-pointer">
                    {activeLocale === 'es' ? 'Ver todos' : 'View all'} <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {[...inquiries, ...consultations].slice(0, 4).map((lead: any, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-xl transition-all border border-slate-100">
                      <div>
                        <p className="text-xs font-bold text-slate-800">{lead.full_name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{lead.email}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        lead.status === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-slate-150 text-slate-600'
                      }`}>
                        {lead.status || 'New'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Applicants */}
              <div className="bg-white p-6 border border-slate-200 rounded-2xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-slate-800 tracking-tight">{activeLocale === 'es' ? 'Postulantes Recientes' : 'Recent Applications'}</h3>
                  <button onClick={() => setActiveTab('applications')} className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer">
                    {activeLocale === 'es' ? 'Ver todos' : 'View all'} <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {applications.slice(0, 4).map((app, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-xl transition-all border border-slate-100">
                      <div>
                        <p className="text-xs font-bold text-slate-800">{app.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{app.position}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        app.status === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-slate-150 text-slate-600'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            LEADS MODULE TAB
            ========================================================================= */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="text-left">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {activeLocale === 'es' ? 'Gestión de Prospectos' : 'Leads Dashboard'}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {activeLocale === 'es' ? 'Gestione formularios de contacto, consultas técnicas y leads del chatbot' : 'Manage contact inquiries, technical consultation requests, and chatbot leads'}
              </p>
            </div>

            {/* Sub-tabs selectors */}
            <div className="flex border-b border-slate-200 gap-6">
              <button
                onClick={() => { setLeadsSubTab('inquiries'); setSelectedLead(null); }}
                className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  leadsSubTab === 'inquiries' ? 'border-[#0F4C81] text-[#0F4C81]' : 'border-transparent text-slate-400'
                }`}
              >
                {activeLocale === 'es' ? 'Consultas Generales' : 'Contact Requests'} ({inquiries.length})
              </button>
              <button
                onClick={() => { setLeadsSubTab('consultations'); setSelectedLead(null); }}
                className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  leadsSubTab === 'consultations' ? 'border-[#0F4C81] text-[#0F4C81]' : 'border-transparent text-slate-400'
                }`}
              >
                {activeLocale === 'es' ? 'Solicitudes de Consulta' : 'Consultations'} ({consultations.length})
              </button>
              <button
                onClick={() => { setLeadsSubTab('chatLeads'); setSelectedLead(null); }}
                className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  leadsSubTab === 'chatLeads' ? 'border-[#0F4C81] text-[#0F4C81]' : 'border-transparent text-slate-400'
                }`}
              >
                {activeLocale === 'es' ? 'Leads de Chatbot' : 'AI Chatbot Leads'} ({chatLeads.length})
              </button>
            </div>

            {/* Search and status filter bar */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm text-left">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={activeLocale === 'es' ? 'Buscar prospectos...' : 'Search leads...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 focus:border-[#0F4C81] transition-all"
                />
              </div>

              <div className="flex gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 focus:outline-none shadow-sm cursor-pointer"
                >
                  <option value="All">{activeLocale === 'es' ? 'Todos los Estados' : 'All Statuses'}</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>
            </div>

            {/* Leads Table lists */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-4 px-6">{activeLocale === 'es' ? 'Nombre' : 'Name'}</th>
                      <th className="py-4 px-6">Email</th>
                      {leadsSubTab !== 'chatLeads' && <th className="py-4 px-6">{activeLocale === 'es' ? 'Compañía' : 'Company'}</th>}
                      {leadsSubTab === 'consultations' && <th className="py-4 px-6">{activeLocale === 'es' ? 'Servicio Interés' : 'Service Interest'}</th>}
                      {leadsSubTab === 'chatLeads' && <th className="py-4 px-6">{activeLocale === 'es' ? 'Interés' : 'Interest'}</th>}
                      <th className="py-4 px-6">Date</th>
                      <th className="py-4 px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {leadsSubTab === 'inquiries' &&
                      processSearch(inquiries, ['full_name', 'email', 'company', 'subject', 'message']).map(row => (
                        <tr
                          key={row.id}
                          onClick={() => setSelectedLead({ type: 'contact', data: row })}
                          className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                        >
                          <td className="py-4 px-6 font-bold text-slate-800">{row.full_name}</td>
                          <td className="py-4 px-6 text-slate-500">{row.email}</td>
                          <td className="py-4 px-6 text-slate-500">{row.company || '—'}</td>
                          <td className="py-4 px-6 text-slate-400">{new Date(row.created_at).toLocaleDateString()}</td>
                          <td className="py-4 px-6">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              row.status === 'New' ? 'bg-blue-100 text-blue-800' :
                              row.status === 'Won' ? 'bg-emerald-100 text-emerald-800' :
                              row.status === 'Lost' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {row.status || 'New'}
                            </span>
                          </td>
                        </tr>
                      ))}

                    {leadsSubTab === 'consultations' &&
                      processSearch(consultations, ['full_name', 'email', 'company', 'service_interest', 'project_description']).map(row => (
                        <tr
                          key={row.id}
                          onClick={() => setSelectedLead({ type: 'consultation', data: row })}
                          className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                        >
                          <td className="py-4 px-6 font-bold text-slate-800">{row.full_name}</td>
                          <td className="py-4 px-6 text-slate-500">{row.email}</td>
                          <td className="py-4 px-6 text-slate-500">{row.company || '—'}</td>
                          <td className="py-4 px-6 font-semibold text-[#0F4C81]">{row.service_interest}</td>
                          <td className="py-4 px-6 text-slate-400">{new Date(row.created_at).toLocaleDateString()}</td>
                          <td className="py-4 px-6">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              row.status === 'New' ? 'bg-blue-100 text-blue-800' :
                              row.status === 'Won' ? 'bg-emerald-100 text-emerald-800' :
                              row.status === 'Lost' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {row.status || 'New'}
                            </span>
                          </td>
                        </tr>
                      ))}

                    {leadsSubTab === 'chatLeads' &&
                      processSearch(chatLeads, ['name', 'email', 'interest', 'conversation_summary']).map(row => (
                        <tr
                          key={row.id}
                          onClick={() => setSelectedLead({ type: 'chat', data: row })}
                          className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                        >
                          <td className="py-4 px-6 font-bold text-slate-800">{row.name || 'Anonymous User'}</td>
                          <td className="py-4 px-6 text-slate-500">{row.email || '—'}</td>
                          <td className="py-4 px-6 font-semibold text-[#0F4C81]">{row.interest || '—'}</td>
                          <td className="py-4 px-6 text-slate-400">{new Date(row.created_at).toLocaleDateString()}</td>
                          <td className="py-4 px-6">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              row.status === 'New' ? 'bg-blue-100 text-blue-800' :
                              row.status === 'Won' ? 'bg-emerald-100 text-emerald-800' :
                              row.status === 'Lost' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {row.status || 'New'}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Lead Detail Side Drawer Panel */}
            {selectedLead && (
              <div className="fixed inset-y-0 right-0 w-full sm:w-[500px] bg-white border-l border-slate-200 shadow-2xl z-40 flex flex-col animate-slideLeft text-left">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {selectedLead.type === 'contact' ? 'Contact Inquiry' : selectedLead.type === 'consultation' ? 'Consultation Request' : 'Chatbot Capture'}
                    </span>
                    <h3 className="text-base font-bold text-slate-800 mt-1">
                      {selectedLead.data.full_name || selectedLead.data.name || 'Anonymous Lead'}
                    </h3>
                  </div>
                  <button onClick={() => { setSelectedLead(null); setActiveConversationId(null); }} className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body Content */}
                <div className="flex-1 p-6 overflow-y-auto space-y-6">
                  {/* Status update box */}
                  <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
                    <label className="text-[10px] font-bold text-[#0F4C81] uppercase tracking-wider block mb-2">Lead Stage</label>
                    <select
                      value={selectedLead.data.status || 'New'}
                      onChange={(e) => handleLeadStatusChange(selectedLead.type, selectedLead.data.id, e.target.value)}
                      className="w-full bg-white border border-slate-250 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 focus:border-[#0F4C81]"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Proposal Sent">Proposal Sent</option>
                      <option value="Won">Won</option>
                      <option value="Lost">Lost</option>
                    </select>
                  </div>

                  {/* Profile info fields */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Email</p>
                      <p className="mt-1 font-semibold text-slate-800">{selectedLead.data.email || '—'}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Phone</p>
                      <p className="mt-1 font-semibold text-slate-800">{selectedLead.data.phone || '—'}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Company</p>
                      <p className="mt-1 font-semibold text-slate-800">{selectedLead.data.company || '—'}</p>
                    </div>
                    {selectedLead.type === 'consultation' && (
                      <>
                        <div>
                          <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Budget</p>
                          <p className="mt-1 font-semibold text-indigo-700">{selectedLead.data.budget || '—'}</p>
                        </div>
                        <div>
                          <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Timeline</p>
                          <p className="mt-1 font-semibold text-slate-800">{selectedLead.data.timeline || '—'}</p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Text details */}
                  <div className="space-y-4">
                    {selectedLead.type === 'contact' && (
                      <div>
                        <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Subject</p>
                        <p className="mt-1.5 font-semibold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          {selectedLead.data.subject}
                        </p>
                      </div>
                    )}

                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                        {selectedLead.type === 'contact' ? 'Message' : selectedLead.type === 'consultation' ? 'Project Description' : 'Conversation Summary'}
                      </p>
                      <p className="mt-1.5 text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed">
                        {selectedLead.data.message || selectedLead.data.project_description || selectedLead.data.conversation_summary || 'No summary registered.'}
                      </p>
                    </div>
                  </div>

                  {/* Chat logs viewer (for chatbot leads) */}
                  {selectedLead.type === 'chat' && (
                    <div className="pt-4 border-t border-slate-100 space-y-3">
                      <h4 className="text-xs font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4 text-[#0F4C81]" />
                        <span>Chat Log History</span>
                      </h4>

                      {/* Conversation thread */}
                      <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 max-h-60 overflow-y-auto p-4 space-y-3 flex flex-col">
                        {messages
                          .filter(msg => msg.conversation_id === selectedLead.data.id || msg.session_id === selectedLead.data.session_id)
                          .map((msg, idx) => (
                            <div
                              key={idx}
                              className={`max-w-[80%] p-3 rounded-2xl text-[11px] leading-relaxed text-left ${
                                msg.sender === 'user'
                                  ? 'bg-[#0F4C81] text-white self-end rounded-tr-none'
                                  : 'bg-white text-slate-800 border border-slate-200 self-start rounded-tl-none'
                              }`}
                            >
                              {msg.message}
                            </div>
                          ))}
                        {messages.filter(msg => msg.conversation_id === selectedLead.data.id || msg.session_id === selectedLead.data.session_id).length === 0 && (
                          <p className="text-[10px] text-slate-400 italic text-center py-4">No logged messages matched this lead session.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            CAREERS MODULE TAB
            ========================================================================= */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="text-left">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {activeLocale === 'es' ? 'Módulo de Contratación (Careers)' : 'Recruitment Portal (Careers)'}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {activeLocale === 'es' ? 'Gestione solicitudes de empleo, canalización de candidatos y base de talento' : 'Manage incoming job applications, pipeline stages, and talent database'}
              </p>
            </div>

            {/* Sub-tabs selector */}
            <div className="flex border-b border-slate-200 gap-6">
              <button
                onClick={() => setCareersSubTab('applications')}
                className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  careersSubTab === 'applications' ? 'border-[#0F4C81] text-[#0F4C81]' : 'border-transparent text-slate-400'
                }`}
              >
                {activeLocale === 'es' ? 'Solicitudes' : 'Applications'} ({applications.length})
              </button>
              <button
                onClick={() => setCareersSubTab('pipeline')}
                className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  careersSubTab === 'pipeline' ? 'border-[#0F4C81] text-[#0F4C81]' : 'border-transparent text-slate-400'
                }`}
              >
                {activeLocale === 'es' ? 'Oleoducto Kanban' : 'Kanban Pipeline'}
              </button>
              <button
                onClick={() => setCareersSubTab('candidates')}
                className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  careersSubTab === 'candidates' ? 'border-[#0F4C81] text-[#0F4C81]' : 'border-transparent text-slate-400'
                }`}
              >
                {activeLocale === 'es' ? 'Banco de Candidatos' : 'Talent Pool'} ({candidates.length})
              </button>
            </div>

            {/* SEARCH & FILTERS FOR CAREERS */}
            {careersSubTab !== 'pipeline' && (
              <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm text-left">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder={activeLocale === 'es' ? 'Buscar candidatos por nombre, habilidades...' : 'Search candidates by name, skills...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 focus:border-[#0F4C81] transition-all"
                  />
                </div>

                <div className="flex gap-3">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 focus:outline-none shadow-sm cursor-pointer"
                  >
                    <option value="All">{activeLocale === 'es' ? 'Todos los Estados' : 'All Statuses'}</option>
                    {careersSubTab === 'applications' ? (
                      <>
                        <option value="New">New</option>
                        <option value="Reviewing">Reviewing</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview">Interview</option>
                        <option value="Offered">Offered</option>
                        <option value="Hired">Hired</option>
                        <option value="Rejected">Rejected</option>
                      </>
                    ) : (
                      <>
                        <option value="Available">Available</option>
                        <option value="Reviewing">Reviewing</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Placed">Placed</option>
                        <option value="Inactive">Inactive</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
            )}

            {/* SUB-TAB 1: Job Applications list */}
            {careersSubTab === 'applications' && (
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <th className="py-4 px-6">{activeLocale === 'es' ? 'Candidato' : 'Candidate'}</th>
                        <th className="py-4 px-6">Email</th>
                        <th className="py-4 px-6">{activeLocale === 'es' ? 'Posición' : 'Position'}</th>
                        <th className="py-4 px-6">{activeLocale === 'es' ? 'Experiencia' : 'Experience'}</th>
                        <th className="py-4 px-6">CV</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs text-left">
                      {processSearch(applications, ['name', 'email', 'position', 'skills']).map(app => (
                        <tr key={app.id} className="hover:bg-slate-50/50">
                          <td className="py-4 px-6">
                            <div>
                              <p className="font-bold text-slate-800">{app.name}</p>
                              <span className="text-[9px] font-bold text-slate-400">{new Date(app.created_at).toLocaleDateString()}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-slate-500">{app.email}</td>
                          <td className="py-4 px-6 font-semibold text-slate-700">{app.position}</td>
                          <td className="py-4 px-6 text-slate-500">{app.years_experience} yrs</td>
                          <td className="py-4 px-6">
                            <a
                              href={app.resume_url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[#0F4C81] hover:underline font-semibold"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>CV</span>
                            </a>
                          </td>
                          <td className="py-4 px-6">
                            <select
                              value={app.status}
                              onChange={(e) => handleApplicationStatusChange(app.id, e.target.value as any)}
                              className="bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-[10px] font-bold focus:outline-none"
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
                          <td className="py-4 px-6 text-right">
                            <button
                              onClick={() => promoteToCandidate(app)}
                              className="px-2.5 py-1.5 bg-[#0F4C81] hover:bg-[#0c3e6b] text-white font-bold rounded-lg text-[10px] transition-all cursor-pointer"
                            >
                              Promote
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SUB-TAB 2: Kanban Pipeline Board */}
            {careersSubTab === 'pipeline' && (
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4 min-h-[500px]">
                {(['New', 'Reviewing', 'Shortlisted', 'Interview', 'Offered', 'Hired', 'Rejected'] as const).map(column => {
                  const cards = applications.filter(app => app.status === column);
                  return (
                    <div
                      key={column}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, column)}
                      className="bg-slate-100/60 border border-slate-200/50 rounded-2xl p-3.5 flex flex-col gap-3 min-h-[300px]"
                    >
                      {/* Column Header */}
                      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{column}</span>
                        <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{cards.length}</span>
                      </div>

                      {/* Card Items */}
                      <div className="flex-1 flex flex-col gap-2.5 overflow-y-auto">
                        {cards.map(app => (
                          <div
                            key={app.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, app.id)}
                            className="bg-white p-3 border border-slate-200 rounded-xl shadow-sm text-left cursor-grab active:cursor-grabbing hover:border-slate-350 transition-all space-y-1.5"
                          >
                            <p className="text-xs font-bold text-slate-800">{app.name}</p>
                            <p className="text-[9px] text-slate-400 font-semibold truncate">{app.position}</p>
                            <div className="flex justify-between items-center pt-2">
                              <span className="text-[9px] text-slate-400">{app.years_experience} yrs exp</span>
                              <a href={app.resume_url} target="_blank" rel="noreferrer" className="text-[9px] text-[#0F4C81] font-semibold hover:underline flex items-center gap-0.5">
                                <Download className="w-2.5 h-2.5" /> CV
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* SUB-TAB 3: Candidate Pool Grid */}
            {careersSubTab === 'candidates' && (
              <div className="space-y-6 text-left">
                {/* Header Actions */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowAddCandidate(true)}
                    className="px-4 py-2 bg-[#0F4C81] hover:bg-[#0c3e6b] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{activeLocale === 'es' ? 'Registrar Candidato' : 'Add Candidate'}</span>
                  </button>
                </div>

                {/* Candidate Form Modal */}
                {showAddCandidate && (
                  <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <form onSubmit={handleAddCandidate} className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl p-6 relative overflow-hidden flex flex-col gap-4 animate-scaleUp">
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0F4C81]"></div>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                        <h3 className="font-bold text-slate-800 text-sm">Add New Candidate Profile</h3>
                        <button type="button" onClick={() => setShowAddCandidate(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="space-y-1.5">
                          <label className="font-semibold text-slate-700 block">Full Name</label>
                          <input type="text" value={candName} onChange={(e) => setCandName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none" required />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-semibold text-slate-700 block">Email Address</label>
                          <input type="email" value={candEmail} onChange={(e) => setCandEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none" required />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-semibold text-slate-700 block">Phone Number</label>
                          <input type="text" value={candPhone} onChange={(e) => setCandPhone(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-semibold text-slate-700 block">LinkedIn Profile URL</label>
                          <input type="text" value={candLinkedin} onChange={(e) => setCandLinkedin(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-semibold text-slate-700 block">Resume URL (Supabase file)</label>
                          <input type="text" placeholder="https://..." value={candResumeUrl} onChange={(e) => setCandResumeUrl(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-semibold text-slate-700 block">Availability</label>
                          <select value={candStatus} onChange={(e) => setCandStatus(e.target.value as any)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none">
                            <option value="Available">Available</option>
                            <option value="Reviewing">Reviewing</option>
                            <option value="Interviewing">Interviewing</option>
                            <option value="Placed">Placed</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                        <div className="col-span-2 space-y-1.5">
                          <label className="font-semibold text-slate-700 block">Technical Skills (Comma separated)</label>
                          <input type="text" placeholder="React, Node.js, AWS" value={candSkills} onChange={(e) => setCandSkills(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none" />
                        </div>
                        <div className="col-span-2 space-y-1.5">
                          <label className="font-semibold text-slate-700 block">Experience / Professional Summary</label>
                          <textarea rows={3} value={candExp} onChange={(e) => setCandExp(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none resize-none" />
                        </div>
                      </div>

                      <button type="submit" className="w-full py-2.5 bg-[#0F4C81] hover:bg-[#0c3e6b] text-white font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer mt-2">
                        Register Candidate Profile
                      </button>
                    </form>
                  </div>
                )}

                {/* Candidate grid view */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {processSearch(candidates, ['name', 'email', 'skills', 'experience', 'location']).map(cand => (
                    <div key={cand.id} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-56 relative">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-slate-800 text-sm truncate max-w-[150px]">{cand.name}</h4>
                            <p className="text-[10px] text-slate-400 font-semibold">{cand.location || 'Remote'}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                            cand.status === 'Available' ? 'bg-emerald-100 text-emerald-800' :
                            cand.status === 'Inactive' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {cand.status}
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{cand.experience || 'No description registered.'}</p>
                        
                        {/* Skills badges */}
                        <div className="flex flex-wrap gap-1">
                          {(cand.skills || '').split(',').slice(0, 3).map((sk, idx) => (
                            <span key={idx} className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[9px] font-semibold">{sk.trim()}</span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                        <a href={cand.resume_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-bold text-[#0F4C81] hover:underline">
                          <Eye className="w-4 h-4" /> <span>View CV</span>
                        </a>
                        
                        <button onClick={() => handleDeleteCandidate(cand.id)} className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            CONTENT CMS MODULE TAB (Articles & Case Studies)
            ========================================================================= */}
        {activeTab === 'cms' && (
          <div className="space-y-6 text-left">
            <div className="text-left">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {activeLocale === 'es' ? 'Gestor de Contenidos (CMS)' : 'Content Management System (CMS)'}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {activeLocale === 'es' ? 'Publique, edite y traduzca artículos del blog y casos de éxito' : 'Create, translate, duplicate, and publish blog articles or case studies'}
              </p>
            </div>

            {/* CMS Subtab selectors */}
            <div className="flex border-b border-slate-200 gap-6">
              <button
                onClick={() => { setCmsSubTab('articles'); setEditingArticle(null); }}
                className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  cmsSubTab === 'articles' ? 'border-[#0F4C81] text-[#0F4C81]' : 'border-transparent text-slate-400'
                }`}
              >
                {activeLocale === 'es' ? 'Artículos de Blog' : 'Blog Articles'} ({articles.length})
              </button>
              <button
                onClick={() => { setCmsSubTab('case_studies'); setEditingCaseStudy(null); }}
                className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  cmsSubTab === 'case_studies' ? 'border-[#0F4C81] text-[#0F4C81]' : 'border-transparent text-slate-400'
                }`}
              >
                {activeLocale === 'es' ? 'Casos de Éxito' : 'Case Studies'} ({caseStudies.length})
              </button>
            </div>

            {/* --- CMS ARTICLES SECTION --- */}
            {cmsSubTab === 'articles' && !editingArticle && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-800 tracking-tight">Manage Articles</h3>
                  <button
                    onClick={() => {
                      setEditingArticle({});
                      setArticleTitle('');
                      setArticleSlug('');
                      setArticleExcerpt('');
                      setArticleContent('');
                      setArticleCategory('Business Intelligence');
                      setArticleLanguage('en');
                      setArticlePublished(false);
                      setFeaturedImage('');
                      setAuthorName('');
                      setAuthorRole('');
                      setAuthorAvatar('');
                      setReadingTime('');
                    }}
                    className="px-4 py-2 bg-[#0F4C81] hover:bg-[#0c3e6b] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Article</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {articles.map(art => (
                    <div key={art.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden h-72">
                      {art.featured_image && (
                        <div className="h-28 overflow-hidden bg-slate-100">
                          <img src={art.featured_image} alt={art.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                            <span>{art.category}</span>
                            <span className="bg-slate-100 text-slate-600 px-1 py-0.5 rounded flex items-center gap-0.5">
                              <Globe className="w-2.5 h-2.5" /> {art.language}
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-800 text-sm mt-1.5 line-clamp-2">{art.title}</h4>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2">{art.excerpt}</p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                            art.is_published ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {art.is_published ? 'Published' : 'Draft'}
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingArticle(art);
                                setArticleTitle(art.title);
                                setArticleSlug(art.slug);
                                setArticleExcerpt(art.excerpt);
                                setArticleContent(art.content);
                                setArticleCategory(art.category);
                                setArticleLanguage(art.language);
                                setArticlePublished(art.is_published);
                                setFeaturedImage(art.featured_image || '');
                                setAuthorName(art.author?.name || '');
                                setAuthorRole(art.author?.role || '');
                                setAuthorAvatar(art.author?.avatar || '');
                                setReadingTime(art.reading_time || '');
                              }}
                              className="p-1.5 hover:bg-blue-50 text-[#0F4C81] rounded-lg transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDuplicateArticle(art)}
                              className="p-1.5 hover:bg-slate-100 text-slate-500 rounded-lg transition-colors cursor-pointer"
                              title="Duplicate"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteArticle(art.id)}
                              className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Article editor form */}
            {cmsSubTab === 'articles' && editingArticle && (
              <form onSubmit={handleSaveArticle} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800 text-sm">
                    {editingArticle.id ? 'Edit Article' : 'Create New Article'}
                  </h3>
                  <button type="button" onClick={() => setEditingArticle(null)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                  {/* Left Column: Editor controls */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700">Article Title</label>
                      <input type="text" value={articleTitle} onChange={(e) => { setArticleTitle(e.target.value); setArticleSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none" required />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700">Slug URL path</label>
                      <input type="text" value={articleSlug} onChange={(e) => setArticleSlug(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none" required />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700">Excerpt / Short Description</label>
                      <textarea rows={2} value={articleExcerpt} onChange={(e) => setArticleExcerpt(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none resize-none" required />
                    </div>

                    {/* Markdown formatting Toolbar editor */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="font-semibold text-slate-700">Article Content (HTML/Markdown)</label>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setArticlePreviewMode(!articlePreviewMode)}
                            className={`px-2.5 py-1.5 rounded-lg font-bold border ${
                              articlePreviewMode ? 'bg-[#0F4C81] text-white border-[#0F4C81]' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {articlePreviewMode ? 'Back to Editor' : 'Live Preview'}
                          </button>
                        </div>
                      </div>

                      {articlePreviewMode ? (
                        <div className="w-full h-80 bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-y-auto text-left prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: articleContent }} />
                      ) : (
                        <div className="border border-slate-200 rounded-xl overflow-hidden">
                          {/* Formatting toolbar buttons */}
                          <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap gap-1.5">
                            <button type="button" onClick={() => formatTextArea('bold')} className="p-1 px-2 hover:bg-slate-200 text-slate-700 font-bold rounded">B</button>
                            <button type="button" onClick={() => formatTextArea('italic')} className="p-1 px-2 hover:bg-slate-200 text-slate-700 italic rounded">I</button>
                            <button type="button" onClick={() => formatTextArea('h2')} className="p-1 px-2 hover:bg-slate-200 text-slate-700 font-semibold rounded">H2</button>
                            <button type="button" onClick={() => formatTextArea('link')} className="p-1 px-2 hover:bg-slate-200 text-[#0F4C81] rounded">Link</button>
                            <button type="button" onClick={() => formatTextArea('quote')} className="p-1 px-2 hover:bg-slate-200 text-slate-500 rounded">Quote</button>
                            <button type="button" onClick={() => formatTextArea('code')} className="p-1 px-2 hover:bg-slate-200 text-slate-600 rounded">&lt;/&gt;</button>
                            <button type="button" onClick={() => formatTextArea('list')} className="p-1 px-2 hover:bg-slate-200 text-slate-700 rounded">• List</button>
                          </div>
                          <textarea
                            id="article-content-editor"
                            rows={12}
                            value={articleContent}
                            onChange={(e) => setArticleContent(e.target.value)}
                            className="w-full bg-slate-50 p-4 focus:outline-none font-mono text-[11px] leading-relaxed resize-y"
                            required
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Metadata settings */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700">Language</label>
                      <select value={articleLanguage} onChange={(e) => setArticleLanguage(e.target.value as any)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none">
                        <option value="en">English (EN)</option>
                        <option value="es">Español (ES)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700">Category</label>
                      <select value={articleCategory} onChange={(e) => setArticleCategory(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none">
                        <option value="Business Intelligence">Business Intelligence</option>
                        <option value="Data Modernization">Data Modernization</option>
                        <option value="Staffing Solutions">Staffing Solutions</option>
                        <option value="Cloud Technology">Cloud Technology</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700">Reading Time (e.g. 5 min read)</label>
                      <input type="text" value={articleReadingTime} onChange={(e) => setReadingTime(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700">Featured Image URL</label>
                      <input type="text" placeholder="https://..." value={articleFeaturedImage} onChange={(e) => setFeaturedImage(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none" />
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                      <span className="font-bold text-slate-800 block text-[10px] uppercase tracking-wider">Author Profile</span>
                      <div className="space-y-2">
                        <input type="text" placeholder="Author Name" value={articleAuthorName} onChange={(e) => setAuthorName(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none" />
                        <input type="text" placeholder="Author Role (e.g. Director)" value={articleAuthorRole} onChange={(e) => setAuthorRole(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none" />
                        <input type="text" placeholder="Author Avatar Image URL" value={articleAuthorAvatar} onChange={(e) => setAuthorAvatar(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none" />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-2 border border-slate-200 rounded-xl">
                      <input
                        type="checkbox"
                        id="is-published-checkbox"
                        checked={articlePublished}
                        onChange={(e) => setArticlePublished(e.target.checked)}
                        className="w-4 h-4 text-[#0F4C81] border-slate-300 rounded focus:ring-[#0F4C81]"
                      />
                      <label htmlFor="is-published-checkbox" className="font-semibold text-slate-700 cursor-pointer">
                        Publish Immediately
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <button type="button" onClick={() => setEditingArticle(null)} className="px-5 py-2.5 border border-slate-250 hover:bg-slate-50 text-slate-600 font-semibold rounded-xl text-xs transition-all cursor-pointer">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2.5 bg-[#0F4C81] hover:bg-[#0c3e6b] text-white font-semibold rounded-xl text-xs transition-all shadow-md cursor-pointer">
                    Save Article
                  </button>
                </div>
              </form>
            )}

            {/* --- CMS CASE STUDIES SECTION --- */}
            {cmsSubTab === 'case_studies' && !editingCaseStudy && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-800 tracking-tight">Manage Case Studies</h3>
                  <button
                    onClick={() => {
                      setEditingCaseStudy({});
                      setCsTitle('');
                      setCsSlug('');
                      setCsIndustry('');
                      setCsChallenge('');
                      setCsSolution('');
                      setCsResults('');
                      setCsLanguage('en');
                      setCsPublished(false);
                      setCsTechnologies('');
                      setCsFeaturedImage('');
                    }}
                    className="px-4 py-2 bg-[#0F4C81] hover:bg-[#0c3e6b] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Case Study</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {caseStudies.map(cs => (
                    <div key={cs.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden h-72">
                      {cs.featured_image && (
                        <div className="h-28 overflow-hidden bg-slate-100">
                          <img src={cs.featured_image} alt={cs.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                            <span>{cs.industry}</span>
                            <span className="bg-slate-100 text-slate-600 px-1 py-0.5 rounded flex items-center gap-0.5">
                              <Globe className="w-2.5 h-2.5" /> {cs.language}
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-800 text-sm mt-1.5 line-clamp-2">{cs.title}</h4>
                          <p className="text-xs text-slate-450 mt-1 line-clamp-2">Challenge: {cs.challenge}</p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                            cs.is_published ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {cs.is_published ? 'Published' : 'Draft'}
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingCaseStudy(cs);
                                setCsTitle(cs.title);
                                setCsSlug(cs.slug);
                                setCsIndustry(cs.industry);
                                setCsChallenge(cs.challenge);
                                setCsSolution(cs.solution);
                                setCsResults(cs.results);
                                setCsLanguage(cs.language);
                                setCsPublished(cs.is_published);
                                setCsTechnologies(cs.technologies || '');
                                setCsFeaturedImage(cs.featured_image || '');
                              }}
                              className="p-1.5 hover:bg-blue-50 text-[#0F4C81] rounded-lg transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCaseStudy(cs.id)}
                              className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Case Study Editor Form */}
            {cmsSubTab === 'case_studies' && editingCaseStudy && (
              <form onSubmit={handleSaveCaseStudy} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800 text-sm">
                    {editingCaseStudy.id ? 'Edit Case Study' : 'Create Case Study'}
                  </h3>
                  <button type="button" onClick={() => setEditingCaseStudy(null)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                  {/* Left Column: Form content */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700">Project Title</label>
                      <input type="text" value={csTitle} onChange={(e) => { setCsTitle(e.target.value); setCsSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none" required />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700">Slug path</label>
                      <input type="text" value={csSlug} onChange={(e) => setCsSlug(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none" required />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700">The Challenge</label>
                      <textarea rows={3} value={csChallenge} onChange={(e) => setCsChallenge(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none" required />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700">The Solution</label>
                      <textarea rows={3} value={csSolution} onChange={(e) => setCsSolution(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none" required />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700">The Results</label>
                      <textarea rows={3} value={csResults} onChange={(e) => setCsResults(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none" required />
                    </div>
                  </div>

                  {/* Right Column: Metadata */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700">Language</label>
                      <select value={csLanguage} onChange={(e) => setCsLanguage(e.target.value as any)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none">
                        <option value="en">English (EN)</option>
                        <option value="es">Español (ES)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700">Client Industry</label>
                      <input type="text" placeholder="e.g. Healthcare, Finance" value={csIndustry} onChange={(e) => setCsIndustry(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none" required />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700">Technologies (Comma separated)</label>
                      <input type="text" placeholder="e.g. Snowflake, dbt, Looker" value={csTechnologies} onChange={(e) => setCsTechnologies(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700">Featured Image URL</label>
                      <input type="text" placeholder="https://..." value={csFeaturedImage} onChange={(e) => setCsFeaturedImage(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none" />
                    </div>

                    <div className="flex items-center gap-3 p-2 border border-slate-200 rounded-xl">
                      <input
                        type="checkbox"
                        id="is-published-cs-checkbox"
                        checked={csPublished}
                        onChange={(e) => setCsPublished(e.target.checked)}
                        className="w-4 h-4 text-[#0F4C81] border-slate-300 rounded focus:ring-[#0F4C81]"
                      />
                      <label htmlFor="is-published-cs-checkbox" className="font-semibold text-slate-700 cursor-pointer">
                        Publish Immediately
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <button type="button" onClick={() => setEditingCaseStudy(null)} className="px-5 py-2.5 border border-slate-250 hover:bg-slate-50 text-slate-600 font-semibold rounded-xl text-xs transition-all cursor-pointer">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2.5 bg-[#0F4C81] hover:bg-[#0c3e6b] text-white font-semibold rounded-xl text-xs transition-all shadow-md cursor-pointer">
                    Save Case Study
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* =========================================================================
            NEWSLETTER SUBSCRIBERS TAB
            ========================================================================= */}
        {activeTab === 'subscribers' && (
          <div className="space-y-6">
            <div className="text-left">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {activeLocale === 'es' ? 'Suscriptores del Boletín' : 'Newsletter Subscribers'}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {activeLocale === 'es' ? 'Consulte y gestione la lista de correos del boletín informativo' : 'Audit, export, and manage newsletter database subscriptions'}
              </p>
            </div>

            {/* Filter and export actions bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm text-left">
              <div className="relative flex-1 max-w-md w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={activeLocale === 'es' ? 'Buscar por correo...' : 'Search by email...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 focus:border-[#0F4C81] transition-all"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={exportSubscribersCSV}
                  className="px-4 py-2 bg-white border border-slate-250 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Subscribers Table list */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-4 px-6">Email Address</th>
                      <th className="py-4 px-6">{activeLocale === 'es' ? 'Idioma' : 'Language'}</th>
                      <th className="py-4 px-6">Source Page</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6">Date Joined</th>
                      <th className="py-4 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-left">
                    {processSearch(subscribers, ['email', 'language', 'source_page']).map(sub => (
                      <tr key={sub.id} className="hover:bg-slate-50/50">
                        <td className="py-4 px-6 font-bold text-slate-800">{sub.email}</td>
                        <td className="py-4 px-6 font-semibold uppercase text-slate-500">{sub.language || 'en'}</td>
                        <td className="py-4 px-6 text-slate-400">{sub.source_page || '/'}</td>
                        <td className="py-4 px-6">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                            sub.status === 'subscribed' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-slate-400">{new Date(sub.created_at).toLocaleDateString()}</td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => handleDeleteSubscriber(sub.id)}
                            className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SETTINGS MODULE TAB (Users, Company settings, Resend Email templates)
            ========================================================================= */}
        {activeTab === 'settings' && (
          <div className="space-y-6 text-left">
            <div className="text-left">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {activeLocale === 'es' ? 'Configuración del Sistema' : 'System Settings'}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {activeLocale === 'es' ? 'Administre perfiles, plantillas de correo y configuración de la empresa' : 'Configure company branding, Resend email templates, and manage user roles'}
              </p>
            </div>

            {/* Settings Sub-tabs */}
            <div className="flex border-b border-slate-200 gap-6">
              <button
                onClick={() => setSettingsSubTab('profile')}
                className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  settingsSubTab === 'profile' ? 'border-[#0F4C81] text-[#0F4C81]' : 'border-transparent text-slate-400'
                }`}
              >
                {activeLocale === 'es' ? 'Perfil de la Empresa' : 'Company Profile'}
              </button>
              <button
                onClick={() => setSettingsSubTab('templates')}
                className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  settingsSubTab === 'templates' ? 'border-[#0F4C81] text-[#0F4C81]' : 'border-transparent text-slate-400'
                }`}
              >
                {activeLocale === 'es' ? 'Plantillas de Correo' : 'Email Templates'}
              </button>
              <button
                onClick={() => setSettingsSubTab('users')}
                className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  settingsSubTab === 'users' ? 'border-[#0F4C81] text-[#0F4C81]' : 'border-transparent text-slate-400'
                }`}
              >
                {activeLocale === 'es' ? 'Cuentas de Usuario' : 'User Accounts'}
              </button>
            </div>

            {/* SUB-TAB 1: Company profile */}
            {settingsSubTab === 'profile' && companySettings && (
              <form onSubmit={handleSaveCompanyProfile} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm max-w-2xl space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-700 block">Company Name</label>
                    <input type="text" value={settingsName} onChange={(e) => setSettingsName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none" required />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-700 block">Central Email Address</label>
                    <input type="email" value={settingsEmail} onChange={(e) => setSettingsEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none" required />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-700 block">Phone Number</label>
                    <input type="text" value={settingsPhone} onChange={(e) => setSettingsPhone(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none" />
                  </div>

                  <div className="col-span-2 space-y-1.5">
                    <label className="font-semibold text-slate-700 block">Corporate Address</label>
                    <input type="text" value={settingsAddress} onChange={(e) => setSettingsAddress(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-700 block">LinkedIn Company Link</label>
                    <input type="text" value={settingsLinkedin} onChange={(e) => setSettingsLinkedin(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-700 block">GitHub Company Link</label>
                    <input type="text" value={settingsGithub} onChange={(e) => setSettingsGithub(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none" />
                  </div>
                </div>

                <div className="flex justify-end pt-3">
                  <button type="submit" className="px-5 py-2.5 bg-[#0F4C81] hover:bg-[#0c3e6b] text-white font-semibold rounded-xl transition-all shadow-md cursor-pointer">
                    Save Company Profile
                  </button>
                </div>
              </form>
            )}

            {/* SUB-TAB 2: Email Templates manager */}
            {settingsSubTab === 'templates' && (
              <div className="space-y-6 max-w-4xl">
                {emailTemplates.map(tmpl => {
                  return (
                    <div key={tmpl.id} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">{tmpl.id} notification template</span>
                        <span className="text-[10px] text-slate-400 font-semibold">Uses Resend Email trigger</span>
                      </div>

                      <div className="space-y-4 text-xs">
                        <div className="space-y-1.5">
                          <label className="font-semibold text-slate-700">Email Subject</label>
                          <input
                            type="text"
                            id={`subject-${tmpl.id}`}
                            defaultValue={tmpl.subject}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-semibold text-slate-700">Email Body (HTML/Plain Text)</label>
                          <textarea
                            id={`body-${tmpl.id}`}
                            rows={5}
                            defaultValue={tmpl.body}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none font-mono text-[10px] leading-relaxed resize-y"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            const subInput = document.getElementById(`subject-${tmpl.id}`) as HTMLInputElement;
                            const bodyInput = document.getElementById(`body-${tmpl.id}`) as HTMLTextAreaElement;
                            if (subInput && bodyInput) {
                              handleSaveEmailTemplate(tmpl.id, subInput.value, bodyInput.value);
                            }
                          }}
                          className="px-4 py-2 bg-[#0F4C81] hover:bg-[#0c3e6b] text-white font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                        >
                          Update Template
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* SUB-TAB 3: User Accounts RBAC manager */}
            {settingsSubTab === 'users' && (
              <div className="space-y-6">
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowAddUser(true)}
                    className="px-4 py-2 bg-[#0F4C81] hover:bg-[#0c3e6b] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Create User Profile</span>
                  </button>
                </div>

                {/* Add User Modal */}
                {showAddUser && (
                  <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <form onSubmit={handleAddUserSubmit} className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 relative overflow-hidden flex flex-col gap-4 animate-scaleUp">
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0F4C81]"></div>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                        <h3 className="font-bold text-slate-800 text-sm">Add New Administrator Account</h3>
                        <button type="button" onClick={() => setShowAddUser(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                      </div>

                      <div className="space-y-4 text-xs">
                        <div className="space-y-1.5">
                          <label className="font-semibold text-slate-700">Display Name</label>
                          <input type="text" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none" required />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-semibold text-slate-700">Email Address</label>
                          <input type="email" value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none" required />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-semibold text-slate-700">Password</label>
                          <input type="password" value={newUserPassword} onChange={(e) => setNewUserPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none" required />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-semibold text-slate-700">Role Permissions</label>
                          <select value={newUserRole} onChange={(e) => setNewUserRole(e.target.value as any)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none">
                            <option value="Admin">Admin</option>
                            <option value="Recruiter">Recruiter</option>
                            <option value="Consultant">Consultant</option>
                          </select>
                        </div>
                      </div>

                      <button type="submit" className="w-full py-2.5 bg-[#0F4C81] hover:bg-[#0c3e6b] text-white font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer mt-2">
                        Create User Account
                      </button>
                    </form>
                  </div>
                )}

                {/* User accounts list table */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          <th className="py-4 px-6">User Display Name</th>
                          <th className="py-4 px-6">Email Address</th>
                          <th className="py-4 px-6">Role permissions</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6 text-right">Deactivate / Activate</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs text-left">
                        {userProfiles.map(u => (
                          <tr key={u.id} className="hover:bg-slate-50/50">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center font-bold text-slate-500 uppercase">
                                  {u.avatar ? <img src={u.avatar} alt="Avatar" className="w-full h-full object-cover" /> : <User className="w-4 h-4" />}
                                </div>
                                <span className="font-bold text-slate-800">{u.name || u.email.split('@')[0]}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-slate-500">{u.email}</td>
                            <td className="py-4 px-6">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-[#0F4C81] text-[10px] font-bold uppercase">
                                <Shield className="w-3 h-3" /> {u.role}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                                u.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {u.is_active ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <button
                                onClick={() => handleUserStatusToggle(u.id, u.is_active)}
                                disabled={u.id === session?.user?.id}
                                className={`px-2.5 py-1.5 font-bold rounded-lg text-[10px] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
                                  u.is_active 
                                    ? 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200' 
                                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
                                }`}
                              >
                                {u.is_active ? 'Deactivate' : 'Activate'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
