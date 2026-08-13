'use client';

import { useAppStore } from '@/store/use-app-store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  Sparkles,
  ChevronRight,
  X,
} from 'lucide-react';
import { useState } from 'react';

const typeConfig = {
  warning: {
    icon: <AlertTriangle className="h-4 w-4" />,
    bgClass: 'bg-amber-50',
    borderClass: 'border-l-amber-400',
    iconClass: 'text-amber-500',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-700',
    badgeLabel: 'Warning',
  },
  insight: {
    icon: <Lightbulb className="h-4 w-4" />,
    bgClass: 'bg-blue-50',
    borderClass: 'border-l-blue-400',
    iconClass: 'text-blue-500',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-700',
    badgeLabel: 'Insight',
  },
  success: {
    icon: <CheckCircle2 className="h-4 w-4" />,
    bgClass: 'bg-green-50',
    borderClass: 'border-l-green-400',
    iconClass: 'text-green-500',
    badgeBg: 'bg-green-100',
    badgeText: 'text-green-700',
    badgeLabel: 'Success',
  },
  error: {
    icon: <XCircle className="h-4 w-4" />,
    bgClass: 'bg-red-50',
    borderClass: 'border-l-red-400',
    iconClass: 'text-red-500',
    badgeBg: 'bg-red-100',
    badgeText: 'text-red-700',
    badgeLabel: 'Error',
  },
};

export default function AIInsightsPanel() {
  const { insights, setView } = useAppStore();
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visibleInsights = insights.filter((i) => !dismissed.has(i.id));

  const handleDismiss = (id: string) => {
    setDismissed((prev) => new Set(prev).add(id));
  };

  const handleAction = (insight: (typeof insights)[0]) => {
    if (insight.action) {
      if (insight.action.includes('Campaign') || insight.action.includes('campaign')) {
        setView('campaigns');
      } else if (insight.action.includes('SEO') || insight.action.includes('seo')) {
        setView('seo');
      } else if (insight.action.includes('Schedule') || insight.action.includes('Optimize')) {
        setView('campaigns');
      } else if (insight.action.includes('Fix') || insight.action.includes('Reconnect')) {
        setView('integrations');
      } else if (insight.action.includes('Details') || insight.action.includes('See')) {
        setView('chat');
      }
    }
  };

  if (visibleInsights.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-[#C084FC]" />
        <h2 className="text-lg font-semibold">AI Insights</h2>
        <span className="text-xs text-muted-foreground bg-muted/50 rounded-full px-2.5 py-0.5 ml-1">
          {visibleInsights.length}
        </span>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {visibleInsights.map((insight, index) => {
            const config = typeConfig[insight.type];

            return (
              <motion.div
                key={insight.id}
                layout
                initial={{ opacity: 0, x: -16, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 16, scale: 0.95, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3, delay: index * 0.06, ease: 'easeOut' }}
              >
                <Card className={`${config.bgClass}/60 backdrop-blur-xl border-l-4 ${config.borderClass} shadow-sm overflow-hidden`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className={`mt-0.5 shrink-0 ${config.iconClass}`}>
                        {config.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full ${config.badgeBg} ${config.badgeText}`}
                          >
                            {config.badgeLabel}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-700">
                          {insight.message}
                        </p>

                        {/* Action Row */}
                        <div className="flex items-center gap-2 mt-3">
                          {insight.action && (
                            <Button
                              size="sm"
                              className="h-7 rounded-full px-3 text-[11px] font-medium bg-white/80 border border-white/60 hover:bg-white text-foreground shadow-sm"
                              onClick={() => handleAction(insight)}
                            >
                              {insight.action}
                              <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                          )}
                          <button
                            onClick={() => handleDismiss(insight.id)}
                            className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-white/60 transition-colors"
                            aria-label="Dismiss"
                          >
                            <X className="h-3.5 w-3.5 text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
