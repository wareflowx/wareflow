'use client'

import { useCallback, useState, useMemo } from 'react'
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  type Node,
} from '@xyflow/react'
import { MousePointer2, Move, Square, Trash2, ChevronDown, ChevronUp, Warehouse } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import '@xyflow/react/dist/style.css'

type Tool = 'select' | 'move' | 'draw' | 'delete'

// Grid configuration
const GRID_COLS = 10
const GRID_ROWS = 8
const CELL_SIZE = 80

type Zone = {
  id: string
  name: string
  color: string
  row: number
  col: number
  width: number
  height: number
}

const dummyZones: Zone[] = [
  { id: 'z1', name: 'Zone A', color: '#3b82f6', row: 0, col: 0, width: 2, height: 2 },
  { id: 'z2', name: 'Zone B', color: '#22c55e', row: 0, col: 3, width: 3, height: 2 },
  { id: 'z3', name: 'Zone C', color: '#f59e0b', row: 2, col: 0, width: 2, height: 3 },
  { id: 'z4', name: 'Zone D', color: '#ef4444', row: 3, col: 3, width: 4, height: 2 },
  { id: 'z5', name: 'Zone E', color: '#8b5cf6', row: 0, col: 7, width: 3, height: 3 },
]

// Generate grid cells
const generateGridCells = (): Node[] => {
  const cells: Node[] = []

  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      const id = `cell-${row}-${col}`
      cells.push({
        id,
        type: 'default',
        position: { x: col * CELL_SIZE, y: row * CELL_SIZE },
        data: { row, col },
        style: {
          width: CELL_SIZE,
          height: CELL_SIZE,
          border: '1px solid #e2e8f0',
          borderRadius: '0',
          background: 'transparent',
        },
      })
    }
  }

  return cells
}

// Generate zone nodes from dummy data
const generateZoneNodes = (zones: Zone[]): Node[] => {
  return zones.map((zone) => ({
    id: zone.id,
    type: 'default',
    position: { x: zone.col * CELL_SIZE, y: zone.row * CELL_SIZE },
    data: { label: zone.name, color: zone.color },
    style: {
      width: zone.width * CELL_SIZE,
      height: zone.height * CELL_SIZE,
      background: zone.color,
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 600,
      fontSize: '14px',
      border: 'none',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    },
  }))
}

const initialCells = generateGridCells()
const initialZones = generateZoneNodes(dummyZones)
const initialNodes: Node[] = [...initialCells, ...initialZones]

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
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {title}
      </div>
    </div>
  )
}

export function WarehouseGrid() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [activeTool, setActiveTool] = useState<Tool>('select')
  const [currentFloor, setCurrentFloor] = useState(0)
  const [selectedWarehouse, setSelectedWarehouse] = useState('main')

  // Calculate grid dimensions
  const gridWidth = GRID_COLS * CELL_SIZE
  const gridHeight = GRID_ROWS * CELL_SIZE

  return (
    <div className="h-full w-full relative">
      {/* Warehouse Selector */}
      <div className="absolute top-6 left-6 z-10">
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

      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        fitView
        panInteractive={false}
        zoomInteractive={false}
        nodesDraggable={false}
        minZoom={0.5}
        maxZoom={1}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
      >
        <Background gap={0} color="#e2e8f0" />
      </ReactFlow>

      {/* Floor Selector */}
      <div className="absolute bottom-6 left-6 z-10 flex items-center bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
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
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 p-1.5 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
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
