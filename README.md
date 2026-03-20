<p align="center">
  <img src="public/banner.jpg" alt="Wareflow Logo" width="100%">
</p>

<h1 align="center">Wareflow</h1>

<p align="center">
  <a href="https://github.com/wareflow/wareflow">
    <img src="https://img.shields.io/github/package-json/v/wareflow/wareflow" alt="Version">
  </a>
  <a href="https://github.com/wareflow/wareflow/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/wareflow/wareflow/ci?label=tests" alt="Tests">
  </a>
  <a href="https://github.com/wareflow/wareflow/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/wareflow/wareflow" alt="License">
  </a>
</p>

> A centralized platform for logistics management — the hub for all Wareflow applications.

## Requirements

- Node.js 20+
- pnpm (recommended) or npm

## Installation

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

## Quick Start

```bash
# Start the development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Type check
pnpm typecheck
```

## Project Structure

```
wareflow/
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # UI components
│   │   └── ui/        # shadcn/ui components
│   ├── hooks/         # Custom React hooks
│   └── lib/           # Utilities
├── public/            # Static assets
└── docs/              # Documentation
```

## Available Scripts

- `pnpm dev` — Start development server
- `pnpm build` — Build for production
- `pnpm start` — Start production server
- `pnpm lint` — Run ESLint
- `pnpm typecheck` — Run TypeScript type checking

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui, Radix UI
- **Icons**: Lucide React
- **Charts**: Recharts

## Documentation

For detailed project information, see [docs/PROJECT.md](docs/PROJECT.md).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details.