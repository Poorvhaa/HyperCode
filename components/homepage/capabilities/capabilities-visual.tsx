'use client';

import { motion } from 'framer-motion';
import { useLandingMotion } from '@/hooks/use-landing-motion';
import { getVisualTheme, type CapabilityServiceId } from './capabilities-constants';

type CapabilitiesVisualProps = {
  serviceId: CapabilityServiceId;
  className?: string;
  compact?: boolean;
  /** Active service name — ties the graphic to the capability being viewed */
  activeLabel?: string;
};

function ThemeSvg({ serviceId }: { serviceId: CapabilityServiceId }) {
  const stroke = 'rgba(37,181,255,0.45)';
  const strokeMuted = 'rgba(255,255,255,0.12)';
  const fill = 'rgba(20,91,255,0.08)';

  switch (serviceId) {
    case 'ai': {
      const modules = [
        { x: 72, active: false },
        { x: 158, active: false },
        { x: 244, active: true },
        { x: 330, active: false },
      ];
      return (
        <svg viewBox="0 0 400 360" className="h-full w-full" aria-hidden="true">
          {modules.map((mod, i) => (
            <g key={mod.x}>
              {i > 0 && (
                <>
                  <line
                    x1={modules[i - 1].x + 34}
                    y1="178"
                    x2={mod.x - 34}
                    y2="178"
                    stroke={strokeMuted}
                    strokeWidth="0.75"
                  />
                  <polygon
                    points={`${mod.x - 38},178 ${mod.x - 44},174 ${mod.x - 44},182`}
                    fill={stroke}
                    fillOpacity="0.45"
                  />
                </>
              )}
              <rect
                x={mod.x - 34}
                y="138"
                width="68"
                height="80"
                rx="8"
                fill={mod.active ? 'rgba(20,91,255,0.14)' : fill}
                stroke={mod.active ? stroke : strokeMuted}
                strokeWidth={mod.active ? '1.1' : '0.75'}
              />
              <rect x={mod.x - 22} y="154" width="44" height="5" rx="2.5" fill={mod.active ? stroke : 'rgba(255,255,255,0.14)'} fillOpacity={mod.active ? 0.55 : 1} />
              <rect x={mod.x - 22} y="166" width="32" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
              <rect x={mod.x - 22} y="176" width="38" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
            </g>
          ))}
        </svg>
      );
    }

    case 'bi':
      return (
        <svg viewBox="0 0 400 360" className="h-full w-full" aria-hidden="true">
          {[80, 130, 180, 230, 280, 330].map((x, i) => (
            <rect
              key={x}
              x={x - 18}
              y={260 - (i + 1) * 28}
              width="36"
              height={(i + 1) * 28}
              fill={fill}
              stroke={strokeMuted}
              strokeWidth="0.75"
            />
          ))}
          <line x1="60" y1="280" x2="340" y2="280" stroke={strokeMuted} strokeWidth="0.75" />
          <polyline points="80,220 130,180 180,200 230,140 280,160 330,100" fill="none" stroke={stroke} strokeWidth="1.25" />
        </svg>
      );

    case 'data':
      return (
        <svg viewBox="0 0 400 360" className="h-full w-full" aria-hidden="true">
          <line x1="60" y1="280" x2="340" y2="280" stroke={strokeMuted} strokeWidth="0.75" />
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1="60" y1={280 - i * 40} x2="340" y2={280 - i * 40} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          ))}
          <polyline points="80,240 130,210 180,220 230,170" fill="none" stroke={stroke} strokeWidth="1.25" />
          <polyline
            points="230,170 280,150 330,110"
            fill="none"
            stroke={stroke}
            strokeWidth="1.25"
            strokeDasharray="5 6"
            strokeOpacity="0.65"
          />
          {[80, 130, 180, 230].map((x, i) => (
            <circle key={x} cx={x} cy={[240, 210, 220, 170][i]} r="4" fill="#25B5FF" fillOpacity="0.7" />
          ))}
          <circle cx="330" cy="110" r="5" fill="none" stroke="#25B5FF" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      );

    case 'platforms':
      return (
        <svg viewBox="0 0 400 360" className="h-full w-full" aria-hidden="true">
          {[0, 1, 2, 3].map((layer) => (
            <g key={layer}>
              <ellipse cx="200" cy={130 + layer * 36} rx={90 - layer * 8} ry="14" fill={fill} stroke={strokeMuted} strokeWidth="0.75" />
              <path
                d={`M ${110 + layer * 8} ${130 + layer * 36} L ${110 + layer * 8} ${154 + layer * 36} A ${90 - layer * 8} 14 0 0 0 ${290 - layer * 8} ${154 + layer * 36} L ${290 - layer * 8} ${130 + layer * 36}`}
                fill="rgba(20,91,255,0.04)"
                stroke={layer === 2 ? stroke : strokeMuted}
                strokeWidth={layer === 2 ? '1' : '0.6'}
              />
            </g>
          ))}
          {[160, 200, 240].map((x, i) => (
            <line key={x} x1={x} y1="118" x2={x} y2="250" stroke={strokeMuted} strokeWidth="0.5" strokeDasharray="3 4" opacity={0.5 + i * 0.15} />
          ))}
        </svg>
      );

    case 'software':
      return (
        <svg viewBox="0 0 400 360" className="h-full w-full" aria-hidden="true">
          <polygon points="120,100 300,130 280,260 100,230" fill={fill} stroke={strokeMuted} strokeWidth="0.75" />
          <polygon points="150,140 320,165 300,280 130,255" fill="rgba(20,91,255,0.04)" stroke={stroke} strokeWidth="0.75" />
          <rect x="168" y="178" width="64" height="8" fill={stroke} fillOpacity="0.35" />
          <rect x="168" y="196" width="48" height="6" fill="rgba(255,255,255,0.15)" />
        </svg>
      );

    case 'web':
      return (
        <svg viewBox="0 0 400 360" className="h-full w-full" aria-hidden="true">
          <rect x="90" y="90" width="220" height="180" rx="10" fill={fill} stroke={strokeMuted} strokeWidth="0.75" />
          <rect x="90" y="90" width="220" height="28" rx="10" fill="rgba(20,91,255,0.1)" />
          <line x1="90" y1="118" x2="310" y2="118" stroke={strokeMuted} strokeWidth="0.75" />
          <circle cx="108" cy="104" r="4" fill="#25B5FF" fillOpacity="0.5" />
          <circle cx="122" cy="104" r="4" fill="rgba(255,255,255,0.2)" />
          <rect x="110" y="136" width="80" height="56" fill="rgba(20,91,255,0.06)" stroke={strokeMuted} strokeWidth="0.5" />
          <rect x="204" y="136" width="86" height="24" fill="rgba(255,255,255,0.06)" stroke={strokeMuted} strokeWidth="0.5" />
          <rect x="204" y="168" width="86" height="24" fill="rgba(255,255,255,0.04)" stroke={strokeMuted} strokeWidth="0.5" />
          <rect x="110" y="204" width="180" height="8" rx="2" fill={stroke} fillOpacity="0.3" />
          <rect x="110" y="220" width="130" height="6" rx="2" fill="rgba(255,255,255,0.1)" />
        </svg>
      );

    case 'mobile':
      return (
        <svg viewBox="0 0 400 360" className="h-full w-full" aria-hidden="true">
          <rect x="148" y="70" width="104" height="220" rx="16" fill={fill} stroke={stroke} strokeWidth="1" />
          <rect x="158" y="92" width="84" height="168" rx="4" fill="rgba(3,10,20,0.35)" stroke={strokeMuted} strokeWidth="0.5" />
          <rect x="168" y="108" width="64" height="8" rx="2" fill={stroke} fillOpacity="0.35" />
          <rect x="168" y="124" width="48" height="6" rx="2" fill="rgba(255,255,255,0.12)" />
          <rect x="168" y="140" width="56" height="40" rx="4" fill="rgba(20,91,255,0.1)" stroke={strokeMuted} strokeWidth="0.5" />
          <rect x="168" y="190" width="64" height="6" rx="2" fill="rgba(255,255,255,0.08)" />
          <circle cx="200" cy="278" r="6" fill="none" stroke={strokeMuted} strokeWidth="0.75" />
        </svg>
      );

    case 'cloud':
      return (
        <svg viewBox="0 0 400 360" className="h-full w-full" aria-hidden="true">
          {[0, 1, 2].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={90 + col * 58}
                y={90 + row * 52}
                width="44"
                height="36"
                fill={fill}
                stroke={strokeMuted}
                strokeWidth="0.75"
              />
            )),
          )}
          {[
            [112, 108, 260, 160],
            [260, 108, 112, 160],
            [186, 126, 186, 212],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="0.75" strokeOpacity="0.5" />
          ))}
        </svg>
      );

    case 'digital':
      return (
        <svg viewBox="0 0 400 360" className="h-full w-full" aria-hidden="true">
          <circle cx="200" cy="180" r="72" fill="none" stroke={strokeMuted} strokeWidth="0.75" />
          {[0, 1, 2, 3].map((i) => {
            const angle = (i / 4) * Math.PI * 2 - Math.PI / 2;
            const x = 200 + Math.cos(angle) * 72;
            const y = 180 + Math.sin(angle) * 72;
            const nx = 200 + Math.cos(angle) * 92;
            const ny = 180 + Math.sin(angle) * 92;
            return (
              <g key={i}>
                <line x1={x} y1={y} x2={nx} y2={ny} stroke={stroke} strokeWidth="0.75" />
                <circle cx={nx} cy={ny} r="10" fill={fill} stroke={stroke} strokeWidth="0.75" />
                <polygon
                  points={`${x},${y} ${x - 4},${y - 8} ${x + 4},${y - 8}`}
                  fill={stroke}
                  fillOpacity="0.5"
                  transform={`rotate(${i * 90} ${x} ${y})`}
                />
              </g>
            );
          })}
          <circle cx="200" cy="180" r="16" fill={fill} stroke={stroke} strokeWidth="1" />
        </svg>
      );

    case 'staffing':
    default:
      return (
        <svg viewBox="0 0 400 360" className="h-full w-full" aria-hidden="true">
          <circle cx="200" cy="160" r="52" fill="none" stroke={strokeMuted} strokeWidth="0.75" />
          {[
            [200, 80],
            [290, 140],
            [260, 250],
            [140, 250],
            [110, 140],
          ].map(([x, y], i) => (
            <g key={i}>
              <line x1="200" y1="160" x2={x} y2={y} stroke={strokeMuted} strokeWidth="0.75" />
              <circle cx={x} cy={y} r="10" fill={fill} stroke={stroke} strokeWidth="0.75" />
            </g>
          ))}
          <circle cx="200" cy="160" r="14" fill={fill} stroke={stroke} strokeWidth="1" />
        </svg>
      );
  }
}

export function CapabilitiesVisual({
  serviceId,
  className = '',
  compact = false,
  activeLabel,
}: CapabilitiesVisualProps) {
  const { enableMotion, isReduced } = useLandingMotion();
  const themeId = getVisualTheme(serviceId);

  return (
    <div
      className={`relative overflow-hidden ${compact ? 'aspect-[4/3] max-h-[200px]' : 'aspect-[4/3.6] min-h-[280px] lg:min-h-[320px]'} ${className}`}
      aria-hidden="true"
    >
      {activeLabel && !compact && (
        <p className="absolute left-4 top-4 z-10 max-w-[calc(100%-2rem)] truncate text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-white/45">
          {activeLabel}
        </p>
      )}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(20,91,255,0.12) 0%, transparent 70%)',
        }}
      />
      <div className="absolute inset-0">
        {enableMotion && !isReduced ? (
          <motion.div
            key={themeId}
            className="h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ThemeSvg serviceId={themeId} />
          </motion.div>
        ) : (
          <ThemeSvg key={themeId} serviceId={themeId} />
        )}
      </div>
    </div>
  );
}
