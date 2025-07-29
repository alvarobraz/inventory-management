import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

interface SalesHistoryProps {
  productId: UniqueEntityID
  quantitySold: number
  profit: number
  periodStart: Date
  periodEnd: Date
  createdAt: Date
  updatedAt?: Date
}

export class SalesHistory extends Entity<SalesHistoryProps> {
  get productId() {
    return this.props.productId
  }

  get quantitySold() {
    return this.props.quantitySold
  }

  get profit() {
    return this.props.profit
  }

  get periodStart() {
    return this.props.periodStart
  }

  get periodEnd() {
    return this.props.periodEnd
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

  set quantitySold(quantity: number) {
    this.props.quantitySold = quantity
    this.touch()
  }

  set profit(profit: number) {
    this.props.profit = profit
    this.touch()
  }

  static create(
    props: Optional<SalesHistoryProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID
  ) {
    const salesHistory = new SalesHistory(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return salesHistory
  }
}