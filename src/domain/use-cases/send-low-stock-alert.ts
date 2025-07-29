import { Notification } from "../entities/notification"
import { NotificationsRepository } from "@/domain/repositories/notifications-repository"
import { ProductsRepository } from "../repositories/products-repository"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

interface SendLowStockAlertUseCaseRequest {
  productId: string
  type: 'email' | 'system'
}

export class SendLowStockAlertUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private notificationsRepository: NotificationsRepository
  ) {}

  async execute({ productId, type }: SendLowStockAlertUseCaseRequest) {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new Error('Product not found')
    }

    if (product.stockQuantity > product.minimumStock) {
      throw new Error('Stock is above minimum level')
    }

    const notification = Notification.create({
      productId: new UniqueEntityID(productId),
      message: `Low stock alert for product ${product.name}: ${product.stockQuantity} units remaining.`,
      type
    })

    await this.notificationsRepository.create(notification)

    return notification
  }
}