import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'
import { routes } from './http/routes'

export const app = fastify()

const prisma = new PrismaClient()

prisma.client.create({
  data: {
    name: 'John Doe',
    email: 'qXj5Z@example.com',
    bankAccounts: {
      create: {
        bankName: 'Bank Name',
        accountNumber: 'Account Number',
        branchNumber: 'Branch Number',
        accountType: 'checking',
      },
    },
    address: {
      create: {
        street: 'Street',
        number: '123',
        city: 'City',
        state: 'State',
        country: 'Country',
        zipCode: 'ZipCode',
      },
    },
  },
})

app.register(routes)
