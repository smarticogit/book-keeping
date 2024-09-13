import { Statement } from '@/domain/entities/statement.entity'
import {
  StatementRequest,
  StatementResponse,
} from '@/domain/entities/types/statement.types'
import { StatementRepository } from '@/domain/repositories/statement-repository'

export class CreateStatementUseCase {
  constructor(private statementRepository: StatementRepository) {}

  async run({ ...input }: StatementRequest): Promise<StatementResponse> {
    const statement = Statement.create(input)

    await this.statementRepository.create(statement)

    return statement
  }
}
