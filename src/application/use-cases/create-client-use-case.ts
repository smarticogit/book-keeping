import {
  ClientRequest,
  ClientResponse,
} from '@/domain/entities/types/client.types'
import { ClientRepository } from '@/domain/repositories/client-repository'

export class CreateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async run({ ...input }: ClientRequest): Promise<ClientResponse | null> {
    const clientCreated = await this.clientRepository.create({
      ...input,
    })

    if (!clientCreated) {
      throw new Error('Client not created')
    }

    return clientCreated
  }
}

// const uploadKey = await this.s3Service.upload(input.statementFile)
