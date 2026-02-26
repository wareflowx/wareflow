import { useMemo } from 'react'
import { AlertTriangle, CheckCircle, XCircle, ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react'
import { Button } from '../ui/button'
import { IMPORT_FIELDS, type ColumnMapping, type ParsedData, type ValidationResult, type ValidationError, type ValidationWarning } from '../../types/setup'

interface ValidationProps {
  data: ParsedData[]
  columnMapping: ColumnMapping
  onBack: () => void
  onImport: () => void
  isImporting?: boolean
  error?: string | null
}

export function Validation({ data, columnMapping, onBack, onImport, isImporting = false, error }: ValidationProps) {
  const validation = useMemo((): ValidationResult => {
    const errors: ValidationError[] = []
    const warnings: ValidationWarning[] = []

    // Check required field mappings first
    const requiredFields = IMPORT_FIELDS.filter(f => f.required)
    for (const field of requiredFields) {
      if (!columnMapping[field.key]) {
        errors.push({ row: 0, field: field.key, message: `Required field "${field.label}" is not mapped` })
      }
    }

    // If required fields are missing, don't validate data
    if (errors.length > 0) {
      return { isValid: false, errors, warnings }
    }

    const skuField = columnMapping.sku
    const nameField = columnMapping.name
    const quantityField = columnMapping.quantity

    // Track seen SKUs for duplicate detection
    const seenSkus = new Set<string>()

    data.forEach((row, idx) => {
      const rowNum = idx + 1

      // Required fields validation
      if (skuField) {
        const sku = row[skuField]
        if (!sku || sku.trim() === '') {
          errors.push({ row: rowNum, field: 'sku', message: 'SKU is required' })
        } else if (seenSkus.has(sku)) {
          warnings.push({ row: rowNum, field: 'sku', message: `Duplicate SKU: ${sku}` })
        } else {
          seenSkus.add(sku)
        }
      }

      if (nameField) {
        const name = row[nameField]
        if (!name || name.trim() === '') {
          errors.push({ row: rowNum, field: 'name', message: 'Name is required' })
        }
      }

      if (quantityField) {
        const quantity = row[quantityField]
        const numQuantity = parseFloat(quantity)

        if (!quantity || quantity.trim() === '') {
          // Quantity is optional in IMPORT_FIELDS but let's warn if missing
        } else if (isNaN(numQuantity)) {
          errors.push({ row: rowNum, field: 'quantity', message: 'Invalid quantity: must be a number' })
        } else if (numQuantity < 0) {
          warnings.push({ row: rowNum, field: 'quantity', message: `Negative quantity: ${numQuantity}` })
        }
      }
    })

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    }
  }, [data, columnMapping])

  const errorCount = validation.errors.length
  const warningCount = validation.warnings.length

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Validate Your Data
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Review errors and warnings before importing
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className={`p-4 rounded-xl border ${validation.isValid ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}>
          <div className="flex items-center gap-3">
            {validation.isValid ? (
              <CheckCircle className="w-8 h-8 text-green-500" />
            ) : (
              <XCircle className="w-8 h-8 text-red-500" />
            )}
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {validation.isValid ? 'Valid' : 'Invalid'}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {data.length} rows
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <div className="flex items-center gap-3">
            <XCircle className="w-8 h-8 text-red-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {errorCount}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Errors
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {warningCount}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Warnings
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Errors section */}
      {errorCount > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            Errors ({errorCount})
          </h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-800 divide-y divide-red-100 dark:divide-red-900 max-h-48 overflow-y-auto">
            {validation.errors.map((error, idx) => (
              <div key={idx} className="p-3 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Row {error.row}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400"> - {error.message}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warnings section */}
      {warningCount > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-yellow-600 dark:text-yellow-400 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Warnings ({warningCount})
          </h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-yellow-200 dark:border-yellow-800 divide-y divide-yellow-100 dark:divide-yellow-900 max-h-48 overflow-y-auto">
            {validation.warnings.map((warning, idx) => (
              <div key={idx} className="p-3 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Row {warning.row}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400"> - {warning.message}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No issues */}
      {errorCount === 0 && warningCount === 0 && !error && (
        <div className="mb-6 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <p className="text-green-700 dark:text-green-400 font-medium">
            All data looks good! No issues found.
          </p>
        </div>
      )}

      {/* Import error */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" aria-hidden="true" />
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={onImport} disabled={errorCount > 0 || isImporting}>
          {isImporting ? 'Importing...' : `Import ${data.length} Products`}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
