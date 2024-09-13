import { CreateAccountActivityUseCase } from '@/application/use-cases/create-account-activity-use-case'
import { makeAccountActivity } from '@/tests/factories/make-account-activity'
import { InMemoryAccountActivityRepository } from '@/tests/repositories/in-memory-account-activity-repository'

let inMemoryAccountActivityRepository: InMemoryAccountActivityRepository
let sut: CreateAccountActivityUseCase

describe('Create AccountActivity', () => {
  beforeEach(() => {
    inMemoryAccountActivityRepository = new InMemoryAccountActivityRepository()
    sut = new CreateAccountActivityUseCase(inMemoryAccountActivityRepository)
  })

  it('should be able to a create a account activity ', async () => {
    const newAccountActivity = makeAccountActivity()
    const accountActivityCreated = await sut.run(newAccountActivity)

    expect(accountActivityCreated.id).toBeTruthy()
  })
})
