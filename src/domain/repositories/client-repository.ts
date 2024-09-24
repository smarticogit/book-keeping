import {
  ClientCreateProps,
  ClientResponse,
} from '@/domain/entities/types/client.types'

export interface ClientRepository {
  create: (client: ClientCreateProps) => Promise<ClientResponse | null>
}
