import { Client } from '@/domain/entities/client'
import { ClientRepository } from '@/domain/repositories/client-repository'

export class InMemoryClientRepository implements ClientRepository {
  public items: Client[] = []

  async create(client: Client) {
    this.items.push(client)
  }
}
