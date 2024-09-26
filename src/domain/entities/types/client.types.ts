import { UniqueEntityId } from '@/domain/entities/core/unique-entity-id'
import {
  Statement,
  StatementResponse,
} from '@/domain/entities/types/statement.types'

export type Client = {
  id?: UniqueEntityId
  name: string
  email: string
  doc: string
  statement?: Statement[]
  createdAt: Date
  updatedAt: Date
}

export type ClientProps = Omit<Client, 'id'>

export type ClientRequest = {
  name: string
  email: string
  doc: string
  statements?: Statement[]
}

export type ClientResponse = {
  id?: string
  name: string
  email: string
  doc: string
  statements?: StatementResponse[]
  createdAt: Date
  updatedAt: Date
}
