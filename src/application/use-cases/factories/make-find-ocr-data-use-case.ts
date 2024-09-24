import { PrismaClientRepository } from '@/infra/repositories/prisma-client-repository'
import { OCRTextractExpense } from '@/infra/services/ocr-expense-service'
import { FindOCRDataUseCase } from '../find-ocr-data-use-case'

export function makeFindOCRDataUseCAse() {
  const clientsRepository = new PrismaClientRepository()
  const ocrService = new OCRTextractExpense()

  const createClientUseCase = new FindOCRDataUseCase(
    clientsRepository,
    ocrService,
  )

  return createClientUseCase
}
