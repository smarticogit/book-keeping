import {
  AccountActivityRequest,
  AccountActivityResponse,
} from '@/domain/entities/types/account-activity.types'
import { AccountActivityRepository } from '@/domain/repositories/account-activity-repository'

export class InMemoryAccountActivityRepository
  implements AccountActivityRepository
{
  public items: AccountActivityRequest[] = []

  async create(
    accountActivity: AccountActivityRequest,
  ): Promise<AccountActivityResponse | null> {
    this.items.push(accountActivity)

    return null
  }
}
