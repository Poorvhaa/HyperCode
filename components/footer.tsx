'use client';

import Link from 'next/link';
import Image from "next/image"
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.jpg"
                alt="HyperCode"
                width={320}
                height={40}
                priority
                className="h-15 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-slate-600 font-medium">Transforming Data Into Strategic Intelligence</p>
            <div className="space-y-2 text-sm font-medium text-slate-500">
              <a
  href="https://maps.google.com/?q=2095+Hammond+Dr+Suite+B+Schaumburg+IL+60173"
  target="_blank"
  rel="noopener noreferrer"
  className="group flex items-start space-x-2"
>
  <MapPin
    size={16}
    className="text-slate-400 mt-0.5 flex-shrink-0 group-hover:text-[#0F4C81] transition-colors"
  />

  <span className="text-slate-500 group-hover:text-[#0F4C81] transition-colors">
    2095 Hammond Dr Suite B<br />
    Schaumburg, IL 60173
  </span>
</a>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-slate-400 flex-shrink-0" />
                <span>+1 (800) 555-0199</span>
              </div>
              <a
  href="mailto:Info@hypercodeus.com"
  className="group flex items-center space-x-2"
>
  <Mail
    size={16}
    className="text-slate-400 flex-shrink-0 group-hover:text-[#0F4C81] transition-colors"
  />

  <span className="text-slate-500 group-hover:text-[#0F4C81] transition-colors">
    Info@hypercodeus.com
  </span>
</a>
            </div>
            <p className="text-[11px] text-slate-450 font-bold uppercase tracking-wider leading-relaxed pt-2">
              Headquartered in Schaumburg, Illinois. Serving clients nationwide.
            </p>
            <div className="pt-4 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Connect With Us</h4>
              <div className="flex items-center space-x-3">
                <div className="group relative inline-block">
                  <a
                    href="https://www.linkedin.com/company/hypercode-llc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit HyperCode on LinkedIn"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-200/60 hover:bg-[#0F4C81] text-slate-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </a>
                  <div className="pointer-events-none absolute bottom-full left-0 mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-900 text-white text-[10px] px-2.5 py-1 rounded shadow-lg font-medium tracking-normal normal-case z-10">
                    Follow HyperCode on LinkedIn
                    <div className="absolute top-full left-3 border-4 border-transparent border-t-slate-900"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data & Analytics */}
          <div>
            <h3 className="font-semibold text-slate-900 text-[15px] mb-4">Data & Analytics</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/solutions/business-intelligence-consulting" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">
                  Business Intelligence
                </Link>
              </li>
              <li>
                <Link href="/solutions/data-analytics-services" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">
                  Data Analytics
                </Link>
              </li>
              <li>
                <Link href="/solutions/data-warehousing-services" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">
                  Data Warehousing
                </Link>
              </li>
              <li>
                <Link href="/solutions/data-engineering-solutions" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">
                  Data Engineering
                </Link>
              </li>
              <li>
                <Link href="/solutions#big-data" className="text-sm font-medium text-slate-650 hover:text-[#0F4C81] transition-colors">
                  Big Data
                </Link>
              </li>
            </ul>
          </div>

          {/* Digital Solutions */}
          <div>
            <h3 className="font-semibold text-slate-900 text-[15px] mb-4">Digital Solutions</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/solutions/web-development-services" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/solutions/web-development-services#custom-applications" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">
                  Custom Applications
                </Link>
              </li>
              <li>
                <Link href="/solutions/web-development-services#api-integrations" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">
                  API Integrations
                </Link>
              </li>
              <li>
                <Link href="/solutions/web-development-services#cloud-applications" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">
                  Cloud Applications
                </Link>
              </li>
            </ul>
          </div>

          {/* Consulting Services */}
          <div>
            <h3 className="font-semibold text-slate-900 text-[15px] mb-4">Consulting Services</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/solutions#business-analysis" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">
                  Business Analysis
                </Link>
              </li>
              <li>
                <Link href="/solutions#technology-consulting" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">
                  Technology Consulting
                </Link>
              </li>
              <li>
                <Link href="/solutions#agile-project-management" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">
                  Agile Project Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Talent Solutions */}
          <div>
            <h3 className="font-semibold text-slate-900 text-[15px] mb-4">Talent Solutions</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/solutions/it-staffing-solutions" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">
                  IT Staffing
                </Link>
              </li>
              <li>
                <Link href="/solutions/staff-augmentation-services" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">
                  Staff Augmentation
                </Link>
              </li>
              <li>
                <Link href="/staffing#contract-staffing" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">
                  Contract Staffing
                </Link>
              </li>
              <li>
                <Link href="/staffing#direct-placement" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">
                  Direct Placement
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-slate-900 text-[15px] mb-4">Company</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/insights" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Bottom Section */}
        <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <p>© 2026 HyperCode. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/contact" className="hover:text-[#0F4C81]">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-[#0F4C81]">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
