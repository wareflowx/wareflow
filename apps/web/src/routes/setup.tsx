import { useState, useCallback, useMemo } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { FileSelection, Preview, ColumnMappingComponent, Validation, Complete } from '../components/setup'
import { IMPORT_FIELDS, type SetupStep, type ColumnMapping, type ParsedData, type ValidationResult } from '../types/setup'

export const Route = createFileRoute('/setup')({
  component: SetupPage,
})

function SetupPage() {
  const navigate = useNavigate()

  const [step, setStep] = useState<SetupStep>('file-selection')
  const [file, setFile] = useState<File | null>(null)
  const [parsedData, setParsedData] = useState<ParsedData[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [rowCount, setRowCount] = useState(0)
  const [columnMapping, setColumnMapping] = useState<ColumnMapping>({})
  const [importedCount, setImportedCount] = useState(0)

  const handleFileSelect = useCallback((selectedFile: File, data: ParsedData[], fileHeaders: string[]) => {
    setFile(selectedFile)
    setParsedData(data)
    setHeaders(fileHeaders)
    setRowCount(data.length)
    setStep('preview')
  }, [])

  const handleBack = useCallback(() => {
    switch (step) {
      case 'preview':
        setStep('file-selection')
        setFile(null)
        setParsedData([])
        setHeaders([])
        setRowCount(0)
        break
      case 'column-mapping':
        setStep('preview')
        break
      case 'validation':
        setStep('column-mapping')
        break
    }
  }, [step])

  const handleNext = useCallback(() => {
    switch (step) {
      case 'preview':
        setStep('column-mapping')
        break
      case 'column-mapping':
        setStep('validation')
        break
    }
  }, [step])

  const handleImport = useCallback(() => {
    // TODO: Connect to Dexie/Backend here
    // For now, just show success
    setImportedCount(parsedData.length)
    setStep('complete')
  }, [parsedData])

  const handleViewProducts = useCallback(() => {
    navigate({ to: '/' })
  }, [navigate])

  const handleImportAnother = useCallback(() => {
    setStep('file-selection')
    setFile(null)
    setParsedData([])
    setHeaders([])
    setRowCount(0)
    setColumnMapping({})
    setImportedCount(0)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Progress indicator */}
      {step !== 'complete' && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {(['file-selection', 'preview', 'column-mapping', 'validation'] as SetupStep[]).map((s, idx) => {
                const stepNum = idx + 1
                const labels = ['File', 'Preview', 'Mapping', 'Validate']
                const isActive = s === step
                const isCompleted = stepNum < ['file-selection', 'preview', 'column-mapping', 'validation'].indexOf(step) + 1

                return (
                  <div key={s} className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                        ${isCompleted ? 'bg-green-500 text-white' :
                          isActive ? 'bg-blue-500 text-white' :
                          'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}
                      `}>
                        {isCompleted ? '✓' : stepNum}
                      </div>
                      <span className={`
                        text-sm font-medium hidden sm:inline
                        ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}
                      `}>
                        {labels[idx]}
                      </span>
                    </div>
                    {idx < 3 && (
                      <div className={`w-8 sm:w-16 h-0.5 mx-2 ${isCompleted ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Step content */}
      <div className="px-6 py-8">
        {step === 'file-selection' && (
          <FileSelection onFileSelect={handleFileSelect} />
        )}

        {step === 'preview' && file && (
          <Preview
            data={parsedData}
            headers={headers}
            rowCount={rowCount}
            fileName={file.name}
            onBack={handleBack}
            onNext={handleNext}
          />
        )}

        {step === 'column-mapping' && (
          <ColumnMappingComponent
            data={parsedData}
            headers={headers}
            columnMapping={columnMapping}
            onBack={handleBack}
            onNext={handleNext}
            onMappingChange={setColumnMapping}
          />
        )}

        {step === 'validation' && (
          <Validation
            data={parsedData}
            columnMapping={columnMapping}
            onBack={handleBack}
            onImport={handleImport}
          />
        )}

        {step === 'complete' && (
          <Complete
            importedCount={importedCount}
            onViewProducts={handleViewProducts}
            onImportAnother={handleImportAnother}
          />
        )}
      </div>
    </div>
  )
}
