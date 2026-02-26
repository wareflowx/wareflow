import { FileSpreadsheet, ArrowLeft, ArrowRight, Rows3 } from 'lucide-react'
import { Button } from '../ui/button'
import type { ParsedData } from '../../types/setup'

interface PreviewProps {
  data: ParsedData[]
  headers: string[]
  rowCount: number
  fileName: string
  onBack: () => void
  onNext: () => void
}

export function Preview({ data, headers, rowCount, fileName, onBack, onNext }: PreviewProps) {
  const previewData = data.slice(0, 10)

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Preview Your Data
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Showing first 10 rows from {rowCount} total rows
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="w-5 h-5 text-green-500" />
            <span className="font-medium text-gray-900 dark:text-white">{fileName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Rows3 className="w-4 h-4" />
            <span>{rowCount} rows</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-12">
                  #
                </th>
                {headers.map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {previewData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 text-gray-400 dark:text-gray-500">{idx + 1}</td>
                  {headers.map((header) => (
                    <td
                      key={header}
                      className="px-4 py-3 text-gray-900 dark:text-gray-100 truncate max-w-xs"
                    >
                      {row[header] || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {rowCount > 10 && (
          <div className="p-3 bg-gray-50 dark:bg-gray-900 text-center text-sm text-gray-500 dark:text-gray-400">
            ... and {rowCount - 10} more rows
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={onNext}>
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
