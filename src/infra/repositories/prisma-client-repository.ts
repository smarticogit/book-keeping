import {
  ClientCreateProps,
  ClientResponse,
} from '@/domain/entities/types/client.types'
import { ClientRepository } from '@/domain/repositories/client-repository'
import { prisma } from '../../lib/prisma'

export class PrismaClientRepository implements ClientRepository {
  async create({
    bankName,
    email,
    name,
    statementDate,
    statementFile,
    statementKey,
  }: ClientCreateProps): Promise<ClientResponse | null> {
    const clientCreated = await prisma.client.create({
      data: {
        name,
        email,
        bankName,
        statementDate,
        statementFile,
        statementKey,
      },
    })

    return clientCreated
  }
}
