'use client';

import { useRef } from 'react';
import ScrollReveal from './ScrollReveal';

const projects = [
  {
    icon: '🛸',
    gradient: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #7c3aed 100%)',
    company: 'PT Solusi Intek Indonesia',
    year: '2024',
    title: 'VisDrone Traffic Analysis System',
    description: 'Real-time multi-camera computer vision system for traffic and crowd analysis using YOLOv8 and HRNet, achieving stable 20–30 FPS performance.',
    tech: ['Python', 'PyTorch', 'YOLOv8', 'HRNet', 'Flask', 'OpenCV'],
    link: 'https://gitlab.com/FitraRH/drone-ai',
    linkLabel: 'Source Code',
    isGit: true,
  },
  {
    icon: '🔍',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #e94560 100%)',
    company: 'Solos AI Consulting',
    year: '2025',
    title: 'Deftection — Manufacturing Defect Detection',
    description: 'Automated manufacturing defect detection pipeline using HRNet & Anomalib PatchCore, delivering low-latency inference (50–100 ms) with GPT-4 analysis integration.',
    tech: ['Python', 'Flask', 'PyTorch', 'Anomalib', 'HRNet', 'GPT-4'],
    link: 'https://github.com/Satria0ibnu/deftection',
    linkLabel: 'Source Code',
    isGit: true,
  },
  {
    icon: '🤖',
    gradient: 'linear-gradient(135deg, #0f3443 0%, #34e89e 100%)',
    company: 'PT Solusi Intek Indonesia',
    year: '2024',
    title: 'AI-Powered Inventory & E-Commerce Assistant',
    description: 'RAG-powered chatbot using LangChain and ChromaDB for Indonesian NLP with automated inventory management and e-commerce features.',
    tech: ['Python', 'Flask', 'LangChain', 'Ollama', 'ChromaDB', 'SQLite'],
    link: 'https://github.com/FitraRH/ollama-chatbot',
    linkLabel: 'Source Code',
    isGit: true,
  },
  {
    icon: '🧠',
    gradient: 'linear-gradient(135deg, #2d1b69 0%, #6c5ce7 50%, #a29bfe 100%)',
    company: 'Elice NIPA Korea ASEAN Academy',
    year: '2025',
    title: 'MindVerse — AI Meeting Platform',
    description: 'Bilingual GPT-4 chatbot with MongoDB integration and Node.js-Python service bridge. Automated AI-driven workflows for meeting analysis and communication.',
    tech: ['Python', 'GPT-4 API', 'MongoDB', 'Node.js', 'Express.js', 'Nodemailer'],
    link: 'https://linktr.ee/mindversecapstone',
    linkLabel: 'View Links',
    isGit: false,
  },
];

function TiltCard({ children, className = '' }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    cardRef.current.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, rgba(37, 99, 235, 0.15) 0%, transparent 60%)`;
  };

  const handleMouseLeave = () => {
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    cardRef.current.style.backgroundImage = 'none';
    cardRef.current.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  };

  const handleMouseEnter = () => {
    cardRef.current.style.transition = 'none';
  };

  return (
    <div ref={cardRef} className={className} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
      {children}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32 z-[1]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="mb-12">
            <span className="section-label inline-block text-xs font-semibold text-[var(--color-accent-primary)] uppercase tracking-[0.15em] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              03 — Projects
            </span>
            <h2 className="text-[clamp(2rem,5vw,3rem)] font-extrabold tracking-tight leading-tight text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
              Featured Work
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <TiltCard className="glass-card overflow-hidden transition-all duration-[0.4s] hover:-translate-y-2.5 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_40px_rgba(37,99,235,0.2)]">
                <div className="relative overflow-hidden aspect-video">
                  <div
                    className="w-full h-full flex items-center justify-center relative transition-all duration-[0.6s] group-hover:scale-105"
                    style={{ background: project.gradient }}
                  >
                    <div className="text-6xl relative z-[1] drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-110 hover:rotate-[5deg]">
                      {project.icon}
                    </div>
                    <div className="absolute inset-0 bg-[rgba(6,13,27,0.7)] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white font-semibold text-sm tracking-[0.1em] uppercase px-4 py-2 border-2 border-[rgba(255,255,255,0.5)] rounded-full" style={{ fontFamily: 'var(--font-heading)' }}>
                        View Project
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-semibold text-[var(--color-accent-primary)] uppercase tracking-[0.05em]">{project.company}</span>
                    <span className="text-xs font-semibold text-[var(--color-text-tertiary)]">{project.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                    {project.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span key={t} className="text-[0.7rem] font-semibold px-2.5 py-1 bg-[rgba(37,99,235,0.08)] text-[var(--color-text-tertiary)] rounded-full border border-[rgba(37,99,235,0.1)]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-secondary)] px-4 py-2 rounded-full border border-[rgba(37,99,235,0.2)] hover:bg-[rgba(37,99,235,0.1)] hover:border-[var(--color-accent-primary)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {project.isGit ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    )}
                    <span>{project.linkLabel}</span>
                  </a>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
