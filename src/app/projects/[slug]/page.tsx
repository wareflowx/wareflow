import { ChevronRight, ExternalLink, Activity, GitBranch, Settings, Database } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projectName = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div className="flex flex-col w-full">
      {/* Breadcrumb Header */}
      <div className="h-14 border-b border-border flex items-center px-6 bg-secondary/10">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/projects" className="hover:text-foreground">Projects</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{projectName}</span>
        </nav>
      </div>

      {/* Project Hero Header */}
      <div className="p-8 border-b border-border flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight mb-4">{projectName}</h1>
          <div className="flex items-center space-x-4 text-sm font-mono text-muted-foreground">
            <span className="flex items-center"><GitBranch className="w-4 h-4 mr-2" /> main</span>
            <span className="flex items-center"><Activity className="w-4 h-4 mr-2 text-emerald-500" /> v2.4.1</span>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="rounded-none border-border">
            Configuration
          </Button>
          <Button className="rounded-none">
            Launch App <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* In-Page Navigation / Tabs */}
      <div className="flex border-b border-border px-8 space-x-8">
        <div className="py-4 border-b-2 border-foreground text-sm font-medium">Overview</div>
        <div className="py-4 border-b-2 border-transparent text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Integrations</div>
        <div className="py-4 border-b-2 border-transparent text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Settings</div>
      </div>

      {/* Project Content */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-medium mb-4">Recent Activity</h2>
            <div className="border border-border divide-y divide-border">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-3">
                    <Database className="w-4 h-4 text-muted-foreground" />
                    <span>Database sync completed successfully</span>
                  </div>
                  <span className="font-mono text-muted-foreground">{i}h ago</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Configuration */}
        <div className="space-y-6">
          <div className="border border-border p-6 bg-secondary/5">
            <h3 className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-wider">Deployment Status</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Status</span>
                <span className="text-sm font-mono text-emerald-500">Ready</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Environment</span>
                <span className="text-sm font-mono">Production</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Region</span>
                <span className="text-sm font-mono">eu-west-3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
