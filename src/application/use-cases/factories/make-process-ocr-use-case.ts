import { PrismaClientRepository } from '@/infra/repositories/prisma-client-repository'
import { OCRTextractExpense } from '@/infra/services/ocr-expense-service'
import { ProcessOCRUseCase } from '../process-ocr-use-case'

export function makeProcessOCRUseCAse() {
  const clientsRepository = new PrismaClientRepository()
  const ocrService = new OCRTextractExpense()

  const createClientUseCase = new ProcessOCRUseCase(
    clientsRepository,
    ocrService,
  )

  return createClientUseCase
}
