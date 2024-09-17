import { UserRequest } from '@/domain/entities/types/user.types'
import { UserRepository } from '@/domain/repositories/user-repository'

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string) {
    console.log('email', email)

    return null
  }

  async create(user: UserRequest) {
    console.log('user', user)
    return null
  }
}
