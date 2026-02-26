'use client'

import { useState } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { MousePointer2, Move, Square, Trash2, ChevronDown, ChevronUp, Warehouse, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Tool = 'select' | 'move' | 'draw' | 'delete'

// Grid configuration
const GRID_COLS = 50
const GRID_ROWS = 30
const CELL_SIZE = 50

// Generate column letters (A, B, C, ...)
const getColumnLetter = (col: number): string => {
  return String.fromCharCode(65 + col)
}

// Type for an emplacement
type Emplacement = {
  id: string
  row: number
  col: number
  label: string
  hasProduct: boolean
  productName?: string
  quantity?: number
}

// Generate empty emplacements
const generateEmplacements = (): Emplacement[] => {
  const emplacements: Emplacement[] = []
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      const label = `${getColumnLetter(col)}${row + 1}`
      emplacements.push({
        id: `emp-${row}-${col}`,
        row,
        col,
        label,
        hasProduct: false,
      })
    }
  }
  return emplacements
}

const dummyEmplacements = generateEmplacements()

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
  const [emplacements] = useState<Emplacement[]>(dummyEmplacements)
  const [activeTool, setActiveTool] = useState<Tool>('select')
  const [currentFloor, setCurrentFloor] = useState(0)
  const [selectedWarehouse, setSelectedWarehouse] = useState('main')

  return (
    <div className="h-full w-full relative bg-slate-100 dark:bg-slate-900 overflow-hidden">
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

      {/* Grid with Pan & Zoom */}
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={2}
        centerOnInit
      >
        <TransformComponent
          wrapperClass="!w-full !h-full"
          contentClass="!w-full !h-full"
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: GRID_COLS * CELL_SIZE + (GRID_COLS - 1) * 2,
              height: GRID_ROWS * CELL_SIZE + (GRID_ROWS - 1) * 2,
              padding: '20px',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${GRID_COLS}, ${CELL_SIZE}px)`,
                gridTemplateRows: `repeat(${GRID_ROWS}, ${CELL_SIZE}px)`,
                gap: '1px',
                backgroundColor: '#cbd5e1', // slate-300 - grid line color
                padding: '2px',
                borderRadius: '4px',
                border: '3px solid #475569', // slate-600 - outer border
              }}
            >
              {emplacements.map((emp) => {
                // Add thicker border for every 5th column/row to create zones
                const isZoneBorderCol = (emp.col + 1) % 5 === 0 && emp.col < GRID_COLS - 1
                const isZoneBorderRow = (emp.row + 1) % 5 === 0 && emp.row < GRID_ROWS - 1

                return (
                  <div
                    key={emp.id}
                    className="relative flex items-center justify-center cursor-pointer bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    style={{
                      width: CELL_SIZE,
                      height: CELL_SIZE,
                      borderRight: isZoneBorderCol ? '2px solid #64748b' : '1px solid #cbd5e1',
                      borderBottom: isZoneBorderRow ? '2px solid #64748b' : '1px solid #cbd5e1',
                      borderTop: '1px solid #cbd5e1',
                      borderLeft: '1px solid #cbd5e1',
                    }}
                  >
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {emp.label}
                    </span>
                  </div>
                )
              })}
            </div>
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
