import type { KPIData, AIInsight, ChatMessage, Campaign, Lead, SeoQuery, IntegrationStatus } from '@/types';

export const mockKPIs: KPIData[] = [
  { label: 'Total Spend', value: '₹1,24,500', change: -8.2, changeLabel: 'vs last month', icon: 'DollarSign' },
  { label: 'Total Leads', value: '847', change: 23.5, changeLabel: 'vs last month', icon: 'Users' },
  { label: 'Cost Per Lead', value: '₹147', change: -18.1, changeLabel: 'vs last month', icon: 'TrendingDown' },
  { label: 'ROAS', value: '4.2x', change: 12.3, changeLabel: 'vs last month', icon: 'TrendingUp' },
  { label: 'Conversion Rate', value: '3.8%', change: 5.1, changeLabel: 'vs last month', icon: 'Target' },
  { label: 'Impressions', value: '2.4M', change: 15.0, changeLabel: 'vs last month', icon: 'Eye' },
];

export const mockInsights: AIInsight[] = [
  { id: '1', type: 'warning', message: 'CPL increased 18% this week on Google Ads. Consider optimizing your landing page or adjusting bid strategy.', action: 'Review Campaigns' },
  { id: '2', type: 'insight', message: '8 keywords are close to page #1 ranking. A small content optimization push could capture significant organic traffic.', action: 'View SEO' },
  { id: '3', type: 'success', message: 'Your Meta lead campaigns are outperforming benchmarks by 32%. Current CPL ₹98 vs industry average ₹145.', action: 'See Details' },
  { id: '4', type: 'insight', message: 'Peak conversion hours identified: 10AM-12PM and 7PM-9PM. Consider scheduling ad delivery for these windows.', action: 'Optimize Schedule' },
  { id: '5', type: 'error', message: 'Search Console data sync failed 2 hours ago. Reconnect your account to resume SEO monitoring.', action: 'Fix Now' },
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Welcome! I\'m your AI Marketing Employee. I can help you analyze campaigns, generate strategies, optimize SEO, and manage leads. What would you like to work on today?',
    timestamp: new Date(Date.now() - 3600000),
    actions: [
      { label: '🚀 Get More Leads', action: 'get-leads', variant: 'primary' },
      { label: '📈 Increase Sales', action: 'increase-sales' },
      { label: '🔍 Improve SEO', action: 'improve-seo' },
      { label: '📊 Analyze Campaigns', action: 'analyze-campaigns' },
    ],
  },
  {
    id: '2',
    role: 'user',
    content: 'I own a salon in Mumbai. I have ₹50,000/month marketing budget. Get me more WhatsApp leads.',
    timestamp: new Date(Date.now() - 3000000),
  },
  {
    id: '3',
    role: 'assistant',
    content: `I've analyzed your business profile and past campaign performance. Here's my recommendation for a lead generation campaign:

**Strategy: Multi-Platform WhatsApp Lead Generation**

I'll create a targeted campaign focusing on users within 8km of your salon location in Mumbai. Based on your industry benchmarks and budget, I recommend a 60/40 split between Google Ads and Meta.

**Budget Allocation:**
• Google Ads (Search): ₹30,000/month — Target high-intent "salon near me" queries
• Meta (Instagram + Facebook): ₹20,000/month — Visual showcase + WhatsApp click-to-message

I'll create 3 audience segments:
1. **Hot Leads** — Users searching for salon services right now
2. **Warm Audience** — Interest-based targeting (beauty, wellness, self-care)
3. **Lookalike** — Based on your existing customer data`,
    timestamp: new Date(Date.now() - 2400000),
    toolCalls: [
      { name: 'analyze_website', args: { url: 'https://example-salon.com' }, result: 'Landing page score: 72/100. Missing WhatsApp CTA, slow load time on mobile.' },
      { name: 'get_campaign_metrics', args: { platform: 'google', dateRange: 'last_30_days' }, result: 'Previous campaigns: 312 leads, ₹164 CPL, 2.8x ROAS' },
    ],
    chart: {
      type: 'pie',
      title: 'Recommended Budget Allocation',
      data: [
        { name: 'Google Search', value: 30000, fill: '#FF5E3A' },
        { name: 'Meta Ads', value: 20000, fill: '#C084FC' },
      ],
      xKey: 'name',
      yKeys: ['value'],
      colors: ['#FF5E3A', '#C084FC'],
    },
    actions: [
      { label: 'Generate Campaign Assets', action: 'generate-assets', variant: 'primary' },
      { label: 'Create Landing Page', action: 'create-landing' },
      { label: 'Review & Launch', action: 'review-launch' },
    ],
  },
  {
    id: '4',
    role: 'user',
    content: 'Generate Campaign Assets',
    timestamp: new Date(Date.now() - 1800000),
  },
  {
    id: '5',
    role: 'assistant',
    content: `Here are the generated campaign assets for your salon's lead generation campaign:

**Google Ads Headlines:**
1. "Best Salon in Mumbai | Book Now on WhatsApp"
2. "Premium Hair & Beauty Services | ₹299 First Visit"
3. "Mumbai's Top-Rated Salon | Instant WhatsApp Booking"
4. "Expert Stylists | Affordable Luxury | Book Today"
5. "Salon Near Me | Walk-in or WhatsApp Appointment"

**Google Ads Descriptions:**
1. "Experience world-class haircuts, facials & beauty treatments. Book instantly on WhatsApp. New customers get 20% off!"
2. "Rated 4.8★ by 2000+ customers. Expert stylists, hygienic setup. Click to chat & book your slot now."
3. "Your neighborhood salon reimagined. From hair color to bridal makeup — we do it all. WhatsApp us today!"

**Meta Ad Concepts:**
• **Carousel Ad**: 5-card showcase (Haircut → Color → Facial → Bridal → Offers)
• **Video Ad**: 15s transformation reel with WhatsApp CTA
• **Story Ad": "Tap to book on WhatsApp" with before/after split`,
    timestamp: new Date(Date.now() - 1200000),
    toolCalls: [
      { name: 'generate_ad_copy', args: { type: 'google_search', business: 'salon', location: 'Mumbai' }, result: 'Generated 5 headlines, 3 descriptions' },
    ],
    actions: [
      { label: '✨ Refine Copy', action: 'refine-copy' },
      { label: '🚀 Review & Launch', action: 'review-launch', variant: 'primary' },
      { label: '💾 Save for Later', action: 'save-draft' },
    ],
  },
];

export const mockCampaigns: Campaign[] = [
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
  {
    id: 'c5', name: 'Festive Offer Campaign', platform: 'meta', status: 'completed',
    budget: 25000, spent: 25000, impressions: 1200000, clicks: 18000, conversions: 420,
    ctr: 1.5, cpc: 1.39, cpa: 59.52, roas: 5.4,
  },
  {
    id: 'c6', name: 'Local SEO Boost', platform: 'google', status: 'draft',
    budget: 5000, spent: 0, impressions: 0, clicks: 0, conversions: 0,
    ctr: 0, cpc: 0, cpa: 0, roas: 0,
  },
];

export const mockLeads: Lead[] = [
  { id: 'l1', name: 'Priya Sharma', email: 'priya@email.com', phone: '+91 98765 43210', source: 'Google Ads', score: 92, status: 'qualified', campaign: 'Salon Lead Gen', date: '2026-08-12' },
  { id: 'l2', name: 'Amit Patel', email: 'amit.p@email.com', phone: '+91 87654 32109', source: 'WhatsApp CTA', score: 85, status: 'new', campaign: 'WhatsApp Click', date: '2026-08-12' },
  { id: 'l3', name: 'Sneha Kulkarni', email: 'sneha.k@email.com', phone: '+91 76543 21098', source: 'Meta Ads', score: 78, status: 'contacted', campaign: 'Instagram Brand', date: '2026-08-11' },
  { id: 'l4', name: 'Rahul Deshmukh', email: 'rahul.d@email.com', phone: '+91 65432 10987', source: 'Google Ads', score: 95, status: 'converted', campaign: 'Salon Lead Gen', date: '2026-08-11' },
  { id: 'l5', name: 'Neha Joshi', email: 'neha.j@email.com', phone: '+91 54321 09876', source: 'Organic', score: 64, status: 'contacted', campaign: 'SEO Traffic', date: '2026-08-10' },
  { id: 'l6', name: 'Vikram Singh', email: 'vikram.s@email.com', phone: '+91 43210 98765', source: 'WhatsApp CTA', score: 88, status: 'qualified', campaign: 'WhatsApp Click', date: '2026-08-10' },
  { id: 'l7', name: 'Ananya Reddy', email: 'ananya.r@email.com', phone: '+91 32109 87654', source: 'Meta Ads', score: 71, status: 'new', campaign: 'Festive Offer', date: '2026-08-09' },
  { id: 'l8', name: 'Karan Mehta', email: 'karan.m@email.com', phone: '+91 21098 76543', source: 'Google Ads', score: 82, status: 'converted', campaign: 'Salon Lead Gen', date: '2026-08-09' },
  { id: 'l9', name: 'Divya Nair', email: 'divya.n@email.com', phone: '+91 10987 65432', source: 'Referral', score: 90, status: 'qualified', campaign: 'Word of Mouth', date: '2026-08-08' },
  { id: 'l10', name: 'Arjun Kapoor', email: 'arjun.k@email.com', phone: '+91 09876 54321', source: 'Meta Ads', score: 55, status: 'lost', campaign: 'Instagram Brand', date: '2026-08-07' },
];

export const mockSeoQueries: SeoQuery[] = [
  { query: 'best salon in mumbai', clicks: 342, impressions: 12400, ctr: 2.76, position: 3.2 },
  { query: 'hair salon near andheri', clicks: 289, impressions: 8900, ctr: 3.25, position: 2.8 },
  { query: 'bridal makeup mumbai', clicks: 156, impressions: 6700, ctr: 2.33, position: 4.1 },
  { query: 'hair spa mumbai', clicks: 198, impressions: 5400, ctr: 3.67, position: 2.1 },
  { query: 'salon offers today', clicks: 445, impressions: 15200, ctr: 2.93, position: 5.6 },
  { query: 'keratin treatment cost', clicks: 87, impressions: 3200, ctr: 2.72, position: 6.2 },
  { query: 'men\'s haircut mumbai', clicks: 234, impressions: 9800, ctr: 2.39, position: 3.8 },
  { query: 'nail art near me', clicks: 112, impressions: 4100, ctr: 2.73, position: 4.5 },
  { query: 'hair color mumbai price', clicks: 67, impressions: 2800, ctr: 2.39, position: 7.1 },
  { query: 'salon booking app', clicks: 23, impressions: 1900, ctr: 1.21, position: 8.4 },
  { query: 'facial treatment mumbai', clicks: 145, impressions: 5600, ctr: 2.59, position: 4.8 },
  { query: 'mumbai beauty parlour', clicks: 312, impressions: 11000, ctr: 2.84, position: 3.1 },
];

export const mockIntegrations: IntegrationStatus[] = [
  { platform: 'google_ads', name: 'Google Ads', connected: true, accountName: 'Salon Business Account', lastSync: '2026-08-13' },
  { platform: 'meta', name: 'Meta Business Suite', connected: true, accountName: 'Salon Instagram & FB', lastSync: '2026-08-13' },
  { platform: 'ga4', name: 'Google Analytics 4', connected: false },
  { platform: 'search_console', name: 'Google Search Console', connected: true, accountName: 'example-salon.com', lastSync: '2026-08-12' },
];

export const mockSpendOverTime = [
  { date: 'Jul 1', google: 4200, meta: 2800 },
  { date: 'Jul 5', google: 3800, meta: 3100 },
  { date: 'Jul 10', google: 5100, meta: 2600 },
  { date: 'Jul 15', google: 4700, meta: 3400 },
  { date: 'Jul 20', google: 5300, meta: 2900 },
  { date: 'Jul 25', google: 4900, meta: 3200 },
  { date: 'Aug 1', google: 5600, meta: 3500 },
  { date: 'Aug 5', google: 5200, meta: 3100 },
  { date: 'Aug 10', google: 4800, meta: 3800 },
  { date: 'Aug 13', google: 5100, meta: 3400 },
];

export const mockLeadsOverTime = [
  { date: 'Jul 1', leads: 28 },
  { date: 'Jul 5', leads: 35 },
  { date: 'Jul 10', leads: 42 },
  { date: 'Jul 15', leads: 38 },
  { date: 'Jul 20', leads: 51 },
  { date: 'Jul 25', leads: 46 },
  { date: 'Aug 1', leads: 58 },
  { date: 'Aug 5', leads: 62 },
  { date: 'Aug 10', leads: 55 },
  { date: 'Aug 13', leads: 67 },
];

export const mockFunnelData = [
  { stage: 'Impressions', count: 2440000, pct: 100 },
  { stage: 'Clicks', count: 40200, pct: 1.65 },
  { stage: 'Landing Page Views', count: 32160, pct: 80 },
  { stage: 'WhatsApp Clicks', count: 12864, pct: 40 },
  { stage: 'Leads', count: 847, pct: 6.58 },
  { stage: 'Converted', count: 312, pct: 36.8 },
];
