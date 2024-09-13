import { makeStatement } from '@/tests/factories/make-statement'
import { InMemoryStatementRepository } from '@/tests/repositories/in-memory-statement-repository'
import { CreateStatementUseCase } from '../create-statement-use-case'

let inMemoryStatementRepository: InMemoryStatementRepository
let sut: CreateStatementUseCase

describe('Create Statement', () => {
  beforeEach(() => {
    inMemoryStatementRepository = new InMemoryStatementRepository()
    sut = new CreateStatementUseCase(inMemoryStatementRepository)
  })

  it('should be able to a create a statement ', async () => {
    const newStatement = makeStatement()
    const userCreated = await sut.run(newStatement)

    expect(userCreated.id).toBeTruthy()
  })
})
