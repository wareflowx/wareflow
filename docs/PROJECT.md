# Wareflow

## Overview

Wareflow is a centralized platform that serves as the hub for all Wareflow applications. Similar to how Vercel provides a unified dashboard for managing deployments, projects, and analytics. It provides a single entry point for accessing and managing multiple logistics applications.

## Purpose

Wareflow aims to become a comprehensive logistics management solution, functioning as a lightweight ERP system inspired by Odoo but focused specifically on logistics operations. The platform consolidates various logistics tools into one unified interface, making it easier for businesses to manage their supply chain, warehouse operations, and delivery workflows.

## Current State

The project currently consists of:
- A Next.js 16-based dashboard foundation
- A comprehensive UI component library (50+ components)
- Dark mode support

## Design System

### Visual Identity

Inspired by Vercel and Terminal. Clean, professional, sophisticated.

- **Color scheme**: Full black theme via `bg-background` (configured as true black), high contrast text
- **Typography**: Geist (sans-serif) for readability, Geist Mono for technical accents
- **Layout**: Minimal, spacious, grid-based
- **Interactions**: Subtle hover states, smooth transitions

### Design Principles

- **Sobriety** No excess, every element has a purpose
- **Clarity** Information hierarchy is clear and immediate
- **Dark-first** Dark theme as default, elegant and eye-friendly
- **Professional** Commands respect, suitable for business use

### Layout Rules

- **No rounded corners** All elements use sharp edges (`rounded-none`)
- **Text spacing** Generous margins around text content for readability
- **Element grouping** Elements are "glued" together (no gaps between related items)
- **Borders vs Dividers** Use `border` for distinct sections, `divide-y` for lists/groups of similar items
- **Container** Use `max-w-5xl border-x border-border mx-auto` for page containers (Vercel-like centered layout)

## Philosophy

- **Single entry point** One login for all logistics apps
- **Modular** Each application is independent but integrated
- **User-focused** Simple, intuitive interfaces for complex operations

## Planned Pages

### Dashboard (`/`)
Main entry point. Shows an overview of all projects.

**Content:**
- Header with logo and user menu
- Grid of all projects with status indicators
- Quick stats summary (optional)

### Projects List (`/projects`)
Dedicated page listing all Wareflow applications.

**Content:**
- Page title "Projects"
- List or grid of project cards
- Each card shows: name, description, status, last updated

### Project Details (`/projects/[slug]`)
Individual project view.

**Content:**
- Project header with name and actions
- Project-specific content and navigation
- Status and configuration

## Features

### Command Palette
Universal search accessible via `Cmd+K` / `Ctrl+K`. Allows users to quickly navigate to any project, search by tracking number, customer name, or action. Essential for power users and operators familiar with keyboard-driven workflows.

### Real-time Status Indicators
Project status cards update in real-time using WebSockets or Server-Sent Events. Status changes (e.g., "3 trucks pending", "Stock shortage in aisle B") appear instantly without page refresh.

### Role-Based Access Control (RBAC)
Granular permissions system where users see only what they need.
- Warehouse operators see picking/fulfillment apps
- Managers see analytics and fleet management
- Admins see full configuration and team settings

### Data Density Modes
- **Default mode** — Spacious, readable layout for dashboard and navigation
- **Compact mode** — Optimized for data-heavy tables (tracking numbers, packing lists, multi-line addresses). Reduces padding to maximize visible rows

### Responsive & Touch Support
- Desktop: Full `max-w-5xl` centered layout
- Tablet: Adjusted layout for touch interaction (larger tap targets)
- Mobile: Streamlined view for on-the-go actions (scanning, signatures)

### Feedback Systems
Since visual design is minimal, compensate with:
- **Sound feedback** — Subtle audio cues for successful scans (common with handheld scanners)
- **Haptic feedback** — Vibration on mobile/tablet for action confirmation
- **Visual feedback** — Brief state changes on buttons and interactions

## Technical Considerations

- **Next.js 16** with React 19 and App Router
- Dark mode as default to reduce eye strain for users working long hours
- Mobile-first responsive design for warehouse floor usage
- WebSocket/SSE infrastructure for real-time updates