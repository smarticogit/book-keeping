import { UniqueEntityId } from '@/domain/entities/core/unique-entity-id'
import { AccountActivityRequest } from './account-activity.types'

export type Statement = {
  id: UniqueEntityId
  bankAccountId: string
  statementDate: Date
  fileUrl: string
  signedFileUrl: string
  accountActivity?: AccountActivityRequest[]
  createdAt: Date
  updatedAt: Date
}

export type StatementProps = Omit<Statement, 'id'>
export type StatementRequest = Omit<StatementProps, 'createdAt' | 'updatedAt'>
export type StatementResponse = Statement
