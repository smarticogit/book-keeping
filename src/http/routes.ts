import { FastifyInstance } from 'fastify'
import { createClientController } from './controllers/create-client-controller'
import { findOCRController } from './controllers/find-ocr-controller'

export async function routes(app: FastifyInstance) {
  app.post('/clients', createClientController)
  app.get('/ocr/:key', findOCRController)
}

// app.post(
//   '/clients',
//   {
//     preHandler: [createClientRequestValidator],
//   },
//   createClientController,
// )

// app.post(
//   '/users',
//   {
//     preHandler: [createUserRequestValidator],
//   },
//   createUserController,
// )
