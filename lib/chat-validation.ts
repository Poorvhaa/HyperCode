export interface ValidationResult {
  valid: boolean;
  value?: string;
  error?: string;
}

function cleanText(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

function validateName(value: string): ValidationResult {
  const cleaned = cleanText(value);

  if (cleaned.length < 2) {
    return {
      valid: false,
      error: 'Please enter your full name.'
    };
  }

  if (cleaned.length > 80) {
    return {
      valid: false,
      error: 'Name must be 80 characters or fewer.'
    };
  }

  // Unicode letter, mark, dot, apostrophe, space, and hyphen
  const namePattern = /^[\p{L}\p{M}.' -]+$/u;

  if (!namePattern.test(cleaned)) {
    return {
      valid: false,
      error: 'Name can contain only letters, spaces, hyphens, apostrophes, and periods.'
    };
  }

  return {
    valid: true,
    value: cleaned
  };
}

function validateCompany(value: string): ValidationResult {
  const cleaned = cleanText(value);

  if (cleaned.length < 2) {
    return {
      valid: false,
      error: 'Please enter a valid company name.'
    };
  }

  if (cleaned.length > 120) {
    return {
      valid: false,
      error: 'Company name must be 120 characters or fewer.'
    };
  }

  return {
    valid: true,
    value: cleaned
  };
}

function validateEmail(value: string): ValidationResult {
  const cleaned = value.trim().toLowerCase();

  if (cleaned.length > 254) {
    return {
      valid: false,
      error: 'Email address is too long.'
    };
  }

  const emailPattern =
    /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])+)+$/i;

  const hasAt = cleaned.includes('@');
  const parts = cleaned.split('@');
  const domain = parts[1] || '';
  const domainParts = domain.split('.');
  const lastDomainPart = domainParts[domainParts.length - 1] || '';

  if (!hasAt || parts.length !== 2 || !domain || domainParts.length < 2 || lastDomainPart.length < 2 || cleaned.endsWith('.')) {
    return {
      valid: false,
      error: 'Please enter a valid email address, for example name@company.com.'
    };
  }

  if (!emailPattern.test(cleaned)) {
    return {
      valid: false,
      error: 'Please enter a valid email address, for example name@company.com.'
    };
  }

  return {
    valid: true,
    value: cleaned
  };
}

function validatePhone(value: string): ValidationResult {
  const cleaned = value.trim();

  const allowedCharacters = /^[0-9+\-()\s]+$/;

  if (!allowedCharacters.test(cleaned)) {
    return {
      valid: false,
      error: 'Phone number can contain only numbers, spaces, parentheses, plus signs, and hyphens.'
    };
  }

  const digitsOnly = cleaned.replace(/\D/g, '');

  if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    return {
      valid: false,
      error: 'Please enter a valid phone number containing 7 to 15 digits.'
    };
  }

  return {
    valid: true,
    value: cleaned
  };
}

function validateRequiredText(
  value: string,
  label: string,
  maxLength = 500
): ValidationResult {
  const cleaned = cleanText(value);

  if (!cleaned) {
    return {
      valid: false,
      error: `Please provide ${label}.`
    };
  }

  if (cleaned.length > maxLength) {
    return {
      valid: false,
      error: `${label} must be ${maxLength} characters or fewer.`
    };
  }

  return {
    valid: true,
    value: cleaned
  };
}

export function validateChatAnswer(
  question: string | null,
  value: string
): ValidationResult {
  if (!question) {
    return {
      valid: true,
      value: cleanText(value)
    };
  }

  if (question === 'lead_name') {
    return validateName(value);
  }
  if (question === 'lead_company') {
    return validateCompany(value);
  }
  if (question === 'lead_email') {
    return validateEmail(value);
  }
  if (question === 'lead_phone') {
    return validatePhone(value);
  }
  if (question === 'lead_preferred_contact') {
    const cleaned = cleanText(value).toLowerCase();
    if (cleaned === 'email' || cleaned === 'phone' || cleaned === 'either') {
      return {
        valid: true,
        value: value.trim()
      };
    }
    return {
      valid: false,
      error: 'Please select Email, Phone, or Either.'
    };
  }
  if (question === 'lead_industry') {
    return validateRequiredText(value, 'your industry name', 100);
  }

  if (question.endsWith('timeline') || question.endsWith('start_date')) {
    return validateRequiredText(value, 'the timeline', 100);
  }
  if (question.endsWith('budget')) {
    const cleaned = cleanText(value);
    if (!cleaned) {
      return {
        valid: false,
        error: 'Please provide the budget range.'
      };
    }
    return {
      valid: true,
      value: cleaned
    };
  }
  if (
    question.endsWith('features') ||
    question.endsWith('required_features') ||
    question.endsWith('description') ||
    question.endsWith('challenge') ||
    question.endsWith('objective') ||
    question.endsWith('skills') ||
    question.endsWith('goal')
  ) {
    return validateRequiredText(value, 'the requirements/features', 1000);
  }

  return validateRequiredText(value, 'a valid response', 500);
}