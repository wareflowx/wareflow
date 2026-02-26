import { createFileRoute } from '@tanstack/react-router'
import { WarehouseGrid } from '../components/dashboard'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <div className="h-screen w-screen">
      <WarehouseGrid />
    </div>
  )
}
