import { UniqueEntityId } from '../core/unique-entity-id'
import { AccountActivity } from './account-activity.types'

export type Statement = {
  id: UniqueEntityId
  bankAccountId: string
  statementDate: Date
  fileUrl: string
  signedFileUrl: string
  accountActivity: AccountActivity[]
  createdAt: Date
  updatedAt: Date
}

export type StatementProps = Omit<Statement, 'id'>

export type StatementRequest = {
  bankAccountId: string
  statementDate: Date
  fileUrl: string
  signedFileUrl: string
  accountActivity: AccountActivity[]
}
