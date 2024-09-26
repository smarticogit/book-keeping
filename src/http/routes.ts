import { FastifyInstance } from 'fastify'
import { createClientController } from './controllers/create-client-controller'
import { createStatementController } from './controllers/create-statement-controller'
import { findAllClientsController } from './controllers/find-all-clients-controller'
import { findClientByIdController } from './controllers/find-client-by-id-controller'
import { findOCRDataController } from './controllers/find-ocr-data-controller'
import { processOCRDataController } from './controllers/process-ocr-data-controller'

export async function routes(app: FastifyInstance) {
  app.post('/clients', createClientController)
  app.get('/clients', findAllClientsController)
  app.get('/clients/:id', findClientByIdController)
  app.post('/statements', createStatementController)
  app.get('/ocr/:key', processOCRDataController)
  app.get('/ocr', findOCRDataController)
}
