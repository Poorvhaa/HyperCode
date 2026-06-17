import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ContactForm } from '@/components/contact-form';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const metadata = {
  title: 'Contact HyperCode | Get in Touch',
  description: 'Contact HyperCode for consulting, staffing, or business intelligence solutions. Headquartered in Schaumburg, Illinois.',
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
              Get in <span className="text-[#0F4C81]">Touch</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
              Have a question or ready to get started? We would love to hear from you.
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
                  We prioritize every inquiry and get back to you promptly.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="p-6 sm:p-10 rounded-3xl border border-slate-200 bg-white shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Send us a Message</h2>
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
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900">For Consulting</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Learn how HyperCode can transform your data structures and deliver business results.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <li>• Solution assessments</li>
                <li>• Project proposals</li>
                <li>• Technical reviews</li>
                <li>• ROI analysis</li>
              </ul>
            </div>

            {/* Box 2 */}
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900">For Staffing</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Access our national pipeline of certified consultants and engineering squads.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <li>• Contract positions</li>
                <li>• Direct placements</li>
                <li>• Team augmentation</li>
                <li>• Project engineering</li>
              </ul>
            </div>

            {/* Box 3 */}
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900">For Partnerships</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Join our partner ecosystem and expand your system integration offerings.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <li>• Technology partnerships</li>
                <li>• Reseller options</li>
                <li>• Strategic alliances</li>
                <li>• System integration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
