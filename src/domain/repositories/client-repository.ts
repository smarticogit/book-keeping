import { Client } from '@/domain/entities/client'

export interface ClientRepository {
  create(client: Client): Promise<void>
}
