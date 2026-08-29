'use client';

import { RefObject, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STAGE_COUNT } from './constants';

type UseTransformationScrollPinOptions = {
  enabled: boolean;
  scrollTrackRef: RefObject<HTMLElement | null>;
  pinRef: RefObject<HTMLElement | null>;
  onProgress: (progress: number) => void;
  onStageChange: (index: number) => void;
};

export function useTransformationScrollPin({
  enabled,
  scrollTrackRef,
  pinRef,
  onProgress,
  onStageChange,
}: UseTransformationScrollPinOptions) {
  const onProgressRef = useRef(onProgress);
  const onStageChangeRef = useRef(onStageChange);

  useEffect(() => {
    onProgressRef.current = onProgress;
    onStageChangeRef.current = onStageChange;
  });

  useEffect(() => {
    if (!enabled) return;

    const scrollTrack = scrollTrackRef.current;
    const pinTarget = pinRef.current;
    if (!scrollTrack || !pinTarget) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: scrollTrack,
        start: 'top top',
        end: () => `+=${window.innerHeight * (STAGE_COUNT - 1)}`,
        pin: pinTarget,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          onProgressRef.current(progress);

          const index =
            progress >= 1
              ? STAGE_COUNT - 1
              : Math.min(STAGE_COUNT - 1, Math.floor(progress * STAGE_COUNT));
          onStageChangeRef.current(index);
        },
      });
    }, scrollTrack);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('resize', refresh);

    return () => {
      window.removeEventListener('resize', refresh);
      ctx.revert();
    };
  }, [enabled, pinRef, scrollTrackRef]);
}
