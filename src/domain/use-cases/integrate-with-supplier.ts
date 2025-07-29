import { SuppliersRepository } from "@/domain/repositories/suppliers-repository"

interface IntegrateWithSupplierUseCaseRequest {
  supplierId: string
}

export class IntegrateWithSupplierUseCase {
  constructor(
    private suppliersRepository: SuppliersRepository
  ) {}

  async execute({ supplierId }: IntegrateWithSupplierUseCaseRequest) {
    const supplier = await this.suppliersRepository.findById(supplierId)

    if (!supplier) {
      throw new Error('Supplier not found')
    }

    const deliveryUpdates = await this.suppliersRepository.fetchDeliveryUpdates(supplierId)

    return deliveryUpdates
  }
}