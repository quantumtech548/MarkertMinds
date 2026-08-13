'use client';

import { useAppStore } from '@/store/use-app-store';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Plug,
  CheckCircle2,
  XCircle,
  RefreshCw,
  ExternalLink,
  Shield,
  Zap,
  BarChart3,
  Globe,
  Activity,
} from 'lucide-react';
import { useState } from 'react';

const platformIcons: Record<string, React.ReactNode> = {
  google_ads: (
    <div className="h-10 w-10 rounded-xl bg-[#4285F4]/10 flex items-center justify-center">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#4285F4">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    </div>
  ),
  meta: (
    <div className="h-10 w-10 rounded-xl bg-[#1877F2]/10 flex items-center justify-center">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    </div>
  ),
  ga4: (
    <div className="h-10 w-10 rounded-xl bg-[#F9AB00]/10 flex items-center justify-center">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#F9AB00">
        <path d="M20 4v16H4V4h16m2-2H2v20h20V2zM7 15h2v4H7zm4-6h2v10h-2zm4-3h2v13h-2z" />
      </svg>
    </div>
  ),
  search_console: (
    <div className="h-10 w-10 rounded-xl bg-[#4285F4]/10 flex items-center justify-center">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#4285F4">
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </svg>
    </div>
  ),
};

const platformDescriptions: Record<string, string> = {
  google_ads: 'Import campaigns, ad groups, keywords, and conversion data from your Google Ads account.',
  meta: 'Sync Meta campaigns, audience insights, and lead data from Facebook & Instagram.',
  ga4: 'Track website visitors, events, conversions, and user behavior across your site.',
  search_console: 'Monitor organic search performance, keywords, and indexing status.',
};

const platformFeatures: Record<string, string[]> = {
  google_ads: ['Campaign performance data', 'Keyword metrics', 'Conversion tracking', 'Budget & spend'],
  meta: ['Ad campaign data', 'Audience insights', 'Lead form submissions', 'Creative performance'],
  ga4: ['User behavior tracking', 'Event monitoring', 'Conversion funnels', 'Audience demographics'],
  search_console: ['Search query data', 'Click & impression metrics', 'Page indexing', 'Core web vitals'],
};

export default function IntegrationsView() {
  const { integrations, connectIntegration, disconnectIntegration } = useAppStore();
  const [syncingPlatform, setSyncingPlatform] = useState<string | null>(null);

  const handleToggle = (platform: string, connected: boolean) => {
    if (connected) {
      disconnectIntegration(platform);
    } else {
      connectIntegration(platform);
      setSyncingPlatform(platform);
      setTimeout(() => setSyncingPlatform(null), 2000);
    }
  };

  const handleSync = (platform: string) => {
    setSyncingPlatform(platform);
    setTimeout(() => setSyncingPlatform(null), 1500);
  };

  const connectedCount = integrations.filter((i) => i.connected).length;

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Plug className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Integrations</h2>
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <div className="flex items-center gap-1.5 text-sm">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">{connectedCount}</span> of {integrations.length} connected
            </span>
          </div>
        </div>
      </div>

      {/* Connection Health Banner */}
      {connectedCount > 0 && connectedCount < integrations.length && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200/60"
        >
          <Zap className="h-5 w-5 text-amber-500 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-amber-800">Connect more platforms for complete data</p>
            <p className="text-xs text-amber-600 mt-0.5">
              Connecting all platforms enables cross-channel analysis and better AI recommendations.
            </p>
          </div>
          <Button
            size="sm"
            className="bg-amber-500 hover:bg-amber-600 text-white border-0 rounded-full px-4 shrink-0"
          >
            Connect All
          </Button>
        </motion.div>
      )}

      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration, index) => {
          const isSyncing = syncingPlatform === integration.platform;

          return (
            <motion.div
              key={integration.platform}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
            >
              <Card
                className={`bg-white/60 backdrop-blur-xl shadow-sm transition-all duration-200 hover:shadow-md ${
                  integration.connected
                    ? 'border-green-200/60'
                    : 'border-white/60'
                }`}
              >
                <CardContent className="p-6">
                  {/* Top Row */}
                  <div className="flex items-start gap-4 mb-4">
                    {platformIcons[integration.platform] || (
                      <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold">{integration.name}</h3>
                        {integration.connected ? (
                          <Badge className="bg-green-100 text-green-700 border-green-200 text-[10px] px-1.5 py-0">
                            Connected
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-muted-foreground">
                            Not Connected
                          </Badge>
                        )}
                      </div>
                      {integration.connected && integration.accountName && (
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">
                          {integration.accountName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {platformDescriptions[integration.platform]}
                  </p>

                  {/* Features List */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {(platformFeatures[integration.platform] || []).map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center text-[11px] text-muted-foreground bg-muted/40 rounded-full px-2.5 py-1"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Row */}
                  <div className="flex items-center justify-between pt-4 border-t border-muted/30">
                    {integration.connected && integration.lastSync && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Activity className="h-3 w-3" />
                        <span>Last synced: {integration.lastSync}</span>
                      </div>
                    )}
                    {!integration.connected && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Shield className="h-3 w-3" />
                        <span>Secure OAuth 2.0</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      {integration.connected && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full px-3 h-8 text-xs"
                          onClick={() => handleSync(integration.platform)}
                          disabled={isSyncing}
                        >
                          <RefreshCw
                            className={`h-3.5 w-3.5 mr-1.5 ${isSyncing ? 'animate-spin' : ''}`}
                          />
                          {isSyncing ? 'Syncing...' : 'Sync'}
                        </Button>
                      )}
                      <Button
                        size="sm"
                        className={`rounded-full px-4 h-8 text-xs ${
                          integration.connected
                            ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                            : 'bg-[#FF5E3A] hover:bg-[#FF5E3A]/90 text-white border-0'
                        }`}
                        onClick={() =>
                          handleToggle(integration.platform, integration.connected)
                        }
                      >
                        {isSyncing && !integration.connected ? (
                          <>
                            <RefreshCw className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                            Connecting...
                          </>
                        ) : integration.connected ? (
                          <>
                            <XCircle className="h-3.5 w-3.5 mr-1.5" />
                            Disconnect
                          </>
                        ) : (
                          <>
                            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                            Connect
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Data Security Note */}
      <Card className="bg-white/60 backdrop-blur-xl border-white/60 shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1">Data Security & Privacy</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All integrations use secure OAuth 2.0 authentication. Your credentials are encrypted at rest and in transit.
                We only access the minimum data required to provide marketing insights. You can revoke access at any time.
                Data is synced every 15 minutes and cached locally for fast dashboard loading.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
