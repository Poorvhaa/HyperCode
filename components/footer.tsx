'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 bg-[#0F4C81] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-base">HC</span>
              </div>
              <span className="font-bold text-lg text-slate-900">HyperCode</span>
            </div>
            <p className="text-sm text-slate-600 font-medium">Transforming Data Into Strategic Intelligence</p>
            <div className="space-y-2 text-sm font-medium text-slate-500">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-slate-400 flex-shrink-0" />
                <span>Schaumburg, Illinois</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-slate-400 flex-shrink-0" />
                <span>+1 (800) 555-0199</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-slate-400 flex-shrink-0" />
                <span>info@hypercode.com</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-450 font-bold uppercase tracking-wider leading-relaxed pt-2">
              Headquartered in Schaumburg, Illinois. Serving clients nationwide.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold text-slate-900 text-[15px] mb-4">Solutions</h3>
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

          {/* Services */}
          <div>
            <h3 className="font-semibold text-slate-900 text-[15px] mb-4">Services</h3>
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
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="font-semibold text-slate-900 text-[15px] mb-4">Industries</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/industries" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">
                  Financial Services
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">
                  Healthcare
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">
                  Government
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">
                  Retail & Tech
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
