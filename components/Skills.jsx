'use client';

import { useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';

const skillCategories = [
  {
    icon: '⌨️',
    title: 'Programming & Data',
    skills: [
      { name: 'Python', level: 95 }, { name: 'JavaScript', level: 70 }, { name: 'SQL', level: 75 },
      { name: 'NumPy', level: 90 }, { name: 'Pandas', level: 90 }, { name: 'PyTorch', level: 90 },
      { name: 'TensorFlow', level: 75 }, { name: 'scikit-learn', level: 80 },
    ],
  },
  {
    icon: '🧠',
    title: 'AI/ML Specializations',
    skills: [
      { name: 'YOLOv8', level: 90 }, { name: 'HRNet', level: 85 }, { name: 'ResNet', level: 80 },
      { name: 'LangChain', level: 85 }, { name: 'RAG', level: 80 }, { name: 'OpenAI GPT-4', level: 85 },
      { name: 'ChromaDB', level: 80 }, { name: 'Computer Vision', level: 85 },
    ],
  },
  {
    icon: '🚀',
    title: 'Development & Deployment',
    skills: [
      { name: 'Flask', level: 90 }, { name: 'FastAPI', level: 80 }, { name: 'RESTful API', level: 85 },
      { name: 'Docker', level: 85 }, { name: 'Git', level: 85 }, { name: 'AWS', level: 75 },
      { name: 'Streamlit', level: 80 }, { name: 'HuggingFace', level: 80 },
    ],
  },
  {
    icon: '🗄️',
    title: 'Databases',
    skills: [
      { name: 'PostgreSQL', level: 80 }, { name: 'MongoDB', level: 80 }, { name: 'SQLite', level: 85 },
    ],
  },
];

const certifications = [
  { name: 'PT Solusi Intek Indonesia — Internship Completion' },
  { name: 'GDSC x FutureLabs — Machine Learning APU Malaysia' },
  { name: 'Cohort of Korea-ASEAN Digital Academy Certificate' },
  { name: 'IELTS Certificate — Band 7.5' },
  { name: 'Solos AI Consulting Qatar — Approval' },
  { name: 'HuggingFace — Fundamentals of LLMs' },
  { name: 'HuggingFace — Fine-Tune LLM Certification' },
];

function SkillCategory({ category, isWide = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const tags = ref.current?.querySelectorAll('.skill-tag[data-level]');
          tags?.forEach((tag, index) => {
            setTimeout(() => {
              tag.style.setProperty('--skill-level', `${tag.dataset.level}%`);
              tag.classList.add('revealed');
            }, index * 80);
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`glass-card p-6 ${isWide ? 'lg:col-span-2' : ''}`}>
      <div className="flex items-center gap-4 mb-6">
        <div className="text-2xl">{category.icon}</div>
        <h3 className="text-lg font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
          {category.title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill.name}
            className="skill-tag text-sm font-semibold px-4 py-2 bg-[rgba(37,99,235,0.08)] text-[var(--color-text-secondary)] rounded-full border border-[rgba(37,99,235,0.12)] cursor-default transition-all duration-300 hover:bg-[rgba(37,99,235,0.15)] hover:text-[var(--color-accent-secondary)] hover:border-[rgba(37,99,235,0.3)] hover:-translate-y-0.5"
            data-level={skill.level}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 z-[1]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="mb-12">
            <span className="section-label inline-block text-xs font-semibold text-[var(--color-accent-primary)] uppercase tracking-[0.15em] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              04 — Skills
            </span>
            <h2 className="text-[clamp(2rem,5vw,3rem)] font-extrabold tracking-tight leading-tight text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
              Technical Arsenal
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillCategories.map((cat, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <SkillCategory category={cat} />
            </ScrollReveal>
          ))}

          {/* Certifications */}
          <ScrollReveal delay={0.2}>
            <div className="glass-card p-6 lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-2xl">📜</div>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                  Certifications & Achievements
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {certifications.map((cert, i) => (
                  <a
                    key={i}
                    href="https://drive.google.com/drive/folders/1awEToZOk9O2fKtM54T73kKkEQUURUau0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-md bg-[rgba(37,99,235,0.05)] border border-[rgba(37,99,235,0.08)] hover:bg-[rgba(37,99,235,0.1)] hover:border-[rgba(37,99,235,0.2)] hover:translate-x-2 transition-all duration-300"
                  >
                    <div className="w-2 h-2 bg-[var(--color-accent-gold)] rounded-full flex-shrink-0" />
                    <span className="text-sm text-[var(--color-text-secondary)] flex-1">{cert.name}</span>
                    <svg className="flex-shrink-0 text-[var(--color-text-tertiary)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                ))}
              </div>
              <div className="mt-6">
                <a
                  href="https://drive.google.com/drive/folders/1awEToZOk9O2fKtM54T73kKkEQUURUau0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary inline-flex"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span>View All Certificates</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
