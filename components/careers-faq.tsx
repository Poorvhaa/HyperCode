'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export function CareersFAQ() {
  const faqs: FAQItem[] = [
    {
      question: 'Are remote positions available?',
      answer: 'Yes. HyperCode supports hybrid, on-site, and fully remote project configurations depending on client requirements and your geographical location. We discuss work arrangement preferences during your initial connect step.',
    },
    {
      question: 'How long does the hiring process take?',
      answer: 'Our hiring process is highly streamlined. The average duration from initial application review to a formal offer is 2 to 3 weeks, ensuring quick decisions for qualified tech talent.',
    },
    {
      question: 'What benefits are offered?',
      answer: 'We provide comprehensive health insurance (medical, dental, and vision), a 401(k) matching program, generous professional development budgets for cloud/data certifications, and flexible paid time off structures.',
    },
    {
      question: 'Do you sponsor visas?',
      answer: 'Yes. We sponsor H-1B visas and handle transfer processes for highly qualified candidates matching specific enterprise technology roles and project timelines.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white border-b border-slate-100 text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">FAQ</h2>
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-200 hover:border-slate-300"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                >
                  <span className="text-sm font-bold text-slate-900 pr-4">{faq.question}</span>
                  <div className="text-slate-400 flex-shrink-0">
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
