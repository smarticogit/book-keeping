/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@/domain/entities/user-entity'
import { UserRepository } from '@/domain/repositories/user-repository'
import { UserCreateUseCase } from './user-use-case'

const fakeUserRepository: UserRepository = {
  create: async (user: User): Promise<void> => {},
}

test('create an user', async () => {
  const userCreated = new UserCreateUseCase(fakeUserRepository)

  const user = {
    name: 'John',
    email: 'j@j.com',
    password: '123456',
  }

  const userResponse = await userCreated.run(user)

  expect(userResponse).toEqual(
    expect.objectContaining({
      name: 'John',
      email: 'j@j.com',
      password: '123456',
      active: true,
      createdAt: expect.any(Date),
    }),
  )
})
