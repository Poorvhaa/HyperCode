import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { isRateLimited, getClientIp, sanitizeInput, verifyHoneypot } from '@/lib/security';
import {
  NAME_REGEX,
  EMAIL_REGEX,
  PHONE_REGEX,
  COMPANY_REGEX,
  getPhoneDigitCount,
  sanitizePayload
} from '@/lib/validation';

const schema = z.object({
  conversation_id: z.string().min(8).max(100),
  name: z.string().trim().min(2).max(80).regex(NAME_REGEX),
  email: z.string().trim().regex(EMAIL_REGEX),
  phone: z.string().trim().regex(PHONE_REGEX).refine(val => {
    const digits = getPhoneDigitCount(val);
    return digits >= 7 && digits <= 15;
  }),
  company: z.string().trim().min(2).regex(COMPANY_REGEX),
  industry: z.string().min(2).max(100),
  service_interest: z.string().min(2).max(100),
  budget_range: z.string().min(2).max(100),
  timeline: z.string().min(2).max(100),
  message: z.string().trim().min(20).max(2000),
  language: z.enum(['en', 'es']),
  website_url: z.string().optional().default(''), // Honeypot field
});

// Lead Scoring Function
function calculateLeadScore(
  company: string,
  industry: string,
  email: string,
  budgetRange: string,
  timeline: string
): number {
  let score = 0;

  // 1. Budget Range Scoring
  const budget = budgetRange.toLowerCase();
  if (budget.includes('50k+') || budget.includes('enterprise')) {
    score += 45;
  } else if (budget.includes('25k') || budget.includes('50k')) {
    score += 35;
  } else if (budget.includes('10k') || budget.includes('25k')) {
    score += 25;
  } else if (budget.includes('5k') || budget.includes('10k')) {
    score += 15;
  } else {
    score += 5;
  }

  // 2. Timeline Scoring
  const time = timeline.toLowerCase();
  if (time.includes('immediate') || time.includes('urgent') || time.includes('1 month')) {
    score += 30;
  } else if (time.includes('1-3 months') || time.includes('3 months')) {
    score += 20;
  } else if (time.includes('3-6 months')) {
    score += 10;
  } else {
    score += 5;
  }

  // 3. Industry & Enterprise Indicator
  const ind = industry.toLowerCase();
  const comp = company.toLowerCase();
  const corporateKeywords = ['enterprise', 'inc', 'corp', 'corporation', 'healthcare', 'financial', 'bank', 'retail', 'tech'];
  const matchesCorporate = corporateKeywords.some(kw => ind.includes(kw) || comp.includes(kw));
  
  if (matchesCorporate || ind.includes('enterprise')) {
    score += 15;
  } else if (comp.length > 2) {
    score += 5;
  }

  // 4. Corporate Email check (no free mail providers)
  const freeEmailProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com', 'icloud.com', 'aol.com', 'mail.com'];
  const emailDomain = email.split('@')[1]?.toLowerCase() || '';
  const isFreeEmail = freeEmailProviders.includes(emailDomain);
  
  if (emailDomain && !isFreeEmail) {
    score += 15; // Extra priority for corporate domain
  }

  return score;
}

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Check
    const ip = getClientIp(req);
    const limitStatus = isRateLimited(ip, 5, 60000); // Max 5 lead captures per minute per IP
    if (limitStatus.limited) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 2. Honeypot Spam Protection
    if (verifyHoneypot(body, 'website_url')) {
      console.warn('[Security Warning] Spam blocked by honeypot field.');
      return NextResponse.json({ success: true, message: 'Submission successfully received (spam filtered)' });
    }

    const sanitizedBody = sanitizePayload(body);
    const parsed = schema.parse(sanitizedBody);

    const conversationId = parsed.conversation_id;
    const name = sanitizeInput(parsed.name);
    const email = sanitizeInput(parsed.email);
    const phone = sanitizeInput(parsed.phone);
    const company = sanitizeInput(parsed.company);
    const industry = sanitizeInput(parsed.industry);
    const serviceInterest = sanitizeInput(parsed.service_interest);
    const budgetRange = sanitizeInput(parsed.budget_range);
    const timeline = sanitizeInput(parsed.timeline);
    const message = parsed.message ? sanitizeInput(parsed.message) : '';
    const language = parsed.language;

    // Calculate Lead Score
    const leadScore = calculateLeadScore(company, industry, email, budgetRange, timeline);

    let savedLead = null;
    try {
      savedLead = await db.saveChatLead({
        conversation_id: conversationId,
        name,
        email,
        phone,
        company,
        industry,
        service_interest: serviceInterest,
        budget_range: budgetRange,
        timeline,
        message,
        lead_score: leadScore,
        language
      });
    } catch (dbError) {
      console.warn('[DB Warning] Fallback database lead entry:', dbError);
      savedLead = {
        id: 'mock-lead-id-' + Math.random().toString(36).substring(2, 9),
        conversation_id: conversationId,
        name,
        email,
        phone,
        company,
        industry,
        service_interest: serviceInterest,
        budget_range: budgetRange,
        timeline,
        message,
        lead_score: leadScore,
        status: 'New',
        language,
        created_at: new Date().toISOString()
      };
    }

    return NextResponse.json({
      success: true,
      lead: savedLead
    });
  } catch (err) {
    console.error('Save lead route error:', err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: err.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
