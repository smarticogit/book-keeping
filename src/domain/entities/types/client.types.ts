import { UniqueEntityId } from '../core/unique-entity-id'
import { BankAccountRequest } from './bank-account.types'

type Address = {
  street: string
  number: number
  complement?: string
  city: string
  state: string
  postalCode: string
  country: string
}

export type ClientProps = {
  name: string
  email: string
  cpf?: string
  cnpj?: string
  address: Address
  bankAccounts: BankAccountRequest[]
  createdAt: Date
  updatedAt: Date
}

export type ClientRequest = {
  name: string
  email: string
  cpf?: string
  cnpj?: string
  address: Address
  bankAccounts: BankAccountRequest[]
}

export type ClientResponse = {
  id: UniqueEntityId
  name: string
  email: string
  cpf?: string
  cnpj?: string
  address: Address
  bankAccounts: BankAccountRequest[]
  createdAt: Date
  updatedAt: Date
}
