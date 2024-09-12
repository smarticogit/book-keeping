import { BankAccount } from './bank-account.types'

type Address = {
  street: string
  number: string
  complement?: string
  city: string
  state: string
  postalCode: string
  country: string
}

export type Client = {
  id: string
  name: string
  email: string
  cpf?: string
  cnpj?: string
  address: Address
  bankAccounts: BankAccount[]
  createdAt: Date
  updatedAt: Date
}

export type ClientProps = Omit<Client, 'id'>
