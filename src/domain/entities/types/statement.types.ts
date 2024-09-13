import { UniqueEntityId } from '@/domain/entities/core/unique-entity-id'
import { AccountActivity } from './account-activity.types'

export type Statement = {
  id: UniqueEntityId
  bankAccountId: string
  statementDate: Date
  fileUrl: string
  signedFileUrl: string
  accountActivity?: AccountActivity[]
  createdAt: Date
  updatedAt: Date
}

export type StatementProps = {
  bankAccountId: string
  statementDate: Date
  fileUrl: string
  signedFileUrl: string
  accountActivity?: AccountActivity[]
  createdAt: Date
  updatedAt: Date
}

export type StatementRequest = {
  bankAccountId: string
  statementDate: Date
  fileUrl: string
  signedFileUrl: string
  accountActivity?: AccountActivity[]
}

export type StatementResponse = {
  id: UniqueEntityId
  bankAccountId: string
  statementDate: Date
  fileUrl: string
  signedFileUrl: string
  accountActivity?: AccountActivity[]
  createdAt: Date
  updatedAt: Date
}
