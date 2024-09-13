import { Statement } from './statement.types'

export type BankAccount = {
  clientId: string
  bankName: string
  accountNumber: string
  branchNumber: string
  accountType: 'checking' | 'savings'
  statements?: Statement[]
  createdAt: Date
}

export type BankAccountProps = {
  clientId: string
  bankName: string
  accountNumber: string
  branchNumber: string
  accountType: 'checking' | 'savings'
  statements?: Statement[]
  createdAt: Date
}

export type BankAccountRequest = {
  clientId: string
  bankName: string
  accountNumber: string
  branchNumber: string
  accountType: 'checking' | 'savings'
  statements?: Statement[]
}
