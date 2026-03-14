'use client';

import { useEffect } from 'react';

export default function CursorGlow() {
  useEffect(() => {
    if (window.innerWidth <= 768) return;

    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(37, 99, 235, 0.06) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
      transform: translate(-50%, -50%);
      transition: transform 0.15s ease;
    `;
    document.body.appendChild(glow);

    const handleMouseMove = (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (glow.parentNode) glow.parentNode.removeChild(glow);
    };
  }, []);

  return null;
}
