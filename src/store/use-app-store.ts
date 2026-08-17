import { create } from 'zustand';
import type { AppView, ChatMessage, OnboardingData, Lead, Campaign, SeoQuery, AIInsight, IntegrationStatus } from '@/types';
import { mockCampaigns, mockLeads, mockSeoQueries, mockInsights, mockIntegrations, mockChatMessages, mockKPIs, demoCampaigns, demoLeads, demoSeoQueries, demoInsights } from '@/data/mock-data';

interface AppState {
  currentView: AppView;
  sidebarOpen: boolean;
  onboardingComplete: boolean;
  onboardingData: OnboardingData;
  messages: ChatMessage[];
  isTyping: boolean;
  campaigns: Campaign[];
  leads: Lead[];
  seoQueries: SeoQuery[];
  insights: AIInsight[];
  integrations: IntegrationStatus[];
  selectedCampaign: Campaign | null;

  setView: (view: AppView) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  completeOnboarding: (data: OnboardingData) => void;
  addMessage: (message: ChatMessage) => void;
  setTyping: (typing: boolean) => void;
  selectCampaign: (campaign: Campaign | null) => void;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
  connectIntegration: (platform: string) => void;
  disconnectIntegration: (platform: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentView: 'landing',
  sidebarOpen: true,
  onboardingComplete: false,
  onboardingData: {
    businessName: '',
    website: '',
    industry: '',
    location: '',
    targetAudience: '',
    monthlyBudget: 50000,
    products: '',
    aov: 0,
  },
  messages: mockChatMessages,
  isTyping: false,
  campaigns: mockCampaigns,
  leads: mockLeads,
  seoQueries: mockSeoQueries,
  insights: mockInsights,
  integrations: mockIntegrations,
  selectedCampaign: null,

  setView: (view) => set({ currentView: view }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  completeOnboarding: (data) => set({
    onboardingComplete: true,
    onboardingData: data,
    currentView: 'dashboard',
  }),
  addMessage: (message) => set((s) => ({
    messages: [...s.messages, message],
  })),
  setTyping: (typing) => set({ isTyping: typing }),
  selectCampaign: (campaign) => set({ selectedCampaign: campaign }),
  updateLeadStatus: (id, status) => set((s) => ({
    leads: s.leads.map((l) => l.id === id ? { ...l, status } : l),
  })),
  connectIntegration: (platform) => set((s) => {
    const updatedIntegrations = s.integrations.map((i) =>
      i.platform === platform
        ? { ...i, connected: true, lastSync: new Date().toLocaleDateString(), accountName: `Syncing ${i.name} Account` }
        : i
    );

    let addedCampaigns = [...s.campaigns];
    let addedLeads = [...s.leads];
    let addedSeo = [...s.seoQueries];
    let addedInsights = [...s.insights];

    if (platform === 'google_ads') {
      addedCampaigns = [...addedCampaigns, ...demoCampaigns.filter(c => c.platform === 'google')];
      addedLeads = [...addedLeads, ...demoLeads.filter(l => l.source.includes('Google'))];
    } else if (platform === 'meta') {
      addedCampaigns = [...addedCampaigns, ...demoCampaigns.filter(c => c.platform === 'meta')];
      addedLeads = [...addedLeads, ...demoLeads.filter(l => l.source.includes('Meta') || l.source.includes('WhatsApp'))];
    } else if (platform === 'search_console') {
      addedSeo = [...addedSeo, ...demoSeoQueries];
    } else if (platform === 'ga4') {
      addedInsights = [...addedInsights, ...demoInsights];
    }

    return {
      integrations: updatedIntegrations,
      campaigns: addedCampaigns,
      leads: addedLeads,
      seoQueries: addedSeo,
      insights: addedInsights
    };
  }),
  disconnectIntegration: (platform) => set((s) => {
    const updatedIntegrations = s.integrations.map((i) =>
      i.platform === platform
        ? { ...i, connected: false, lastSync: undefined, accountName: undefined }
        : i
    );

    let filteredCampaigns = s.campaigns;
    let filteredLeads = s.leads;
    let filteredSeo = s.seoQueries;
    let filteredInsights = s.insights;

    if (platform === 'google_ads') {
      filteredCampaigns = s.campaigns.filter(c => c.platform !== 'google');
      filteredLeads = s.leads.filter(l => !l.source.includes('Google'));
    } else if (platform === 'meta') {
      filteredCampaigns = s.campaigns.filter(c => c.platform !== 'meta');
      filteredLeads = s.leads.filter(l => !l.source.includes('Meta') && !l.source.includes('WhatsApp'));
    } else if (platform === 'search_console') {
      filteredSeo = [];
    } else if (platform === 'ga4') {
      filteredInsights = [];
    }

    return {
      integrations: updatedIntegrations,
      campaigns: filteredCampaigns,
      leads: filteredLeads,
      seoQueries: filteredSeo,
      insights: filteredInsights
    };
  }),
}));

export const useKPIs = () => {
  const store = useAppStore();
  const connectedCount = store.integrations.filter(i => i.connected).length;
  
  if (connectedCount === 0) {
    return mockKPIs;
  }

  // Calculate dynamic summary stats based on current active campaigns
  const totalSpend = store.campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalLeads = store.campaigns.reduce((sum, c) => sum + c.conversions, 0);
  const totalImpressions = store.campaigns.reduce((sum, c) => sum + c.impressions, 0);
  const cpl = totalLeads > 0 ? Math.round(totalSpend / totalLeads) : 0;
  const avgRoas = store.campaigns.length > 0 
    ? (store.campaigns.reduce((sum, c) => sum + c.roas, 0) / store.campaigns.length).toFixed(1)
    : '0.0';

  return [
    { label: 'Total Spend', value: `₹${totalSpend.toLocaleString()}`, change: 12.5, changeLabel: 'vs last month', icon: 'DollarSign' },
    { label: 'Total Leads', value: totalLeads.toString(), change: 34.2, changeLabel: 'vs last month', icon: 'Users' },
    { label: 'Cost Per Lead', value: `₹${cpl}`, change: -14.6, changeLabel: 'vs last month', icon: 'TrendingDown' },
    { label: 'ROAS', value: `${avgRoas}x`, change: 8.4, changeLabel: 'vs last month', icon: 'TrendingUp' },
    { label: 'Conversion Rate', value: '4.1%', change: 2.3, changeLabel: 'vs last month', icon: 'Target' },
    { label: 'Impressions', value: `${(totalImpressions / 1000).toFixed(0)}K`, change: 18.0, changeLabel: 'vs last month', icon: 'Eye' },
  ];
};