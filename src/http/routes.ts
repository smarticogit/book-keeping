import { FastifyInstance } from 'fastify'
import { createClientController } from './controllers/create-client-controller'
import { createStatementController } from './controllers/create-statement-controller'
import { findAllClientsController } from './controllers/find-all-clients-controller'
import { findClientByIdController } from './controllers/find-client-by-id-controller'
import { findOCRDataController } from './controllers/find-ocr-data-controller'
import { findStatementByIdController } from './controllers/find-statement-by-id-controller'
import { processStatementController } from './controllers/process-statement-controller'
import { updateStatementController } from './controllers/update-statement-controller'

export async function routes(app: FastifyInstance) {
  app.post('/clients', createClientController)
  app.get('/clients', findAllClientsController)
  app.get('/clients/:id', findClientByIdController)
  app.post('/statements', createStatementController)
  app.get('/statements/:id', findStatementByIdController)
  app.put('/statements/:id', updateStatementController)
  app.get('/statements/ocr/:statementId', processStatementController)
  app.get('/ocr', findOCRDataController)
}
