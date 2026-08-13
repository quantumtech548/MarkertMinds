'use client';

import { useAppStore } from '@/store/use-app-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import {
  Settings,
  Building2,
  Globe,
  MapPin,
  Users,
  IndianRupee,
  Bell,
  Mail,
  Smartphone,
  Shield,
  Palette,
  Save,
  CheckCircle2,
  Clock,
  Bot,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';

const industries = [
  'Salon & Beauty', 'Healthcare', 'Real Estate', 'Education',
  'E-commerce', 'Restaurant', 'Fitness', 'Legal Services',
  'Home Services', 'Automotive', 'Travel', 'Other',
];

const notificationPrefs = [
  { key: 'campaignAlerts', label: 'Campaign Performance Alerts', desc: 'Get notified when campaigns exceed or fall below performance thresholds', default: true },
  { key: 'leadNotifications', label: 'New Lead Alerts', desc: 'Instant notifications when new leads are captured', default: true },
  { key: 'aiInsights', label: 'AI Insight Digest', desc: 'Daily summary of AI-generated marketing insights', default: true },
  { key: 'seoUpdates', label: 'SEO Ranking Changes', desc: 'Alerts for significant keyword ranking movements', default: false },
  { key: 'weeklyReport', label: 'Weekly Performance Report', desc: 'Automated weekly email with full marketing analytics', default: true },
  { key: 'budgetAlerts', label: 'Budget Utilization Warnings', desc: 'Alert when campaigns approach 80% of daily budget', default: false },
];

const teamMembers = [
  { name: 'Rahul Sharma', role: 'Owner', email: 'rahul@salon.com', avatar: 'RS', status: 'active' as const },
  { name: 'Priya Patel', role: 'Marketing Manager', email: 'priya@salon.com', avatar: 'PP', status: 'active' as const },
  { name: 'Amit Desai', role: 'Developer', email: 'amit@salon.com', avatar: 'AD', status: 'invited' as const },
];

const recentActivity = [
  { action: 'Campaign "WhatsApp Click-to-Message" budget increased to ₹20,000', time: '2 hours ago', icon: <IndianRupee className="h-4 w-4 text-green-500" /> },
  { action: 'New integration connected: Google Analytics 4', time: '5 hours ago', icon: <Globe className="h-4 w-4 text-blue-500" /> },
  { action: 'AI generated 12 new ad copy variations', time: '1 day ago', icon: <Sparkles className="h-4 w-4 text-purple-500" /> },
  { action: 'Lead "Sneha Kulkarni" marked as qualified', time: '1 day ago', icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" /> },
  { action: 'SEO report for August generated', time: '2 days ago', icon: <Bot className="h-4 w-4 text-orange-500" /> },
];

function SectionCard({
  title,
  icon,
  children,
  delay = 0,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card className="bg-white/60 backdrop-blur-xl border-white/60 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-base font-semibold">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </motion.div>
  );
}

export default function AdminView() {
  const { onboardingData } = useAppStore();
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState<Record<string, boolean>>(() => {
    const prefs: Record<string, boolean> = {};
    notificationPrefs.forEach((p) => { prefs[p.key] = p.default; });
    return prefs;
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Admin & Settings</h2>
        </div>
        <Button
          onClick={handleSave}
          className={`rounded-full px-5 h-9 text-sm transition-all duration-300 ${
            saved
              ? 'bg-green-500 hover:bg-green-500 text-white border-0'
              : 'bg-[#FF5E3A] hover:bg-[#FF5E3A]/90 text-white border-0'
          }`}
        >
          {saved ? (
            <>
              <CheckCircle2 className="h-4 w-4 mr-1.5" />
              Saved
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-1.5" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Business Profile & Team */}
        <div className="lg:col-span-2 space-y-6">
          {/* Business Profile */}
          <SectionCard
            title="Business Profile"
            icon={<Building2 className="h-5 w-5 text-[#FF5E3A]" />}
            delay={0}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="business-name" className="text-xs text-muted-foreground">Business Name</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="business-name"
                    defaultValue={onboardingData.businessName || 'Glamour Studio'}
                    className="pl-9 bg-white/60 border-white/60"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="text-xs text-muted-foreground">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="website"
                    defaultValue={onboardingData.website || 'https://glamourstudio.com'}
                    className="pl-9 bg-white/60 border-white/60"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-xs text-muted-foreground">Industry</Label>
                <div className="relative">
                  <Palette className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select
                    id="industry"
                    defaultValue={onboardingData.industry || 'Salon & Beauty'}
                    className="w-full h-9 pl-9 pr-3 rounded-md border border-white/60 bg-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    {industries.map((i) => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-xs text-muted-foreground">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    defaultValue={onboardingData.location || 'Andheri West, Mumbai'}
                    className="pl-9 bg-white/60 border-white/60"
                  />
                </div>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="audience" className="text-xs text-muted-foreground">Target Audience</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <textarea
                    id="audience"
                    defaultValue={onboardingData.targetAudience || 'Women aged 18-45 in Mumbai, interested in beauty & wellness'}
                    rows={2}
                    className="w-full pl-9 pr-3 py-2 rounded-md border border-white/60 bg-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-xs text-muted-foreground">Monthly Budget (INR)</Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="budget"
                    type="number"
                    defaultValue={onboardingData.monthlyBudget || 50000}
                    className="pl-9 bg-white/60 border-white/60"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="aov" className="text-xs text-muted-foreground">Average Order Value (INR)</Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="aov"
                    type="number"
                    defaultValue={onboardingData.aov || 1200}
                    className="pl-9 bg-white/60 border-white/60"
                  />
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Notification Preferences */}
          <SectionCard
            title="Notification Preferences"
            icon={<Bell className="h-5 w-5 text-amber-500" />}
            delay={0.1}
          >
            <div className="space-y-4">
              {notificationPrefs.map((pref, index) => (
                <div key={pref.key}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{pref.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{pref.desc}</p>
                    </div>
                    <Switch
                      checked={notifications[pref.key]}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, [pref.key]: checked }))
                      }
                    />
                  </div>
                  {index < notificationPrefs.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Team Members */}
          <SectionCard
            title="Team Members"
            icon={<Users className="h-5 w-5 text-purple-500" />}
            delay={0.2}
          >
            <div className="space-y-3">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.email}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/40 hover:bg-white/60 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#FF5E3A] to-[#C084FC] flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {member.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">{member.name}</p>
                      <Badge
                        variant="outline"
                        className={`text-[10px] px-1.5 py-0 ${
                          member.status === 'active'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {member.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground">{member.role}</span>
                      <span className="text-xs text-muted-foreground/50">
                        &middot;
                      </span>
                      <span className="text-xs text-muted-foreground truncate">{member.email}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
              <Button
                variant="outline"
                className="w-full rounded-xl border-dashed text-sm text-muted-foreground hover:text-foreground"
              >
                + Invite Team Member
              </Button>
            </div>
          </SectionCard>
        </div>

        {/* Right Column - Quick Stats & Activity */}
        <div className="space-y-6">
          {/* Account Overview */}
          <SectionCard
            title="Account Overview"
            icon={<Shield className="h-5 w-5 text-emerald-500" />}
            delay={0.05}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Plan</span>
                <Badge className="bg-gradient-to-r from-[#FF5E3A] to-[#C084FC] text-white border-0 text-xs">
                  Pro
                </Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">AI Credits Used</span>
                <span className="text-sm font-medium">1,247 / 5,000</span>
              </div>
              <div className="w-full h-2 bg-muted/40 rounded-full overflow-hidden">
                <div className="h-full w-[25%] rounded-full bg-gradient-to-r from-[#FF5E3A] to-[#C084FC]" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Data Retention</span>
                <span className="text-sm font-medium">90 days</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">API Calls (Today)</span>
                <span className="text-sm font-medium">342</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Member Since</span>
                <span className="text-sm font-medium">Jul 2026</span>
              </div>
            </div>
          </SectionCard>

          {/* Contact Preferences */}
          <SectionCard
            title="Contact Preferences"
            icon={<Mail className="h-5 w-5 text-blue-500" />}
            delay={0.15}
          >
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="contact-email" className="text-xs text-muted-foreground">Notification Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="contact-email"
                    defaultValue="rahul@salon.com"
                    className="pl-9 bg-white/60 border-white/60"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone" className="text-xs text-muted-foreground">WhatsApp Number</Label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="contact-phone"
                    defaultValue="+91 98765 43210"
                    className="pl-9 bg-white/60 border-white/60"
                  />
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Critical alerts will always be sent to your email. WhatsApp notifications are for non-urgent updates and daily summaries.
              </p>
            </div>
          </SectionCard>

          {/* Recent Activity */}
          <SectionCard
            title="Recent Activity"
            icon={<Clock className="h-5 w-5 text-orange-500" />}
            delay={0.25}
          >
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {recentActivity.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 shrink-0">{item.icon}</div>
                  <div className="min-w-0">
                    <p className="text-xs leading-relaxed text-foreground">{item.action}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{item.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
