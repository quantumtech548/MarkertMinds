'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { mockSpendOverTime, mockLeadsOverTime, mockFunnelData } from '@/data/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

const funnelColors = ['#FF5E3A', '#E85D3A', '#C084FC', '#7C6DF0', '#38BDF8', '#2DB5E8'];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

function CustomSpendTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-xl border border-white/60 shadow-lg p-3">
      <p className="text-xs text-muted-foreground mb-2 font-medium">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground capitalize">{entry.name}:</span>
          <span className="font-semibold">
            ₹{entry.value.toLocaleString('en-IN')}
          </span>
        </div>
      ))}
    </div>
  );
}

function CustomLeadsTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-xl border border-white/60 shadow-lg p-3">
      <p className="text-xs text-muted-foreground mb-1 font-medium">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span className="font-semibold">{entry.value} leads</span>
        </div>
      ))}
    </div>
  );
}

export default function DashboardCharts() {
  return (
    <div className="space-y-6">
      {/* Chart 1 & 2 - Side by side on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Area Chart - Spend Over Time */}
        <Card className="bg-white/60 backdrop-blur-xl border-white/60 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Ad Spend Trend</CardTitle>
            <p className="text-sm text-muted-foreground">Google vs Meta last 30 days</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockSpendOverTime} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="googleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5E3A" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#FF5E3A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="metaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C084FC" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#C084FC" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value: number) => `₹${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomSpendTooltip />} />
                <Area
                  type="monotone"
                  dataKey="google"
                  stroke="#FF5E3A"
                  strokeWidth={2}
                  fill="url(#googleGradient)"
                  name="Google"
                />
                <Area
                  type="monotone"
                  dataKey="meta"
                  stroke="#C084FC"
                  strokeWidth={2}
                  fill="url(#metaGradient)"
                  name="Meta"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart - Leads Over Time */}
        <Card className="bg-white/60 backdrop-blur-xl border-white/60 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Leads Generated</CardTitle>
            <p className="text-sm text-muted-foreground">Daily lead volume</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockLeadsOverTime} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF5E3A" />
                    <stop offset="50%" stopColor="#C084FC" />
                    <stop offset="100%" stopColor="#38BDF8" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomLeadsTooltip />} />
                <Bar
                  dataKey="leads"
                  fill="url(#barGradient)"
                  radius={[4, 4, 0, 0]}
                  name="Leads"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Chart 3 - Conversion Funnel */}
      <Card className="bg-white/60 backdrop-blur-xl border-white/60 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Conversion Funnel</CardTitle>
          <p className="text-sm text-muted-foreground">From impressions to conversions</p>
        </CardHeader>
        <CardContent>
          <FunnelChart />
        </CardContent>
      </Card>
    </div>
  );
}

function FunnelChart() {
  const maxCount = Math.max(...mockFunnelData.map((d) => d.count));

  return (
    <div className="space-y-3 py-2">
      {mockFunnelData.map((item, index) => {
        const widthPct = Math.max((item.count / maxCount) * 100, 6);
        const color = funnelColors[index % funnelColors.length];

        return (
          <div key={item.stage} className="flex items-center gap-4">
            <div className="w-36 sm:w-44 shrink-0 text-right">
              <p className="text-sm font-medium text-foreground">{item.stage}</p>
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
                  transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                />
              </div>
            </div>
            <div className="w-16 shrink-0">
              <span className="text-sm font-semibold" style={{ color }}>
                {item.pct}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
