import { StockRepository } from "@/domain/repositories/stock-repository"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

interface ViewStockHistoryUseCaseRequest {
  productId: string
  periodStart: Date
  periodEnd: Date
}

export class ViewStockHistoryUseCase {
  constructor(
    private stockRepository: StockRepository
  ) {}

  async execute({ productId, periodStart, periodEnd }: ViewStockHistoryUseCaseRequest) {
    const stockHistory = await this.stockRepository.findByProductAndPeriod(
      new UniqueEntityID(productId),
      periodStart,
      periodEnd
    )

    return stockHistory
  }
}