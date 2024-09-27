import { PrismaStatementRepository } from '@/infra/repositories/prisma-statement-repository'
import { OCRTextractExpense } from '@/infra/services/ocr-expense-service'
import { ProcessStatementUseCase } from '../process-statement-use-case'
import { S3StorageService } from '@/infra/services/s3-storage-service'

export function makeProcessStatementUseCase() {
  const statementRepository = new PrismaStatementRepository()
  const ocrService = new OCRTextractExpense()
  const storageService = new S3StorageService()

  const createClientUseCase = new ProcessStatementUseCase(
    statementRepository,
    ocrService,
    storageService,
  )

  return createClientUseCase
}
