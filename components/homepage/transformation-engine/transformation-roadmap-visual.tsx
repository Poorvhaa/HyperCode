'use client';

import { motion } from 'framer-motion';
import { useLandingMotion } from '@/hooks/use-landing-motion';

const BLOCKS = [
  { id: 'business', x: 68, y: 58, w: 88, h: 52, label: 'BUSINESS' },
  { id: 'data', x: 244, y: 58, w: 88, h: 52, label: 'DATA' },
  { id: 'workflows', x: 68, y: 210, w: 88, h: 52, label: 'WORKFLOWS' },
  { id: 'systems', x: 244, y: 210, w: 88, h: 52, label: 'SYSTEMS' },
] as const;

const CENTER = { x: 200, y: 160 };

type TransformationRoadmapVisualProps = {
  stageIndex: number;
  compact?: boolean;
  className?: string;
};

function blockCenter(b: (typeof BLOCKS)[number]) {
  return { x: b.x + b.w / 2, y: b.y + b.h / 2 };
}

export function TransformationRoadmapVisual({
  stageIndex,
  compact = false,
  className = '',
}: TransformationRoadmapVisualProps) {
  const { isReduced } = useLandingMotion();
  const stage = Math.min(5, Math.max(0, stageIndex));

  const showFoundation = stage >= 1;
  const showModules = stage >= 2;
  const showConnect = stage >= 3;
  const showAutomate = stage >= 4;
  const showScale = stage >= 5;

  const transition = isReduced
    ? { duration: 0.15 }
    : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl landing-panel-glass ${compact ? 'aspect-[16/11] max-h-[220px]' : 'aspect-[16/11] lg:aspect-[3/2] lg:max-h-[340px]'} ${className}`}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(20,91,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(20,91,255,0.04) 1px, transparent 1px)',
          backgroundSize: compact ? '24px 24px' : '32px 32px',
        }}
      />
      <svg viewBox="0 0 400 320" className="relative h-full w-full" xmlns="http://www.w3.org/2000/svg">
        {/* Architecture frame markers */}
        <line x1="24" y1="24" x2="24" y2="40" stroke="rgba(26,35,50,0.12)" strokeWidth="0.75" />
        <line x1="24" y1="24" x2="40" y2="24" stroke="rgba(26,35,50,0.12)" strokeWidth="0.75" />
        <line x1="376" y1="296" x2="376" y2="280" stroke="rgba(26,35,50,0.12)" strokeWidth="0.75" />
        <line x1="376" y1="296" x2="360" y2="296" stroke="rgba(26,35,50,0.12)" strokeWidth="0.75" />

        {/* Scale — unified platform envelope */}
        <motion.rect
          x="48"
          y="44"
          width="304"
          height="232"
          rx="8"
          fill="rgba(72,185,0,0.04)"
          stroke="#48B900"
          strokeWidth="1"
          initial={false}
          animate={{ opacity: showScale ? 1 : 0 }}
          transition={transition}
        />

        {/* Connection lines */}
        {BLOCKS.map((block) => {
          const c = blockCenter(block);
          return (
            <motion.line
              key={`link-${block.id}`}
              x1={c.x}
              y1={c.y}
              x2={CENTER.x}
              y2={CENTER.y}
              stroke={showConnect ? '#145BFF' : '#25B5FF'}
              strokeWidth={showConnect ? 1.25 : 0.75}
              strokeOpacity={showFoundation ? (showConnect ? 0.55 : 0.25) : 0}
              initial={false}
              animate={{ opacity: showFoundation ? 1 : 0 }}
              transition={transition}
            />
          );
        })}

        {/* Cross connections at connect+ */}
        {showConnect && (
          <>
            <line x1="112" y1="84" x2="288" y2="84" stroke="#145BFF" strokeWidth="0.75" strokeOpacity="0.2" />
            <line x1="112" y1="236" x2="288" y2="236" stroke="#145BFF" strokeWidth="0.75" strokeOpacity="0.2" />
            <line x1="112" y1="84" x2="112" y2="236" stroke="#145BFF" strokeWidth="0.75" strokeOpacity="0.15" />
            <line x1="288" y1="84" x2="288" y2="236" stroke="#145BFF" strokeWidth="0.75" strokeOpacity="0.15" />
          </>
        )}

        {/* Automate — workflow paths */}
        {showAutomate && (
          <motion.path
            d="M 112 84 L 200 160 L 288 236"
            fill="none"
            stroke="#25B5FF"
            strokeWidth="1"
            strokeDasharray="4 6"
            strokeOpacity="0.6"
            initial={false}
            animate={{ opacity: 1 }}
            transition={transition}
          />
        )}

        {/* Center platform modules */}
        <motion.g initial={false} animate={{ opacity: showModules ? 1 : 0.35 }} transition={transition}>
          <rect x="168" y="136" width="64" height="48" rx="4" fill="rgba(20,91,255,0.08)" stroke="#145BFF" strokeWidth="0.75" />
          <rect x="176" y="144" width="20" height="12" rx="2" fill="rgba(20,91,255,0.15)" />
          <rect x="200" y="144" width="24" height="12" rx="2" fill="rgba(20,91,255,0.1)" />
          <rect x="176" y="160" width="48" height="8" rx="2" fill="rgba(20,91,255,0.08)" />
        </motion.g>

        {/* Peripheral system blocks */}
        {BLOCKS.map((block) => {
          const c = blockCenter(block);
          const isConnected = showConnect || showFoundation;
          return (
            <motion.g
              key={block.id}
              initial={false}
              animate={{
                opacity: 1,
                x: showScale ? 0 : 0,
              }}
              transition={transition}
            >
              <rect
                x={block.x}
                y={block.y}
                width={block.w}
                height={block.h}
                rx="4"
                fill={showScale ? 'rgba(20,91,255,0.08)' : 'rgba(255,255,255,0.85)'}
                stroke={isConnected ? '#145BFF' : 'rgba(26,35,50,0.22)'}
                strokeWidth={isConnected ? 1.1 : 0.85}
                strokeOpacity={isConnected ? 0.55 : 1}
              />
              <rect x={block.x + 8} y={block.y + 10} width={block.w - 16} height="4" rx="2" fill="rgba(20,91,255,0.18)" />
              <rect x={block.x + 8} y={block.y + 20} width={block.w - 28} height="3" rx="1.5" fill="rgba(26,35,50,0.12)" />
              <text
                x={c.x}
                y={block.y + block.h + 14}
                textAnchor="middle"
                className="fill-[#1A2332] text-[8px] font-bold tracking-[0.14em]"
                opacity="0.72"
              >
                {block.label}
              </text>
              {stage === 0 && (
                <circle cx={c.x} cy={c.y} r="2" fill="#145BFF" opacity="0.35" />
              )}
            </motion.g>
          );
        })}

        {/* Discover — mapping markers on stage 0 */}
        {stage === 0 && (
          <>
            {BLOCKS.map((block) => {
              const c = blockCenter(block);
              return (
                <g key={`marker-${block.id}`}>
                  <line x1={c.x - 6} y1={c.y} x2={c.x + 6} y2={c.y} stroke="#145BFF" strokeWidth="0.5" opacity="0.4" />
                  <line x1={c.x} y1={c.y - 6} x2={c.x} y2={c.y + 6} stroke="#145BFF" strokeWidth="0.5" opacity="0.4" />
                </g>
              );
            })}
          </>
        )}

        {/* Scale label */}
        <motion.text
          x="200"
          y="292"
          textAnchor="middle"
          className="fill-[#48B900] text-[9px] font-semibold tracking-[0.16em]"
          initial={false}
          animate={{ opacity: showScale ? 0.85 : 0 }}
          transition={transition}
        >
          SCALABLE PLATFORM
        </motion.text>
      </svg>
    </div>
  );
}
