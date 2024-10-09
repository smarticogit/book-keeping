import {
  Statement,
  StatementResponse,
} from '@/domain/entities/types/statement.types'
import { StatementRepository } from '@/domain/repositories/statement-repository'

export class UpdateStatementUseCase {
  constructor(private statementRepository: StatementRepository) {}

  async run({ ...input }: Statement): Promise<StatementResponse | null> {
    const statementUpdated = await this.statementRepository.update(input)

    return statementUpdated
  }
}
