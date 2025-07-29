import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

interface StockProps {
  productId: UniqueEntityID
  quantity: number
  createdAt: Date
  updatedAt?: Date
}

export class Stock extends Entity<StockProps> {
  get productId() {
    return this.props.productId
  }

  get quantity() {
    return this.props.quantity
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

  static create(
    props: Optional<StockProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID
  ) {
    const stock = new Stock(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return stock
  }
}