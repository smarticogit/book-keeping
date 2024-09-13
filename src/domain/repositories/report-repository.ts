import {
  ReportRequest,
  ReportResponse,
} from '@/domain/entities/types/report.type'
import { BaseRepository } from './base-repository'

export type ReportRepository = BaseRepository<ReportRequest, ReportResponse>
