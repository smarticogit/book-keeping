import { Entity } from './core/entity'
import { UniqueEntityId } from './core/unique-entity-id'
import { ClientProps } from './types/client.types'

export class Client extends Entity<ClientProps> {
  static create(
    props: Omit<ClientProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityId,
  ) {
    const client = new Client(
      {
        ...props,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      id,
    )

    return client
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get cpf() {
    return this.props.cpf
  }

  get cnpj() {
    return this.props.cnpj
  }

  get address() {
    return this.props.address
  }

  get bankAccounts() {
    return this.props.bankAccounts
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
