import { AccountActivity } from '@/domain/entities/account-activity.entity'
import { faker } from '@faker-js/faker'

export function makeAccountActivity(override: Partial<AccountActivity> = {}) {
  const accountActivity = AccountActivity.create({
    postDate: faker.date.anytime(),
    description: faker.lorem.text(),
    debit: faker.number.int({ min: 1, max: 100 }),
    credit: faker.number.int({ min: 1, max: 100 }),
    balance: faker.number.int({ min: 1, max: 100 }),
    beginningBalance: faker.number.int({ min: 1, max: 100 }),
    endingBalance: faker.number.int({ min: 1, max: 100 }),
    statementId: faker.string.uuid(),
    category: [
      {
        name: faker.lorem.words(1),
      },
    ],
    ...override,
  })

  return accountActivity
}
