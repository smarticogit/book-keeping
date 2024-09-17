import { ClientRequest } from '@/domain/entities/types/client.types'
import { ClientRepository } from '@/domain/repositories/client-repository'

export class PrismaClientRepository implements ClientRepository {
  async findByEmail(email: string) {
    console.log('email', email)

    return null
  }

  async create(client: ClientRequest) {
    console.log('client', client)
    return null
  }
}
