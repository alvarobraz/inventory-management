import { expect, test } from "vitest"
import { IntegrateWithSupplierUseCase } from "./integrate-with-supplier"
import { SuppliersRepository } from "../repositories/suppliers-repository"
import { Supplier } from "../entities/supplier"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

const fakeSuppliersRepository: SuppliersRepository = {
  async findById(id: string) {
    if (id === 'supp-123') {
      return Supplier.create(
        {
          name: 'Sample Supplier',
          contactInfo: 'contact@supplier.com'
        },
        new UniqueEntityID(id)
      )
    }
    return null
  },
  async fetchDeliveryUpdates(id: string) {
    if (id === 'supp-123') {
      return Supplier.create(
        {
          name: 'Sample Supplier',
          contactInfo: 'contact@supplier.com'
        },
        new UniqueEntityID(id)
      )
    }
    return null
  }
}

test('integrate with supplier and fetch delivery updates', async () => {
  const integrateWithSupplier = new IntegrateWithSupplierUseCase(fakeSuppliersRepository)

  const deliveryUpdates = await integrateWithSupplier.execute({
    supplierId: 'supp-123'
  })

  expect(deliveryUpdates).not.toBeNull()
  if (deliveryUpdates) {
    expect(deliveryUpdates.name).toEqual('Sample Supplier')
    expect(deliveryUpdates.contactInfo).toEqual('contact@supplier.com')
  }
})

test('throw error when supplier is not found', async () => {
  const integrateWithSupplier = new IntegrateWithSupplierUseCase(fakeSuppliersRepository)

  await expect(
    integrateWithSupplier.execute({
      supplierId: 'non-existent-supp'
    })
  ).rejects.toThrow('Supplier not found')
})