import { BankAccount } from '@/domain/entities/bank-account.entity'
import { faker } from '@faker-js/faker'

export function makeBankAccount(override: Partial<BankAccount> = {}) {
  const bankAccount = BankAccount.create({
    clientId: faker.string.uuid(),
    branchNumber: faker.string.uuid(),
    bankName: faker.finance.accountName(),
    accountNumber: faker.finance.accountNumber(),
    accountType: faker.helpers.arrayElement(['checking', 'savings']),
    ...override,
  })

  return bankAccount
}
