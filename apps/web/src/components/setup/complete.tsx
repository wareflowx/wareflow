import { CheckCircle, Package, Upload, ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'

interface CompleteProps {
  importedCount: number
  onViewProducts: () => void
  onImportAnother: () => void
}

export function Complete({ importedCount, onViewProducts, onImportAnother }: CompleteProps) {
  return (
    <div className="w-full max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Import Complete!
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Your products have been imported successfully
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <div className="flex items-center justify-center gap-3">
          <Package className="w-8 h-8 text-blue-500" />
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 dark:text-white">
              {importedCount}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Products Imported
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" onClick={onViewProducts}>
          <Package className="w-5 h-5 mr-2" />
          View Products
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

        <Button variant="outline" size="lg" onClick={onImportAnother}>
          <Upload className="w-5 h-5 mr-2" />
          Import Another File
        </Button>
      </div>
    </div>
  )
}
