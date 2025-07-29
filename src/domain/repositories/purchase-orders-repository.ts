import { PurchaseOrder } from "../entities/purchase-order"

export interface PurchaseOrdersRepository {
  create(product: PurchaseOrder): Promise<void>
  findById(id: string):Promise<PurchaseOrder | null>
  save(data: PurchaseOrder): Promise<PurchaseOrder>
}