import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { 
  BarChart3, 
  TrendingUp, 
  Database, 
  Cpu, 
  Globe, 
  FileText, 
  Layers, 
  Lightbulb, 
  Users, 
  UserCheck, 
  Clock, 
  ShieldCheck, 
  Check, 
  ArrowRight,
  Code
} from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Data Analytics, Web Development & Talent Solutions | HyperCode',
  description: 'Explore HyperCode\'s unified enterprise services: Data & Analytics, Digital Solutions (Web Development), Business Consulting, and Tech Talent Solutions.',
  alternates: {
    canonical: 'https://www.hypercode.com/solutions',
  },
};

const serviceCategories = [
  {
    id: 'data-analytics',
    title: 'Data & Analytics',
    description: 'Transforming complex databases, cloud formats, and raw telemetry into unified enterprise insights.',
    services: [
      {
        id: 'business-intelligence',
        title: 'Business Intelligence',
        shortDesc: 'Power BI, Tableau, and Advanced Reporting',
        path: '/solutions/business-intelligence-consulting',
        benefits: [
          'Real-time dashboard creation',
          'Interactive data visualization',
          'Automated reporting workflows',
          'Data-informed decision making',
          'Executive scorecards',
          'Self-service analytics',
        ],
        technologies: ['Power BI', 'Tableau', 'Qlik', 'Looker'],
        process: ['Assessment', 'Design', 'Implementation', 'Training', 'Support'],
        icon: BarChart3
      },
      {
        id: 'data-analytics-services',
        title: 'Data Analytics',
        shortDesc: 'Predictive Modeling, ML & Insights',
        path: '/solutions/data-analytics-services',
        benefits: [
          'Predictive ML modeling',
          'Statistical analysis',
          'Machine learning loops',
          'Customer lifetime analytics',
          'Market trend forecasting',
          'Operations optimization',
        ],
        technologies: ['Python', 'R', 'SQL', 'Apache Spark'],
        process: ['Data Collection', 'Analysis', 'Modeling', 'Validation', 'Deployment'],
        icon: TrendingUp
      },
      {
        id: 'data-warehousing',
        title: 'Data Warehousing',
        shortDesc: 'Cloud Warehousing, Data Lakes & ETL',
        path: '/solutions/data-warehousing-services',
        benefits: [
          'Enterprise integration',
          'Cloud-native architecture',
          'Scalable data lakes',
          'ETL pipeline automation',
          'Data quality management',
          'Cloud billing optimization',
        ],
        technologies: ['Snowflake', 'BigQuery', 'Redshift', 'Azure Synapse'],
        process: ['Planning', 'Design', 'Migration', 'Optimization', 'Maintenance'],
        icon: Database
      },
      {
        id: 'data-engineering',
        title: 'Data Engineering',
        shortDesc: 'Tested Data Pipelines & Integrations',
        path: '/solutions/data-engineering-solutions',
        benefits: [
          'Robust ETL/ELT pipelines',
          'Real-time stream ingestion',
          'Data quality schema checks',
          'Third-party API syncs',
          'Pipeline health monitoring',
          'Schema migration scripts',
        ],
        technologies: ['Airflow', 'dbt', 'Fivetran', 'Prefect'],
        process: ['Assessment', 'Pipeline Design', 'Development', 'Testing', 'Deployment'],
        icon: Cpu
      },
      {
        id: 'big-data',
        title: 'Big Data Solutions',
        shortDesc: 'Hadoop, Spark & Stream Processing',
        path: '/contact',
        benefits: [
          'Large-scale data storage',
          'Real-time streaming logic',
          'Distributed server nodes',
          'Dataflow orchestration',
          'Telemetry optimizations',
          'Cost efficiency at scale',
        ],
        technologies: ['Hadoop', 'Spark', 'Kafka', 'Flink'],
        process: ['Architecture', 'Setup', 'Development', 'Testing', 'Deployment'],
        icon: Globe
      }
    ]
  },
  {
    id: 'digital-solutions',
    title: 'Digital Solutions',
    description: 'Designing and developing modern, scalable, secure, and high-performance web applications that drive business growth and digital transformation.',
    services: [
      {
        id: 'web-development',
        title: 'Web Development',
        shortDesc: 'Corporate Websites, Custom Applications, E-Commerce & SaaS Platforms',
        path: '/solutions/web-development-services',
        benefits: [
          'Modern React & Next.js architectures',
          'Responsive, mobile-first design system',
          'Secure API & ERP integrations',
          'High-performance PageSpeed scores',
          'Scalable serverless cloud deployments',
          'Clean, well-documented source code',
        ],
        technologies: [
          'React',
          'Next.js',
          'TypeScript',
          'Node.js',
          'Tailwind CSS',
          'AWS',
          'Azure',
          'Custom Web Apps',
          'SaaS Platforms',
          'API Integrations',
          'Responsive Design'
        ],
        process: [
          'Discovery & Planning',
          'UI/UX Architecture Design',
          'Full-Stack Frontend & Backend Development',
          'API Integrations & Security Auditing',
          'Performance Optimization & Cloud Deployment'
        ],
        icon: Code
      }
    ]
  },
  {
    id: 'consulting-services',
    title: 'Consulting Services',
    description: 'Bridging the gap between corporate technology investments and strategic operational results.',
    services: [
      {
        id: 'business-analysis',
        title: 'Business Analysis',
        shortDesc: 'Strategy alignment, requirements gathering, and process mapping',
        path: '/contact',
        benefits: [
          'Align technology with business goals',
          'Detailed requirement documents',
          'Process flow optimization',
          'Stakeholder alignment',
          'Gap analysis audits',
          'Risk mitigation roadmaps',
        ],
        technologies: ['Jira', 'Confluence', 'Visio', 'Miro'],
        process: ['Stakeholder Interviews', 'Requirements Gathering', 'Process Mapping', 'Gap Analysis', 'Strategic Recommendation'],
        icon: FileText
      },
      {
        id: 'technology-consulting',
        title: 'Technology Consulting',
        shortDesc: 'Tech stack selection, architecture advisory, and cloud strategy',
        path: '/contact',
        benefits: [
          'Optimal tech stack design',
          'Future-proof architecture',
          'Cloud readiness audits',
          'Cost optimization plans',
          'Vendor evaluation metrics',
          'Security audit alignment',
        ],
        technologies: ['Cloud Architecture', 'SaaS Strategy', 'Migration Plans', 'ROI Analysis'],
        process: ['Infrastructure Audit', 'Stack Evaluation', 'Architecture Design', 'Cost Modeling', 'Execution Roadmap'],
        icon: Lightbulb
      },
      {
        id: 'agile-project-management',
        title: 'Agile Project Management',
        shortDesc: 'Scrum, Kanban, and modern agile program delivery',
        path: '/contact',
        benefits: [
          'Improved sprint velocity',
          'Predictable delivery cycles',
          'Clear task accountability',
          'Minimized project creep',
          'CI/CD release alignment',
          'Team resource utilization',
        ],
        technologies: ['Scrum', 'Agile Principles', 'Azure DevOps', 'Jira Align'],
        process: ['Sprint Planning', 'Daily Standups', 'Backlog Grooming', 'Retrospectives', 'Velocity Tracking'],
        icon: Layers
      }
    ]
  },
  {
    id: 'talent-solutions',
    title: 'Talent Solutions',
    description: 'Sourcing, vetting, and deploying top-tier database, cloud, and engineering specialists.',
    services: [
      {
        id: 'it-staffing',
        title: 'IT Staffing',
        shortDesc: 'Placing database, cloud, and analytics specialists',
        path: '/solutions/it-staffing-solutions',
        benefits: [
          'Access to 12,000+ candidates',
          'Technical screen filters',
          'Background check vetting',
          'VMS billing compliance',
          'Fast 14-day placement loop',
          'Direct compliance oversight',
        ],
        technologies: ['Bullhorn', 'JobDiva', 'Technical Screens', 'Code Vetting'],
        process: ['Requirement Intake', 'Sourcing & Screening', 'Technical Evaluation', 'Client Interviews', 'Onboarding Support'],
        icon: Users
      },
      {
        id: 'staff-augmentation',
        title: 'Staff Augmentation',
        shortDesc: 'Scale active tech teams with specialized consultants',
        path: '/solutions/staff-augmentation-services',
        benefits: [
          'Seamless team integration',
          'No long-term liability',
          'Active sprint alignment',
          'Flexible contract durations',
          'Direct task reporting',
          'Immediate scaling velocity',
        ],
        technologies: ['Slack Integration', 'Git Collaboration', 'Agile Sprints', 'VPN Setups'],
        process: ['Skills Audit', 'Consultant Matching', 'Environment Setup', 'Standup Integration', 'Performance Reviews'],
        icon: UserCheck
      },
      {
        id: 'contract-staffing',
        title: 'Contract Staffing',
        shortDesc: 'Flexible, project-based resources for critical deliverables',
        path: '/staffing#contract-staffing',
        benefits: [
          'Scale for peak demands',
          'Cost-effective contract terms',
          'Specific skills injection',
          'Zero headcount liability',
          'Continuous project backup',
          'Simplified VMS invoice billing',
        ],
        technologies: ['SAP Fieldglass', 'Beeline', 'Workday', 'VMS Integrations'],
        process: ['SOW Scoping', 'Talent Matching', 'Contract Execution', 'Weekly Timesheets', 'Resource Rolloff'],
        icon: Clock
      },
      {
        id: 'direct-placement',
        title: 'Direct Placement',
        shortDesc: 'Permanent hiring for key managers and developers',
        path: '/staffing#direct-placement',
        benefits: [
          'Permanent leadership search',
          'Exclusive talent network',
          'Candidate retention guarantee',
          'Cultural fit evaluation',
          'Salary benchmarking advice',
          'Comprehensive background screens',
        ],
        technologies: ['Workday', 'iCIMS', 'Executive Search', 'Cultural Screens'],
        process: ['Search Scoping', 'Executive Sourcing', 'Multi-stage Screening', 'Offer Advisory', 'Placement Guarantee'],
        icon: ShieldCheck
      }
    ]
  }
];

export default function SolutionsPage() {
  return (
    <main className="relative w-full bg-white text-left">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-slate-50 pt-36 pb-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F2744] tracking-tight leading-[1.15]">
              Enterprise <span className="text-[#0F4C81]">Solutions</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-650 font-medium leading-relaxed">
              Comprehensive cloud data systems, strategic consulting frameworks, and specialized talent recruitment architectures.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Quick Anchors Bar */}
      <div className="sticky top-20 bg-white border-b border-slate-200/80 z-30 py-3.5 shadow-sm flex items-center justify-center gap-6 md:gap-10">
        {serviceCategories.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.id}`}
            className="text-xs font-bold uppercase tracking-widest text-[#0F2744] hover:text-[#0F4C81] transition-colors"
          >
            {cat.title}
          </a>
        ))}
      </div>

      {/* Categories Content Sections */}
      <section className="bg-white">
        {serviceCategories.map((category) => (
          <div key={category.id} id={category.id} className="py-24 border-b border-slate-150 scroll-mt-36">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Category Header */}
              <div className="max-w-3xl mb-16 space-y-3">
                <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase">
                  Service Category
                </h2>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0F2744] tracking-tight">
                  {category.title}
                </h3>
                <p className="text-slate-600 text-base font-medium leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Service Cards Loop */}
              <div className="space-y-20">
                {category.services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <div 
                      key={service.id} 
                      id={service.id} 
                      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch scroll-mt-36"
                    >
                      {/* Left: Content Card */}
                      <div className="space-y-6 flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                              <Icon size={20} />
                            </div>
                            <h4 className="text-2xl font-bold text-[#0F2744] tracking-tight">{service.title}</h4>
                          </div>
                          <p className="text-sm font-bold text-[#0F4C81] uppercase tracking-wide leading-none">{service.shortDesc}</p>
                        </div>

                        <div className="space-y-3">
                          <h5 className="text-xs font-bold text-[#0F2744] uppercase tracking-widest">Key Benefits</h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-slate-600">
                            {service.benefits.map((benefit, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <Check size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h5 className="text-xs font-bold text-[#0F2744] uppercase tracking-widest">Technologies & Standards</h5>
                          <div className="flex flex-wrap gap-1.5">
                            {service.technologies.map((tech, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-slate-50 border border-slate-200/80 text-slate-550 rounded-lg text-xs font-bold uppercase tracking-wider"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2">
                          <Link
                            href={service.path}
                            className="inline-flex items-center justify-center h-10 px-5 bg-[#0F4C81] hover:bg-[#0A365D] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
                          >
                            <span>Learn More</span>
                            <ArrowRight size={14} className="ml-1.5" />
                          </Link>
                        </div>
                      </div>

                      {/* Right: Process Card */}
                      <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-6">
                        <h5 className="text-xs font-bold text-[#0F2744] uppercase tracking-widest">Our Practice Process</h5>
                        <div className="space-y-4">
                          {service.process.map((step, i) => (
                            <div key={i} className="flex gap-4">
                              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs">
                                {i + 1}
                              </div>
                              <div className="flex-1 pt-1.5 text-left">
                                <p className="text-sm font-bold text-slate-800 leading-none">{step}</p>
                                {i < service.process.length - 1 && (
                                  <div className="w-px h-8 bg-slate-200 ml-4 mt-2" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-3xl font-extrabold text-[#0F2744] tracking-tight">Ready to Deploy Certified Solutions?</h3>
          <p className="text-base sm:text-lg text-slate-650 max-w-xl mx-auto font-medium">
            Schedule a consultation with our practice directors to align your data pipelines, tech strategy, or recruiting requirements.
          </p>
          <div>
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center h-11 px-7 bg-[#0F4C81] hover:bg-[#0A365D] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
