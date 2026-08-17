'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Bot, Zap, Target, Search, Users, Sparkles, ChevronRight } from 'lucide-react';
import { useAppStore } from '@/store/use-app-store';
import MarketMindLogo from '@/components/ui/logo';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

function useCounter(end: number, duration = 2000, shouldStart: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    let startTime: number | null = null;
    let raf: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end * 10) / 10);
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [shouldStart, end, duration]);

  return count;
}

/* ============================================================
   Landing Page Component
   ============================================================ */

export default function LandingPage() {
  /* ---------- Custom Cursor ---------- */
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorPos = useRef({ x: -100, y: -100 });
  const cursorTarget = useRef({ x: -100, y: -100 });
  const cursorRafRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorTarget.current.x = e.clientX;
      cursorTarget.current.y = e.clientY;
    };
    const animateCursor = () => {
      cursorPos.current.x += (cursorTarget.current.x - cursorPos.current.x) * 0.15;
      cursorPos.current.y += (cursorTarget.current.y - cursorPos.current.y) * 0.15;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorPos.current.x}px`;
        cursorRef.current.style.top = `${cursorPos.current.y}px`;
      }
      cursorRafRef.current = requestAnimationFrame(animateCursor);
    };
    window.addEventListener('mousemove', handleMouseMove);
    cursorRafRef.current = requestAnimationFrame(animateCursor);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(cursorRafRef.current);
    };
  }, []);

  /* ---------- CTA Handler ---------- */
  const router = useRouter();
  const handleGetStarted = () => {
    router.push('/signup');
  };

  /* ---------- CTA Glow Effect ---------- */
  const ctaRef = useRef<HTMLDivElement>(null);
  const handleCTAMouseMove = (e: React.MouseEvent) => {
    if (ctaRef.current) {
      const rect = ctaRef.current.getBoundingClientRect();
      ctaRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      ctaRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    }
  };

  /* ---------- Counters ---------- */
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const c1 = useCounter(500, 2000, statsVisible);
  const c2 = useCounter(2, 1500, statsVisible);
  const c3 = useCounter(4.2, 2200, statsVisible);
  const c4 = useCounter(98, 1800, statsVisible);

  /* ---------- Nav hover state for cursor ---------- */
  const handleHoverStart = () => cursorRef.current?.classList.add('hovering');
  const handleHoverEnd = () => cursorRef.current?.classList.remove('hovering');


  return (
    <div className="relative min-h-screen bg-white overflow-hidden font-[Plus_Jakarta_Sans]">
      {/* ============ 1. Custom Cursor ============ */}
      <div id="custom-cursor" ref={cursorRef} />

      {/* ============ 2. Navigation ============ */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50"
      >
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg rounded-full px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <MarketMindLogo size={32} />
            <span className="font-bold text-lg gradient-text">MarketMind</span>
          </div>

          {/* Nav Links - hidden on mobile */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Product', href: '/' },
              { label: 'Features', href: '/features' },
              { label: 'Pricing', href: '/pricing' }
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative group"
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF5E3A] to-[#C084FC] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a
              href="/login"
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
              className="hidden md:block text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
            >
              Log in
            </a>
            <motion.a
              href="/signup"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
              className="px-5 py-2 bg-gradient-to-r from-[#FF5E3A] to-[#C084FC] text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 block"
            >
              Sign Up
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* ============ 3. Hero Section ============ */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FF5E3A]/10 via-[#C084FC]/5 to-transparent pointer-events-none" />

        {/* Floating 3D orbs */}
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-[#FF5E3A]/20 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute top-40 right-[15%] w-96 h-96 bg-[#C084FC]/15 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-[30%] w-80 h-80 bg-[#38BDF8]/15 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '4s' }} />

        {/* Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-5xl mx-auto text-center"
        >
          {/* Badge Pill */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
          >
            <span className="flex items-center gap-1.5 text-xs font-semibold bg-gradient-to-r from-[#FF5E3A] to-[#C084FC] bg-clip-text text-transparent">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5E3A]" />
              AI-Powered
            </span>
            <span className="text-xs text-gray-500">Marketing OS</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-gray-900 mb-6"
          >
            Your AI Marketing{'\n'}
            <span className="gradient-text">Employee</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            An intelligent marketing operating system that plans campaigns, generates leads, optimizes SEO, and manages ads across all platforms — so you can focus on growing your business.
          </motion.p>

          {/* Chat Input Mockup */}
          <motion.div
            variants={scaleIn}
            transition={{ duration: 0.7 }}
            className="glass-strong rounded-2xl p-1 max-w-2xl mx-auto mb-8 shadow-xl"
          >
            <div className="flex items-center gap-3 p-4">
              <div className="flex-1 text-left">
                <textarea
                  readOnly
                  placeholder="Ask AI to create a campaign, analyze leads, or optimize your ads..."
                  rows={2}
                  className="w-full bg-transparent text-sm text-gray-600 placeholder:text-gray-400 resize-none focus:outline-none"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}
                className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r from-[#FF5E3A] to-[#C084FC] flex items-center justify-center text-white shadow-lg"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
            <div className="flex items-center gap-2 px-4 pb-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5E3A]/10 text-[#FF5E3A] text-xs font-medium">
                <Zap className="w-3 h-3" />
                Plan
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C084FC]/10 text-[#C084FC] text-xs font-medium">
                <Bot className="w-3 h-3" />
                Execute
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] text-xs font-medium">
                <BarChart3 className="w-3 h-3" />
                Analyze
              </div>
            </div>
          </motion.div>

          {/* Quick Action Pills */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              { label: 'Analytics Dashboard', icon: BarChart3, color: '#FF5E3A', tab: 'analytics' },
              { label: 'Lead Generation', icon: Users, color: '#C084FC', tab: 'leads' },
              { label: 'SEO Optimization', icon: Search, color: '#38BDF8', tab: 'seo' },
              { label: 'Ad Campaigns', icon: Target, color: '#FF5E3A', tab: 'campaigns' },
            ].map((item) => (
              <motion.button
                key={item.label}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}
                onClick={() => router.push(`/features?tab=${item.tab}`)}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-gray-700 hover:shadow-md transition-shadow duration-300"
              >
                <item.icon className="w-4 h-4" style={{ color: item.color }} />
                {item.label}
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ============ 4. Features Section ============ */}
      <section id="features" className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-sm font-semibold text-[#FF5E3A] uppercase tracking-wider mb-4"
            >
              Features
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4"
            >
              Everything you need to{'\n'}
              <span className="gradient-text">dominate marketing</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 max-w-xl mx-auto text-lg">
              Powerful AI tools that handle the complexity of modern marketing so you can focus on strategy and creativity.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {/* Card 1: AI-Powered Analysis */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
              className="glass-strong rounded-3xl p-8 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF5E3A]/20 to-[#FF5E3A]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-7 h-7 text-[#FF5E3A]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Analysis</h3>
              <p className="text-gray-500 leading-relaxed">
                Deep analytics powered by machine learning. Get actionable insights on campaign performance, audience behavior, and market trends in real time.
              </p>
            </motion.div>

            {/* Card 2: Multi-Platform Ads */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
              className="glass-strong rounded-3xl p-8 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C084FC]/20 to-[#C084FC]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-7 h-7 text-[#C084FC]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-Platform Ads</h3>
              <p className="text-gray-500 leading-relaxed">
                Create, manage, and optimize ad campaigns across Google, Meta, LinkedIn, and more — all from a single unified dashboard.
              </p>
            </motion.div>

            {/* Card 3: Smart Lead Management */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
              className="glass-strong rounded-3xl p-8 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#38BDF8]/20 to-[#38BDF8]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-7 h-7 text-[#38BDF8]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Lead Management</h3>
              <p className="text-gray-500 leading-relaxed">
                AI-driven lead scoring, nurturing workflows, and conversion optimization. Turn prospects into loyal customers automatically.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ 5. How It Works ============ */}
      <section className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} className="inline-block text-sm font-semibold text-[#C084FC] uppercase tracking-wider mb-4">
              How It Works
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Three steps to{'\n'}
              <span className="gradient-text">marketing excellence</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                step: '01',
                icon: Bot,
                title: 'Connect Your Data',
                desc: 'Link your existing marketing platforms, CRM, and analytics tools. Our AI ingests your data securely in minutes.',
                color: '#FF5E3A',
              },
              {
                step: '02',
                icon: Sparkles,
                title: 'AI Creates Strategy',
                desc: 'Our AI analyzes your market, competitors, and audience to generate a custom marketing strategy tailored to your goals.',
                color: '#C084FC',
              },
              {
                step: '03',
                icon: Zap,
                title: 'Execute & Optimize',
                desc: 'Deploy campaigns, track performance, and let AI continuously optimize every aspect of your marketing for maximum ROI.',
                color: '#38BDF8',
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center text-center md:text-left md:items-start"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <item.icon className="w-8 h-8" style={{ color: item.color }} />
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-bold tracking-widest text-gray-300 mb-1 block">STEP {item.step}</span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ 6. Stats Section ============ */}
      <section className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="glass-strong rounded-3xl p-8 md:p-12"
          >
            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-extrabold gradient-text mb-2">
                  {Math.floor(c1)}+
                </div>
                <p className="text-sm text-gray-500 font-medium">Campaigns Launched</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-extrabold gradient-text mb-2">
                  {c2}M+
                </div>
                <p className="text-sm text-gray-500 font-medium">Leads Generated</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-extrabold gradient-text mb-2">
                  {c3.toFixed(1)}x
                </div>
                <p className="text-sm text-gray-500 font-medium">Avg ROAS</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-extrabold gradient-text mb-2">
                  {Math.floor(c4)}%
                </div>
                <p className="text-sm text-gray-500 font-medium">Satisfaction</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ 7. Pricing Section ============ */}
      <section id="pricing" className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} className="inline-block text-sm font-semibold text-[#38BDF8] uppercase tracking-wider mb-4">
              Pricing
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Simple, transparent{'\n'}
              <span className="gradient-text">pricing</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 max-w-xl mx-auto text-lg">
              Start free, upgrade when you&apos;re ready. No hidden fees.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {/* Starter */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="glass-strong rounded-3xl p-8 flex flex-col"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-1">Starter</h3>
              <p className="text-sm text-gray-500 mb-6">Perfect for exploring AI marketing</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-gray-900">Free</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  '3 Active Campaigns',
                  'Basic AI Insights',
                  '1 Platform Integration',
                  'Community Support',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-[#38BDF8]/15 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-[#38BDF8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}
                onClick={handleGetStarted}
                className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:border-[#FF5E3A] hover:text-[#FF5E3A] transition-colors duration-300"
              >
                Get Started Free
              </motion.button>
            </motion.div>

            {/* Professional */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="relative glass-strong rounded-3xl p-8 flex flex-col gradient-border"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#FF5E3A] to-[#C084FC] text-white text-xs font-bold rounded-full">
                Most Popular
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Professional</h3>
              <p className="text-sm text-gray-500 mb-6">For growing businesses & teams</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-gray-900">₹4,999</span>
                <span className="text-gray-400 text-sm">/mo</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Unlimited Campaigns',
                  'Advanced AI Analytics',
                  '10 Platform Integrations',
                  'Priority Support',
                  'Custom Branding',
                  'API Access',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-[#FF5E3A]/15 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-[#FF5E3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}
                onClick={handleGetStarted}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF5E3A] to-[#C084FC] text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                Start Professional Plan
              </motion.button>
            </motion.div>

            {/* Enterprise */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="glass-strong rounded-3xl p-8 flex flex-col"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-1">Enterprise</h3>
              <p className="text-sm text-gray-500 mb-6">For large-scale operations</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-gray-900">Custom</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Everything in Professional',
                  'Dedicated AI Agent',
                  'Unlimited Integrations',
                  'Dedicated Account Manager',
                  'SLA & Uptime Guarantee',
                  'On-premise Deployment',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-[#C084FC]/15 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-[#C084FC]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}
                onClick={handleGetStarted}
                className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:border-[#C084FC] hover:text-[#C084FC] transition-colors duration-300"
              >
                Contact Sales
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ 8. Final CTA Section ============ */}
      <section className="relative py-24 px-4">
        <div
          ref={ctaRef}
          onMouseMove={handleCTAMouseMove}
          className="relative max-w-5xl mx-auto glass-strong rounded-3xl p-12 md:p-20 overflow-hidden text-center"
          style={{
            background:
              'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,94,58,0.08), rgba(192,132,252,0.05), transparent 40%), rgba(255,255,255,0.6)',
            backdropFilter: 'blur(40px)',
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6"
            >
              Ready to Transform{'\n'}
              <span className="gradient-text">Your Marketing?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-lg max-w-xl mx-auto mb-10">
              Join thousands of businesses already using MarketMind to automate their marketing and achieve extraordinary results.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}
                onClick={handleGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-[#FF5E3A] to-[#C084FC] text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-shadow duration-300 flex items-center gap-2 text-lg"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}
                className="px-8 py-4 rounded-full border-2 border-gray-200 text-gray-700 font-semibold hover:border-[#C084FC] hover:text-[#C084FC] transition-colors duration-300"
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ 9. Footer ============ */}
      <footer className="relative py-12 px-4 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo & Tagline */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-1">
                <MarketMindLogo size={32} />
                <span className="font-bold text-lg gradient-text">MarketMind</span>
              </div>
              <p className="text-sm text-gray-400">Your AI-powered marketing operating system.</p>
            </div>

            {/* Footer Links */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {[
                { label: 'Product', href: '/' },
                { label: 'Features', href: '/features' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'Privacy', href: '/privacy' },
                { label: 'Terms', href: '/terms' }
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  onMouseEnter={handleHoverStart}
                  onMouseLeave={handleHoverEnd}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} MarketMind. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}