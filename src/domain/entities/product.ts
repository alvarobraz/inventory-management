import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

interface ProductProps {
  name: string
  productId: string 
  size?: string 
  color?: string 
  stockQuantity: number 
  minimumStock: number 
  createdAt: Date
  updatedAt?: Date
}

export class Product extends Entity<ProductProps> {
  get name() {
    return this.props.name
  }

  get productId() {
    return this.props.productId
  }

  get size() {
    return this.props.size
  }

  get color() {
    return this.props.color
  }

  get stockQuantity() {
    return this.props.stockQuantity
  }

  get minimumStock() {
    return this.props.minimumStock
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

  set stockQuantity(quantity: number) {
    this.props.stockQuantity = quantity
    this.touch()
  }

  set minimumStock(minimum: number) {
    this.props.minimumStock = minimum
    this.touch()
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set size(size: string | undefined) {
    this.props.size = size
    this.touch()
  }

  set color(color: string | undefined) {
    this.props.color = color
    this.touch()
  }

  static create(
    props: Optional<ProductProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID
  ) {
    const product = new Product(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return product
  }
}