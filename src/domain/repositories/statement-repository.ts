import {
  StatementRequest,
  StatementResponse,
} from '@/domain/entities/types/statement.types'
import { Statement } from '@prisma/client'

export interface StatementRepository {
  create: (statement: StatementRequest) => Promise<StatementResponse | null>
  findById: (statementId: string) => Promise<Statement | null>
}
