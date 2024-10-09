import { StatementResponse } from '@/domain/entities/types/statement.types'
import { StatementRepository } from '@/domain/repositories/statement-repository'

export class FindStatementByIdUseCase {
  constructor(private statementRepository: StatementRepository) {}

  async run(statementId: string): Promise<StatementResponse | null> {
    const statement = await this.statementRepository.findById(statementId)
    return statement
  }
}
