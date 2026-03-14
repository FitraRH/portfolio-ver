'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import ParticleCanvas from './ParticleCanvas';
import ScrollReveal from './ScrollReveal';

function CounterStat({ target, label, isDecimal = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    isDecimal ? v.toFixed(1) : Math.floor(v)
  );
  const displayRef = useRef(null);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      count.set(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }, [isInView, target, count]);

  useEffect(() => {
    return rounded.on('change', (v) => {
      if (displayRef.current) displayRef.current.textContent = v;
    });
  }, [rounded]);

  return (
    <div className="text-center" ref={ref}>
      <span
        ref={displayRef}
        className="block text-4xl font-extrabold text-[var(--color-accent-gold)] leading-none"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        0
      </span>
      <span className="block text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-[0.1em] mt-1">
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-8 py-32">
      <ParticleCanvas />
      <div className="relative z-[1] text-center max-w-[900px]">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-[rgba(37,99,235,0.1)] border border-[rgba(37,99,235,0.2)] rounded-full text-xs font-medium text-[var(--color-accent-secondary)] uppercase tracking-[0.05em] mb-10">
            <span className="w-2 h-2 bg-[#34d399] rounded-full" style={{ animation: 'pulse-dot 2s ease-in-out infinite' }} />
            Available for Opportunities
          </div>
        </ScrollReveal>

        <h1 className="mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
          <span className="block text-[clamp(1.2rem,3vw,1.8rem)] font-normal text-[var(--color-text-secondary)] mb-2 min-h-[2rem]">
            <TypeAnimation
              sequence={[500, "Hello, I'm"]}
              wrapper="span"
              speed={60}
              cursor={false}
            />
          </span>
          <span className="block text-[clamp(2.5rem,7vw,5rem)] font-extrabold tracking-tight leading-[1.1] text-gradient-name min-h-[3.5rem]">
            <TypeAnimation
              sequence={[1500, 'Fitra Ramdhan Hafidz']}
              wrapper="span"
              speed={40}
              cursor={false}
            />
          </span>
        </h1>

        <p
          className="text-[clamp(1.1rem,2.5vw,1.5rem)] font-medium text-[var(--color-accent-secondary)] mb-6 tracking-[0.05em] min-h-[2rem]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          <TypeAnimation
            sequence={[3500, 'AI Engineer — Computer Vision & Generative AI']}
            wrapper="span"
            speed={70}
            cursor={true}
          />
        </p>

        <ScrollReveal>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-[700px] mx-auto mb-10">
            Building production-grade <span className="text-gradient">Computer Vision</span> and{' '}
            <span className="text-gradient">Generative AI</span> systems for manufacturing,
            surveillance, and enterprise applications.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex gap-4 justify-center flex-wrap mb-12">
            <a href="#projects" className="btn btn-primary">
              <span>View Projects</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a href="/Fitra Ramdhan Hafidz - Resume.pdf" download target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <span>Download CV</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
            <a href="#contact" className="btn btn-secondary">
              <span>Get In Touch</span>
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex items-center justify-center gap-10 flex-col sm:flex-row">
            <CounterStat target={18} label="Projects" />
            <div className="w-px h-10 bg-[rgba(37,99,235,0.2)] hidden sm:block" />
            <div className="w-10 h-px bg-[rgba(37,99,235,0.2)] sm:hidden" />
            <CounterStat target={3} label="Companies" />
            <div className="w-px h-10 bg-[rgba(37,99,235,0.2)] hidden sm:block" />
            <div className="w-10 h-px bg-[rgba(37,99,235,0.2)] sm:hidden" />
            <CounterStat target={7.5} label="IELTS Score" isDecimal />
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-text-tertiary)] text-xs tracking-[0.1em] uppercase hidden md:flex" style={{ animation: 'float-indicator 3s ease-in-out infinite' }}>
        <div className="w-6 h-[38px] border-2 border-[rgba(37,99,235,0.3)] rounded-xl flex justify-center pt-2">
          <div className="w-[3px] h-2 bg-[var(--color-accent-primary)] rounded-full" style={{ animation: 'scroll-wheel 2s ease-in-out infinite' }} />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
