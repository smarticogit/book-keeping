import {
  ReportRequest,
  ReportResponse,
} from '@/domain/entities/types/report.type'
import { ReportRepository } from '@/domain/repositories/report-repository'

export class InMemoryReportRepository implements ReportRepository {
  public items: ReportRequest[] = []

  async create(user: ReportRequest): Promise<ReportResponse | null> {
    this.items.push(user)

    return null
  }
}
