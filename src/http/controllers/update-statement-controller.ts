import { makeUpdateStatementUseCase } from '@/application/use-cases/factories/make-update-statement-use-case'
import { Statement } from '@/domain/entities/types/statement.types'

import { FastifyReply, FastifyRequest } from 'fastify'

export async function updateStatementController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const input = request.body as Statement
  const { id } = request.params as { id: string }

  const statement = {
    ...input,
    id,
  }

  const findStatementByIdUseCase = makeUpdateStatementUseCase()
  const statementUpdated = await findStatementByIdUseCase.run(statement)

  return reply.status(200).send(statementUpdated)
}
