import { ProductsRepository } from "../repositories/products-repository"

interface SetMinimumStockUseCaseRequest {
  productId: string
  minimumStock: number
}

export class SetMinimumStockUseCase {
  constructor(
    private productsRepository: ProductsRepository
  ) {}

  async execute({ productId, minimumStock }: SetMinimumStockUseCaseRequest) {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new Error('Product not found')
    }

    product.minimumStock = minimumStock

    await this.productsRepository.save(product)

    return product
  }
}