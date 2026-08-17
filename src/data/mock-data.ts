import type { KPIData, AIInsight, ChatMessage, Campaign, Lead, SeoQuery, IntegrationStatus } from '@/types';

// Blank initial states
export const mockKPIs: KPIData[] = [
  { label: 'Total Spend', value: '₹0', change: 0, changeLabel: 'vs last month', icon: 'DollarSign' },
  { label: 'Total Leads', value: '0', change: 0, changeLabel: 'vs last month', icon: 'Users' },
  { label: 'Cost Per Lead', value: '₹0', change: 0, changeLabel: 'vs last month', icon: 'TrendingDown' },
  { label: 'ROAS', value: '0.0x', change: 0, changeLabel: 'vs last month', icon: 'TrendingUp' },
  { label: 'Conversion Rate', value: '0.0%', change: 0, changeLabel: 'vs last month', icon: 'Target' },
  { label: 'Impressions', value: '0', change: 0, changeLabel: 'vs last month', icon: 'Eye' },
];

export const mockInsights: AIInsight[] = [];

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Welcome! I\'m your AI Marketing Employee. I can help you analyze campaigns, generate strategies, optimize SEO, and manage leads. What would you like to work on today?',
    timestamp: new Date(),
    actions: [
      { label: '🚀 Get More Leads', action: 'get-leads', variant: 'primary' },
      { label: '📈 Increase Sales', action: 'increase-sales' },
      { label: '🔍 Improve SEO', action: 'improve-seo' },
      { label: '📊 Analyze Campaigns', action: 'analyze-campaigns' },
    ],
  },
];

export const mockCampaigns: Campaign[] = [];
export const mockLeads: Lead[] = [];
export const mockSeoQueries: SeoQuery[] = [];

export const mockIntegrations: IntegrationStatus[] = [
  { platform: 'google_ads', name: 'Google Ads', connected: false },
  { platform: 'meta', name: 'Meta Business Suite', connected: false },
  { platform: 'ga4', name: 'Google Analytics 4', connected: false },
  { platform: 'search_console', name: 'Google Search Console', connected: false },
];

export const mockSpendOverTime: { date: string; google: number; meta: number }[] = [];
export const mockLeadsOverTime: { date: string; leads: number }[] = [];

export const mockFunnelData = [
  { stage: 'Impressions', count: 0, pct: 0 },
  { stage: 'Clicks', count: 0, pct: 0 },
  { stage: 'Landing Page Views', count: 0, pct: 0 },
  { stage: 'WhatsApp Clicks', count: 0, pct: 0 },
  { stage: 'Leads', count: 0, pct: 0 },
  { stage: 'Converted', count: 0, pct: 0 },
];

// Rich Demo Datasets populated when platforms connect
export const demoCampaigns: Campaign[] = [
  {
    id: 'c1', name: 'Salon Lead Gen - Search', platform: 'google', status: 'active',
    budget: 30000, spent: 18450, impressions: 245000, clicks: 4200, conversions: 186,
    ctr: 1.71, cpc: 4.39, cpa: 99.19, roas: 4.8,
  },
  {
    id: 'c2', name: 'Instagram Brand Awareness', platform: 'meta', status: 'active',
    budget: 20000, spent: 12300, impressions: 890000, clicks: 12400, conversions: 98,
    ctr: 1.39, cpc: 0.99, cpa: 125.51, roas: 3.2,
  },
  {
    id: 'c3', name: 'WhatsApp Click-to-Message', platform: 'meta', status: 'active',
    budget: 15000, spent: 8900, impressions: 345000, clicks: 5600, conversions: 312,
    ctr: 1.62, cpc: 1.59, cpa: 28.53, roas: 6.1,
  },
  {
    id: 'c4', name: 'Google Display - Retargeting', platform: 'google', status: 'paused',
    budget: 10000, spent: 6700, impressions: 560000, clicks: 2800, conversions: 45,
    ctr: 0.5, cpc: 2.39, cpa: 148.89, roas: 2.1,
  },
];

export const demoLeads: Lead[] = [
  { id: 'l1', name: 'Priya Sharma', email: 'priya@email.com', phone: '+91 98765 43210', source: 'Google Ads', score: 92, status: 'qualified', campaign: 'Salon Lead Gen', date: '2026-08-12' },
  { id: 'l2', name: 'Amit Patel', email: 'amit.p@email.com', phone: '+91 87654 32109', source: 'WhatsApp CTA', score: 85, status: 'new', campaign: 'WhatsApp Click', date: '2026-08-12' },
  { id: 'l3', name: 'Sneha Kulkarni', email: 'sneha.k@email.com', phone: '+91 76543 21098', source: 'Meta Ads', score: 78, status: 'contacted', campaign: 'Instagram Brand', date: '2026-08-11' },
  { id: 'l4', name: 'Rahul Deshmukh', email: 'rahul.d@email.com', phone: '+91 65432 10987', source: 'Google Ads', score: 95, status: 'converted', campaign: 'Salon Lead Gen', date: '2026-08-11' },
  { id: 'l6', name: 'Vikram Singh', email: 'vikram.s@email.com', phone: '+91 43210 98765', source: 'WhatsApp CTA', score: 88, status: 'qualified', campaign: 'WhatsApp Click', date: '2026-08-10' },
];

export const demoSeoQueries: SeoQuery[] = [
  { query: 'best salon in mumbai', clicks: 342, impressions: 12400, ctr: 2.76, position: 3.2 },
  { query: 'hair salon near andheri', clicks: 289, impressions: 8900, ctr: 3.25, position: 2.8 },
  { query: 'bridal makeup mumbai', clicks: 156, impressions: 6700, ctr: 2.33, position: 4.1 },
];

export const demoInsights: AIInsight[] = [
  { id: '1', type: 'warning', message: 'CPL increased 18% this week on Google Ads. Consider optimizing your landing page or adjusting bid strategy.', action: 'Review Campaigns' },
  { id: '2', type: 'insight', message: '8 keywords are close to page #1 ranking. A content push could capture significant traffic.', action: 'View SEO' },
];
