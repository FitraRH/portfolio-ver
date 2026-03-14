'use client';

import ScrollReveal from './ScrollReveal';

const experiences = [
  {
    company: 'Solos AI Consulting',
    location: '📍 Doha, Qatar',
    date: 'Jan 2025 — Aug 2025',
    role: 'AI Engineer',
    type: 'AI Solutions & Consulting Company',
    details: [
      'Led the development of an automated manufacturing defect detection pipeline using HRNet & Anomalib PatchCore, delivering low-latency inference (50–100 ms) for production use.',
      'Integrated computer vision outputs with backend systems and GPT-4-based analysis to support quality control and packaging validation workflows.',
    ],
    tech: ['Python', 'Flask', 'PyTorch', 'Anomalib', 'HRNet', 'GPT-4'],
    side: 'left',
    isEdu: false,
  },
  {
    company: 'Elice NIPA Korea ASEAN Academy',
    location: '📍 Cikarang, Indonesia',
    date: 'Jun 2025 — Aug 2025',
    role: 'Apprenticeship',
    type: 'AI-Powered EdTech Platform',
    details: [
      'Developed bilingual GPT-4 chatbot with MongoDB integration (4 collections) and Node.js-Python service bridge for MindVerse platform.',
      'Built automated AI-driven workflows for meeting analysis and communication, generating agendas and email invitations to streamline collaboration processes.',
    ],
    tech: ['Python', 'GPT-4 API', 'MongoDB', 'Node.js', 'Express.js'],
    side: 'right',
    isEdu: false,
  },
  {
    company: 'PT Solusi Intek Indonesia',
    location: '📍 Bekasi, Indonesia',
    date: 'Sep 2024 — May 2025',
    role: 'Data Science Intern',
    type: 'IT Solutions & Cybersecurity Company',
    details: [
      'Engineered a real-time multi-camera computer vision system for traffic and crowd analysis using YOLOv8 and HRNet, achieving stable 20–30 FPS under latency constraints.',
      'Built end-to-end ML and backend workflows, including model fine-tuning, RESTful APIs, and monitoring dashboards to operationalize surveillance analytics.',
    ],
    tech: ['Python', 'PyTorch', 'Flask', 'OpenCV', 'YOLOv8', 'HRNet'],
    side: 'left',
    isEdu: false,
  },
  {
    company: 'President University',
    location: '📍 Cikarang, Indonesia',
    date: 'Sep 2022 — Oct 2025',
    role: 'B.IT — Computer Science (AI)',
    type: 'Bachelor of Information Technology',
    details: [
      'Graduated with Honors — Completed Computer Science AI degree in 3 years with a GPA of 3.78/4.00. Received Rank 3 (70%) Jababeka Scholarship.',
    ],
    tech: ['GPA 3.78/4.00', 'Honors', 'Jababeka Scholar'],
    side: 'right',
    isEdu: true,
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32 z-[1]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="mb-12">
            <span className="section-label inline-block text-xs font-semibold text-[var(--color-accent-primary)] uppercase tracking-[0.15em] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              02 — Experience
            </span>
            <h2 className="text-[clamp(2rem,5vw,3rem)] font-extrabold tracking-tight leading-tight text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
              Professional Journey
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative max-w-[900px] mx-auto py-8">
          <div className="timeline-line" />

          {experiences.map((exp, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div
                className={`relative flex mb-12 ${
                  exp.side === 'right'
                    ? 'justify-start pl-16 lg:pl-[calc(50%+2rem)] lg:pr-0'
                    : 'justify-end pr-0 pl-16 lg:pr-[calc(50%+2rem)] lg:pl-0 lg:justify-end'
                }`}
              >
                {/* Dot */}
                <div
                  className={`absolute left-[30px] lg:left-1/2 top-8 -translate-x-1/2 w-4 h-4 border-3 border-[var(--color-bg-primary)] rounded-full z-10 ${
                    exp.isEdu
                      ? 'bg-[var(--color-accent-gold)] shadow-[0_0_20px_rgba(212,168,67,0.4)]'
                      : 'bg-[var(--color-accent-primary)] shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                  }`}
                >
                  {!exp.isEdu && (
                    <span className="absolute -inset-1 border-2 border-[var(--color-accent-primary)] rounded-full" style={{ animation: 'dot-pulse-ring 2s ease-out infinite' }} />
                  )}
                </div>

                {/* Card */}
                <div className={`glass-card p-6 w-full ${exp.isEdu ? 'border-[rgba(212,168,67,0.2)] hover:border-[rgba(212,168,67,0.4)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(212,168,67,0.1)]' : ''}`}>
                  <div className="flex justify-between items-start gap-4 mb-4 flex-wrap">
                    <div>
                      <h3 className="text-xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                        {exp.company}
                      </h3>
                      <span className="text-xs text-[var(--color-text-tertiary)]">{exp.location}</span>
                    </div>
                    <span className="text-xs font-semibold text-[var(--color-accent-primary)] whitespace-nowrap bg-[rgba(37,99,235,0.1)] px-2 py-1 rounded-md">
                      {exp.date}
                    </span>
                  </div>
                  <span className="inline-block text-sm font-semibold text-[var(--color-accent-gold)] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                    {exp.role}
                  </span>
                  <p className="text-xs text-[var(--color-text-tertiary)] mb-4">{exp.type}</p>
                  <div className="space-y-2 mb-4">
                    {exp.details.map((detail, j) => (
                      <p key={j} className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className={`text-[0.7rem] font-semibold px-3 py-1 rounded-full border ${
                          exp.isEdu
                            ? 'bg-[rgba(212,168,67,0.12)] text-[var(--color-accent-gold)] border-[rgba(212,168,67,0.2)]'
                            : 'bg-[rgba(37,99,235,0.12)] text-[var(--color-accent-secondary)] border-[rgba(37,99,235,0.15)]'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
