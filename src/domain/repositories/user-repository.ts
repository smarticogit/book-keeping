import { UserRequest, UserResponse } from '@/domain/entities/types/user.types'
import { BaseRepository } from './base-repository'

export type UserRepository = BaseRepository<UserRequest, UserResponse>
