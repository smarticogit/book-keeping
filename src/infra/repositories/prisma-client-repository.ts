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
    })

    return client
  }

  async findAll(): Promise<ClientResponse[] | null> {
    const clients = await prisma.client.findMany({
      include: {
        statements: true,
      },
    })
    return (
      clients.map((client) => ({
        id: client.id,
        name: client.name,
        doc: client.doc,
        email: client.email,
        statements:
          client.statements?.map((statement) => ({
            id: statement.id,
            clientId: statement.clientId,
            bankName: statement.bankName,
            statementDate: statement.statementDate || new Date(),
            createdAt: statement.createdAt,
            updatedAt: statement.updatedAt,
          })) || [],
        createdAt: client.createdAt,
        updatedAt: client.updatedAt,
      })) || null
    )
  }
}
