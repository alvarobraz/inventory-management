import { expect, test } from "vitest"
import { Product } from "./product"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

test('create a product', () => {
  const product = Product.create({
    productId: 'prod-123',
    name: 'Sample Product',
    stockQuantity: 100,
    minimumStock: 10,
    size: 'M',
    color: 'Blue'
  }, new UniqueEntityID('prod-123'))

  expect(product.productId).toEqual('prod-123')
  expect(product.name).toEqual('Sample Product')
  expect(product.size).toEqual('M')
  expect(product.color).toEqual('Blue')
  expect(product.stockQuantity).toEqual(100)
  expect(product.minimumStock).toEqual(10)
  expect(product.createdAt).toBeInstanceOf(Date)
  expect(product.updatedAt).toBeUndefined()
})

test('update product properties', () => {
  const product = Product.create({
    productId: 'prod-123',
    name: 'Sample Product',
    stockQuantity: 100,
    minimumStock: 10
  }, new UniqueEntityID('prod-123'))

  product.name = 'Updated Product'
  product.stockQuantity = 50
  product.minimumStock = 5
  product.size = 'L'
  product.color = 'Red'

  expect(product.name).toEqual('Updated Product')
  expect(product.stockQuantity).toEqual(50)
  expect(product.minimumStock).toEqual(5)
  expect(product.size).toEqual('L')
  expect(product.color).toEqual('Red')
  expect(product.updatedAt).toBeInstanceOf(Date)
})