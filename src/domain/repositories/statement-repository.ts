import {
  StatementRequest,
  StatementResponse,
} from '@/domain/entities/types/statement.types'

export interface StatementRepository {
  create: (statement: StatementRequest) => Promise<StatementResponse | null>
}
