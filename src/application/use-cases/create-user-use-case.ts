import { UserRequest, UserResponse } from '@/domain/entities/types/user.types'
import { User } from '@/domain/entities/user.entity'
import { UserRepository } from '@/domain/repositories/user-repository'
import { hash } from 'bcryptjs'
import { UserEmailExistsError } from './erros/user-already-exists-error'

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async run({
    name,
    email,
    password,
  }: UserRequest): Promise<UserResponse | null> {
    const user = User.create({ name, email, password })
    const hashedPassword = await hash(user.password, 8)

    const existingUser = await this.userRepository.findByEmail(email)

    if (existingUser) {
      throw new UserEmailExistsError()
    }

    const userCreated = await this.userRepository.create({
      ...user,
      password: hashedPassword,
    })

    console.log('userCreated', userCreated)

    return user
  }
}
