import { CreateClientUseCase } from '@/application/use-cases/create-client-use-case'
import { PrismaClientRepository } from '@/infra/repositories/prisma-client-repository'

export function makeCreateClientUseCase() {
  const clientsRepository = new PrismaClientRepository()
  const createClientUseCase = new CreateClientUseCase(clientsRepository)

  return createClientUseCase
}
