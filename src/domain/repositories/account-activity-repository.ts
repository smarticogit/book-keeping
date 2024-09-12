import { AccountActivity } from '@/domain/entities/account-activity'

export interface AccountActivityRepository {
  create(accountActivity: AccountActivity): Promise<void>
}
