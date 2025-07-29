import { expect, test } from "vitest"
import { SetMinimumStockUseCase } from "./set-minimum-stock"
import { ProductsRepository } from "../repositories/products-repository"
import { Product } from "../entities/product"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

const fakeProductsRepository: ProductsRepository = {
  async create(product: Product) {
    return
  },
  async findById(id: string) {
    if (id === 'prod-123') {
      return Product.create(
        {
          productId: id,
          name: 'Sample Product',
          stockQuantity: 100,
          minimumStock: 10
        },
        new UniqueEntityID(id)
      )
    }
    return null
  },
  async save(product: Product) {
    return product
  }
}

test('set minimum stock for a product', async () => {
  const setMinimumStock = new SetMinimumStockUseCase(fakeProductsRepository)

  const product = await setMinimumStock.execute({
    productId: 'prod-123',
    minimumStock: 20
  })

  expect(product.minimumStock).toEqual(20)
  expect(product.updatedAt).toBeInstanceOf(Date)
})

test('throw error when product is not found', async () => {
  const setMinimumStock = new SetMinimumStockUseCase(fakeProductsRepository)

  await expect(
    setMinimumStock.execute({
      productId: 'non-existent-prod',
      minimumStock: 20
    })
  ).rejects.toThrow('Product not found')
})