import { makeFindAllClientsUseCase } from '@/application/use-cases/factories/make-find-all-clients-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function findAllClientsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findAllClientsUseCase = makeFindAllClientsUseCase()
  const clients = await findAllClientsUseCase.run()

  return reply.status(200).send(clients)
}
