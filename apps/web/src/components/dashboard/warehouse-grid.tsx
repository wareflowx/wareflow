'use client'

import { useCallback, useState, useMemo } from 'react'
import {
  ReactFlow,
  Background,
  useNodesState,
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

// Generate column letters (A, B, C, ...)
const getColumnLetter = (col: number): string => {
  return String.fromCharCode(65 + col) // A = 65
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

// Generate dummy emplacements with some filled
const generateEmplacements = (): Emplacement[] => {
  const emplacements: Emplacement[] = []

  // Some filled emplacements for demo
  const filledPositions = [
    { row: 0, col: 0, product: 'Widget A', qty: 50 },
    { row: 0, col: 1, product: 'Widget A', qty: 25 },
    { row: 1, col: 3, product: 'Gadget B', qty: 100 },
    { row: 2, col: 5, product: 'Part C', qty: 75 },
    { row: 4, col: 2, product: 'Module D', qty: 10 },
    { row: 5, col: 7, product: 'Component E', qty: 200 },
  ]

  const filledMap = new Map(
    filledPositions.map(p => [`${p.row}-${p.col}`, { product: p.product, qty: p.qty }])
  )

  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      const label = `${getColumnLetter(col)}${row + 1}`
      const filled = filledMap.get(`${row}-${col}`)
      emplacements.push({
        id: `emp-${row}-${col}`,
        row,
        col,
        label,
        hasProduct: !!filled,
        productName: filled?.product,
        quantity: filled?.qty,
      })
    }
  }

  return emplacements
}

// Generate nodes from emplacements
const generateEmplacementNodes = (emplacements: Emplacement[]): Node[] => {
  return emplacements.map((emp) => {
    const isFilled = emp.hasProduct
    return {
      id: emp.id,
      type: 'default',
      position: { x: emp.col * CELL_SIZE, y: emp.row * CELL_SIZE },
      data: { label: emp.label, ...emp },
      style: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        border: '2px solid #e2e8f0',
        borderRadius: '4px',
        background: isFilled ? '#dbeafe' : '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2px',
        fontSize: '12px',
        fontWeight: 500,
        color: '#1e293b',
      },
    }
  })
}

const dummyEmplacements = generateEmplacements()
const initialNodes = generateEmplacementNodes(dummyEmplacements)

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
