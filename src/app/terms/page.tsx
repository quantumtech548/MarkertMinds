'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Scale } from 'lucide-react';
import MarketMindLogo from '@/components/ui/logo';

export default function TermsPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-white overflow-hidden font-[Plus_Jakarta_Sans]">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#C084FC]/5 via-white to-transparent pointer-events-none" />

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

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-16 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-[#C084FC]/10 rounded-2xl">
            <Scale className="w-6 h-6 text-[#C084FC]" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Terms of Service</h1>
            <p className="text-xs text-gray-400 mt-1">Last Updated: August 17, 2026</p>
          </div>
        </div>

        <div className="glass-strong border border-black/5 rounded-3xl p-8 md:p-10 space-y-6 text-sm text-gray-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">1. Terms Acceptance</h2>
            <p>
              By signing up or accessing the MarketMind SaaS portal, you agree to comply with and be bound by these Terms of Service. If you disagree with any clause, you must cease using our application immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">2. Service Usage Rules</h2>
            <p>
              Users must not abuse the AI chat, campaign creation engines, or scraper networks. Automated scripting or attempts to scrape campaign details of other tenants is strictly prohibited and will result in instant account ban.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">3. Subscriptions & Payments</h2>
            <p>
              We charge flat subscription rates for our Professional and Enterprise plans. Refunds are handled in accordance with our 14-day customer satisfaction guarantee. Failed transactions will hold campaign sync operations until payment is cleared.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">4. Liabilities</h2>
            <p>
              MarketMind is a marketing tool utilizing artificial intelligence for planning recommendations. We make no guarantees regarding actual ad performance, target audience conversion rates, or sales figures generated through campaigns.
            </p>
          </section>
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
