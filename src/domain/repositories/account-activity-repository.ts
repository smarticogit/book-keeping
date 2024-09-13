import { AccountActivityResponse } from '@/domain/entities/types/account-activity.types'

export interface AccountActivityRepository {
  create(accountActivity: AccountActivityResponse): Promise<void>
}
