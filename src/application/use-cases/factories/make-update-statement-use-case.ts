import { PrismaStatementRepository } from '@/infra/repositories/prisma-statement-repository'
import { UpdateStatementUseCase } from '../update-statement-use-case'

export function makeUpdateStatementUseCase() {
  const statementsRepository = new PrismaStatementRepository()
  const updateStatement = new UpdateStatementUseCase(statementsRepository)

  return updateStatement
}
