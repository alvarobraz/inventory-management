import { expect, test } from "vitest"
import { Supplier } from "./supplier"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

test('create a supplier', () => {
  const supplier = Supplier.create({
    name: 'Sample Supplier',
    contactInfo: 'contact@supplier.com'
  }, new UniqueEntityID('supp-123'))

  expect(supplier.name).toEqual('Sample Supplier')
  expect(supplier.contactInfo).toEqual('contact@supplier.com')
  expect(supplier.createdAt).toBeInstanceOf(Date)
  expect(supplier.updatedAt).toBeUndefined()
})

test('update supplier properties', () => {
  const supplier = Supplier.create({
    name: 'Sample Supplier',
    contactInfo: 'contact@supplier.com'
  }, new UniqueEntityID('supp-123'))

  supplier.name = 'Updated Supplier'
  supplier.contactInfo = 'newcontact@supplier.com'

  expect(supplier.name).toEqual('Updated Supplier')
  expect(supplier.contactInfo).toEqual('newcontact@supplier.com')
  expect(supplier.updatedAt).toBeInstanceOf(Date)
})