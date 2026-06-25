// Security Utilities for HyperCode AI Consultant
import { NextResponse } from 'next/server';

// 1. Rate Limiting System (In-Memory Map)
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// Periodic cleanup of expired rate limits to prevent memory leaks
if (typeof global !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }, 60000); // clean up every minute
}

export function isRateLimited(
  ip: string,
  limit: number = 60,
  windowMs: number = 60000
): { limited: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    const resetTime = now + windowMs;
    rateLimitMap.set(ip, { count: 1, resetTime });
    return { limited: false, remaining: limit - 1, resetTime };
  }

  if (now > record.resetTime) {
    const resetTime = now + windowMs;
    rateLimitMap.set(ip, { count: 1, resetTime });
    return { limited: false, remaining: limit - 1, resetTime };
  }

  record.count++;
  if (record.count > limit) {
    return { limited: true, remaining: 0, resetTime: record.resetTime };
  }

  return { limited: false, remaining: limit - record.count, resetTime: record.resetTime };
}

export function getClientIp(req: Request): string {
  const headers = req.headers;
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return headers.get('x-real-ip') || '127.0.0.1';
}

// 2. Input Sanitization for XSS Prevention
export function sanitizeInput(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>/g, '') // Strip HTML tags entirely
    .replace(/javascript:/gi, '') // Strip JavaScript protocols
    .trim();
}

export function escapeHtml(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// 3. Spam Honeypot Protection
export function verifyHoneypot(body: Record<string, any>, fieldName: string = 'website_url'): boolean {
  // If the honeypot field is filled, it indicates bot activity
  if (body && body[fieldName] !== undefined && body[fieldName] !== '') {
    return true; // Spam detected
  }
  return false; // Safe
}
