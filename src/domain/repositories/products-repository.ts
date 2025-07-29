import { Product } from "../entities/product"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

export interface ProductsRepository {
  create(product: Product): Promise<void>
  findById(id: string):Promise<Product | null>
  save(data: Product): Promise<Product>
}