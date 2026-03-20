"use client";

import { ArrowRight, Layers, Zap, Terminal, Box } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const transition = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition },
};

export default function HomeLandingPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="px-6 py-24 md:py-32 border-b border-border bg-gradient-to-b from-secondary/20 to-transparent">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center border border-border bg-background px-3 py-1 mb-8">
            <span className="flex h-2 w-2 bg-primary mr-2 animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Wareflow OS v1.0</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
            The unified hub for modern logistics.
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            A comprehensive, modular logistics management solution. We combine the power of a lightweight ERP with the developer-first aesthetic of modern deployment platforms.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-none text-base px-8 h-14 group">
              Explore the Ecosystem <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-none text-base px-8 h-14 border-border">
              Read the Manifesto
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Value Proposition */}
      <motion.section
        className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border border-b border-border"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {[
          { icon: Layers, title: "Modular by Design", desc: "Inspired by Odoo. Only install the applications you need. Your warehouse operations, supply chain, and delivery workflows remain independent but perfectly integrated." },
          { icon: Terminal, title: "Single Entry Point", desc: "One login for all your logistics apps. Command your entire operation from a centralized dashboard with a universal command palette." },
          { icon: Zap, title: "Professional Grade", desc: "Dark-first, high contrast, zero distractions. Built for operators who need clear information hierarchy and blazing-fast interactions." }
        ].map((feature, idx) => (
          <motion.div key={idx} variants={itemVariants} className="p-10 hover:bg-secondary/10 transition-colors">
            <feature.icon className="w-8 h-8 mb-6 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="p-12 md:p-24 flex flex-col items-center text-center bg-gradient-to-b from-secondary/10 to-transparent"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
      >
        <Box className="w-12 h-12 mb-6 text-primary" />
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Ready to upgrade your infrastructure?</h2>
        <p className="text-muted-foreground max-w-xl mb-8">
          Join forward-thinking supply chain teams using Wareflow to consolidate their fragmented logistics stack.
        </p>
        <Link href="/projects">
          <Button variant="outline" size="lg" className="rounded-none border-border bg-background hover:bg-secondary transition-all">
            View available modules
          </Button>
        </Link>
      </motion.section>
    </div>
  );
}
