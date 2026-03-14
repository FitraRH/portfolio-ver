'use client';

import Image from 'next/image';
import ScrollReveal from './ScrollReveal';

const highlights = [
  { icon: '🎓', value: '3.78', label: 'GPA / 4.00' },
  { icon: '🏆', value: 'Rank 3', label: 'Jababeka Scholar' },
  { icon: '🌏', value: 'IELTS 7.5', label: 'English Proficiency' },
  { icon: '⚡', value: '3 Years', label: 'Graduated with Honors' },
];

const floatingTags = ['Python', 'PyTorch', 'Computer Vision', 'GenAI'];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 z-[1]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="mb-12">
            <span className="section-label inline-block text-xs font-semibold text-[var(--color-accent-primary)] uppercase tracking-[0.15em] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              01 — About
            </span>
            <h2 className="text-[clamp(2rem,5vw,3rem)] font-extrabold tracking-tight leading-tight text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
              Crafting Intelligent Systems
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-center">
          <ScrollReveal>
            <div>
              <p className="text-lg text-[var(--color-text-primary)] mb-6 leading-relaxed">
                AI Engineer with hands-on experience building production-grade computer vision
                and generative AI systems for manufacturing, surveillance, and enterprise applications.
              </p>
              <p className="text-base text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                Specialized in end-to-end ML pipelines, real-time inference, and deployment
                using Python, PyTorch, Flask, and Docker. Experienced in consulting environments
                and cross-functional collaboration with international teams.
              </p>
              <p className="text-base text-[var(--color-text-secondary)] mb-8 leading-relaxed">
                Graduated with Honors from President University with a Bachelor of Information Technology
                (Computer Science — Artificial Intelligence), completing the degree in just 3 years
                with a GPA of 3.78/4.00.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {highlights.map((h, i) => (
                  <div key={i} className="glass-card flex items-center gap-4 p-4">
                    <div className="text-3xl leading-none">{h.icon}</div>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                        {h.value}
                      </span>
                      <span className="text-xs text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]">
                        {h.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <a href="/Fitra Ramdhan Hafidz - Resume.pdf" download target="_blank" rel="noopener noreferrer" className="btn btn-primary inline-flex">
                <span>View Full Resume</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative flex justify-center order-first lg:order-last">
              <div className="relative w-[260px] h-[320px] lg:w-[320px] lg:h-[380px]">
                <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[var(--color-glass-border)] bg-[var(--color-bg-tertiary)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(37,99,235,0.2)] to-[rgba(212,168,67,0.1)] z-[1]" />
                  <Image
                    src="/profile.jpg"
                    alt="Fitra Ramdhan Hafidz"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {floatingTags.map((tag, i) => {
                  const positions = [
                    'top-[10%] -right-[20%]',
                    'top-[35%] -left-[15%]',
                    'bottom-[20%] -right-[25%]',
                    'bottom-[5%] -left-[10%]',
                  ];
                  return (
                    <div
                      key={tag}
                      className={`absolute ${positions[i]} glass-card px-3 py-2 text-xs font-semibold text-[var(--color-accent-secondary)] whitespace-nowrap z-10 hidden md:block`}
                      style={{ animation: `float-tag 6s ease-in-out infinite`, animationDelay: `${i * 1.5}s` }}
                    >
                      {tag}
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
