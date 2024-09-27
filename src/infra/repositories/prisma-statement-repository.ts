import {
  StatementRequest,
  StatementResponse,
} from '@/domain/entities/types/statement.types'
import { StatementRepository } from '@/domain/repositories/statement-repository'
import { prisma } from '@/lib/prisma'
import { Statement } from '@prisma/client'

export class PrismaStatementRepository implements StatementRepository {
  async create(data: StatementRequest): Promise<StatementResponse | null> {
    const statementCreated = await prisma.statement.create({
      data: {
        clientId: data.clientId,
        bankName: data.bankName,
        statementDate: data.statementDate,
        statementFile: data.statementFile,
        statementKey: data.statementKey || '',
      },
    })

    return statementCreated
  }

  async findById(statementId: string): Promise<Statement | null> {
    const statement = await prisma.statement.findUnique({
      where: {
        id: statementId,
      },
    })

    return statement
  }
}
