import { StatementRequest } from '@/domain/entities/types/statement.types'

export interface StatementRepository {
  create(statement: StatementRequest): Promise<void>
}
