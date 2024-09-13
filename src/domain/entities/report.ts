import { UniqueEntityId } from '@/domain/entities/core/unique-entity-id'
import { Entity } from './core/entity'
import { ReportProps, ReportResponse } from './types/report.type'

export class Report extends Entity<ReportProps> {
  static create(props: ReportProps, id?: UniqueEntityId): ReportResponse {
    const report = new Report(
      {
        ...props,
      },
      id,
    )

    return report
  }

  get clientId() {
    return this.props.clientId
  }

  get bankAccountId() {
    return this.props.bankAccountId
  }
}
