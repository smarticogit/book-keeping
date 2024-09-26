import { PrismaClientRepository } from '@/infra/repositories/prisma-client-repository'
import { FindClientByIdUseCase } from '../find-client-by-id-use-case'

export function makeFindClientUseCase() {
  const clientsRepository = new PrismaClientRepository()
  const findClientByIdUseCase = new FindClientByIdUseCase(clientsRepository)

  return findClientByIdUseCase
}
