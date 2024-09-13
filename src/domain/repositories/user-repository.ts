import { UserRequest, UserResponse } from '@/domain/entities/types/user.types'

export interface UserRepository {
  create: (user: UserRequest) => Promise<UserResponse | null>
}
