import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Enterprise Web Development Services | HyperCode',
  description: 'Designing and developing modern, scalable, secure, and high-performance web applications using React, Next.js, and Node.js. Headquartered in Schaumburg, IL.',
  alternates: {
    canonical: 'https://www.hypercode.com/solutions/web-development-services',
  },
};

export default function WebDevelopmentServicesPage() {
  const benefits = [
    {
      title: 'Modern Front-End Architectures',
      desc: 'Deliver blazing-fast user interfaces using React, Next.js, and TypeScript, optimized for Core Web Vitals.',
    },
    {
      title: 'Scalable Full-Stack Engineering',
      desc: 'Build secure, robust backend systems with Node.js, .NET, or Python, backed by relational and cloud databases.',
    },
    {
      title: 'Secure API & ERP Integrations',
      desc: 'Seamlessly connect your custom web portal or SaaS platform to internal databases, CRM systems, and enterprise ERPs.',
    },
    {
      title: 'Responsive Cross-Device Layouts',
      desc: 'Ensure consistency across desktops, tablets, and mobile devices using modern Tailwind CSS frameworks.',
    },
  ];

  const technologies = [
    { name: 'React / Next.js', role: 'Component architectures & SSR speed' },
    { name: 'TypeScript', role: 'Type-safe, robust code execution' },
    { name: 'Node.js / .NET', role: 'Enterprise scalability & API structures' },
    { name: 'AWS / Azure', role: 'Secure, high-availability cloud hosting' },
  ];

  return (
    <main className="relative w-full bg-white text-left">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-slate-50 pt-36 pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-4">
            <span className="text-[10px] font-bold text-[#0F4C81] tracking-widest uppercase bg-white border border-slate-150 px-2.5 py-1 rounded-md">
              Digital Solutions
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Enterprise Web <span className="text-[#0F4C81]">Development</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
              Designing and developing modern, scalable, secure, and high-performance web applications that drive growth.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Build Future-Proof Digital Platforms
          </h2>
          <div className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium space-y-4">
            <p>
              In a digital-first economy, your web presence is the center of your operations. Static, legacy architectures create performance bottlenecks, security vulnerabilities, and scaling challenges. HyperCode's web development practice builds modern, custom web applications that scale seamlessly.
            </p>
            <p>
              Our software engineering teams build on top of React, Next.js, and TypeScript to deliver responsive corporate websites, high-speed SaaS platforms, client portals, and custom dashboard interfaces. We combine solid frontend patterns with secure API integrations and reliable cloud hosting on AWS and Azure.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">Core Capabilities</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Web Engineering Differentiators</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                  <CheckCircle size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900">{benefit.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Expertise Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">Platform Stack</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Our Web Technology Expertise</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, i) => (
              <div key={i} className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="px-3 py-1 bg-slate-50 border border-slate-150 text-[#0F4C81] rounded-lg text-xs font-bold uppercase tracking-wider inline-block">
                    {tech.name}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium pt-2">
                    {tech.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Gen Call-To-Action (Strategic Placement) */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Ready to Scope Your Custom Application?
          </h3>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto font-medium">
            Schedule a consultation with our technology practice directors to design custom web architectures for your organization.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/consultation?service=Web%20Development"
              className="inline-flex items-center justify-center h-11 px-7 bg-[#0F4C81] hover:bg-[#0A365D] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-11 px-7 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
