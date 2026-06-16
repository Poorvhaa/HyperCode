'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">HC</span>
              </div>
              <span className="font-bold text-lg text-foreground">HyperCode</span>
            </div>
            <p className="text-sm text-foreground/60 mb-4">Transforming Data Into Strategic Intelligence</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-foreground/60">
                <MapPin size={16} />
                <span>Schaumburg, Illinois</span>
              </div>
              <div className="flex items-center space-x-2 text-foreground/60">
                <Phone size={16} />
                <span>Coming Soon</span>
              </div>
              <div className="flex items-center space-x-2 text-foreground/60">
                <Mail size={16} />
                <span>Coming Soon</span>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/solutions" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  Business Intelligence
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  Data Analytics
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  Data Warehousing
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  Big Data Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/insights" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/staffing" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  IT Staffing
                </Link>
              </li>
              <li>
                <Link href="/staffing" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  Agile Consulting
                </Link>
              </li>
              <li>
                <Link href="/staffing" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  Project Management
                </Link>
              </li>
              <li>
                <Link href="/staffing" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  Database Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Industries</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/industries" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  Financial Services
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  Healthcare
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  Government
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  Retail & Tech
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/40 pt-8">
          <p className="text-sm text-foreground/60 text-center">© 2024 HyperCode. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
