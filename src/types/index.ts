export type AppView =
  | 'landing'
  | 'onboarding'
  | 'dashboard'
  | 'chat'
  | 'campaigns'
  | 'leads'
  | 'seo'
  | 'integrations'
  | 'admin';

export interface KPIData {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
}

export interface AIInsight {
  id: string;
  type: 'warning' | 'insight' | 'success' | 'error';
  message: string;
  action?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  toolCalls?: ToolCall[];
  actions?: ChatAction[];
  chart?: ChartData;
  table?: TableData;
  timestamp: Date;
}

export interface ToolCall {
  name: string;
  args: Record<string, unknown>;
  result?: string;
}

export interface ChatAction {
  label: string;
  action: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'area';
  title: string;
  data: Record<string, unknown>[];
  xKey: string;
  yKeys: string[];
  colors?: string[];
}

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface Campaign {
  id: string;
  name: string;
  platform: 'google' | 'meta';
  status: 'active' | 'paused' | 'draft' | 'completed';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  cpa: number;
  roas: number;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  score: number;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  campaign: string;
  date: string;
}

export interface SeoQuery {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface OnboardingData {
  businessName: string;
  website: string;
  industry: string;
  location: string;
  targetAudience: string;
  monthlyBudget: number;
  products: string;
  aov: number;
}

export interface IntegrationStatus {
  platform: string;
  name: string;
  connected: boolean;
  accountName?: string;
  lastSync?: string;
}