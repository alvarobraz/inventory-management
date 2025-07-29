import { expect, test } from "vitest"
import { CreatePurchaseOrderUseCase } from "./create-purchase-order"
import { PurchaseOrdersRepository } from "../repositories/purchase-orders-repository"
import { PurchaseOrder } from "../entities/purchase-order"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

const fakePurchaseOrdersRepository: PurchaseOrdersRepository = {
  async create(purchaseOrder: PurchaseOrder) {
    return
  },
  async findById(id: string) {
    return null
  },
  async save(purchaseOrder: PurchaseOrder) {
    return purchaseOrder
  }
}

test('create a purchase order', async () => {
  const createPurchaseOrder = new CreatePurchaseOrderUseCase(fakePurchaseOrdersRepository)

  const purchaseOrder = await createPurchaseOrder.execute({
    supplierId: 'supp-123',
    productId: 'prod-123',
    quantity: 50
  })

  expect(purchaseOrder.supplierId).toEqual(new UniqueEntityID('supp-123'))
  expect(purchaseOrder.productId).toEqual(new UniqueEntityID('prod-123'))
  expect(purchaseOrder.quantity).toEqual(50)
  expect(purchaseOrder.status).toEqual('pending')
  expect(purchaseOrder.createdAt).toBeInstanceOf(Date)
  expect(purchaseOrder.updatedAt).toBeUndefined()
})