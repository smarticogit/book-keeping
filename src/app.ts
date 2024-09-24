import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import fastify from 'fastify'
import { routes } from './http/routes'

export const app = fastify({
  bodyLimit: 104857600,
})

app.register(multipart)

app.register(cors, {
  origin: '*',
})

app.register(routes)
