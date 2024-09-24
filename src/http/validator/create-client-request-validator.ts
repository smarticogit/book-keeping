import { FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createClientRequestValidator(request: FastifyRequest) {
  const createClientBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    cpf: z.string().optional(),
    cnpj: z.string().optional(),
    address: z
      .object({
        street: z.string(),
        number: z.number(),
        complement: z.string().optional(),
        city: z.string(),
        state: z.string(),
        postalCode: z.string(),
        country: z.string(),
      })
      .optional(),
    bankAccounts: z.array(z.any()).optional(),
  })

  return createClientBodySchema.parse(request.body)
}
