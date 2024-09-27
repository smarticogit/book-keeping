import { makeCreateStatementUseCase } from '@/application/use-cases/factories/make-create-statement-use-case'
import { StatementRequest } from '@/domain/entities/types/statement.types'
import { MultipartFile, MultipartValue } from '@fastify/multipart'
import { FastifyReply, FastifyRequest } from 'fastify'

interface StatementMultipartRequest {
  statementFile: MultipartFile
  clientId: MultipartValue<string>
  bankName: MultipartValue<string>
}

export async function createStatementController(
  request: FastifyRequest<{ Body: StatementMultipartRequest }>,
  reply: FastifyReply,
) {
  const input = request.body

  if (!input.statementFile) {
    reply.status(400).send({ error: 'Arquivo não encontrado' })
    return
  }

  const fileBuffer = await input.statementFile.toBuffer()

  const CreateStatementUseCase = makeCreateStatementUseCase()

  const clientIdValue = input.clientId.value
  const bankNameValue = input.bankName.value

  const sendData: StatementRequest = {
    clientId: clientIdValue,
    bankName: bankNameValue,
    statementDate: new Date(),
    statementFile: fileBuffer,
  }

  await CreateStatementUseCase.run(sendData)

  return reply.status(201).send({ message: 'Hello World' })
}
