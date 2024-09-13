import { User } from '@/domain/entities/user.entity'
import { faker } from '@faker-js/faker'

export function makeUser(override: Partial<User> = {}) {
  const user = User.create({
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...override,
  })

  return user
}
