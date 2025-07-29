import { Product } from "../entities/product"
import { ProductsRepository } from "@/domain/repositories/products-repository"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

interface TrackProductUseCaseRequest {
  productId: string
  name: string
  size?: string
  color?: string
  stockQuantity: number
  minimumStock: number
}

export class TrackProductUseCase {
  constructor(
    private productsRepository: ProductsRepository
  ) {}

  async execute({
    productId,
    name,
    size,
    color,
    stockQuantity,
    minimumStock
  }: TrackProductUseCaseRequest) {
    const product = Product.create({
      productId,
      name,
      size,
      color,
      stockQuantity,
      minimumStock
    }, new UniqueEntityID(productId))

    await this.productsRepository.create(product)

    return product
  }
}