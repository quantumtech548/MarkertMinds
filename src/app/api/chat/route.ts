import { NextRequest, NextResponse } from 'next/server';

interface ChatRequestBody {
  message: string;
  conversationId?: string;
  context?: {
    businessName?: string;
    industry?: string;
    location?: string;
    budget?: number;
  };
}

const TOOL_DEFINITIONS = [
  {
    name: 'analyze_website',
    description: 'Analyze a website for marketing readiness, SEO, and conversion optimization.',
    parameters: { type: 'object', properties: { url: { type: 'string' } }, required: ['url'] },
  },
  {
    name: 'analyze_seo',
    description: 'Fetch and analyze SEO performance data from Search Console.',
    parameters: { type: 'object', properties: { dateRange: { type: 'string' }, query: { type: 'string' } }, required: ['dateRange'] },
  },
  {
    name: 'get_campaign_metrics',
    description: 'Fetch campaign performance metrics from Google Ads or Meta.',
    parameters: { type: 'object', properties: { platform: { type: 'string' }, dateRange: { type: 'string' }, campaignId: { type: 'string' } }, required: ['platform'] },
  },
  {
    name: 'generate_ad_copy',
    description: 'Generate ad headlines, descriptions, and creative concepts.',
    parameters: { type: 'object', properties: { type: { type: 'string' }, business: { type: 'string' }, location: { type: 'string' }, offer: { type: 'string' } }, required: ['type', 'business'] },
  },
  {
    name: 'calculate_roi',
    description: 'Calculate ROAS, CPL, CPA, and other marketing ROI metrics.',
    parameters: { type: 'object', properties: { spend: { type: 'number' }, revenue: { type: 'number' }, leads: { type: 'number' } }, required: ['spend', 'revenue'] },
  },
  {
    name: 'get_lead_funnel',
    description: 'Get the full marketing funnel data from impressions to conversions.',
    parameters: { type: 'object', properties: { dateRange: { type: 'string' } }, required: ['dateRange'] },
  },
];

// Simulated tool execution
function executeTool(name: string, args: Record<string, unknown>): string {
  switch (name) {
    case 'analyze_website':
      return JSON.stringify({
        score: 72,
        issues: ['Missing WhatsApp CTA', 'Slow mobile load (4.2s)', 'No structured data', 'Missing alt tags on 3 images'],
        recommendations: ['Add WhatsApp floating button', 'Optimize images for mobile', 'Add JSON-LD schema', 'Fix alt tags'],
        pageSpeed: { mobile: 58, desktop: 89 },
        seoScore: 74,
      });
    case 'analyze_seo':
      return JSON.stringify({
        totalClicks: 2370,
        totalImpressions: 86500,
        avgCtr: 2.74,
        avgPosition: 4.3,
        topQueries: [
          { query: 'best salon in mumbai', clicks: 342, position: 3.2 },
          { query: 'hair salon near andheri', clicks: 289, position: 2.8 },
          { query: 'bridal makeup mumbai', clicks: 156, position: 4.1 },
        ],
      });
    case 'get_campaign_metrics':
      return JSON.stringify({
        totalSpend: 124500,
        totalImpressions: 2440000,
        totalClicks: 40200,
        totalConversions: 847,
        avgCtr: 1.65,
        avgCpc: 3.1,
        avgCpa: 147,
        roas: 4.2,
        platformBreakdown: {
          google: { spend: 72450, conversions: 412, roas: 4.8 },
          meta: { spend: 52050, conversions: 435, roas: 3.6 },
        },
      });
    case 'generate_ad_copy':
      return JSON.stringify({
        headlines: [
          'Best Salon in Mumbai | Book Now on WhatsApp',
          'Premium Hair & Beauty Services | 20% Off First Visit',
          'Mumbai Top-Rated Salon | 4.8 Stars | Instant Booking',
        ],
        descriptions: [
          'Experience world-class haircuts, facials & beauty treatments. Book instantly on WhatsApp.',
          'Rated 4.8 stars by 2000+ customers. Expert stylists, hygienic setup. Click to book.',
        ],
        concepts: ['Carousel: Service Showcase', 'Video: Transformation Reel', 'Story: Tap to WhatsApp'],
      });
    case 'calculate_roi':
      const { spend, revenue, leads } = args as { spend: number; revenue: number; leads?: number };
      const roas = revenue / spend;
      const cpl = leads ? spend / leads : 0;
      return JSON.stringify({ roas: roas.toFixed(2), cpl: cpl.toFixed(2), profit: revenue - spend, margin: ((revenue - spend) / revenue * 100).toFixed(1) + '%' });
    case 'get_lead_funnel':
      return JSON.stringify({
        stages: [
          { name: 'Impressions', count: 2440000, rate: 100 },
          { name: 'Clicks', count: 40200, rate: 1.65 },
          { name: 'Landing Views', count: 32160, rate: 80 },
          { name: 'Leads', count: 847, rate: 2.63 },
          { name: 'Converted', count: 312, rate: 36.8 },
        ],
      });
    default:
      return JSON.stringify({ error: 'Unknown tool' });
  }
}

// Simple intent detection
function detectIntent(message: string): { intent: string; tools: { name: string; args: Record<string, unknown> }[] } {
  const lower = message.toLowerCase();

  if (lower.includes('lead') && (lower.includes('get') || lower.includes('more') || lower.includes('generate') || lower.includes('whatsapp'))) {
    return {
      intent: 'create_lead_generation_campaign',
      tools: [
        { name: 'analyze_website', args: { url: 'https://example-salon.com' } },
        { name: 'get_campaign_metrics', args: { platform: 'google', dateRange: 'last_30_days' } },
      ],
    };
  }

  if (lower.includes('seo') || lower.includes('ranking') || lower.includes('search') || lower.includes('keyword')) {
    return {
      intent: 'analyze_seo_performance',
      tools: [
        { name: 'analyze_seo', args: { dateRange: 'last_30_days' } },
      ],
    };
  }

  if (lower.includes('campaign') || lower.includes('ad') || lower.includes('performance') || lower.includes('roas')) {
    return {
      intent: 'analyze_campaign_performance',
      tools: [
        { name: 'get_campaign_metrics', args: { platform: 'google', dateRange: 'last_30_days' } },
        { name: 'calculate_roi', args: { spend: 124500, revenue: 523000, leads: 847 } },
      ],
    };
  }

  if (lower.includes('sales') || lower.includes('revenue') || lower.includes('increase') || lower.includes('grow')) {
    return {
      intent: 'increase_sales_strategy',
      tools: [
        { name: 'get_campaign_metrics', args: { platform: 'google', dateRange: 'last_30_days' } },
        { name: 'calculate_roi', args: { spend: 124500, revenue: 523000, leads: 847 } },
        { name: 'get_lead_funnel', args: { dateRange: 'last_30_days' } },
      ],
    };
  }

  return { intent: 'general_query', tools: [] };
}

// Generate a response based on intent and tool results
function generateResponse(intent: string, toolResults: { name: string; result: string }[], userMessage: string): string {
  switch (intent) {
    case 'create_lead_generation_campaign': {
      const website = toolResults.find(t => t.name === 'analyze_website');
      const metrics = toolResults.find(t => t.name === 'get_campaign_metrics');
      return `I've analyzed your business and past campaign performance. Here's my recommendation for a lead generation campaign:

**Strategy: Multi-Platform WhatsApp Lead Generation**

Based on your budget and industry benchmarks, I recommend a 60/40 split between Google Ads and Meta.

**Budget Allocation:**
- Google Ads (Search): 60% - Target high-intent service queries
- Meta (Instagram + Facebook): 40% - Visual showcase + WhatsApp click-to-message

${website ? `**Website Analysis:** Your landing page scored ${JSON.parse(website.result).score}/100. I found some optimization opportunities.` : ''}

${metrics ? `**Past Performance:** ${JSON.parse(metrics.result).totalConversions} leads generated with ${JSON.parse(metrics.result).roas}x ROAS.` : ''}

I'll create 3 audience segments:
1. **Hot Leads** - Users searching for services right now
2. **Warm Audience** - Interest-based targeting (beauty, wellness)
3. **Lookalike** - Based on your existing customer data`;
    }
    case 'analyze_seo_performance': {
      const seo = toolResults.find(t => t.name === 'analyze_seo');
      if (seo) {
        const data = JSON.parse(seo.result);
        return `**SEO Performance Report**

Total Clicks: **${data.totalClicks.toLocaleString()}**
Total Impressions: **${data.totalImpressions.toLocaleString()}**
Average CTR: **${data.avgCtr}%**
Average Position: **${data.avgPosition}**

**Top Queries:**
${data.topQueries.map((q: { query: string; clicks: number; position: number }) => `- "${q.query}" — ${q.clicks} clicks (Position ${q.position})`).join('\n')}

**Recommendations:**
- 8 keywords are close to page #1 ranking. A small content optimization push could capture significant organic traffic.
- Consider creating dedicated landing pages for your top-performing queries.
- Your CTR is above industry average — focus on improving positions for high-impression keywords.`;
      }
      return 'I can help analyze your SEO performance. Let me pull the latest data from Search Console.';
    }
    case 'analyze_campaign_performance': {
      const metrics = toolResults.find(t => t.name === 'get_campaign_metrics');
      const roi = toolResults.find(t => t.name === 'calculate_roi');
      return `**Campaign Performance Summary**

${metrics ? `**Spend:** ₹${JSON.parse(metrics.result).totalSpend.toLocaleString()}
**Impressions:** ${(JSON.parse(metrics.result).totalImpressions / 1000000).toFixed(1)}M
**Clicks:** ${JSON.parse(metrics.result).totalClicks.toLocaleString()}
**Conversions:** ${JSON.parse(metrics.result).totalConversions}
**ROAS:** ${JSON.parse(metrics.result).roas}x` : ''}

${roi ? `**ROI Analysis:**
- Profit: ₹${JSON.parse(roi.result).profit.toLocaleString()}
- Margin: ${JSON.parse(roi.result).margin}
- CPL: ₹${JSON.parse(roi.result).cpl}` : ''}

**Key Insights:**
- Your Google campaigns are outperforming Meta by 33% on ROAS
- CPC has decreased 12% compared to last month
- Consider reallocating 10% of Meta budget to Google Search for better returns`;
    }
    case 'increase_sales_strategy': {
      return `**Sales Growth Strategy**

Based on your current data, here are my recommendations to increase sales:

**1. Optimize Your Conversion Funnel**
- Your landing page converts at 2.6%. Industry average is 3.5%.
- Add social proof (testimonials, reviews) above the fold.
- Implement exit-intent popups with a special offer.

**2. Retargeting Campaign**
- You have ${40200 - 847} visitors who didn't convert.
- Launch a retargeting campaign with special offers.
- Expected to recover 5-8% of lost visitors.

**3. Upsell Strategy**
- Bundle services (e.g., Haircut + Facial combo at 15% off).
- Implement post-purchase upsell via WhatsApp.

**4. Referral Program**
- Your satisfied customers are your best marketing channel.
- Offer 20% off for both referrer and referee.

Would you like me to generate a detailed campaign plan for any of these strategies?`;
    }
    default:
      return `I understand you're asking about: "${userMessage}"

As your AI Marketing Employee, I can help you with:
- **Lead Generation** — Create campaigns to get more leads
- **Campaign Analysis** — Review performance across platforms
- **SEO Optimization** — Improve organic search rankings
- **Sales Growth** — Strategies to increase revenue
- **Ad Copy** — Generate headlines and creative content

What would you like to focus on?`;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequestBody = await request.json();
    const { message, context } = body;

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Detect intent
    const { intent, tools } = detectIntent(message);

    // Execute tools
    const toolResults = tools.map(tool => ({
      name: tool.name,
      args: tool.args,
      result: executeTool(tool.name, tool.args),
    }));

    // Generate response
    const response = generateResponse(intent, toolResults, message);

    // Determine suggested actions based on intent
    let actions: Array<{ label: string; action: string; variant?: string }> = [];
    switch (intent) {
      case 'create_lead_generation_campaign':
        actions = [
          { label: 'Generate Campaign Assets', action: 'generate-assets', variant: 'primary' },
          { label: 'Create Landing Page', action: 'create-landing' },
          { label: 'Review & Launch', action: 'review-launch' },
        ];
        break;
      case 'analyze_seo_performance':
        actions = [
          { label: 'Generate Content Plan', action: 'generate-content', variant: 'primary' },
          { label: 'View All Keywords', action: 'view-keywords' },
        ];
        break;
      case 'analyze_campaign_performance':
        actions = [
          { label: 'Optimize Campaigns', action: 'optimize', variant: 'primary' },
          { label: 'Export Report', action: 'export-report' },
        ];
        break;
      case 'increase_sales_strategy':
        actions = [
          { label: 'Launch Retargeting', action: 'launch-retargeting', variant: 'primary' },
          { label: 'Create Referral Program', action: 'create-referral' },
        ];
        break;
    }

    return NextResponse.json({
      role: 'assistant',
      content: response,
      intent,
      toolCalls: toolResults,
      actions,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
