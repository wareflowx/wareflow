'use client'

import { useState, useCallback, useMemo } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Panel,
  Node,
  BackgroundVariant,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { MousePointer2, Move, Square, Trash2, ChevronDown, ChevronUp, Warehouse } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Tool = 'select' | 'move' | 'draw' | 'delete'

const tools: { id: Tool; icon: typeof MousePointer2; label: string }[] = [
  { id: 'select', icon: MousePointer2, label: 'Select' },
  { id: 'move', icon: Move, label: 'Move' },
  { id: 'draw', icon: Square, label: 'Draw Zone' },
  { id: 'delete', icon: Trash2, label: 'Delete' },
]

// Grid configuration
const CELL_SIZE = 15
const GRID_COLS = 100
const GRID_ROWS = 100

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

  // Generate grid nodes
  const initialNodes = useMemo(() => {
    const nodes: Node[] = []
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        const isZoneBorderCol = (col + 1) % 10 === 0 && col < GRID_COLS - 1
        const isZoneBorderRow = (row + 1) % 10 === 0 && row < GRID_ROWS - 1

        nodes.push({
          id: `cell-${row}-${col}`,
          type: 'default',
          position: { x: col * CELL_SIZE, y: row * CELL_SIZE },
          data: { label: '' },
          style: {
            width: CELL_SIZE,
            height: CELL_SIZE,
            backgroundColor: '#ffffff',
            border: `${isZoneBorderCol || isZoneBorderRow ? '2px' : '1px'} solid ${isZoneBorderCol || isZoneBorderRow ? '#64748b' : '#cbd5e1'}`,
          },
          selectable: false,
          draggable: false,
        })
      }
    }
    return nodes
  }, [])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const defaultViewport = useMemo(() => ({
    x: 0,
    y: 0,
    zoom: 1,
  }), [])

  return (
    <div className="h-full w-full" style={{ backgroundColor: '#f8fafc' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        defaultViewport={defaultViewport}
        fitView
        minZoom={0.3}
        maxZoom={3}
        defaultEdgeOptions={{ type: 'smoothstep' }}
        proOptions={{ hideAttribution: true }}
        style={{ backgroundColor: '#f8fafc' }}
      >
        <Background variant={BackgroundVariant.Dots} gap={CELL_SIZE} size={1} color="#cbd5e1" />

        <Controls showInteractive={false} className="!bottom-6 !left-6" />

        <Panel position="top-left" className="!top-6 !left-6">
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
        </Panel>

        <Panel position="bottom-left" className="!bottom-6 !left-6">
          <div className="flex items-center bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
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
        </Panel>

        <Panel position="bottom-center" className="!bottom-6">
          <div className="flex items-center gap-1 p-1.5 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
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
        </Panel>
      </ReactFlow>
    </div>
  )
}
