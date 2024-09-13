import { Entity } from './core/entity'
import { UniqueEntityId } from './core/unique-entity-id'
import {
  StatementProps,
  StatementRequest,
  StatementResponse,
} from './types/statement.types'

export class Statement extends Entity<StatementProps> {
  static create(
    props: StatementRequest,
    id?: UniqueEntityId,
  ): StatementResponse {
    const statement = new Statement(
      {
        ...props,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      id,
    )

    return statement
  }

  get bankAccountId() {
    return this.props.bankAccountId
  }

  get statementDate() {
    return this.props.statementDate
  }

  get fileUrl() {
    return this.props.fileUrl
  }

  get signedFileUrl() {
    return this.props.signedFileUrl
  }

  get accountActivity() {
    return this.props.accountActivity
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
