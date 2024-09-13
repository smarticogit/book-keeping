import { Statement } from '@/domain/entities/statement.entity'
import { faker } from '@faker-js/faker'

export function makeStatement(override: Partial<Statement> = {}) {
  const statement = Statement.create({
    bankAccountId: faker.string.uuid(),
    statementDate: new Date(),
    fileUrl: faker.internet.url(),
    signedFileUrl: faker.internet.url(),
    accountActivity: [
      {
        category: [
          {
            name: faker.lorem.words(1),
          },
        ],
        statementId: faker.string.uuid(),
        postDate: faker.date.anytime(),
        description: faker.lorem.text(),
        debit: faker.number.int({ min: 1, max: 100 }),
        credit: faker.number.int({ min: 1, max: 100 }),
        balance: faker.number.int({ min: 1, max: 100 }),
        beginningBalance: faker.number.int({ min: 1, max: 100 }),
        endingBalance: faker.number.int({ min: 1, max: 100 }),
      },
    ],
    ...override,
  })

  return statement
}
