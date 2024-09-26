import {
  StatementRequest,
  StatementResponse,
} from '@/domain/entities/types/statement.types'
import { StatementRepository } from '@/domain/repositories/statement-repository'
import { StorageService } from '@/domain/services/storage-service'

export class CreateStatementUseCase {
  constructor(
    private s3Service: StorageService,
    private statementRepository: StatementRepository,
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

    // const data = this.ocrService.dataFormat('./output.json')

    // if (!data) {
    //   return null
    // }

    return statementCreated
  }
}
