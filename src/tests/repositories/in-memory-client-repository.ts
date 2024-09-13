import {
  ClientRequest,
  ClientResponse,
} from '@/domain/entities/types/client.types'
import { ClientRepository } from '@/domain/repositories/client-repository'

export class InMemoryClientRepository implements ClientRepository {
  public items: ClientRequest[] = []

  async create(client: ClientRequest): Promise<ClientResponse | null> {
    this.items.push(client)

    return null
  }
}
