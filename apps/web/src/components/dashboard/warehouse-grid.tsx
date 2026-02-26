'use client'

import { useState, useMemo } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { MousePointer2, Move, Square, Trash2, ChevronDown, ChevronUp, Warehouse } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Tool = 'select' | 'move' | 'draw' | 'delete'

// Grid configuration
const CELL_SIZE = 15
const GRID_COLS = 100 // Large enough to cover viewport
const GRID_ROWS = 100

const tools: { id: Tool; icon: typeof MousePointer2; label: string }[] = [
  { id: 'select', icon: MousePointer2, label: 'Select' },
  { id: 'move', icon: Move, label: 'Move' },
  { id: 'draw', icon: Square, label: 'Draw Zone' },
  { id: 'delete', icon: Trash2, label: 'Delete' },
]

function Tooltip({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
        {title}
      </div>
    </div>
  )
}

export function WarehouseGrid() {
  const [activeTool, setActiveTool] = useState<Tool>('select')
  const [currentFloor, setCurrentFloor] = useState(0)
  const [selectedWarehouse, setSelectedWarehouse] = useState('main')

  // Generate grid cells
  const cells = useMemo(() => {
    const result = []
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        // Zone borders every 10 cells
        const isZoneBorderCol = (col + 1) % 10 === 0 && col < GRID_COLS - 1
        const isZoneBorderRow = (row + 1) % 10 === 0 && row < GRID_ROWS - 1

        result.push({
          id: `cell-${row}-${col}`,
          row,
          col,
          isZoneBorderCol,
          isZoneBorderRow,
        })
      }
    }
    return result
  }, [])

  return (
    <div className="h-full w-full relative overflow-hidden" style={{ backgroundColor: '#f1f5f9' }}>
      {/* Warehouse Selector */}
      <div className="absolute top-6 left-6 z-50">
        <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
          <SelectTrigger className="w-[200px] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <Warehouse className="w-4 h-4 mr-2 text-slate-500" />
            <SelectValue placeholder="Select warehouse" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="main">Main Warehouse</SelectItem>
            <SelectItem value="secondary">Secondary Warehouse</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grid with Pan & Zoom - fills entire viewport */}
      <TransformWrapper
        initialScale={1}
        minScale={0.3}
        maxScale={3}
        centerOnInit
      >
        <TransformComponent
          wrapperClass="!w-full !h-full"
          contentClass="!w-full !h-full"
        >
          <div
            className="relative"
            style={{
              width: GRID_COLS * CELL_SIZE,
              height: GRID_ROWS * CELL_SIZE,
            }}
          >
            {cells.map((cell) => (
              <div
                key={cell.id}
                className="absolute bg-white"
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  left: cell.col * CELL_SIZE,
                  top: cell.row * CELL_SIZE,
                  borderRight: cell.isZoneBorderCol ? '2px solid #64748b' : '1px solid #cbd5e1',
                  borderBottom: cell.isZoneBorderRow ? '2px solid #64748b' : '1px solid #cbd5e1',
                  borderTop: '1px solid #cbd5e1',
                  borderLeft: '1px solid #cbd5e1',
                }}
              />
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>

      {/* Floor Selector */}
      <div className="absolute bottom-6 left-6 z-50 flex items-center bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <button
          onClick={() => setCurrentFloor(f => Math.max(0, f - 1))}
          className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
        <div className="px-3 py-2 border-x border-slate-200 dark:border-slate-700 min-w-[60px] text-center">
          <span className="text-sm font-medium text-slate-900 dark:text-white">Floor {currentFloor}</span>
        </div>
        <button
          onClick={() => setCurrentFloor(f => f + 1)}
          className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>

      {/* Toolbar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 p-1.5 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
        {tools.map((tool) => {
          const Icon = tool.icon
          const isActive = activeTool === tool.id

          return (
            <Tooltip key={tool.id} title={tool.label}>
              <button
                onClick={() => setActiveTool(tool.id)}
                className={`
                  p-2 rounded transition-colors
                  ${isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
              </button>
            </Tooltip>
          )
        })}
      </div>
    </div>
  )
}
