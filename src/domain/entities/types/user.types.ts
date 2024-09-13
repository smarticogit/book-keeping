import { UniqueEntityId } from '@/domain/entities/core/unique-entity-id'

export type User = {
  id: UniqueEntityId
  name: string
  email: string
  password: string
  active: boolean
  createdAt: Date
}

export type UserProps = Omit<User, 'id'>
export type UserRequest = Omit<UserProps, 'createdAt' | 'active'>
export type UserResponse = User
