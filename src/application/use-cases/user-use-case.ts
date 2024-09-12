import { User } from '@/domain/entities/user'
import { UserRepository } from '@/domain/repositories/user-repository'

type UserProps = {
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
