import { UniqueEntityId } from '@/domain/entities/core/unique-entity-id'
import { Entity } from './core/entity'
import { ReportProps } from './types/report.type'

export class Report extends Entity<ReportProps> {
  static create(props: ReportProps, id?: UniqueEntityId) {
    const user = new Report(
      {
        ...props,
      },
      id,
    )

    return user
  }

  get clientId() {
    return this.props.clientId
  }

  get bankAccountId() {
    return this.props.bankAccountId
  }
}
