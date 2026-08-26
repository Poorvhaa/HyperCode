import type { LucideIcon } from 'lucide-react';
import {
  HeartPulse,
  Building2,
  ShoppingBag,
  Terminal,
  Radio,
  Factory,
  Car,
  Truck,
  TrainFront,
  Zap,
  Fuel,
  GraduationCap,
  Building,
  Briefcase,
  HardHat,
  Plane,
  Film,
  ShieldCheck,
  CreditCard,
  UtensilsCrossed,
  Package,
  HandHeart,
  Layers,
} from 'lucide-react';

/** Ordered keys aligned with Consultation.industries in messages/en.json */
export const CONSULTATION_INDUSTRY_KEYS = [
  'healthcare',
  'bfsi',
  'retail',
  'technology',
  'telecom',
  'manufacturing',
  'automotive',
  'logistics',
  'transportation',
  'energy',
  'oilGas',
  'education',
  'government',
  'professionalServices',
  'realEstate',
  'travel',
  'media',
  'insurance',
  'fintech',
  'foodBeverage',
  'consumerProducts',
  'nonprofit',
  'other',
] as const;

export type ConsultationIndustryKey = (typeof CONSULTATION_INDUSTRY_KEYS)[number];

export const CONSULTATION_INDUSTRY_ICON_MAP: Record<ConsultationIndustryKey, LucideIcon> = {
  healthcare: HeartPulse,
  bfsi: Building2,
  retail: ShoppingBag,
  technology: Terminal,
  telecom: Radio,
  manufacturing: Factory,
  automotive: Car,
  logistics: Truck,
  transportation: TrainFront,
  energy: Zap,
  oilGas: Fuel,
  education: GraduationCap,
  government: Building,
  professionalServices: Briefcase,
  realEstate: HardHat,
  travel: Plane,
  media: Film,
  insurance: ShieldCheck,
  fintech: CreditCard,
  foodBeverage: UtensilsCrossed,
  consumerProducts: Package,
  nonprofit: HandHeart,
  other: Layers,
};

export type IndustryAccent = {
  bg: string;
  border: string;
  text: string;
  topLine: string;
};

export const CONSULTATION_INDUSTRY_ACCENTS: Record<ConsultationIndustryKey, IndustryAccent> = {
  healthcare: { bg: 'bg-blue-50/60', border: 'border-blue-100', text: 'text-blue-600', topLine: 'from-blue-400 to-cyan-300' },
  bfsi: { bg: 'bg-cyan-50/60', border: 'border-cyan-100', text: 'text-cyan-600', topLine: 'from-cyan-400 to-teal-300' },
  retail: { bg: 'bg-green-50/60', border: 'border-green-100', text: 'text-green-600', topLine: 'from-green-400 to-emerald-300' },
  technology: { bg: 'bg-royal-blue/10', border: 'border-royal-blue/20', text: 'text-royal-blue', topLine: 'from-royal-blue to-green' },
  telecom: { bg: 'bg-violet-50/60', border: 'border-violet-100', text: 'text-violet-600', topLine: 'from-violet-400 to-purple-300' },
  manufacturing: { bg: 'bg-teal-50/60', border: 'border-teal-100', text: 'text-teal-600', topLine: 'from-teal-400 to-emerald-300' },
  automotive: { bg: 'bg-slate-100/60', border: 'border-slate-200', text: 'text-slate-700', topLine: 'from-slate-500 to-slate-400' },
  logistics: { bg: 'bg-sky-50/60', border: 'border-sky-100', text: 'text-sky-600', topLine: 'from-sky-400 to-blue-300' },
  transportation: { bg: 'bg-indigo-50/60', border: 'border-indigo-100', text: 'text-indigo-600', topLine: 'from-indigo-400 to-blue-300' },
  energy: { bg: 'bg-yellow-50/60', border: 'border-yellow-100', text: 'text-yellow-600', topLine: 'from-yellow-400 to-amber-300' },
  oilGas: { bg: 'bg-orange-50/60', border: 'border-orange-100', text: 'text-orange-600', topLine: 'from-orange-400 to-amber-300' },
  education: { bg: 'bg-indigo-50/60', border: 'border-indigo-100', text: 'text-indigo-600', topLine: 'from-indigo-400 to-blue-300' },
  government: { bg: 'bg-blue-100/60', border: 'border-blue-200', text: 'text-blue-700', topLine: 'from-blue-600 to-indigo-500' },
  professionalServices: { bg: 'bg-slate-50/60', border: 'border-slate-200', text: 'text-slate-700', topLine: 'from-slate-500 to-slate-400' },
  realEstate: { bg: 'bg-amber-50/60', border: 'border-amber-100', text: 'text-amber-600', topLine: 'from-amber-400 to-yellow-300' },
  travel: { bg: 'bg-rose-50/60', border: 'border-rose-100', text: 'text-rose-600', topLine: 'from-rose-400 to-orange-300' },
  media: { bg: 'bg-fuchsia-50/60', border: 'border-fuchsia-100', text: 'text-fuchsia-600', topLine: 'from-fuchsia-400 to-pink-300' },
  insurance: { bg: 'bg-emerald-50/60', border: 'border-emerald-100', text: 'text-emerald-600', topLine: 'from-emerald-400 to-teal-300' },
  fintech: { bg: 'bg-cyan-50/60', border: 'border-cyan-100', text: 'text-cyan-600', topLine: 'from-cyan-400 to-teal-300' },
  foodBeverage: { bg: 'bg-lime-50/60', border: 'border-lime-100', text: 'text-lime-700', topLine: 'from-lime-400 to-green-300' },
  consumerProducts: { bg: 'bg-green-50/60', border: 'border-green-100', text: 'text-green-600', topLine: 'from-green-400 to-emerald-300' },
  nonprofit: { bg: 'bg-pink-50/60', border: 'border-pink-100', text: 'text-pink-600', topLine: 'from-pink-400 to-rose-300' },
  other: { bg: 'bg-slate-50/60', border: 'border-slate-200', text: 'text-royal-blue', topLine: 'from-royal-blue to-cyan-400' },
};
