'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Plus, Trash2, Edit2, CheckCircle, AlertCircle, Eye, ArrowLeft, Globe, Award, FileText, Search, X } from 'lucide-react';
import { supabase, db, Article, CaseStudy, UserProfile } from '@/lib/db';
import AdminSidebar from '@/components/admin/Sidebar';

const defaultHealthReport = {
  success: true,
  connection: 'green' as const,
  status: 'healthy',
  missingObjects: [] as string[],
  warnings: [] as string[],
  tables: [] as any[],
  policies: [] as string[],
  errors: {} as Record<string, string>
};

export default function AdminCMSPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  // Auth States
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Data States
  const [articles, setArticles] = useState<Article[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [healthReport, setHealthReport] = useState<any>(defaultHealthReport);

  // UI States
  const [cmsSubTab, setCmsSubTab] = useState<'articles' | 'case_studies'>('articles');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Articles Editor Form States
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [artTitle, setArtTitle] = useState('');
  const [artSlug, setArtSlug] = useState('');
  const [artExcerpt, setArtExcerpt] = useState('');
  const [artContent, setArtContent] = useState('');
  const [artCategory, setArtCategory] = useState('AI & Data');
  const [artLanguage, setArtLanguage] = useState<'en' | 'es'>('en');
  const [artPublished, setArtPublished] = useState(false);
  const [artFeaturedImage, setArtFeaturedImage] = useState('');
  const [artAuthorName, setArtAuthorName] = useState('');
  const [artAuthorRole, setArtAuthorRole] = useState('');
  const [artAuthorAvatar, setArtAuthorAvatar] = useState('');
  const [artReadingTime, setArtReadingTime] = useState('');

  // Case Studies Editor Form States
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

  // Verify Auth
  useEffect(() => {
    const checkAuth = async () => {
      setAuthLoading(true);
      if (supabase) {
        const { data: { session: curSess } } = await supabase.auth.getSession();
        setSession(curSess);
        if (curSess) {
          const profile = await db.getUserProfile(curSess.user.id);
          if (profile) {
            setUserProfile(profile);
          }
        } else {
          router.push(`/${locale}/admin/login`);
        }
      } else {
        const mockAuth = localStorage.getItem('hypercode_admin_mock_auth');
        if (mockAuth) {
          const parsed = JSON.parse(mockAuth);
          setSession({ user: { email: parsed.email } });
          setUserProfile(parsed);
        } else {
          router.push(`/${locale}/admin/login`);
        }
      }
      setAuthLoading(false);
    };

    checkAuth();
  }, [locale, router]);

  // Load Data
  const loadData = async () => {
    setLoading(true);
    try {
      const [arts, studies] = await Promise.all([
        db.getAllArticles(),
        db.getAllCaseStudies()
      ]);
      setArticles(arts);
      setCaseStudies(studies);

      // Fetch DB health status
      try {
        const token = session?.access_token || '';
        const headers: any = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        const healthRes = await fetch('/api/admin/health', { headers });
        if (healthRes.ok) {
          const healthData = await healthRes.json();
          setHealthReport({
            ...defaultHealthReport,
            ...healthData
          });
        } else {
          setHealthReport(defaultHealthReport);
        }
      } catch (healthErr) {
        console.error('Failed to load database health report:', healthErr);
        setHealthReport(defaultHealthReport);
      }
    } catch (err) {
      console.error('Failed to load CMS content:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session) return;
    loadData();
  }, [session]);

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artTitle || !artSlug || !artExcerpt || !artContent) {
      alert('Please fill out all required fields.');
      return;
    }

    try {
      const payload: any = {
        title: artTitle,
        slug: artSlug,
        excerpt: artExcerpt,
        content: artContent,
        category: artCategory,
        language: artLanguage,
        is_published: artPublished,
        featured_image: artFeaturedImage || null,
        reading_time: artReadingTime || null,
        author: {
          name: artAuthorName || 'HyperCode Editorial',
          role: artAuthorRole || 'Practice Director',
          avatar: artAuthorAvatar || null
        }
      };

      if (editingArticle?.id) {
        payload.id = editingArticle.id;
      }

      await db.saveArticle(payload);
      setEditingArticle(null);
      await loadData();
    } catch (err) {
      console.error('Failed to save article:', err);
      alert('Failed to save article.');
    }
  };

  const handleEditArticle = (art: Article) => {
    setEditingArticle(art);
    setArtTitle(art.title);
    setArtSlug(art.slug);
    setArtExcerpt(art.excerpt);
    setArtContent(art.content);
    setArtCategory(art.category);
    setArtLanguage(art.language);
    setArtPublished(art.is_published);
    setArtFeaturedImage(art.featured_image || '');
    setArtAuthorName(art.author?.name || '');
    setArtAuthorRole(art.author?.role || '');
    setArtAuthorAvatar(art.author?.avatar || '');
    setArtReadingTime(art.reading_time || '');
  };

  const handleDeleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      await db.deleteArticle(id);
      await loadData();
    } catch (err) {
      console.error('Failed to delete article:', err);
      alert('Failed to delete.');
    }
  };

  const handleSaveCaseStudy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!csTitle || !csSlug || !csIndustry || !csChallenge || !csSolution || !csResults) {
      alert('Please fill out all required fields.');
      return;
    }

    try {
      const payload: any = {
        title: csTitle,
        slug: csSlug,
        industry: csIndustry,
        challenge: csChallenge,
        solution: csSolution,
        results: csResults,
        language: csLanguage,
        is_published: csPublished,
        technologies: csTechnologies || null,
        featured_image: csFeaturedImage || null
      };

      if (editingCaseStudy?.id) {
        payload.id = editingCaseStudy.id;
      }

      await db.saveCaseStudy(payload);
      setEditingCaseStudy(null);
      await loadData();
    } catch (err) {
      console.error('Failed to save case study:', err);
      alert('Failed to save case study.');
    }
  };

  const handleEditCaseStudy = (cs: CaseStudy) => {
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
  };

  const handleDeleteCaseStudy = async (id: string) => {
    if (!confirm('Are you sure you want to delete this case study?')) return;
    try {
      await db.deleteCaseStudy(id);
      await loadData();
    } catch (err) {
      console.error('Failed to delete case study:', err);
      alert('Failed to delete.');
    }
  };

  if (authLoading || (session && !userProfile)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0F4C81]"></div>
      </div>
    );
  }

  // Gate check: Admin required
  const role = userProfile?.role || 'Consultant';
  if (userProfile && role !== 'Admin') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-200 text-center space-y-6">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto text-3xl">⚠️</div>
          <h2 className="text-xl font-bold text-slate-800">{locale === 'es' ? 'Acceso Denegado' : 'Access Denied'}</h2>
          <p className="text-sm text-slate-600">
            {locale === 'es' 
              ? 'No tiene permisos para acceder al gestor de contenidos CMS.' 
              : 'You do not have permission to manage CMS articles and case studies.'}
          </p>
          <button 
            onClick={() => router.push(`/admin`)}
            className="px-5 py-2.5 bg-[#0F4C81] hover:bg-[#0c3e6b] text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{locale === 'es' ? 'Volver al Panel' : 'Back to Dashboard'}</span>
          </button>
        </div>
      </div>
    );
  }

  // Filter content
  const processSearch = (items: any[]) => {
    return items.filter(item => {
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return item.title.toLowerCase().includes(q) || (item.slug || '').toLowerCase().includes(q);
      }
      return true;
    });
  };

  const filteredArticles = processSearch(articles);
  const filteredCaseStudies = processSearch(caseStudies);

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-600 font-sans">
      <AdminSidebar userProfile={userProfile} />

      <main className="flex-1 p-8 space-y-6 overflow-x-hidden relative text-left">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Content CMS</h1>
            <p className="text-sm text-slate-500 mt-1">Publish and edit localized articles and case studies</p>
          </div>

          <button
            onClick={() => {
              if (cmsSubTab === 'articles') {
                setEditingArticle({});
                setArtTitle('');
                setArtSlug('');
                setArtExcerpt('');
                setArtContent('');
                setArtCategory('AI & Data');
                setArtLanguage('en');
                setArtPublished(false);
                setArtFeaturedImage('');
                setArtAuthorName('');
                setArtAuthorRole('');
                setArtAuthorAvatar('');
                setArtReadingTime('');
              } else {
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
              }
            }}
            className="px-4 py-2 bg-[#0F4C81] hover:bg-[#0c3e6b] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{cmsSubTab === 'articles' ? 'New Article' : 'New Case Study'}</span>
          </button>
        </div>

        {/* DB Sync Mismatch Warning Banner */}
        {healthReport && !healthReport.success && (
          <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl shadow-sm text-left flex flex-col sm:flex-row items-start gap-4">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-xl mt-0.5 shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-1.5 text-left">
              <h4 className="text-sm font-bold text-amber-900">Database Schema Out of Sync</h4>
              <p className="text-xs text-amber-700 leading-relaxed font-medium">
                The application code expects database elements that do not exist or differ in type within your remote Supabase schema. Writes are currently falling back to LocalStorage.
              </p>
              <div className="text-[10px] bg-white/50 border border-amber-100 rounded-lg p-3 space-y-1 max-h-28 overflow-y-auto">
                {healthReport?.missingObjects?.length ? (
                  healthReport.missingObjects.map((obj: string, idx: number) => (
                    <div key={idx} className="font-mono text-amber-800 font-semibold">{obj}</div>
                  ))
                ) : (
                  <div className="text-emerald-700 font-semibold">
                    ✓ No missing database objects detected.
                  </div>
                )}
              </div>
              <p className="text-[10px] text-amber-600 font-medium">
                Please run the migration SQL file in <code className="font-mono bg-amber-100/50 px-1 py-0.5 rounded">supabase/migrations/</code> in your Supabase SQL Editor.
              </p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="h-[400px] bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F4C81]"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Sub-tabs selectors */}
            <div className="flex border-b border-slate-200 gap-6">
              <button
                onClick={() => { setCmsSubTab('articles'); }}
                className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  cmsSubTab === 'articles' ? 'border-[#0F4C81] text-[#0F4C81]' : 'border-transparent text-slate-400'
                }`}
              >
                Articles ({articles.length})
              </button>
              <button
                onClick={() => { setCmsSubTab('case_studies'); }}
                className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  cmsSubTab === 'case_studies' ? 'border-[#0F4C81] text-[#0F4C81]' : 'border-transparent text-slate-400'
                }`}
              >
                Case Studies ({caseStudies.length})
              </button>
            </div>

            {/* Search Bar */}
            <div className="flex gap-4 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 focus:border-[#0F4C81] transition-all"
                />
              </div>
            </div>

            {/* Articles Table Grid */}
            {cmsSubTab === 'articles' && (
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <th className="py-4 px-6">Title</th>
                        <th className="py-4 px-6">Slug</th>
                        <th className="py-4 px-6">Category</th>
                        <th className="py-4 px-6">Language</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredArticles.map(art => (
                        <tr key={art.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-6 font-bold text-slate-800">{art.title}</td>
                          <td className="py-4 px-6 text-slate-500 font-mono text-[10px]">{art.slug}</td>
                          <td className="py-4 px-6 text-slate-500">{art.category}</td>
                          <td className="py-4 px-6 text-slate-500 uppercase">{art.language}</td>
                          <td className="py-4 px-6">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              art.is_published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {art.is_published ? 'Published' : 'Draft'}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-center flex items-center justify-center gap-2">
                            <button onClick={() => handleEditArticle(art)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-650 cursor-pointer">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteArticle(art.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-red-650 cursor-pointer">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredArticles.length === 0 && (
                  <div className="py-12 text-center text-slate-400 text-xs font-semibold">No articles registered.</div>
                )}
              </div>
            )}

            {/* Case Studies Table Grid */}
            {cmsSubTab === 'case_studies' && (
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <th className="py-4 px-6">Title</th>
                        <th className="py-4 px-6">Slug</th>
                        <th className="py-4 px-6">Industry</th>
                        <th className="py-4 px-6">Language</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredCaseStudies.map(cs => (
                        <tr key={cs.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-6 font-bold text-slate-800">{cs.title}</td>
                          <td className="py-4 px-6 text-slate-500 font-mono text-[10px]">{cs.slug}</td>
                          <td className="py-4 px-6 text-slate-500">{cs.industry}</td>
                          <td className="py-4 px-6 text-slate-500 uppercase">{cs.language}</td>
                          <td className="py-4 px-6">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              cs.is_published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {cs.is_published ? 'Published' : 'Draft'}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-center flex items-center justify-center gap-2">
                            <button onClick={() => handleEditCaseStudy(cs)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-650 cursor-pointer">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteCaseStudy(cs.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-red-650 cursor-pointer">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredCaseStudies.length === 0 && (
                  <div className="py-12 text-center text-slate-400 text-xs font-semibold">No case studies registered.</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Modal: Article Editor */}
        {editingArticle && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">{editingArticle.id ? 'Edit CMS Article' : 'Create New Article'}</h3>
                <button onClick={() => setEditingArticle(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleSaveArticle} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[10px]">Article Title *</label>
                    <input type="text" required value={artTitle} onChange={(e) => setArtTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[10px]">Slug *</label>
                    <input type="text" required value={artSlug} onChange={(e) => setArtSlug(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 font-mono focus:outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[10px]">Category</label>
                    <select value={artCategory} onChange={(e) => setArtCategory(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2.5 text-slate-800 focus:outline-none cursor-pointer">
                      <option value="AI & Data">AI & Data</option>
                      <option value="Cloud Architecture">Cloud Architecture</option>
                      <option value="Staffing Strategy">Staffing Strategy</option>
                      <option value="Business Intelligence">Business Intelligence</option>
                      <option value="Technology Guides">Technology Guides</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[10px]">Language</label>
                    <select value={artLanguage} onChange={(e) => setArtLanguage(e.target.value as any)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2.5 text-slate-800 focus:outline-none cursor-pointer">
                      <option value="en">English</option>
                      <option value="es">Español</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[10px]">Reading Time (e.g. 5 min)</label>
                    <input type="text" value={artReadingTime} onChange={(e) => setArtReadingTime(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[10px]">Excerpt (Summary) *</label>
                  <textarea required rows={2} value={artExcerpt} onChange={(e) => setArtExcerpt(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none resize-none" />
                </div>

                <div>
                  <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[10px]">Content Body (HTML or Markdown) *</label>
                  <textarea required rows={8} value={artContent} onChange={(e) => setArtContent(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono focus:outline-none" />
                </div>

                <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                  <label className="flex items-center gap-2 font-bold text-slate-700 cursor-pointer">
                    <input type="checkbox" checked={artPublished} onChange={(e) => setArtPublished(e.target.checked)} className="rounded text-[#0F4C81] w-4 h-4 cursor-pointer" />
                    <span>Publish Immediately</span>
                  </label>
                  <button type="submit" className="px-5 py-2.5 bg-[#0F4C81] hover:bg-[#0c3e6b] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer">
                    Save Article
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Case Study Editor */}
        {editingCaseStudy && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">{editingCaseStudy.id ? 'Edit Case Study' : 'Create Case Study'}</h3>
                <button onClick={() => setEditingCaseStudy(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleSaveCaseStudy} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[10px]">Title *</label>
                    <input type="text" required value={csTitle} onChange={(e) => setCsTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[10px]">Slug *</label>
                    <input type="text" required value={csSlug} onChange={(e) => setCsSlug(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 font-mono focus:outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[10px]">Industry *</label>
                    <input type="text" required value={csIndustry} onChange={(e) => setCsIndustry(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[10px]">Language</label>
                    <select value={csLanguage} onChange={(e) => setCsLanguage(e.target.value as any)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2.5 text-slate-800 focus:outline-none cursor-pointer">
                      <option value="en">English</option>
                      <option value="es">Español</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[10px]">Technologies Used</label>
                    <input type="text" value={csTechnologies} onChange={(e) => setCsTechnologies(e.target.value)} placeholder="e.g. Next.js, AWS, PowerBI" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[10px]">The Challenge *</label>
                  <textarea required rows={3} value={csChallenge} onChange={(e) => setCsChallenge(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none resize-none" />
                </div>

                <div>
                  <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[10px]">Our Solution *</label>
                  <textarea required rows={4} value={csSolution} onChange={(e) => setCsSolution(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none resize-none" />
                </div>

                <div>
                  <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[10px]">Measurable Results *</label>
                  <textarea required rows={3} value={csResults} onChange={(e) => setCsResults(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none resize-none" />
                </div>

                <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                  <label className="flex items-center gap-2 font-bold text-slate-700 cursor-pointer">
                    <input type="checkbox" checked={csPublished} onChange={(e) => setCsPublished(e.target.checked)} className="rounded text-[#0F4C81] w-4 h-4 cursor-pointer" />
                    <span>Publish Immediately</span>
                  </label>
                  <button type="submit" className="px-5 py-2.5 bg-[#0F4C81] hover:bg-[#0c3e6b] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer">
                    Save Case Study
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
