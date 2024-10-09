import { PrismaStatementRepository } from '@/infra/repositories/prisma-statement-repository'
import { FindStatementByIdUseCase } from '../find-statement-by-id-use-case'

export function makeStatementByIdUseCase() {
  const statementsRepository = new PrismaStatementRepository()
  const findStatementById = new FindStatementByIdUseCase(statementsRepository)

  return findStatementById
}
