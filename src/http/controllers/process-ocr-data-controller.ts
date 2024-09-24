import { makeProcessOCRUseCAse } from '@/application/use-cases/factories/make-process-ocr-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function processOCRDataController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { key } = request.params as { key: string }

  if (!key) {
    return reply.status(400).send({ message: 'Missing key' })
  }

  const findOcrUseCase = makeProcessOCRUseCAse()
  await findOcrUseCase.run(key)

  return reply.status(200).send({ message: 'Process Complete' })
}
