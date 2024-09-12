import { Client } from '@/domain/entities/client'
import { ClientProps } from '@/domain/entities/types/client.types'
import { ClientRepository } from '@/domain/repositories/client-repository'

export class ClientUseCase {
  constructor(private clientRepository: ClientRepository) {}
  async run(client: ClientProps) {
    const user = Client.create(client)

    await this.clientRepository.create(user)

    return user
  }
}
