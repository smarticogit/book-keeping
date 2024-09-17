import { makeCreateUserUseCase } from '@/application/use-cases/factories/make-create-user-use-case'
import { createUserRequestValidator } from '@/http/validator/create-user-request-validator'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const inputData = await createUserRequestValidator(request)
  const createUserUseCase = makeCreateUserUseCase()

  await createUserUseCase.run(inputData)

  return reply.status(201).send({ message: 'Hello World' })
}
