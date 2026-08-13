'use client';

import { useKPIs } from '@/store/use-app-store';
import type { KPIData } from '@/types';
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Eye, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, LucideIcon> = {
  DollarSign,
  Users,
  TrendingDown,
  TrendingUp,
  Target,
  Eye,
};

const iconBgColors: string[] = [
  'bg-[#FF5E3A]/10',
  'bg-[#C084FC]/10',
  'bg-[#38BDF8]/10',
  'bg-[#34D399]/10',
  'bg-[#FBBF24]/10',
  'bg-[#F87171]/10',
];

const iconTextColors: string[] = [
  'text-[#FF5E3A]',
  'text-[#C084FC]',
  'text-[#38BDF8]',
  'text-[#34D399]',
  'text-[#FBBF24]',
  'text-[#F87171]',
];

function isPositiveGood(kpi: KPIData): boolean {
  return kpi.icon !== 'TrendingDown';
}

export default function KPICards() {
  const kpis = useKPIs();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {kpis.map((kpi, index) => {
        const IconComponent = iconMap[kpi.icon] || TrendingUp;
        const positiveGood = isPositiveGood(kpi);
        const isPositive = kpi.change > 0;
        const isGood = positiveGood ? isPositive : !isPositive;

        return (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/60 p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
                <p className="text-2xl font-bold">{kpi.value}</p>
              </div>
              <div className={`p-2.5 rounded-xl ${iconBgColors[index % iconBgColors.length]}`}>
                <IconComponent className={`h-5 w-5 ${iconTextColors[index % iconTextColors.length]}`} />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              {isGood ? (
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-red-500" />
              )}
              <span
                className={`text-sm font-medium ${
                  isGood ? 'text-emerald-500' : 'text-red-500'
                }`}
              >
                {isPositive ? '+' : ''}
                {kpi.change}%
              </span>
              <span className="text-xs text-muted-foreground">{kpi.changeLabel}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
