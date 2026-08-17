'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Shield } from 'lucide-react';
import MarketMindLogo from '@/components/ui/logo';

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-white overflow-hidden font-[Plus_Jakarta_Sans]">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#38BDF8]/5 via-white to-transparent pointer-events-none" />

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
          <div className="p-3 bg-[#38BDF8]/10 rounded-2xl">
            <Shield className="w-6 h-6 text-[#38BDF8]" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Privacy Policy</h1>
            <p className="text-xs text-gray-400 mt-1">Last Updated: August 17, 2026</p>
          </div>
        </div>

        <div className="glass-strong border border-black/5 rounded-3xl p-8 md:p-10 space-y-6 text-sm text-gray-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">1. Information We Collect</h2>
            <p>
              We collect information to provide better services to all our users. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Account Details:</strong> Name, email address, billing profile, and credentials.</li>
              <li><strong>Connected Ad Platforms:</strong> Read-only access credentials and performance campaign metrics synced via secure OAuth connections.</li>
              <li><strong>System Logs:</strong> IP address, device properties, browser types, and app interaction history.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">2. How We Use Information</h2>
            <p>
              The collected metrics are solely used for:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Generating cross-channel AI recommendations and attribution dashboards.</li>
              <li>Processing subscriptions and verifying transactional billing checks.</li>
              <li>Improving security checkpoints and application response times.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">3. Data Retention & Revocation</h2>
            <p>
              You retain full ownership of your data. You can disconnect your Meta, Google, and Analytics profiles at any time via the Integrations view. Disconnecting a platform completely deletes the cached credentials and related sync tables from our systems immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">4. Encryption Standards</h2>
            <p>
              All token handshakes and user profiles are secured with modern AES-256 bit encryption methods. We enforce HTTPS layers and verify database snapshots regularly to ensure comprehensive security compliance.
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
