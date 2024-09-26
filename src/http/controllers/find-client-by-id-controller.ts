import { makeFindClientUseCase } from '@/application/use-cases/factories/make-find-client-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function findClientByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id: statementId } = request.params as { id: string }

  const findClientUseCase = makeFindClientUseCase()
  const client = await findClientUseCase.run(statementId)

  return reply.status(201).send(client)
}
