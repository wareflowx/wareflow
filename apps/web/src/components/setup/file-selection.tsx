import { useCallback, useState } from 'react'
import { Upload, FileSpreadsheet, AlertCircle, FileText } from 'lucide-react'
import Papa from 'papaparse'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTED_TYPES = ['.csv']

interface FileSelectionProps {
  onFileSelect: (file: File, data: string[][], headers: string[]) => void
}

export function FileSelection({ onFileSelect }: FileSelectionProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const parseFile = useCallback(async (file: File) => {
    setError(null)

    if (file.size > MAX_FILE_SIZE) {
      setError(`File is too large. Maximum size is 10 MB.`)
      return
    }

    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
    if (!ACCEPTED_TYPES.includes(ext)) {
      setError(`Invalid file type. Accepted: .csv`)
      return
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setError(`Parsing error: ${results.errors[0].message}`)
          return
        }

        const headers = results.meta.fields || []
        if (headers.length === 0) {
          setError('File has no headers')
          return
        }

        const data = results.data as Record<string, string>[]
        if (data.length === 0) {
          setError('File is empty')
          return
        }

        // Convert to array of arrays for compatibility
        const dataArray = data.map(row => headers.map(h => row[h] || ''))
        onFileSelect(file, dataArray, headers)
      },
      error: (err) => {
        setError(`Failed to parse file: ${err.message}`)
      }
    })
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
    <div className="w-full max-w-xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
          <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Import Your Products
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Upload a CSV file with your product inventory
        </p>
      </div>

      <div
        role="button"
        tabIndex={0}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            document.getElementById('file-input')?.click()
          }
        }}
        className={`
          relative border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer
          transition-all duration-300 outline-none
          ${isDragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-[1.02]'
            : 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 focus-visible:ring-4 focus-visible:ring-blue-500/20'
          }
        `}
      >
        <label htmlFor="file-input" className="absolute inset-0 cursor-pointer">
          <span className="sr-only">Select a CSV file to import</span>
        </label>
        <input
          id="file-input"
          type="file"
          accept={ACCEPTED_TYPES.join(',')}
          onChange={handleFileInput}
          className="sr-only"
        />

        <div className="flex flex-col items-center gap-5">
          <div className={`
            p-5 rounded-2xl transition-all duration-300
            ${isDragging ? 'bg-blue-100 dark:bg-blue-900/50' : 'bg-slate-100 dark:bg-slate-800'}
          `}>
            {isDragging ? (
              <FileSpreadsheet className="w-12 h-12 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            ) : (
              <Upload className="w-12 h-12 text-slate-400 dark:text-slate-500" aria-hidden="true" />
            )}
          </div>

          <div>
            <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
              {isDragging ? 'Drop your file here' : 'Drag & drop your CSV file'}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              or click to browse
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
            <span className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-full font-medium">.csv</span>
            <span>Max 10 MB</span>
          </div>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          aria-live="polite"
          className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" aria-hidden="true" />
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Help text */}
      <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
        <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
          Your CSV should include columns like: <span className="font-medium text-slate-900 dark:text-slate-200">SKU</span>, <span className="font-medium text-slate-900 dark:text-slate-200">Name</span>, <span className="font-medium text-slate-900 dark:text-slate-200">Quantity</span>
        </p>
      </div>
    </div>
  )
}
