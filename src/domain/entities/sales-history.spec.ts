import { expect, test } from "vitest"
import { SalesHistory } from "./sales-history"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

test('create a sales history', () => {
  const salesHistory = SalesHistory.create({
    productId: new UniqueEntityID('prod-123'),
    quantitySold: 50,
    profit: 1000,
    periodStart: new Date('2025-01-01'),
    periodEnd: new Date('2025-12-31')
  }, new UniqueEntityID('sales-123'))

  expect(salesHistory.productId).toEqual(new UniqueEntityID('prod-123'))
  expect(salesHistory.quantitySold).toEqual(50)
  expect(salesHistory.profit).toEqual(1000)
  expect(salesHistory.periodStart).toEqual(new Date('2025-01-01'))
  expect(salesHistory.periodEnd).toEqual(new Date('2025-12-31'))
  expect(salesHistory.createdAt).toBeInstanceOf(Date)
  expect(salesHistory.updatedAt).toBeUndefined()
})

test('update sales history properties', () => {
  const salesHistory = SalesHistory.create({
    productId: new UniqueEntityID('prod-123'),
    quantitySold: 50,
    profit: 1000,
    periodStart: new Date('2025-01-01'),
    periodEnd: new Date('2025-12-31')
  }, new UniqueEntityID('sales-123'))

  salesHistory.quantitySold = 75
  salesHistory.profit = 1500

  expect(salesHistory.quantitySold).toEqual(75)
  expect(salesHistory.profit).toEqual(1500)
  expect(salesHistory.updatedAt).toBeInstanceOf(Date)
})