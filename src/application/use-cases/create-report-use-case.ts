import { Report } from '@/domain/entities/report.entity'
import {
  ReportRequest,
  ReportResponse,
} from '@/domain/entities/types/report.type'
import { ReportRepository } from '@/domain/repositories/report-repository'

export class CreateReportUseCase {
  constructor(private reportRepository: ReportRepository) {}

  async run({ ...input }: ReportRequest): Promise<ReportResponse> {
    const report = Report.create(input)

    await this.reportRepository.create(report)

    return report
  }
}
