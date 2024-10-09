import { UniqueEntityId } from '@/domain/entities/core/unique-entity-id'

export type CategoryRequest = {
  name: string
}

export type AccountActivity = {
  id: UniqueEntityId
  statementId: string
  postDate: string
  description: string
  debit: string
  credit: string
  balance: string
  category?: string | null
}

export type AccountActivityUpdate = {
  postDate: string
  description: string
  debit: string
  credit: string
  balance: string
  category?: string | null
}

export type Statement = {
  id: string
  clientId: string
  bankName: string
  customerName: string
  customerNumber: string
  accountType: string
  accountNumber: string
  beginningBalance: string
  endingBalance: string
  statementDate: string
  statementFile: Buffer
  statementKey: string
  accountActivity?: AccountActivityUpdate[]
  createdAt: Date
  updatedAt: Date
}

export type StatementResponse = {
  id: string
  clientId: string
  bankName: string
  customerName: string
  customerNumber: string
  accountType: string
  accountNumber: string
  beginningBalance: string
  endingBalance: string
  statementDate: string
  statementKey: string
  accountActivity?: AccountActivityUpdate[]
  createdAt: Date
  updatedAt: Date
}

export type StatementProps = Omit<Statement, 'id'>

export type StatementUpdate = {
  id: string
  bankName: string
  customerName: string
  customerNumber: string
  accountType: string
  accountNumber: string
  beginningBalance: string
  endingBalance: string
  statementDate: string
  accountActivity?: AccountActivityUpdate[]
}

export type StatementRequest = {
  clientId: string
  bankName: string
  statementDate?: string
  statementFile: Buffer
  statementKey: string
  accountType: string
  accountNumber: string
  accountActivity?: AccountActivityUpdate[]
}
