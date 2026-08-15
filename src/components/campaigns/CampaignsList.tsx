'use client';

import { useAppStore } from '@/store/use-app-store';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Eye, MousePointer, Target, DollarSign, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { mockSpendOverTime } from '@/data/mock-data';

const platformColors: Record<string, string> = {
  google: 'bg-blue-100 text-blue-700 border-blue-200',
  meta: 'bg-indigo-100 text-indigo-700 border-indigo-200',
};

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-700 border-green-200',
  paused: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  draft: 'bg-gray-100 text-gray-600 border-gray-200', 
  completed: 'bg-blue-100 text-blue-700 border-blue-200',
};

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function DailyTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-xl border border-white/60 shadow-lg p-3">
      <p className="text-xs text-muted-foreground mb-2 font-medium">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-muted-foreground capitalize">{entry.name}:</span>
          <span className="font-semibold">
            ₹{entry.value.toLocaleString('en-IN')}
          </span>
        </div>
      ))}
    </div>
  );
}

const dailyData = mockSpendOverTime.slice(0, 7);

export default function CampaignsList() {
  const { campaigns, selectedCampaign, selectCampaign } = useAppStore();

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Left Panel - Campaign List */}
      <div className="w-full lg:w-1/3 shrink-0">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Campaigns</h2>
          <Badge variant="secondary" className="ml-auto">
            {campaigns.length}
          </Badge>
        </div>
        <div className="space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 custom-scrollbar">
          {campaigns.map((campaign, index) => {
            const isSelected = selectedCampaign?.id === campaign.id;
            const spentPct = campaign.budget > 0 ? (campaign.spent / campaign.budget) * 100 : 0;

            return (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md bg-white/60 backdrop-blur-xl border-white/60 ${isSelected ? 'ring-2 ring-primary/50 shadow-md' : ''}`}
                  onClick={() => selectCampaign(campaign)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-sm font-semibold leading-tight">{campaign.name}</h3>
                      <Badge
                        variant="outline"
                        className={`shrink-0 text-[10px] px-1.5 py-0 ${platformColors[campaign.platform]}`}
                      >
                        {campaign.platform === 'google' ? 'Google' : 'Meta'}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Badge
                        variant="outline"
                        className={`text-[10px] px-1.5 py-0 capitalize ${statusColors[campaign.status]}`}
                      >
                        {campaign.status}
                      </Badge>
                    </div>

                    {/* Budget Progress */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Budget</span>
                        <span className="font-medium text-foreground">
                          ₹{campaign.spent.toLocaleString('en-IN')} / ₹{campaign.budget.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-muted/40 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-orange-400 to-red-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(spentPct, 100)}%` }}
                          transition={{ duration: 0.6, delay: index * 0.05 + 0.2 }}
                        />
                      </div>
                    </div>

                    {/* Key Metric - ROAS */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">ROAS</span>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3.5 w-3.5 text-green-600" />
                        <span className="text-sm font-bold text-green-600">
                          {campaign.roas > 0 ? `${campaign.roas}x` : '—'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Right Panel - Campaign Detail */}
      <div className="w-full lg:w-2/3 min-w-0">
        {!selectedCampaign ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-full min-h-[400px] flex items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/20 bg-white/30"
          >
            <div className="text-center space-y-3 px-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <p className="text-muted-foreground font-medium">Select a campaign to view details</p>
              <p className="text-sm text-muted-foreground/70">
                Click on any campaign from the list to see its performance metrics
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={selectedCampaign.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-xl font-bold">{selectedCampaign.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant="outline"
                    className={`text-xs ${platformColors[selectedCampaign.platform]}`}
                  >
                    {selectedCampaign.platform === 'google' ? 'Google' : 'Meta'}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`text-xs capitalize ${statusColors[selectedCampaign.status]}`}
                  >
                    {selectedCampaign.status}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span>₹{selectedCampaign.spent.toLocaleString('en-IN')} of ₹{selectedCampaign.budget.toLocaleString('en-IN')} spent</span>
              </div>
            </div>

            {/* 6 Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <MetricCard
                icon={<Eye className="h-4 w-4 text-blue-500" />}
                label="Impressions"
                value={selectedCampaign.impressions > 0 ? selectedCampaign.impressions.toLocaleString('en-IN') : '—'}
              />
              <MetricCard
                icon={<MousePointer className="h-4 w-4 text-purple-500" />}
                label="Clicks"
                value={selectedCampaign.clicks > 0 ? selectedCampaign.clicks.toLocaleString('en-IN') : '—'}
              />
              <MetricCard
                icon={<ArrowUpRight className="h-4 w-4 text-green-500" />}
                label="CTR"
                value={selectedCampaign.ctr > 0 ? `${selectedCampaign.ctr}%` : '—'}
              />
              <MetricCard
                icon={<DollarSign className="h-4 w-4 text-orange-500" />}
                label="CPC"
                value={selectedCampaign.cpc > 0 ? `₹${selectedCampaign.cpc.toFixed(2)}` : '—'}
              />
              <MetricCard
                icon={<Target className="h-4 w-4 text-red-500" />}
                label="CPA"
                value={selectedCampaign.cpa > 0 ? `₹${selectedCampaign.cpa.toFixed(2)}` : '—'}
              />
              <MetricCard
                icon={<TrendingUp className="h-4 w-4 text-emerald-500" />}
                label="ROAS"
                value={selectedCampaign.roas > 0 ? `${selectedCampaign.roas}x` : '—'}
                highlight
              />
            </div>

            {/* Bar Chart - Daily Performance */}
            <Card className="bg-white/60 backdrop-blur-xl border-white/60 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Daily Spend Trend</CardTitle>
                <p className="text-sm text-muted-foreground">Google vs Meta spend over time</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={dailyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="campaignGoogleBar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF5E3A" stopOpacity={1} />
                        <stop offset="100%" stopColor="#FF5E3A" stopOpacity={0.7} />
                      </linearGradient>
                      <linearGradient id="campaignMetaBar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C084FC" stopOpacity={1} />
                        <stop offset="100%" stopColor="#C084FC" stopOpacity={0.7} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.08} vertical={false} />
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
                    <Tooltip content={<DailyTooltip />} />
                    <Bar dataKey="google" fill="url(#campaignGoogleBar)" radius={[3, 3, 0, 0]} name="Google" />
                    <Bar dataKey="meta" fill="url(#campaignMetaBar)" radius={[3, 3, 0, 0]} name="Meta" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card className={`bg-white/60 backdrop-blur-xl border-white/60 shadow-sm ${highlight ? 'ring-1 ring-emerald-200' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-1">
            {icon}
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
          <p className={`text-xl font-bold ${highlight ? 'text-emerald-600' : ''}`}>{value}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
