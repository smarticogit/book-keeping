import { UniqueEntityId } from '@/domain/entities/core/unique-entity-id'
import { Statement } from '@/domain/entities/types/statement.types'

export type Address = {
  street: string
  number: number
  complement?: string
  city: string
  state: string
  postalCode: string
  country: string
}

type BankAccount = {
  clientId: string
  bankName: string
  accountNumber: string
  branchNumber: string
  accountType: 'checking' | 'savings'
  statements?: Statement[]
}

export type Client = {
  id?: UniqueEntityId
  name: string
  email: string
  cpf?: string
  cnpj?: string
  address?: Address
  bankAccounts?: BankAccount[]
  createdAt: Date
  updatedAt: Date
}

export type ClientProps = Omit<Client, 'id'>

export type ClientRequest = {
  name: string
  email: string
  bankName: string
  statementDate: Date
  statementFile: Buffer
}

export type ClientCreateProps = {
  name: string
  email: string
  bankName: string
  statementDate: Date
  statementFile: Buffer
  statementKey: string
}

export type ClientResponse = {
  id?: string
  name: string
  email: string
  bankName: string
  statementDate: Date
  statementFile: Buffer
  statementKey: string
  createdAt: Date
  updatedAt: Date
}
