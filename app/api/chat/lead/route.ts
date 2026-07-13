import { NextResponse } from 'next/server';
import { z } from 'zod';
import { isRateLimited, getClientIp, sanitizeInput, verifyHoneypot } from '@/lib/security';
import {
  NAME_REGEX,
  EMAIL_REGEX,
  PHONE_REGEX,
  COMPANY_REGEX,
  getPhoneDigitCount,
  sanitizePayload
} from '@/lib/validation';
import { submitChatLead } from '@/lib/chat-lead-mailer';

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
    const budgetRange = parsed.budget_range;
    const timeline = parsed.timeline;
    const message = parsed.message ? sanitizeInput(parsed.message) : '';
    const language = parsed.language;

    const result = await submitChatLead({
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
      language
    });

    return NextResponse.json({
      success: true,
      saved: true,
      adminEmailSent: result.adminEmailSent,
      userEmailSent: result.userEmailSent,
      data: result,
      warning:
        result.adminEmailSent && result.userEmailSent
          ? undefined
          : 'Your lead details were saved, but one or more emails could not be sent.'
    });
  } catch (err) {
    console.error('Save lead route error:', err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Validation failed', details: err.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
