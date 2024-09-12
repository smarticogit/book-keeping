import { Category } from './category.types'

export type AccountActivity = {
  id: string
  statementId: string
  postDate: Date
  description: string
  debit: number
  credit: number
  balance: number
  beginningBalance: number
  endingBalance: number
  category: Category[]
}
export type AccountActivityProps = Omit<AccountActivity, 'id'>
