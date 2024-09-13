import { Statement } from '@/domain/entities/types/statement.types'
import { UniqueEntityId } from '../core/unique-entity-id'

export type BankAccount = {
  id: UniqueEntityId
  clientId: string
  bankName: string
  accountNumber: string
  branchNumber: string
  accountType: 'checking' | 'savings'
  statements?: Statement[]
}

export type BankAccountProps = Omit<BankAccount, 'id'>
export type BankAccountRequest = Omit<
  BankAccountProps,
  'createdAt' | 'updatedAt'
>
export type BankAccountResponse = BankAccount
