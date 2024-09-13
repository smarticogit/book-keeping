import { Client } from '@/domain/entities/client'
import {
  ClientRequest,
  ClientResponse,
} from '@/domain/entities/types/client.types'
import { ClientRepository } from '@/domain/repositories/client-repository'

export class CreateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async run({ ...input }: ClientRequest): Promise<ClientResponse> {
    const client = Client.create(input)

    await this.clientRepository.create(client)

    return client
  }
}
