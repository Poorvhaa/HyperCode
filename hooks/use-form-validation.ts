'use client';

import { useCallback, useEffect, useRef } from 'react';

/**
 * Configuration options for the form validation scroll utility.
 */
export interface UseFormValidationOptions {
  /**
   * Numeric pixel offset to apply, in addition to any detected navbar height.
   * Useful to give breathing room above the focused element.
   * @default 24
   */
  extraOffset?: number;

  /**
   * Fallback offset in pixels to use if no sticky header/navbar is detected in the DOM.
   * @default 100
   */
  navbarOffset?: number;

  /**
   * CSS selector to query for the sticky header or navbar element.
   * If found, its actual height will be computed and used as the offset.
   * @default 'header, nav, [class*="navbar"], [class*="header"]'
   */
  navbarSelector?: string;

  /**
   * Scroll behavior when moving to the first invalid field.
   * @default 'smooth'
   */
  scrollBehavior?: ScrollBehavior;

  /**
   * If provided, the hook will watch this errors object and automatically
   * run the scroll-to-error logic when errors are present and change.
   */
  errors?: Record<string, any>;

  /**
   * Whether to automatically run the validation scroll and focus behavior when
   * the watched `errors` object changes. Requires `errors` to be passed to the hook.
   * @default false
   */
  autoFocusOnError?: boolean;

  /**
   * Custom CSS class name or selector to identify error message container elements
   * when dynamically linking them with `aria-describedby`.
   * @default '.text-red-500, .text-red-655, [role="alert"], .error-message'
   */
  errorSelector?: string;
}

/**
 * Standalone helper function to scroll to and focus the first invalid form control.
 * Can be used in vanilla JS, non-React environments, or manual event handlers.
 *
 * @param form - The HTML form element.
 * @param errors - A flat or nested errors object (e.g., from react-hook-form).
 * @param options - Configuration options.
 */
export function focusAndScrollToError(
  form: HTMLFormElement,
  errors: Record<string, any> = {},
  options: UseFormValidationOptions = {}
): void {
  const {
    extraOffset = 24,
    navbarOffset = 100,
    navbarSelector = 'header, nav, [class*="navbar"], [class*="header"]',
    scrollBehavior = 'smooth',
    errorSelector = '.text-red-500, .text-red-655, [role="alert"], .error-message',
  } = options;

  // Flatten error keys to support nested structures (e.g., "address.street")
  const getErrorPaths = (obj: any, prefix = ''): string[] => {
    if (!obj || typeof obj !== 'object') return [];
    
    // Check if it is a field error object (from react-hook-form)
    if ('message' in obj || 'type' in obj) {
      return [prefix];
    }

    return Object.keys(obj).flatMap((key) => {
      const currentPath = prefix ? `${prefix}.${key}` : key;
      const val = obj[key];
      if (val && typeof val === 'object') {
        // If it looks like a FieldError leaf
        if ('message' in val || 'type' in val) {
          return [currentPath];
        }
        return getErrorPaths(val, currentPath);
      }
      return [currentPath];
    });
  };

  const errorPaths = getErrorPaths(errors);
  if (errorPaths.length === 0) return;

  // Query all standard interactive controls in DOM order
  const selectors = [
    'input:not([type="hidden"]):not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[role="combobox"]',
    '[tabindex="0"]',
  ].join(', ');

  const controls = Array.from(form.querySelectorAll<HTMLElement>(selectors));

  // Keep track of which controls we've marked to clear/update
  controls.forEach((control) => {
    // Check if this control has an error
    const name = control.getAttribute('name');
    const hasError = name && errorPaths.includes(name);

    if (hasError) {
      control.setAttribute('aria-invalid', 'true');
      
      // Apply shake-error class to trigger the visual shake animation
      control.classList.add('shake-error');
      control.classList.add('ring-2');
      control.classList.add('ring-red-500');
      control.classList.add('border-red-500');
      control.classList.add('bg-red-50');
      setTimeout(() => {
        control.classList.remove('shake-error');
      }, 500);

      // Try to find the associated error display element to link via aria-describedby
      let errorEl = form.querySelector(`#${name}-error`);
      
      if (!errorEl) {
        // Look within the control's parent container for an error-like element
        const parent = control.parentElement;
        if (parent) {
          errorEl = parent.querySelector(errorSelector);
          if (errorEl && !errorEl.id) {
            errorEl.id = `${name}-error`;

            errorEl.classList.add('animate-pulse');

setTimeout(() => {
  errorEl.classList.remove('animate-pulse');
}, 1000);
          }
        }
      }

      if (errorEl && errorEl.id) {
        control.setAttribute('aria-describedby', errorEl.id);
      } else {
        // Fallback standard naming
        control.setAttribute('aria-describedby', `${name}-error`);
      }
    } else {
      // Clear accessibility attributes if no error present
      control.removeAttribute('aria-invalid');
      control.classList.remove('shake-error');
      const describedBy = control.getAttribute('aria-describedby');
      if (describedBy && (describedBy === `${name}-error` || describedBy.endsWith('-error'))) {
        control.removeAttribute('aria-describedby');
      }
    }

    const clearError = () => {
  control.classList.remove(
    'ring-2',
    'ring-red-500',
    'border-red-500',
    'bg-red-50'
  );

  control.removeAttribute('aria-invalid');

  control.removeEventListener('input', clearError);
  control.removeEventListener('change', clearError);
};

control.addEventListener('input', clearError);
control.addEventListener('change', clearError);
  });

  // Find the first control that has an error
  const firstInvalidControl = controls.find((control) => {
    const name = control.getAttribute('name');
    return (
      (name && errorPaths.includes(name)) ||
      control.getAttribute('aria-invalid') === 'true'
    );
  });

  if (!firstInvalidControl) return;

  // Calculate navbar height dynamically
  let detectedNavbarHeight = 0;
  try {
    const navbar = document.querySelector(navbarSelector);
    if (navbar) {
      const rect = navbar.getBoundingClientRect();
      const style = window.getComputedStyle(navbar);
      // Only use height if the navbar is fixed or sticky
      const isStickyOrFixed =
        style.position === 'fixed' ||
        style.position === 'sticky' ||
        window.scrollY > 0 && rect.top <= 1; // logical sticky detection

      if (isStickyOrFixed && rect.height > 0) {
        detectedNavbarHeight = rect.height;
      }
    }
  } catch (e) {
    console.warn('Error detecting navbar height:', e);
  }

  const finalOffset = (detectedNavbarHeight || navbarOffset) + extraOffset;

  // Calculate target scroll position
  const controlRect = firstInvalidControl.getBoundingClientRect();
  const scrollTopFallback = window.pageYOffset || document.documentElement.scrollTop;
  const absoluteControlTop = controlRect.top + scrollTopFallback;
  const viewportCenter = window.innerHeight * 0.25;

const targetScrollTop = Math.max(
  0,
  absoluteControlTop - finalOffset - viewportCenter
);

  // Smoothly scroll to the target top position
  firstInvalidControl.scrollIntoView({
  behavior: 'smooth',
  block: 'center',
});
window.scrollBy({
  top: -finalOffset,
  behavior: 'instant',
});

  // Focus the element after a microtask, ensuring layout handles scroll correctly.
  // Also handle visual controls (like Radix UI Select triggers) where native input is hidden.
  setTimeout(() => {
    const isHidden =
      firstInvalidControl.offsetWidth === 0 &&
      firstInvalidControl.offsetHeight === 0;

    if (isHidden) {
      // Find the nearest visible focusable sibling/descendant in its parent container
      const parent = firstInvalidControl.parentElement;
      if (parent) {
        const visibleFocusable = parent.querySelector<HTMLElement>(
          'button, [role="combobox"], [tabindex="0"], a, input:not([type="hidden"]), select, textarea'
        );
        if (visibleFocusable) {
          visibleFocusable.focus({ preventScroll: true });
          return;
        }
      }
    }

    firstInvalidControl.focus({ preventScroll: true });
  }, 250);
}

/**
 * React hook to manage form validation focus and scroll interactions.
 * Returns a form ref to attach to the form element, and a manual trigger callback.
 */
export function useFormValidation(options: UseFormValidationOptions = {}) {
  const formRef = useRef<HTMLFormElement | null>(null);

  const triggerFocus = useCallback(
    (errorsObject?: Record<string, any>) => {
      if (formRef.current) {
        // Fallback to options.errors if no object was passed to the callback
        const targetErrors = errorsObject || options.errors || {};
        focusAndScrollToError(formRef.current, targetErrors, options);
      }
    },
    [options]
  );

  // Automatically trigger when watched errors change, if autoFocusOnError is true
  const prevErrorsRef = useRef<string>('');
  
  useEffect(() => {
    if (!options.autoFocusOnError || !options.errors || !formRef.current) return;

    const errorKeys = Object.keys(options.errors);
    if (errorKeys.length === 0) return;

    const serializedErrors = JSON.stringify(options.errors);
    if (serializedErrors !== prevErrorsRef.current) {
      prevErrorsRef.current = serializedErrors;
      triggerFocus(options.errors);
    }
  }, [options.errors, options.autoFocusOnError, triggerFocus]);

  return {
    formRef,
    focusAndScrollToError: triggerFocus,
  };
}
