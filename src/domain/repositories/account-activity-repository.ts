import {
  AccountActivityRequest,
  AccountActivityResponse,
} from '@/domain/entities/types/account-activity.types'
import { BaseRepository } from './base-repository'

export type AccountActivityRepository = BaseRepository<
  AccountActivityRequest,
  AccountActivityResponse
>
