import { useState, useCallback } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { FileSelection, Preview, ColumnMappingComponent, Validation, Complete } from '../components/setup'
import { type SetupStep, type ColumnMapping, type ParsedData } from '../types/setup'
import { importProducts } from '@wareflow/db'

export const Route = createFileRoute('/setup')({
  component: SetupPage,
})

const STEPS = ['file-selection', 'preview', 'column-mapping', 'validation'] as const
const STEP_LABELS = ['File', 'Preview', 'Mapping', 'Validate']

function SetupPage() {
  const navigate = useNavigate()

  const [step, setStep] = useState<SetupStep>('file-selection')
  const [file, setFile] = useState<File | null>(null)
  const [parsedData, setParsedData] = useState<ParsedData[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [rowCount, setRowCount] = useState(0)
  const [columnMapping, setColumnMapping] = useState<ColumnMapping>({})
  const [importedCount, setImportedCount] = useState(0)
  const [isImporting, setIsImporting] = useState(false)
  const [importError, setImportError] = useState<string | null>(null)

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

  const handleImport = useCallback(async () => {
    setIsImporting(true)
    setImportError(null)
    try {
      const result = await importProducts(parsedData, columnMapping)
      setImportedCount(result.imported)
      setStep('complete')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Import failed'
      setImportError(message)
      console.error('Import failed:', error)
    } finally {
      setIsImporting(false)
    }
  }, [parsedData, columnMapping])

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

  const currentStepIndex = STEPS.indexOf(step)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Progress indicator */}
      {step !== 'complete' && (
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="max-w-3xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              {STEPS.map((s, idx) => {
                const isActive = s === step
                const isCompleted = idx < currentStepIndex

                return (
                  <div key={s} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ring-4 ring-white dark:ring-slate-800
                        ${isCompleted ? 'bg-green-500 text-white' :
                          isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' :
                          'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500'}
                      `}>
                        {isCompleted ? (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          idx + 1
                        )}
                      </div>
                      <span className={`
                        mt-2 text-xs font-medium hidden sm:block
                        ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}
                      `}>
                        {STEP_LABELS[idx]}
                      </span>
                    </div>
                    {idx < STEPS.length - 1 && (
                      <div className={`flex-1 h-1 mx-3 rounded ${isCompleted ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Step content */}
      <main className="px-6 py-10">
        <div className="max-w-4xl mx-auto">
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
              isImporting={isImporting}
              error={importError}
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
      </main>
    </div>
  )
}
