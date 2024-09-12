import { UniqueEntityId } from '@/domain/entities/core/unique-entity-id'
import { Entity } from './core/entity'
import { UserProps } from './types/user.types'

export class User extends Entity<UserProps> {
  static create(
    props: Omit<UserProps, 'createdAt' | 'active'>,
    id?: UniqueEntityId,
  ) {
    const user = new User(
      {
        ...props,
        createdAt: new Date(),
        active: true,
      },
      id,
    )

    return user
  }

  get email() {
    return this.props.email
  }

  get name() {
    return this.props.name
  }

  get password() {
    return this.props.password
  }

  get createdAt() {
    return this.props.createdAt
  }

  get active() {
    return this.props.active
  }
}
