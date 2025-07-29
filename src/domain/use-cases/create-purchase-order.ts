import { PurchaseOrder } from "../entities/purchase-order"
import { PurchaseOrdersRepository } from "@/domain/repositories/purchase-orders-repository"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

interface CreatePurchaseOrderUseCaseRequest {
  supplierId: string
  productId: string
  quantity: number
}

export class CreatePurchaseOrderUseCase {
  constructor(
    private purchaseOrdersRepository: PurchaseOrdersRepository
  ) {}

  async execute({ supplierId, productId, quantity }: CreatePurchaseOrderUseCaseRequest) {
    const purchaseOrder = PurchaseOrder.create({
      supplierId: new UniqueEntityID(supplierId),
      productId: new UniqueEntityID(productId),
      quantity,
      status: 'pending'
    })

    await this.purchaseOrdersRepository.create(purchaseOrder)

    return purchaseOrder
  }
}