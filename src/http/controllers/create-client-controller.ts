import { makeCreateClientUseCase } from '@/application/use-cases/factories/make-create-client-use-case'
import { ClientRequest } from '@/domain/entities/types/client.types'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function createClientController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, email, doc, statements } = request.body as ClientRequest

  const inputData: ClientRequest = {
    name,
    email,
    doc,
    statements: statements || [],
  }

  const createClientUseCase = makeCreateClientUseCase()
  const client = await createClientUseCase.run(inputData)

  return reply.status(201).send(client)
}

// const inputData: ClientRequest = {
//   name,
//   email,
//   bankName,
//   statementDate: new Date(statementDate),
//   statementFile: Buffer.from(statementFile, 'base64'),
// }
