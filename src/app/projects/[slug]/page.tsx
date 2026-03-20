import { ChevronRight, Check, Terminal, Shield, Workflow } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const getModuleDetails = (slug: string) => ({
  name: `Wareflow ${slug.charAt(0).toUpperCase() + slug.slice(1)}`,
  tagline: 'Total control over your physical assets.',
  description: 'Eliminate stockouts and optimize warehouse space with our real-time tracking engine. Built to handle millions of SKUs with zero latency.',
});

export default async function ProjectLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const module = getModuleDetails(slug);

  return (
    <div className="flex flex-col w-full">
      {/* Breadcrumb Navigation */}
      <div className="h-12 border-b border-border flex items-center px-6 bg-secondary/20">
        <nav className="flex items-center space-x-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
          <Link href="/projects" className="hover:text-foreground transition-colors">Ecosystem</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{module.name}</span>
        </nav>
      </div>

      {/* Module Hero */}
      <div className="p-8 md:p-16 border-b border-border flex flex-col md:flex-row gap-12 items-start justify-between bg-gradient-to-b from-secondary/10 to-transparent">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">{module.name}</h1>
          <p className="text-xl md:text-2xl text-foreground font-medium mb-4">{module.tagline}</p>
          <p className="text-base text-muted-foreground mb-10 leading-relaxed">
            {module.description}
          </p>
          <div className="flex space-x-4">
            <Button size="lg" className="rounded-none px-8">Add to your Hub</Button>
            <Button size="lg" variant="outline" className="rounded-none border-border bg-background">View Documentation</Button>
          </div>
        </div>

        {/* Terminal Teaser */}
        <div className="w-full md:w-80 border border-border bg-black p-4 text-sm font-mono text-muted-foreground">
          <div className="flex space-x-2 mb-4 border-b border-border pb-4">
            <div className="w-2 h-2 bg-border"></div>
            <div className="w-2 h-2 bg-border"></div>
          </div>
          <p className="text-emerald-500 mb-2">$ wareflow init {slug}</p>
          <p>▸ Fetching dependencies...</p>
          <p>▸ Configuring database schema...</p>
          <p className="text-foreground mt-2">✓ Module {slug} activated.</p>
        </div>
      </div>

      {/* Key Features (Glued together) */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border border-b border-border">
        <div className="p-10 md:p-16">
          <h3 className="text-2xl font-semibold mb-8">Why choose this module?</h3>
          <ul className="space-y-6">
            {[
              'Sub-second search indexing across all facilities',
              'Native barcode generation and scanner support',
              'Automated low-stock alerts and PO generation',
              'Full audit logs for compliance (SOC2)'
            ].map((benefit, i) => (
              <li key={i} className="flex items-start">
                <Check className="w-5 h-5 mr-3 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground leading-snug">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technical Specs */}
        <div className="p-10 md:p-16 bg-secondary/5">
          <h3 className="text-2xl font-semibold mb-8">Technical Foundation</h3>
          <div className="space-y-8">
            <div className="flex gap-4">
              <Terminal className="w-6 h-6 text-muted-foreground shrink-0" />
              <div>
                <h4 className="font-medium text-foreground mb-1">API-First Architecture</h4>
                <p className="text-sm text-muted-foreground">Every action in the UI is available via REST & GraphQL APIs. Integrate with your legacy systems seamlessly.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Shield className="w-6 h-6 text-muted-foreground shrink-0" />
              <div>
                <h4 className="font-medium text-foreground mb-1">Enterprise Grade Security</h4>
                <p className="text-sm text-muted-foreground">Role-based access control (RBAC) down to the specific aisle or warehouse zone.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Workflow className="w-6 h-6 text-muted-foreground shrink-0" />
              <div>
                <h4 className="font-medium text-foreground mb-1">Webhooks & Automations</h4>
                <p className="text-sm text-muted-foreground">Trigger external events instantly when stock levels change or shipments arrive.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-16 text-center">
        <h2 className="text-2xl font-medium mb-6">Ready to deploy {module.name}?</h2>
        <Button className="rounded-none px-8" size="lg">Contact Sales</Button>
      </div>
    </div>
  );
}
