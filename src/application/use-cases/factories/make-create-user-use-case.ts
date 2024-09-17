import { CreateUserUseCase } from '@/application/use-cases/create-user-use-case'
import { PrismaUserRepository } from '@/infra/repositories/prisma-user-repository'

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUserRepository()
  const createUserUseCase = new CreateUserUseCase(usersRepository)

  return createUserUseCase
}
