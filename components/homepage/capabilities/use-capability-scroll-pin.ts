'use client';

import { RefObject, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type UseCapabilityScrollPinOptions = {
  enabled: boolean;
  stepCount: number;
  scrollTrackRef: RefObject<HTMLElement | null>;
  pinRef: RefObject<HTMLElement | null>;
  onStepChange: (index: number) => void;
};

export function useCapabilityScrollPin({
  enabled,
  stepCount,
  scrollTrackRef,
  pinRef,
  onStepChange,
}: UseCapabilityScrollPinOptions) {
  const onStepChangeRef = useRef(onStepChange);

  useEffect(() => {
    onStepChangeRef.current = onStepChange;
  });

  useEffect(() => {
    if (!enabled || stepCount < 1) return;

    const scrollTrack = scrollTrackRef.current;
    const pinTarget = pinRef.current;
    if (!scrollTrack || !pinTarget) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: scrollTrack,
        start: 'top top',
        end: () => `+=${window.innerHeight * Math.max(stepCount - 1, 1)}`,
        pin: pinTarget,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;

          const index =
            progress >= 1
              ? stepCount - 1
              : Math.min(stepCount - 1, Math.floor(progress * stepCount));
          onStepChangeRef.current(index);
        },
      });
    }, scrollTrack);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('resize', refresh);

    return () => {
      window.removeEventListener('resize', refresh);
      ctx.revert();
    };
  }, [enabled, pinRef, scrollTrackRef, stepCount]);
}
