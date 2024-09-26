import {
  ClientRequest,
  ClientResponse,
} from '@/domain/entities/types/client.types'

export interface ClientRepository {
  create: (client: ClientRequest) => Promise<ClientResponse | null>
  findById: (id: string) => Promise<ClientResponse | null>
  findAll: () => Promise<ClientResponse[] | null>
}
