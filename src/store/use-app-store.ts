import { create } from 'zustand';
import type { AppView, ChatMessage, OnboardingData, Lead, Campaign, SeoQuery, AIInsight, IntegrationStatus } from '@/types';
import { mockCampaigns, mockLeads, mockSeoQueries, mockInsights, mockIntegrations, mockChatMessages, mockKPIs } from '@/data/mock-data';

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
  connectIntegration: (platform) => set((s) => ({
    integrations: s.integrations.map((i) =>
      i.platform === platform
        ? { ...i, connected: true, lastSync: new Date().toLocaleDateString() }
        : i
    ),
  })),
  disconnectIntegration: (platform) => set((s) => ({
    integrations: s.integrations.map((i) =>
      i.platform === platform
        ? { ...i, connected: false, lastSync: undefined }
        : i
    ),
  })),
}));

export const useKPIs = () => mockKPIs;