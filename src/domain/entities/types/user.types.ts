import { UniqueEntityId } from '@/domain/entities/core/unique-entity-id'

export type UserProps = {
  name: string
  email: string
  password: string
  createdAt: Date
  active: boolean
}

export type UserResponse = {
  id: UniqueEntityId
  name: string
  email: string
  password: string
  active: boolean
  createdAt: Date
}

export type UserRequest = {
  name: string
  email: string
  password: string
}
