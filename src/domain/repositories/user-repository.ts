import { User } from '@/domain/entities/user'

export type UserRepository = {
  create(user: User): Promise<void>
}
