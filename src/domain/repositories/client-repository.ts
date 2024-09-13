import { ClientRequest, ClientResponse } from '../entities/types/client.types'
import { BaseRepository } from './base-repository'

export type ClientRepository = BaseRepository<ClientRequest, ClientResponse>
