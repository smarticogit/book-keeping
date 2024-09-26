import { ClientResponse } from '@/domain/entities/types/client.types'
import { ClientRepository } from '@/domain/repositories/client-repository'

export class FindClientByIdUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async run(statementId: string): Promise<ClientResponse | null> {
    const client = await this.clientRepository.findById(statementId)
    return client
  }
}

// const uploadKey = await this.s3Service.upload(input.statementFile)
