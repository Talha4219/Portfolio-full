
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import PageTransition from '@/components/layout/PageTransition';
import ScrollProgress from '@/components/ui/ScrollProgress';
import MouseSpotlight from '@/components/ui/MouseSpotlight';
import DynamicBackground from '@/components/ui/DynamicBackground';
// import SnowfallEffect from '@/components/ui/SnowfallEffect';

export const metadata: Metadata = {
  title: 'Talha Shams - Full Stack Developer',
  description: 'A stunning, animated full-stack portfolio website.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Space+Grotesk:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ScrollProgress />
        {/* <SnowfallEffect /> */}
        <MouseSpotlight />
        <DynamicBackground />
        <div className="relative flex min-h-screen flex-col bg-transparent">
          <Header />
          <main className="flex-1">
            <ErrorBoundary>
              <PageTransition>
                {children}
              </PageTransition>
            </ErrorBoundary>
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
