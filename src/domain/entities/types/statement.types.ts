import { UniqueEntityId } from '@/domain/entities/core/unique-entity-id'

export type CategoryRequest = {
  name: string
}

export type AccountActivity = {
  id: UniqueEntityId
  statementId: string
  postDate: Date
  description: string
  debit: number
  credit: number
  balance: number
  beginningBalance: number
  endingBalance: number
  category?: CategoryRequest[]
}

export type Statement = {
  id: string
  clientId: string
  bankName: string
  statementDate: Date
  statementFile: Buffer
  statementKey: string
  accountActivity?: AccountActivity[]
  createdAt: Date
  updatedAt: Date
}

export type StatementResponse = {
  id: string
  clientId: string
  bankName: string
  statementDate: Date
  accountActivity?: AccountActivity[]
  createdAt: Date
  updatedAt: Date
}

export type StatementProps = Omit<Statement, 'id'>

export type StatementRequest = {
  clientId: string
  bankName: string
  statementDate?: Date
  statementFile: Buffer
  statementKey?: string
}
