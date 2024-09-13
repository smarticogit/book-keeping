import { UniqueEntityId } from '@/domain/entities/core/unique-entity-id'

export type Report = {
  id: UniqueEntityId
  clientId: string
  bankAccountId: string
}

export type ReportProps = Omit<Report, 'id'>
export type ReportRequest = ReportProps
export type ReportResponse = Report
