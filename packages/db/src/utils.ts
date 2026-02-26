import Dexie from 'dexie'
import { db, type Warehouse, type Sector, type Product } from './db'

export type ParsedData = Record<string, string>
export type ColumnMapping = Record<string, string>

export type ImportResult = {
  imported: number
}

export const isSetupRequired = async (): Promise<boolean> => {
  const productCount = await db.products.count()
  return productCount === 0
}

const parseNumber = (value: string | undefined): number | undefined => {
  if (!value) return undefined
  const num = parseFloat(value)
  return isNaN(num) ? undefined : num
}

export const importProducts = async (
  data: ParsedData[],
  mapping: ColumnMapping
): Promise<ImportResult> => {
  // Get or create default warehouse
  let warehouse = await db.warehouses.toCollection().first()
  if (!warehouse) {
    const warehouseId = await db.warehouses.add({
      name: 'Main Warehouse',
      floors: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    warehouse = { id: warehouseId, name: 'Main Warehouse', floors: 6, createdAt: new Date(), updatedAt: new Date() }
  }

  // Get or create sector
  const sectorName = data[0]?.[mapping.sector] || 'Default'
  let sector = await db.sectors.where('name').equals(sectorName).first()
  if (!sector) {
    const sectorId = await db.sectors.add({
      warehouseId: warehouse.id!,
      name: sectorName,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    sector = { id: sectorId, warehouseId: warehouse.id!, name: sectorName, createdAt: new Date(), updatedAt: new Date() }
  }

  const products: Omit<Product, 'id'>[] = data.map(row => ({
    sku: row[mapping.sku] || '',
    name: row[mapping.name] || '',
    quantity: parseNumber(row[mapping.quantity]) || 0,
    sectorId: sector.id,
    zoneId: undefined,
    floor: parseNumber(row[mapping.floor]) || 0,
    positionX: undefined,
    positionY: undefined,
    description: row[mapping.description] || undefined,
    category: row[mapping.category] || undefined,
    unit: row[mapping.unit] || 'pcs',
    createdAt: new Date(),
    updatedAt: new Date()
  }))

  await db.products.bulkAdd(products)
  return { imported: products.length }
}

export const resetApp = async (): Promise<void> => {
  await db.products.clear()
  await db.zones.clear()
  await db.sectors.clear()
  await db.warehouses.clear()
}
