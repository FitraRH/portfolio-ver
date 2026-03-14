'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'About', href: '#about', section: 'about' },
  { label: 'Experience', href: '#experience', section: 'experience' },
  { label: 'Projects', href: '#projects', section: 'projects' },
  { label: 'Skills', href: '#skills', section: 'skills' },
  { label: 'AI Lab', href: '#ailab', section: 'ailab' },
  { label: 'Contact', href: '#contact', section: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -30% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(6,13,27,0.85)] backdrop-blur-[20px] border-b border-[rgba(37,99,235,0.1)] py-2'
          : 'py-4'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-8 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="font-[var(--font-heading)] text-2xl font-bold text-[var(--color-text-primary)] tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          FRH
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex list-none gap-8">
          {navItems.map((item) => (
            <li key={item.section}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-sm font-medium uppercase tracking-wider relative pb-2 transition-colors duration-300 ${
                  activeSection === item.section
                    ? 'text-[var(--color-text-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#2563eb] to-[#7c3aed] rounded-full transition-all duration-300 ${
                    activeSection === item.section ? 'w-full' : 'w-0'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className="flex md:hidden flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2 z-[200]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span
            className={`w-6 h-[2px] bg-[var(--color-text-primary)] rounded-full transition-all duration-300 ${
              menuOpen ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-[var(--color-text-primary)] rounded-full transition-all duration-300 ${
              menuOpen ? 'opacity-0 scale-x-0' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-[var(--color-text-primary)] rounded-full transition-all duration-300 ${
              menuOpen ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.ul
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 w-[280px] h-screen bg-[rgba(6,13,27,0.98)] backdrop-blur-[20px] flex flex-col justify-center items-center gap-10 z-[100] list-none md:hidden"
            >
              {navItems.map((item) => (
                <li key={item.section}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-lg font-medium uppercase tracking-wider text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
