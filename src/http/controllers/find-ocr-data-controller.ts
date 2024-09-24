import { makeFindOCRDataUseCAse } from '@/application/use-cases/factories/make-find-ocr-data-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function findOCRDataController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findOcrDataUseCase = makeFindOCRDataUseCAse()
  const ocrData = await findOcrDataUseCase.run()

  return reply.status(201).send(ocrData)
}
