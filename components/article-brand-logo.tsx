import Image from 'next/image';

export interface ArticleBrandLogoProps {
  className?: string;
  size?: 'card' | 'hero';
}

/**
 * Standardized HyperCode Brand Logo Badge for Insights articles.
 * Ensures consistent single-source logo sizing, positioning, background pill,
 * border, shadow, and z-index across all article cards and hero images.
 */
export function ArticleBrandLogo({ className = '', size = 'card' }: ArticleBrandLogoProps) {
  const isHero = size === 'hero';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute select-none z-10 ${
        isHero
          ? 'top-3.5 left-3.5 sm:top-5 sm:left-5'
          : 'top-3 left-3 sm:top-4 sm:left-4'
      } ${className}`}
    >
      <div
        className={`flex items-center justify-center rounded-[10px] sm:rounded-[12px] border border-[#0A1F6B]/12 bg-white/95 shadow-[0_2px_8px_rgba(10,31,107,0.08)] backdrop-blur-[2px] transition-transform duration-300 ${
          isHero
            ? 'px-2.5 py-1.5 sm:px-3 sm:py-2'
            : 'px-2 py-1.5 sm:px-2.5 sm:py-2'
        }`}
      >
        <Image
          src="/hypercodeit.logo-nav.png"
          alt=""
          width={417}
          height={368}
          priority={isHero}
          className={`h-auto object-contain ${
            isHero
              ? 'w-[64px] sm:w-[76px] md:w-[84px]'
              : 'w-[58px] sm:w-[66px] md:w-[72px]'
          }`}
        />
      </div>
    </div>
  );
}

/**
 * Reusable container wrapper that automatically renders the standardized brand logo.
 */
export function ArticleImageFrame({
  children,
  className = '',
  size = 'card',
}: {
  children: React.ReactNode;
  className?: string;
  size?: 'card' | 'hero';
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      <ArticleBrandLogo size={size} />
    </div>
  );
}
