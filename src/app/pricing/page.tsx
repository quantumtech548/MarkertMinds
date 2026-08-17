'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Sparkles, HelpCircle } from 'lucide-react';
import MarketMindLogo from '@/components/ui/logo';

const faqs = [
  {
    q: 'Can I change plans later?',
    a: 'Yes, you can upgrade, downgrade, or cancel your plan at any time from your account settings page.',
  },
  {
    q: 'Are there any hidden fees?',
    a: 'No. The price you see is the price you pay. There are no setup fees or ad spend transaction fees.',
  },
  {
    q: 'Do you offer a free trial?',
    a: 'Yes, our Starter plan is completely free forever for up to 3 active marketing campaigns.',
  },
  {
    q: 'How secure is our ad data?',
    a: 'We use enterprise-grade AES-256 encryption. We never sell your data or share it with third parties.',
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Starter',
      price: billingPeriod === 'monthly' ? '₹0' : '₹0',
      description: 'Perfect for exploring AI marketing workflows.',
      features: [
        '3 Active Campaigns',
        'Basic AI Recommendations',
        '1 Platform Integration',
        'Email Support',
      ],
      cta: 'Get Started Free',
      popular: false,
    },
    {
      name: 'Professional',
      price: billingPeriod === 'monthly' ? '₹4,999' : '₹3,999',
      description: 'For growing businesses and marketing teams.',
      features: [
        'Unlimited Active Campaigns',
        'Advanced AI Attribution Analytics',
        'All Platform Integrations',
        'Priority Slack Support',
        'Custom Client Branding',
        'API Developer Access',
      ],
      cta: 'Start Pro Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For agencies and large scale operations.',
      features: [
        'Everything in Professional',
        'Dedicated AI Agent Assistant',
        'Custom ML Attribution Models',
        'Dedicated Account Manager',
        '99.9% SLA & Uptime Guarantee',
        'On-Premise Private DB Option',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <div className="relative min-h-screen bg-white overflow-hidden font-[Plus_Jakarta_Sans]">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#C084FC]/5 via-[#38BDF8]/5 to-transparent pointer-events-none" />
      <div className="absolute top-40 right-[10%] w-96 h-96 bg-[#C084FC]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-[10%] w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/40 backdrop-blur-xl border-b border-black/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => router.push('/')}>
            <MarketMindLogo size={32} />
            <span className="font-bold text-lg gradient-text">MarketMind</span>
          </div>
          <button
            onClick={() => router.push('/signup')}
            className="px-5 py-2 bg-gradient-to-r from-[#FF5E3A] to-[#C084FC] text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          >
            Get Started
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#C084FC]/10 rounded-full px-4 py-1.5 mb-4 text-[#C084FC]">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Pricing Plans</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-gray-500 text-lg">
            Choose the perfect plan for your business. Switch or cancel anytime.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-semibold ${billingPeriod === 'monthly' ? 'text-gray-900' : 'text-gray-400'}`}>
              Billed Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              className="w-14 h-8 bg-gray-100 rounded-full p-1 relative transition-colors duration-200"
            >
              <div
                className={`w-6 h-6 rounded-full bg-gradient-to-r from-[#FF5E3A] to-[#C084FC] transition-all duration-200 ${
                  billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm font-semibold flex items-center gap-1.5 ${billingPeriod === 'yearly' ? 'text-gray-900' : 'text-gray-400'}`}>
              Billed Annually
              <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`glass-strong rounded-3xl p-8 flex flex-col relative transition-all duration-300 hover:shadow-xl ${
                plan.popular ? 'border-2 border-[#C084FC] md:-translate-y-4' : 'border border-black/5'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-[#FF5E3A] to-[#C084FC] text-white text-xs font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-500">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                {plan.price !== 'Custom' && (
                  <span className="text-sm text-gray-400 font-medium">/mo</span>
                )}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => router.push('/signup')}
                className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-[#FF5E3A] to-[#C084FC] text-white shadow-md hover:shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8 flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-gray-400" />
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-strong border border-black/5 p-6 rounded-2xl">
                <h4 className="text-sm font-bold text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-gray-100 bg-white/40 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-1">
              <MarketMindLogo size={28} />
              <span className="font-bold text-base gradient-text">MarketMind</span>
            </div>
            <p className="text-xs text-gray-400">Your AI-powered marketing operating system.</p>
          </div>
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} MarketMind. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
