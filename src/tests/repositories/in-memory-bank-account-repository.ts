import {
  BankAccountRequest,
  BankAccountResponse,
} from '@/domain/entities/types/bank-account.types'
import { BankAccountRepository } from '@/domain/repositories/bank-account-repository'

export class InMemoryBankAccountRepository implements BankAccountRepository {
  public items: BankAccountRequest[] = []

  async create(
    bankAccount: BankAccountRequest,
  ): Promise<BankAccountResponse | null> {
    this.items.push(bankAccount)

    return null
  }
}
