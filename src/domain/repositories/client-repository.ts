import { ClientRequest } from '../entities/types/client.types'

export interface ClientRepository {
  create(client: ClientRequest): Promise<void>
}
