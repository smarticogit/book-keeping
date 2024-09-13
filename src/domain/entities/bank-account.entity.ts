import { Entity } from './core/entity'
import { UniqueEntityId } from './core/unique-entity-id'
import { BankAccountProps } from './types/bank-account.types'

export class BankAccount extends Entity<BankAccountProps> {
  static create(props: BankAccountProps, id?: UniqueEntityId) {
    const bankAccount = new BankAccount(
      {
        ...props,
      },
      id,
    )

    return bankAccount
  }

  get clientId() {
    return this.props.clientId
  }

  get bankName() {
    return this.props.bankName
  }

  get accountNumber() {
    return this.props.accountNumber
  }

  get branchNumber() {
    return this.props.branchNumber
  }

  get accountType() {
    return this.props.accountType
  }

  get statements() {
    return this.props.statements
  }
}
