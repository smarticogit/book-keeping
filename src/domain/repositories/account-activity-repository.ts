import {
  AccountActivityRequest,
  AccountActivityResponse,
} from '@/domain/entities/types/account-activity.types'

export interface AccountActivityRepository {
  create: (
    accountActivity: AccountActivityRequest,
  ) => Promise<AccountActivityResponse | null>
}
