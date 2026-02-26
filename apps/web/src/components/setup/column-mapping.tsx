import { useMemo } from 'react'
import { ArrowLeft, ArrowRight, RefreshCw, Columns2 } from 'lucide-react'
import { Button } from '../ui/button'
import { IMPORT_FIELDS, type ColumnMapping, type ImportField, type ParsedData } from '../../types/setup'

interface ColumnMappingProps {
  data: ParsedData[]
  headers: string[]
  columnMapping: ColumnMapping
  onBack: () => void
  onNext: () => void
  onMappingChange: (mapping: ColumnMapping) => void
}

export function ColumnMappingComponent({
  data,
  headers,
  columnMapping,
  onBack,
  onNext,
  onMappingChange,
}: ColumnMappingProps) {
  const sampleData = useMemo(() => data.slice(0, 3), [data])

  const autoDetectMapping = useMemo(() => {
    const mapping: ColumnMapping = {}

    IMPORT_FIELDS.forEach(field => {
      // Try exact match first
      const exactMatch = headers.find(
        h => h.toLowerCase() === field.label.toLowerCase() ||
             h.toLowerCase() === field.key.toLowerCase()
      )

      if (exactMatch) {
        mapping[field.key] = exactMatch
        return
      }

      // Try partial match
      const partialMatch = headers.find(
        h => h.toLowerCase().includes(field.key.toLowerCase()) ||
             field.label.toLowerCase().includes(h.toLowerCase())
      )

      if (partialMatch) {
        mapping[field.key] = partialMatch
      }
    })

    return mapping
  }, [headers])

  const handleReset = () => {
    onMappingChange(autoDetectMapping)
  }

  const handleHeaderChange = (fieldKey: ImportField['key'], header: string) => {
    onMappingChange({ ...columnMapping, [fieldKey]: header })
  }

  const mappedCount = Object.keys(columnMapping).filter(k => columnMapping[k as ImportField['key']]).length
  const requiredMapped = IMPORT_FIELDS
    .filter(f => f.required)
    .every(f => columnMapping[f.key])

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Map Your Columns
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Match your file columns to the system fields
        </p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Columns2 className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-400">
            {mappedCount} / {IMPORT_FIELDS.length} fields mapped
          </span>
        </div>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Auto-detect
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="grid grid-cols-2 gap-4 p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            File Columns
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            System Fields
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {IMPORT_FIELDS.map((field) => (
            <div key={field.key} className="grid grid-cols-2 gap-4 p-4 items-center">
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </div>
                {field.defaultValue && (
                  <div className="text-xs text-gray-400">
                    Default: {field.defaultValue}
                  </div>
                )}
              </div>
              <select
                value={columnMapping[field.key] || ''}
                onChange={(e) => handleHeaderChange(field.key, e.target.value)}
                className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select column --</option>
                {headers.map((header) => (
                  <option key={header} value={header}>
                    {header}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Sample data preview */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Sample Data Preview
        </div>
        <div className="grid grid-cols-3 gap-4 text-xs">
          {IMPORT_FIELDS.slice(0, 3).map((field) => {
            const header = columnMapping[field.key]
            const sample = header ? sampleData[0]?.[header] : null
            return (
              <div key={field.key}>
                <div className="text-gray-500 dark:text-gray-400">{field.label}</div>
                <div className="text-gray-900 dark:text-white font-mono truncate">
                  {sample || '-'}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={onNext} disabled={!requiredMapped}>
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
