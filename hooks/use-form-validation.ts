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

  /**
   * Explicit order of fields matching the visible top-to-bottom order of the form.
   */
  fieldOrder?: string[];
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
    navbarSelector = 'header, nav, [class*="navbar"], [class*="header"]',
    fieldOrder = [],
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
  if (errorPaths.length === 0 && Object.keys(errors).length === 0) return;

  // Query all standard interactive controls in DOM order
  const selectors = [
    'input:not([type="hidden"]):not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[role="combobox"]',
    '[tabindex="0"]',
  ].join(', ');

  const controls = Array.from(form.querySelectorAll<HTMLElement>(selectors));

  // Determine the first invalid field by visual order
  let firstInvalidControl: HTMLElement | null = null;

  if (fieldOrder.length > 0) {
    const getNestedValue = (obj: any, path: string): any => {
      const parts = path.split('.');
      let current = obj;
      for (const part of parts) {
        if (current && typeof current === 'object' && part in current) {
          current = current[part];
        } else {
          return undefined;
        }
      }
      return current;
    };

    const firstInvalidField = fieldOrder.find((field) => {
      const val = getNestedValue(errors, field);
      return val !== undefined && val !== null;
    });

    if (firstInvalidField) {
      firstInvalidControl = form.querySelector<HTMLElement>(
        `[name="${firstInvalidField}"], [data-field-name="${firstInvalidField}"], #${firstInvalidField}`
      );
    }
  }

  // Fallback to DOM order of controls if not found via fieldOrder
  if (!firstInvalidControl) {
    firstInvalidControl = controls.find((control) => {
      const name = control.getAttribute('name');
      return (
        (name && errorPaths.includes(name)) ||
        control.getAttribute('aria-invalid') === 'true'
      );
    }) || null;
  }

  if (!firstInvalidControl) return;

  // Set scroll margin top to 120px to prevent header overlap
  firstInvalidControl.style.scrollMarginTop = '120px';

  // Smoothly scroll to the target top position centered in viewport
  firstInvalidControl.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'nearest'
  });

  // Focus the interactive control via requestAnimationFrame with preventScroll: true
  requestAnimationFrame(() => {
    if (!firstInvalidControl) return;

    // Check if the element is hidden (e.g. Radix UI hidden inputs)
    const isHidden =
      firstInvalidControl.offsetWidth === 0 &&
      firstInvalidControl.offsetHeight === 0;

    if (isHidden) {
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
  });
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
