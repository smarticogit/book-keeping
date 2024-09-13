import { UniqueEntityId } from '@/domain/entities/core/unique-entity-id'
import { Entity } from './core/entity'
import { UserProps, UserRequest, UserResponse } from './types/user.types'

export class User extends Entity<UserProps> {
  static create(props: UserRequest, id?: UniqueEntityId): UserResponse {
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
