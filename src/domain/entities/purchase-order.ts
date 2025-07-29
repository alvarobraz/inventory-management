import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

interface PurchaseOrderProps {
  supplierId: UniqueEntityID
  productId: UniqueEntityID
  quantity: number
  status: 'pending' | 'completed' | 'canceled'
  createdAt: Date
  updatedAt?: Date
}

export class PurchaseOrder extends Entity<PurchaseOrderProps> {
  get supplierId() {
    return this.props.supplierId
  }

  get productId() {
    return this.props.productId
  }

  get quantity() {
    return this.props.quantity
  }

  get status() {
    return this.props.status
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set quantity(quantity: number) {
    this.props.quantity = quantity
    this.touch()
  }

  set status(status: 'pending' | 'completed' | 'canceled') {
    this.props.status = status
    this.touch()
  }

  static create(
    props: Optional<PurchaseOrderProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID
  ) {
    const purchaseOrder = new PurchaseOrder(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return purchaseOrder
  }
}