'use client';

import Image from 'next/image';
import type { ClientLogo } from '@/data/client-logos';

export type LogoMarqueeProps = {
  /** Real client/partner logos — component renders nothing when empty. */
  logos: ClientLogo[];
  ariaLabel?: string;
  /** Full loop duration in seconds. */
  durationSeconds?: number;
  className?: string;
};

export function LogoMarquee({
  logos,
  ariaLabel = 'Client and partner logos',
  durationSeconds = 36,
  className = '',
}: LogoMarqueeProps) {
  if (logos.length === 0) return null;

  const track = [...logos, ...logos];

  return (
    <div
      className={`logo-marquee relative min-w-0 ${className}`}
      aria-label={ariaLabel}
      style={{ ['--marquee-duration' as string]: `${durationSeconds}s` }}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-16 bg-gradient-to-r from-[#F5F2EB] to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-16 bg-gradient-to-l from-[#F5F2EB] to-transparent"
        aria-hidden="true"
      />

      <div className="logo-marquee-viewport overflow-hidden">
        <div className="logo-marquee-track flex w-max items-center gap-10 sm:gap-14 md:gap-16">
          {track.map((logo, index) => {
            const image = (
              <Image
                src={logo.src}
                alt={logo.name}
                width={140}
                height={44}
                className="h-7 sm:h-8 w-auto max-w-[7.5rem] sm:max-w-[8.75rem] object-contain object-center opacity-60 grayscale transition-opacity duration-300 hover:opacity-90 motion-reduce:grayscale-0 motion-reduce:opacity-80"
              />
            );

            return (
              <div
                key={`${logo.name}-${index}`}
                className="flex shrink-0 items-center justify-center px-1"
              >
                {logo.href ? (
                  <a
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2332]/20"
                  >
                    {image}
                  </a>
                ) : (
                  image
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
