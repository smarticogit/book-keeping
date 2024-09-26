import { ClientResponse } from '@/domain/entities/types/client.types'
import { ClientRepository } from '@/domain/repositories/client-repository'

export class FindAllClientsByIdUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async run(): Promise<ClientResponse[] | null> {
    const clients = await this.clientRepository.findAll()

    if (!clients) {
      return null
    }
    return clients
  }
}
