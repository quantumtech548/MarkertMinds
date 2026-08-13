'use client';

import { useAppStore } from '@/store/use-app-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Search, TrendingUp, AlertCircle, Lightbulb, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const positionColor = (position: number): string => {
  if (position < 3) return 'text-green-600';
  if (position < 5) return 'text-yellow-600';
  if (position < 8) return 'text-orange-500';
  return 'text-red-600';
};

const positionBadgeClass = (position: number): string => {
  if (position < 3) return 'bg-green-100 text-green-700 border-green-200';
  if (position < 5) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  if (position < 8) return 'bg-orange-100 text-orange-600 border-orange-200';
  return 'bg-red-100 text-red-700 border-red-200';
};

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function SeoTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-xl border border-white/60 shadow-lg p-3">
      <p className="text-xs text-muted-foreground mb-2 font-medium truncate max-w-[200px]">
        {label}
      </p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-muted-foreground capitalize">{entry.name}:</span>
          <span className="font-semibold">{entry.value.toLocaleString('en-IN')}</span>
        </div>
      ))}
    </div>
  );
}

const recommendations = [
  {
    icon: <TrendingUp className="h-5 w-5 text-green-600" />,
    title: '8 keywords close to page #1',
    description:
      'Several keywords are ranking between positions 4-8. A focused content optimization effort could push them to the top 3, significantly increasing organic click-through rates.',
    accent: 'border-l-green-500 bg-green-50/50',
    badge: 'High Impact',
    badgeClass: 'bg-green-100 text-green-700 border-green-200',
  },
  {
    icon: <Lightbulb className="h-5 w-5 text-blue-600" />,
    title: "Consider creating content for 'keratin treatment cost'",
    description:
      "This query has 3,200 impressions but only 87 clicks (2.72% CTR). A dedicated landing page or blog post could capture much of this search demand.",
    accent: 'border-l-blue-500 bg-blue-50/50',
    badge: 'Content Gap',
    badgeClass: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  {
    icon: <AlertCircle className="h-5 w-5 text-orange-500" />,
    title: 'Mobile optimization needed for landing pages',
    description:
      'Analysis shows mobile users have 40% higher bounce rates on key landing pages. Improving page speed and mobile UX could boost conversions significantly.',
    accent: 'border-l-orange-500 bg-orange-50/50',
    badge: 'Urgent',
    badgeClass: 'bg-orange-100 text-orange-600 border-orange-200',
  },
];

export default function SeoDashboard() {
  const { seoQueries } = useAppStore();

  const sortedQueries = [...seoQueries].sort((a, b) => b.clicks - a.clicks);
  const top5ByClicks = sortedQueries.slice(0, 5).map((q) => ({
    query: q.query.length > 18 ? q.query.substring(0, 18) + '...' : q.query,
    clicks: q.clicks,
  }));

  const totalClicks = seoQueries.reduce((sum, q) => sum + q.clicks, 0);
  const totalImpressions = seoQueries.reduce((sum, q) => sum + q.impressions, 0);
  const avgCTR = seoQueries.length > 0
    ? seoQueries.reduce((sum, q) => sum + q.ctr, 0) / seoQueries.length
    : 0;
  const avgPosition = seoQueries.length > 0
    ? seoQueries.reduce((sum, q) => sum + q.position, 0) / seoQueries.length
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold">SEO Dashboard</h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Card className="bg-white/60 backdrop-blur-xl border-white/60 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <MousePointerIcon className="h-4 w-4 text-blue-500" />
                <span className="text-xs text-muted-foreground">Total Clicks</span>
              </div>
              <p className="text-xl font-bold">{totalClicks.toLocaleString('en-IN')}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
        >
          <Card className="bg-white/60 backdrop-blur-xl border-white/60 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <EyeIcon className="h-4 w-4 text-purple-500" />
                <span className="text-xs text-muted-foreground">Total Impressions</span>
              </div>
              <p className="text-xl font-bold">{totalImpressions.toLocaleString('en-IN')}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
        >
          <Card className="bg-white/60 backdrop-blur-xl border-white/60 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-xs text-muted-foreground">Avg CTR</span>
              </div>
              <p className="text-xl font-bold">{avgCTR.toFixed(2)}%</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.15 }}
        >
          <Card className="bg-white/60 backdrop-blur-xl border-white/60 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <TargetIcon className="h-4 w-4 text-orange-500" />
                <span className="text-xs text-muted-foreground">Avg Position</span>
              </div>
              <p className="text-xl font-bold">#{avgPosition.toFixed(1)}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Queries Table */}
      <Card className="bg-white/60 backdrop-blur-xl border-white/60 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Top Search Queries</CardTitle>
          <p className="text-sm text-muted-foreground">Sorted by clicks</p>
        </CardHeader>
        <CardContent className="p-0">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-muted/30">
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                    Query
                  </th>
                  <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">
                    Clicks
                  </th>
                  <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">
                    Impressions
                  </th>
                  <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">
                    CTR
                  </th>
                  <th className="text-center text-xs font-medium text-muted-foreground px-4 py-3">
                    Position
                  </th>
                  <th className="text-center text-xs font-medium text-muted-foreground px-4 py-3">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedQueries.map((q, index) => {
                  const isGoingUp = q.position <= 5;
                  return (
                    <motion.tr
                      key={q.query}
                      className="border-b border-muted/20 last:border-0 hover:bg-muted/20 transition-colors"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Search className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />
                          <span className="text-sm font-medium">{q.query}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-sm font-semibold">{q.clicks.toLocaleString('en-IN')}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-sm text-muted-foreground">{q.impressions.toLocaleString('en-IN')}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-sm font-medium">{q.ctr.toFixed(2)}%</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge
                          variant="outline"
                          className={`text-xs font-semibold ${positionBadgeClass(q.position)}`}
                        >
                          #{q.position.toFixed(1)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {isGoingUp ? (
                          <ArrowUpRight className={`h-4 w-4 mx-auto ${positionColor(q.position)}`} />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 mx-auto text-red-500" />
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-2 p-4">
            {sortedQueries.map((q, index) => {
              const isGoingUp = q.position <= 5;
              return (
                <motion.div
                  key={q.query}
                  className="flex items-center justify-between py-2 border-b border-muted/20 last:border-0"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                >
                  <div className="min-w-0 flex-1 mr-3">
                    <p className="text-sm font-medium truncate">{q.query}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground">
                        {q.clicks} clicks
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {q.impressions.toLocaleString('en-IN')} imp
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {q.ctr.toFixed(1)}% CTR
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-semibold ${positionBadgeClass(q.position)}`}
                    >
                      #{q.position.toFixed(1)}
                    </Badge>
                    {isGoingUp ? (
                      <ArrowUpRight className={`h-4 w-4 ${positionColor(q.position)}`} />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          <h3 className="text-base font-semibold">AI Recommendations</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className={`bg-white/60 backdrop-blur-xl border-white/60 shadow-sm border-l-4 ${rec.accent} h-full`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    {rec.icon}
                    <Badge variant="outline" className={`text-[10px] font-medium ${rec.badgeClass}`}>
                      {rec.badge}
                    </Badge>
                  </div>
                  <h4 className="text-sm font-semibold mb-1.5 leading-tight">
                    {rec.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {rec.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bar Chart - Top 5 Queries by Clicks */}
      <Card className="bg-white/60 backdrop-blur-xl border-white/60 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Top 5 Queries by Clicks</CardTitle>
          <p className="text-sm text-muted-foreground">Best performing organic search terms</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={top5ByClicks}
              layout="vertical"
              margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="seoBarGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FF5E3A" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#FF5E3A" stopOpacity={1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.08} horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="query"
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
                width={140}
              />
              <Tooltip content={<SeoTooltip />} />
              <Bar
                dataKey="clicks"
                fill="url(#seoBarGradient)"
                radius={[0, 6, 6, 0]}
                name="Clicks"
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

/* Inline mini-icons for summary cards */
function MousePointerIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
      <path d="m13 13 6 6" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
