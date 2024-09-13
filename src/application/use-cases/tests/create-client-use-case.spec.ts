import { CreateClientUseCase } from '@/application/use-cases/create-client-use-case'
import { makeClient } from '@/tests/factories/make-client'
import { InMemoryClientRepository } from '@/tests/repositories/in-memory-client-repository'

let inMemoryClientRepository: InMemoryClientRepository
let sut: CreateClientUseCase

describe('Create Client', () => {
  beforeEach(() => {
    inMemoryClientRepository = new InMemoryClientRepository()
    sut = new CreateClientUseCase(inMemoryClientRepository)
  })

  it('should be able to a create a client ', async () => {
    const newClient = makeClient()
    const clientCreated = await sut.run(newClient)

    expect(clientCreated.id).toBeTruthy()
  })
})
