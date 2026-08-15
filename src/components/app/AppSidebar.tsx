'use client';

import { useAppStore } from '@/store/use-app-store';
import type { AppView } from '@/types';
import {
  LayoutDashboard,
  MessageSquare,
  Megaphone,
  Users,
  Search,
  Plug,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bot,
  LogOut,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { signOut } from 'next-auth/react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  view: AppView;
}

const navItems: NavItem[] = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', view: 'dashboard' },
  { icon: <MessageSquare size={20} />, label: 'AI Chat', view: 'chat' },
  { icon: <Megaphone size={20} />, label: 'Campaigns', view: 'campaigns' },
  { icon: <Users size={20} />, label: 'Leads', view: 'leads' },
  { icon: <Search size={20} />, label: 'SEO', view: 'seo' },
  { icon: <Plug size={20} />, label: 'Integrations', view: 'integrations' },
  { icon: <Settings size={20} />, label: 'Admin', view: 'admin' },
];

export default function AppSidebar() {
  const { sidebarOpen, setSidebarOpen, currentView, setView } = useAppStore();

  return (
    <motion.aside
      className="fixed top-0 left-0 z-40 h-screen flex flex-col bg-white border-r border-black/5 overflow-hidden"
      animate={{ width: sidebarOpen ? 256 : 80 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Logo Area */}
      <div className="h-16 flex items-center gap-3 px-4 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF5E3A] to-[#C084FC] flex items-center justify-center shrink-0">
          <Bot size={22} className="text-white" />
        </div>
        <AnimatePresence>
          {sidebarOpen && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="font-bold text-lg text-foreground whitespace-nowrap"
            >
              MarketMind
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col gap-1 py-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = currentView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => setView(item.view)}
              className={`
                h-11 flex items-center gap-3 px-3 rounded-lg mx-2 relative transition-colors duration-150
                ${
                  isActive
                    ? 'bg-[#FF5E3A]/10 text-[#FF5E3A]'
                    : 'text-muted-foreground hover:bg-black/5 hover:text-foreground'
                }
              `}
            >
              {/* Active left border accent */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-[#FF5E3A]"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="shrink-0 flex items-center justify-center w-5">
                {item.icon}
              </span>
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.15 }}
                    className="whitespace-nowrap text-sm font-medium overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>

      {/* Bottom Area */}
      <div className="shrink-0 flex flex-col gap-1 p-2 border-t border-black/5">
        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="h-11 flex items-center gap-3 px-3 rounded-lg text-muted-foreground hover:bg-black/5 hover:text-foreground transition-colors duration-150"
        >
          <span className="shrink-0 flex items-center justify-center w-5">
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </span>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="whitespace-nowrap text-sm font-medium overflow-hidden"
              >
                Collapse
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Logout Button */}
        <button
          onClick={() => signOut()}
          className="h-11 flex items-center gap-3 px-3 rounded-lg text-muted-foreground hover:bg-black/5 hover:text-foreground transition-colors duration-150"
        >
          <span className="shrink-0 flex items-center justify-center w-5">
            <LogOut size={20} />
          </span>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="whitespace-nowrap text-sm font-medium overflow-hidden"
              >
                Log out
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
