import {
  StatementRequest,
  StatementResponse,
  StatementUpdate,
} from '@/domain/entities/types/statement.types'
import { StatementRepository } from '@/domain/repositories/statement-repository'
import { prisma } from '@/lib/prisma'

export class PrismaStatementRepository implements StatementRepository {
  async create(data: StatementRequest): Promise<StatementResponse | null> {
    const statementCreated = await prisma.statement.create({
      data: {
        clientId: data.clientId,
        bankName: data.bankName,
        statementDate: data.statementDate || '',
        statementFile: data.statementFile,
        statementKey: data.statementKey,
        accountType: '',
        accountNumber: '',
        beginningBalance: '',
        endingBalance: '',
        customerName: '',
        customerNumber: '',
        accountActivity: {
          create: [],
        },
      },
    })

    return statementCreated
  }

  async findById(statementId: string): Promise<StatementResponse | null> {
    const statement = await prisma.statement.findUnique({
      where: {
        id: statementId,
      },
      select: {
        id: true,
        clientId: true,
        bankName: true,
        statementDate: true,
        statementKey: true,
        accountType: true,
        accountNumber: true,
        beginningBalance: true,
        endingBalance: true,
        customerName: true,
        customerNumber: true,
        accountActivity: true,
        createdAt: true,
        updatedAt: true,
        client: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return statement
  }

  async update(statement: StatementUpdate): Promise<StatementResponse | null> {
    const statementUpdated = await prisma.statement.update({
      where: {
        id: statement.id,
      },
      data: {
        bankName: statement.bankName,
        statementDate: statement.statementDate,
        customerName: statement.customerName,
        customerNumber: statement.customerNumber,
        accountType: statement.accountType,
        accountNumber: statement.accountNumber,
        beginningBalance: statement.beginningBalance,
        endingBalance: statement.endingBalance,
        updatedAt: new Date(),
        accountActivity: {
          create:
            statement.accountActivity &&
            statement.accountActivity.map((activity) => ({
              ...activity,
              category: activity.category || null,
            })),
        },
      },
      select: {
        id: true,
        clientId: true,
        bankName: true,
        statementDate: true,
        statementKey: true,
        accountType: true,
        accountNumber: true,
        beginningBalance: true,
        endingBalance: true,
        customerName: true,
        customerNumber: true,
        accountActivity: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return statementUpdated
  }
}
