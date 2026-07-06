/**
 * Reusable form validation utility with enhanced UX features
 * - Smooth scroll to first error
 * - Focus management
 * - Single shake animation
 * - Animation control while typing
 * - ARIA accessibility attributes
 */

import { FieldErrors, UseFormSetFocus } from 'react-hook-form';

export interface ValidationConfig {
  fieldName: string;
  value: string;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  customMessage?: string;
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

/**
 * Scroll to first field with error
 */
export const scrollToFirstError = (errors: FieldErrors<any>) => {
  const firstErrorKey = Object.keys(errors)[0];
  if (firstErrorKey) {
    const element = document.querySelector(`[name="${firstErrorKey}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      (element as HTMLElement).focus();
    }
  }
};

/**
 * Get error ID for aria-describedby
 */
export const getErrorId = (fieldName: string): string => {
  return `${fieldName}-error`;
};

/**
 * Generate unique field ID for accessibility
 */
export const getFieldId = (fieldName: string): string => {
  return `field-${fieldName}`;
};

/**
 * Combine error and helper text IDs for aria-describedby
 */
export const getDescribedByIds = (fieldName: string, hasError: boolean): string => {
  const ids: string[] = [];
  if (hasError) {
    ids.push(getErrorId(fieldName));
  }
  return ids.join(' ');
};

/**
 * Validate email format
 */
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return { isValid: false, message: 'Email is required' };
  }
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  return { isValid: true };
};

/**
 * Validate phone number (basic international format)
 */
export const validatePhone = (phone: string): ValidationResult => {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  if (!phone) {
    return { isValid: false, message: 'Phone is required' };
  }
  if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
    return { isValid: false, message: 'Please enter a valid phone number (minimum 10 digits)' };
  }
  return { isValid: true };
};

/**
 * Validate URL format
 */
export const validateUrl = (url: string): ValidationResult => {
  if (!url) {
    return { isValid: true }; // Optional field
  }
  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, message: 'Please enter a valid URL' };
  }
};

/**
 * Validate text length
 */
export const validateLength = (
  text: string,
  minLength: number,
  maxLength?: number
): ValidationResult => {
  if (text.length < minLength) {
    return {
      isValid: false,
      message: `Minimum ${minLength} characters required`,
    };
  }
  if (maxLength && text.length > maxLength) {
    return {
      isValid: false,
      message: `Maximum ${maxLength} characters allowed`,
    };
  }
  return { isValid: true };
};

/**
 * Get animation classes for error state
 * Single shake animation on error, none during typing
 */
export const getErrorAnimationClass = (hasError: boolean, isValidating: boolean): string => {
  if (isValidating) {
    return ''; // No animation while typing
  }
  if (hasError) {
    return 'animate-shake'; // Single shake on error
  }
  return '';
};

/**
 * Input styling helper with error state
 */
export const getInputErrorClass = (hasError: boolean): string => {
  return hasError
    ? 'border-red-300 ring-1 ring-red-300 aria-invalid:border-red-500'
    : 'border-slate-200';
};

/**
 * Get error message display attributes
 */
export const getErrorAttributes = (fieldName: string, hasError: boolean) => {
  return {
    'aria-invalid': hasError ? 'true' : 'false',
    'aria-describedby': hasError ? getErrorId(fieldName) : undefined,
  };
};

export default {
  scrollToFirstError,
  getErrorId,
  getFieldId,
  getDescribedByIds,
  validateEmail,
  validatePhone,
  validateUrl,
  validateLength,
  getErrorAnimationClass,
  getInputErrorClass,
  getErrorAttributes,
};
