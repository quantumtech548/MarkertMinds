'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/use-app-store';
import type { OnboardingData } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ArrowLeft, Check, Building2, Globe, MapPin, Users, DollarSign, Package, Sparkles } from 'lucide-react';

const industries = [
  'Salon & Beauty', 'Healthcare', 'Real Estate', 'Education',
  'E-commerce', 'Restaurant & Food', 'Fitness', 'Technology',
  'Legal Services', 'Finance', 'Travel', 'Other',
];

const steps = [
  { id: 1, title: 'Business Info', icon: Building2, description: 'Tell us about your business' },
  { id: 2, title: 'Targeting', icon: Users, description: 'Who are your customers?' },
  { id: 3, title: 'Budget & Products', icon: DollarSign, description: 'Set your investment & offerings' },
];

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -300 : 300, opacity: 0 }),
};

export default function OnboardingFlow() {
  const { completeOnboarding, setView } = useAppStore();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    businessName: '', website: '', industry: '', location: '',
    targetAudience: '', monthlyBudget: 50000, products: '', aov: 0,
  });

  const update = (field: keyof OnboardingData, value: string | number) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const goNext = () => {
    if (step < 3) {
      setDirection(1);
      setStep(step + 1);
    } else {
      completeOnboarding(data);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafafa] via-white to-[#f5f3ff] flex items-center justify-center p-4">
      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF5E3A]/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C084FC]/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#38BDF8]/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Skip link */}
        <div className="text-right mb-4">
          <button
            onClick={() => completeOnboarding(data)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip for now →
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-8">
          {steps.map((s) => (
            <div key={s.id} className="flex-1">
              <div className={`h-1.5 rounded-full transition-all duration-500 ${step >= s.id ? 'bg-gradient-to-r from-[#FF5E3A] to-[#C084FC]' : 'bg-black/5'}`} />
              <div className={`flex items-center gap-2 mt-2 ${step >= s.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step > s.id ? 'bg-[#FF5E3A] text-white' : step === s.id ? 'bg-[#FF5E3A]/10 text-[#FF5E3A] border-2 border-[#FF5E3A]' : 'bg-black/5'}`}>
                  {step > s.id ? <Check size={14} /> : s.id}
                </div>
                <span className="text-xs font-medium hidden sm:block">{s.title}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Step content card */}
        <Card className="bg-white/60 backdrop-blur-xl border-white/60 shadow-lg overflow-hidden">
          <CardContent className="p-8 md:p-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {/* Step 1: Business Info */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-[#FF5E3A]/10 flex items-center justify-center">
                          <Building2 size={20} className="text-[#FF5E3A]" />
                        </div>
                        <h2 className="text-2xl font-bold">Business Information</h2>
                      </div>
                      <p className="text-muted-foreground text-sm">Tell us about your business so we can tailor your marketing strategy.</p>
                    </div>

                    <div className="grid gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input
                          id="businessName"
                          placeholder="e.g., StyleHub Salon"
                          value={data.businessName}
                          onChange={(e) => update('businessName', e.target.value)}
                          className="bg-white/60 border-white/60"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Website URL</Label>
                        <div className="relative">
                          <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="website"
                            placeholder="https://yourbusiness.com"
                            value={data.website}
                            onChange={(e) => update('website', e.target.value)}
                            className="pl-10 bg-white/60 border-white/60"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Industry</Label>
                        <div className="flex flex-wrap gap-2">
                          {industries.map((ind) => (
                            <button
                              key={ind}
                              onClick={() => update('industry', ind)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${data.industry === ind ? 'bg-[#FF5E3A] text-white shadow-md shadow-[#FF5E3A]/20' : 'bg-white/60 border border-white/60 hover:bg-white/80 text-muted-foreground'}`}
                            >
                              {ind}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="relative">
                          <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="location"
                            placeholder="e.g., Mumbai, India"
                            value={data.location}
                            onChange={(e) => update('location', e.target.value)}
                            className="pl-10 bg-white/60 border-white/60"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Targeting */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-[#C084FC]/10 flex items-center justify-center">
                          <Users size={20} className="text-[#C084FC]" />
                        </div>
                        <h2 className="text-2xl font-bold">Target Audience</h2>
                      </div>
                      <p className="text-muted-foreground text-sm">Define who you want to reach with your marketing.</p>
                    </div>

                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="targetAudience">Describe your ideal customer</Label>
                        <textarea
                          id="targetAudience"
                          placeholder="e.g., Women aged 25-45 in Mumbai looking for premium beauty services, interested in self-care and wellness..."
                          value={data.targetAudience}
                          onChange={(e) => update('targetAudience', e.target.value)}
                          rows={4}
                          className="w-full rounded-xl bg-white/60 border border-white/60 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#FF5E3A]/30 placeholder:text-muted-foreground/50"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-gradient-to-r from-[#FF5E3A]/5 to-[#C084FC]/5 border border-white/40">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-[#FF5E3A]">25-45</p>
                          <p className="text-xs text-muted-foreground">Top Age Range</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-[#C084FC]">8km</p>
                          <p className="text-xs text-muted-foreground">Optimal Radius</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#38BDF8]/5 border border-[#38BDF8]/20">
                        <div className="flex items-start gap-3">
                          <Sparkles size={18} className="text-[#38BDF8] mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">AI Suggestion</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Based on your industry (Salon & Beauty), we recommend targeting women aged 25-45 within a 8km radius. This audience segment typically has 3.2x higher conversion rates for salon services.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Budget & Products */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/10 flex items-center justify-center">
                          <DollarSign size={20} className="text-[#38BDF8]" />
                        </div>
                        <h2 className="text-2xl font-bold">Budget & Products</h2>
                      </div>
                      <p className="text-muted-foreground text-sm">Set your monthly budget and describe your offerings.</p>
                    </div>

                    <div className="grid gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="budget">Monthly Marketing Budget (₹)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₹</span>
                          <Input
                            id="budget"
                            type="number"
                            value={data.monthlyBudget}
                            onChange={(e) => update('monthlyBudget', Number(e.target.value))}
                            className="pl-8 bg-white/60 border-white/60"
                          />
                        </div>
                        <div className="flex gap-2 mt-2">
                          {[25000, 50000, 100000, 250000].map((amt) => (
                            <button
                              key={amt}
                              onClick={() => update('monthlyBudget', amt)}
                              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${data.monthlyBudget === amt ? 'bg-[#FF5E3A] text-white' : 'bg-white/60 border border-white/60 hover:bg-white/80'}`}
                            >
                              ₹{(amt / 1000).toFixed(0)}K
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="products">Products & Services</Label>
                        <div className="relative">
                          <Package size={16} className="absolute left-3 top-3 text-muted-foreground" />
                          <textarea
                            id="products"
                            placeholder="e.g., Haircuts, Hair Color, Facials, Bridal Makeup, Keratin Treatment, Nail Art..."
                            value={data.products}
                            onChange={(e) => update('products', e.target.value)}
                            rows={3}
                            className="w-full rounded-xl bg-white/60 border border-white/60 pl-10 pr-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#FF5E3A]/30 placeholder:text-muted-foreground/50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="aov">Average Order Value (₹)</Label>
                        <Input
                          id="aov"
                          type="number"
                          placeholder="e.g., 1500"
                          value={data.aov || ''}
                          onChange={(e) => update('aov', Number(e.target.value))}
                          className="bg-white/60 border-white/60"
                        />
                      </div>

                      {/* Budget breakdown preview */}
                      <div className="p-4 rounded-xl bg-gradient-to-r from-[#FF5E3A]/5 via-[#C084FC]/5 to-[#38BDF8]/5 border border-white/40">
                        <p className="text-sm font-medium mb-3">Recommended Budget Split</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Google Ads (Search)</span>
                            <span className="font-medium">₹{Math.round(data.monthlyBudget * 0.5).toLocaleString()}</span>
                          </div>
                          <div className="h-2 rounded-full bg-black/5 overflow-hidden">
                            <div className="h-full w-[60%] bg-gradient-to-r from-[#FF5E3A] to-[#FF5E3A]/70 rounded-full" />
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Meta (Instagram + Facebook)</span>
                            <span className="font-medium">₹{Math.round(data.monthlyBudget * 0.35).toLocaleString()}</span>
                          </div>
                          <div className="h-2 rounded-full bg-black/5 overflow-hidden">
                            <div className="h-full w-[35%] bg-gradient-to-r from-[#C084FC] to-[#C084FC]/70 rounded-full" />
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>SEO & Content</span>
                            <span className="font-medium">₹{Math.round(data.monthlyBudget * 0.15).toLocaleString()}</span>
                          </div>
                          <div className="h-2 rounded-full bg-black/5 overflow-hidden">
                            <div className="h-full w-[15%] bg-gradient-to-r from-[#38BDF8] to-[#38BDF8]/70 rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-black/5">
              <Button
                variant="ghost"
                onClick={goBack}
                disabled={step === 1}
                className="gap-2"
              >
                <ArrowLeft size={16} />
                Back
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {step} of {steps.length}
                </span>
                <Button
                  onClick={goNext}
                  className="gap-2 bg-[#FF5E3A] hover:bg-[#FF5E3A]/90 text-white rounded-xl px-6"
                >
                  {step === 3 ? 'Launch Dashboard' : 'Continue'}
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Your data is encrypted and stored securely. We never share your information.
        </p>
      </div>
    </div>
  );
}