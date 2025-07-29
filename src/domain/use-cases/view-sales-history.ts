import { SalesHistoryRepository } from "@/domain/repositories/sales-history-repository"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

interface ViewSalesHistoryUseCaseRequest {
  productId: string
  periodStart: Date
  periodEnd: Date
}

export class ViewSalesHistoryUseCase {
  constructor(
    private salesHistoryRepository: SalesHistoryRepository
  ) {}

  async execute({ productId, periodStart, periodEnd }: ViewSalesHistoryUseCaseRequest) {
    const salesHistory = await this.salesHistoryRepository.findByProductAndPeriod(
      new UniqueEntityID(productId),
      periodStart,
      periodEnd
    )

    return salesHistory
  }
}