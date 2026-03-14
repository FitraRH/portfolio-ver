'use client';

import ScrollReveal from './ScrollReveal';

const contactItems = [
  {
    href: 'mailto:fitraramdhanhafidz02@gmail.com',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Email',
    value: 'fitraramdhanhafidz02@gmail.com',
  },
  {
    href: 'tel:+62895803131159',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: 'Phone',
    value: '+62 895 803 131 159',
  },
  {
    href: 'https://www.linkedin.com/in/fitra-ramdhan-hafidz-a19953312/',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    label: 'LinkedIn',
    value: 'Fitra Ramdhan Hafidz',
    external: true,
  },
  {
    href: 'https://id.jobstreet.com/profiles/fitra-ramdhanhafidz-tVQDNdG8vC',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="M8 7v10" />
        <path d="M12 7v10" />
        <path d="M16 7v10" />
      </svg>
    ),
    label: 'Jobstreet',
    value: 'Fitra Ramdhan Hafidz',
    external: true,
  },
  {
    href: null,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Location',
    value: 'Jakarta, Indonesia',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 z-[1]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="mb-12">
            <span className="section-label inline-block text-xs font-semibold text-[var(--color-accent-primary)] uppercase tracking-[0.15em] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              05 — Contact
            </span>
            <h2 className="text-[clamp(2rem,5vw,3rem)] font-extrabold tracking-tight leading-tight text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
              Let&apos;s Connect
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
          <ScrollReveal>
            <div>
              <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-10">
                Interested in collaborating or have a project in mind?
                I&apos;m always open to discussing new opportunities in AI and Machine Learning.
              </p>
              <div className="flex flex-col gap-4">
                {contactItems.map((item, i) => {
                  const Wrapper = item.href ? 'a' : 'div';
                  const wrapperProps = item.href
                    ? {
                        href: item.href,
                        ...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
                      }
                    : {};
                  return (
                    <Wrapper
                      key={i}
                      {...wrapperProps}
                      className="glass-card flex items-center gap-6 p-4 px-6 cursor-pointer"
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-[rgba(37,99,235,0.1)] rounded-xl text-[var(--color-accent-primary)] flex-shrink-0">
                        {item.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]">
                          {item.label}
                        </span>
                        <span className="text-base text-[var(--color-text-primary)] font-medium">
                          {item.value}
                        </span>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass-card p-10 text-center bg-gradient-to-br from-[rgba(37,99,235,0.15)] to-[rgba(124,58,237,0.1)] border-[rgba(37,99,235,0.25)]">
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Ready to work together?
              </h3>
              <p className="text-base text-[var(--color-text-secondary)] mb-8 leading-relaxed">
                Send me an email and let&apos;s discuss how I can contribute to your next project.
              </p>
              <a href="mailto:fitraramdhanhafidz02@gmail.com" className="btn btn-primary">
                <span>Send Email</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
