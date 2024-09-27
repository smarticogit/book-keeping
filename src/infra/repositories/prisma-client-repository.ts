import {
  ClientRequest,
  ClientResponse,
} from '@/domain/entities/types/client.types'
import { ClientRepository } from '@/domain/repositories/client-repository'
import { prisma } from '../../lib/prisma'

export class PrismaClientRepository implements ClientRepository {
  async create(data: ClientRequest): Promise<ClientResponse | null> {
    const clientCreated = await prisma.client.create({
      data: {
        name: data.name,
        email: data.email,
        doc: data.doc,
      },
    })

    return clientCreated
  }

  async findById(id: string): Promise<ClientResponse | null> {
    const client = await prisma.client.findUnique({
      where: {
        id,
      },
      include: {
        statements: {
          select: {
            id: true,
            bankName: true,
            statementDate: true,
            statementKey: true,
            clientId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    })

    return client
  }

  async findAll(): Promise<ClientResponse[] | null> {
    const clients = await prisma.client.findMany({})
    return clients
  }
}
