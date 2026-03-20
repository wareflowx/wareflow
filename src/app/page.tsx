import { ArrowRight, Box, Truck, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const MOCK_PROJECTS = [
  { slug: 'inventory', name: 'Inventory Management', status: 'Operational', updated: '2m ago' },
  { slug: 'fleet', name: 'Fleet Routing', status: 'Degraded', updated: '1h ago' },
  { slug: 'analytics', name: 'Data Warehouse', status: 'Operational', updated: 'Just now' },
  { slug: 'inbound', name: 'Inbound Receiving', status: 'Maintenance', updated: '1d ago' },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Header Section */}
      <div className="p-8 border-b border-border">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">Overview</h1>
        <p className="text-muted-foreground">Manage your logistics applications from a single hub.</p>
      </div>

      {/* Quick Stats (Glued together via divide-x) */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border border-b border-border bg-secondary/20">
        <div className="p-6 flex flex-col">
          <span className="text-sm text-muted-foreground font-mono mb-1">Total Packages (24h)</span>
          <span className="text-3xl font-semibold">14,239</span>
        </div>
        <div className="p-6 flex flex-col">
          <span className="text-sm text-muted-foreground font-mono mb-1">Active Vehicles</span>
          <span className="text-3xl font-semibold">124 / 150</span>
        </div>
        <div className="p-6 flex flex-col">
          <span className="text-sm text-muted-foreground font-mono mb-1">System Health</span>
          <span className="text-3xl font-semibold text-emerald-500">99.9%</span>
        </div>
      </div>

      {/* Projects Grid Container */}
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium">Recent Projects</h2>
          <Button variant="link" className="text-muted-foreground hover:text-foreground p-0 rounded-none h-auto">
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Glued Grid: borders on elements to avoid gaps */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border">
          {MOCK_PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block p-6 border-b border-r border-border hover:bg-secondary/30 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Box className="w-4 h-4" />
                  </div>
                  <h3 className="font-medium">{project.name}</h3>
                </div>
                <Badge variant={project.status === 'Operational' ? 'default' : 'secondary'} className="rounded-none font-mono text-xs">
                  {project.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground font-mono mt-8">
                Updated {project.updated}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
