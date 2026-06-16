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
    <main className="relative w-full">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-[40vh] bg-gradient-to-b from-background to-muted/30 pt-32 pb-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Get in Touch
            </h1>
            <p className="text-xl text-foreground/60 max-w-3xl mx-auto">
              Have a question or ready to get started? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              {/* Location */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Headquarters</h3>
                  </div>
                </div>
                <div className="ml-15 space-y-1">
                  <p className="text-foreground/70">Schaumburg, Illinois</p>
                  <p className="text-foreground/60 text-sm">Serving clients nationwide</p>
                </div>
              </div>

              {/* Hours */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Clock size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Business Hours</h3>
                  </div>
                </div>
                <div className="ml-15 space-y-1 text-foreground/70">
                  <p>Monday - Friday: 8:00 AM - 6:00 PM CST</p>
                  <p className="text-sm text-foreground/60">After-hours consultations available by request</p>
                </div>
              </div>

              {/* Response Time */}
              <div className="p-6 rounded-xl border border-border/40 bg-card">
                <p className="font-semibold text-foreground mb-2">Average Response Time</p>
                <p className="text-accent font-bold text-lg">Within 24 Hours</p>
                <p className="text-sm text-foreground/60 mt-2">
                  We prioritize every inquiry and get back to you promptly.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="p-8 rounded-2xl border border-border/40 bg-card">
                <h2 className="text-3xl font-bold text-foreground mb-8">Send us a Message</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl border border-border/40 bg-card">
              <h3 className="text-xl font-bold text-foreground mb-3">For Consulting Services</h3>
              <p className="text-foreground/60 mb-4">
                Learn how HyperCode can transform your data and drive business results.
              </p>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>• Solution assessments</li>
                <li>• Project proposals</li>
                <li>• Technical discussions</li>
                <li>• ROI analysis</li>
              </ul>
            </div>

            <div className="p-8 rounded-xl border border-border/40 bg-card">
              <h3 className="text-xl font-bold text-foreground mb-3">For Staffing Needs</h3>
              <p className="text-foreground/60 mb-4">
                Access our network of specialized IT professionals and consultants.
              </p>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>• Contract positions</li>
                <li>• Direct hire placements</li>
                <li>• Staff augmentation</li>
                <li>• Project-based teams</li>
              </ul>
            </div>

            <div className="p-8 rounded-xl border border-border/40 bg-card">
              <h3 className="text-xl font-bold text-foreground mb-3">For Partnerships</h3>
              <p className="text-foreground/60 mb-4">
                Join our partner network and expand your service offerings.
              </p>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>• Technology partners</li>
                <li>• Reseller opportunities</li>
                <li>• Strategic alliances</li>
                <li>• Integrations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
