import { Package, ArrowRight, Command } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className="bg-background text-foreground font-sans antialiased min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* Vercel-like Centered Container */}
          <div className="max-w-5xl mx-auto border-x border-border min-h-screen flex flex-col">
            {/* Marketing Header */}
            <header className="h-16 flex items-center justify-between px-6 sticky top-0 bg-background/95 backdrop-blur z-50 border-b border-border">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-6 h-6 bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
                  <Package className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold tracking-widest text-sm uppercase">Wareflow</span>
              </Link>

              <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-muted-foreground">
                <Link href="/projects" className="hover:text-foreground transition-colors">Ecosystem</Link>
                <Link href="#philosophy" className="hover:text-foreground transition-colors">Philosophy</Link>
                <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
              </nav>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" className="hidden md:flex rounded-none text-muted-foreground hover:text-foreground">
                  Sign In
                </Button>
                <Button className="rounded-none group">
                  Book a Demo <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </header>

            {/* Landing Page Content */}
            <main className="flex-1 flex flex-col">
              {children}
            </main>

            {/* Minimalist Footer */}
            <footer className="border-t border-border p-8 md:p-12 bg-secondary/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Command className="w-4 h-4" />
                <span className="text-sm font-mono">© {new Date().getFullYear()} Wareflow Organization.</span>
              </div>
              <div className="flex space-x-6 text-sm text-muted-foreground">
                <Link href="#" className="hover:text-foreground">Twitter</Link>
                <Link href="#" className="hover:text-foreground">GitHub</Link>
                <Link href="#" className="hover:text-foreground">Legal</Link>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
