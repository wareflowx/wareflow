import { ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const MODULES = [
  { slug: 'inventory', name: 'Wareflow Inventory', desc: 'Real-time warehouse stock tracking, barcoding, and cycle counting.', category: 'Core Module' },
  { slug: 'fleet', name: 'Wareflow Fleet', desc: 'GPS routing, vehicle maintenance tracking, and delivery proofing.', category: 'Transport' },
  { slug: 'analytics', name: 'Wareflow Intelligence', desc: 'Global logistics BI, predictive analytics, and performance reporting.', category: 'Data' },
  { slug: 'inbound', name: 'Wareflow Dock', desc: 'Dock scheduling, vendor management, and receiving workflows.', category: 'Warehouse' },
];

export default function ProjectsDirectoryPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Directory Header */}
      <div className="p-8 md:p-16 border-b border-border bg-secondary/5">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">The Ecosystem</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Discover our suite of purpose-built logistics applications. Mix and match modules to create your perfect operational stack.
        </p>
      </div>

      {/* Search Bar / Filter Area */}
      <div className="flex border-b border-border">
        <div className="flex-1 flex items-center px-6 py-4 bg-background">
          <Search className="w-4 h-4 text-muted-foreground mr-3" />
          <input
            type="text"
            placeholder="Search modules (e.g., Inventory)..."
            className="bg-transparent border-none outline-none text-sm w-full font-mono placeholder:text-muted-foreground/50"
          />
        </div>
        <div className="hidden md:flex border-l border-border px-6 py-4 items-center bg-secondary/20">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">4 Modules available</span>
        </div>
      </div>

      {/* Modules List */}
      <div className="flex flex-col divide-y divide-border">
        {MODULES.map((mod) => (
          <Link
            key={mod.slug}
            href={`/projects/${mod.slug}`}
            className="group flex flex-col md:flex-row md:items-center justify-between p-8 hover:bg-secondary/10 transition-colors"
          >
            <div className="flex-1 max-w-2xl mb-4 md:mb-0">
              <div className="flex items-center space-x-4 mb-2">
                <h2 className="text-2xl font-semibold group-hover:underline decoration-border underline-offset-4">{mod.name}</h2>
                <Badge variant="outline" className="rounded-none border-border font-mono text-[10px] uppercase bg-background">
                  {mod.category}
                </Badge>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed">{mod.desc}</p>
            </div>

            <div className="flex items-center">
              <span className="text-sm font-mono text-primary flex items-center group-hover:pr-2 transition-all">
                Explore Module <ArrowRight className="w-4 h-4 ml-2" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
