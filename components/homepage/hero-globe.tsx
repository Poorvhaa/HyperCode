'use client';

import { motion, useReducedMotion } from 'framer-motion';

type HeroGlobeProps = {
  className?: string;
};

/** Strategic infrastructure nodes — globe-centric network topology */
const NODES = [
  { id: 'n1', cx: 92, cy: 168, r: 3.5, fill: '#25B5FF', glow: true },
  { id: 'n2', cx: 168, cy: 108, r: 2.5, fill: '#25B5FF', glow: false },
  { id: 'n3', cx: 352, cy: 128, r: 3, fill: '#48B900', glow: true },
  { id: 'n4', cx: 408, cy: 228, r: 2.5, fill: '#25B5FF', glow: false },
  { id: 'n5', cx: 368, cy: 348, r: 3, fill: '#48B900', glow: true },
  { id: 'n6', cx: 168, cy: 368, r: 2.5, fill: '#25B5FF', glow: false },
  { id: 'n7', cx: 260, cy: 248, r: 4, fill: '#ffffff', glow: true, hub: true },
] as const;

const ROUTES = [
  { id: 'r1', d: 'M 92 168 C 130 130, 200 100, 168 108', pulse: true },
  { id: 'r2', d: 'M 168 108 C 230 88, 310 96, 352 128', pulse: false },
  { id: 'r3', d: 'M 352 128 C 390 160, 410 195, 408 228', pulse: false },
  { id: 'r4', d: 'M 408 228 C 395 280, 385 320, 368 348', pulse: true },
  { id: 'r5', d: 'M 368 348 C 310 370, 230 378, 168 368', pulse: false },
  { id: 'r6', d: 'M 168 368 C 140 320, 110 280, 92 168', pulse: false },
  { id: 'r7', d: 'M 260 248 L 352 128', pulse: false, dash: true },
  { id: 'r8', d: 'M 260 248 L 168 368', pulse: false, dash: true },
] as const;

export function HeroGlobe({ className = '' }: HeroGlobeProps) {
  const prefersReducedMotion = useReducedMotion();
  const isReduced = !!prefersReducedMotion;

  return (
    <div className={`relative w-full min-w-0 ${className}`} aria-hidden="true">
      <motion.div
        initial={{ opacity: 0, y: isReduced ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: isReduced ? 0.25 : 0.85,
          ease: [0.23, 1, 0.32, 1],
          delay: isReduced ? 0 : 0.08,
        }}
        className="relative w-full aspect-[5/4] sm:aspect-[4/3] lg:aspect-[1.05/1] max-w-[420px] mx-auto lg:mx-0 lg:max-w-none"
      >
        {/* Ambient depth layer */}
        <div
          className="pointer-events-none absolute inset-[8%] rounded-full opacity-[0.18]"
          style={{
            background:
              'radial-gradient(circle at 55% 45%, rgba(37,181,255,0.14) 0%, rgba(72,185,0,0.06) 45%, transparent 72%)',
          }}
        />

        <svg
          viewBox="0 0 480 460"
          className="relative w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="heroAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#25B5FF" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#48B900" stopOpacity="0.45" />
            </linearGradient>
            <linearGradient id="heroLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(37,181,255,0)" />
              <stop offset="45%" stopColor="rgba(37,181,255,0.55)" />
              <stop offset="100%" stopColor="rgba(72,185,0,0.25)" />
            </linearGradient>
            <linearGradient id="heroLineRev" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(72,185,0,0)" />
              <stop offset="50%" stopColor="rgba(37,181,255,0.45)" />
              <stop offset="100%" stopColor="rgba(72,185,0,0.2)" />
            </linearGradient>
            <radialGradient id="nodeGlowBlue" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#25B5FF" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#25B5FF" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="nodeGlowGreen" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#48B900" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#48B900" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="nodeGlowWhite" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>

          {/* Editorial frame */}
          <rect
            x="48"
            y="40"
            width="384"
            height="380"
            fill="none"
            stroke="rgba(255,255,255,0.085)"
            strokeWidth="1"
          />
          <line
            x1="48"
            y1="40"
            x2="48"
            y2="420"
            stroke="url(#heroAccent)"
            strokeWidth="1.5"
            strokeLinecap="square"
            opacity="0.85"
          />

          {/* Architectural grid */}
          {[100, 160, 220, 280, 340, 400].map((y) => (
            <line
              key={`h-${y}`}
              x1="48"
              y1={y}
              x2="432"
              y2={y}
              stroke="rgba(255,255,255,0.055)"
              strokeWidth="0.75"
            />
          ))}
          {[120, 200, 280, 360].map((x) => (
            <line
              key={`v-${x}`}
              x1={x}
              y1="40"
              x2={x}
              y2="420"
              stroke="rgba(255,255,255,0.045)"
              strokeWidth="0.75"
            />
          ))}

          {/* Globe — layered wireframe */}
          <g opacity="0.9">
            <ellipse
              cx="260"
              cy="248"
              rx="112"
              ry="112"
              fill="none"
              stroke="rgba(37,181,255,0.16)"
              strokeWidth="0.85"
            />
            {[32, 56, 80].map((ry) => (
              <ellipse
                key={`lat-${ry}`}
                cx="260"
                cy="248"
                rx="112"
                ry={ry}
                fill="none"
                stroke="rgba(37,181,255,0.09)"
                strokeWidth="0.75"
              />
            ))}
            {[-60, -30, 0, 30, 60].map((offset) => (
              <ellipse
                key={`lon-${offset}`}
                cx={260 + offset * 0.15}
                cy="248"
                rx={Math.abs(112 - Math.abs(offset) * 0.8)}
                ry="112"
                fill="none"
                stroke="rgba(37,181,255,0.07)"
                strokeWidth="0.75"
                transform={`rotate(${offset * 0.6} 260 248)`}
              />
            ))}
            <path
              d="M 260 136 Q 360 248 260 360 Q 160 248 260 136"
              fill="none"
              stroke="rgba(37,181,255,0.1)"
              strokeWidth="0.85"
            />
            <path
              d="M 148 248 Q 260 180 372 248 Q 260 316 148 248"
              fill="none"
              stroke="rgba(72,185,0,0.08)"
              strokeWidth="0.75"
            />
          </g>

          {/* Data routing paths */}
          {ROUTES.map((route, i) => (
            <path
              key={route.id}
              d={route.d}
              fill="none"
              stroke={i % 2 === 0 ? 'url(#heroLine)' : 'url(#heroLineRev)'}
              strokeWidth={'dash' in route && route.dash ? 0.85 : 1.15}
              strokeLinecap="round"
              strokeDasharray={'dash' in route && route.dash ? '3 5' : undefined}
              opacity={'dash' in route && route.dash ? 0.35 : 0.75}
            />
          ))}

          {/* Node illumination halos */}
          {NODES.filter((n) => n.glow).map((node) => (
            <circle
              key={`glow-${node.id}`}
              cx={node.cx}
              cy={node.cy}
              r={node.hub ? 18 : 12}
              fill={
                node.hub
                  ? 'url(#nodeGlowWhite)'
                  : node.fill === '#48B900'
                    ? 'url(#nodeGlowGreen)'
                    : 'url(#nodeGlowBlue)'
              }
              filter="url(#softBlur)"
              opacity={0.85}
            >
              {!isReduced && (
                <animate
                  attributeName="opacity"
                  values="0.55;0.9;0.55"
                  dur={node.hub ? '5s' : '4s'}
                  begin={`${NODES.indexOf(node) * 0.6}s`}
                  repeatCount="indefinite"
                />
              )}
            </circle>
          ))}

          {/* Infrastructure nodes */}
          {NODES.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.hub ? 5 : node.r + 1.5}
                fill="none"
                stroke={node.fill}
                strokeWidth="0.75"
                opacity={node.hub ? 0.4 : 0.25}
              />
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                fill={node.fill}
                opacity={node.hub ? 0.85 : 0.72}
              />
              {node.hub && (
                <circle cx={node.cx} cy={node.cy} r="1.5" fill="#25B5FF" opacity="0.9" />
              )}
            </g>
          ))}

          {/* Data pulses along primary routes */}
          {!isReduced &&
            ROUTES.filter((r) => r.pulse).map((route, i) => (
              <circle key={`pulse-${route.id}`} r="2" fill="#25B5FF" opacity="0.85">
                <animateMotion
                  dur={`${6 + i * 1.5}s`}
                  repeatCount="indefinite"
                  path={route.d}
                  begin={`${i * 2.5}s`}
                />
                <animate
                  attributeName="opacity"
                  values="0;0.9;0.9;0"
                  keyTimes="0;0.1;0.85;1"
                  dur={`${6 + i * 1.5}s`}
                  repeatCount="indefinite"
                  begin={`${i * 2.5}s`}
                />
              </circle>
            ))}

          {/* Corner anchor ticks — architectural precision */}
          {[
            [48, 40],
            [432, 40],
            [48, 420],
            [432, 420],
          ].map(([x, y]) => (
            <g key={`tick-${x}-${y}`}>
              <line
                x1={x}
                y1={y}
                x2={x + (x < 260 ? 8 : -8)}
                y2={y}
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="0.75"
              />
              <line
                x1={x}
                y1={y}
                x2={x}
                y2={y + (y < 248 ? 8 : -8)}
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="0.75"
              />
            </g>
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
