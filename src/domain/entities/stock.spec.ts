import { expect, test } from "vitest"
import { Stock } from "./stock"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

test('create a stock', () => {
  const stock = Stock.create({
    productId: new UniqueEntityID('prod-123'),
    quantity: 100
  }, new UniqueEntityID('stock-123'))

  expect(stock.productId).toEqual(new UniqueEntityID('prod-123'))
  expect(stock.quantity).toEqual(100)
  expect(stock.createdAt).toBeInstanceOf(Date)
  expect(stock.updatedAt).toBeUndefined()
})

test('update stock quantity', () => {
  const stock = Stock.create({
    productId: new UniqueEntityID('prod-123'),
    quantity: 100
  }, new UniqueEntityID('stock-123'))

  stock.quantity = 50

  expect(stock.quantity).toEqual(50)
  expect(stock.updatedAt).toBeInstanceOf(Date)
})