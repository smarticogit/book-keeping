import { UniqueEntityId } from '@/domain/entities/core/unique-entity-id'
import { Entity } from './core/entity'
import { CategoryProps } from './types/category.types'

export class Category extends Entity<CategoryProps> {
  static create(props: CategoryProps, id?: UniqueEntityId) {
    const category = new Category(
      {
        ...props,
      },
      id,
    )

    return category
  }

  get name() {
    return this.props.name
  }

  get subCategory() {
    return this.props.subCategory
  }
}
