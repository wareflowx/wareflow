# Wareflow

## Overview

Wareflow is a centralized platform that serves as the hub for all Wareflow applications — similar to how Vercel provides a unified dashboard for managing deployments, projects, and analytics. It provides a single entry point for accessing and managing multiple logistics applications.

## Purpose

Wareflow aims to become a comprehensive logistics management solution, functioning as a lightweight ERP system inspired by Odoo but focused specifically on logistics operations. The platform consolidates various logistics tools into one unified interface, making it easier for businesses to manage their supply chain, warehouse operations, and delivery workflows.

## Current State

The project currently consists of:
- A Next.js 16-based dashboard foundation
- A comprehensive UI component library (50+ components)
- Dark mode support

## Design System

### Visual Identity

Inspired by Vercel and Terminal — clean, professional, sophisticated.

- **Color scheme**: Full black theme via `bg-background` (configured as true black), high contrast text
- **Typography**: Geist (sans-serif) for readability, Geist Mono for technical accents
- **Layout**: Minimal, spacious, grid-based
- **Interactions**: Subtle hover states, smooth transitions

### Design Principles

- **Sobriety** — No excess, every element has a purpose
- **Clarity** — Information hierarchy is clear and immediate
- **Dark-first** — Dark theme as default, elegant and eye-friendly
- **Professional** — Commands respect, suitable for business use

### Layout Rules

- **No rounded corners** — All elements use sharp edges (`rounded-none`)
- **Text spacing** — Generous margins around text content for readability
- **Element grouping** — Elements are "glued" together (no gaps between related items)
- **Borders vs Dividers** — Use `border` for distinct sections, `divide-y` for lists/groups of similar items

## Philosophy

- **Single entry point** — One login for all logistics apps
- **Modular** — Each application is independent but integrated
- **User-focused** — Simple, intuitive interfaces for complex operations

## Planned Pages

### Dashboard
- `/` — Main landing/dashboard page with overview statistics and quick access to projects

### Projects
- `/projects` — List of all projects/applications (static page)
- `/projects/[project_id]` — Individual project details (dynamic route)