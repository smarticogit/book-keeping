import { UniqueEntityId } from '../core/unique-entity-id'
import { CategoryRequest } from './category.types'

export type AccountActivity = {
  id: UniqueEntityId
  statementId: string
  postDate: Date
  description: string
  debit: number
  credit: number
  balance: number
  beginningBalance: number
  endingBalance: number
  category?: CategoryRequest[]
}

export type AccountActivityProps = Omit<AccountActivity, 'id'>
export type AccountActivityRequest = AccountActivityProps
export type AccountActivityResponse = AccountActivity
