import { UserProps } from '@/domain/entities/types/user.types'
import { User } from '@/domain/entities/user'
import { UserRepository } from '@/domain/repositories/user-repository'

export class UserCreateUseCase {
  constructor(private userRepository: UserRepository) {}
  async run({ name, email, password }: UserProps) {
    const user = User.create({ name, email, password })

    await this.userRepository.create(user)

    return user
  }
}
