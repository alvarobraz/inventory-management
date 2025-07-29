import { expect, test } from "vitest"
import { ManagePurchaseOrderUseCase } from "./manage-purchase-order"
import { PurchaseOrdersRepository } from "../repositories/purchase-orders-repository"
import { PurchaseOrder } from "../entities/purchase-order"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

const fakePurchaseOrdersRepository: PurchaseOrdersRepository = {
  async create(purchaseOrder: PurchaseOrder) {
    return
  },
  async findById(id: string) {
    if (id === 'order-123') {
      return PurchaseOrder.create(
        {
          supplierId: new UniqueEntityID('supp-123'),
          productId: new UniqueEntityID('prod-123'),
          quantity: 50,
          status: 'pending'
        },
        new UniqueEntityID(id)
      )
    }
    return null
  },
  async save(purchaseOrder: PurchaseOrder) {
    return purchaseOrder
  }
}

test('manage a purchase order by updating quantity and status', async () => {
  const managePurchaseOrder = new ManagePurchaseOrderUseCase(fakePurchaseOrdersRepository)

  const purchaseOrder = await managePurchaseOrder.execute({
    purchaseOrderId: 'order-123',
    quantity: 100,
    status: 'completed'
  })

  expect(purchaseOrder.quantity).toEqual(100)
  expect(purchaseOrder.status).toEqual('completed')
  expect(purchaseOrder.updatedAt).toBeInstanceOf(Date)
})

test('manage a purchase order by updating only quantity', async () => {
  const managePurchaseOrder = new ManagePurchaseOrderUseCase(fakePurchaseOrdersRepository)

  const purchaseOrder = await managePurchaseOrder.execute({
    purchaseOrderId: 'order-123',
    quantity: 75
  })

  expect(purchaseOrder.quantity).toEqual(75)
  expect(purchaseOrder.status).toEqual('pending')
  expect(purchaseOrder.updatedAt).toBeInstanceOf(Date)
})

test('manage a purchase order by updating only status', async () => {
  const managePurchaseOrder = new ManagePurchaseOrderUseCase(fakePurchaseOrdersRepository)

  const purchaseOrder = await managePurchaseOrder.execute({
    purchaseOrderId: 'order-123',
    status: 'canceled'
  })

  expect(purchaseOrder.quantity).toEqual(50)
  expect(purchaseOrder.status).toEqual('canceled')
  expect(purchaseOrder.updatedAt).toBeInstanceOf(Date)
})

test('throw error when purchase order is not found', async () => {
  const managePurchaseOrder = new ManagePurchaseOrderUseCase(fakePurchaseOrdersRepository)

  await expect(
    managePurchaseOrder.execute({
      purchaseOrderId: 'non-existent-order',
      quantity: 100,
      status: 'completed'
    })
  ).rejects.toThrow('Purchase order not found')
})