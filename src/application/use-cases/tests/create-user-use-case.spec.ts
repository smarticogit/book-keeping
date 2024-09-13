import { CreateUserUseCase } from '@/application/use-cases/create-user-use-case'
import { makeUser } from '@/tests/factories/make-user'
import { InMemoryUserRepository } from '@/tests/repositories/in-memory-user-repository'

let inMemoryUserRepository: InMemoryUserRepository
let sut: CreateUserUseCase

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new CreateUserUseCase(inMemoryUserRepository)
  })

  it('should be able to a create a user', async () => {
    const newUser = makeUser()
    const userCreated = await sut.run(newUser)

    expect(userCreated.id).toBeTruthy()
  })
})
