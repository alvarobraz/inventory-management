import { expect, test } from "vitest"
import { Notification } from "./notification"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

test('create a notification', () => {
  const notification = Notification.create({
    productId: new UniqueEntityID('prod-123'),
    message: 'Low stock alert for product',
    type: 'email'
  }, new UniqueEntityID('notif-123'))

  expect(notification.productId).toEqual(new UniqueEntityID('prod-123'))
  expect(notification.message).toEqual('Low stock alert for product')
  expect(notification.type).toEqual('email')
  expect(notification.createdAt).toBeInstanceOf(Date)
})