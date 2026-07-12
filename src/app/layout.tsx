import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SkipToContent } from '@/components/layout/SkipToContent';
import { CommandPalette } from '@/components/features/CommandPalette';
import { ToastContainer } from '@/components/ui/Toast';
import { AmbientTopology } from '@/components/features/AmbientTopology';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: {
    default: 'Portfolio — Systems Engineer',
    template: '%s — Portfolio',
  },
  description:
    'Systems engineer building AI-native systems for research and operations.',
  metadataBase: new URL('https://jeeva-m.vercel.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="relative min-h-screen bg-bg-primary text-text-primary antialiased">
        <AmbientTopology />
        <div className="relative z-10">
          <SkipToContent />
          <Navbar />
          <main id="main-content" className="pt-14">
            {children}
          </main>
          <Footer />
        </div>
        <CommandPalette />
        <ToastContainer />
      </body>
    </html>
  );
}
