import { CreateBankAccountUseCase } from '@/application/use-cases/create-bank-account-use-case'
import { makeBankAccount } from '@/tests/factories/make-bank-account'
import { InMemoryBankAccountRepository } from '@/tests/repositories/in-memory-bank-account-repository'

let inMemoryBankAccountRepository: InMemoryBankAccountRepository
let sut: CreateBankAccountUseCase

describe('Create BankAccount', () => {
  beforeEach(() => {
    inMemoryBankAccountRepository = new InMemoryBankAccountRepository()
    sut = new CreateBankAccountUseCase(inMemoryBankAccountRepository)
  })

  it('should be able to a create a bankAccount', async () => {
    const newBankAccount = makeBankAccount()
    const bankAccountCreated = await sut.run(newBankAccount)

    expect(bankAccountCreated.id).toBeTruthy()
  })
})
