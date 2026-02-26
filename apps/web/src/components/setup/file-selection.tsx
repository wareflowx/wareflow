import { useCallback, useState } from 'react'
import { Upload, FileSpreadsheet, AlertCircle } from 'lucide-react'
import { Button } from '../ui/button'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTED_TYPES = ['.csv', '.xlsx']
const ACCEPTED_MIME = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']

interface FileSelectionProps {
  onFileSelect: (file: File, data: string[][], headers: string[]) => void
}

export function FileSelection({ onFileSelect }: FileSelectionProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const parseFile = useCallback(async (file: File) => {
    setError(null)

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setError(`File is too large. Maximum size is 10MB.`)
      return
    }

    // Check file extension
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
    if (!ACCEPTED_TYPES.includes(ext)) {
      setError(`Invalid file type. Accepted: .csv, .xlsx`)
      return
    }

    // Simple CSV parsing for now
    const text = await file.text()
    const lines = text.split('\n').filter(line => line.trim())

    if (lines.length === 0) {
      setError('File is empty')
      return
    }

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
    const data = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim().replace(/"/g, ''))
      return headers.reduce((obj, header, i) => {
        obj[header] = values[i] || ''
        return obj
      }, {} as Record<string, string>)
    })

    onFileSelect(file, data, headers)
  }, [onFileSelect])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      parseFile(file)
    }
  }, [parseFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      parseFile(file)
    }
  }, [parseFile])

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Import Your Data
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Drop files here or click to browse. Accepts: .csv, .xlsx • Max: 10MB
        </p>
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
          transition-all duration-200
          ${isDragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
        `}
      >
        <input
          type="file"
          accept={ACCEPTED_TYPES.join(',')}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center gap-4">
          <div className={`
            p-4 rounded-full
            ${isDragging ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-800'}
          `}>
            {isDragging ? (
              <FileSpreadsheet className="w-10 h-10 text-blue-500" />
            ) : (
              <Upload className="w-10 h-10 text-gray-400" />
            )}
          </div>

          <div>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {isDragging ? 'Drop your file here' : 'Drag & drop your file here'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              or click to browse
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">.csv</span>
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">.xlsx</span>
            <span>Max 10MB</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}
    </div>
  )
}
