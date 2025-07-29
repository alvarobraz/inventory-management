import { Supplier } from "../entities/supplier"

export interface SuppliersRepository {
  findById(id: string):Promise<Supplier | null>
  fetchDeliveryUpdates(id: string):Promise<Supplier | null>
}