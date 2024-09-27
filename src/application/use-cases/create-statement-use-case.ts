import {
  StatementRequest,
  StatementResponse,
} from '@/domain/entities/types/statement.types'
import { StatementRepository } from '@/domain/repositories/statement-repository'
import { OCRService } from '@/domain/services/ocr-service'
import { StorageService } from '@/domain/services/storage-service'

export class CreateStatementUseCase {
  constructor(
    private s3Service: StorageService,
    private statementRepository: StatementRepository,
    private ocrService: OCRService,
  ) {}

  async run({ ...input }: StatementRequest): Promise<StatementResponse | null> {
    const uploadKey = await this.s3Service.upload(input.statementFile)

    if (!uploadKey) {
      return null
    }

    const statementCreated = await this.statementRepository.create({
      ...input,
      statementKey: uploadKey,
    })

    if (!statementCreated) {
      return null
    }

    return statementCreated
  }
}
