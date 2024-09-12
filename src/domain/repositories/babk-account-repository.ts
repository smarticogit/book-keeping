import { BankAccount } from '@/domain/entities/bank-account'

export interface BankAccountRepository {
  create(bankAccount: BankAccount): Promise<void>
}
