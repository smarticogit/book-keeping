import { makeFindOCRUseCAse } from '@/application/use-cases/factories/make-ocr-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function findOCRController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { key } = request.params as { key: string }

  if (!key) {
    return reply.status(400).send({ message: 'Missing key' })
  }

  const findOcrUseCase = makeFindOCRUseCAse()
  const ocr = await findOcrUseCase.run(key)
  console.log('ocr result', ocr)

  return reply.status(201).send('OCR')
}
