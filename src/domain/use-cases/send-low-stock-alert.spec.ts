import { expect, test } from "vitest"
import { SendLowStockAlertUseCase } from "./send-low-stock-alert"
import { NotificationsRepository } from "../repositories/notifications-repository"
import { ProductsRepository } from "../repositories/products-repository"
import { Product } from "../entities/product"
import { Notification } from "../entities/notification"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

const fakeProductsRepository: ProductsRepository = {
  async create(product: Product) {
    return
  },
  async findById(id: string) {
    if (id === 'prod-123') {
      return Product.create(
        {
          productId: id,
          name: 'Sample Product',
          stockQuantity: 5,
          minimumStock: 10
        },
        new UniqueEntityID(id)
      )
    }
    if (id === 'prod-456') {
      return Product.create(
        {
          productId: id,
          name: 'Another Product',
          stockQuantity: 20,
          minimumStock: 10
        },
        new UniqueEntityID(id)
      )
    }
    return null
  },
  async save(product: Product) {
    return product
  }
}

const fakeNotificationsRepository: NotificationsRepository = {
  async create(notification: Notification) {
    return
  }
}

test('send low stock alert for a product', async () => {
  const sendLowStockAlert = new SendLowStockAlertUseCase(fakeProductsRepository, fakeNotificationsRepository)

  const notification = await sendLowStockAlert.execute({
    productId: 'prod-123',
    type: 'email'
  })

  expect(notification.productId).toEqual(new UniqueEntityID('prod-123'))
  expect(notification.message).toEqual('Low stock alert for product Sample Product: 5 units remaining.')
  expect(notification.type).toEqual('email')
  expect(notification.createdAt).toBeInstanceOf(Date)
})

test('throw error when product is not found', async () => {
  const sendLowStockAlert = new SendLowStockAlertUseCase(fakeProductsRepository, fakeNotificationsRepository)

  await expect(
    sendLowStockAlert.execute({
      productId: 'non-existent-prod',
      type: 'email'
    })
  ).rejects.toThrow('Product not found')
})

test('throw error when stock is above minimum level', async () => {
  const sendLowStockAlert = new SendLowStockAlertUseCase(fakeProductsRepository, fakeNotificationsRepository)

  await expect(
    sendLowStockAlert.execute({
      productId: 'prod-456',
      type: 'email'
    })
  ).rejects.toThrow('Stock is above minimum level')
})