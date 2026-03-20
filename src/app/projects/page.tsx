import { Plus, Settings2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ALL_PROJECTS = [
  { slug: 'inventory', name: 'Inventory', desc: 'Real-time warehouse stock tracking and auditing', env: 'Production', status: 'Active' },
  { slug: 'fleet', name: 'Fleet Management', desc: 'GPS routing and delivery proofing', env: 'Production', status: 'Active' },
  { slug: 'analytics', name: 'Data Warehouse', desc: 'Global logistics BI and analytics', env: 'Preview', status: 'Building' },
  { slug: 'inbound', name: 'Inbound Receiving', desc: 'Dock scheduling and receiving workflows', env: 'Development', status: 'Paused' },
];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="p-8 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Projects</h1>
          <p className="text-muted-foreground">All Wareflow applications and modules.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="rounded-none border-border">
            <Settings2 className="w-4 h-4 mr-2" />
            Manage
          </Button>
          <Button className="rounded-none">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Projects List (Glued with divide-y) */}
      <div className="flex-1 p-8">
        <div className="border border-border flex flex-col divide-y divide-border bg-background">
          {ALL_PROJECTS.map((project) => (
            <div key={project.slug} className="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-secondary/20 transition-colors group">
              <div className="flex-1 mb-4 md:mb-0">
                <div className="flex items-center space-x-3 mb-1">
                  <Link href={`/projects/${project.slug}`} className="text-lg font-medium hover:underline decoration-1 underline-offset-4">
                    {project.name}
                  </Link>
                  <Badge variant="outline" className="rounded-none border-border font-mono text-[10px] uppercase tracking-wider">
                    {project.env}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{project.desc}</p>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex flex-col items-end">
                  <span className="text-sm text-foreground mb-1">{project.status}</span>
                  <div className="flex items-center space-x-2">
                    {/* Status Dot */}
                    <div className={`w-2 h-2 ${project.status === 'Active' ? 'bg-emerald-500' : project.status === 'Building' ? 'bg-amber-500 animate-pulse' : 'bg-muted-foreground'}`} />
                    <span className="font-mono text-xs text-muted-foreground">main-b8a2f1c</span>
                  </div>
                </div>
                <Button variant="secondary" size="sm" className="hidden group-hover:flex rounded-none" asChild>
                  <Link href={`/projects/${project.slug}`}>Open</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
