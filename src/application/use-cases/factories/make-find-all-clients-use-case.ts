import { PrismaClientRepository } from '@/infra/repositories/prisma-client-repository'
import { FindAllClientsByIdUseCase } from '../find-all-clients-use-case'

export function makeFindAllClientsUseCase() {
  const clientsRepository = new PrismaClientRepository()
  const findAllClientsByIdUseCase = new FindAllClientsByIdUseCase(
    clientsRepository,
  )

  return findAllClientsByIdUseCase
}
