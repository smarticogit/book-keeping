import { UniqueEntityId } from './core/unique-entity-id'
import { BankAccountRequest } from './types/bank-account.types'
import { Address } from './types/client.types'

export class Client {
  private _id: UniqueEntityId
  private _name: string
  private _email: string
  private _cpf?: string
  private _cnpj?: string
  private _address?: Address
  private _bankAccounts?: BankAccountRequest[]
  private _createdAt: Date
  private _updatedAt: Date

  constructor(props: {
    id?: UniqueEntityId
    name: string
    email: string
    cpf?: string
    cnpj?: string
    address?: Address
    bankAccounts?: BankAccountRequest[]
  }) {
    this._id = props.id ?? new UniqueEntityId()
    this._name = props.name
    this._email = props.email
    this._cpf = props.cpf
    this._cnpj = props.cnpj
    this._address = props.address
    this._bankAccounts = []
    this._createdAt = new Date()
    this._updatedAt = new Date()
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get email() {
    return this._email
  }

  get cpf() {
    return this._cpf
  }

  get cnpj() {
    return this._cnpj
  }

  get address() {
    return this._address
  }

  get bankAccounts() {
    return this._bankAccounts
  }

  get createdAt() {
    return this._createdAt
  }

  get updatedAt() {
    return this._updatedAt
  }
}
