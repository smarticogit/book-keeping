import { Client } from '@/domain/entities/client'
import { faker } from '@faker-js/faker'

export function makeClient(override: Partial<Client> = {}) {
  const client = Client.create({
    name: faker.person.firstName(),
    email: faker.internet.email(),
    cpf: faker.string.numeric(11),
    cnpj: faker.string.numeric(14),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      postalCode: faker.location.zipCode(),
      number: faker.number.int({ min: 1, max: 100 }),
      complement: faker.lorem.text(),
    },
    bankAccounts: [
      {
        clientId: faker.string.uuid(),
        bankName: faker.finance.accountName(),
        accountNumber: faker.finance.accountNumber(),
        branchNumber: faker.string.uuid(),
        accountType: faker.helpers.arrayElement(['checking', 'savings']),
      },
    ],
    ...override,
  })

  return client
}
