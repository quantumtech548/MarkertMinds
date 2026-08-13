'use client';

import { useAppStore } from '@/store/use-app-store';
import type { ChatMessage } from '@/types';
import { Send, Bot, User, Sparkles, Loader2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  Tooltip,
} from 'recharts';

const quickActions = [
  '🚀 Get More Leads',
  '📈 Increase Sales',
  '🔍 Improve SEO',
  '📊 Analyze Campaigns',
];

const dummyResponses: Record<string, string> = {
  '🚀 Get More Leads':
    "I'll analyze your current lead generation channels and create an optimized strategy to increase your lead volume. Let me pull the latest data from your campaigns and identify the highest-performing audience segments.",
  '📈 Increase Sales':
    "Let me look at your conversion funnel to identify where prospects are dropping off. I'll cross-reference your campaign data with lead quality scores to find the best opportunities for boosting sales.",
  '🔍 Improve SEO':
    "I'll audit your current SEO performance, analyze your top-performing keywords, and identify quick-win content opportunities to improve your organic rankings.",
  '📊 Analyze Campaigns':
    "I'm pulling performance data from all your active campaigns across Google Ads and Meta. I'll provide a comprehensive analysis with actionable optimization recommendations.",
};

function getGenericDummyResponse(userMessage: string): string {
  return `Great question! Let me analyze that for you. Based on your current marketing data and business profile, here's what I found:

Your request about "${userMessage.slice(0, 60)}${userMessage.length > 60 ? '...' : ''}" is being processed. I've cross-referenced your campaign performance, lead data, and SEO metrics to provide you with the most relevant insights.

**Key Findings:**
• Your current campaigns are performing 23% above industry benchmarks
• There are 3 optimization opportunities I've identified
• I recommend A/B testing your top-performing ad creatives

Would you like me to dive deeper into any of these areas?`;
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-end gap-3 px-4 pb-4"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF5E3A] to-[#C084FC]">
        <Bot className="h-4 w-4 text-white" />
      </div>
      <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl rounded-tl-sm p-4 shadow-sm">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-[#C084FC]" />
          <span className="text-xs text-gray-500 font-medium">Thinking</span>
          <div className="flex gap-1 ml-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-[#FF5E3A]"
                animate={{
                  y: [0, -6, 0],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ToolCallSection({
  toolCalls,
  messageId,
  showDetails,
  onToggle,
}: {
  toolCalls: ChatMessage['toolCalls'];
  messageId: string;
  showDetails: boolean;
  onToggle: () => void;
}) {
  if (!toolCalls || toolCalls.length === 0) return null;

  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors group"
      >
        <Loader2 className="h-3 w-3 text-emerald-500" />
        <span>Used {toolCalls.length} tool{toolCalls.length > 1 ? 's' : ''}</span>
        <motion.div
          animate={{ rotate: showDetails ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-3 w-3" />
        </motion.div>
      </button>
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-2 space-y-2">
              {toolCalls.map((tool, idx) => (
                <div
                  key={`${messageId}-tool-${idx}`}
                  className="flex items-start gap-2 rounded-lg bg-black/[0.02] p-2.5 border border-black/[0.04]"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <code className="text-xs font-mono font-medium text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded">
                        {tool.name}
                      </code>
                      <span className="inline-flex items-center text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                        completed
                      </span>
                    </div>
                    {tool.result && (
                      <p className="text-[11px] text-gray-500 leading-relaxed truncate">
                        {tool.result}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChartEmbed({ chart }: { chart: NonNullable<ChatMessage['chart']> }) {
  if (!chart || !chart.data || chart.data.length === 0) return null;

  const colors = chart.colors || ['#FF5E3A', '#C084FC', '#34D399', '#FBBF24', '#60A5FA', '#F472B6'];

  const renderChart = () => {
    switch (chart.type) {
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={chart.data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey={(entry: Record<string, unknown>) =>
                  typeof entry.value === 'number' ? entry.value : 0
                }
                nameKey={chart.xKey}
                stroke="none"
              >
                {chart.data.map((_, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.6)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chart.data} barSize={24}>
              <XAxis
                dataKey={chart.xKey}
                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.6)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  fontSize: '12px',
                }}
              />
              {chart.yKeys.map((key, idx) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={colors[idx % colors.length]}
                  radius={[6, 6, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'area':
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chart.data}>
              <XAxis
                dataKey={chart.xKey}
                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.6)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  fontSize: '12px',
                }}
              />
              <defs>
                {chart.yKeys.map((key, idx) => (
                  <linearGradient
                    key={`gradient-${key}`}
                    id={`gradient-${key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={colors[idx % colors.length]}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="100%"
                      stopColor={colors[idx % colors.length]}
                      stopOpacity={0}
                    />
                  </linearGradient>
                ))}
              </defs>
              {chart.yKeys.map((key, idx) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[idx % colors.length]}
                  strokeWidth={2}
                  fill={`url(#gradient-${key})`}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="mt-3 border-white/60 bg-white/50 backdrop-blur-xl shadow-sm overflow-hidden">
      <CardContent className="p-3">
        {chart.title && (
          <p className="text-xs font-medium text-gray-600 mb-2">{chart.title}</p>
        )}
        {renderChart()}
      </CardContent>
    </Card>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  const addMessage = useAppStore((s) => s.addMessage);
  const setTyping = useAppStore((s) => s.setTyping);
  const [showToolDetails, setShowToolDetails] = useState(false);

  const handleAction = (action: ChatMessage['actions'] extends (infer T)[] | undefined ? T : never) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: action.label,
      timestamp: new Date(),
    };
    addMessage(userMsg);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const responseContent =
        dummyResponses[action.label] || getGenericDummyResponse(action.label);
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };
      addMessage(assistantMsg);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex items-end gap-3 px-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser
            ? 'bg-gray-200'
            : 'bg-gradient-to-br from-[#FF5E3A] to-[#C084FC]'
        }`}
      >
        {isUser ? (
          <User className="h-4 w-4 text-gray-600" />
        ) : (
          <Bot className="h-4 w-4 text-white" />
        )}
      </div>

      {/* Message Bubble */}
      <div
        className={`max-w-[75%] p-4 whitespace-pre-wrap text-sm leading-relaxed ${
          isUser
            ? 'bg-[#FF5E3A] text-white rounded-2xl rounded-tr-sm'
            : 'bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl rounded-tl-sm shadow-sm text-gray-800'
        }`}
      >
        {/* Tool Calls Section */}
        {!isUser && message.toolCalls && message.toolCalls.length > 0 && (
          <ToolCallSection
            toolCalls={message.toolCalls}
            messageId={message.id}
            showDetails={showToolDetails}
            onToggle={() => setShowToolDetails(!showToolDetails)}
          />
        )}

        {/* Message Content */}
        <div className={isUser ? '' : 'text-[13.5px]'}>{message.content}</div>

        {/* Chart Embedding */}
        {!isUser && message.chart && <ChartEmbed chart={message.chart} />}

        {/* Action Buttons */}
        {!isUser && message.actions && message.actions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {message.actions.map((action, idx) => (
              <Button
                key={`${message.id}-action-${idx}`}
                onClick={() => handleAction(action)}
                className={
                  action.variant === 'primary'
                    ? 'bg-[#FF5E3A] hover:bg-[#FF5E3A]/90 text-white border-0 shadow-sm rounded-full px-4 h-9 text-xs font-medium'
                    : 'bg-white/60 border border-white/60 hover:bg-white/80 text-gray-700 shadow-sm rounded-full px-4 h-9 text-xs font-medium'
                }
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function ChatInterface() {
  const messages = useAppStore((s) => s.messages);
  const isTyping = useAppStore((s) => s.isTyping);
  const addMessage = useAppStore((s) => s.addMessage);
  const setTyping = useAppStore((s) => s.setTyping);

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(Math.max(scrollHeight, 44), 120)}px`;
    }
  }, [inputValue]);

  const handleSend = (text?: string) => {
    const content = (text || inputValue).trim();
    if (!content) return;

    setInputValue('');

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };
    addMessage(userMessage);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const responseContent =
        dummyResponses[content] || getGenericDummyResponse(content);
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };
      addMessage(assistantMessage);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide py-4 space-y-1">
        <AnimatePresence mode="popLayout">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="shrink-0 px-4 pb-4 pt-2">
        {/* Quick Action Pills */}
        <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide pb-1">
          {quickActions.map((action) => (
            <button
              key={action}
              onClick={() => handleSend(action)}
              className="bg-white/40 border border-white/60 rounded-full px-4 py-2 text-sm hover:bg-white/60 transition-colors whitespace-nowrap text-gray-700 hover:text-gray-900 shrink-0"
            >
              {action}
            </button>
          ))}
        </div>

        {/* Input Card */}
        <Card className="bg-white/60 backdrop-blur-xl border-white/60 rounded-2xl shadow-sm overflow-hidden">
          <CardContent className="p-2">
            <div className="flex items-end gap-2">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask your AI Marketing Employee..."
                rows={1}
                className="flex-1 min-h-[44px] max-h-[120px] bg-transparent border-none resize-none outline-none text-sm text-gray-800 placeholder:text-gray-400 leading-relaxed py-3 px-3"
              />
              <Button
                onClick={() => handleSend()}
                disabled={!inputValue.trim()}
                className="w-10 h-10 rounded-full bg-[#FF5E3A] hover:bg-[#FF5E3A]/90 text-white border-0 shrink-0 p-0 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
