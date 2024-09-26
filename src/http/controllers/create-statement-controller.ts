import { makeCreateStatementUseCase } from '@/application/use-cases/factories/make-create-statement-use-case'
import { StatementRequest } from '@/domain/entities/types/statement.types'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function createStatementController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const statement = request.body as StatementRequest
  const CreateStatementUseCase = makeCreateStatementUseCase()

  await CreateStatementUseCase.run({
    ...statement,
  })

  return reply.status(201).send({ message: 'Hello World' })
}
