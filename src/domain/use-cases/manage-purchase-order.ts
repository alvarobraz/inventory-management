import { PurchaseOrdersRepository } from "@/domain/repositories/purchase-orders-repository"

interface ManagePurchaseOrderUseCaseRequest {
  purchaseOrderId: string
  quantity?: number
  status?: 'pending' | 'completed' | 'canceled'
}

export class ManagePurchaseOrderUseCase {
  constructor(
    private purchaseOrdersRepository: PurchaseOrdersRepository
  ) {}

  async execute({ purchaseOrderId, quantity, status }: ManagePurchaseOrderUseCaseRequest) {
    const purchaseOrder = await this.purchaseOrdersRepository.findById(purchaseOrderId)

    if (!purchaseOrder) {
      throw new Error('Purchase order not found')
    }

    if (quantity !== undefined) {
      purchaseOrder.quantity = quantity
    }

    if (status !== undefined) {
      purchaseOrder.status = status
    }

    await this.purchaseOrdersRepository.save(purchaseOrder)

    return purchaseOrder
  }
}