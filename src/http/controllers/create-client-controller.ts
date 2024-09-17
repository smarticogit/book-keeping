import { makeCreateClientUseCase } from '@/application/use-cases/factories/make-create-client-use-case'
import { createClientRequestValidator } from '@/http/validator/create-client-request-validator'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function createClientController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const inputData = await createClientRequestValidator(request)
  const createClientUseCase = makeCreateClientUseCase()

  await createClientUseCase.run(inputData)

  return reply.status(201).send({ message: 'Hello World' })
}
