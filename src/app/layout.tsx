import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Package, User, Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Wareflow',
  description: 'A centralized platform for logistics management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} dark`} style={{ colorScheme: 'dark' }}>
      <body className="bg-background text-foreground font-sans antialiased min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* Vercel-like Container */}
          <div className="max-w-5xl mx-auto border-x border-border min-h-screen flex flex-col">
            {/* Global Header */}
            <header className="h-16 border-b border-border flex items-center justify-between px-6 sticky top-0 bg-background/95 backdrop-blur z-50">
              <div className="flex items-center space-x-6">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-primary flex items-center justify-center">
                    <Package className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="font-bold tracking-tight">WAREFLOW</span>
                </Link>
                <nav className="hidden md:flex items-center space-x-4 text-sm text-muted-foreground">
                  <Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link>
                </nav>
              </div>

              <div className="flex items-center space-x-4">
                {/* Command Palette Trigger */}
                <button className="hidden md:flex items-center space-x-2 bg-secondary/50 hover:bg-secondary border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors focus:outline-none focus:ring-1 focus:ring-primary">
                  <Search className="w-4 h-4" />
                  <span>Search projects...</span>
                  <kbd className="font-mono text-[10px] bg-background border border-border px-1.5 py-0.5 ml-4 text-foreground">
                    ⌘K
                  </kbd>
                </button>

                {/* User Avatar/Menu */}
                <Button variant="outline" size="icon" className="w-8 h-8 rounded-none border-border">
                  <User className="w-4 h-4" />
                </Button>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
