import { UserRequest, UserResponse } from '@/domain/entities/types/user.types'
import { UserRepository } from '@/domain/repositories/user-repository'

export class InMemoryUserRepository implements UserRepository {
  public items: UserRequest[] = []

  async findByEmail(email: string): Promise<UserResponse | null> {
    console.log('email', email)
    return null
  }

  async create(user: UserRequest): Promise<UserResponse | null> {
    this.items.push(user)

    return null
  }
}
