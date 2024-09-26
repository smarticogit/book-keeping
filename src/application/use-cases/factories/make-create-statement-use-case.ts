import { PrismaStatementRepository } from '@/infra/repositories/prisma-statement-repository'
import { S3StorageService } from '@/infra/services/s3-storage-service'
import { CreateStatementUseCase } from '../create-statement-use-case'

export function makeCreateStatementUseCase() {
  const statementRepository = new PrismaStatementRepository()
  const storageService = new S3StorageService()

  const createStatementUseCase = new CreateStatementUseCase(
    storageService,
    statementRepository,
  )

  return createStatementUseCase
}
