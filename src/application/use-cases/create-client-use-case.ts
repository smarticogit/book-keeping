import { Client } from '@/domain/entities/client'
import { ClientCreate } from '@/domain/entities/types/client.types'
import { ClientRepository } from '@/domain/repositories/client-repository'

type CreateClientUseCaseRequest = ClientCreate

type CreateClientUseCaseResponse = { client: ClientCreate }

export class CreateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async run({
    ...input
  }: CreateClientUseCaseRequest): Promise<CreateClientUseCaseResponse> {
    const client = Client.create(input)
    return { client }
  }
}
