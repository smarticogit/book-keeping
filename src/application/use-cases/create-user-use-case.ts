import { UserRequest, UserResponse } from '@/domain/entities/types/user.types'
import { User } from '@/domain/entities/user.entity'
import { UserRepository } from '@/domain/repositories/user-repository'
import bcrypt from 'bcrypt'

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async run({ name, email, password }: UserRequest): Promise<UserResponse> {
    const user = User.create({ name, email, password })
    const hashedPassword = await bcrypt.hash(user.password, 8)

    await this.userRepository.create({
      ...user,
      password: hashedPassword,
    })

    return user
  }
}
