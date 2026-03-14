'use client';

const socialLinks = [
  {
    href: 'https://github.com/FitraRH',
    label: 'GitHub',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    href: 'https://gitlab.com/FitraRH',
    label: 'GitLab',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z" />
      </svg>
    ),
  },
  {
    href: 'https://www.linkedin.com/in/fitra-ramdhan-hafidz-a19953312/',
    label: 'LinkedIn',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    href: 'https://id.jobstreet.com/profiles/fitra-ramdhanhafidz-tVQDNdG8vC',
    label: 'Jobstreet',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
];

export default function Footer() {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-12 pb-8 border-t border-[rgba(37,99,235,0.1)] z-[1]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
          <div className="text-center md:text-left">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="text-xl font-bold text-[var(--color-text-primary)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              FRH
            </a>
            <p className="text-sm text-[var(--color-text-tertiary)] mt-1">
              AI Engineer — Building the future with intelligent systems.
            </p>
          </div>
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-[rgba(37,99,235,0.08)] border border-[rgba(37,99,235,0.12)] text-[var(--color-text-secondary)] hover:bg-[rgba(37,99,235,0.2)] hover:text-[var(--color-accent-secondary)] hover:border-[var(--color-accent-primary)] hover:-translate-y-1 transition-all duration-300"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="text-center pt-8 border-t border-[rgba(37,99,235,0.08)]">
          <p className="text-xs text-[var(--color-text-tertiary)]">
            &copy; 2025 Fitra Ramdhan Hafidz. Crafted with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
