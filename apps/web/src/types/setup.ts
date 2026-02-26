export type ImportField = {
  key: 'sku' | 'name' | 'quantity' | 'sector' | 'zone' | 'floor' | 'description' | 'category' | 'unit'
  label: string
  required: boolean
  defaultValue?: string
}

export const IMPORT_FIELDS: ImportField[] = [
  { key: 'sku', label: 'SKU', required: true },
  { key: 'name', label: 'Name', required: true },
  { key: 'quantity', label: 'Quantity', required: true },
  { key: 'sector', label: 'Sector', required: false },
  { key: 'zone', label: 'Zone', required: false },
  { key: 'floor', label: 'Floor', required: false },
  { key: 'description', label: 'Description', required: false },
  { key: 'category', label: 'Category', required: false },
  { key: 'unit', label: 'Unit', required: false, defaultValue: 'pcs' },
]

export type ParsedData = Record<string, string>

export type ColumnMapping = Partial<Record<ImportField['key'], string>>

export type ValidationError = {
  row: number
  field: string
  message: string
}

export type ValidationWarning = {
  row: number
  field: string
  message: string
}

export type ValidationResult = {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
}

export type ImportResult = {
  imported: number
}

export type SetupStep = 'file-selection' | 'preview' | 'column-mapping' | 'validation' | 'complete'

export interface SetupState {
  step: SetupStep
  file: File | null
  parsedData: ParsedData[]
  headers: string[]
  rowCount: number
  columnMapping: ColumnMapping
  validation: ValidationResult
}
