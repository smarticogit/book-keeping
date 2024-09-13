import {
  ReportRequest,
  ReportResponse,
} from '@/domain/entities/types/report.type'

export interface ReportRepository {
  create(report: ReportRequest): Promise<ReportResponse | null>
}
