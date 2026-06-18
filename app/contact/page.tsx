import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ContactForm } from '@/components/contact-form';
import { Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Contact HyperCode | General Inquiries & Partnerships',
  description: 'Get in touch with HyperCode for general business inquiries, career questions, partnership proposals, and media requests.',
  alternates: {
    canonical: 'https://www.hypercode.com/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="relative w-full bg-white text-left">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-slate-50 pt-36 pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Contact <span className="text-[#0F4C81]">HyperCode</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
              Have a general question, career inquiry, or partnership opportunity? We would love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              {/* Location */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4C81]">
                    <MapPin size={20} />
                  </div>
                  <h3 className="font-bold text-slate-900">Headquarters</h3>
                </div>
                <div className="pl-13 space-y-1">
                  <p className="text-sm font-semibold text-slate-700">Schaumburg, Illinois</p>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Serving clients nationwide</p>
                </div>
              </div>

              {/* Hours */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4C81]">
                    <Clock size={20} />
                  </div>
                  <h3 className="font-bold text-slate-900">Business Hours</h3>
                </div>
                <div className="pl-13 space-y-1.5 text-sm font-semibold text-slate-700">
                  <p>Monday - Friday: 8:00 AM - 6:00 PM CST</p>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">After-hours by request</p>
                </div>
              </div>

              {/* Response Time Card */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm space-y-2">
                <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">Response SLA</p>
                <p className="text-2xl font-bold text-[#0F4C81]">Within 24 Hours</p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  We review every inquiry and route it to the appropriate department promptly.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="p-6 sm:p-10 rounded-3xl border border-slate-200 bg-white shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Send a Message</h2>
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Additional Info Cards Grid */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Box 1 */}
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">For Consulting</h3>
                <p className="text-xs sm:text-sm text-slate-655 leading-relaxed font-medium">
                  Looking to architect a new cloud solution, optimize analytics, or scope an enterprise data project?
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/consultation"
                  className="inline-flex items-center text-xs font-bold text-[#0F4C81] hover:text-[#0c3c66] transition-colors gap-1"
                >
                  <span>Request Consultation</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Box 2 */}
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">For Staffing</h3>
                <p className="text-xs sm:text-sm text-slate-655 leading-relaxed font-medium">
                  Need contract talent, team augmentation, or permanent placements for your engineering squads?
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/consultation?service=IT%20Staffing"
                  className="inline-flex items-center text-xs font-bold text-[#0F4C81] hover:text-[#0c3c66] transition-colors gap-1"
                >
                  <span>Request Staffing</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Box 3 */}
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">For Partnerships</h3>
                <p className="text-xs sm:text-sm text-slate-655 leading-relaxed font-medium">
                  Interested in joint technology offerings, reseller options, or strategic system integration alliances?
                </p>
              </div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Select "Partnership Opportunity" above
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
