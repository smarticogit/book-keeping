import {
  StatementRequest,
  StatementResponse,
} from '@/domain/entities/types/statement.types'
import { BaseRepository } from './base-repository'

export type StatementRepository = BaseRepository<
  StatementRequest,
  StatementResponse
>
