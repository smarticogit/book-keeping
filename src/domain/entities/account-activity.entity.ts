import { UniqueEntityId } from '@/domain/entities/core/unique-entity-id'
import { Entity } from './core/entity'
import {
  AccountActivityProps,
  AccountActivityResponse,
} from './types/account-activity.types'

export class AccountActivity extends Entity<AccountActivityProps> {
  static create(
    props: AccountActivityProps,
    id?: UniqueEntityId,
  ): AccountActivityResponse {
    const accountActivity = new AccountActivity(
      {
        ...props,
      },
      id,
    )

    return accountActivity
  }

  get statementId() {
    return this.props.statementId
  }

  get postDate() {
    return this.props.postDate
  }

  get description() {
    return this.props.description
  }

  get debit() {
    return this.props.debit
  }

  get credit() {
    return this.props.credit
  }

  get balance() {
    return this.props.balance
  }

  get beginningBalance() {
    return this.props.beginningBalance
  }

  get endingBalance() {
    return this.props.endingBalance
  }

  get category() {
    return this.props.category
  }
}
