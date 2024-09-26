import {
  StatementRequest,
  StatementResponse,
} from '@/domain/entities/types/statement.types'
import { StatementRepository } from '@/domain/repositories/statement-repository'
import { prisma } from '@/lib/prisma'

export class PrismaStatementRepository implements StatementRepository {
  async create(data: StatementRequest): Promise<StatementResponse | null> {
    const statementCreated = await prisma.statement.create({
      data: {
        clientId: data.clientId,
        bankName: data.bankName,
        statementDate: data.statementDate,
        statementFile: data.statementFile,
        statementKey: data.statementKey,
      },
    })

    return statementCreated
  }
}
