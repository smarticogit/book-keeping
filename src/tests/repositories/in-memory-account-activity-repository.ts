import { AccountActivity } from '@/domain/entities/account-activity'
import { AccountActivityRepository } from '@/domain/repositories/account-activity-repository'

export class InMemoryAccountActivityRepository
  implements AccountActivityRepository
{
  public items: AccountActivity[] = []

  async create(user: AccountActivity) {
    this.items.push(user)
  }
}
