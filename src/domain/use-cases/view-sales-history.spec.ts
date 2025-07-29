import { expect, test } from "vitest"
import { ViewSalesHistoryUseCase } from "./view-sales-history"
import { SalesHistoryRepository } from "../repositories/sales-history-repository"
import { SalesHistory } from "../entities/sales-history"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

const fakeSalesHistoryRepository: SalesHistoryRepository = {
  async findByProductAndPeriod(productId: UniqueEntityID, periodStart: Date, periodEnd: Date) {
    if (productId.toString() === 'prod-123') {
      return SalesHistory.create(
        {
          productId: new UniqueEntityID('prod-123'),
          quantitySold: 50,
          profit: 1000,
          periodStart: new Date('2025-01-01'),
          periodEnd: new Date('2025-12-31')
        },
        new UniqueEntityID('sales-123')
      )
    }
    return null
  }
}

test('view sales history for a product', async () => {
  const viewSalesHistory = new ViewSalesHistoryUseCase(fakeSalesHistoryRepository)

  const periodStart = new Date('2025-01-01')
  const periodEnd = new Date('2025-12-31')

  const salesHistory = await viewSalesHistory.execute({
    productId: 'prod-123',
    periodStart,
    periodEnd
  })

  expect(salesHistory).not.toBeNull()
  if (salesHistory) {
    expect(salesHistory.productId).toEqual(new UniqueEntityID('prod-123'))
    expect(salesHistory.quantitySold).toEqual(50)
    expect(salesHistory.profit).toEqual(1000)
    expect(salesHistory.periodStart).toEqual(new Date('2025-01-01'))
    expect(salesHistory.periodEnd).toEqual(new Date('2025-12-31'))
  }
})

test('return null when sales history is not found', async () => {
  const viewSalesHistory = new ViewSalesHistoryUseCase(fakeSalesHistoryRepository)

  const periodStart = new Date('2025-01-01')
  const periodEnd = new Date('2025-12-31')

  const salesHistory = await viewSalesHistory.execute({
    productId: 'non-existent-prod',
    periodStart,
    periodEnd
  })

  expect(salesHistory).toBeNull()
})