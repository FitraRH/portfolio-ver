'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

// Lightweight markdown renderer — no external deps needed
function MarkdownRenderer({ content }) {
  const html = useMemo(() => {
    if (!content) return '';
    let text = content;

    // Code blocks: ```lang\n...\n``` (with or without newline after ```)
    text = text.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
      const escaped = code.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();
      const langLabel = lang ? `<span class="md-code-lang">${lang}</span>` : '';
      return `<div class="md-codeblock-wrapper">${langLabel}<pre class="md-codeblock"><code>${escaped}</code></pre></div>`;
    });

    // Inline code: `...`
    text = text.replace(/`([^`]+)`/g, '<code class="md-inline-code">$1</code>');

    // Bold: **...**
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Italic: *...*  (not inside bold)
    text = text.replace(/(?<![*])\*(?![*])(.+?)(?<![*])\*(?![*])/g, '<em>$1</em>');

    // Headers: ### ... -> styled div
    text = text.replace(/^### (.+)$/gm, '<div class="md-h3">$1</div>');
    text = text.replace(/^## (.+)$/gm, '<div class="md-h2">$1</div>');
    text = text.replace(/^# (.+)$/gm, '<div class="md-h1">$1</div>');

    // Unordered lists: - item or * item
    text = text.replace(/^[\-\*] (.+)$/gm, '<li class="md-li">$1</li>');
    text = text.replace(/(<li class="md-li">.*<\/li>\n?)+/g, (match) => `<ul class="md-ul">${match}</ul>`);

    // Numbered lists: 1. item
    text = text.replace(/^\d+\. (.+)$/gm, '<li class="md-oli">$1</li>');
    text = text.replace(/(<li class="md-oli">.*<\/li>\n?)+/g, (match) => `<ol class="md-ol">${match}</ol>`);

    // Line breaks
    text = text.replace(/\n/g, '<br/>');

    // Clean up extra <br/> inside block elements
    text = text.replace(/<br\/><(pre|ul|ol|div)/g, '<$1');
    text = text.replace(/<\/(pre|ul|ol|div)><br\/>/g, '</$1>');
    text = text.replace(/<br\/><li/g, '<li');
    text = text.replace(/<\/li><br\/>/g, '</li>');
    text = text.replace(/<br\/><\/code>/g, '</code>');

    return text;
  }, [content]);

  return <div className="md-content" dangerouslySetInnerHTML={{ __html: html }} />;
}

const AI_FEATURES = [
  {
    id: 'chat',
    label: 'AI Chat',
    icon: '💬',
    model: 'Llama 3.1 8B (Groq)',
    flag: '🇺🇸',
    color: '#4285f4',
    endpoint: '/api/chat',
    placeholder: 'Ask me anything about Fitra...',
    description: 'General AI assistant — ask about Fitra\'s background, skills, and projects.',
    suggestions: [
      'What are Fitra\'s main skills?',
      'Tell me about his work experience',
      'What projects has Fitra built?',
    ],
  },
  {
    id: 'resume',
    label: 'Resume Analyzer',
    icon: '📝',
    model: 'Mistral Small',
    flag: '🇫🇷',
    color: '#ff7000',
    endpoint: '/api/resume',
    placeholder: 'Ask about resume analysis...',
    description: 'Analyzes Fitra\'s qualifications, skills gap, and career trajectory.',
    suggestions: [
      'Analyze Fitra\'s resume strengths',
      'How does his profile compare to industry standards?',
      'What career path would you suggest?',
    ],
  },
  {
    id: 'code',
    label: 'Code Explainer',
    icon: '💻',
    model: 'Llama 3.3 70B (Groq)',
    flag: '🇺🇸',
    color: '#f55036',
    endpoint: '/api/code',
    placeholder: 'Paste code or ask about coding...',
    description: 'Explains code, algorithms, and AI/ML concepts with lightning speed.',
    suggestions: [
      'Explain how YOLOv8 object detection works',
      'How does RAG (Retrieval Augmented Generation) work?',
      'Write a PyTorch training loop example',
    ],
  },
  {
    id: 'reasoning',
    label: 'Deep Reasoning',
    icon: '🔍',
    model: 'DeepSeek V3',
    flag: '🇨🇳',
    color: '#536dfe',
    endpoint: '/api/reasoning',
    placeholder: 'Ask complex AI questions...',
    description: 'Deep analytical thinking for complex AI/ML problems and system design.',
    suggestions: [
      'Design a real-time defect detection system',
      'Compare CNN vs Transformer for image classification',
      'How to optimize ML inference latency?',
    ],
  },
];

let msgCounter = 0;
function genId() {
  return 'msg-' + (++msgCounter) + '-' + Date.now();
}

function ChatPanel({ feature }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = useCallback(async (userText) => {
    if (!userText.trim() || isLoading) return;

    const userMsg = { id: genId(), role: 'user', content: userText };
    const assistantId = genId();

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    const allMessages = [...messages, { role: 'user', content: userText }];

    try {
      const controller = new AbortController();
      abortRef.current = controller;

      const res = await fetch(feature.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: allMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`API error ${res.status}: ${errText}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      // Add empty assistant message
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: 'assistant', content: '' },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        accumulated += decoder.decode(value, { stream: true });

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId ? { ...msg, content: accumulated } : msg
          )
        );
      }
    } catch (error) {
      if (error.name === 'AbortError') return;
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: 'assistant',
          content: `⚠️ Error: ${error.message || 'Failed to get response. Please try again.'}`,
        },
      ]);
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  }, [messages, isLoading, feature.endpoint]);

  const handleSuggestion = (suggestion) => {
    sendMessage(suggestion);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput('');
  };

  const handleStop = () => {
    if (abortRef.current) {
      abortRef.current.abort();
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-[500px]">
      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center gap-4">
            <div className="text-5xl">{feature.icon}</div>
            <div>
              <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                {feature.label}
              </h4>
              <p className="text-sm text-[var(--color-text-tertiary)] mb-4">
                {feature.description}
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-[var(--color-text-tertiary)] mb-6">
                <span>Powered by</span>
                <span className="font-semibold text-[var(--color-text-secondary)]">{feature.flag} {feature.model}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full max-w-[360px]">
              {feature.suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestion(s)}
                  className="text-left text-sm px-4 py-3 rounded-xl bg-[rgba(37,99,235,0.06)] border border-[rgba(37,99,235,0.1)] text-[var(--color-text-secondary)] hover:bg-[rgba(37,99,235,0.12)] hover:border-[rgba(37,99,235,0.2)] hover:text-[var(--color-text-primary)] transition-all duration-200 cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-[#2563eb] to-[#7c3aed] text-white rounded-br-md'
                    : 'bg-[rgba(15,31,58,0.8)] border border-[var(--color-glass-border)] text-[var(--color-text-primary)] rounded-bl-md'
                }`}
              >
                <MarkdownRenderer content={msg.content} />
                {msg.role === 'assistant' && msg.content && (
                  <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-[rgba(37,99,235,0.1)]">
                    <span className="text-[0.65rem] text-[var(--color-text-tertiary)]">
                      {feature.flag} {feature.model}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex justify-start">
            <div className="bg-[rgba(15,31,58,0.8)] border border-[var(--color-glass-border)] rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-[var(--color-accent-primary)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-[var(--color-accent-primary)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-[var(--color-accent-primary)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-[rgba(37,99,235,0.1)] p-4">
        <form id={`form-${feature.id}`} onSubmit={onSubmit} className="flex gap-2">
          <input
            name={`input-${feature.id}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={feature.placeholder}
            disabled={isLoading}
            className="flex-1 bg-[rgba(15,31,58,0.5)] border border-[rgba(37,99,235,0.15)] rounded-xl px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-accent-primary)] focus:ring-1 focus:ring-[rgba(37,99,235,0.3)] transition-all"
          />
          <button
            type="submit"
            disabled={isLoading || !input?.trim()}
            className="px-4 py-3 bg-gradient-to-r from-[#2563eb] to-[#7c3aed] text-white rounded-xl font-semibold text-sm hover:shadow-[0_4px_20px_rgba(37,99,235,0.4)] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
        {messages.length > 0 && (
          <div className="mt-2 flex items-center justify-between">
            <button
              onClick={handleClear}
              className="text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors cursor-pointer"
            >
              Clear conversation
            </button>
            {isLoading && (
              <button
                onClick={handleStop}
                className="text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer"
              >
                Stop generating
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AILab() {
  const [activeTab, setActiveTab] = useState('chat');
  const activeFeature = AI_FEATURES.find((f) => f.id === activeTab);

  return (
    <section id="ailab" className="relative py-24 md:py-32 z-[1]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="mb-12">
            <span className="section-label inline-block text-xs font-semibold text-[var(--color-accent-primary)] uppercase tracking-[0.15em] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              🧠 AI Lab
            </span>
            <h2 className="text-[clamp(2rem,5vw,3rem)] font-extrabold tracking-tight leading-tight text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
              Multi-Model AI Playground
            </h2>
            <p className="text-base text-[var(--color-text-secondary)] mt-3 max-w-[600px]">
              Explore 4 different AI models from 3 countries, each specialized for a unique task.
              Built with Vercel AI SDK.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="glass-card overflow-hidden">
            {/* Tab Bar */}
            <div className="flex border-b border-[rgba(37,99,235,0.1)] overflow-x-auto">
              {AI_FEATURES.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(feature.id)}
                  className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-all duration-300 cursor-pointer relative ${
                    activeTab === feature.id
                      ? 'text-[var(--color-text-primary)] bg-[rgba(37,99,235,0.08)]'
                      : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:bg-[rgba(37,99,235,0.04)]'
                  }`}
                >
                  <span className="text-lg">{feature.icon}</span>
                  <span className="hidden sm:inline">{feature.label}</span>
                  <span className="text-xs hidden md:inline">{feature.flag}</span>
                  {activeTab === feature.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#2563eb] to-[#7c3aed]"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Model Info Bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-[rgba(37,99,235,0.04)] border-b border-[rgba(37,99,235,0.08)]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#34d399] rounded-full" style={{ animation: 'pulse-dot 2s ease-in-out infinite' }} />
                <span className="text-xs text-[var(--color-text-tertiary)]">
                  {activeFeature.flag} <span className="font-semibold text-[var(--color-text-secondary)]">{activeFeature.model}</span>
                </span>
              </div>
              <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-[rgba(37,99,235,0.1)] text-[var(--color-accent-secondary)] font-medium">
                Online
              </span>
            </div>

            {/* Chat Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ChatPanel feature={activeFeature} />
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
