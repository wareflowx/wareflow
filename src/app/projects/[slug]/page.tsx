"use client";

import { ChevronRight, Check, Terminal, Shield, Workflow } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

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
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">{module.name}</h1>
          <p className="text-xl md:text-2xl text-foreground font-medium mb-4">{module.tagline}</p>
          <p className="text-base text-muted-foreground mb-10 leading-relaxed">
            {module.description}
          </p>
          <div className="flex space-x-4">
            <Button size="lg" className="rounded-none px-8">Add to your Hub</Button>
            <Button size="lg" variant="outline" className="rounded-none border-border bg-background">View Documentation</Button>
          </div>
        </motion.div>

        {/* Animated Terminal */}
        <motion.div
          className="w-full md:w-80 border border-border bg-black p-4 text-sm font-mono text-muted-foreground"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex space-x-2 mb-4 border-b border-border pb-4">
            <div className="w-2 h-2 bg-border"></div>
            <div className="w-2 h-2 bg-border"></div>
          </div>

          <div className="space-y-1">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-emerald-500">
              $ wareflow init {slug}
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              ▸ Fetching dependencies...
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
              ▸ Configuring database schema...
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="text-foreground mt-2">
              ✓ Module {slug} activated.
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Key Features */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border border-b border-border"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="p-10 md:p-16">
          <h3 className="text-2xl font-semibold mb-8">Why choose this module?</h3>
          <ul className="space-y-6">
            {[
              "Sub-second search indexing across all facilities",
              "Native barcode generation and scanner support",
              "Automated low-stock alerts and PO generation",
              "Full audit logs for compliance (SOC2)"
            ].map((benefit, i) => (
              <li key={i} className="flex items-start">
                <Check className="w-5 h-5 mr-3 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground leading-snug">{benefit}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Technical Specs */}
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="p-10 md:p-16 bg-secondary/5">
          <h3 className="text-2xl font-semibold mb-8">Technical Foundation</h3>
          <div className="space-y-8">
            {[
              { icon: Terminal, title: "API-First Architecture", desc: "Every action in the UI is available via REST & GraphQL APIs. Integrate seamlessly." },
              { icon: Shield, title: "Enterprise Grade Security", desc: "Role-based access control (RBAC) down to the specific aisle or warehouse zone." },
              { icon: Workflow, title: "Webhooks & Automations", desc: "Trigger external events instantly when stock levels change or shipments arrive." }
            ].map((spec, i) => (
              <div key={i} className="flex gap-4">
                <spec.icon className="w-6 h-6 text-muted-foreground shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">{spec.title}</h4>
                  <p className="text-sm text-muted-foreground">{spec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom CTA */}
      <div className="p-16 text-center">
        <h2 className="text-2xl font-medium mb-6">Ready to deploy {module.name}?</h2>
        <Button className="rounded-none px-8 hover:scale-105 transition-transform" size="lg">Contact Sales</Button>
      </div>
    </div>
  );
}
