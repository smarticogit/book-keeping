import { makeStatementByIdUseCase } from '@/application/use-cases/factories/make-find-statement-by-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function findStatementByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id: statementId } = request.params as { id: string }

  const findStatementByIdUseCase = makeStatementByIdUseCase()
  const statement = await findStatementByIdUseCase.run(statementId)

  return reply.status(200).send(statement)
}
