'use client';

import { useAppStore } from '@/store/use-app-store';
import type { Lead } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Users, Phone, Mail, Star, ArrowRight } from 'lucide-react';
import { mockFunnelData } from '@/data/mock-data';

const statusColors: Record<Lead['status'], string> = {
  new: 'bg-blue-100 text-blue-700 border-blue-200',
  contacted: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  qualified: 'bg-green-100 text-green-700 border-green-200',
  converted: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  lost: 'bg-red-100 text-red-700 border-red-200',
};

const scoreColor = (score: number): string => {
  if (score > 80) return 'text-green-600';
  if (score > 60) return 'text-yellow-600';
  return 'text-red-600';
};

const scoreRingColor = (score: number): string => {
  if (score > 80) return '#16a34a';
  if (score > 60) return '#ca8a04';
  return '#dc2626';
};

const allStatuses: Lead['status'][] = ['new', 'contacted', 'qualified', 'converted', 'lost'];

const funnelStages = [
  { stage: 'Ad Impression', count: 2440000 },
  { stage: 'Landing Page', count: 32160 },
  { stage: 'WhatsApp', count: 12864 },
  { stage: 'Lead', count: 847 },
  { stage: 'Converted', count: 312 },
];

const funnelColors = ['#FF5E3A', '#F59E0B', '#C084FC', '#38BDF8', '#10B981'];

function ScoreRing({ score }: { score: number }) {
  const color = scoreRingColor(score);
  const deg = (score / 100) * 360;

  return (
    <div
      className="relative h-10 w-10 rounded-full flex items-center justify-center shrink-0"
      style={{
        background: `conic-gradient(${color} ${deg}deg, hsl(var(--muted) / 0.3) ${deg}deg)`,
      }}
    >
      <div className="h-7 w-7 rounded-full bg-white flex items-center justify-center">
        <span className={`text-[11px] font-bold ${scoreColor(score)}`}>{score}</span>
      </div>
    </div>
  );
}

function StatusDropdown({
  lead,
  onChange,
}: {
  lead: Lead;
  onChange: (id: string, status: Lead['status']) => void;
}) {
  return (
    <select
      value={lead.status}
      onChange={(e) => onChange(lead.id, e.target.value as Lead['status'])}
      className={`text-xs font-medium rounded-full px-2.5 py-1 border cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 capitalize ${statusColors[lead.status]}`}
    >
      {allStatuses.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}

export default function LeadsCRM() {
  const { leads, updateLeadStatus } = useAppStore();
  const sortedLeads = [...leads].sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Leads CRM</h2>
        <Badge variant="secondary" className="ml-auto">
          {leads.length} leads
        </Badge>
      </div>

      {/* Marketing Funnel */}
      <Card className="bg-white/60 backdrop-blur-xl border-white/60 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Marketing Funnel</CardTitle>
          <p className="text-sm text-muted-foreground">
            From ad impressions to conversions
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 py-2">
            {funnelStages.map((item, index) => {
              const maxCount = funnelStages[0].count;
              const widthPct = Math.max((item.count / maxCount) * 100, 4);
              const color = funnelColors[index % funnelColors.length];

              return (
                <div key={item.stage} className="flex items-center gap-4">
                  <div className="w-32 sm:w-40 shrink-0 text-right">
                    <p className="text-sm font-medium text-foreground">
                      {item.stage}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.count.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="flex-1 relative">
                    <div className="w-full h-9 bg-muted/40 rounded-lg overflow-hidden">
                      <motion.div
                        className="h-full rounded-lg"
                        style={{
                          background: `linear-gradient(90deg, ${color}30, ${color})`,
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${widthPct}%` }}
                        transition={{
                          duration: 0.6,
                          delay: index * 0.1,
                          ease: 'easeOut',
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-20 shrink-0 flex items-center justify-end gap-1">
                    {index > 0 && (
                      <ArrowRight className="h-3 w-3 text-muted-foreground/40" />
                    )}
                    <span
                      className="text-xs font-semibold"
                      style={{ color }}
                    >
                      {index === 0
                        ? '100%'
                        : `${((item.count / funnelStages[index - 1].count) * 100).toFixed(1)}%`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Leads Table (Desktop) */}
      <Card className="bg-white/60 backdrop-blur-xl border-white/60 shadow-sm hidden md:block">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-muted/30">
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                    Lead
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                    Contact
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                    Source
                  </th>
                  <th className="text-center text-xs font-medium text-muted-foreground px-4 py-3">
                    Score
                  </th>
                  <th className="text-center text-xs font-medium text-muted-foreground px-4 py-3">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedLeads.map((lead, index) => (
                  <motion.tr
                    key={lead.id}
                    className="border-b border-muted/20 last:border-0 hover:bg-muted/20 transition-colors"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.04 }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {lead.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                        <span className="text-sm font-medium">
                          {lead.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3 shrink-0" />
                          <span className="truncate max-w-[160px]">
                            {lead.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3 shrink-0" />
                          <span>{lead.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="text-[10px] font-medium">
                        {lead.source}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        <ScoreRing score={lead.score} />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        <StatusDropdown
                          lead={lead}
                          onChange={updateLeadStatus}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-muted-foreground">
                        {new Date(lead.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Leads Cards (Mobile) */}
      <div className="space-y-3 md:hidden">
        {sortedLeads.map((lead, index) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.05 }}
          >
            <Card className="bg-white/60 backdrop-blur-xl border-white/60 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {lead.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">
                        {lead.name}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3 shrink-0" />
                        <span className="truncate">{lead.email}</span>
                      </div>
                    </div>
                  </div>
                  <ScoreRing score={lead.score} />
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                  <Phone className="h-3 w-3 shrink-0" />
                  <span>{lead.phone}</span>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] font-medium">
                    {lead.source}
                  </Badge>
                  <StatusDropdown
                    lead={lead}
                    onChange={updateLeadStatus}
                  />
                </div>

                <div className="mt-2 pt-2 border-t border-muted/20">
                  <span className="text-[10px] text-muted-foreground">
                    Added {new Date(lead.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
