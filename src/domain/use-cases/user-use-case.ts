import { User } from '../entities/user-entity'
import { UserRepository } from '../repositories/user-repository'

interface UserProps {
  name: string
  email: string
  password: string
}
export class UserCreateUseCase {
  constructor(private userRepository: UserRepository) {}
  async run({ name, email, password }: UserProps) {
    const user = User.create({ name, email, password })

    await this.userRepository.create(user)

    return user
  }
}
