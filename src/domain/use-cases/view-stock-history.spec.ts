import { expect, test } from "vitest"
import { ViewStockHistoryUseCase } from "./view-stock-history"
import { StockRepository } from "../repositories/stock-repository"
import { Stock } from "../entities/stock"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

const fakeStockRepository: StockRepository = {
  async findByProductAndPeriod(productId: UniqueEntityID, periodStart: Date, periodEnd: Date) {
    if (productId.toString() === 'prod-123') {
      return Stock.create(
        {
          productId: new UniqueEntityID('prod-123'),
          quantity: 100
        },
        new UniqueEntityID('stock-123')
      )
    }
    return null
  }
}

test('view stock history for a product', async () => {
  const viewStockHistory = new ViewStockHistoryUseCase(fakeStockRepository)

  const periodStart = new Date('2025-01-01')
  const periodEnd = new Date('2025-12-31')

  const stockHistory = await viewStockHistory.execute({
    productId: 'prod-123',
    periodStart,
    periodEnd
  })

  expect(stockHistory).not.toBeNull()
  if (stockHistory) {
    expect(stockHistory.productId).toEqual(new UniqueEntityID('prod-123'))
    expect(stockHistory.quantity).toEqual(100)
  }
})

test('return null when stock history is not found', async () => {
  const viewStockHistory = new ViewStockHistoryUseCase(fakeStockRepository)

  const periodStart = new Date('2025-01-01')
  const periodEnd = new Date('2025-12-31')

  const stockHistory = await viewStockHistory.execute({
    productId: 'non-existent-prod',
    periodStart,
    periodEnd
  })

  expect(stockHistory).toBeNull()
})