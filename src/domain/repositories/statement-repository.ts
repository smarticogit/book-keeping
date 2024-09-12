import { Statement } from '@/domain/entities/statement'

export interface StatementRepository {
  create(statement: Statement): Promise<void>
}
