import { SalesHistory } from "../entities/sales-history"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

export interface SalesHistoryRepository {
  findByProductAndPeriod(productId: UniqueEntityID, periodStart: Date, periodEnd: Date):Promise<SalesHistory | null>
}