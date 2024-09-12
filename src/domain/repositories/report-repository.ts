import { Report } from '@/domain/entities/report'

export interface ReportRepository {
  create(report: Report): Promise<void>
}
