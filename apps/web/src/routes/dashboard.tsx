import { createFileRoute } from '@tanstack/react-router'
import { WarehouseGrid } from '../components/dashboard'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Warehouse Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 mb-8">
          Visualize and manage your warehouse zones
        </p>

        <WarehouseGrid />
      </div>
    </div>
  )
}
