import {
  ClientRequest,
  ClientResponse,
} from '@/domain/entities/types/client.types'
import { ClientRepository } from '@/domain/repositories/client-repository'
import { OCRService } from '@/domain/services/ocr-service'
import { S3StorageService } from '@/infra/services/s3-storage-service'

export class CreateClientUseCase {
  constructor(
    private clientRepository: ClientRepository,
    private ocrService: OCRService,
    private s3Service: S3StorageService,
  ) {}

  async run({ ...input }: ClientRequest): Promise<ClientResponse | null> {
    const uploadKey = await this.s3Service.upload(input.statementFile)

    if (!uploadKey) {
      return null
    }

    const clientCreated = await this.clientRepository.create({
      ...input,
      statementKey: uploadKey,
    })

    if (!clientCreated) {
      return null
    }

    return clientCreated
  }
}
