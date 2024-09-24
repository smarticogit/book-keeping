import { PrismaClientRepository } from '@/infra/repositories/prisma-client-repository'
import { OCRTextractExpense } from '@/infra/services/ocr-expense-service'
import { FindOCRUseCase } from '../find-ocr-use-case'

export function makeFindOCRUseCAse() {
  const clientsRepository = new PrismaClientRepository()
  const ocrService = new OCRTextractExpense()

  const createClientUseCase = new FindOCRUseCase(clientsRepository, ocrService)

  return createClientUseCase
}
