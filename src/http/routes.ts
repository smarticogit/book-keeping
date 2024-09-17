import { FastifyInstance } from 'fastify'
import { createClientController } from './controllers/create-client-controller'
import { createUserController } from './controllers/create-user-controller'
import { createClientRequestValidator } from './validator/create-client-request-validator'
import { createUserRequestValidator } from './validator/create-user-request-validator'

export async function routes(app: FastifyInstance) {
  app.post(
    '/users',
    {
      preHandler: [createUserRequestValidator],
    },
    createUserController,
  )

  app.post(
    '/clients',
    {
      preHandler: [createClientRequestValidator],
    },
    createClientController,
  )
}
