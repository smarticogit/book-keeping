import { FastifyInstance } from 'fastify'
import { createClientController } from './controllers/create-client-controller'
import { findOCRDataController } from './controllers/find-ocr-data-controller'
import { processOCRDataController } from './controllers/process-ocr-data-controller'

export async function routes(app: FastifyInstance) {
  app.post('/clients', createClientController)
  app.get('/ocr/:key', processOCRDataController)
  app.get('/ocr', findOCRDataController)
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
