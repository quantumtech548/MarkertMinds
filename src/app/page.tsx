'use client';

import { useAppStore } from '@/store/use-app-store';
import LandingPage from '@/components/landing/LandingPage';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import AppSidebar from '@/components/app/AppSidebar';
import KPICards from '@/components/dashboard/KPICards';
import DashboardCharts from '@/components/dashboard/DashboardCharts';
import AIInsightsPanel from '@/components/dashboard/AIInsightsPanel';
import ChatInterface from '@/components/chat/ChatInterface';
import CampaignsList from '@/components/campaigns/CampaignsList';
import LeadsCRM from '@/components/leads/LeadsCRM';
import SeoDashboard from '@/components/seo/SeoDashboard';
import IntegrationsView from '@/components/integrations/IntegrationsView';
import AdminView from '@/components/admin/AdminView';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu } from 'lucide-react';

const viewMeta: Record<string, { title: string; description: string }> = {
  dashboard: { title: 'Dashboard', description: 'Overview of your marketing performance' },
  chat: { title: 'AI Chat', description: 'Talk to your AI Marketing Employee' },
  campaigns: { title: 'Campaigns', description: 'Manage ad campaigns across platforms' },
  leads: { title: 'Leads', description: 'Track and manage your leads' },
  seo: { title: 'SEO', description: 'Organic search performance & insights' },
  integrations: { title: 'Integrations', description: 'Connect your marketing platforms' },
  admin: { title: 'Admin', description: 'Business profile & settings' },
};

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

function ViewHeader({ view }: { view: string }) {
  const meta = viewMeta[view];
  if (!meta || view === 'chat') return null;
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold tracking-tight">{meta.title}</h1>
      <p className="text-sm text-muted-foreground mt-1">{meta.description}</p>
    </div>
  );
}

function DashboardView() {
  return (
    <div className="space-y-6">
      <KPICards />
      <AIInsightsPanel />
      <DashboardCharts />
    </div>
  );
}

function AppShell() {
  const { currentView, sidebarOpen, toggleSidebar } = useAppStore();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'chat':
        return <ChatInterface />;
      case 'campaigns':
        return <CampaignsList />;
      case 'leads':
        return <LeadsCRM />;
      case 'seo':
        return <SeoDashboard />;
      case 'integrations':
        return <IntegrationsView />;
      case 'admin':
        return <AdminView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafafa] via-white to-[#f5f3ff]">
      <AppSidebar />

      <div
        className="transition-all duration-300 ease-out"
        style={{ marginLeft: sidebarOpen ? 256 : 80 }}
      >
        <header className="sticky top-0 z-30 h-16 flex items-center gap-4 px-6 border-b border-black/5 bg-white/60 backdrop-blur-xl">
          <button
            onClick={toggleSidebar}
            className="lg:hidden h-10 w-10 rounded-xl flex items-center justify-center hover:bg-black/5 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} className="text-foreground" />
          </button>
          <ViewHeader view={currentView} />
        </header>

        <main className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={currentView === 'chat' ? 'h-[calc(100vh-7rem)]' : ''}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default function Home() {
  const { currentView, onboardingComplete } = useAppStore();

  if (currentView === 'landing') {
    return <LandingPage />;
  }

  if (currentView === 'onboarding' || !onboardingComplete) {
    return <OnboardingFlow />;
  }

  return <AppShell />;
}
