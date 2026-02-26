import Dexie, { type Table } from 'dexie'

export type Warehouse = {
  id?: number
  name: string
  floors: number
  createdAt: Date
  updatedAt: Date
}

export type Sector = {
  id?: number
  warehouseId: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export type Zone = {
  id?: number
  sectorId: number
  name: string
  floor: number
  positionX: number
  positionY: number
  width: number
  height: number
  color?: string
  createdAt: Date
  updatedAt: Date
}

export type Product = {
  id?: number
  sku: string
  name: string
  quantity: number
  sectorId?: number
  zoneId?: number
  floor: number
  positionX?: number
  positionY?: number
  description?: string
  category?: string
  unit: string
  createdAt: Date
  updatedAt: Date
}

export class WarehouseDB extends Dexie {
  warehouses!: Table<Warehouse>
  sectors!: Table<Sector>
  zones!: Table<Zone>
  products!: Table<Product>

  constructor() {
    super('wareflow')
    this.version(1).stores({
      warehouses: '++id, name',
      sectors: '++id, warehouseId, name',
      zones: '++id, sectorId, name, floor',
      products: '++id, sku, sectorId, zoneId, floor, category'
    })
  }
}

export const db = new WarehouseDB()
