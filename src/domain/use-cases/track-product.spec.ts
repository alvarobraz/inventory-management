import { expect, test } from "vitest"
import { TrackProductUseCase } from "./track-product"
import { ProductsRepository } from "../repositories/products-repository"
import { Product } from "../entities/product"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

const fakeProductsRepository: ProductsRepository = {
  async create(product: Product) {
    return
  },
  async findById(id: string) {
    return Product.create(
      {
        productId: id,
        name: 'Sample Product',
        stockQuantity: 100,
        minimumStock: 10
      },
      new UniqueEntityID(id)
    )
  },
  async save(data: Product) {
    return data
  }
}

test('track a product', async () => {
  const trackProduct = new TrackProductUseCase(fakeProductsRepository)

  const product = await trackProduct.execute({
    productId: 'prod-123',
    name: 'Sample Product',
    stockQuantity: 100,
    minimumStock: 10,
    size: 'M',
    color: 'Blue'
  })

  expect(product.productId).toEqual('prod-123')
  expect(product.name).toEqual('Sample Product')
  expect(product.size).toEqual('M')
  expect(product.color).toEqual('Blue')
  expect(product.stockQuantity).toEqual(100)
  expect(product.minimumStock).toEqual(10)
  expect(product.createdAt).toBeInstanceOf(Date)
  expect(product.updatedAt).toBeUndefined()
})