import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata = {
  title: 'Fitra Ramdhan Hafidz — AI Engineer Portfolio',
  description: 'AI Engineer specializing in Computer Vision, Generative AI, and production-grade ML systems. Portfolio showcasing real-world projects in manufacturing, surveillance, and enterprise applications.',
  keywords: 'AI Engineer, Computer Vision, Machine Learning, PyTorch, YOLOv8, Portfolio',
  authors: [{ name: 'Fitra Ramdhan Hafidz' }],
  openGraph: {
    title: 'Fitra Ramdhan Hafidz — AI Engineer',
    description: 'AI Engineer building production-grade computer vision and generative AI systems.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
