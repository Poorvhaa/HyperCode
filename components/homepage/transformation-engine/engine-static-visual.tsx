'use client';

import {
  CAPABILITY_COUNT,
  getAllNodeProgress,
  getCapabilityPosition2D,
} from './constants';

type EngineStaticVisualProps = {
  scrollProgress: number;
  activeIndex?: number;
  labels: string[];
  coreLabel: string;
  className?: string;
};

export function EngineStaticVisual({
  scrollProgress,
  activeIndex: activeIndexProp,
  labels,
  coreLabel,
  className = '',
}: EngineStaticVisualProps) {
  const nodeProgress = getAllNodeProgress(scrollProgress);
  const activeIndex =
    activeIndexProp ??
    Math.min(
      CAPABILITY_COUNT - 1,
      scrollProgress >= 1 ? CAPABILITY_COUNT - 1 : Math.floor(scrollProgress * CAPABILITY_COUNT),
    );

  return (
    <div
      className={`relative w-full aspect-square max-h-[min(88vw,420px)] lg:max-h-none ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="engineCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#25B5FF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#25B5FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="200" cy="200" r="120" fill="url(#engineCoreGlow)" />
        <ellipse
          cx="200"
          cy="200"
          rx="130"
          ry="130"
          fill="none"
          stroke="rgba(20,91,255,0.12)"
          strokeWidth="1"
        />

        {Array.from({ length: CAPABILITY_COUNT }).map((_, i) => {
          const pos = getCapabilityPosition2D(i);
          const x2 = pos.x * 400;
          const y2 = pos.y * 400;
          const progress = nodeProgress[i];
          const lineLen = Math.hypot(x2 - 200, y2 - 200);
          const dashOffset = lineLen * (1 - progress);
          const active = i === activeIndex;

          return (
            <g key={i}>
              <line
                x1="200"
                y1="200"
                x2={x2}
                y2={y2}
                stroke={active ? '#145BFF' : '#25B5FF'}
                strokeWidth={active ? 1.5 : 1}
                strokeOpacity={0.12 + progress * 0.35}
                strokeDasharray={lineLen}
                strokeDashoffset={dashOffset}
              />
              {progress > 0.05 && (
                <>
                  <circle
                    cx={x2}
                    cy={y2}
                    r={active ? 10 : 7}
                    fill={active ? '#145BFF' : '#25B5FF'}
                    opacity={0.15 + progress * 0.55}
                  />
                  <circle
                    cx={x2}
                    cy={y2}
                    r={active ? 5 : 4}
                    fill={active ? '#145BFF' : '#25B5FF'}
                    opacity={0.5 + progress * 0.5}
                  />
                  {progress > 0.6 && labels[i] && (
                    <text
                      x={x2}
                      y={y2 + (y2 < 200 ? -16 : 22)}
                      textAnchor="middle"
                      className="fill-[#5C6470] text-[11px] font-semibold"
                      opacity={Math.min(1, (progress - 0.6) * 2.5)}
                    >
                      {labels[i]}
                    </text>
                  )}
                </>
              )}
            </g>
          );
        })}

        <circle cx="200" cy="200" r="32" fill="rgba(20,91,255,0.15)" stroke="#25B5FF" strokeWidth="1" opacity="0.9" />
        <circle cx="200" cy="200" r="18" fill="#145BFF" opacity="0.85" />
        <text
          x="200"
          y="248"
          textAnchor="middle"
          className="fill-[#8B9BB0] text-[10px] font-semibold tracking-[0.12em] uppercase"
        >
          {coreLabel}
        </text>
      </svg>
    </div>
  );
}
