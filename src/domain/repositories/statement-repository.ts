import {
  StatementRequest,
  StatementResponse,
  StatementUpdate,
} from '@/domain/entities/types/statement.types'

export interface StatementRepository {
  create: (statement: StatementRequest) => Promise<StatementResponse | null>
  findById: (statementId: string) => Promise<StatementResponse | null>
  update: (statement: StatementUpdate) => Promise<StatementResponse | null>
}
