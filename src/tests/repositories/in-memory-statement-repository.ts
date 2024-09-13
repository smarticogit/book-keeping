import {
  StatementRequest,
  StatementResponse,
} from '@/domain/entities/types/statement.types'
import { StatementRepository } from '@/domain/repositories/statement-repository'

export class InMemoryStatementRepository implements StatementRepository {
  public items: StatementRequest[] = []

  async create(statement: StatementRequest): Promise<StatementResponse | null> {
    this.items.push(statement)

    return null
  }
}
