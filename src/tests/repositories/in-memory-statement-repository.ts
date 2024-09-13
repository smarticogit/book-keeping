import { Statement } from '@/domain/entities/statement'
import { StatementRepository } from '@/domain/repositories/statement-repository'

export class InMemoryStatementRepository implements StatementRepository {
  public items: Statement[] = []

  async create(statement: Statement) {
    this.items.push(statement)
  }
}
