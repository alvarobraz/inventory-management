import { expect, test } from "vitest"
import { PurchaseOrder } from "./purchase-order"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

test('create a purchase order', () => {
  const purchaseOrder = PurchaseOrder.create({
    supplierId: new UniqueEntityID('supp-123'),
    productId: new UniqueEntityID('prod-123'),
    quantity: 50,
    status: 'pending'
  }, new UniqueEntityID('order-123'))

  expect(purchaseOrder.supplierId).toEqual(new UniqueEntityID('supp-123'))
  expect(purchaseOrder.productId).toEqual(new UniqueEntityID('prod-123'))
  expect(purchaseOrder.quantity).toEqual(50)
  expect(purchaseOrder.status).toEqual('pending')
  expect(purchaseOrder.createdAt).toBeInstanceOf(Date)
  expect(purchaseOrder.updatedAt).toBeUndefined()
})

test('update purchase order properties', () => {
  const purchaseOrder = PurchaseOrder.create({
    supplierId: new UniqueEntityID('supp-123'),
    productId: new UniqueEntityID('prod-123'),
    quantity: 50,
    status: 'pending'
  }, new UniqueEntityID('order-123'))

  purchaseOrder.quantity = 100
  purchaseOrder.status = 'completed'

  expect(purchaseOrder.quantity).toEqual(100)
  expect(purchaseOrder.status).toEqual('completed')
  expect(purchaseOrder.updatedAt).toBeInstanceOf(Date)
})