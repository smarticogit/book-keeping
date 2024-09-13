import { BankAccount } from '@/domain/entities/bank-account.entity'
import {
  BankAccountRequest,
  BankAccountResponse,
} from '@/domain/entities/types/bank-account.types'
import { BankAccountRepository } from '@/domain/repositories/bank-account-repository'

export class CreateBankAccountUseCase {
  constructor(private bankAccountRepository: BankAccountRepository) {}

  async run({ ...input }: BankAccountRequest): Promise<BankAccountResponse> {
    const bankAccount = BankAccount.create(input)

    await this.bankAccountRepository.create(input)

    return bankAccount
  }
}
