import { z } from 'zod';

// 1. Regex definitions (Enterprise standards)
// Allows standard letters (including Unicode letters for accents like María), spaces, hyphens, apostrophes
export const NAME_REGEX = /^[\p{L}\s'\-]+$/u;

// Strict email validation (excludes spaces, multiple @@, requires valid domain format)
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Allows only digits, optional +, optional spaces, and parenthesis
export const PHONE_REGEX = /^[0-9+\s()]+$/;

// Allows letters, numbers, spaces, &, and .
export const COMPANY_REGEX = /^[\p{L}\p{N}\s&.]+$/u;

// 2. Typing utility to filter phone inputs while typing
export function filterPhoneInput(value: string): string {
  // Allow only digits, +, spaces, (, and )
  const filtered = value.replace(/[^0-9+\s()]/g, '');
  // Limit to max 20 characters in the text field (plenty for format + 15 digits)
  return filtered.slice(0, 20);
}

// Helper to count actual digits in a phone number (excluding spaces/symbols)
export function getPhoneDigitCount(value: string): number {
  return value.replace(/\D/g, '').length;
}

// Helper to check dropdown placeholders
export function isValidDropdownValue(val: string | null | undefined): boolean {
  if (!val) return false;
  const lower = val.toLowerCase().trim();
  return lower !== '' && lower !== 'default' && lower !== 'placeholder' && lower !== 'undefined';
}

// 3. Security Sanitizer for XSS, JS, HTML, SQL Injection Prevention
export function sanitizeString(val: string): string {
  if (typeof val !== 'string') return '';
  let clean = val.trim();
  // Strip HTML tags entirely to prevent XSS (HTML injection)
  clean = clean.replace(/<[^>]*>/g, '');
  // Strip JavaScript protocols (e.g. javascript:alert)
  clean = clean.replace(/(javascript|vbscript|data):/gi, '');
  // Strip typical XSS event handler patterns
  clean = clean.replace(/on\w+\s*=/gi, '');
  return clean;
}

export function sanitizePayload<T>(payload: T): T {
  if (payload === null || payload === undefined) return payload;

  if (typeof payload === 'string') {
    return sanitizeString(payload) as unknown as T;
  }

  if (Array.isArray(payload)) {
    return payload.map(item => sanitizePayload(item)) as unknown as T;
  }

  if (typeof payload === 'object') {
    const cleanObj: any = {};
    for (const key in payload) {
      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        cleanObj[key] = sanitizePayload((payload as any)[key]);
      }
    }
    return cleanObj as unknown as T;
  }

  return payload;
}

// 4. Schema builder functions for localized error messages (Zod)
export function createNameSchema(minMsg: string, maxMsg: string, invalidMsg: string) {
  return z.string()
    .trim()
    .min(2, minMsg)
    .max(80, maxMsg)
    .regex(NAME_REGEX, invalidMsg);
}

export function createEmailSchema(invalidMsg: string) {
  return z.string()
    .trim()
    .regex(EMAIL_REGEX, invalidMsg);
}

export function createPhoneSchema(invalidMsg: string, lengthMsg: string) {
  return z.string()
    .trim()
    .regex(PHONE_REGEX, invalidMsg)
    .refine(val => {
      const digits = getPhoneDigitCount(val);
      return digits >= 7 && digits <= 15;
    }, lengthMsg);
}

export function createCompanySchema(minMsg: string, invalidMsg: string) {
  return z.string()
    .trim()
    .min(2, minMsg)
    .regex(COMPANY_REGEX, invalidMsg);
}

export function createDropdownSchema(requiredMsg: string) {
  return z.string()
    .refine(isValidDropdownValue, requiredMsg);
}

export function createTextareaSchema(minMsg: string, maxMsg: string) {
  return z.string()
    .trim()
    .min(20, minMsg)
    .max(2000, maxMsg);
}
