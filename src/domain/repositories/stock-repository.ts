import { Stock } from "../entities/stock"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

export interface StockRepository {
  findByProductAndPeriod(productId: UniqueEntityID, periodStart: Date, periodEnd: Date):Promise<Stock | null>
}