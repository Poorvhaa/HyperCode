'use client';

import { FormEvent, RefObject, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Mail, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { brandButtonMotion, buttonSpring, buttonSpringTransition } from '@/lib/motion-tokens';

type NewsletterMorphInputProps = {
  formRef?: RefObject<HTMLFormElement | null>;
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  onBlur: () => void;
  placeholder: string;
  subscribeLabel: string;
  submitting: boolean;
  hasEmailError: boolean;
  touched: boolean;
  isValidEmail: boolean;
  error?: string;
  errorId?: string;
};

export function NewsletterMorphInput({
  formRef,
  email,
  onEmailChange,
  onSubmit,
  onBlur,
  placeholder,
  subscribeLabel,
  submitting,
  hasEmailError,
  touched,
  isValidEmail,
  error,
  errorId = 'footer-email-error',
}: NewsletterMorphInputProps) {
  const reducedMotion = useReducedMotion();
  const isReduced = reducedMotion === true;
  const [expanded, setExpanded] = useState(isReduced);
  const inputRef = useRef<HTMLInputElement>(null);
  const spring = buttonSpringTransition(isReduced);
  const layoutSpring = isReduced ? { duration: 0 } : buttonSpring;

  useEffect(() => {
    if (isReduced) {
      setExpanded(true);
    }
  }, [isReduced]);

  useEffect(() => {
    if (expanded) {
      inputRef.current?.focus();
    }
  }, [expanded]);

  const showExpanded = expanded || isReduced;

  return (
    <form ref={formRef} onSubmit={onSubmit} className="w-full min-w-0">
      <motion.div
        layout
        transition={layoutSpring}
        className={cn(
          'flex w-full min-w-0 items-center overflow-hidden',
          showExpanded
            ? cn(
                'rounded-md border bg-white/[0.06]',
                hasEmailError
                  ? 'border-red-400/60'
                  : touched && isValidEmail && !error
                    ? 'border-[#2DBD3E]/50'
                    : 'border-white/12 focus-within:border-[#5B9AFF]/50',
              )
            : 'h-12 w-fit max-w-full rounded-full bg-gradient-to-r from-[#1769F5] via-[#08A8D8] to-[#2DBD3E] shadow-[0_4px_14px_0_rgba(20,91,255,0.25)]',
        )}
      >
        {!showExpanded ? (
          <motion.button
            type="button"
            layout="position"
            onClick={() => setExpanded(true)}
            disabled={submitting}
            aria-expanded={false}
            aria-label={subscribeLabel}
            className="inline-flex h-12 items-center justify-center gap-2 px-7 text-[0.875rem] font-semibold leading-none text-white"
            initial={brandButtonMotion.primary.rest}
            animate={brandButtonMotion.primary.rest}
            whileHover={isReduced ? undefined : brandButtonMotion.primary.hover}
            whileTap={isReduced ? undefined : brandButtonMotion.primary.tap}
            transition={spring}
          >
            <Mail size={16} className="shrink-0" aria-hidden="true" />
            <span>{subscribeLabel}</span>
          </motion.button>
        ) : (
          <motion.div
            layout="position"
            className="flex w-full min-w-0 items-center"
            transition={layoutSpring}
          >
            <input
              ref={inputRef}
              type="email"
              name="email"
              required
              placeholder={placeholder}
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              onBlur={onBlur}
              autoComplete="email"
              inputMode="email"
              aria-invalid={hasEmailError}
              aria-describedby={hasEmailError ? errorId : undefined}
              aria-expanded={true}
              disabled={submitting}
              className="min-w-0 flex-1 bg-transparent py-2 pl-3 pr-2 text-body-sm text-white placeholder-white/35 focus:outline-none focus:ring-0"
            />
            {touched && isValidEmail && !error && (
              <span className="mr-1 shrink-0 text-[#2DBD3E]" aria-hidden="true">
                <Check size={14} className="stroke-[3px]" />
              </span>
            )}
            <motion.button
              type="submit"
              disabled={submitting}
              aria-label={subscribeLabel}
              className={cn(
                'mr-1 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-gradient-to-r from-[#1769F5] via-[#08A8D8] to-[#2DBD3E] text-white',
                submitting && 'cursor-not-allowed opacity-50',
              )}
              initial={brandButtonMotion.primary.rest}
              animate={brandButtonMotion.primary.rest}
              whileHover={isReduced || submitting ? undefined : brandButtonMotion.primary.hover}
              whileTap={isReduced || submitting ? undefined : brandButtonMotion.primary.tap}
              transition={spring}
            >
              <ArrowRight size={16} aria-hidden="true" />
            </motion.button>
          </motion.div>
        )}
      </motion.div>
      {error && (
        <p
          id={errorId}
          className="mt-1.5 flex items-center gap-1 text-caption font-medium text-red-400"
          role="alert"
        >
          <AlertCircle size={12} className="shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </form>
  );
}
