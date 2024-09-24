import { makeCreateClientUseCase } from '@/application/use-cases/factories/make-create-client-use-case'
import { ClientRequest } from '@/domain/entities/types/client.types'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function createClientController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, email, bankName, statementDate, statementFile } =
    request.body as {
      name: string
      email: string
      bankName: string
      statementDate: string
      statementFile: string
    }

  const date = new Date(statementDate)
  if (isNaN(date.getTime())) {
    return reply.status(400).send({ message: 'Invalid date format' })
  }

  const inputData: ClientRequest = {
    name,
    email,
    bankName,
    statementDate: new Date(statementDate),
    statementFile: Buffer.from(statementFile, 'base64'),
  }

  const createClientUseCase = makeCreateClientUseCase()
  const client = await createClientUseCase.run(inputData)

  return reply.status(201).send(client)
}
