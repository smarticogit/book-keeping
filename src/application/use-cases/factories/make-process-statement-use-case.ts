import { PrismaStatementRepository } from '@/infra/repositories/prisma-statement-repository'
import { OCRTextractExpense } from '@/infra/services/ocr-expense-service'
import { ProcessStatementUseCase } from '../process-statement-use-case'

export function makeProcessStatementUseCase() {
  const statementRepository = new PrismaStatementRepository()
  const ocrService = new OCRTextractExpense()

  const createClientUseCase = new ProcessStatementUseCase(
    statementRepository,
    ocrService,
  )

  return createClientUseCase
}
