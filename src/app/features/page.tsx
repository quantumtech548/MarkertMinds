'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  Users,
  Search,
  Target,
  ArrowLeft,
  Sparkles,
  Zap,
  TrendingUp,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Compass,
  Layers,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import MarketMindLogo from '@/components/ui/logo';

const COLORS = ['#FF5E3A', '#C084FC', '#38BDF8', '#FBBF24'];

const tabData = {
  analytics: {
    id: 'analytics',
    title: 'Analytics Dashboard',
    subtitle: 'Real-time marketing insights powered by machine learning',
    icon: BarChart3,
    color: '#FF5E3A',
    description: 'Stop guessing what works. MarketMind aggregates data from all your active marketing channels into a single, unified analytics dashboard. Our AI detects anomalies, predicts ROI, and suggests optimization strategies.',
    bullets: [
      'Cross-platform attribution modeling',
      'Predictive CLV (Customer Lifetime Value) forecasting',
      'Automated daily executive summary reports',
      'Custom KPI tracking and conversion funnel analysis',
    ],
    chartData: [
      { name: 'Mon', ROI: 2.1, Conversions: 120 },
      { name: 'Tue', ROI: 2.5, Conversions: 140 },
      { name: 'Wed', ROI: 3.2, Conversions: 210 },
      { name: 'Thu', ROI: 2.8, Conversions: 180 },
      { name: 'Fri', ROI: 4.1, Conversions: 310 },
      { name: 'Sat', ROI: 3.9, Conversions: 290 },
      { name: 'Sun', ROI: 4.5, Conversions: 340 },
    ],
  },
  leads: {
    id: 'leads',
    title: 'Lead Generation & CRM',
    subtitle: 'Capture, score, and nurture high-intent leads automatically',
    icon: Users,
    color: '#C084FC',
    description: 'Grow your sales pipeline with AI-driven lead management. MarketMind captures prospects, automatically enriches their profiles with public data, scores their buying intent, and matches them to the perfect nurture sequences.',
    bullets: [
      'Behavioral lead scoring and intent detection',
      'Automated personalized email nurture flows',
      'CRM integration with automated status updates',
      'A/B testing for landing page capture forms',
    ],
    chartData: [
      { name: 'Cold', value: 450 },
      { name: 'Warm', value: 320 },
      { name: 'Hot', value: 180 },
      { name: 'SQL', value: 90 },
    ],
  },
  seo: {
    id: 'seo',
    title: 'SEO Optimization',
    subtitle: 'Dominate organic search with automated keyword and content audits',
    icon: Search,
    color: '#38BDF8',
    description: 'Unlock explosive organic growth. Our automated SEO suite audits your site health, generates optimized content briefs, tracks target keywords, and scans competitors daily to identify quick-win ranking opportunities.',
    bullets: [
      'AI-powered meta tags and description generator',
      'Real-time SERP position and keyword rank tracking',
      'Content optimization and keyword density audits',
      'Automated backlink monitoring and link-building suggestions',
    ],
    chartData: [
      { name: 'Week 1', organic: 1200, keywords: 45 },
      { name: 'Week 2', organic: 1800, keywords: 78 },
      { name: 'Week 3', organic: 2400, keywords: 112 },
      { name: 'Week 4', organic: 3800, keywords: 195 },
    ],
  },
  campaigns: {
    id: 'campaigns',
    title: 'Ad Campaigns',
    subtitle: 'Build, deploy, and auto-optimize campaigns across all networks',
    icon: Target,
    color: '#FF5E3A',
    description: 'Launch high-converting campaigns across Google, Meta, and LinkedIn in minutes. Write your campaign objective, and our AI drafts copy, selects targeting parameters, designs visual layouts, and budgets allocations.',
    bullets: [
      'Multi-platform automated ad budget optimization',
      'AI copywriter generating hundreds of variations',
      'Unified audience builder with lookalike logic',
      'Real-time auto-pausing for low-performing creatives',
    ],
    chartData: [
      { name: 'Google Ads', Spend: 2500, Returns: 7500 },
      { name: 'Meta Ads', Spend: 3200, Returns: 8900 },
      { name: 'LinkedIn Ads', Spend: 1500, Returns: 3800 },
    ],
  },
};

type FeatureTabKey = keyof typeof tabData;

function FeaturesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = (searchParams.get('tab') as FeatureTabKey) || 'analytics';
  const [activeTab, setActiveTab] = useState<FeatureTabKey>(initialTab);

  useEffect(() => {
    const tab = searchParams.get('tab') as FeatureTabKey;
    if (tab && tabData[tab]) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: FeatureTabKey) => {
    setActiveTab(tab);
    router.replace(`/features?tab=${tab}`);
  };

  const currentFeature = tabData[activeTab];

  return (
    <div className="relative min-h-screen bg-white overflow-hidden font-[Plus_Jakarta_Sans]">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF5E3A]/5 via-[#C084FC]/5 to-transparent pointer-events-none" />
      <div className="absolute top-20 left-[5%] w-72 h-72 bg-[#FF5E3A]/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-20 right-[5%] w-96 h-96 bg-[#C084FC]/10 rounded-full blur-3xl animate-float pointer-events-none" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full bg-white/40 backdrop-blur-xl border-b border-black/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => router.push('/')}>
            <MarketMindLogo size={32} />
            <span className="font-bold text-lg gradient-text">MarketMind</span>
          </div>
          <button
            onClick={() => router.push('/signup')}
            className="px-5 py-2 bg-gradient-to-r from-[#FF5E3A] to-[#C084FC] text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          >
            Get Started
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FF5E3A]/10 rounded-full px-4 py-1.5 mb-4 text-[#FF5E3A]">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Features Overview</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Maximize your marketing with <span className="gradient-text">Advanced AI</span>
          </h1>
          <p className="text-gray-500 text-lg">
            Explore the powerful feature suite built to scale customer acquisition and automate campaigns.
          </p>
        </div>

        {/* Custom Tab Selection Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {(Object.keys(tabData) as FeatureTabKey[]).map((tabKey) => {
            const item = tabData[tabKey];
            const isActive = activeTab === tabKey;
            return (
              <button
                key={tabKey}
                onClick={() => handleTabChange(tabKey)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF5E3A] to-[#C084FC] text-white shadow-lg scale-105'
                    : 'bg-white/60 backdrop-blur-md border border-gray-200/80 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} style={{ color: isActive ? '#fff' : item.color }} />
                {item.title}
              </button>
            );
          })}
        </div>

        {/* Tab Panel details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Details Panel */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div
                    className="p-2.5 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${currentFeature.color}15` }}
                  >
                    <currentFeature.icon className="w-6 h-6" style={{ color: currentFeature.color }} />
                  </div>
                  <span className="text-sm font-extrabold uppercase tracking-wider text-gray-400">
                    Feature Highlight
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">{currentFeature.title}</h2>
                <p className="text-base text-gray-600 font-medium leading-relaxed mb-4">
                  {currentFeature.subtitle}
                </p>
                <p className="text-gray-500 leading-relaxed">
                  {currentFeature.description}
                </p>
              </div>

              {/* Bullet Points */}
              <div className="space-y-3.5">
                {currentFeature.bullets.map((bullet, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 font-medium">{bullet}</span>
                  </div>
                ))}
              </div>

              {/* CTA button */}
              <div className="pt-2">
                <button
                  onClick={() => router.push('/signup')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-gray-900 text-white hover:bg-black font-semibold rounded-2xl shadow-lg transition-colors text-sm"
                >
                  Start using {currentFeature.title}
                  <Zap className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>

            {/* Interactive Mockup/Visualization Panel */}
            <div className="lg:col-span-7">
              <div className="glass-strong border border-black/5 rounded-3xl p-6 md:p-8 h-full flex flex-col justify-between shadow-xl min-h-[400px]">
                {/* Simulated Web App Bar */}
                <div className="flex items-center justify-between pb-6 border-b border-black/5 mb-6">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="text-xs text-gray-400 font-semibold ml-2">MarketMind Platform</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Preview
                  </span>
                </div>

                {/* Display Custom Graphical Mockup based on selected tab */}
                <div className="flex-1 flex flex-col justify-center">
                  {activeTab === 'analytics' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white border border-black/5 rounded-2xl p-4 shadow-sm">
                          <span className="text-xs text-gray-400 font-medium block mb-1">Avg. conversion</span>
                          <span className="text-xl font-bold text-gray-900">4.8%</span>
                          <span className="text-xs text-emerald-500 font-semibold flex items-center gap-0.5 mt-1">
                            <TrendingUp className="w-3 h-3" /> +12.3%
                          </span>
                        </div>
                        <div className="bg-white border border-black/5 rounded-2xl p-4 shadow-sm">
                          <span className="text-xs text-gray-400 font-medium block mb-1">Total revenue</span>
                          <span className="text-xl font-bold text-gray-900">₹8,420</span>
                          <span className="text-xs text-emerald-500 font-semibold flex items-center gap-0.5 mt-1">
                            <TrendingUp className="w-3 h-3" /> +18.4%
                          </span>
                        </div>
                        <div className="bg-white border border-black/5 rounded-2xl p-4 shadow-sm">
                          <span className="text-xs text-gray-400 font-medium block mb-1">Avg. ROAS</span>
                          <span className="text-xl font-bold text-gray-900">4.2x</span>
                          <span className="text-xs text-emerald-500 font-semibold flex items-center gap-0.5 mt-1">
                            <TrendingUp className="w-3 h-3" /> +9.1%
                          </span>
                        </div>
                      </div>

                      <div className="bg-white/50 border border-black/5 rounded-2xl p-4 shadow-sm">
                        <p className="text-xs font-semibold text-gray-500 mb-3">Conversion and ROI Trend</p>
                        <div className="h-48">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={currentFeature.chartData}>
                              <defs>
                                <linearGradient id="colorROI" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#FF5E3A" stopOpacity={0.3} />
                                  <stop offset="95%" stopColor="#FF5E3A" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <XAxis dataKey="name" stroke="#A3A3A3" fontSize={11} axisLine={false} tickLine={false} />
                              <YAxis stroke="#A3A3A3" fontSize={11} axisLine={false} tickLine={false} />
                              <Tooltip />
                              <Area type="monotone" dataKey="ROI" stroke="#FF5E3A" strokeWidth={2.5} fillOpacity={1} fill="url(#colorROI)" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'leads' && (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white border border-black/5 rounded-2xl p-4 shadow-sm flex flex-col justify-center items-center">
                          <p className="text-xs font-semibold text-gray-500 mb-2">Lead Stage Breakdown</p>
                          <div className="h-36 w-full flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={currentFeature.chartData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={40}
                                  outerRadius={60}
                                  paddingAngle={3}
                                  dataKey="value"
                                >
                                  {currentFeature.chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        {/* Recent Leads list */}
                        <div className="bg-white border border-black/5 rounded-2xl p-4 shadow-sm space-y-3">
                          <p className="text-xs font-bold text-gray-500 mb-1">New Hot Leads</p>
                          <div className="space-y-2.5">
                            {[
                              { name: 'Karan Sharma', company: 'BuildFast Inc.', score: 98, status: 'Hot' },
                              { name: 'Sneha Patel', company: 'Nexus Retail', score: 92, status: 'Hot' },
                              { name: 'Rahul Varma', company: 'Apex Logistics', score: 86, status: 'Warm' },
                            ].map((lead, i) => (
                              <div key={i} className="flex items-center justify-between border-b border-black/[0.03] pb-2 last:border-0 last:pb-0">
                                <div>
                                  <span className="text-xs font-bold text-gray-800 block">{lead.name}</span>
                                  <span className="text-[10px] text-gray-400">{lead.company}</span>
                                </div>
                                <div className="text-right">
                                  <span className="text-xs font-extrabold text-emerald-600 block">{lead.score} pts</span>
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-purple-50 text-[#C084FC]">
                                    {lead.status}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* AI Enrichment card */}
                      <div className="bg-gradient-to-r from-[#C084FC]/10 to-[#FF5E3A]/5 border border-[#C084FC]/10 rounded-2xl p-4 shadow-sm flex items-center gap-3">
                        <Mail className="w-8 h-8 text-[#C084FC] shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-gray-800">Smart Enrichment Active</p>
                          <p className="text-[11px] text-gray-500 leading-normal">
                            AI successfully matched sneha@nexus.com with LinkedIn data. Persona matches target buyer template.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'seo' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white border border-black/5 rounded-2xl p-4 shadow-sm">
                          <span className="text-xs text-gray-400 font-medium block mb-1">Keywords Traced</span>
                          <span className="text-xl font-bold text-gray-900">195 words</span>
                          <span className="text-xs text-emerald-500 font-semibold flex items-center gap-0.5 mt-1">
                            <TrendingUp className="w-3 h-3" /> +24% this week
                          </span>
                        </div>
                        <div className="bg-white border border-black/5 rounded-2xl p-4 shadow-sm">
                          <span className="text-xs text-gray-400 font-medium block mb-1">Organic Traffic</span>
                          <span className="text-xl font-bold text-gray-900">3,800 /mo</span>
                          <span className="text-xs text-emerald-500 font-semibold flex items-center gap-0.5 mt-1">
                            <TrendingUp className="w-3 h-3" /> +110% YoY
                          </span>
                        </div>
                      </div>

                      {/* Chart widget */}
                      <div className="bg-white/50 border border-black/5 rounded-2xl p-4 shadow-sm">
                        <p className="text-xs font-semibold text-gray-500 mb-3">Organic Growth & Rank keywords</p>
                        <div className="h-44">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={currentFeature.chartData}>
                              <defs>
                                <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.3} />
                                  <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <XAxis dataKey="name" stroke="#A3A3A3" fontSize={11} axisLine={false} tickLine={false} />
                              <YAxis stroke="#A3A3A3" fontSize={11} axisLine={false} tickLine={false} />
                              <Tooltip />
                              <Area type="monotone" dataKey="organic" stroke="#38BDF8" strokeWidth={2.5} fillOpacity={1} fill="url(#colorOrganic)" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'campaigns' && (
                    <div className="space-y-6">
                      {/* Interactive Bar Chart showing Spend vs Return */}
                      <div className="bg-white/50 border border-black/5 rounded-2xl p-4 shadow-sm">
                        <p className="text-xs font-semibold text-gray-500 mb-3">Campaign Performance (Spend vs Return)</p>
                        <div className="h-48">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={currentFeature.chartData}>
                              <XAxis dataKey="name" stroke="#A3A3A3" fontSize={11} axisLine={false} tickLine={false} />
                              <YAxis stroke="#A3A3A3" fontSize={11} axisLine={false} tickLine={false} />
                              <Tooltip />
                              <Bar dataKey="Spend" fill="#FF5E3A" radius={[4, 4, 0, 0]} />
                              <Bar dataKey="Returns" fill="#38BDF8" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Active Channels pills */}
                      <div className="flex items-center justify-between bg-white border border-black/5 rounded-2xl p-4 shadow-sm">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5 text-emerald-500" />
                          <span className="text-xs font-bold text-gray-800">Auto-Optimization Engine</span>
                        </div>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                          Active
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer of Card mockup */}
                <div className="pt-6 border-t border-black/5 flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Real production data mock simulation</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#C084FC]" />
                    <span>Secure end-to-end encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-gray-100 bg-white/40 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-1">
              <MarketMindLogo size={28} />
              <span className="font-bold text-base gradient-text">MarketMind</span>
            </div>
            <p className="text-xs text-gray-400">Your AI-powered marketing operating system.</p>
          </div>
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} MarketMind. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    }>
      <FeaturesContent />
    </Suspense>
  );
}
