import { FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createUserRequestValidator(request: FastifyRequest) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  })

  return createUserBodySchema.parse(request.body)
}
