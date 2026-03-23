"use client";

import { ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const MODULES = [
  { slug: 'inventory', name: 'Wareflow Inventory', desc: 'Real-time warehouse stock tracking, barcoding, and cycle counting.', category: 'Core Module' },
  { slug: 'fleet', name: 'Wareflow Fleet', desc: 'GPS routing, vehicle maintenance tracking, and delivery proofing.', category: 'Transport' },
  { slug: 'analytics', name: 'Wareflow Intelligence', desc: 'Global logistics BI, predictive analytics, and performance reporting.', category: 'Data' },
  { slug: 'inbound', name: 'Wareflow Dock', desc: 'Dock scheduling, vendor management, and receiving workflows.', category: 'Warehouse' },
];

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function ProjectsDirectoryPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Directory Header */}
      <motion.div
        className="p-8 md:p-16 border-b border-border bg-secondary/5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">The Ecosystem</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Discover our suite of purpose-built logistics applications. Mix and match modules to create your perfect operational stack.
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        className="flex border-b border-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex-1 flex items-center px-6 py-4 bg-background focus-within:bg-secondary/10 transition-colors">
          <Search className="w-4 h-4 text-muted-foreground mr-3" />
          <input
            type="text"
            placeholder="Search modules (e.g., Inventory)..."
            className="bg-transparent border-none outline-none text-sm w-full font-mono placeholder:text-muted-foreground/50"
          />
        </div>
        <div className="hidden md:flex border-l border-border px-6 py-4 items-center bg-secondary/20">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{MODULES.length} Modules</span>
        </div>
      </motion.div>

      {/* Modules List */}
      <motion.div
        className="flex flex-col divide-y divide-border"
        variants={listVariants}
        initial="hidden"
        animate="show"
      >
        {MODULES.map((mod) => (
          <Link key={mod.slug} href={`/projects/${mod.slug}`}>
            <motion.div
              variants={itemVariants}
              className="group flex flex-col md:flex-row md:items-center justify-between p-8 hover:bg-secondary/10 transition-colors cursor-pointer"
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
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
