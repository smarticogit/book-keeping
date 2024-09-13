import { AccountActivity } from '@/domain/entities/account-activity'
import {
  AccountActivityRequest,
  AccountActivityResponse,
} from '@/domain/entities/types/account-activity.types'
import { AccountActivityRepository } from '@/domain/repositories/account-activity-repository'

export class CreateAccountActivityUseCase {
  constructor(private accountActivityRepository: AccountActivityRepository) {}

  async run({
    ...input
  }: AccountActivityRequest): Promise<AccountActivityResponse> {
    const accountActivity = AccountActivity.create(input)

    await this.accountActivityRepository.create(accountActivity)

    return accountActivity
  }
}
