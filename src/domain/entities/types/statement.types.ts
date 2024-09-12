import { AccountActivity } from './account-activity.types'

export type Statement = {
  id: string
  bankAccountId: string
  statementDate: Date
  fileUrl: string
  signedFileUrl: string
  accountActivity: AccountActivity[]
  createdAt: Date
  updatedAt: Date
}

export type StatementProps = Omit<Statement, 'id'>
