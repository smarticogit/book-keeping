import { makeProcessStatementUseCase } from '@/application/use-cases/factories/make-process-statement-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function processStatementController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { statementId } = request.params as { statementId: string }

  if (!statementId) {
    return reply.status(400).send({ message: 'Missing statementId' })
  }

  const processStatementUseCase = makeProcessStatementUseCase()
  const data = await processStatementUseCase.run(statementId)

  console.log('respose Http: ', data)

  return reply.status(200).send(data)
}
