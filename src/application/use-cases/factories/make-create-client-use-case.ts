import { CreateClientUseCase } from '@/application/use-cases/create-client-use-case'
import { PrismaClientRepository } from '@/infra/repositories/prisma-client-repository'
import { OCRTextractExpense } from '@/infra/services/ocr-expense-service'
import { S3StorageService } from '@/infra/services/s3-storage-service'

export function makeCreateClientUseCase() {
  const clientsRepository = new PrismaClientRepository()
  const ocrService = new OCRTextractExpense()
  const s3Service = new S3StorageService()

  const createClientUseCase = new CreateClientUseCase(
    clientsRepository,
    ocrService,
    s3Service,
  )

  return createClientUseCase
}
